# SparkIntellect — Production Operations, Configuration & Deployment Manual

**Authoritative Technical Guide for Project Owner & Production Deployment**  
**Document Version:** 1.0.0  
**Target Organization:** SparkIntellect (AI & Custom Software Firm)  
**Author:** SparkIntellect Senior Architecture Team  
**Last Verified:** August 31, 2026  

---

## 1. Project Overview

**SparkIntellect** is an enterprise-grade web application and API engine comprising:
1. **Public Website (`sparkintellect.in`)**: High-performance Next.js 16 (App Router) interface showcasing 6 core engineering disciplines, 8 tangible product architectures, 6 industry solutions, interactive portfolio case studies, dynamic database-driven student internship applications, active career postings, and a commercial lead-capture engine.
2. **Admin Platform (`admin.sparkintellect.in` / `/admin`)**: Role-Based Access Control (RBAC) management portal for reviewing candidate applications, managing dynamic form field builders, lead CRM pipelines, job/internship CMS, system telemetry, and immutable audit logs.
3. **Backend API Engine (`api.sparkintellect.in` / `/api/v1`)**: Robust Node.js + TypeScript REST service backed by MongoDB Atlas, Argon2id security hashing, multi-tier sliding-window rate limiters, Cloudflare Turnstile bot verification, Google Sheets background synchronization, and Resend transactional email processing.

---

## 2. Actual System Architecture

