import { Resend } from "resend";
import { config } from "../config/index.js";
import { IContact } from "../models/Contact.js";

// Initialize Resend client once from server-side environment config
const resend = config.RESEND_API_KEY ? new Resend(config.RESEND_API_KEY) : null;

// Official public logo URL accessible over HTTPS
export const OFFICIAL_LOGO_URL = "https://sparkintellect.in/logo.png";

/**
 * Escapes dynamic string values to prevent HTML injection / XSS attacks in email templates.
 */
export function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface ApplicationEmailParams {
  toEmail: string;
  candidateName: string;
  trackTitle: string;
  applicationReferenceId: string;
  applicationId?: string;
}

export interface ShortlistedEmailParams {
  toEmail: string;
  candidateName: string;
  trackTitle: string;
  applicationReferenceId: string;
  subject?: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewMode?: string;
  meetingLink?: string;
  interviewInstructions?: string;
  additionalDetails?: string;
  messageBody?: string;
}

export interface AcceptedEmailParams {
  toEmail: string;
  candidateName: string;
  trackTitle: string;
  applicationReferenceId: string;
  subject?: string;
  joiningDate?: string;
  joiningTime?: string;
  internshipDuration?: string;
  joiningMode?: string;
  joiningLink?: string;
  onboardingInstructions?: string;
  requiredDocuments?: string;
  additionalDetails?: string;
  messageBody?: string;
}

export interface RejectedEmailParams {
  toEmail: string;
  candidateName: string;
  trackTitle: string;
  applicationReferenceId: string;
  subject?: string;
  messageBody?: string;
  additionalMessage?: string;
}

interface BrandedLayoutOptions {
  headerTitle?: string;
  headerSubtitle?: string;
  salutation: string;
  introParagraphs: string[];
  referenceId?: string;
  detailsBox?: {
    title: string;
    items: { label: string; value: string; isLink?: boolean }[];
  };
  customSections?: {
    title?: string;
    content: string;
  }[];
  closingParagraphs?: string[];
  highlightBox?: {
    title?: string;
    content: string;
  };
}

/**
 * Shared SparkIntellect Branded Email Layout
 */
