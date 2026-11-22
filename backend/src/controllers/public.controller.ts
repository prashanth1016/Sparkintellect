import { Request, Response } from "express";
import { Internship } from "../models/Internship.js";
import { Application } from "../models/Application.js";
import { Contact } from "../models/Contact.js";
import { CaseStudy } from "../models/CaseStudy.js";
import { Career } from "../models/Career.js";
import { CareerApplication } from "../models/CareerApplication.js";
import { FAQ } from "../models/FAQ.js";
import { Announcement } from "../models/Announcement.js";
import { WebsiteSettings } from "../models/WebsiteSettings.js";
import { GoogleSheetsService } from "../services/googleSheets.service.js";
import { EmailService } from "../services/email.service.js";
import { isValidObjectId } from "../utils/validation.js";
import { ReferenceIdService } from "../services/referenceId.service.js";
import { GoogleDriveStorageService } from "../services/googleDriveStorage.service.js";

export class PublicController {
  // Internships
  static async getInternships(req: Request, res: Response): Promise<void> {
    const list = await Internship.find({ published: true, status: "open" })
      .sort({ createdAt: -1 })
      .select("-__v");
    res.json({ success: true, data: list });
  }

  static async getInternshipBySlug(req: Request, res: Response): Promise<void> {
    const rawIdentifier = (req.params.slug || "").trim();
    if (!rawIdentifier) {
      res.status(400).json({ success: false, error: "Internship identifier required." });
      return;
    }

    const query = isValidObjectId(rawIdentifier)
      ? { $or: [{ slug: rawIdentifier.toLowerCase() }, { _id: rawIdentifier }], published: true }
      : { slug: rawIdentifier.toLowerCase(), published: true };

    const item = await Internship.findOne(query).select("-__v");

    if (!item) {
      res.status(404).json({ success: false, error: "Internship track not found." });
      return;
    }

    res.json({ success: true, data: item });
  }