```
                                      SPARKINTELLECT ARCHITECTURE
  
┌────────────────────────────────┐     ┌────────────────────────────────┐     ┌────────────────────────────────┐
│   sparkintellect.in (Public)   │     │ admin.sparkintellect.in (Admin)│     │   Third-Party Integrations     │
│   • Next.js 16 (App Router)    │     │   • RBAC Protected Shell       │     │   • Cloudflare Turnstile       │
│   • 23 Spec Sections           │     │   • Candidate CRM & Fields CMS │     │   • Resend Transactional Email │
│   • Dynamic Application Form   │     │   • CEO Employee Privilege Guard│    │   • Google Sheets (Sync Queue) │
└───────────────┬────────────────┘     └───────────────┬────────────────┘     └───────────────▲────────────────┘
                │                                      │                                      │
                ▼                                      ▼                                      │
┌─────────────────────────────────────────────────────────────────────────────────────────────┴────────────────┐
│                              api.sparkintellect.in (Node.js + TypeScript)                                    │
│  • Express + Helmet (CSP) + CORS (with credentials) + CookieParser (HttpOnly)                                │
│  • Multi-Tier Sliding Window Rate Limiter (IP + UserID + Endpoint + Action)                                  │
│  • Argon2id Password Hashing Engine (64MB memory / 3 iterations / 4 parallelism)                             │
│  • Endpoints: /api/v1/auth/* | /api/v1/public/* | /api/v1/admin/* | /health                                 │
└──────────────────────────────────────────────┬───────────────────────────────────────────────────────────────┘
                                               │
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                        MongoDB Atlas Database Cluster                                        │
│  • Collections: users, internships, applications, contacts, careers, caseStudies, faqs, announcements,        │
│                 websiteSettings, auditLogs (Append-only immutable security ledger)                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Implemented Project Structure

```text
D:\spark intellect website\cli website
├── .env.example                         # Template for frontend environment variables
├── .gitignore                           # Hardened version control ignore definitions
├── package.json                         # Frontend dependencies (Next.js 16, React 19, Lucide, Tailwind v4)
├── tsconfig.json                        # Frontend TypeScript configuration
├── next.config.ts                       # Next.js compiler & security header rules
├── src/
│   ├── app/                             # Next.js 16 App Router pages & dynamic routes
│   │   ├── page.tsx                     # Homepage (14 structured sections)
│   │   ├── services/page.tsx            # Services overview
│   │   ├── services/[slug]/page.tsx     # 6 Dynamic service detail pages
│   │   ├── solutions/page.tsx           # 7-step engineering progression
│   │   ├── industries/page.tsx          # Industry verticals
│   │   ├── industries/[slug]/page.tsx   # 6 Dynamic industry detail pages
│   │   ├── work/page.tsx                # Portfolio & case studies
│   │   ├── work/[slug]/page.tsx         # Dynamic case study detail pages
│   │   ├── internships/page.tsx         # Student internship tracks overview
│   │   ├── internships/[slug]/page.tsx  # Dynamic internship track details
│   │   ├── internships/[slug]/apply/page.tsx # Dynamic Database-Driven Form Builder Renderer
│   │   ├── careers/page.tsx             # Job postings
│   │   ├── careers/[slug]/page.tsx      # Dynamic job details
│   │   ├── contact/page.tsx             # Commercial inquiry & scope form
│   │   ├── about/page.tsx               # Company vision, founder story & values
│   │   ├── process/page.tsx             # 6-step engineering methodology
│   │   ├── support/page.tsx             # Client SLA & support portal
│   │   ├── privacy/page.tsx             # Privacy Policy
│   │   ├── terms/page.tsx               # Terms of Service
│   │   └── admin/                       # Admin Platform
│   │       ├── layout.tsx               # RBAC protected admin shell & sidebar
│   │       ├── page.tsx                 # Dashboard metrics & live feeds
│   │       ├── login/page.tsx           # Admin authentication
│   │       ├── forgot-password/page.tsx # Password recovery initiation
│   │       ├── reset-password/page.tsx  # Argon2id token reset handler
│   │       ├── internships/page.tsx     # Track CMS + Visual Application Form Field Builder
│   │       ├── applications/page.tsx    # Candidate CRM, resume streaming, Sheets sync
│   │       ├── contacts/page.tsx        # Client inquiry CRM
│   │       ├── employees/page.tsx       # CEO-only employee & RBAC permission manager
│   │       ├── careers/page.tsx         # Job posting CMS
│   │       ├── case-studies/page.tsx    # Portfolio CMS
│   │       ├── faqs/page.tsx            # FAQs CMS
│   │       ├── announcements/page.tsx   # Announcement banners CMS
│   │       ├── settings/page.tsx        # Global system configuration CMS
│   │       └── audit-logs/page.tsx      # Append-only immutable audit trail viewer
│   ├── components/
│   │   ├── home/                        # Homepage component library (10 distinct modules)
│   │   └── ui/                          # Reusable UI primitives (Navbar, Footer, SectionHeading, etc.)
│   ├── data/
│   │   └── companyData.ts               # Authoritative data definitions, interfaces, and fallbacks
│   └── lib/
│       └── api.ts                       # Type-safe public & admin HTTP API client
│
├── backend/                             # Standalone Node.js + TypeScript Backend Service
│   ├── .env.example                     # Template for backend production secrets
│   ├── package.json                     # Backend dependencies (Express, Mongoose, Argon2, Zod, etc.)
│   ├── tsconfig.json                    # Backend TypeScript ES2022 / NodeNext config
│   ├── jest.config.js                   # Unit & security testing configuration
│   ├── uploads/resumes/                 # Secure private resume storage directory
│   ├── src/
│   │   ├── config/index.ts              # Zod environment variable parser & validator
│   │   ├── db/connection.ts             # Mongoose connection with auto-retry and indexing
│   │   ├── models/                      # Mongoose Schema Definitions
│   │   │   ├── User.ts                  # CEO protection, Argon2id verification, lockout
│   │   │   ├── Internship.ts            # Dynamic form fields schema, status controls
│   │   │   ├── Application.ts           # Candidate submissions & Sheets telemetry
│   │   │   ├── Contact.ts               # Lead inquiries
│   │   │   ├── Career.ts                # Job postings
│   │   │   ├── CaseStudy.ts             # Case studies
│   │   │   ├── FAQ.ts                   # FAQs
│   │   │   ├── Announcement.ts          # Banner announcements
│   │   │   ├── WebsiteSettings.ts       # Global settings
│   │   │   └── AuditLog.ts              # Append-only immutable ledger
│   │   ├── middleware/
│   │   │   ├── auth.ts                  # HttpOnly cookie & JWT session guard
│   │   │   ├── rbac.ts                  # Granular permissions & CEO root isolation
│   │   │   ├── rateLimiter.ts           # Multi-tier sliding window rate limiter
│   │   │   ├── turnstile.ts             # Cloudflare Turnstile token validation
│   │   │   ├── upload.ts                # Multer 5MB file validator & UUID obfuscation
│   │   │   ├── auditLogger.ts           # Automatic action logger
│   │   │   └── errorHandler.ts          # Centralized error handler
│   │   ├── services/
│   │   │   ├── auth.service.ts          # Argon2id hashing engine
│   │   │   ├── googleSheets.service.ts  # Google Service Account sync & retry queue
│   │   │   ├── email.service.ts         # Resend transactional email templates
│   │   │   └── storage.service.ts       # Secure file streaming
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts       # Login, lockout, me, password reset
│   │   │   ├── public.controller.ts     # Public reads, contacts, dynamic applications
│   │   │   └── admin.controller.ts      # Full Admin CRUD and telemetry endpoints
│   │   ├── routes/
│   │   │   ├── auth.routes.ts           # /api/v1/auth/*
│   │   │   ├── public.routes.ts         # /api/v1/public/*
│   │   │   └── admin.routes.ts          # /api/v1/admin/*
│   │   └── server.ts                    # Express initialization, Helmet CSP, CORS, /health
│   └── tests/                           # Automated Jest Unit & Security Test Suite
│       ├── auth.test.ts                 # Argon2id hashing & token tests
│       ├── rateLimiter.test.ts          # Sliding window rate limiter tests
│       └── rbac.test.ts                 # Role enforcement & CEO isolation tests
│
├── scripts/
│   ├── generate-argon2-hash.js          # CLI utility to generate Argon2id password hashes
│   └── bootstrap-ceo.js                 # Direct MongoDB Atlas root CEO bootstrap utility
│
└── docs/
    └── migration-old-render-service.md  # Zero-downtime Flask migration & decommission guide
