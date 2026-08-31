import { Router } from "express";
import { PublicController } from "../controllers/public.controller.js";
import { 
  publicApiRateLimiter, 
  applyRateLimiter, 
  contactRateLimiter 
} from "../middleware/rateLimiter.js";
import { verifyTurnstile } from "../middleware/turnstile.js";
import { resumeUpload } from "../middleware/upload.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.use(publicApiRateLimiter);

// Internships
router.get("/internships", asyncHandler(PublicController.getInternships));
router.get("/internships/:slug", asyncHandler(PublicController.getInternshipBySlug));
router.post(
  "/internships/:id/apply",
  applyRateLimiter,
  resumeUpload.single("resume"),
  verifyTurnstile,
  asyncHandler(PublicController.applyInternship)
);

// Contacts
router.post(
  "/contact",
  contactRateLimiter,
  verifyTurnstile,
  asyncHandler(PublicController.submitContact)
);

// Case Studies
router.get("/case-studies", asyncHandler(PublicController.getCaseStudies));
router.get("/case-studies/:slug", asyncHandler(PublicController.getCaseStudyBySlug));

// Careers
router.get("/careers", asyncHandler(PublicController.getCareers));
router.get("/careers/:slug", asyncHandler(PublicController.getCareerBySlug));

// FAQs & Announcements & Settings
router.get("/faqs", asyncHandler(PublicController.getFAQs));
router.get("/announcements", asyncHandler(PublicController.getAnnouncements));
router.get("/settings", asyncHandler(PublicController.getSettings));

export default router;
