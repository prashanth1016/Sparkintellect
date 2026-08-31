import {
  SERVICES,
  INDUSTRIES,
  CASE_STUDIES,
  FAQS,
  InternshipItem,
  ServiceItem,
  IndustryItem,
  CaseStudyItem,
  CareerItem,
  FAQItem,
} from "@/data/companyData";

export type {
  InternshipItem,
  ServiceItem,
  IndustryItem,
  CaseStudyItem,
  CareerItem,
  FAQItem,
};

export interface ApplicationItem {
  _id: string;
  applicationReferenceId?: string;
  internshipId: string;
  internshipSlug: string;
  internshipTitle: string;
  answers: Record<string, string | number | boolean | undefined>;
  resumeUrl?: string;
  resumeFileName?: string;
  status: string;
  notes?: string;
  googleSheetsSyncStatus?: string;
  emailStatus?: string;
  communication?: {
    shortlisted?: { sent: boolean; sentAt?: string; sentBy?: string; messageId?: string; subject?: string };
    accepted?: { sent: boolean; sentAt?: string; sentBy?: string; messageId?: string; subject?: string };
    rejected?: { sent: boolean; sentAt?: string; sentBy?: string; messageId?: string; subject?: string };
  };
  createdAt: string;
}

export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: string;
  createdAt: string;
}

export interface AnnouncementItem {
  _id: string;
  title: string;
  content: string;
  link?: string;
  type: "info" | "success" | "warning";
  active: boolean;
  createdAt: string;
}

export interface WebsiteSettings {
  _id?: string;
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  workingHours: string;
  maintenanceMode: boolean;
  googleSheetsAutoSync: boolean;
}

export interface AuditLogItem {
  _id: string;
  actorId?: string;
  actorName?: string;
  actorEmail?: string;
  actorRole?: string;
  action: string;
  targetResource?: string;
  ipAddress?: string;
  userAgent?: string;
  status: string;
  createdAt: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function toQueryString(params?: Record<string, string | number | undefined>): string {
  if (!params) return "";
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      query.append(key, String(value));
    }
  }
  return query.toString();
}

/**
 * Public API client
 */
export const publicApi = {
  async getInternships(): Promise<InternshipItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/public/internships`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch internships from API");
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  },

  async getInternshipBySlug(slug: string): Promise<InternshipItem | null> {
    const res = await fetch(`${API_BASE_URL}/api/v1/public/internships/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  },

  async submitInternshipApplication(
    internshipId: string,
    formData: FormData
  ): Promise<{ success: boolean; message: string; applicationId?: string; applicationReferenceId?: string }> {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/public/internships/${internshipId}/apply`,
      {
        method: "POST",
        body: formData,
      }
    );
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || json.message || "Failed to submit application");
    }
    return json;
  },

  async submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    budget?: string;
    timeline?: string;
    message: string;
  }): Promise<{ success: boolean; message: string; contactId?: string }> {
    const res = await fetch(`${API_BASE_URL}/api/v1/public/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || json.message || "Failed to submit enquiry");
    }
    return json;
  },

  async getServices(): Promise<ServiceItem[]> {
    return SERVICES;
  },

  async getIndustries(): Promise<IndustryItem[]> {
    return INDUSTRIES;
  },

  async getCaseStudies(): Promise<CaseStudyItem[]> {
    return CASE_STUDIES;
  },

  async getCareers(): Promise<CareerItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/public/careers`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch careers from API");
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  },

  async getCareerBySlug(slug: string): Promise<CareerItem | null> {
    const res = await fetch(`${API_BASE_URL}/api/v1/public/careers/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  },

  async getFaqs(): Promise<FAQItem[]> {
    return FAQS.map((f) => ({
      question: f.q,
      answer: f.a,
      q: f.q,
      a: f.a,
    }));
  },
};

/**
 * Admin API client (Uses HttpOnly Cookies)
 */