```

---

## 4. Implemented Technology Stack

| Layer | Technology | Version | Purpose in Codebase |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) | `16.2.x` | Server/Client rendering, static page generation, dynamic routing |
| **UI Library** | React | `19.x` | Component UI layer with smooth client-side transitions |
| **Styling Engine** | Tailwind CSS / PostCSS | `v4.x` | Minimal luxury aesthetic with custom CSS variables |
| **Icons** | Lucide React | `^1.16.x` | Vector icons across UI and admin dashboards |
| **Backend Runtime** | Node.js | `>=18.0.0` | JavaScript/TypeScript asynchronous server runtime |
| **Language** | TypeScript | `5.4.x` | Strict end-to-end type safety across frontend and backend |
| **Backend Framework** | Express.js | `4.19.x` | RESTful API server with modular routers |
| **Database & ODM** | MongoDB Atlas / Mongoose | `8.4.x` | Schematized persistence with auto-indexing and connection pooling |
| **Password Security** | Argon2id (`argon2`) | `0.41.x` | High-memory/time-cost password hashing resistant to GPU cracking |
| **Session Security** | `jsonwebtoken` + `cookie-parser` | `9.0.x / 1.4.x` | Encrypted HttpOnly secure cookie sessions |
| **Rate Limiter** | Sliding Window Memory Store | Custom | RFC-compliant rate limiter (`IP + UserID + Endpoint + Action`) |
| **Bot Mitigation** | Cloudflare Turnstile | v0 API | Invisible bot challenge verification |
| **File Processing** | Multer | `1.4.5-lts` | 5MB PDF/DOC/DOCX validator with UUID obfuscated filenames |
| **Transactional Email** | Resend API | `3.2.x` | Transactional emails for applications, leads, and password resets |
| **Spreadsheet Sync** | Google APIs (`googleapis`) | `140.0.x` | Server-to-server JWT service account synchronization |

---

## 5. Complete Environment Variable Inventory

Every variable below is read directly by the codebase:

| Variable | Used By | Required? | Secret Level | Example / Format | Where to Configure | Purpose in Codebase |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Frontend (`src/lib/api.ts`, `src/data/companyData.ts`) | **REQUIRED** | Public | `https://api.sparkintellect.in` | Netlify (Public & Admin) | Directs frontend API calls to the backend |
| `PORT` | Backend (`backend/src/config/index.ts`) | Optional | Public | `5000` (or assigned by host) | Render / Cloud Host | Port on which the Express API server listens |
| `NODE_ENV` | Backend (`backend/src/config/index.ts`) | **REQUIRED** | Public | `production` | Render / Cloud Host | Controls security policies, cookie flags, and verbose logging |
| `MONGO_URI` | Backend (`backend/src/config/index.ts`, `scripts/bootstrap-ceo.js`) | **REQUIRED** | **HIGHLY SENSITIVE** | `mongodb+srv://admin:pass@cluster.mongodb.net/sparkintellect?retryWrites=true&w=majority` | Render Backend & Bootstrap Script | MongoDB Atlas cluster connection string |
| `SESSION_SECRET` | Backend (`backend/src/config/index.ts`) | **REQUIRED** | **HIGHLY SENSITIVE** | `a_64_char_random_cryptographic_string_here` | Render Backend | Secret used to sign and verify cookies |
| `JWT_SECRET` | Backend (`backend/src/config/index.ts`) | **REQUIRED** | **HIGHLY SENSITIVE** | `a_64_char_random_cryptographic_string_here` | Render Backend | Secret used to sign authentication JWT tokens |
| `JWT_EXPIRES_IN` | Backend (`backend/src/config/index.ts`) | Optional | Public | `7d` | Render Backend | Expiration duration for user sessions |
| `ALLOWED_ORIGINS` | Backend (`backend/src/config/index.ts`) | **REQUIRED** | Public | `https://sparkintellect.in,https://admin.sparkintellect.in` | Render Backend | Comma-separated CORS allowed origins with credentials |
| `RESEND_API_KEY` | Backend (`backend/src/config/index.ts`, `backend/src/services/email.service.ts`) | Conditional | **HIGHLY SENSITIVE** | `re_123456789abcdef` | Render Backend | Resend API key for sending transactional emails |
| `RESEND_FROM_EMAIL` | Backend (`backend/src/config/index.ts`) | **REQUIRED** | Public | `SparkIntellect <no-reply@sparkintellect.in>` | Render Backend | Sender email address for outbound emails |
| `CEO_NOTIFICATION_EMAIL`| Backend (`backend/src/config/index.ts`, `scripts/bootstrap-ceo.js`) | **REQUIRED** | Public | `info@sparkintellect.in` (or `ceo@sparkintellect.in`) | Render Backend | Target email address for client lead notifications |
| `CLOUDFLARE_TURNSTILE_ENABLED` | Backend (`backend/src/config/index.ts`) | Optional | Public | `true` (or `false` in local dev) | Render Backend | Toggles enforcement of Turnstile bot verification |
| `CLOUDFLARE_TURNSTILE_SECRET_KEY` | Backend (`backend/src/config/index.ts`, `backend/src/middleware/turnstile.ts`) | Conditional | **HIGHLY SENSITIVE** | `0x4AAAAAAAx...` | Render Backend | Secret key used to verify Turnstile tokens with Cloudflare |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Backend (`backend/src/config/index.ts`, `backend/src/services/googleSheets.service.ts`) | Conditional | Private | `spark-sync@project-id.iam.gserviceaccount.com` | Render Backend | Google Cloud service account email for Sheets API |
| `GOOGLE_PRIVATE_KEY` | Backend (`backend/src/config/index.ts`, `backend/src/services/googleSheets.service.ts`) | Conditional | **HIGHLY SENSITIVE** | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` | Render Backend | Google Cloud service account RSA private key |
| `GOOGLE_SHEET_ID` | Backend (`backend/src/config/index.ts`, `backend/src/services/googleSheets.service.ts`) | Conditional | Private | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` | Render Backend | Target Google Spreadsheet ID for candidate sync |
| `GOOGLE_SHEET_TAB_NAME` | Backend (`backend/src/config/index.ts`) | Optional | Public | `Applications` | Render Backend | Target sheet tab name in Google Spreadsheet |
| `UPLOAD_DIR` | Backend (`backend/src/config/index.ts`, `backend/src/middleware/upload.ts`) | Optional | Private | `./uploads` | Render Backend | Local disk directory for storing applicant resume files |
| `MAX_FILE_SIZE_BYTES` | Backend (`backend/src/config/index.ts`) | Optional | Public | `5242880` (5MB in bytes) | Render Backend | Maximum allowable file size for uploaded documents |

