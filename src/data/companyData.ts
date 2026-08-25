export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  subCategories: string[];
  keyFeatures: string[];
  techStack: string[];
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  useCases: string[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
  image: string;
}

export interface CoreValue {
  title: string;
  description: string;
  iconName: string;
}

export const COMPANY_INFO = {
  name: "SparkIntellect",
  tagline: "Building Intelligent Digital Solutions for Businesses",
  founder: "Prashanth S",
  founderRole: "Founder & CEO",
  founderBio: "Visionary tech leader and AI architect passionate about engineering intelligent systems that empower businesses to scale seamlessly. Under Prashanth's leadership, SparkIntellect bridges the gap between emerging AI technologies and practical business enterprise software.",
  headquarters: "Chennai, Tamil Nadu, India",
  address: "Chennai, Tamil Nadu, India",
  phone: "+91 8977177634",
  whatsapp: "+91 8977177634",
  email: "info@sparkintellect.in",
  website: "https://sparkintellect.in",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM IST | Sun: Closed",
  socials: {
    linkedin: "https://linkedin.com/company/sparkintellect.in",
    twitter: "https://twitter.com/sparkintellect.in",
    instagram: "https://instagram.com/sparkintellect.in",
    facebook: "https://facebook.com/sparkintellect",
    youtube: "https://youtube.com/@sparkintellect.in"
  },
  vision: "To become one of India's leading AI-first technology companies by building innovative digital products and intelligent business solutions that simplify the way businesses operate.",
  mission: "Empower startups, SMEs, and enterprises through cutting-edge software development, Artificial Intelligence, cloud technologies, automation, and digital transformation.",
};