  static async applyInternship(req: Request, res: Response): Promise<void> {
    const { internshipId, internshipSlug, internshipTitle } = req.body;
    let answers: Record<string, any> = {};

    try {
      if (typeof req.body.answers === "string") {
        answers = JSON.parse(req.body.answers);
      } else if (req.body.answers) {
        answers = req.body.answers;
      }
    } catch {
      answers = {};
    }

    const rawSlug = typeof internshipSlug === "string" ? internshipSlug.trim().toLowerCase() : undefined;
    const rawId = typeof internshipId === "string" ? internshipId.trim() : (req.params.id || "").trim();

    let internship = null;

    if (rawSlug) {
      internship = await Internship.findOne({
        slug: rawSlug,
        published: true,
        status: "open",
      });
    }

    if (!internship && rawId) {
      if (isValidObjectId(rawId)) {
        internship = await Internship.findOne({
          _id: rawId,
          published: true,
          status: "open",
        });
      } else {
        internship = await Internship.findOne({
          slug: rawId.toLowerCase(),
          published: true,
          status: "open",
        });
      }
    }

    if (!internship) {
      res.status(400).json({
        success: false,
        error: "Applications for this internship track are currently closed.",
      });
      return;
    }

    // Dynamic field validation
    for (const field of internship.applicationFields) {
      if (field.required) {
        if (field.type === "file" && !req.file) {
          res.status(400).json({
            success: false,
            error: `Missing required file: ${field.label}`,
          });
          return;
        } else if (field.type !== "file" && (!answers[field.name] || String(answers[field.name]).trim() === "")) {
          res.status(400).json({
            success: false,
            error: `Missing required field: ${field.label}`,
          });
          return;
        }
      }
    }

    // Duplicate application protection for the SAME internship track
    const normalizedEmail = (answers.email || "").toString().trim().toLowerCase();
    const rawPhone = (answers.phone || answers.mobile || "").toString().trim();
    const normalizedPhone = rawPhone.replace(/\D/g, "");

    const trackQuery = {
      $or: [
        { internshipId: internship._id },
        { internshipId: internship._id.toString() },
        { internshipSlug: internship.slug },
      ],
    };

    const duplicateOrConditions: any[] = [];

    if (normalizedEmail) {
      duplicateOrConditions.push({
        ...trackQuery,
        "answers.email": {
          $regex: `^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
          $options: "i",
        },
      });
    }

    if (normalizedPhone && normalizedPhone.length >= 7) {
      const phoneDigits = normalizedPhone.slice(-10);
      duplicateOrConditions.push(
        { ...trackQuery, "answers.phone": rawPhone },
        { ...trackQuery, "answers.phone": { $regex: phoneDigits } },
        { ...trackQuery, "answers.mobile": rawPhone },
        { ...trackQuery, "answers.mobile": { $regex: phoneDigits } }
      );
    }

    if (duplicateOrConditions.length > 0) {
      const existingApplication = await Application.findOne({
        $or: duplicateOrConditions,
      });

      if (existingApplication) {
        res.status(409).json({
          success: false,
          error: "You have already applied for this opportunity.",
          message: "You have already applied for this opportunity.",
          code: "DUPLICATE_APPLICATION",
        });
        return;
      }
    }

    const candidateEmail = answers.email;
    const candidateName = answers.fullName || answers.name || "Applicant";

    const applicationReferenceId = await ReferenceIdService.generateApplicationReferenceId(
      internship.title,
      internship.slug
    );

    let resumeUrl: string | undefined;
    let resumeFileName: string | undefined;
    let resumeKey: string | undefined;
    let resumeFileId: string | undefined;
    let resumeStorageProvider: "google-drive" | "local" = "google-drive";
    let resumeSize: number | undefined;
    let resumeMimeType: string | undefined;

    if (req.file && req.file.buffer) {
      try {
        const uploadResult = await GoogleDriveStorageService.uploadResume({
          buffer: req.file.buffer,
          originalFilename: req.file.originalname,
          mimeType: req.file.mimetype,
          candidateName,
          applicationReferenceId,
        });

        resumeFileId = uploadResult.fileId;
        resumeKey = uploadResult.fileId;
        resumeFileName = uploadResult.fileName;
        resumeMimeType = uploadResult.mimeType;
        resumeSize = uploadResult.size;
        resumeStorageProvider = uploadResult.storageProvider;
        resumeUrl = `/api/v1/admin/applications/${applicationReferenceId}/resume`;
      } catch (uploadErr: any) {
        console.error("❌ [PublicController] Resume upload to Google Drive failed:", uploadErr.message);
        res.status(502).json({
          success: false,
          error: "Unable to securely store your resume in Google Drive. Please try submitting again.",
        });
        return;
      }
    }

    const application = await Application.create({
      applicationReferenceId,
      internshipId: internship._id,
      internshipSlug: internship.slug,
      internshipTitle: internship.title,
      answers,
      resumeUrl,
      resumeFileName,
      resumeKey,
      resumeFileId,
      resumeStorageProvider,
      resumeSize,
      resumeMimeType,
      status: "pending",
      googleSheetsSyncStatus: "pending",
      ipAddress: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
    });

    if (resumeFileId) {
      application.resumeUrl = `/api/v1/admin/applications/${application._id}/resume`;
      await application.save();
    }

    // Asynchronous Google Sheets sync + Transactional email confirmation
    GoogleSheetsService.syncApplication(application).catch(() => {});

    if (candidateEmail && typeof candidateEmail === "string" && candidateEmail.includes("@")) {
      EmailService.sendInternshipApplicationConfirmation({
        toEmail: candidateEmail.trim().toLowerCase(),
        candidateName,
        trackTitle: internship.title,
        applicationReferenceId: application.applicationReferenceId,
        applicationId: application._id.toString(),
      }).then(async (result) => {
        if (result.success) {
          application.emailStatus = "sent";
          application.emailMessageId = result.messageId;
          application.emailSentAt = new Date();
          await application.save().catch(() => {});
        } else {
          application.emailStatus = "failed";
          application.emailError = result.error;
          await application.save().catch(() => {});
        }
      }).catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: "Your application has been successfully submitted and stored.",
      applicationId: application.applicationReferenceId,
      applicationReferenceId: application.applicationReferenceId,
      _id: application._id.toString(),
    });
  }

  // Contact Leads
  static async submitContact(req: Request, res: Response): Promise<void> {
    const { name, email, phone, company, service, budget, timeline, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        error: "Name, email, and project message are required.",
      });
      return;
    }

    const contactReferenceId = await ReferenceIdService.generateContactReferenceId();

    const contact = await Contact.create({
      contactReferenceId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      company: company ? company.trim() : undefined,
      service: service || "General Scope",
      budget,
      timeline,
      message: message.trim(),
      status: "new",
      notificationEmailStatus: "pending",
      acknowledgementEmailStatus: "pending",
      ipAddress: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
    });

    // 1. Asynchronous internal notification to info@sparkintellect.in
    EmailService.sendContactNotification(contact).then(async (res) => {
      if (res.success) {
        contact.notificationEmailStatus = "sent";
        contact.emailMessageId = res.messageId;
        contact.emailSentAt = new Date();
        await contact.save().catch(() => {});
      } else {
        contact.notificationEmailStatus = "failed";
        contact.emailError = res.error;
        await contact.save().catch(() => {});
      }
    }).catch(() => {});

    // 2. Asynchronous acknowledgement email to visitor
    if (contact.email && contact.email.includes("@")) {
      EmailService.sendContactAcknowledgement(contact).then(async (res) => {
        if (res.success) {
          contact.acknowledgementEmailStatus = "sent";
          await contact.save().catch(() => {});
        } else {
          contact.acknowledgementEmailStatus = "failed";
          await contact.save().catch(() => {});
        }
      }).catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: "Thank you! Your project enquiry has been received.",
      contactReferenceId: contact.contactReferenceId,
      contactId: contact.contactReferenceId,
    });
  }

  // Case Studies
  static async getCaseStudies(req: Request, res: Response): Promise<void> {
    const list = await CaseStudy.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: list });
  }

  static async getCaseStudyBySlug(req: Request, res: Response): Promise<void> {
    const rawSlug = (req.params.slug || "").trim();
    const query = isValidObjectId(rawSlug)
      ? { $or: [{ slug: rawSlug }, { _id: rawSlug }] }
      : { slug: rawSlug };
    const item = await CaseStudy.findOne(query);
    if (!item) {
      res.status(404).json({ success: false, error: "Case study not found." });
      return;
    }
    res.json({ success: true, data: item });
  }

  // Careers
  static async getCareers(req: Request, res: Response): Promise<void> {
    const list = await Career.find({ status: "active" }).sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  }

  static async getCareerBySlug(req: Request, res: Response): Promise<void> {
    const rawSlug = (req.params.slug || "").trim();
    const query = isValidObjectId(rawSlug)
      ? { $or: [{ slug: rawSlug }, { _id: rawSlug }], status: "active" }
      : { slug: rawSlug, status: "active" };
    const item = await Career.findOne(query);
    if (!item) {
      res.status(404).json({ success: false, error: "Position not found." });
      return;
    }
    res.json({ success: true, data: item });
  }

  static async applyCareer(req: Request, res: Response): Promise<void> {
    const { careerId, careerSlug, careerTitle } = req.body;
    let personalInfo: any = {};
    let academicInfo: any = {};
    let professionalInfo: any = {};

    try {
      personalInfo = typeof req.body.personalInfo === "string" ? JSON.parse(req.body.personalInfo) : (req.body.personalInfo || {});
      academicInfo = typeof req.body.academicInfo === "string" ? JSON.parse(req.body.academicInfo) : (req.body.academicInfo || {});
      professionalInfo = typeof req.body.professionalInfo === "string" ? JSON.parse(req.body.professionalInfo) : (req.body.professionalInfo || {});
    } catch {
      // ignore
    }

    if (!personalInfo.fullName && req.body.fullName) personalInfo.fullName = req.body.fullName;
    if (!personalInfo.email && req.body.email) personalInfo.email = req.body.email;
    if (!personalInfo.mobile && req.body.mobile) personalInfo.mobile = req.body.mobile;
    if (!personalInfo.location && req.body.location) personalInfo.location = req.body.location;

    if (!personalInfo.fullName || !personalInfo.email || !personalInfo.mobile) {
      res.status(400).json({ success: false, error: "Personal information (Full Name, Email, Mobile) is required." });
      return;
    }

    const applicationReferenceId = await ReferenceIdService.generateCareerApplicationReferenceId();

    let resumeUrl: string | undefined;
    let resumeFileName: string | undefined;
    let resumeFileId: string | undefined;
    let resumeStorageProvider: "google-drive" | "local" = "google-drive";
    let resumeSize: number | undefined;
    let resumeMimeType: string | undefined;

    if (req.file && req.file.buffer) {
      try {
        const uploadResult = await GoogleDriveStorageService.uploadResume({
          buffer: req.file.buffer,
          originalFilename: req.file.originalname,
          mimeType: req.file.mimetype,
          candidateName: personalInfo.fullName,
          applicationReferenceId,
        });

        resumeFileId = uploadResult.fileId;
        resumeFileName = uploadResult.fileName;
        resumeMimeType = uploadResult.mimeType;
        resumeSize = uploadResult.size;
        resumeStorageProvider = uploadResult.storageProvider;
        resumeUrl = `/api/v1/admin/career-applications/${applicationReferenceId}/resume`;
      } catch (uploadErr: any) {
        console.error("❌ [PublicController] Career resume upload failed:", uploadErr.message);
      }
    }

    const newApp = await CareerApplication.create({
      applicationReferenceId,
      careerId: careerId || "general",
      careerSlug: careerSlug || "general",
      careerTitle: careerTitle || professionalInfo.position || "Engineering Position",
      personalInfo,
      academicInfo,
      professionalInfo,
      resumeUrl,
      resumeFileName,
      resumeFileId,
      resumeStorageProvider,
      resumeSize,
      resumeMimeType,
      status: "new",
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.status(201).json({
      success: true,
      data: {
        applicationReferenceId: newApp.applicationReferenceId,
        message: "Your application has been received and logged in our candidate pipeline.",
      },
    });
  }

  // FAQs & Announcements & Settings
  static async getFAQs(req: Request, res: Response): Promise<void> {
    const list = await FAQ.find({ published: true }).sort({ order: 1 });
    res.json({ success: true, data: list });
  }

  static async getAnnouncements(req: Request, res: Response): Promise<void> {
    const list = await Announcement.find({ active: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  }

  static async getSettings(req: Request, res: Response): Promise<void> {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.json({ success: true, data: settings });
  }
}