---

## 6. Credential & API Key Location Matrix

| Credential / Key | Provider | Used By | Public / Secret | Where to Configure | Code File Reading It | Line Reference |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **API Base URL** | SparkIntellect | Frontend | PUBLIC | Netlify `.env.production` | `src/lib/api.ts` | Line 16 |
| **MongoDB Atlas URI** | MongoDB Atlas | Backend | **SECRET** | Render Dashboard / `.env` | `backend/src/config/index.ts` | Line 10 |
| **Session Secret** | Generated | Backend | **SECRET** | Render Dashboard / `.env` | `backend/src/config/index.ts` | Line 11 |
| **JWT Secret** | Generated | Backend | **SECRET** | Render Dashboard / `.env` | `backend/src/config/index.ts` | Line 12 |
| **Resend API Key** | Resend | Backend | **SECRET** | Render Dashboard / `.env` | `backend/src/services/email.service.ts` | Line 5 |
| **Turnstile Secret Key** | Cloudflare | Backend | **SECRET** | Render Dashboard / `.env` | `backend/src/middleware/turnstile.ts` | Line 23 |
| **Google Service Account Email** | Google Cloud | Backend | PRIVATE | Render Dashboard / `.env` | `backend/src/services/googleSheets.service.ts` | Line 13 |
| **Google Private Key** | Google Cloud | Backend | **SECRET** | Render Dashboard / `.env` | `backend/src/services/googleSheets.service.ts` | Line 14 |
| **Google Sheet ID** | Google Drive | Backend | PRIVATE | Render Dashboard / `.env` | `backend/src/services/googleSheets.service.ts` | Line 20 |

---

## 7. MongoDB Atlas Setup Guide

The application connects to MongoDB Atlas using Mongoose with auto-indexing, pooled connections, and automatic reconnect logic in `backend/src/db/connection.ts`.

### Step-by-Step Atlas Configuration
1. **Create Account & Cluster**:
   * Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
   * Create a new project named `sparkintellect`.
   * Create a production cluster (Recommended: **AWS Mumbai `ap-south-1`** for minimum latency to Chennai).
2. **Create Database User**:
   * Under **Security** -> **Database Access**, click **Add New Database User**.
   * Authentication Method: `Password`.
   * Username: `spark_backend_prod`.
   * Password: Generate a strong 32-character password.
   * Database User Privileges: `Read and write to any database`.
3. **Configure Network Access**:
   * Under **Security** -> **Network Access**, click **Add IP Address**.
   * For Render deployment, add `0.0.0.0/0` (Allow Access from Anywhere) and protect with strong database credentials, or configure Render static outbound IPs if using a dedicated instance.
4. **Obtain Connection String**:
   * Click **Database** -> **Connect** -> **Drivers** (Node.js).
   * Copy the connection URI:
     ```text
     mongodb+srv://spark_backend_prod:<PASSWORD>@sparkintellect-prod.mongodb.net/sparkintellect?retryWrites=true&w=majority
     ```
   * Replace `<PASSWORD>` with your actual password and ensure the database name is `sparkintellect`.
5. **Set in Backend Environment**:
   * Add `MONGO_URI` to `backend/.env` (locally) and in the Render Web Service Environment settings.

### Database Collections & Indexes Auto-Created by Mongoose
* `users`: Unique index on `email`
* `internships`: Unique index on `slug`, index on `published`, `status`
* `applications`: Index on `internshipId`, `internshipSlug`, `status`, `googleSheetsSyncStatus`
* `contacts`: Index on `email`, `status`
* `careers`: Unique index on `slug`, index on `status`
* `casestudies`: Unique index on `slug`, index on `industry`
* `faqs`: Index on `category`, `published`
* `announcements`: Index on `active`
* `websitesettings`: Singleton document for company configuration
* `auditlogs`: Index on `actorId`, `actorEmail`, `action`, `createdAt` (immutable append-only)

