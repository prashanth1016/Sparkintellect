import { Request, Response } from "express";
import fs from "fs";
import { AuthRequest } from "../middleware/auth.js";
import { Internship } from "../models/Internship.js";
import { Application } from "../models/Application.js";
import { Contact } from "../models/Contact.js";
import { User } from "../models/User.js";
import { Career } from "../models/Career.js";
import { CareerApplication } from "../models/CareerApplication.js";
import { CaseStudy } from "../models/CaseStudy.js";
import { FAQ } from "../models/FAQ.js";
import { Announcement } from "../models/Announcement.js";
import { WebsiteSettings } from "../models/WebsiteSettings.js";
import { AuditLog } from "../models/AuditLog.js";
import { AuthService } from "../services/auth.service.js";
import { GoogleSheetsService } from "../services/googleSheets.service.js";
import { StorageService } from "../services/storage.service.js";
import { GoogleDriveStorageService } from "../services/googleDriveStorage.service.js";
import { EmailService } from "../services/email.service.js";
import { isValidObjectId } from "../utils/validation.js";

export class AdminController {
  // Dashboard
  static async getDashboardStats(req: AuthRequest, res: Response): Promise<void> {
    const [
      totalApplications,
      pendingApplications,
      totalContacts,
      newContacts,
      openInternships,
      activeEmployees,
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Internship.countDocuments({ status: "open", published: true }),
      User.countDocuments({ status: "active" }),
    ]);