export const adminApi = {
  async login(credentials: {
    email: string;
    password: string;
    mfaCode?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || json.message || "Invalid email or password");
    }
    return json;
  },

  async logout() {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.user || null;
  },

  async forgotPassword(email: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  async resetPassword(token: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to reset password");
    return json;
  },

  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/dashboard/stats`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Unauthorized or server error");
    const json = await res.json();
    return json.stats;
  },

  // Internships
  async getAdminInternships(): Promise<InternshipItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/internships`, {
      credentials: "include",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  },

  async getInternships(): Promise<InternshipItem[]> {
    return this.getAdminInternships();
  },

  async createInternship(data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/internships`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to create internship");
    return json.data;
  },

  async updateInternship(id: string, data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/internships/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update internship");
    return json.data;
  },

  async deleteInternship(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/internships/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to delete internship");
    return json;
  },

  // Applications
  getResumeDownloadUrl(applicationIdOrRef: string): string {
    if (applicationIdOrRef.startsWith("http")) return applicationIdOrRef;
    if (applicationIdOrRef.startsWith("/api/v1/")) return `${API_BASE_URL}${applicationIdOrRef}`;
    return `${API_BASE_URL}/api/v1/admin/applications/${applicationIdOrRef}/resume`;
  },

  async getApplications(params?: { status?: string; search?: string; page?: number; limit?: number }): Promise<{ applications: ApplicationItem[]; total: number }> {
    const query = toQueryString(params);
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/applications?${query}`, {
      credentials: "include",
    });
    if (!res.ok) return { applications: [], total: 0 };
    const json = await res.json();
    return { applications: json.applications || [], total: json.total || 0 };
  },

  async updateApplicationStatus(id: string, status: string, notes?: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/applications/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status, notes }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update status");
    return json.data;
  },

  async deleteApplication(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/applications/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to delete application");
    return json;
  },

  async getTrackApplicationCount(trackSlugOrId: string): Promise<number> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/applications/track/${trackSlugOrId}/count`, {
      credentials: "include",
    });
    if (!res.ok) return 0;
    const json = await res.json();
    return json.count || 0;
  },

  async deleteTrackApplications(trackSlugOrId: string): Promise<{ success: boolean; message: string; deletedCount: number }> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/applications/track/${trackSlugOrId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to delete track applications");
    return json;
  },

  async sendApplicationEmail(
    id: string,
    type: "shortlisted" | "accepted" | "rejected",
    data: any
  ): Promise<{ success: boolean; message: string; data?: any }> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/applications/${id}/email/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to send email");
    return json;
  },

  // Contacts
  async getContacts(params?: { status?: string; search?: string; page?: number; limit?: number }): Promise<{ contacts: ContactItem[]; total: number }> {
    const query = toQueryString(params);
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/contacts?${query}`, {
      credentials: "include",
    });
    if (!res.ok) return { contacts: [], total: 0 };
    const json = await res.json();
    return { contacts: json.contacts || [], total: json.total || 0 };
  },

  async updateContactStatus(id: string, status: string, notes?: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/contacts/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status, notes }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update contact");
    return json.data;
  },

  // Employees (CEO Only)
  async getEmployees(): Promise<UserItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/employees`, {
      credentials: "include",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  },

  async createEmployee(data: { name: string; email: string; role?: string; permissions: string[]; password?: string }) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to create employee");
    return json.user;
  },

  async updateEmployee(id: string, data: { name?: string; permissions?: string[]; status?: string; password?: string }) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update employee");
    return json.user;
  },

  // Careers
  async getAdminCareers(): Promise<CareerItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/careers`, {
      credentials: "include",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  },

  async createCareer(data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/careers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to create career");
    return json.data;
  },

  async updateCareer(id: string, data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/careers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update career");
    return json.data;
  },

  async deleteCareer(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/careers/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },

  // Case Studies
  async getAdminCaseStudies(): Promise<CaseStudyItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/case-studies`, {
      credentials: "include",
    });
    if (!res.ok) return CASE_STUDIES;
    const json = await res.json();
    return json.data || CASE_STUDIES;
  },

  async createCaseStudy(data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/case-studies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to create case study");
    return json.data;
  },

  async updateCaseStudy(id: string, data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/case-studies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update case study");
    return json.data;
  },

  async deleteCaseStudy(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/case-studies/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },

  // FAQs
  async getAdminFAQs(): Promise<FAQItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/faqs`, {
      credentials: "include",
    });
    if (!res.ok) return FAQS;
    const json = await res.json();
    return json.data || FAQS;
  },

  async createFAQ(data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/faqs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to create FAQ");
    return json.data;
  },

  async updateFAQ(id: string, data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update FAQ");
    return json.data;
  },

  async deleteFAQ(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/faqs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },

  // Announcements
  async getAdminAnnouncements(): Promise<AnnouncementItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/announcements`, {
      credentials: "include",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  },

  async createAnnouncement(data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/announcements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to create announcement");
    return json.data;
  },

  async updateAnnouncement(id: string, data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/announcements/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update announcement");
    return json.data;
  },

  async deleteAnnouncement(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/announcements/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },

  // Settings
  async getSettings(): Promise<WebsiteSettings | null> {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/settings`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  },

  async updateSettings(data: unknown) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update settings");
    return json.data;
  },

  // Audit Logs
  async getAuditLogs(params?: { page?: number; limit?: number }): Promise<{ logs: AuditLogItem[]; total: number }> {
    const query = toQueryString(params);
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/audit-logs?${query}`, {
      credentials: "include",
    });
    if (!res.ok) return { logs: [], total: 0 };
    const json = await res.json();
    return { logs: json.logs || [], total: json.total || 0 };
  },
};
