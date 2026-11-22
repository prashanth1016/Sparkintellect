export type VisualType =
  | "ai"
  | "erp"
  | "crm"
  | "portal"
  | "commerce"
  | "mobile"
  | "automation"
  | "analytics";

export interface PortfolioProduct {
  id: string;
  number: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  visualType: VisualType;
  href: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
  };
}

export interface ProductVisualProps {
  progress: number;
  localProgress: number;
  active: boolean;
  reducedMotion: boolean;
}
