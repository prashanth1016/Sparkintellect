export interface ServiceItem {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  capabilities: string[];
  useCases: string[];
  keyFeatures: string[];
  techStack: string[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export interface IndustryItem {
  _id?: string;
  id: string;
  slug: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  challenges: string[];
  solutions: string[];
  useCases: string[];
  featuredTech: string[];
}

export interface CaseStudyItem {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  published?: boolean;
  featured?: boolean;
  order?: number;
}

export interface CareerItem {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  shortDesc: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: "active" | "closed" | "draft";
}

export interface FAQItem {
  _id?: string;
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
  category?: string;
  order?: number;
  published?: boolean;
}

export interface InternshipItem {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  department?: string;
  duration: string;
  mode: string;
  location: string;
  stipend: string;
  eligibility?: string;
  shortDescription: string;
  fullDescription: string;
  skills: string[];
  technologies: string[];
  benefits: string[];
  requirements?: string[];
  status: "open" | "closed" | "draft" | "archived";
  published: boolean;
  applicationFields: Array<{
    id: string;
    name: string;
    label: string;
    type: "text" | "email" | "tel" | "textarea" | "select" | "file";
    required: boolean;
    placeholder?: string;
    options?: string[];
    order: number;
  }>;
}

export const COMPANY_INFO = {
  name: "SparkIntellect",
  tagline: "We Build Intelligent Software for Businesses Ready to Grow",
  founder: "Mr. Prashanth",
  founderRole: "Founder & CEO",
  founderBio: "AI Architect and software entrepreneur passionate about engineering scalable, high-integrity digital platforms. SparkIntellect bridges the gap between modern frontier AI systems and enterprise business execution.",
  coFounder: "Mr. Pranesh Rajagopal",
  coFounderRole: "Co-Founder & Managing Director",
  coFounderBio: "Strategic growth leader and managing director driving executive operations, client partnerships, corporate governance, and organizational expansion. Mr. Pranesh ensures SparkIntellect's cutting-edge AI and enterprise software solutions deliver enduring business ROI.",
  headquarters: "Chennai, Tamil Nadu, India",
  address: "Chennai, Tamil Nadu - 600032, India",
  phone: "+91 9943177634",
  whatsapp: "+91 9943177634",
  email: "info@sparkintellect.in",
  careersEmail: "careers@sparkintellect.in",
  website: "https://sparkintellect.in",
  adminUrl: "https://admin.sparkintellect.in",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM IST | Sun: Closed",
  socials: {
    linkedin: "https://linkedin.com/company/sparkintellect",
    prashanthLinkedin: "https://linkedin.com/in/prashanth1416",
    twitter: "https://twitter.com/sparkintellect.in",
    instagram: "https://instagram.com/sparkintellect_in",
    github: "https://github.com/sparkintellect",
  },
  vision: "To build a world-class technology firm creating intelligent, high-leverage software products and platforms that streamline operations and accelerate human potential.",
  mission: "Deliver precision-engineered AI systems, custom software platforms, and career-launching technical mentorship with transparent architecture and enduring reliability.",
};

export const STATS = [
  { value: "150+", label: "Platforms Delivered", badge: "Global & Domestic" },
  { value: "99.4%", label: "Uptime & Reliability", badge: "Production SLA" },
  { value: "12+", label: "Industry Domains", badge: "Enterprise Depth" },
  { value: "45+", label: "AI Models & Pipelines", badge: "Production Ready" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-development",
    slug: "ai-development",
    title: "AI & Machine Learning",
    shortDesc: "Custom AI assistants, Retrieval-Augmented Generation (RAG), computer vision, intelligent document parsing, and predictive automation.",
    fullDesc: "Build AI into the core of how your business operates. We engineer production-ready large language model workflows, secure enterprise knowledge search, document OCR pipelines, and domain-tuned neural models.",
    iconName: "Bot",
    capabilities: [
      "Enterprise AI Assistants & Voice Agents",
      "Retrieval-Augmented Generation (RAG) & Vector Search",
      "Intelligent Document Processing (OCR, Invoice Extraction)",
      "Computer Vision & Quality Inspection",
      "Predictive Analytics & Forecasting Models",
      "Autonomous Multi-Agent Workflow Automation"
    ],
    useCases: [
      "Customer Support Copilots & Instant Triaging",
      "Internal Enterprise Knowledge Search",
      "Automated Financial & Logistics Document Extraction",
      "Predictive Inventory & Demand Forecasting",
      "Intelligent Sales Lead Scoring & Routing"
    ],
    keyFeatures: [
      "Private Enterprise Data Security (Zero Training on Client Data)",
      "Sub-second Token Generation & High-Throughput Inference",
      "Hybrid Multi-Model Orchestration (OpenAI, Claude, Llama 3, DeepSeek)",
      "Enterprise Audit Trail & Hallucination Guardrails"
    ],
    techStack: ["Python", "FastAPI", "PyTorch", "LangChain", "LlamaIndex", "ChromaDB", "pgvector", "OpenAI"],
    process: [
      { step: "Data & Workflow Audit", desc: "Identify high-value business bottlenecks and prepare data pipelines." },
      { step: "Architecture & Model Selection", desc: "Benchmark optimal LLMs and fine-tuning strategies." },
      { step: "RAG & Guardrail Engineering", desc: "Integrate vector databases, role permissions, and safety filters." },
      { step: "Production Deployment", desc: "Deploy with latency monitoring, auto-scaling, and feedback telemetry." }
    ],
    faqs: [
      { q: "Is our proprietary business data used to train public AI models?", a: "No. We enforce strict enterprise zero-data-retention agreements and deploy private dedicated instances or on-premise models where required." },
      { q: "How do you prevent AI hallucinations?", a: "We employ strict multi-stage RAG validation, source-citation grounding, and automated deterministic guardrails." }
    ]
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Applications & SaaS",
    shortDesc: "High-performance full-stack web applications, multi-tenant SaaS platforms, interactive portals, and robust cloud micro-frontends.",
    fullDesc: "We build modern, lightning-fast web applications designed around how your business operates. Leveraging Next.js, React, TypeScript, and modern API gateways, we create resilient digital ecosystems that scale seamlessly.",
    iconName: "Globe",
    capabilities: [
      "Multi-Tenant SaaS Applications",
      "Custom Enterprise Portals & Dashboards",
      "E-Commerce & High-Conversion Storefronts",
      "Progressive Web Apps (PWAs)",
      "Headless CMS Architecture & Content Workflows",
      "High-Throughput REST & GraphQL APIs"
    ],
    useCases: [
      "B2B Customer & Vendor Management Portals",
      "Subscription-Based SaaS Product Platforms",
      "Real-Time Analytics & Operations Dashboards",
      "Direct-to-Consumer Digital Storefronts"
    ],
    keyFeatures: [
      "Sub-second Load Times & Perfect Core Web Vitals",
      "Role-Based Access Control (RBAC) & Secure Sessions",
      "Responsive Layouts with Zero Layout Shift",
      "Complete SEO & Structured Metadata Engine"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL", "MongoDB"],
    process: [
      { step: "Interactive Prototyping", desc: "Wireframe complete user journeys and design systems in Figma." },
      { step: "Sprint Engineering", desc: "Build modular, component-driven frontend and type-safe backend APIs." },
      { step: "Automated QA & Security", desc: "End-to-end integration tests, accessibility audits, and vulnerability scans." },
      { step: "CDN & Edge Launch", desc: "Global edge deployment with cache optimization and continuous CI/CD." }
    ],
    faqs: [
      { q: "Why do you use Next.js and TypeScript?", a: "Next.js offers optimal SEO, edge rendering, and speed, while TypeScript prevents runtime bugs and ensures long-term codebase maintainability." }
    ]
  },
  {
    id: "mobile-development",
    slug: "mobile-development",
    title: "Mobile App Development",
    shortDesc: "High-performance iOS and Android mobile applications built with Flutter, React Native, and native architectures.",
    fullDesc: "Deliver fluid, high-performance mobile experiences directly into your customers' and field teams' hands. We craft cross-platform iOS and Android applications with offline synchronization, biometric security, push notifications, and background location processing.",
    iconName: "Smartphone",
    capabilities: [
      "Cross-Platform Apps (Flutter & React Native)",
      "Native iOS (Swift) & Android (Kotlin) Modules",
      "Offline-First Real-Time Synchronization",
      "Biometric Authentication & Hardware Integration",
      "Push Notifications & Event Triggers",
      "App Store & Google Play Launch Management"
    ],
    useCases: [
      "Field Operations & Workforce Tracking Apps",
      "Customer Loyalty & Mobile Commerce Apps",
      "On-Demand Delivery & Fleet Dispatch Systems",
      "Healthcare Patient & Appointment Apps"
    ],
    keyFeatures: [
      "Fluid 60fps / 120fps Native Rendering",
      "Local SQLite / WatermelonDB Cache with Cloud Sync",
      "Hardware Sensor & Bluetooth BLE Interfacing",
      "Automated Crashlytics & Telemetry Monitoring"
    ],
    techStack: ["Flutter", "Dart", "React Native", "Swift", "Kotlin", "Firebase", "Node.js"],
    process: [
      { step: "Mobile UX Mapping", desc: "Design thumb-friendly interfaces and intuitive touch patterns." },
      { step: "Core Engine Build", desc: "Implement state management, offline database, and API layers." },
      { step: "Device Matrix Testing", desc: "Test on 30+ physical screen sizes, OS versions, and network speeds." },
      { step: "Store Compliance & Launch", desc: "Complete Apple App Review and Google Play Console publishing." }
    ],
    faqs: [
      { q: "Can one codebase run on both iOS and Android?", a: "Yes. Using Flutter or React Native, we share over 90% of the codebase across platforms while preserving authentic native feel and performance." }
    ]
  },
  {
    id: "enterprise-software",
    slug: "enterprise-software",
    title: "Enterprise Custom Software",
    shortDesc: "Tailored ERP systems, CRM pipelines, HR payroll platforms, supply chain management, and bespoke internal business tools.",
    fullDesc: "Generic off-the-shelf software rarely fits complex business logic. We design and engineer enterprise ERPs, CRMs, inventory managers, and billing platforms mapped precisely to your organization's hierarchy, approval flows, and audit mandates.",
    iconName: "Cpu",
    capabilities: [
      "Enterprise Resource Planning (ERP)",
      "Customer Relationship Management (CRM)",
      "Inventory, Warehouse & POS Billing Platforms",
      "HR, Attendance & Automated Payroll Systems",
      "Multi-Department Workflow & Approval Engines",
      "Legacy Database & System Migration"
    ],
    useCases: [
      "Manufacturing Material & Production Scheduling",
      "Construction Progress, Material & Labour Billing",
      "Retail Multi-Branch Inventory & GST Invoicing",
      "Corporate Contract & Vendor Management"
    ],
    keyFeatures: [
      "Granular Multi-Tier Role-Based Access Control",
      "Automated PDF & Excel Export Engines",
      "Immutable Audit Logs for Financial Compliance",
      "Real-Time Multi-Branch Data Consolidation"
    ],
    techStack: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Redis", "Docker"],
    process: [
      { step: "Process Mapping", desc: "Audit manual spreadsheets, departments, and approval chains." },
      { step: "Schema & DB Modeling", desc: "Design normalized database architectures and transaction boundaries." },
      { step: "Iterative Module Delivery", desc: "Deploy modules in phases to minimize operational downtime." },
      { step: "Staff Training & Cutover", desc: "Provide user training, documentation, and live cutover support." }
    ],
    faqs: [
      { q: "How long does custom ERP development take?", a: "A foundational core module is typically deployed in 4 to 8 weeks, with specialized sub-modules rolled out in continuous 2-week sprints." }
    ]
  },
  {
    id: "automation",
    slug: "automation",
    title: "Workflow & AI Automation",
    shortDesc: "End-to-end business process automation, WhatsApp CRM bots, n8n webhook orchestration, and automated marketing pipelines.",
    fullDesc: "Eliminate manual repetitive data entry, human oversights, and slow handoffs. We build automated data orchestration pipelines connecting your communication channels, billing systems, databases, and third-party SaaS tools.",
    iconName: "Zap",
    capabilities: [
      "WhatsApp & SMS Automated CRM Pipelines",
      "n8n, Zapier & Custom Webhook Orchestrators",
      "Automated Lead Ingestion & Distribution",
      "Invoice Generation & Payment Notification Loops",
      "Multi-App Data Sync & Error Recovery",
      "Document Auto-Filing & Email Triage"
    ],
    useCases: [
      "Instant WhatsApp Quotation & Booking Confirmation",
      "Automated E-Commerce Order Fulfillment & Tracking",
      "Customer Support Ticket Auto-Routing & Escalation",
      "Recurring Subscription Billing & Dunning Automation"
    ],
    keyFeatures: [
      "Zero-Loss Message Queues & Automatic Retries",
      "Real-Time Telegram/Slack Alert Monitoring",
      "Official Meta WhatsApp Cloud API Integration",
      "SOC2 / GDPR Compliant Data Handling"
    ],
    techStack: ["n8n", "Node.js", "Meta WhatsApp API", "Zapier", "Webhooks", "Redis BullMQ"],
    process: [
      { step: "Bottleneck Analysis", desc: "Map all repetitive manual touchpoints across departments." },
      { step: "Pipeline Architecture", desc: "Configure resilient triggers, transformers, and fallback queues." },
      { step: "Dry-Run & Sandbox Testing", desc: "Simulate edge cases, network drops, and unexpected payload structures." },
      { step: "Live Deployment", desc: "Activate production webhooks with real-time alerting." }
    ],
    faqs: [
      { q: "What happens if a third-party service is temporarily down?", a: "Our automation queues store the transaction and implement exponential backoff retries until confirmed delivered." }
    ]
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    shortDesc: "Cloud architecture, Docker containerization, automated CI/CD pipelines, SSL/DNS hardening, and 24/7 reliability engineering.",
    fullDesc: "Ensure 99.99% uptime, robust security, and cost efficiency for your digital products. We architect and manage cloud environments across AWS, Render, DigitalOcean, and GCP with automated backups, monitoring, and zero-downtime deployment pipelines.",
    iconName: "Cloud",
    capabilities: [
      "Cloud Infrastructure Architecture (AWS, Render, GCP)",
      "Docker Containerization & Multi-Stage Builds",
      "Automated CI/CD Pipelines with GitHub Actions",
      "Database Replication, Automated Backups & Disaster Recovery",
      "SSL, DNS, WAF & Cloudflare Security Hardening",
      "24/7 Server Health Telemetry & Log Aggregation"
    ],
    useCases: [
      "Zero-Downtime Application Deployments",
      "Multi-Region High Availability & Failover",
      "Database Backup & Point-in-Time Recovery",
      "Cloud Cost Optimization & Right-Sizing"
    ],
    keyFeatures: [
      "Automated Infrastructure-as-Code Setup",
      "Encrypted Secrets Management",
      "Real-Time Incident Alerting (Slack/Email/SMS)",
      "Automated SSL Certificate Renewal & Edge Caching"
    ],
    techStack: ["AWS", "Render", "Docker", "GitHub Actions", "Nginx", "Cloudflare", "MongoDB Atlas"],
    process: [
      { step: "Infrastructure Audit", desc: "Review current hosting architecture, security gaps, and bottlenecks." },
      { step: "Pipeline Automation", desc: "Write reproducible Dockerfiles and automated CI/CD workflow scripts." },
      { step: "Security & DNS Hardening", desc: "Configure strict CSP, WAF rules, TLS 1.3, and CORS headers." },
      { step: "Telemetry Activation", desc: "Enable automated uptime checks, error monitoring, and daily backups." }
    ],
    faqs: [
      { q: "Can you help migrate our existing backend to Render and MongoDB Atlas?", a: "Yes. We execute seamless zero-downtime database migrations, DNS cutovers, and backend deployments." }
    ]
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "construction",
    slug: "construction",
    name: "Construction & Real Estate",
    iconName: "Building",
    tagline: "Digitize site operations, material tracking, contractor billing, and property sales.",
    description: "Construction and property development businesses face complex logistical challenges across multiple job sites. SparkIntellect develops custom ERP solutions that unite material procurement, daily site labor logs, subcontractor billing, and digital client booking portals.",
    challenges: [
      "Fragmented daily labor and machinery tracking across remote sites",
      "Uncontrolled material pilferage and procurement mismatches",
      "Slow milestone-based subcontractor billing approvals",
      "Lack of real-time project profitability dashboards"
    ],
    solutions: [
      "Mobile-first site progress logging for field engineers",
      "Centralized multi-project inventory and gate-pass ERP",
      "Automated digital RA billing and measurement book tracking",
      "Interactive 3D unit selection and CRM for property sales"
    ],
    useCases: ["Site Progress Mobile App", "Material Procurement ERP", "Subcontractor RA Billing", "Property CRM"],
    featuredTech: ["Next.js", "React Native", "Node.js", "PostgreSQL", "AWS S3"]
  },
  {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    iconName: "Activity",
    tagline: "Secure telemedicine platforms, electronic health records, and prescription OCR.",
    description: "Healthcare organizations require dependable, HIPAA-grade security combined with intuitive patient and clinician workflows. We engineer patient appointment booking engines, telemedicine consultation portals, and automated prescription processing.",
    challenges: [
      "Paper-heavy patient records and illegible hand-written prescriptions",
      "High patient appointment no-show rates and phone-line congestion",
      "Complex multi-branch doctor scheduling and clinic room management",
      "Strict data confidentiality and regulatory compliance requirements"
    ],
    solutions: [
      "AI-powered prescription OCR and automated pharmacy inventory sync",
      "Self-service patient appointment booking and automated WhatsApp reminders",
      "Secure cloud Electronic Medical Records (EMR) with role-based access",
      "Teleconsultation with end-to-end encrypted video and digital Rx generation"
    ],
    useCases: ["Telehealth Consultation Portal", "Prescription OCR Pipeline", "Clinic Appointment Engine", "EMR Management"],
    featuredTech: ["Python OCR", "Next.js", "WebRTC", "MongoDB Atlas", "Docker"]
  },
  {
    id: "education",
    slug: "education",
    name: "Education & EdTech",
    iconName: "GraduationCap",
    tagline: "Interactive Learning Management Systems, online evaluations, and student portals.",
    description: "Transform education delivery with robust Learning Management Systems (LMS), automated online exam platforms, dynamic student attendance portals, and AI-assisted doubt resolution systems.",
    challenges: [
      "Inefficient manual attendance and fee collection tracking",
      "Limited student engagement in static online video lectures",
      "Time-consuming manual grading of periodic test papers",
      "Difficulty tracking student skill acquisition and campus placement readiness"
    ],
    solutions: [
      "Full-featured student and faculty portals with payment gateway integration",
      "Interactive course player with chapter quizzes and real-time progress tracking",
      "Automated code evaluation and objective quiz grading engines",
      "Placement readiness tracking and automated verified digital certificates"
    ],
    useCases: ["Learning Management System", "Online Examination Engine", "Fee & Attendance Portal", "Certificate Verification"],
    featuredTech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS S3"]
  },
  {
    id: "retail",
    slug: "retail",
    name: "Retail & E-Commerce",
    iconName: "ShoppingBag",
    tagline: "High-conversion storefronts, unified multi-branch POS, and AI product discovery.",
    description: "Bridge the gap between physical retail counters and modern digital storefronts. We build headless e-commerce platforms, unified POS systems, automated WhatsApp order updates, and AI recommendation engines.",
    challenges: [
      "Inventory mismatches between retail stores and online catalog",
      "High shopping cart abandonment rates on mobile devices",
      "Expensive transaction fees and rigid checkout flows on template platforms",
      "Manual customer support for order tracking and exchange requests"
    ],
    solutions: [
      "Headless Next.js storefront with sub-second page transitions",
      "Real-time synchronized inventory across multiple warehouses and POS outlets",
      "Localized payment gateways (UPI, Credit Cards, NetBanking, EMI)",
      "Automated WhatsApp tracking notifications and self-service return bots"
    ],
    useCases: ["Headless E-Commerce Storefront", "Multi-Branch Inventory Sync", "WhatsApp Order Tracker", "POS Invoicing"],
    featuredTech: ["Next.js Commerce", "Node.js", "Redis", "Razorpay / Stripe", "MongoDB"]
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    iconName: "Factory",
    tagline: "Supply chain visibility, machine maintenance tracking, and vendor ERP.",
    description: "Modernize plant floor operations with custom manufacturing ERPs. Track raw material inwards, production batch stages, quality inspection checks, and automated vendor purchase orders.",
    challenges: [
      "Production bottlenecks discovered too late due to delayed paper logs",
      "Unplanned machine breakdowns resulting in idle labor costs",
      "Vendor quotation comparisons managed over chaotic email threads",
      "Difficulty tracing batch defects to specific raw material suppliers"
    ],
    solutions: [
      "Digital floor dispatch boards for real-time batch stage updates",
      "Preventive machine maintenance scheduling with threshold alerts",
      "Vendor quotation portal with automated comparison and PO generation",
      "Comprehensive end-to-end raw material to finished good batch traceability"
    ],
    useCases: ["Shop-Floor Batch Tracking", "Vendor Procurement Portal", "Machine Maintenance Log", "Quality Audit System"],
    featuredTech: ["NestJS", "React", "PostgreSQL", "Docker", "Tailwind CSS"]
  },
  {
    id: "finance",
    slug: "finance",
    name: "Finance & Professional Services",
    iconName: "Briefcase",
    tagline: "Client collaboration portals, invoice automation, and document security.",
    description: "Financial consultancies, chartered accountancies, and law firms require ironclad document security and automated client billing pipelines. We build encrypted client workspaces and workflow managers.",
    challenges: [
      "Sensitive client tax and financial files sent over unencrypted email",
      "Manual chasing of overdue client invoices and payment reconciliation",
      "Lack of structured task status visibility for corporate clients",
      "Strict compliance audit trails required for all document accesses"
    ],
    solutions: [
      "Secure client portal with end-to-end encrypted file exchange",
      "Automated recurring GST invoicing and instant UPI/bank payment links",
      "Real-time milestone tracking for ongoing audit and legal assignments",
      "Tamper-evident audit logs documenting every download and document change"
    ],
    useCases: ["Encrypted Client Portal", "Automated Billing & Invoicing", "Milestone Tracking Dashboard", "Document Vault"],
    featuredTech: ["Next.js", "Node.js", "Argon2id", "PostgreSQL", "Cloudflare R2"]
  }
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "ai-support-platform",
    slug: "ai-customer-support-platform",
    title: "AI-Powered Customer Support & Knowledge Automation",
    client: "Rudra Logistics & Retail",
    industry: "Logistics & Retail",
    service: "AI & Machine Learning",
    summary: "Built an intelligent multi-channel AI customer assistant reducing support ticket resolution times by 78% across web and WhatsApp.",
    challenge: "The client received over 3,000 inquiries daily regarding consignment tracking, billing queries, and return requests, leading to 6-hour average response times and overwhelmed agents.",
    solution: "SparkIntellect designed a custom RAG (Retrieval-Augmented Generation) pipeline integrating with the client's live ERP and WhatsApp Business API. The system handles 84% of tier-1 inquiries autonomously with sub-second accuracy.",
    results: [
      "78% reduction in average ticket resolution time (from 6 hours to 4 minutes)",
      "84% of incoming queries resolved autonomously without agent intervention",
      "Zero downtime over 12 months with 24/7 continuous operation"
    ],
    techStack: ["Python", "FastAPI", "OpenAI API", "LangChain", "ChromaDB", "Meta WhatsApp API", "Node.js"],
    metrics: [
      { label: "Resolution Speed", value: "4 Min Avg" },
      { label: "Autonomous Resolution", value: "84%" },
      { label: "Daily Queries Handled", value: "3,000+" }
    ],
    published: true
  },
  {
    id: "construction-erp-system",
    slug: "enterprise-construction-management-erp",
    title: "Multi-Site Construction Management & Contractor ERP",
    client: "Southland Infra Projects",
    industry: "Construction",
    service: "Enterprise Custom Software",
    summary: "Engineered a centralized multi-site construction ERP uniting material inventory, contractor measurement books, and project cash flows.",
    challenge: "Managing 14 simultaneous construction projects using disconnected spreadsheets resulted in material shortages, unaccounted wastage, and month-end billing disputes with subcontractors.",
    solution: "Developed a responsive web and mobile ERP enabling site engineers to log daily work, verify material arrivals via digital gate passes, and generate milestone-based RA bills with automatic rate card verification.",
    results: [
      "Eliminated 95% of subcontractor billing discrepancies",
      "Saved an estimated 14% on raw material procurement through centralized vendor tracking",
      "Real-time site visibility enabled project completion 3 weeks ahead of schedule"
    ],
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Tailwind CSS", "Docker", "AWS"],
    metrics: [
      { label: "Billing Disputes", value: "-95%" },
      { label: "Material Savings", value: "14%" },
      { label: "Sites Connected", value: "14 Active" }
    ],
    published: true
  },
  {
    id: "ecommerce-automation-pipeline",
    slug: "ecommerce-fulfillment-automation",
    title: "Omnichannel E-Commerce & Inventory Automation Engine",
    client: "Apex Lifestyle Brands",
    industry: "Retail & E-Commerce",
    service: "Workflow Automation",
    summary: "Automated end-to-end order routing, warehouse packing manifests, and instant customer notifications for a fast-growing fashion brand.",
    challenge: "During seasonal flash sales, manual order copying between the online storefront, warehouse management system, and courier APIs caused shipping delays and high return rates.",
    solution: "Created an automated webhook pipeline with n8n and Node.js microservices that instantly validates orders, generates GST invoices, prints barcode shipping labels, and triggers WhatsApp tracking messages.",
    results: [
      "Same-day dispatch rate increased from 42% to 96%",
      "Zero manual data entry errors across 50,000+ orders",
      "Customer support queries regarding tracking dropped by 64%"
    ],
    techStack: ["Node.js", "Next.js", "n8n", "Redis BullMQ", "Meta WhatsApp API", "MongoDB Atlas"],
    metrics: [
      { label: "Same-Day Dispatch", value: "96%" },
      { label: "Orders Automated", value: "50,000+" },
      { label: "Tracking Calls", value: "-64%" }
    ],
    published: true
  }
];

export interface InternshipDomainInfo {
  title: string;
  iconName: string;
  description: string;
  skills: string[];
}

export const INTERNSHIP_DOMAINS: InternshipDomainInfo[] = [
  {
    title: "AI & Machine Learning",
    iconName: "Bot",
    description: "Build practical AI engineering depth with Python, modern LLMs, Retrieval-Augmented Generation (RAG), vector databases, and neural models.",
    skills: ["Python", "PyTorch", "LangChain", "Vector Databases", "FastAPI"]
  },
  {
    title: "Full-Stack Web Development",
    iconName: "Globe",
    description: "Develop scalable, high-performance web applications using modern Next.js App Router, React, TypeScript, Node.js, and database architectures.",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"]
  },
  {
    title: "Mobile App Engineering",
    iconName: "Smartphone",
    description: "Create cross-platform mobile apps for iOS and Android with Flutter and React Native, featuring offline sync and hardware integration.",
    skills: ["Flutter", "Dart", "React Native", "Firebase", "REST APIs"]
  },
  {
    title: "Cloud & DevOps Automation",
    iconName: "Cloud",
    description: "Learn containerization, CI/CD automated deployment pipelines, Docker, Linux systems, and cloud infrastructure management.",
    skills: ["Docker", "Linux", "CI/CD", "AWS", "Cloudflare", "Git"]
  },
  {
    title: "UI/UX & Product Design",
    iconName: "Layout",
    description: "Design clean, high-conversion user interfaces, component-driven design systems, and responsive prototypes using Figma.",
    skills: ["Figma", "Design Systems", "Prototyping", "Wireframing", "User Research"]
  }
];

export const PROCESS_STEPS = [
  {
    stepNumber: 1,
    title: "Requirement Discovery & Analysis",
    description: "We conduct in-depth sessions to analyze your business goals, user bottlenecks, and technical specifications.",
    deliverables: ["Technical Scope Blueprint", "System Architecture Outline", "Milestone Roadmap"],
    iconName: "Search",
    image: "/images/process/step-1.png"
  },
  {
    stepNumber: 2,
    title: "Strategic Solution Design",
    description: "Our technical architects select the optimal tech stack, database schemas, and type-safe API contracts.",
    deliverables: ["Database Schema Blueprint", "API Specification Contract", "Security & Compliance Plan"],
    iconName: "Compass",
    image: "/images/process/step-2.png"
  },
  {
    stepNumber: 3,
    title: "UI/UX Interactive Prototyping",
    description: "We craft interactive visual prototypes in Figma focusing on aesthetic minimalism, clarity, and rapid user flows.",
    deliverables: ["Interactive Figma Prototypes", "Design System Tokens", "User Journey Maps"],
    iconName: "Layout",
    image: "/images/process/step-3.png"
  },
  {
    stepNumber: 4,
    title: "Agile Sprint Engineering",
    description: "Our engineers build your solution in rapid 2-week sprints with clean, modular, and fully tested code.",
    deliverables: ["Bi-Weekly Demo Deployments", "Version-Controlled Repos", "Automated Test Suites"],
    iconName: "Code",
    image: "/images/process/step-4.png"
  },
  {
    stepNumber: 5,
    title: "Quality Assurance & Penetration Testing",
    description: "Rigorous unit, integration, cross-device, load, and security vulnerability testing before release.",
    deliverables: ["QA Audit Report", "Security & OWASP Compliance Check", "Performance Benchmark"],
    iconName: "CheckCircle",
    image: "/images/process/step-5.png"
  },
  {
    stepNumber: 6,
    title: "Cloud Deployment & Production Launch",
    description: "Zero-downtime deployment to production cloud servers with SSL, CDN caching, and automated backups.",
    deliverables: ["Live Production Application", "SSL/TLS & CDN Active", "Disaster Recovery Backups"],
    iconName: "Rocket",
    image: "/images/process/step-6.png"
  },
  {
    stepNumber: 7,
    title: "Continuous Maintenance & Growth Support",
    description: "Post-launch 24/7 telemetry monitoring, performance tuning, security patches, and feature evolution.",
    deliverables: ["24/7 Health Monitoring", "Monthly Performance Reports", "Priority SLA Support"],
    iconName: "ShieldCheck",
    image: "/images/process/step-7.png"
  }
];

export const CORE_VALUES = [
  {
    title: "Business-First Thinking",
    description: "We don't build technology for the sake of technology. Every system is engineered to solve a specific commercial problem and generate measurable ROI.",
    iconName: "Target"
  },
  {
    title: "Modern Senior Engineering",
    description: "We write clean, strictly-typed, modular code with automated testing, continuous integration, and rock-solid architecture.",
    iconName: "Shield"
  },
  {
    title: "AI-Native Architecture",
    description: "Artificial intelligence is designed into our systems from day one, not patched on as an afterthought.",
    iconName: "Lightbulb"
  },
  {
    title: "Absolute Transparency",
    description: "Clear communication, predictable sprint milestones, transparent pricing, and direct access to engineering leads.",
    iconName: "Smile"
  },
  {
    title: "End-to-End Ownership",
    description: "From napkin architecture to cloud deployment, security hardening, and ongoing maintenance, we take 100% responsibility.",
    iconName: "Award"
  },
  {
    title: "Long-Term Partnership",
    description: "We operate as an extension of your leadership team, supporting your platform through growth, scaling, and market evolution.",
    iconName: "Users"
  }
];

export const FAQS = [
  {
    q: "What services does SparkIntellect provide?",
    a: "SparkIntellect is an AI-first technology and custom software firm. We specialize in custom AI & Machine Learning solutions, full-stack web and SaaS engineering, cross-platform mobile apps (Flutter / React Native), bespoke enterprise ERP/CRM systems, cloud DevOps, and workflow automation."
  },
  {
    q: "Where is SparkIntellect located?",
    a: "Our headquarters is located in Chennai, Tamil Nadu, India. We serve client enterprises across India, North America, Europe, and the Middle East."
  },
  {
    q: "How does SparkIntellect differ from a generic agency?",
    a: "We are an engineering-driven company founded by AI architects. We do not use bloated template themes or outsource your code. Every project is built from scratch with modern TypeScript, tailored database modeling, robust security, and deep AI capabilities."
  },
  {
    q: "How are internships structured at SparkIntellect?",
    a: "Our internships run for 3 to 6 months across AI/ML, Full-Stack Web, Mobile Apps, and Cloud. Interns work directly on production-grade software with 1-on-1 mentorship from Founder & CEO Mr. Prashanth and senior developers, with official verified certificates and pre-placement offer (PPO) pathways."
  },
  {
    q: "What is your project pricing and delivery timeline?",
    a: "We offer both fixed-price milestone contracts and dedicated engineering sprint models. Standard web applications launch in 2–4 weeks, while complex AI pipelines and custom enterprise ERPs typically roll out in 4–8 weeks."
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes. All client communications, proprietary data, and technical specifications are protected under strict Non-Disclosure Agreements before any discovery or code begins."
  }
];
