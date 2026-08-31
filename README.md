# SparkIntellect — Official Web Platform & API Engine

Production-ready, database-driven web application and administrative management system for SparkIntellect.

---

## 🏛️ System Architecture

```
Frontend (Next.js 16 + React 19 + Tailwind CSS)
       │
       ▼ (REST API /api/v1)
Backend (Node.js + Express + TypeScript)
       │
       ├── MongoDB Atlas (Applications, Internships, Careers, Contacts, CMS)
       ├── Google Drive API v3 (Private Persistent Resume Storage)
       ├── Google Sheets API v4 (Real-time Candidate Application Sync)
       ├── Resend SDK (Transactional Branded Emails)
       └── Argon2id + RBAC (Secure Multi-role Administration)
```

---

## 📂 Google Drive Persistent Resume Storage

Resumes uploaded by applicants are stored securely and privately in Google Drive.

### Folder Hierarchy
```
Google Drive
└── My Drive
    └── SparkIntellect Resume Storage
        ├── Development (GOOGLE_DRIVE_RESUME_FOLDER_ID for local dev)
        └── Production  (GOOGLE_DRIVE_RESUME_FOLDER_ID on Render)
```

### Key Technical Characteristics
1. **Private & Non-Public**: Resumes are never made publicly accessible on Google Drive ("Anyone with link" is not used).
2. **Authenticated Admin Streaming**: Resumes are streamed directly from Google Drive to authorized administrators through `GET /api/v1/admin/applications/:id/resume` guarded by JWT session and RBAC (`application.read`).
3. **Safe Sanitized Filenames**: Files are saved as `${CandidateName}_${ApplicationReferenceID}.${ext}`.
4. **Permanent Deletion**: When an administrator deletes an application or track, the associated file is deleted from Google Drive automatically via `drive.files.delete()`.
5. **Shared Drive Quota Recommendation**: Google Service Accounts have 0 MB personal quota on consumer `@gmail.com` personal drives. For live production uploads, share a Google Workspace folder or Shared Drive with the Service Account (`sparkintellect-sheets-sync@sparkintellect-automation.iam.gserviceaccount.com`) as **Content Manager** or **Writer**.

---

## 🔑 Environment Variables

### Backend Configuration (`backend/.env`)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sparkintellect?retryWrites=true&w=majority

# Security (Min 32 random characters)
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Resend Transactional Email
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=SparkIntellect <no-reply@sparkintellect.in>
CEO_NOTIFICATION_EMAIL=info@sparkintellect.in

# Google Cloud Service Account (Used for both Sheets & Google Drive)
GOOGLE_SERVICE_ACCOUNT_EMAIL=sparkintellect-sheets-sync@sparkintellect-automation.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEET_TAB_NAME=Applications
GOOGLE_DRIVE_RESUME_FOLDER_ID=your_google_drive_folder_id_here

# Limits & CORS
UPLOAD_DIR=uploads
MAX_FILE_SIZE_BYTES=5242880
ALLOWED_ORIGINS=http://localhost:3000,https://sparkintellect.in,https://admin.sparkintellect.in
```

### Frontend Configuration (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Development & Build

### Running Locally
```bash
# 1. Start Backend API (Port 5000)
cd backend
npm run dev

# 2. Start Frontend App (Port 3000)
cd ..
npm run dev
```

### Building for Production
```bash
# Build Backend
cd backend && npm run build

# Build Frontend
cd .. && npm run build
```

---

## ☁️ Deployment to Render

1. Create a **Web Service** on Render pointing to the `backend/` directory.
2. Set Build Command: `npm install && npm run build`
3. Set Start Command: `npm start`
4. Configure all environment variables in the Render Dashboard under **Environment Variables**.
5. Resumes will persist directly to Google Drive independently of Render's ephemeral container filesystem.
