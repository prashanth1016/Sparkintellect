import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import { requirePermission, requireCEO } from "../middleware/rbac.js";
import { adminApiRateLimiter } from "../middleware/rateLimiter.js";
import { logAuditEvent } from "../middleware/auditLogger.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

// Protect all admin routes with authentication and rate limiting
router.use(authenticateToken);
router.use(adminApiRateLimiter);

// Dashboard
router.get("/dashboard/stats", asyncHandler(AdminController.getDashboardStats));

// Internships CMS
router.get("/internships", requirePermission("internship.read"), asyncHandler(AdminController.getInternships));
router.post(
  "/internships",
  requirePermission("internship.create"),
  logAuditEvent("internship.create"),
  asyncHandler(AdminController.createInternship)
);
router.put(
  "/internships/:id",
  requirePermission("internship.update"),
  logAuditEvent("internship.update"),
  asyncHandler(AdminController.updateInternship)
);
router.delete(
  "/internships/:id",
  requirePermission("internship.archive"),
  logAuditEvent("internship.delete"),
  asyncHandler(AdminController.deleteInternship)
);

// Applications
router.get("/applications", requirePermission("application.read"), asyncHandler(AdminController.getApplications));
router.get(
  "/applications/track/:trackSlugOrId/count",
  requirePermission("application.read"),
  asyncHandler(AdminController.getTrackApplicationCount)
);
router.delete(
  "/applications/track/:trackSlugOrId",
  requirePermission("application.delete"),
  logAuditEvent("application.bulk_track_delete"),
  asyncHandler(AdminController.deleteTrackApplications)
);
router.delete(
  "/applications/:id",
  requirePermission("application.delete"),
  logAuditEvent("application.delete"),
  asyncHandler(AdminController.deleteApplication)
);
router.put(
  "/applications/:id/status",
  requirePermission("application.update"),
  logAuditEvent("application.status_update"),
  asyncHandler(AdminController.updateApplicationStatus)
);
router.get(
  "/applications/:id/resume",
  requirePermission("application.read"),
  asyncHandler(AdminController.downloadResume)
);
router.post(
  "/applications/:id/sync-sheets",
  requirePermission("application.update"),
  asyncHandler(AdminController.retrySheetsSync)
);
router.post(
  "/applications/:id/email/shortlisted",
  requirePermission("application.update"),
  logAuditEvent("application.email_shortlisted"),
  asyncHandler(AdminController.sendShortlistedEmail)
);
router.post(
  "/applications/:id/email/accepted",
  requirePermission("application.update"),
  logAuditEvent("application.email_accepted"),
  asyncHandler(AdminController.sendAcceptedEmail)
);
router.post(
  "/applications/:id/email/rejected",
  requirePermission("application.update"),
  logAuditEvent("application.email_rejected"),
  asyncHandler(AdminController.sendRejectedEmail)
);

// Contacts
router.get("/contacts", requirePermission("contact.read"), asyncHandler(AdminController.getContacts));
router.put(
  "/contacts/:id/status",
  requirePermission("contact.update"),
  logAuditEvent("contact.status_update"),
  asyncHandler(AdminController.updateContactStatus)
);

// Employees (CEO Only or employee.read / employee.create)
router.get("/employees", requirePermission("employee.read"), asyncHandler(AdminController.getEmployees));
router.post(
  "/employees",
  requirePermission("employee.create"),
  logAuditEvent("employee.create"),
  asyncHandler(AdminController.createEmployee)
);
router.put(
  "/employees/:id",
  requirePermission("employee.update"),
  logAuditEvent("employee.update"),
  asyncHandler(AdminController.updateEmployee)
);

// Careers
router.get("/careers", requirePermission("career.read"), asyncHandler(AdminController.getCareers));
router.post(
  "/careers",
  requirePermission("career.create"),
  logAuditEvent("career.create"),
  asyncHandler(AdminController.createCareer)
);
router.put(
  "/careers/:id",
  requirePermission("career.update"),
  logAuditEvent("career.update"),
  asyncHandler(AdminController.updateCareer)
);
router.delete(
  "/careers/:id",
  requirePermission("career.update"),
  logAuditEvent("career.delete"),
  asyncHandler(AdminController.deleteCareer)
);

// Case Studies
router.get("/case-studies", requirePermission("content.read"), asyncHandler(AdminController.getCaseStudies));
router.post(
  "/case-studies",
  requirePermission("content.create"),
  logAuditEvent("case_study.create"),
  asyncHandler(AdminController.createCaseStudy)
);
router.put(
  "/case-studies/:id",
  requirePermission("content.update"),
  logAuditEvent("case_study.update"),
  asyncHandler(AdminController.updateCaseStudy)
);
router.delete(
  "/case-studies/:id",
  requirePermission("content.update"),
  logAuditEvent("case_study.delete"),
  asyncHandler(AdminController.deleteCaseStudy)
);

// FAQs
router.get("/faqs", requirePermission("content.read"), asyncHandler(AdminController.getFAQs));
router.post("/faqs", requirePermission("content.create"), logAuditEvent("faq.create"), asyncHandler(AdminController.createFAQ));
router.put("/faqs/:id", requirePermission("content.update"), logAuditEvent("faq.update"), asyncHandler(AdminController.updateFAQ));
router.delete("/faqs/:id", requirePermission("content.update"), logAuditEvent("faq.delete"), asyncHandler(AdminController.deleteFAQ));

// Announcements
router.get("/announcements", requirePermission("content.read"), asyncHandler(AdminController.getAnnouncements));
router.post(
  "/announcements",
  requirePermission("content.create"),
  logAuditEvent("announcement.create"),
  asyncHandler(AdminController.createAnnouncement)
);
router.put(
  "/announcements/:id",
  requirePermission("content.update"),
  logAuditEvent("announcement.update"),
  asyncHandler(AdminController.updateAnnouncement)
);
router.delete(
  "/announcements/:id",
  requirePermission("content.update"),
  logAuditEvent("announcement.delete"),
  asyncHandler(AdminController.deleteAnnouncement)
);

// Website Settings
router.get("/settings", requirePermission("settings.manage"), asyncHandler(AdminController.getSettings));
router.put(
  "/settings",
  requirePermission("settings.manage"),
  logAuditEvent("settings.update"),
  asyncHandler(AdminController.updateSettings)
);

// Audit Logs (CEO only or audit.read)
router.get("/audit-logs", requirePermission("audit.read"), asyncHandler(AdminController.getAuditLogs));

export default router;