---

## 8. CEO Root Account Creation (Offline Bootstrap)

### Strict Security Rule
> **The CEO account CANNOT be created or promoted via any Public or Admin API endpoint.**  
> Any API request attempting to assign `role: "CEO"` will be rejected with HTTP 403 (`CEO_CREATION_BLOCKED`).

### Creating the CEO Account via Bootstrap Script
The repository includes an offline bootstrap script (`scripts/bootstrap-ceo.js`) that connects directly to MongoDB Atlas and creates the CEO document with root permissions (`["*"]`) and an Argon2id password hash:

```bash
# 1. Open terminal in project root
cd "D:\spark intellect website\cli website"

# 2. Run bootstrap script with your chosen CEO password
node scripts/bootstrap-ceo.js "YourStrongCEOPassword123!"
```

### Script Output Confirmation:
```text
🔗 Connecting to MongoDB Atlas...
✅ Connected.
🔒 Hashing CEO password with Argon2id for: info@sparkintellect.in...

================================================================================
👑 CEO ACCOUNT BOOTSTRAP SUCCESSFUL
   • Name: Prashanth S
   • Email: info@sparkintellect.in
   • Role: CEO (Full Root Permissions: [*])
   • Status: active
   • MongoDB Upserted: New Record
================================================================================
```

### Manual MongoDB Shell Alternative (If running via MongoSH)
If you prefer inserting directly into MongoSH:
1. Generate the Argon2id hash using the hash utility:
   ```bash
   node scripts/generate-argon2-hash.js "YourStrongCEOPassword123!"
   ```
2. In `mongosh`:
   ```javascript
   use sparkintellect;

   db.users.updateOne(
     { email: "info@sparkintellect.in" },
     {
       $set: {
         name: "Prashanth S",
         email: "info@sparkintellect.in",
         passwordHash: "$argon2id$v=19$m=65536,t=3,p=4$...", // Paste hash here
         role: "CEO",
         permissions: ["*"],
         status: "active",
         failedLoginAttempts: 0,
         twoFactorEnabled: false,
         updatedAt: new Date()
       },
       $setOnInsert: { createdAt: new Date() }
     },
     { upsert: true }
   );
   ```

---

## 9. Admin Authentication & Session Security Flow

### Authentication Flow
```text
Admin User enters credentials at /admin/login
                     │
                     ▼
         POST /api/v1/auth/login
                     │
   ┌─────────────────┴─────────────────┐
   ▼                                   ▼
Rate Limiter (Max 5 / 15 mins)     Check Account Lockout (5 failed attempts = 15m lock)
   │                                   │
   └─────────────────┬─────────────────┘
                     ▼
        Verify Argon2id Password Hash
                     │
                     ▼
        Generate Signed JWT Session Token
                     │
                     ▼
  Set HttpOnly, Secure, SameSite: lax Cookie `spark_session`
                     │
                     ▼
     Redirect to Admin Dashboard (/admin)
```

### Session Configuration:
* **Cookie Name**: `spark_session`
* **Security Flags**: `httpOnly: true`, `secure: true` (in production), `sameSite: "lax"`
* **Token Lifetime**: 7 Days (`JWT_EXPIRES_IN: "7d"`)
* **Account Lockout**: 5 failed consecutive login attempts automatically lock the user account for 15 minutes (`lockUntil` in `User` model).

---

## 10. Role-Based Access Control (RBAC) & Employee Management

### Role Structure
1. **CEO (`role: "CEO"`)**:
   * Superuser root privileges across every route and system resource (`permissions: ["*"]`).
   * Exclusive privilege to create, edit permissions for, and deactivate employees.
   * Immune to demotion or deactivation via the API.
2. **ADMIN / STAFF (`role: "ADMIN" | "STAFF"`)**:
   * Access strictly controlled by granular permission strings assigned to their account.

### Granular Permission Matrix

| Permission String | Description | Accessible Admin Routes |
| :--- | :--- | :--- |
| `internship.read` | View internship tracks and configuration | `GET /api/v1/admin/internships` |
| `internship.create` | Create new internship tracks & dynamic forms | `POST /api/v1/admin/internships` |
| `internship.update` | Edit existing tracks and form field schema | `PUT /api/v1/admin/internships/:id` |
| `internship.archive` | Archive or delete internship tracks | `DELETE /api/v1/admin/internships/:id` |
| `application.read` | View candidate submissions & download resumes | `GET /api/v1/admin/applications`, `/resume` |
| `application.update` | Update candidate status (Shortlist/Reject) & notes | `PUT /api/v1/admin/applications/:id/status` |
| `contact.read` | View client lead inquiries | `GET /api/v1/admin/contacts` |
| `contact.update` | Update client lead status (Contacted/Qualified) | `PUT /api/v1/admin/contacts/:id/status` |
| `career.read` / `create` / `update` | Manage career openings | `/api/v1/admin/careers/*` |
| `content.read` / `create` / `update` | Manage Case Studies, FAQs, Announcements | `/api/v1/admin/case-studies`, `/faqs`, `/announcements` |
| `settings.manage` | Manage company details and system toggles | `/api/v1/admin/settings` |
| `employee.read` / `create` / `update` | View & create staff members (CEO Only) | `/api/v1/admin/employees/*` |
| `audit.read` | Inspect security audit logs (CEO Only) | `GET /api/v1/admin/audit-logs` |