function renderBrandedEmailHtml(options: BrandedLayoutOptions): string {
  const headerTitle = options.headerTitle || "SparkIntellect";
  const headerSubtitle = options.headerSubtitle || "AI & Software Engineering Firm";

  let detailsBoxHtml = "";
  if (options.detailsBox && options.detailsBox.items.length > 0) {
    const validItems = options.detailsBox.items.filter((it) => it.value && it.value.trim() !== "");
    if (validItems.length > 0) {
      detailsBoxHtml = `
        <div style="background-color: #F2F9FF; border: 1px solid #BEE0FF; border-left: 4px solid #0284c7; padding: 18px 20px; border-radius: 10px; margin: 24px 0;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px; margin-bottom: 12px;">
            ${escapeHtml(options.detailsBox.title)}
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${validItems
              .map((it) => {
                const valHtml = it.isLink && it.value.startsWith("http")
                  ? `<a href="${escapeHtml(it.value)}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">${escapeHtml(it.value)}</a>`
                  : `<span style="color: #0B1220; font-weight: 600;">${escapeHtml(it.value)}</span>`;
                return `
                  <tr style="border-bottom: 1px solid #E2E8F0;">
                    <td style="padding: 7px 0; color: #64748B; width: 140px; font-weight: 500;">${escapeHtml(it.label)}:</td>
                    <td style="padding: 7px 0;">${valHtml}</td>
                  </tr>
                `;
              })
              .join("")}
          </table>
        </div>
      `;
    }
  }

  let customSectionsHtml = "";
  if (options.customSections && options.customSections.length > 0) {
    for (const sec of options.customSections) {
      if (sec.content && sec.content.trim() !== "") {
        customSectionsHtml += `
          <div style="margin: 18px 0;">
            ${sec.title ? `<div style="font-size: 13px; font-weight: 700; color: #0B1220; margin-bottom: 6px;">${escapeHtml(sec.title)}</div>` : ""}
            <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px 16px; border-radius: 8px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(sec.content)}</div>
          </div>
        `;
      }
    }
  }

  let highlightBoxHtml = "";
  if (options.highlightBox && options.highlightBox.content.trim() !== "") {
    highlightBoxHtml = `
      <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-left: 4px solid #10B981; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
        ${options.highlightBox.title ? `<div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #065F46; margin-bottom: 4px;">${escapeHtml(options.highlightBox.title)}</div>` : ""}
        <div style="font-size: 14px; color: #064E3B; line-height: 1.5;">${escapeHtml(options.highlightBox.content)}</div>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(headerTitle)}</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #F0F4F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0B1220; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #BEE0FF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 132, 199, 0.08);">
    
    <!-- Brand Header with Public Logo -->
    <div style="background-color: #0B1220; padding: 24px 28px; text-align: center; border-bottom: 3px solid #0284c7;">
      <table style="margin: 0 auto; border-collapse: collapse;">
        <tr>
          <td style="vertical-align: middle; padding-right: 12px;">
            <img src="${OFFICIAL_LOGO_URL}" alt="SparkIntellect" width="40" height="40" style="width: 40px; height: 40px; border-radius: 8px; display: block; border: 1px solid rgba(159, 207, 251, 0.4);" />
          </td>
          <td style="vertical-align: middle; text-align: left;">
            <h1 style="color: #9FCFFB; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; line-height: 1.2;">SparkIntellect</h1>
            <p style="color: #E2E8F0; margin: 2px 0 0 0; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">${escapeHtml(headerSubtitle)}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Content Body -->
    <div style="padding: 32px 28px;">
      <h2 style="margin: 0 0 16px 0; font-size: 19px; color: #0B1220; font-weight: 700;">
        ${escapeHtml(options.salutation)}
      </h2>

      ${options.introParagraphs.map((p) => `<p style="margin: 0 0 14px 0; font-size: 15px; color: #334155; line-height: 1.6;">${p}</p>`).join("")}

      ${options.referenceId ? `
        <div style="background-color: #F8FAFC; border: 1px solid #BEE0FF; padding: 12px 18px; border-radius: 8px; margin: 20px 0; display: inline-block;">
          <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Application Reference: </span>
          <span style="font-family: 'SFMono-Regular', Consolas, Menlo, monospace; font-size: 15px; font-weight: 700; color: #0284c7;">${escapeHtml(options.referenceId)}</span>
        </div>
      ` : ""}

      ${highlightBoxHtml}
      ${detailsBoxHtml}
      ${customSectionsHtml}

      ${(options.closingParagraphs || []).map((p) => `<p style="margin: 16px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">${p}</p>`).join("")}

      <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 28px 0;" />

      <!-- Official Signoff -->
      <div style="font-size: 14px; color: #0B1220;">
        <strong>SparkIntellect Recruitment Team</strong><br />
        <a href="mailto:info@sparkintellect.in" style="color: #0284c7; text-decoration: none; font-size: 13px;">info@sparkintellect.in</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F8FAFC; padding: 18px 24px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 11px; color: #94A3B8;">
      SparkIntellect • AI &amp; Software Engineering • Chennai, India
    </div>

  </div>
</body>
</html>`;
}

export class EmailService {
  /**
   * 1. Candidate Application Received Acknowledgement
   */
  static async sendInternshipApplicationConfirmation(
    params: ApplicationEmailParams
  ): Promise<SendEmailResult> {
    const { toEmail, candidateName, trackTitle, applicationReferenceId } = params;

    if (!resend) {
      console.log(`ℹ️ [EmailService (Mock)] Internship confirmation simulated for ${toEmail} (${applicationReferenceId})`);
      return { success: true, messageId: "mock-msg-id" };
    }

    const subject = "Application Received — SparkIntellect";

    const textContent = `Hi ${candidateName || "Candidate"},\n\n` +
      `Thank you for applying for the ${trackTitle} opportunity at SparkIntellect.\n\n` +
      `We have successfully received your application and it is now under review.\n\n` +
      `Application Reference:\n${applicationReferenceId}\n\n` +
      `Our recruitment team will carefully review your application. If you are shortlisted, we will contact you through the email address or phone number provided in your application.\n\n` +
      `Please keep your application reference ID for future communication.\n\n` +
      `Regards,\nSparkIntellect\ninfo@sparkintellect.in`;

    const htmlContent = renderBrandedEmailHtml({
      salutation: `Hi ${candidateName || "Candidate"},`,
      introParagraphs: [
        `Thank you for applying for the <strong>${escapeHtml(trackTitle)}</strong> opportunity at SparkIntellect.`,
        `We have successfully received your application and it is now under review.`,
      ],
      referenceId: applicationReferenceId,
      closingParagraphs: [
        `Our recruitment team will carefully review your application. If you are shortlisted, we will contact you through the email address or phone number provided in your application.`,
        `Please keep your application reference ID for future communication.`,
      ],
    });

    try {
      const response = await resend.emails.send({
        from: config.RESEND_FROM_EMAIL,
        to: toEmail,
        reply_to: "info@sparkintellect.in",
        subject,
        text: textContent,
        html: htmlContent,
      });

      if (response.error) {
        console.error(`❌ [EmailService] Resend returned error for ${toEmail}:`, response.error.message);
        return { success: false, error: response.error.message };
      }

      console.log(`✅ [EmailService] Confirmation sent to ${toEmail} (${applicationReferenceId}, MsgId: ${response.data?.id})`);
      return { success: true, messageId: response.data?.id };
    } catch (err: any) {
      console.error(`❌ [EmailService] Failed to send candidate email:`, err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * 2. Shortlisted Candidate Email
   */
  static async sendShortlistedEmail(params: ShortlistedEmailParams): Promise<SendEmailResult> {
    const {
      toEmail,
      candidateName,
      trackTitle,
      applicationReferenceId,
      subject = "You've Been Shortlisted — SparkIntellect",
      interviewDate,
      interviewTime,
      interviewMode = "Online",
      meetingLink,
      interviewInstructions,
      additionalDetails,
      messageBody,
    } = params;

    if (!resend) {
      console.log(`ℹ️ [EmailService (Mock)] Shortlisted email simulated for ${toEmail} (${applicationReferenceId})`);
      return { success: true, messageId: "mock-msg-id" };
    }

    const defaultIntro = `We are pleased to inform you that your application for the <strong>${escapeHtml(trackTitle)}</strong> opportunity at SparkIntellect has been shortlisted for the next stage.`;
    const introParagraph = messageBody ? escapeHtml(messageBody) : defaultIntro;

    const textContent = `Hi ${candidateName || "Candidate"},\n\n` +
      `We are pleased to inform you that your application for the ${trackTitle} opportunity at SparkIntellect has been shortlisted for the next stage.\n\n` +
      `Application Reference:\n${applicationReferenceId}\n\n` +
      `Interview Details:\n` +
      (interviewDate ? `Date: ${interviewDate}\n` : "") +
      (interviewTime ? `Time: ${interviewTime}\n` : "") +
      (interviewMode ? `Mode: ${interviewMode}\n` : "") +
      (meetingLink ? `Meeting Link: ${meetingLink}\n` : "") +
      (interviewInstructions ? `\nInstructions:\n${interviewInstructions}\n` : "") +
      (additionalDetails ? `\nAdditional Details:\n${additionalDetails}\n` : "") +
      `\nThank you for your interest in SparkIntellect. We look forward to connecting with you.\n\n` +
      `Regards,\nSparkIntellect\ninfo@sparkintellect.in`;

    const detailItems: { label: string; value: string; isLink?: boolean }[] = [];
    if (interviewDate) detailItems.push({ label: "Interview Date", value: interviewDate });
    if (interviewTime) detailItems.push({ label: "Interview Time", value: interviewTime });
    if (interviewMode) detailItems.push({ label: "Mode", value: interviewMode });
    if (meetingLink) detailItems.push({ label: "Meeting Link", value: meetingLink, isLink: true });

    const customSections: { title?: string; content: string }[] = [];
    if (interviewInstructions) customSections.push({ title: "Interview Instructions", content: interviewInstructions });
    if (additionalDetails) customSections.push({ title: "Additional Details", content: additionalDetails });

    const htmlContent = renderBrandedEmailHtml({
      headerTitle: "Application Shortlisted",
      salutation: `Hi ${candidateName || "Candidate"},`,
      introParagraphs: [introParagraph],
      referenceId: applicationReferenceId,
      highlightBox: {
        title: "Stage: Shortlisted for Interview",
        content: "Congratulations! Your background matches our requirements for this internship track.",
      },
      detailsBox: detailItems.length > 0 ? { title: "Interview Schedule & Information", items: detailItems } : undefined,
      customSections: customSections.length > 0 ? customSections : undefined,
      closingParagraphs: [
        "Thank you for your interest in SparkIntellect. We look forward to speaking with you.",
      ],
    });

    try {
      const response = await resend.emails.send({
        from: config.RESEND_FROM_EMAIL,
        to: toEmail,
        reply_to: "info@sparkintellect.in",
        subject,
        text: textContent,
        html: htmlContent,
      });

      if (response.error) {
        console.error(`❌ [EmailService] Shortlisted email error for ${toEmail}:`, response.error.message);
        return { success: false, error: response.error.message };
      }

      console.log(`✅ [EmailService] Shortlisted email sent to ${toEmail} (Ref: ${applicationReferenceId}, MsgId: ${response.data?.id})`);
      return { success: true, messageId: response.data?.id };
    } catch (err: any) {
      console.error(`❌ [EmailService] Failed to send shortlisted email:`, err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * 3. Selection / Accepted Candidate Email
   */
  static async sendAcceptedEmail(params: AcceptedEmailParams): Promise<SendEmailResult> {
    const {
      toEmail,
      candidateName,
      trackTitle,
      applicationReferenceId,
      subject = "Congratulations! You've Been Selected — SparkIntellect",
      joiningDate,
      joiningTime,
      internshipDuration,
      joiningMode = "Online",
      joiningLink,
      onboardingInstructions,
      requiredDocuments,
      additionalDetails,
      messageBody,
    } = params;

    if (!resend) {
      console.log(`ℹ️ [EmailService (Mock)] Selection email simulated for ${toEmail} (${applicationReferenceId})`);
      return { success: true, messageId: "mock-msg-id" };
    }

    const defaultIntro = `Congratulations! We are delighted to inform you that you have been selected for the <strong>${escapeHtml(trackTitle)}</strong> opportunity at SparkIntellect.`;
    const introParagraph = messageBody ? escapeHtml(messageBody) : defaultIntro;

    const textContent = `Hi ${candidateName || "Candidate"},\n\n` +
      `Congratulations!\n\n` +
      `We are pleased to inform you that you have been selected for the ${trackTitle} opportunity at SparkIntellect.\n\n` +
      `Application Reference:\n${applicationReferenceId}\n\n` +
      `Joining Details:\n` +
      (joiningDate ? `Joining Date: ${joiningDate}\n` : "") +
      (joiningTime ? `Joining Time: ${joiningTime}\n` : "") +
      (internshipDuration ? `Duration: ${internshipDuration}\n` : "") +
      (joiningMode ? `Mode: ${joiningMode}\n` : "") +
      (joiningLink ? `Joining Link: ${joiningLink}\n` : "") +
      (onboardingInstructions ? `\nOnboarding Instructions:\n${onboardingInstructions}\n` : "") +
      (requiredDocuments ? `\nRequired Documents:\n${requiredDocuments}\n` : "") +
      (additionalDetails ? `\nAdditional Details:\n${additionalDetails}\n` : "") +
      `\nWe are excited to have you join SparkIntellect and look forward to working with you.\n\n` +
      `Regards,\nSparkIntellect\ninfo@sparkintellect.in`;

    const detailItems: { label: string; value: string; isLink?: boolean }[] = [];
    if (joiningDate) detailItems.push({ label: "Joining Date", value: joiningDate });
    if (joiningTime) detailItems.push({ label: "Joining Time", value: joiningTime });
    if (internshipDuration) detailItems.push({ label: "Duration", value: internshipDuration });
    if (joiningMode) detailItems.push({ label: "Mode", value: joiningMode });
    if (joiningLink) detailItems.push({ label: "Onboarding Link", value: joiningLink, isLink: true });

    const customSections: { title?: string; content: string }[] = [];
    if (onboardingInstructions) customSections.push({ title: "Onboarding Instructions", content: onboardingInstructions });
    if (requiredDocuments) customSections.push({ title: "Required Documents", content: requiredDocuments });
    if (additionalDetails) customSections.push({ title: "Additional Information", content: additionalDetails });

    const htmlContent = renderBrandedEmailHtml({
      headerTitle: "Offer & Selection Notice",
      salutation: `Hi ${candidateName || "Candidate"},`,
      introParagraphs: [introParagraph],
      referenceId: applicationReferenceId,
      highlightBox: {
        title: "Offer of Selection",
        content: "We are thrilled to welcome you to SparkIntellect's upcoming engineering cohort!",
      },
      detailsBox: detailItems.length > 0 ? { title: "Joining & Onboarding Details", items: detailItems } : undefined,
      customSections: customSections.length > 0 ? customSections : undefined,
      closingParagraphs: [
        "We are excited to have you join SparkIntellect and look forward to building cutting-edge software with you.",
      ],
    });

    try {
      const response = await resend.emails.send({
        from: config.RESEND_FROM_EMAIL,
        to: toEmail,
        reply_to: "info@sparkintellect.in",
        subject,
        text: textContent,
        html: htmlContent,
      });

      if (response.error) {
        console.error(`❌ [EmailService] Selection email error for ${toEmail}:`, response.error.message);
        return { success: false, error: response.error.message };
      }

      console.log(`✅ [EmailService] Selection email sent to ${toEmail} (Ref: ${applicationReferenceId}, MsgId: ${response.data?.id})`);
      return { success: true, messageId: response.data?.id };
    } catch (err: any) {
      console.error(`❌ [EmailService] Failed to send selection email:`, err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * 4. Rejection Email
   */
  static async sendRejectedEmail(params: RejectedEmailParams): Promise<SendEmailResult> {
    const {
      toEmail,
      candidateName,
      trackTitle,
      applicationReferenceId,
      subject = "Update Regarding Your SparkIntellect Application",
      messageBody,
      additionalMessage,
    } = params;

    if (!resend) {
      console.log(`ℹ️ [EmailService (Mock)] Rejection email simulated for ${toEmail} (${applicationReferenceId})`);
      return { success: true, messageId: "mock-msg-id" };
    }

    const defaultBody = `Thank you for taking the time to apply for the ${trackTitle} opportunity at SparkIntellect.\n\n` +
      `After carefully reviewing your application, we regret to inform you that we will not be moving forward with your application for this opportunity.\n\n` +
      `We genuinely appreciate your interest in SparkIntellect and the time and effort you invested in the application process.\n\n` +
      `This decision does not diminish your skills or potential, and we encourage you to continue developing your abilities and exploring future opportunities that may be a good fit for you.`;

    const bodyText = messageBody || defaultBody;

    const textContent = `Hi ${candidateName || "Candidate"},\n\n` +
      `${bodyText}\n\n` +
      (additionalMessage ? `${additionalMessage}\n\n` : "") +
      `We wish you the very best in your academic and professional journey.\n\n` +
      `Regards,\nSparkIntellect\ninfo@sparkintellect.in`;

    const introParagraphs = [
      `Thank you for taking the time to apply for the <strong>${escapeHtml(trackTitle)}</strong> opportunity at SparkIntellect.`,
      `After carefully reviewing your application, we regret to inform you that we will not be moving forward with your application for this opportunity.`,
      `We genuinely appreciate your interest in SparkIntellect and the time and effort you invested in the application process.`,
      `This decision does not diminish your skills or potential, and we encourage you to continue developing your abilities and exploring future opportunities that may be a good fit for you.`,
    ];

    const customSections: { title?: string; content: string }[] = [];
    if (additionalMessage) {
      customSections.push({ title: "Note from Recruitment Team", content: additionalMessage });
    }

    const htmlContent = renderBrandedEmailHtml({
      headerTitle: "Application Update",
      salutation: `Hi ${candidateName || "Candidate"},`,
      introParagraphs: messageBody ? [escapeHtml(messageBody)] : introParagraphs,
      referenceId: applicationReferenceId,
      customSections: customSections.length > 0 ? customSections : undefined,
      closingParagraphs: [
        "We wish you the very best in your academic and professional journey.",
      ],
    });

    try {
      const response = await resend.emails.send({
        from: config.RESEND_FROM_EMAIL,
        to: toEmail,
        reply_to: "info@sparkintellect.in",
        subject,
        text: textContent,
        html: htmlContent,
      });

      if (response.error) {
        console.error(`❌ [EmailService] Rejection email error for ${toEmail}:`, response.error.message);
        return { success: false, error: response.error.message };
      }

      console.log(`✅ [EmailService] Rejection email sent to ${toEmail} (Ref: ${applicationReferenceId}, MsgId: ${response.data?.id})`);
      return { success: true, messageId: response.data?.id };
    } catch (err: any) {
      console.error(`❌ [EmailService] Failed to send rejection email:`, err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * 5. Internal contact lead notification
   */
  static async sendContactNotification(contact: IContact): Promise<SendEmailResult> {
    if (!resend) {
      console.log(`ℹ️ [EmailService (Mock)] Lead notification simulated for ${config.CEO_NOTIFICATION_EMAIL}`);
      return { success: true, messageId: "mock-msg-id" };
    }

    const contactId = contact._id.toString();
    const formattedDate = new Date(contact.createdAt || Date.now()).toLocaleString();

    const subject = "New Contact Enquiry — SparkIntellect";

    const textContent = `New Contact Enquiry — SparkIntellect\n\n` +
      `Name: ${contact.name}\n` +
      `Email: ${contact.email}\n` +
      `Phone: ${contact.phone || "N/A"}\n` +
      `Company: ${contact.company || "N/A"}\n` +
      `Service: ${contact.service || "General Scope"}\n` +
      `Budget: ${contact.budget || "N/A"}\n` +
      `Timeline: ${contact.timeline || "N/A"}\n\n` +
      `Message:\n${contact.message}\n\n` +
      `Submitted: ${formattedDate}\n` +
      `Contact Reference: ${contactId}`;

    const detailItems = [
      { label: "Name", value: contact.name },
      { label: "Email", value: contact.email, isLink: false },
      { label: "Phone", value: contact.phone || "N/A" },
      { label: "Company", value: contact.company || "N/A" },
      { label: "Service", value: contact.service || "General Scope" },
      { label: "Budget", value: contact.budget || "N/A" },
      { label: "Timeline", value: contact.timeline || "N/A" },
    ];

    const htmlContent = renderBrandedEmailHtml({
      headerTitle: "New Client Enquiry",
      salutation: "Team SparkIntellect,",
      introParagraphs: ["A new client proposal / contact request has been received on the website."],
      detailsBox: { title: "Lead Information", items: detailItems },
      customSections: [{ title: "Submitted Message", content: contact.message }],
      closingParagraphs: [`Submitted on ${formattedDate} • Ref: ${contactId}`],
    });

    try {
      const response = await resend.emails.send({
        from: config.RESEND_FROM_EMAIL,
        to: config.CEO_NOTIFICATION_EMAIL,
        reply_to: contact.email,
        subject,
        text: textContent,
        html: htmlContent,
      });

      if (response.error) {
        console.error(`❌ [EmailService] Failed to notify CEO:`, response.error.message);
        return { success: false, error: response.error.message };
      }

      console.log(`✅ [EmailService] Contact lead notification sent to ${config.CEO_NOTIFICATION_EMAIL} (MsgId: ${response.data?.id})`);
      return { success: true, messageId: response.data?.id };
    } catch (err: any) {
      console.error(`❌ [EmailService] Failed to send contact notification:`, err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * 6. Contact acknowledgement sent to visitor
   */
  static async sendContactAcknowledgement(contact: IContact): Promise<SendEmailResult> {
    if (!resend) {
      console.log(`ℹ️ [EmailService (Mock)] Contact acknowledgement simulated for ${contact.email}`);
      return { success: true, messageId: "mock-msg-id" };
    }

    const subject = "Thank You for Contacting SparkIntellect";

    const textContent = `Hi ${contact.name || "there"},\n\n` +
      `Thank you for contacting SparkIntellect.\n\n` +
      `We have successfully received your enquiry.\n\n` +
      `Our team will review your message and get back to you shortly.\n\n` +
      `Regards,\nSparkIntellect\ninfo@sparkintellect.in`;

    const htmlContent = renderBrandedEmailHtml({
      salutation: `Hi ${contact.name || "there"},`,
      introParagraphs: [
        "Thank you for reaching out to SparkIntellect.",
        "We have successfully received your enquiry regarding our engineering services and solutions.",
      ],
      highlightBox: {
        content: "Our team will review your message and get back to you shortly.",
      },
    });

    try {
      const response = await resend.emails.send({
        from: config.RESEND_FROM_EMAIL,
        to: contact.email,
        reply_to: "info@sparkintellect.in",
        subject,
        text: textContent,
        html: htmlContent,
      });

      if (response.error) {
        console.error(`❌ [EmailService] Failed to send contact acknowledgement:`, response.error.message);
        return { success: false, error: response.error.message };
      }

      console.log(`✅ [EmailService] Contact acknowledgement sent to ${contact.email} (MsgId: ${response.data?.id})`);
      return { success: true, messageId: response.data?.id };
    } catch (err: any) {
      console.error(`❌ [EmailService] Failed to send contact acknowledgement:`, err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * 7. Password reset email for administrators
   */
  static async sendPasswordResetEmail(toEmail: string, resetToken: string): Promise<SendEmailResult> {
    if (!resend) {
      console.log(`ℹ️ [EmailService (Mock)] Password reset token for ${toEmail}: ${resetToken}`);
      return { success: true, messageId: "mock-msg-id" };
    }

    const resetLink = `https://admin.sparkintellect.in/reset-password?token=${encodeURIComponent(resetToken)}`;

    const textContent = `Password Reset Request — SparkIntellect\n\n` +
      `A password reset was requested for your SparkIntellect administrator account.\n\n` +
      `Use the following link to reset your password (valid for 1 hour):\n${resetLink}\n\n` +
      `If you did not request this, please contact the CEO immediately.`;

    const htmlContent = renderBrandedEmailHtml({
      headerTitle: "Security Notice",
      salutation: "Administrator Security Alert",
      introParagraphs: [
        "A password reset request was initiated for your SparkIntellect administrative account.",
      ],
      detailsBox: {
        title: "Reset Authorization Link",
        items: [{ label: "Action Link", value: resetLink, isLink: true }],
      },
      closingParagraphs: [
        "This link is valid for 1 hour. If you did not request this change, please contact security immediately.",
      ],
    });

    try {
      const response = await resend.emails.send({
        from: config.RESEND_FROM_EMAIL,
        to: toEmail,
        reply_to: "info@sparkintellect.in",
        subject: "Security Alert: Password Reset Request — SparkIntellect",
        text: textContent,
        html: htmlContent,
      });

      if (response.error) {
        console.error(`❌ [EmailService] Failed to send password reset:`, response.error.message);
        return { success: false, error: response.error.message };
      }

      console.log(`✅ [EmailService] Password reset email sent to ${toEmail}`);
      return { success: true, messageId: response.data?.id };
    } catch (err: any) {
      console.error(`❌ [EmailService] Failed to send password reset email:`, err.message);
      return { success: false, error: err.message };
    }
  }
}