    res.json({
      success: true,
      stats: {
        totalApplications,
        pendingApplications,
        totalContacts,
        newContacts,
        openInternships,
        activeEmployees,
        sheetsSyncStatus: "healthy",
      },
    });
  }

  // Internships CMS
  static async getInternships(req: AuthRequest, res: Response): Promise<void> {
    const list = await Internship.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  }

  static async createInternship(req: AuthRequest, res: Response): Promise<void> {
    const item = await Internship.create(req.body);
    res.status(201).json({ success: true, data: item });
  }

  static async updateInternship(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid internship ID format." });
      return;
    }
    const item = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      res.status(404).json({ success: false, error: "Internship not found." });
      return;
    }
    res.json({ success: true, data: item });
  }

  static async deleteInternship(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid internship ID format." });
      return;
    }
    const item = await Internship.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Internship track deleted." });
  }

  // Applications
  static async getApplications(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const query: Record<string, any> = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { applicationReferenceId: { $regex: search, $options: "i" } },
        { internshipTitle: { $regex: search, $options: "i" } },
        { "answers.fullName": { $regex: search, $options: "i" } },
        { "answers.email": { $regex: search, $options: "i" } },
        { "answers.phone": { $regex: search, $options: "i" } },
      ];
    }

    const [applications, total] = await Promise.all([
      Application.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Application.countDocuments(query),
    ]);

    res.json({ success: true, applications, total, page, limit });
  }

  static async updateApplicationStatus(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid application ID format." });
      return;
    }
    const { status, notes } = req.body;
    const item = await Application.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    if (!item) {
      res.status(404).json({ success: false, error: "Application not found." });
      return;
    }

    // Trigger Google Sheets sync asynchronously on status update
    GoogleSheetsService.syncApplication(item).catch(() => {});

    res.json({ success: true, data: item });
  }

  static async downloadResume(req: AuthRequest, res: Response): Promise<void> {
    const rawId = (req.params.id || "").trim();
    let app = null;

    if (isValidObjectId(rawId)) {
      app = await Application.findById(rawId);
    } else {
      app = await Application.findOne({ applicationReferenceId: rawId });
    }

    if (!app || (!app.resumeFileId && !app.resumeKey)) {
      res.status(404).json({ success: false, error: "Resume file not found." });
      return;
    }

    const fileId = app.resumeFileId || app.resumeKey!;
    const storageProvider = app.resumeStorageProvider || (app.resumeFileId ? "google-drive" : "local");
    const downloadFileName = app.resumeFileName || "Candidate_Resume.pdf";

    try {
      const result = await GoogleDriveStorageService.downloadResumeStream(fileId, storageProvider);

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(result.fileName || downloadFileName)}"`
      );
      res.setHeader("Content-Type", result.mimeType || app.resumeMimeType || "application/pdf");
      if (result.size) {
        res.setHeader("Content-Length", result.size);
      }

      result.stream.pipe(res);
    } catch (err: any) {
      console.error(`❌ [AdminController] Failed to stream resume (${fileId}):`, err.message);
      res.status(404).json({ success: false, error: "Physical or Google Drive resume file missing." });
    }
  }

  static async retrySheetsSync(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid application ID format." });
      return;
    }
    const app = await Application.findById(req.params.id);
    if (!app) {
      res.status(404).json({ success: false, error: "Application not found." });
      return;
    }

    const success = await GoogleSheetsService.syncApplication(app);
    res.json({ success, status: app.googleSheetsSyncStatus });
  }

  static async deleteApplication(req: AuthRequest, res: Response): Promise<void> {
    const rawId = (req.params.id || "").trim();
    let app = null;

    if (isValidObjectId(rawId)) {
      app = await Application.findById(rawId);
    } else {
      app = await Application.findOne({ applicationReferenceId: rawId });
    }

    if (!app) {
      res.status(404).json({ success: false, error: "Application not found." });
      return;
    }

    // 1. Delete resume file from Google Drive and/or local storage
    const fileId = app.resumeFileId || app.resumeKey;
    if (fileId) {
      try {
        await GoogleDriveStorageService.deleteResume(fileId, app.resumeStorageProvider);
      } catch (fileErr: any) {
        console.warn(`⚠️ Failed to remove resume file ${fileId}:`, fileErr.message);
      }
    }

    // 2. Remove row from Google Sheets asynchronously
    const refOrId = app.applicationReferenceId || app._id.toString();
    GoogleSheetsService.deleteApplicationRow(refOrId).catch((err) => {
      console.warn("⚠️ Failed to delete Google Sheets row for application:", err.message);
    });

    // 3. Delete document from MongoDB
    await Application.findByIdAndDelete(app._id);

    res.json({
      success: true,
      message: "Application permanently deleted.",
      deletedId: app._id,
      applicationReferenceId: app.applicationReferenceId,
    });
  }

  static async getTrackApplicationCount(req: AuthRequest, res: Response): Promise<void> {
    const rawIdentifier = (req.params.trackSlugOrId || "").trim();
    if (!rawIdentifier) {
      res.status(400).json({ success: false, error: "Track identifier required." });
      return;
    }

    const query = isValidObjectId(rawIdentifier)
      ? { $or: [{ internshipSlug: rawIdentifier.toLowerCase() }, { internshipId: rawIdentifier }, { internshipTitle: { $regex: `^${rawIdentifier}$`, $options: "i" } }] }
      : { $or: [{ internshipSlug: rawIdentifier.toLowerCase() }, { internshipTitle: { $regex: `^${rawIdentifier}$`, $options: "i" } }] };

    const count = await Application.countDocuments(query);
    res.json({ success: true, count });
  }

  static async deleteTrackApplications(req: AuthRequest, res: Response): Promise<void> {
    const rawIdentifier = (req.params.trackSlugOrId || "").trim();
    if (!rawIdentifier) {
      res.status(400).json({ success: false, error: "Track identifier required." });
      return;
    }

    const query = isValidObjectId(rawIdentifier)
      ? { $or: [{ internshipSlug: rawIdentifier.toLowerCase() }, { internshipId: rawIdentifier }, { internshipTitle: { $regex: `^${rawIdentifier}$`, $options: "i" } }] }
      : { $or: [{ internshipSlug: rawIdentifier.toLowerCase() }, { internshipTitle: { $regex: `^${rawIdentifier}$`, $options: "i" } }] };

    const appsToDelete = await Application.find(query);
    if (appsToDelete.length === 0) {
      res.json({ success: true, message: "No applications found for this track.", deletedCount: 0 });
      return;
    }

    // 1. Delete associated resume files from Google Drive / Local Storage
    for (const app of appsToDelete) {
      const fileId = app.resumeFileId || app.resumeKey;
      if (fileId) {
        try {
          await GoogleDriveStorageService.deleteResume(fileId, app.resumeStorageProvider);
        } catch (fileErr: any) {
          console.warn(`⚠️ Failed to remove resume file ${fileId}:`, fileErr.message);
        }
      }
    }

    // 2. Remove rows from Google Sheets
    const referenceIdsOrMongoIds = appsToDelete.map((a) => a.applicationReferenceId || a._id.toString());
    GoogleSheetsService.deleteMultipleApplicationRows(referenceIdsOrMongoIds).catch((err) => {
      console.warn("⚠️ Failed to bulk delete Google Sheets rows:", err.message);
    });

    // 3. Delete documents from MongoDB
    const deleteResult = await Application.deleteMany(query);

    res.json({
      success: true,
      message: `Successfully deleted ${deleteResult.deletedCount} application(s) for this track.`,
      deletedCount: deleteResult.deletedCount,
    });
  }

  static async sendShortlistedEmail(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid application ID format." });
      return;
    }

    const app = await Application.findById(req.params.id);
    if (!app) {
      res.status(404).json({ success: false, error: "Application not found." });
      return;
    }

    if (app.status !== "shortlisted") {
      res.status(400).json({
        success: false,
        error: `Application status must be SHORTLISTED to send this email. Current status: ${app.status.toUpperCase()}`,
      });
      return;
    }

    const candidateEmail = app.answers?.email;
    const candidateName = app.answers?.fullName || app.answers?.name || "Candidate";

    if (!candidateEmail || typeof candidateEmail !== "string" || !candidateEmail.includes("@")) {
      res.status(400).json({ success: false, error: "Candidate email address not found in application answers." });
      return;
    }

    const {
      subject,
      interviewDate,
      interviewTime,
      interviewMode,
      meetingLink,
      interviewInstructions,
      additionalDetails,
      messageBody,
    } = req.body || {};

    const result = await EmailService.sendShortlistedEmail({
      toEmail: candidateEmail.trim().toLowerCase(),
      candidateName,
      trackTitle: app.internshipTitle,
      applicationReferenceId: app.applicationReferenceId,
      subject: subject ? String(subject).trim() : undefined,
      interviewDate: interviewDate ? String(interviewDate).trim() : undefined,
      interviewTime: interviewTime ? String(interviewTime).trim() : undefined,
      interviewMode: interviewMode ? String(interviewMode).trim() : "Online",
      meetingLink: meetingLink ? String(meetingLink).trim() : undefined,
      interviewInstructions: interviewInstructions ? String(interviewInstructions).trim() : undefined,
      additionalDetails: additionalDetails ? String(additionalDetails).trim() : undefined,
      messageBody: messageBody ? String(messageBody).trim() : undefined,
    });

    if (!result.success) {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to send shortlisted email via Resend.",
      });
      return;
    }

    if (!app.communication) app.communication = {};
    app.communication.shortlisted = {
      sent: true,
      sentAt: new Date(),
      sentBy: req.user?.email || req.user?.name || "Admin",
      messageId: result.messageId,
      subject: subject || "You've Been Shortlisted — SparkIntellect",
    };
    await app.save();

    res.json({
      success: true,
      message: `Shortlisted email sent successfully to ${candidateEmail}.`,
      data: app.communication.shortlisted,
    });
  }

  static async sendAcceptedEmail(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid application ID format." });
      return;
    }

    const app = await Application.findById(req.params.id);
    if (!app) {
      res.status(404).json({ success: false, error: "Application not found." });
      return;
    }

    if (app.status !== "accepted") {
      res.status(400).json({
        success: false,
        error: `Application status must be ACCEPTED to send this email. Current status: ${app.status.toUpperCase()}`,
      });
      return;
    }

    const candidateEmail = app.answers?.email;
    const candidateName = app.answers?.fullName || app.answers?.name || "Candidate";

    if (!candidateEmail || typeof candidateEmail !== "string" || !candidateEmail.includes("@")) {
      res.status(400).json({ success: false, error: "Candidate email address not found in application answers." });
      return;
    }

    const {
      subject,
      joiningDate,
      joiningTime,
      internshipDuration,
      joiningMode,
      joiningLink,
      onboardingInstructions,
      requiredDocuments,
      additionalDetails,
      messageBody,
    } = req.body || {};

    const result = await EmailService.sendAcceptedEmail({
      toEmail: candidateEmail.trim().toLowerCase(),
      candidateName,
      trackTitle: app.internshipTitle,
      applicationReferenceId: app.applicationReferenceId,
      subject: subject ? String(subject).trim() : undefined,
      joiningDate: joiningDate ? String(joiningDate).trim() : undefined,
      joiningTime: joiningTime ? String(joiningTime).trim() : undefined,
      internshipDuration: internshipDuration ? String(internshipDuration).trim() : undefined,
      joiningMode: joiningMode ? String(joiningMode).trim() : "Online",
      joiningLink: joiningLink ? String(joiningLink).trim() : undefined,
      onboardingInstructions: onboardingInstructions ? String(onboardingInstructions).trim() : undefined,
      requiredDocuments: requiredDocuments ? String(requiredDocuments).trim() : undefined,
      additionalDetails: additionalDetails ? String(additionalDetails).trim() : undefined,
      messageBody: messageBody ? String(messageBody).trim() : undefined,
    });

    if (!result.success) {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to send selection email via Resend.",
      });
      return;
    }

    if (!app.communication) app.communication = {};
    app.communication.accepted = {
      sent: true,
      sentAt: new Date(),
      sentBy: req.user?.email || req.user?.name || "Admin",
      messageId: result.messageId,
      subject: subject || "Congratulations! You've Been Selected — SparkIntellect",
    };
    await app.save();

    res.json({
      success: true,
      message: `Selection email sent successfully to ${candidateEmail}.`,
      data: app.communication.accepted,
    });
  }

  static async sendRejectedEmail(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid application ID format." });
      return;
    }

    const app = await Application.findById(req.params.id);
    if (!app) {
      res.status(404).json({ success: false, error: "Application not found." });
      return;
    }

    if (app.status !== "rejected") {
      res.status(400).json({
        success: false,
        error: `Application status must be REJECTED to send this email. Current status: ${app.status.toUpperCase()}`,
      });
      return;
    }

    const candidateEmail = app.answers?.email;
    const candidateName = app.answers?.fullName || app.answers?.name || "Candidate";

    if (!candidateEmail || typeof candidateEmail !== "string" || !candidateEmail.includes("@")) {
      res.status(400).json({ success: false, error: "Candidate email address not found in application answers." });
      return;
    }

    const { subject, messageBody, additionalMessage } = req.body || {};

    const result = await EmailService.sendRejectedEmail({
      toEmail: candidateEmail.trim().toLowerCase(),
      candidateName,
      trackTitle: app.internshipTitle,
      applicationReferenceId: app.applicationReferenceId,
      subject: subject ? String(subject).trim() : undefined,
      messageBody: messageBody ? String(messageBody).trim() : undefined,
      additionalMessage: additionalMessage ? String(additionalMessage).trim() : undefined,
    });

    if (!result.success) {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to send rejection email via Resend.",
      });
      return;
    }

    if (!app.communication) app.communication = {};
    app.communication.rejected = {
      sent: true,
      sentAt: new Date(),
      sentBy: req.user?.email || req.user?.name || "Admin",
      messageId: result.messageId,
      subject: subject || "Update Regarding Your SparkIntellect Application",
    };
    await app.save();

    res.json({
      success: true,
      message: `Rejection email sent successfully to ${candidateEmail}.`,
      data: app.communication.rejected,
    });
  }

  // Contacts
  static async getContacts(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const query: Record<string, any> = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Contact.countDocuments(query),
    ]);

    res.json({ success: true, contacts, total, page, limit });
  }

  static async updateContactStatus(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid contact ID format." });
      return;
    }
    const { status, notes } = req.body;
    const item = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    if (!item) {
      res.status(404).json({ success: false, error: "Contact lead not found." });
      return;
    }
    res.json({ success: true, data: item });
  }

  // Employees & RBAC (CEO only or employee.create)
  static async getEmployees(req: AuthRequest, res: Response): Promise<void> {
    const users = await User.find().select("-passwordHash -twoFactorSecret");
    res.json({ success: true, data: users });
  }

  static async createEmployee(req: AuthRequest, res: Response): Promise<void> {
    const { name, email, role, permissions, password } = req.body;

    // Strict Security Constraint: CEO role cannot be created via API
    if (role === "CEO") {
      res.status(403).json({
        success: false,
        error: "CEO account cannot be created via API. Bootstrap directly in MongoDB via script.",
        code: "CEO_CREATION_BLOCKED",
      });
      return;
    }

    if (!name || !email || !password || password.length < 8) {
      res.status(400).json({
        success: false,
        error: "Name, email, and a password of at least 8 characters are required.",
      });
      return;
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      res.status(400).json({ success: false, error: "An account with this email already exists." });
      return;
    }

    const passwordHash = await AuthService.hashPassword(password);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: role || "STAFF",
      permissions: permissions || [],
      status: "active",
    });

    res.status(201).json({
      success: true,
      message: "Employee account created successfully.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        status: user.status,
      },
    });
  }

  static async updateEmployee(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid employee ID format." });
      return;
    }
    const target = await User.findById(req.params.id);
    if (!target) {
      res.status(404).json({ success: false, error: "Employee not found." });
      return;
    }

    // Protection: Prevent demoting or deactivating the CEO
    if (target.role === "CEO" && req.body.status === "inactive") {
      res.status(403).json({ success: false, error: "CEO account cannot be deactivated." });
      return;
    }

    // Do not allow promoting to CEO via update
    if (req.body.role === "CEO" && target.role !== "CEO") {
      res.status(403).json({ success: false, error: "Cannot promote user to CEO role via API." });
      return;
    }

    if (req.body.password && req.body.password.length >= 8) {
      target.passwordHash = await AuthService.hashPassword(req.body.password);
    }

    if (req.body.name) target.name = req.body.name;
    if (req.body.permissions) target.permissions = req.body.permissions;
    if (req.body.status) target.status = req.body.status;

    await target.save();

    res.json({
      success: true,
      message: "Employee updated.",
      user: {
        id: target._id.toString(),
        name: target.name,
        email: target.email,
        role: target.role,
        permissions: target.permissions,
        status: target.status,
      },
    });
  }

  // Careers, Case Studies, FAQs, Announcements, Settings, AuditLogs
  static async getCareers(req: AuthRequest, res: Response): Promise<void> {
    const data = await Career.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  }

  static async createCareer(req: AuthRequest, res: Response): Promise<void> {
    const item = await Career.create(req.body);
    res.status(201).json({ success: true, data: item });
  }

  static async updateCareer(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid career ID format." });
      return;
    }
    const item = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  }

  static async deleteCareer(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid career ID format." });
      return;
    }
    await Career.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Career deleted." });
  }

  // Career Applications Management
  static async getCareerApplications(req: AuthRequest, res: Response): Promise<void> {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 15));
    const skip = (page - 1) * limit;

    const query: any = {};
    if (req.query.status && req.query.status !== "all") {
      query.status = req.query.status;
    }
    if (req.query.search) {
      const searchStr = (req.query.search as string).trim();
      query.$or = [
        { applicationReferenceId: { $regex: searchStr, $options: "i" } },
        { "personalInfo.fullName": { $regex: searchStr, $options: "i" } },
        { "personalInfo.email": { $regex: searchStr, $options: "i" } },
        { careerTitle: { $regex: searchStr, $options: "i" } },
      ];
    }

    const [applications, total] = await Promise.all([
      CareerApplication.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      CareerApplication.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        applications,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  }

  static async updateCareerApplicationStatus(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, notes } = req.body;

    const app = await CareerApplication.findById(id);
    if (!app) {
      res.status(404).json({ success: false, error: "Career application not found." });
      return;
    }

    if (status) app.status = status;
    if (notes !== undefined) app.notes = notes;
    await app.save();

    res.json({ success: true, data: app });
  }

  static async deleteCareerApplication(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const app = await CareerApplication.findById(id);
    if (!app) {
      res.status(404).json({ success: false, error: "Career application not found." });
      return;
    }

    await CareerApplication.findByIdAndDelete(id);
    res.json({ success: true, message: "Career application deleted successfully." });
  }

  static async downloadCareerResume(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const app = await CareerApplication.findOne({
      $or: [{ _id: isValidObjectId(id) ? id : null }, { applicationReferenceId: id }],
    });

    if (!app || !app.resumeFileId) {
      res.status(404).json({ success: false, error: "Resume file not found." });
      return;
    }

    try {
      const storageProvider = (app as any).storageProvider || "local";
      const downloadResult = await GoogleDriveStorageService.downloadResumeStream(app.resumeFileId, storageProvider);
      res.setHeader("Content-Type", downloadResult.mimeType || "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(downloadResult.fileName || app.resumeFileName || "resume.pdf")}"`
      );
      if (downloadResult.size) {
        res.setHeader("Content-Length", downloadResult.size);
      }
      downloadResult.stream.pipe(res);
    } catch (err: any) {
      console.error(`❌ [AdminController] Failed to stream career resume (${app.resumeFileId}):`, err.message);
      res.status(404).json({ success: false, error: "Resume file not found or could not be streamed." });
    }
  }

  static async getCaseStudies(req: AuthRequest, res: Response): Promise<void> {
    const data = await CaseStudy.find().sort({ order: 1 });
    res.json({ success: true, data });
  }

  static async createCaseStudy(req: AuthRequest, res: Response): Promise<void> {
    const item = await CaseStudy.create(req.body);
    res.status(201).json({ success: true, data: item });
  }

  static async updateCaseStudy(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid case study ID format." });
      return;
    }
    const item = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  }

  static async deleteCaseStudy(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid case study ID format." });
      return;
    }
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Case study deleted." });
  }

  static async getFAQs(req: AuthRequest, res: Response): Promise<void> {
    const data = await FAQ.find().sort({ order: 1 });
    res.json({ success: true, data });
  }

  static async createFAQ(req: AuthRequest, res: Response): Promise<void> {
    const item = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: item });
  }

  static async updateFAQ(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid FAQ ID format." });
      return;
    }
    const item = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  }

  static async deleteFAQ(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid FAQ ID format." });
      return;
    }
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "FAQ deleted." });
  }

  static async getAnnouncements(req: AuthRequest, res: Response): Promise<void> {
    const data = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  }

  static async createAnnouncement(req: AuthRequest, res: Response): Promise<void> {
    const item = await Announcement.create(req.body);
    res.status(201).json({ success: true, data: item });
  }

  static async updateAnnouncement(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid announcement ID format." });
      return;
    }
    const item = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  }

  static async deleteAnnouncement(req: AuthRequest, res: Response): Promise<void> {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ success: false, error: "Invalid announcement ID format." });
      return;
    }
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Announcement deleted." });
  }

  static async getSettings(req: AuthRequest, res: Response): Promise<void> {
    let settings = await WebsiteSettings.findOne();
    if (!settings) settings = await WebsiteSettings.create({});
    res.json({ success: true, data: settings });
  }

  static async updateSettings(req: AuthRequest, res: Response): Promise<void> {
    let settings = await WebsiteSettings.findOne();
    if (!settings) settings = await WebsiteSettings.create(req.body);
    else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json({ success: true, data: settings });
  }

  static async getAuditLogs(req: AuthRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    const [logs, total] = await Promise.all([
      AuditLog.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      AuditLog.countDocuments(),
    ]);

    res.json({ success: true, logs, total, page, limit });
  }
}