---

## 11. Google Cloud & Google Sheets Setup Guide

The application uses Google Sheets API (`googleapis`) with a server-to-server JWT Service Account. When students apply, their submission is saved in MongoDB Atlas and immediately queued for appending to Google Sheets.

### Step-by-Step Google Setup
1. **Create Google Cloud Project**:
   * Open [Google Cloud Console](https://console.cloud.google.com/).
   * Click **New Project** -> Name it `sparkintellect-automation`.
2. **Enable Google Sheets API**:
   * Navigate to **APIs & Services** -> **Library**.
   * Search for **Google Sheets API** and click **Enable**.
3. **Create Service Account**:
   * Navigate to **APIs & Services** -> **Credentials** -> **Create Credentials** -> **Service Account**.
   * Service Account Name: `sparkintellect-sheets-sync`.
   * Click **Done**. Copy the generated email (e.g., `sparkintellect-sheets-sync@sparkintellect-automation.iam.gserviceaccount.com`).
4. **Generate Service Account Private Key**:
   * Click on the created service account -> Go to **Keys** tab.
   * Click **Add Key** -> **Create new key** -> Select **JSON** -> Click **Create**.
   * Open the downloaded JSON file:
     * `client_email` -> Set as `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
     * `private_key` -> Set as `GOOGLE_PRIVATE_KEY` (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`).