export const STATS = [
  { value: "150+", label: "Projects Delivered", badge: "Global & Domestic" },
  { value: "12+", label: "Industries Served", badge: "Diverse Expertise" },
  { value: "99%", label: "Client Satisfaction", badge: "Verified Rating" },
  { value: "45+", label: "AI Models & Workflows", badge: "Production Ready" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-solutions",
    title: "Artificial Intelligence & ML",
    shortDesc: "Custom AI chatbots, generative AI models, computer vision, OCR, and predictive analytics tailored for business workflows.",
    fullDesc: "Unlock unprecedented efficiency and customer engagement with our end-to-end Artificial Intelligence solutions. We design, fine-tune, and deploy custom Machine Learning models, natural language processing pipelines, intelligent document automation (OCR), and conversational AI agents.",
    iconName: "Bot",
    subCategories: [
      "Conversational AI Chatbots & Voice Assistants",
      "Computer Vision & Object Recognition",
      "Intelligent Document Processing & OCR",
      "Predictive Analytics & Data Science",
      "Generative AI & LLM Fine-Tuning",
      "Autonomous Workflow Automation"
    ],
    keyFeatures: [
      "Enterprise RAG & Knowledge Retrieval",
      "Multi-channel WhatsApp & Web Voice Integration",
      "High Accuracy Document Parsing (PDFs, Invoices)",
      "Custom Model Training & Edge Deployment"
    ],
    techStack: ["Python", "PyTorch", "TensorFlow", "OpenAI API", "LangChain", "FastAPI"]
  },
  {
    id: "web-development",
    title: "Web Engineering & SaaS",
    shortDesc: "High-performance corporate portals, SaaS platforms, interactive web dashboards, and Progressive Web Apps (PWAs).",
    fullDesc: "We craft lighting-fast, aesthetically captivating, and SEO-optimized web applications designed for scale. Utilizing Next.js, React, and modern micro-frontends, we deliver pixel-perfect user experiences backed by robust cloud infrastructure.",
    iconName: "Globe",
    subCategories: [
      "Corporate & Enterprise Websites",
      "Full-Stack SaaS Applications",
      "Real-Time Analytics Dashboards",
      "Progressive Web Apps (PWAs)",
      "API Development & Integration"
    ],
    keyFeatures: [
      "Sub-second Load Times & Core Web Vitals Optimization",
      "Dark Mode & Ultra-Responsive Layouts",
      "Headless CMS & Content Workflows",
      "Bank-grade Security & SSL Integration"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"]
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    shortDesc: "Native and cross-platform mobile apps for iOS and Android built with Flutter and React Native.",
    fullDesc: "Deliver delightful mobile experiences straight to your users' fingertips. We engineer sleek, feature-rich iOS and Android applications with offline synchronization, push notifications, secure biometrics, and seamless API integrations.",
    iconName: "Smartphone",
    subCategories: [
      "Cross-Platform Apps (Flutter & React Native)",
      "Native iOS (Swift) & Android (Kotlin)",
      "Enterprise Mobility Solutions",
      "App Store & Google Play Publishing"
    ],
    keyFeatures: [
      "60 FPS Fluid UI Animations",
      "Biometric Authentication & Secure Storage",
      "Real-time Offline Sync",
      "Payment Gateway & Push Notification Setup"
    ],
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"]
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    shortDesc: "Scalable online storefronts, custom shopping carts, payment gateways, inventory management, and multi-vendor platforms.",
    fullDesc: "Transform online visitors into loyal customers with tailored e-commerce platforms. From headless Shopify builds to custom multi-vendor marketplaces, we handle payment routing, automated inventory sync, and intelligent product recommendation engines.",
    iconName: "ShoppingBag",
    subCategories: [
      "Custom E-Commerce Storefronts",
      "Shopify & WooCommerce Customization",
      "Multi-Vendor Marketplace Platforms",
      "Payment Gateway Integrations (UPI, Razorpay, Stripe)",
      "Automated Order & Inventory Sync"
    ],
    keyFeatures: [
      "One-click Checkout & Localized Payment Routing",
      "Real-time Inventory Tracking & ERP Sync",
      "AI Product Recommendations",
      "High-converting Cart Abandonment Workflows"
    ],
    techStack: ["Next.js Commerce", "Shopify Plus", "WooCommerce", "Razorpay", "Stripe", "Node.js"]
  },
  {
    id: "custom-software",
    title: "Enterprise Custom Software",
    shortDesc: "Tailored ERP, CRM, HR management portals, billing software, and custom business management tools.",
    fullDesc: "Off-the-shelf software often fails to meet unique business operational demands. We build custom ERPs, CRMs, inventory managers, and internal workflow tools tailored exactly to your organization's business logic and hierarchy.",
    iconName: "Cpu",
    subCategories: [
      "Enterprise Resource Planning (ERP)",
      "Customer Relationship Management (CRM)",
      "HR, Payroll & Attendance Systems",
      "Inventory & POS Billing Software",
      "Internal Admin & Portal Management"
    ],
    keyFeatures: [
      "Role-Based Access Control (RBAC)",
      "Custom Automated Reporting & Exporting (PDF/Excel)",
      "Multi-branch Data Sync",
      "Legacy System Migration"
    ],
    techStack: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker", "Redis"]
  },
  {
    id: "cloud-services",
    title: "Cloud & DevOps Engineering",
    shortDesc: "Cloud architecture, VPS setup, Docker containerization, CI/CD pipelines, automated backups, and SSL/DNS management.",
    fullDesc: "Ensure 99.99% uptime, seamless elasticity, and bulletproof security for your digital assets. We design cloud environments on AWS, Azure, GCP, and DigitalOcean, utilizing infrastructure-as-code and continuous delivery pipelines.",
    iconName: "Cloud",
    subCategories: [
      "Cloud Migration & Infrastructure Setup",
      "Docker & Kubernetes Containerization",
      "Automated CI/CD Deployment Pipelines",
      "Database Backup, Replication & Recovery",
      "SSL, DNS, & Security Hardening"
    ],
    keyFeatures: [
      "Zero-downtime Deployments",
      "Cost Optimization & Autoscaling",
      "24/7 Server Health Monitoring",
      "Disaster Recovery & Daily Backups"
    ],
    techStack: ["AWS", "DigitalOcean", "Docker", "Nginx", "GitHub Actions", "Terraform"]
  },
  {
    id: "automation",
    title: "Workflow & Business Automation",
    shortDesc: "No-code & low-code automation, WhatsApp CRM bots, email campaign pipelines, and n8n/Zapier integration.",
    fullDesc: "Eliminate repetitive manual tasks and eliminate human errors. We build automated workflow pipelines connecting your CRM, communication tools, invoicing software, and analytics dashboards.",
    iconName: "Zap",
    subCategories: [
      "WhatsApp & SMS Automated CRM Bots",
      "n8n & Zapier Custom Integration Pipelines",
      "Automated Lead Capture & Nurturing",
      "Email Marketing & Notification Trigger Systems",
      "Internal Operational Task Automation"
    ],
    keyFeatures: [
      "Instant WhatsApp Order Updates & Reminders",
      "Cross-platform Webhook Orchestration",
      "Lead Routing & Auto-assignment",
      "Detailed Execution Logs & Alert Systems"
    ],
    techStack: ["n8n", "Zapier", "Meta WhatsApp API", "SendGrid", "Webhooks", "Node.js"]
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "retail-ecommerce",
    name: "Retail & E-Commerce",
    iconName: "ShoppingBag",
    description: "Empowering retailers with AI inventory forecasting, smart storefronts, omnichannel payment integrations, and instant WhatsApp support.",
    useCases: ["AI Product Recommendations", "Inventory Synchronization", "Order Status Bots", "POS Software"]
  },
  {
    id: "fashion-apparel",
    name: "Fashion & Apparel",
    iconName: "Sparkles",
    description: "Visual catalog showcases, size recommendation engines, custom lookbook builders, and automated order fulfillment pipelines.",
    useCases: ["Interactive Visual Portals", "Size & Fit AI Assistants", "Wholesale Buyer Portals", "Social Commerce Integrations"]
  },
  {
    id: "manufacturing-logistics",
    name: "Manufacturing & Industrial",
    iconName: "Factory",
    description: "Custom ERP systems, supply chain tracking, predictive equipment maintenance alerts, and automated vendor management portals.",
    useCases: ["Supply Chain Visibility", "Inventory & Warehouse ERP", "Quality Control OCR", "Vendor Portals"]
  },
  {
    id: "education-edtech",
    name: "Education & EdTech",
    iconName: "GraduationCap",
    description: "Learning Management Systems (LMS), student portals, automated grading assistants, course delivery, and online examination platforms.",
    useCases: ["Interactive LMS Platforms", "Student Attendance & Fees Portal", "AI Quiz Generators", "Virtual Classrooms"]
  },
  {
    id: "healthcare-pharma",
    name: "Healthcare & Life Sciences",
    iconName: "Activity",
    description: "Telemedicine portals, patient appointment booking, secure electronic health records (EHR), and prescription OCR tools.",
    useCases: ["Doctor Booking & Telehealth", "Medical Record Digitization", "Pharmacy Inventory", "Patient Communication Bots"]
  },
  {
    id: "realestate-construction",
    name: "Real Estate & Construction",
    iconName: "Building",
    description: "Property listing platforms, 3D virtual tour integrations, lead management CRMs, and construction project progress dashboards.",
    useCases: ["Interactive Property Portals", "Construction ERP", "Lead Qualification Bots", "Tenant Portals"]
  },
  {
    id: "hospitality-restaurants",
    name: "Hospitality & Food Outlets",
    iconName: "Utensils",
    description: "QR menu ordering, table reservation systems, kitchen display systems (KDS), multi-branch inventory, and customer loyalty programs.",
    useCases: ["QR Menu & Direct Ordering", "Table Booking Engines", "Loyalty & Rewards Systems", "Multi-branch POS"]
  },
  {
    id: "finance-services",
    name: "Professional & Enterprise Services",
    iconName: "Briefcase",
    description: "Secure client portals, automated document generation, billing software, time tracking, and analytics dashboards.",
    useCases: ["Client Portal & File Exchange", "Invoicing & Payment Automation", "CRM & Lead Pipelines", "Contract Generation"]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Requirement Discovery & Analysis",
    description: "We conduct in-depth sessions to understand your business goals, target audience, technical specifications, and key performance metrics.",
    deliverables: ["Project Scope Document", "Feature Roadmap", "Architecture Outline"],
    iconName: "Search",
    image: "/images/process/step-1.png"
  },
  {
    stepNumber: 2,
    title: "Strategic Planning & Solution Design",
    description: "Our technical architects select the optimal tech stack, map system architecture, database schemas, and API end-points.",
    deliverables: ["Tech Stack Finalization", "DB Schema Blueprint", "API Specification"],
    iconName: "Compass",
    image: "/images/process/step-2.png"
  },
  {
    stepNumber: 3,
    title: "UI/UX Wireframing & Prototyping",
    description: "We craft interactive visual prototypes focusing on user journey, modern aesthetics, micro-interactions, and visual harmony.",
    deliverables: ["Figma Interactive Prototype", "Design System Guidelines", "User Flow Maps"],
    iconName: "Layout",
    image: "/images/process/step-3.png"
  },
  {
    stepNumber: 4,
    title: "Agile Development & Sprint Execution",
    description: "Our engineers build your solution in rapid 2-week iterative sprints, maintaining clean, modular, and well-documented code.",
    deliverables: ["Sprint Code Releases", "Weekly Demo Build", "Version-Controlled Repos"],
    iconName: "Code",
    image: "/images/process/step-4.png"
  },
  {
    stepNumber: 5,
    title: "Rigorous Quality Assurance & Security Testing",
    description: "Comprehensive automated unit testing, cross-browser compatibility, penetration testing, performance load checks, and accessibility verification.",
    deliverables: ["QA Audit Report", "Security Compliance Check", "Performance Benchmark Score"],
    iconName: "CheckCircle",
    image: "/images/process/step-5.png"
  },
  {
    stepNumber: 6,
    title: "Client Review & UAT Sign-off",
    description: "We present the complete solution for User Acceptance Testing (UAT), gathering your feedback and fine-tuning every micro-detail.",
    deliverables: ["UAT Feedback Log", "Final Code Polish", "Sign-off Approval"],
    iconName: "Eye",
    image: "/images/process/step-6.png"
  },
  {
    stepNumber: 7,
    title: "Cloud Deployment & Production Launch",
    description: "Zero-downtime deployment to production cloud servers with SSL configuration, domain setup, CDN optimization, and database backups.",
    deliverables: ["Live Production App", "SSL & CDN Active", "Disaster Recovery Backup"],
    iconName: "Rocket",
    image: "/images/process/step-7.png"
  },
  {
    stepNumber: 8,
    title: "Team Training & Knowledge Handoff",
    description: "We provide comprehensive user manuals, video walkthroughs, and hands-on training for your internal management team.",
    deliverables: ["User Documentation", "Admin Video Tutorials", "Access Credentials Handover"],
    iconName: "BookOpen",
    image: "/images/process/step-8.png"
  },
  {
    stepNumber: 9,
    title: "Continuous Maintenance & Growth Support",
    description: "Post-launch 24/7 server monitoring, performance tuning, security patches, and feature updates as your business expands.",
    deliverables: ["24/7 Server Health Monitoring", "Monthly Maintenance Reports", "Priority Support SLA"],
    iconName: "ShieldCheck",
    image: "/images/process/step-9.png"
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Innovation First",
    description: "We constantly research and integrate cutting-edge AI models and frameworks to deliver future-proof solutions.",
    iconName: "Lightbulb"
  },
  {
    title: "Uncompromising Quality",
    description: "We adhere to senior-level engineering standards, robust testing, and clean architecture in every line of code.",
    iconName: "Shield"
  },
  {
    title: "Transparency & Integrity",
    description: "Clear communication, transparent pricing, and predictable timelines with zero hidden fine print.",
    iconName: "Smile"
  },
  {
    title: "Customer Success",
    description: "Your business growth is our primary metric of achievement. We partner with you for long-term digital evolution.",
    iconName: "Target"
  },
  {
    title: "Collaborative Excellence",
    description: "Working closely as an extended technology arm to align seamlessly with your internal business vision.",
    iconName: "Users"
  },
  {
    title: "Accountability",
    description: "We take 100% ownership of project deliverables, security, performance, and post-launch stability.",
    iconName: "Award"
  }
];

export const WHY_CHOOSE_US = [
  { title: "AI-Native Architecture", description: "Every project is engineered with AI capabilities embedded from ground up, not patched on later." },
  { title: "End-to-End Ownership", description: "From initial napkin idea to design, code, cloud deployment, and maintenance, we handle everything." },
  { title: "Rapid Turnaround", description: "Agile sprint methodology ensures product delivery 30-40% faster than traditional agencies." },
  { title: "Cost-Effective Pricing", description: "Premium, tier-1 engineering quality tailored to fit startup and SME budgets." },
  { title: "Strict Data Confidentiality", description: "Robust non-disclosure agreements (NDAs) and enterprise-grade data encryption." },
  { title: "Scalable Infrastructure", description: "Architected to handle scaling from 100 users to 1,000,000 users without architecture redesign." },
  { title: "Dedicated Support Team", description: "Direct line of communication with developers and account managers with prompt response SLA." },
  { title: "Proven Track Record", description: "150+ successful deployments across retail, healthcare, manufacturing, and tech sectors." }
];

export const FAQS = [
  {
    q: "What services does SparkIntellect specialize in?",
    a: "SparkIntellect is an AI-first IT solutions company. We specialize in AI & Machine Learning integration, custom web and mobile app development, e-commerce platforms, enterprise ERP/CRM software, cloud DevOps, and automated workflow solutions."
  },
  {
    q: "Where is SparkIntellect located?",
    a: "Our main headquarters is located in Guindy, Chennai, Tamil Nadu, India. We serve clients across India as well as international businesses globally."
  },
  {
    q: "How long does a typical software or web development project take?",
    a: "Simple corporate websites take 1–2 weeks, while custom web/mobile applications and ERP systems typically take 4–8 weeks depending on complexity. We establish clear sprint milestones during phase 1."
  },
  {
    q: "Can SparkIntellect integrate AI into our existing software?",
    a: "Yes! We frequently enhance existing software systems by adding custom AI chatbots, automated document OCR, predictive analytics, or natural language search APIs without needing to rebuild your core system."
  },
  {
    q: "What is your project pricing structure?",
    a: "We offer flexible pricing options: Fixed-price milestone billing for defined scope projects, and Dedicated Developer / Monthly Retainer models for ongoing product engineering and maintenance."
  },
  {
    q: "Do you provide post-launch support and maintenance?",
    a: "Absolutely. All our projects include complimentary post-launch support. Additionally, we offer ongoing cloud maintenance, security monitoring, and SLA support packages."
  }
];
