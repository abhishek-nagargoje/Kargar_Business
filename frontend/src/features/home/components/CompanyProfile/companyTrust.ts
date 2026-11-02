import { ShieldCheck, Users, Cpu, type LucideIcon } from 'lucide-react';

export interface TrustCard {
  icon: LucideIcon;
  title: string;
  features: string[]; // Keeping this for backward compatibility if used elsewhere
  description?: string; // New field for exact image text
}

export const companyTrust: TrustCard[] = [
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Strict operating standards and continuous quality monitoring across every engagement.",
    features: ["Strict SOPs", "Continuous audits", "Quality inspections"]
  },
  {
    icon: Users,
    title: "Verified Workforce",
    description: "Trained, verified, and background-checked teams committed to safety and professionalism.",
    features: ["Police Verification", "Background Checks", "Training Programs"]
  },
  {
    icon: Cpu,
    title: "Technology Driven",
    description: "Smart processes, real-time reporting, and data-driven operations for complete transparency.",
    features: ["Digital Reporting", "Attendance Tracking", "Performance Monitoring"]
  }
];