5. **Create & Share Google Spreadsheet**:
   * Open [Google Sheets](https://sheets.new) and create a sheet named `SparkIntellect Applications 2026`.
   * Rename the first tab to `Applications`.
   * Add header columns in Row 1:
     `Application ID | Created At | Track Title | Candidate Name | Email | Phone | College | Degree | GitHub | Statement | Resume URL | Status`
   * Click **Share** (top right) -> Add the service account email (`sparkintellect-sheets-sync@...`) as **Editor**.
   * Copy the Spreadsheet ID from the browser URL:
     `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`
   * Set `GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` and `GOOGLE_SHEET_TAB_NAME=Applications`.

### Resilient Retry Queue
* If Google Sheets API is unreachable or rate-limited, the application marks `googleSheetsSyncStatus = "failed"`.
* A background worker in `backend/src/services/googleSheets.service.ts` automatically retries failed syncs every 10 minutes (up to 5 attempts).
* Admins can also trigger manual retry from the Admin Applications table.

---

## 12. File Upload & Resume Storage Setup

* **Upload Handler**: Handled via Multer in `backend/src/middleware/upload.ts`.
* **Validation Rules**:
  * Allowed Extensions: `.pdf`, `.doc`, `.docx`
  * Allowed MIME Types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
  * Maximum File Size: `5MB` (`5242880` bytes)
* **Obfuscation**: Original filenames are stripped and stored as random UUID keys (`<uuid>.pdf`) to prevent path traversal and execution attacks.
* **Storage Location**: Stored in `backend/uploads/resumes/` (or directory specified by `UPLOAD_DIR`).
* **Security & Access**: Resume files are **not publicly accessible** via static web server routes. Authorized administrators download files through the authenticated endpoint `GET /api/v1/admin/applications/:id/resume`, which streams the file with verified RBAC checks.

---

## 13. Resend Email Service Setup

Outbound transactional emails are handled using the [Resend](https://resend.com) API via `backend/src/services/email.service.ts`.

### Step-by-Step Resend Configuration
1. Sign up at [Resend.com](https://resend.com).
2. Under **Domains**, click **Add Domain** -> Enter `sparkintellect.in`.
3. Add the provided DNS records (DKIM, SPF, MX) to your DNS manager (Cloudflare).
4. Once verified, go to **API Keys** -> Click **Create API Key** (Full Access).
5. Add to backend environment:
   ```env
   RESEND_API_KEY=re_123456789abcdef
   RESEND_FROM_EMAIL=SparkIntellect <no-reply@sparkintellect.in>
   CEO_NOTIFICATION_EMAIL=info@sparkintellect.in
   ```

### Handled Email Events
1. **Candidate Confirmation**: Triggered automatically when an applicant submits an internship application, containing their reference ID and program details.
2. **CEO Lead Notification**: Triggered when a prospect submits a commercial proposal inquiry on the `/contact` form, containing project budget, timeline, and scope.
3. **Admin Password Recovery**: Delivers secure, single-use 1-hour cryptographic password reset links.

---

## 14. Cloudflare & Turnstile Bot Protection

Cloudflare Turnstile provides frictionless bot verification for public submissions (`/contact` and `/internships/:id/apply`).

### Setup Steps
1. In Cloudflare Dashboard, navigate to **Turnstile** -> Click **Add Site**.
2. Domain: `sparkintellect.in`, `admin.sparkintellect.in`, and `localhost` (for testing).
3. Widget Mode: **Managed / Invisible**.
4. Obtain Credentials:
   * **Site Key** (Public): Added to frontend forms.
   * **Secret Key** (Private): Set in backend environment as `CLOUDFLARE_TURNSTILE_SECRET_KEY`.
5. Enable in Backend: Set `CLOUDFLARE_TURNSTILE_ENABLED=true` in `backend/.env`.

---

## 15. Rate Limiting Rules & Telemetry

Implemented in `backend/src/middleware/rateLimiter.ts` using an in-memory sliding-window limiter tracking `IP + UserID + Endpoint + Action`:

| Endpoint / Action | Rate Limit Threshold | Sliding Window | Action on Exceed |
| :--- | :--- | :--- | :--- |
| `POST /api/v1/auth/login` | 5 requests | 15 Minutes | HTTP 429 + `Retry-After` Header |
| `POST /api/v1/public/internships/:id/apply` | 3 requests | 10 Minutes | HTTP 429 + `Retry-After` Header |
| `POST /api/v1/public/contact` | 5 requests | 10 Minutes | HTTP 429 + `Retry-After` Header |
| File Uploads | 10 requests | 10 Minutes | HTTP 429 + `Retry-After` Header |
| Admin Mutations | 120 requests | 1 Minute | HTTP 429 + `Retry-After` Header |
| General Public API | 100 requests | 1 Minute | HTTP 429 + `Retry-After` Header |

*(Note: Redis is not required by the current version; an in-memory sliding window is built-in with automatic stale key eviction every 5 minutes.)*

---

## 16. Production Deployment Instructions

### A. Backend Deployment on Render (`api.sparkintellect.in`)
1. **Create Web Service**:
   * In Render Dashboard, click **New +** -> **Web Service**.
   * Connect your GitHub repository.
   * Root Directory: `backend`
   * Environment: `Node`
   * Build Command: `npm install && npm run build`
   * Start Command: `npm start`
2. **Set Environment Variables in Render**:
   ```env
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://...
   SESSION_SECRET=...
   JWT_SECRET=...
   JWT_EXPIRES_IN=7d
   ALLOWED_ORIGINS=https://sparkintellect.in,https://admin.sparkintellect.in
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=SparkIntellect <no-reply@sparkintellect.in>
   CEO_NOTIFICATION_EMAIL=info@sparkintellect.in
   CLOUDFLARE_TURNSTILE_ENABLED=true
   CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4AAAAAAAx...
   GOOGLE_SERVICE_ACCOUNT_EMAIL=spark-sync@...
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=1BxiMVs0X...
   GOOGLE_SHEET_TAB_NAME=Applications
   ```
3. **Attach Custom Domain**:
   * In Render Service Settings -> **Custom Domains** -> Add `api.sparkintellect.in`.
   * Add CNAME record in DNS pointing to Render's URL.

---

### B. Frontend Deployment on Netlify (`sparkintellect.in` & `admin.sparkintellect.in`)
1. **Create Site on Netlify**:
   * Connect GitHub repository.
   * Base directory: `/` (repository root)
   * Build command: `npm run build`
   * Publish directory: `.next` (using `@netlify/plugin-nextjs`)
2. **Set Environment Variables in Netlify**:
   ```env
   NEXT_PUBLIC_API_URL=https://api.sparkintellect.in
   ```
3. **Configure Domains in Netlify**:
   * Add custom domain: `sparkintellect.in` (and `www.sparkintellect.in`).
   * Add subdomain: `admin.sparkintellect.in` (routes to `/admin`).

---

## 17. Production DNS Configuration Matrix

Configure these records in your DNS provider (Cloudflare recommended):

| Type | Host / Name | Target / Value | Proxy Status | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A / CNAME** | `@` (sparkintellect.in) | Netlify Apex Load Balancer (`75.2.60.5` or CNAME) | Proxied (Orange Cloud) | Public Website |
| **CNAME** | `www` | `sparkintellect.in` | Proxied (Orange Cloud) | Canonical redirect |
| **CNAME** | `admin` | Netlify Site URL (`your-site.netlify.app`) | Proxied (Orange Cloud) | Admin Portal |
| **CNAME** | `api` | Render Service CNAME (`your-backend.onrender.com`) | Proxied or DNS-Only | Production REST Backend |
| **TXT** | `_dmarc` | `v=DMARC1; p=quarantine;` | DNS-Only | Email Security |
| **TXT** | `sparkintellect.in` | Resend SPF verification string | DNS-Only | Outbound Email SPF |
| **CNAME** | `resend._domainkey` | Resend DKIM target string | DNS-Only | Outbound Email DKIM |

---

## 18. Local Development Quickstart

### Prerequisites
* Node.js `>= 18.0.0`
* MongoDB Community Server running locally on `mongodb://127.0.0.1:27017` (or MongoDB Atlas URI)

### 1. Install Dependencies
```bash
# Install frontend root dependencies
cd "D:\spark intellect website\cli website"
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Local Environment Files
Create `.env.local` in root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/sparkintellect
SESSION_SECRET=local_dev_session_secret_min64chars_long_and_secure_123456789
JWT_SECRET=local_dev_jwt_secret_min64chars_long_and_secure_123456789
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://sparkintellect.in,https://admin.sparkintellect.in
CLOUDFLARE_TURNSTILE_ENABLED=false
```

### 3. Bootstrap Local CEO Account
```bash
node scripts/bootstrap-ceo.js "LocalAdminPassword123!"
```

### 4. Run Development Servers
```bash
# Terminal 1: Run Backend API Server (Port 5000)
cd backend
npm run dev

# Terminal 2: Run Next.js Frontend (Port 3000)
npm run dev
```

Visit:
* Public Site: `http://localhost:3000`
* Admin Portal: `http://localhost:3000/admin` (Sign in with `info@sparkintellect.in` / `LocalAdminPassword123!`)
* Backend Health Check: `http://localhost:5000/health`

---

## 19. Post-Deployment Verification Checklist

Execute these practical end-to-end tests following production deployment:

- [ ] **Health Endpoint**: `GET https://api.sparkintellect.in/health` returns HTTP 200 `{"status": "healthy"}`.
- [ ] **Public Website**: `https://sparkintellect.in` loads with high visual fidelity, sub-second transitions, and zero console errors.
- [ ] **Dynamic Internship Apply**: Visit `/internships/ai-full-stack-development/apply`, fill out dynamic form fields, upload a PDF resume, and submit.
- [ ] **Candidate Email**: Candidate receives confirmation email with their unique Application Reference ID.
- [ ] **Google Sheets Sync**: New row appears in target Google Spreadsheet with applicant details.
- [ ] **Contact Form**: Submit a test inquiry on `/contact` -> CEO receives alert email via Resend.
- [ ] **CEO Login**: Sign in to `https://admin.sparkintellect.in/login` with bootstrapped CEO credentials.
- [ ] **Candidate Review CRM**: In Admin Portal, open the new application, preview answers, download the resume PDF, and change status to `shortlisted`.
- [ ] **Dynamic Field Builder**: Add a new custom field to an internship track in Admin -> Verify it instantly renders on the public apply form.
- [ ] **Audit Trail**: Visit Admin Audit Logs -> Verify all login and status update actions are immutably recorded.

---

## 20. Troubleshooting & Common Operational Solutions

| Issue / Symptom | Possible Cause | Verification & Fix |
| :--- | :--- | :--- |
| **MongoDB Connection Error** | IP whitelist or wrong URI in `MONGO_URI` | In Atlas Network Access, ensure `0.0.0.0/0` is allowed or Render outbound IPs are listed. Check database username/password. |
| **CORS Policy Violation** | `ALLOWED_ORIGINS` missing frontend domain | Ensure `ALLOWED_ORIGINS` in Render contains `https://sparkintellect.in,https://admin.sparkintellect.in` without trailing slashes. |
| **Admin Login Returns 401** | CEO account not bootstrapped or wrong password | Run `node scripts/bootstrap-ceo.js "<password>"` to reset the CEO account directly in MongoDB. |
| **Resume Upload Fails (400)** | File exceeds 5MB or invalid MIME type | Ensure resume is a valid `.pdf`, `.doc`, or `.docx` file under 5MB. Check that `UPLOAD_DIR` exists and has write permissions. |
| **Google Sheets Sync Fails** | Service account missing Sheet permission | Ensure the Google Sheet is shared with the service account email as **Editor**. Verify `GOOGLE_SHEET_ID` matches sheet URL. |
| **Emails Not Delivered** | Unverified domain or missing Resend key | In Resend Dashboard, verify that `sparkintellect.in` DNS records (DKIM/SPF) are verified and `RESEND_API_KEY` is set. |
| **Rate Limit 429 Response** | Too many attempts from single IP | Wait for the window specified in the `Retry-After` response header (up to 15 minutes for logins). |

---

## 21. Action Items for Project Owner

### Before Deployment
1. Create MongoDB Atlas production cluster (AWS Mumbai `ap-south-1`) and copy connection URI.
2. Create Google Cloud Service Account, enable Google Sheets API, and share Google Sheet with service account email.
3. Sign up at Resend, add domain `sparkintellect.in`, and configure DKIM/SPF DNS records.
4. Set up Cloudflare Turnstile widget and obtain Site Key and Secret Key.

### During Deployment
1. Deploy Backend to Render with all environment variables.
2. Run `node scripts/bootstrap-ceo.js "<YourRealPassword>"` against production MongoDB URI.
3. Deploy Frontend to Netlify with `NEXT_PUBLIC_API_URL=https://api.sparkintellect.in`.
4. Point DNS CNAME records for `sparkintellect.in`, `admin.sparkintellect.in`, and `api.sparkintellect.in`.

### After Deployment
1. Sign in to `/admin` as CEO.
2. Complete the [Post-Deployment Verification Checklist](#19-post-deployment-verification-checklist).
3. Follow [`docs/migration-old-render-service.md`](file:///D:/spark%20intellect%20website/cli%20website/docs/migration-old-render-service.md) to suspend and decommission the legacy Render Flask service.
