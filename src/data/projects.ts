export type ProjectVisualType = 'wireframe' | 'contact-sheet' | 'telemetry' | 'specimen';

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  tags: string[];
  visualType: ProjectVisualType;
  // Optional asset configurations:
  images?: string[]; // Used for 'contact-sheet' or real UI screenshot in 'wireframe'
  metrics?: { label: string; value: string; delta?: string }[]; // Used for 'telemetry'
  specimenCode?: string; // e.g. "01", "AC", "WM"
  statusBadge?: string; // e.g. "SHIPPED", "BETA", "ACTIVE"
  slug: string;
}
