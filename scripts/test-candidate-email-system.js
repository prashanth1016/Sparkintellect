const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

async function runCandidateEmailSystemTest() {
  const { connectDB, disconnectDB } = await import('../backend/dist/db/connection.js');
  const { Application } = await import('../backend/dist/models/Application.js');
  const { Internship } = await import('../backend/dist/models/Internship.js');
  const { AdminController } = await import('../backend/dist/controllers/admin.controller.js');
  const { PublicController } = await import('../backend/dist/controllers/public.controller.js');
  const { GoogleSheetsService } = await import('../backend/dist/services/googleSheets.service.js');

  console.log('--- STARTING CANDIDATE EMAIL COMMUNICATION SYSTEM TEST ---');
  await connectDB();

  let createdAppRefId = null;
  let createdAppId = null;

  try {
    // ----------------------------------------------------
    // TEST 1: Candidate Applies & Initial Email Confirmation
    // ----------------------------------------------------
    console.log('\n=== TEST 1: Submit Application & Candidate Ack ===');
    const mockApplyReq = {
      params: { slug: 'ai', id: 'ai' },
      body: {
        internshipSlug: 'ai',
        answers: {
          fullName: 'Prashanth Candidate',
          email: 'ceo@sparkintellect.in',
          phone: '+91 98765 43210',
          college: 'IIT Madras',
          degree: 'B.Tech CSE',
          statement: 'Excited to build scalable AI systems with SparkIntellect team.',
        }
      },
      file: undefined,
      ip: '127.0.0.1',
      socket: { remoteAddress: '127.0.0.1' },
      headers: { 'user-agent': 'TestRunner/1.0' }
    };

    let applyResponseData = null;
    const mockApplyRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        applyResponseData = data;
        return this;
      }
    };

    await PublicController.applyInternship(mockApplyReq, mockApplyRes);
    console.log('Apply API Response:', applyResponseData);

    // Give background promise a moment to complete Resend delivery
    await new Promise((resolve) => setTimeout(resolve, 3500));

    createdAppRefId = applyResponseData.applicationReferenceId;
    const savedApp = await Application.findOne({ applicationReferenceId: createdAppRefId });
    createdAppId = savedApp._id.toString();

    console.log('Verified Saved Application in MongoDB:');
    console.log('  Ref ID:', savedApp.applicationReferenceId);
    console.log('  Status:', savedApp.status);
    console.log('  Email Status (Application Received):', savedApp.emailStatus);
    console.log('  Email Message ID:', savedApp.emailMessageId);

    if (savedApp.emailStatus !== 'sent' || !savedApp.emailMessageId) {
      throw new Error('TEST 1 FAILED: Initial application received email was not sent.');
    }
    console.log('✅ TEST 1 PASSED: Application created and acknowledgement email delivered.');

    // ----------------------------------------------------
    // TEST 2: Status Transition to Shortlisted (NO Auto-Email)
    // ----------------------------------------------------
    console.log('\n=== TEST 2: Change Status to SHORTLISTED (No Auto-Email) ===');
    savedApp.status = 'shortlisted';
    await savedApp.save();
    await GoogleSheetsService.syncApplication(savedApp);

    const refreshedApp = await Application.findById(createdAppId);
    console.log('  Current Status:', refreshedApp.status);
    console.log('  Communication Shortlisted Sent:', refreshedApp.communication?.shortlisted?.sent || false);

    if (refreshedApp.communication?.shortlisted?.sent) {
      throw new Error('TEST 2 FAILED: Shortlisted email was sent automatically on status update!');
    }
    console.log('✅ TEST 2 PASSED: Status updated to SHORTLISTED without triggering automatic email.');

    // ----------------------------------------------------
    // TEST 3: Admin Sends Shortlisted Email
    // ----------------------------------------------------
    console.log('\n=== TEST 3: Admin Sends SHORTLISTED Email ===');
    const mockShortlistReq = {
      params: { id: createdAppId },
      user: { id: 'admin-123', email: 'admin@sparkintellect.in', name: 'Recruitment Lead' },
      body: {
        subject: "You've Been Shortlisted — SparkIntellect AI Cohort",
        interviewDate: 'Sep 08, 2026',
        interviewTime: '11:00 AM IST',
        interviewMode: 'Online',
        meetingLink: 'https://meet.google.com/xyz-test-meet',
        interviewInstructions: 'Please join from a quiet room with a stable broadband connection and your IDE ready.',
        additionalDetails: 'You will have a 45-minute technical discussion with our engineering team.'
      }
    };

    let shortlistResData = null;
    const mockShortlistRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        shortlistResData = data;
        return this;
      }
    };

    await AdminController.sendShortlistedEmail(mockShortlistReq, mockShortlistRes);
    console.log('Shortlisted Email API Response:', shortlistResData);

    const shortlistedApp = await Application.findById(createdAppId);
    console.log('Verified Shortlisted Communication in MongoDB:');
    console.log('  Shortlisted Sent:', shortlistedApp.communication?.shortlisted?.sent);
    console.log('  Sent By:', shortlistedApp.communication?.shortlisted?.sentBy);
    console.log('  Sent At:', shortlistedApp.communication?.shortlisted?.sentAt);
    console.log('  Message ID:', shortlistedApp.communication?.shortlisted?.messageId);

    if (!shortlistedApp.communication?.shortlisted?.sent || !shortlistedApp.communication?.shortlisted?.messageId) {
      throw new Error('TEST 3 FAILED: Shortlisted email failed to dispatch via Resend.');
    }
    console.log('✅ TEST 3 PASSED: Shortlisted email sent and delivery state saved in MongoDB.');

    // ----------------------------------------------------
    // TEST 4: Admin Updates Status to ACCEPTED & Sends Selection Email
    // ----------------------------------------------------
    console.log('\n=== TEST 4: Status to ACCEPTED & Send Selection Email ===');
    shortlistedApp.status = 'accepted';
    await shortlistedApp.save();
    await GoogleSheetsService.syncApplication(shortlistedApp);

    const mockAcceptedReq = {
      params: { id: createdAppId },
      user: { id: 'admin-123', email: 'ceo@sparkintellect.in', name: 'Prashanth CEO' },
      body: {
        subject: "Congratulations! You've Been Selected — SparkIntellect",
        joiningDate: 'Sep 15, 2026',
        joiningTime: '10:00 AM IST',
        internshipDuration: '3 Months',
        joiningMode: 'Online',
        joiningLink: 'https://meet.google.com/orientation-sparkintellect',
        onboardingInstructions: 'Please review your onboarding guide and join the orientation session on time.',
        requiredDocuments: '1. College ID / NOC\n2. Government ID Proof\n3. Signed NDA'
      }
    };

    let acceptedResData = null;
    const mockAcceptedRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        acceptedResData = data;
        return this;
      }
    };

    await AdminController.sendAcceptedEmail(mockAcceptedReq, mockAcceptedRes);
    console.log('Selection Email API Response:', acceptedResData);

    const acceptedApp = await Application.findById(createdAppId);
    console.log('Verified Accepted Communication in MongoDB:');
    console.log('  Accepted Sent:', acceptedApp.communication?.accepted?.sent);
    console.log('  Sent By:', acceptedApp.communication?.accepted?.sentBy);
    console.log('  Sent At:', acceptedApp.communication?.accepted?.sentAt);
    console.log('  Message ID:', acceptedApp.communication?.accepted?.messageId);

    if (!acceptedApp.communication?.accepted?.sent || !acceptedApp.communication?.accepted?.messageId) {
      throw new Error('TEST 4 FAILED: Selection email failed to dispatch via Resend.');
    }
    console.log('✅ TEST 4 PASSED: Selection email dispatched and delivery state saved.');

    // ----------------------------------------------------
    // TEST 5: Status to REJECTED & Send Rejection Email
    // ----------------------------------------------------
    console.log('\n=== TEST 5: Status to REJECTED & Send Rejection Email ===');
    acceptedApp.status = 'rejected';
    await acceptedApp.save();
    await GoogleSheetsService.syncApplication(acceptedApp);

    const mockRejectedReq = {
      params: { id: createdAppId },
      user: { id: 'admin-123', email: 'admin@sparkintellect.in', name: 'Recruitment Team' },
      body: {
        subject: 'Update Regarding Your SparkIntellect Application',
        additionalMessage: 'We wish you the very best in your upcoming campus placements and projects.'
      }
    };

    let rejectedResData = null;
    const mockRejectedRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        rejectedResData = data;
        return this;
      }
    };

    await AdminController.sendRejectedEmail(mockRejectedReq, mockRejectedRes);
    console.log('Rejection Email API Response:', rejectedResData);

    const rejectedApp = await Application.findById(createdAppId);
    console.log('Verified Rejected Communication in MongoDB:');
    console.log('  Rejected Sent:', rejectedApp.communication?.rejected?.sent);
    console.log('  Sent By:', rejectedApp.communication?.rejected?.sentBy);
    console.log('  Sent At:', rejectedApp.communication?.rejected?.sentAt);
    console.log('  Message ID:', rejectedApp.communication?.rejected?.messageId);

    if (!rejectedApp.communication?.rejected?.sent || !rejectedApp.communication?.rejected?.messageId) {
      throw new Error('TEST 5 FAILED: Rejection email failed to dispatch via Resend.');
    }
    console.log('✅ TEST 5 PASSED: Rejection email dispatched and delivery state saved.');

    // ----------------------------------------------------
    // TEST 6: Status Mismatch Enforcement
    // ----------------------------------------------------
    console.log('\n=== TEST 6: Security & Status Mismatch Enforcement ===');
    // Application is currently 'rejected'. Trying to send 'accepted' email should fail with HTTP 400.
    let mismatchError = null;
    const mockMismatchRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        mismatchError = data;
        return this;
      }
    };

    await AdminController.sendAcceptedEmail(mockAcceptedReq, mockMismatchRes);
    console.log('Status Mismatch Response (Expected HTTP 400):', mockMismatchRes.statusCode, mismatchError);

    if (mockMismatchRes.statusCode !== 400 || !mismatchError?.error?.includes('must be ACCEPTED')) {
      throw new Error('TEST 6 FAILED: Backend failed to enforce status validation before sending email.');
    }
    console.log('✅ TEST 6 PASSED: Backend strictly enforced that email type matches database status.');

  } finally {
    // ----------------------------------------------------
    // CLEANUP: Clean up test application
    // ----------------------------------------------------
    if (createdAppRefId) {
      console.log('\n=== CLEANUP: Removing test application ===');
      try {
        await GoogleSheetsService.deleteApplicationRow(createdAppRefId);
        await Application.findByIdAndDelete(createdAppId);
        console.log('✅ Cleaned up test application:', createdAppRefId);
      } catch (cleanupErr) {
        console.warn('⚠️ Cleanup error:', cleanupErr.message);
      }
    }
    await disconnectDB();
  }

  console.log('\n🎉 ALL CANDIDATE EMAIL COMMUNICATION TESTS COMPLETED SUCCESSFULLY! 🎉\n');
}

runCandidateEmailSystemTest().catch((err) => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});
