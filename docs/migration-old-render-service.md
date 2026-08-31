# Zero-Downtime Migration & Decommission Plan for Legacy Render Flask Service

**Document Version:** 1.0.0  
**Target Organization:** SparkIntellect  
**Author:** SparkIntellect Engineering  

---

## 1. Executive Summary & Audit of Legacy Flask Service

### 1.1 Legacy Service Inventory
* **Legacy Service Repository:** `D:\spark intellect website\company website\backend\app.py`
* **Current Hosting:** Render Web Service
* **Legacy Runtime:** Python 3 + Flask + Flask-CORS + Python standard library `smtplib` / `email.mime`
* **Functionality:** Single endpoint `/send-email` accepting `POST` with JSON payload (`name`, `email`, `service`, `message`), and dispatching an email via Gmail SMTP (`smtp.gmail.com:587`) using a plaintext App Password.

### 1.2 Identified Architectural & Security Deficiencies in Legacy Service
1. **No Database Persistence:** Inquiries were not saved to any database. If Gmail SMTP experienced temporary throttling or network timeout, the client inquiry was permanently dropped.
2. **Plaintext SMTP Credentials:** Hardcoded Gmail app password in environment variables or code without secret rotation.
3. **Absence of Rate Limiting:** No per-IP or sliding-window rate limit, leaving the service vulnerable to email flooding and spam spamming.
4. **Lack of Bot Protection:** No Turnstile or CAPTCHA validation.
5. **No Internship / Candidate CMS:** The legacy service was incapable of handling resume file uploads, dynamic application questions, or Google Sheets synchronization.

---

## 2. Target Architecture Overview

The new backend is a modular **Node.js + TypeScript** REST API hosted on Render / AWS:
* **API Prefix:** `/api/v1`
* **Database:** MongoDB Atlas (Mongoose ODM with structured schemas for `users`, `internships`, `applications`, `contacts`, `careers`, `caseStudies`, `faqs`, `announcements`, `websiteSettings`, `auditLogs`).
* **Transactional Email:** Resend API with modern HTML responsive templates.
* **Security:** Defense-in-depth security boundary, Argon2id password hashing, HttpOnly session cookies, Cloudflare Turnstile token validation, and multi-tier sliding window rate limiters.
* **Google Sheets Sync:** Asynchronous resilient queue with automatic retry for candidate applications.

---

## 3. Step-by-Step Zero-Downtime Migration Procedure

### Phase 1: Deploy & Verify New Node.js Backend
1. **Create MongoDB Atlas Database:**
   * Create database cluster `sparkintellect-prod` on MongoDB Atlas (AWS Mumbai `ap-south-1` region for lowest latency to Chennai).
   * Create database user with least privilege and IP whitelist.
2. **Deploy New Backend to Render / Cloud Server:**
   * Set Environment Variables on Render Web Service:
     ```env
     NODE_ENV=production
     PORT=10000
     MONGO_URI=mongodb+srv://...
     SESSION_SECRET=...
     JWT_SECRET=...
     RESEND_API_KEY=re_...
     ALLOWED_ORIGINS=https://sparkintellect.in,https://admin.sparkintellect.in
     ```
   * Set Build Command: `npm install && npm run build`
   * Set Start Command: `npm start`
3. **Bootstrap CEO Root Account:**
   * Execute the bootstrap script once against the production MongoDB URI:
     ```bash
     node scripts/bootstrap-ceo.js "YourStrongCEOPassword123!"
     ```
4. **Run Health & API Verification:**
   * Send `GET https://api.sparkintellect.in/health` and verify `200 OK` response.

---

### Phase 2: Dual-Run Verification & DNS Switch
1. **Frontend Deployment to Netlify:**
   * Configure environment variables in Netlify:
     ```env
     NEXT_PUBLIC_API_URL=https://api.sparkintellect.in/api/v1
     ```
   * Deploy Next.js frontend to Netlify.
2. **Test End-to-End Public & Admin Flows:**
   * Submit test contact inquiry via `/contact` -> verify creation in MongoDB Atlas and receipt of Resend email.
   * Submit test internship application via `/internships/ai-machine-learning/apply` with resume -> verify storage, Google Sheet row append, and confirmation email.
   * Sign in to Admin Portal via `/admin/login` -> verify dashboard counters and audit logs.

---

### Phase 3: Legacy Flask Service Decommission
1. **Verify Ingress Traffic on Legacy Flask Service:**
   * Inspect Render access logs on the old Python web service for 48 hours to confirm zero incoming requests.
2. **Suspend Legacy Web Service:**
   * In the Render Dashboard, click **Settings** -> **Suspend Web Service**.
3. **Revoke Old Gmail SMTP App Password:**
   * Sign in to Google Account Security -> **App Passwords** -> Delete the old application password used by the Flask service.
4. **Delete Legacy Render Web Service:**
   * After 7 days of verified suspension with no fallback issues, delete the old Render web service.

---

## 4. Rollback Plan

In the unlikely event of an unforeseen outage during DNS migration:
1. Re-point `NEXT_PUBLIC_API_URL` or fallback to client-side email trigger.
2. The legacy Flask service remains alive in suspended state for 7 days and can be un-suspended with a single click.
