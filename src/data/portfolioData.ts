export interface Waypoint {
  id: string;
  chapter: string;
  codeTag: string;
  subTag: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  position3D: [number, number, number];
  camPos: [number, number, number];
  lookAt: [number, number, number];
  accentColor: string;
  glowColor: string;
  story: string;
  narrativeOrigin?: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  websiteUrl?: string;
  websiteLabel?: string;
  isLive?: boolean;
  links?: { label: string; url: string; category: string }[];
  detailedBreakdown: {
    context: string;
    bulletPoints: string[];
    technicalStack: string[];
  };
}

export const PORTFOLIO_WAYPOINTS: Waypoint[] = [
  {
    id: 'afterlife',
    chapter: '01',
    codeTag: 'afterlife.prd',
    subTag: 'ethics.obj',
    title: 'Afterlife Club',
    subtitle: 'AI Life Journaling & Digital Legacy Platform',
    role: 'Co-Founder & Lead Product Manager',
    period: '2026 – Present',
    position3D: [0, -0.15, 0.2],
    camPos: [0.35, 0.0, 2.1],
    lookAt: [0, -0.15, 0.15],
    accentColor: '#FF5500',
    glowColor: 'rgba(255, 85, 0, 0.45)',
    story:
      'When we talked with people about end-of-life planning, we noticed that facing mortality directly felt overwhelming and emotionally draining. I led our pivot to reframe the product around daily memory journaling and celebrating life stories instead, which brought our prototype completion rate up to 88%. To protect user trust, I also established strict privacy guidelines that avoided artificial voice cloning, ensuring the platform felt authentic, comforting, and safe.',
    narrativeOrigin:
      'Rooted in my family annual portrait tradition—finding ways to keep loved ones feeling close, even when living across oceans.',
    metrics: [
      { value: '88%', label: 'Task Completion' },
      { value: '92%', label: 'User Trust Rating' },
      { value: '0 → 1', label: 'Strategy & Scoping' },
    ],
    tags: ['0→1 Strategy', 'Ethical AI Boundaries', 'User Research', 'Figma Interactive V1'],
    websiteUrl: 'https://afterlife-club.github.io/afterlife-site/',
    websiteLabel: 'afterlife-club.github.io',
    isLive: true,
    links: [
      { label: 'Interactive Prototype', url: 'https://figma.com/@kelseylin', category: 'Figma V1' },
      { label: 'Product PRD Spec', url: 'https://notion.so/kelseylin/afterlife-prd', category: 'Product Blueprint' },
      { label: 'Live Platform Demo', url: 'https://afterlife-club.github.io/afterlife-site/', category: 'Production' },
    ],
    detailedBreakdown: {
      context:
        'Most traditional legacy planning tools see high drop-off because thinking about death brings up heavy emotions. We built Afterlife Club as a warm, comforting space where people can naturally preserve memories, record voice reflections, and leave meaningful letters for their families.',
      bulletPoints: [
        'Led product strategy from initial concept through user journey maps and sprint roadmaps across design, engineering, and legal.',
        'Interviewed over 25 users to understand emotional friction points, leading the strategic shift to daily life storytelling that raised task completion to 88%.',
        'Created ethical boundaries for our generative AI features by intentionally avoiding voice cloning, maintaining a 92% user trust rating.',
        'Designed interactive prototypes in Figma and organized weekly sprint cycles to keep our cross-functional team aligned and moving quickly.',
      ],
      technicalStack: ['Figma V1', 'Ethical AI PRD', 'User Journey Mapping', 'Agile Sprints', 'Next.js Arch'],
    },
  },
  {
    id: 'warmilu',
    chapter: '02',
    codeTag: 'thermal.flow',
    subTag: 'ref.core',
    title: 'Warmilu',
    subtitle: 'Non-Electric Neonatal Medical Warming Technology',
    role: 'Product Management Intern',
    period: '2026',
    position3D: [-1.2, 0.15, 0.15],
    camPos: [-0.9, 0.25, 2.0],
    lookAt: [-1.15, 0.15, 0.1],
    accentColor: '#0044FF',
    glowColor: 'rgba(0, 68, 255, 0.4)',
    story:
      'Warmilu creates non-electric warming blankets to help save preterm infants in clinics without consistent power. I led the complete redesign of our website and customer journey, conducting user research with healthcare workers to clarify the ordering process and increase direct sales by 20%. I also automated our customer intake workflow to route clinician inquiries faster, cutting response times by 40%.',
    metrics: [
      { value: '+20%', label: 'Direct Sale Conversion' },
      { value: '-40%', label: 'Internal Triage Time' },
      { value: '+18%', label: 'Qualified Inquiries' },
    ],
    tags: ['Medical Device UX', 'Conversion Funnel', 'Agile Sprints', 'A/B Multivariate Testing'],
    websiteUrl: 'https://warmilu.com',
    websiteLabel: 'warmilu.com',
    isLive: true,
    links: [
      { label: 'Clinical Intake Funnel', url: 'https://warmilu.com', category: 'Live Deployment' },
      { label: 'Design System & UX Spec', url: 'https://figma.com/@kelseylin', category: 'Figma Library' },
      { label: 'Impact Case Study', url: 'https://warmilu.com/impact', category: 'Field Research' },
    ],
    detailedBreakdown: {
      context:
        'Warmilu creates phase-change medical blankets that keep newborn infants warm in clinics where electricity is unreliable. However, their earlier website made it difficult for hospital buyers and donors to find the right information or complete purchases.',
      bulletPoints: [
        'Researched and redesigned the full website experience in Figma and Squarespace to help doctors and relief workers easily understand our warming technology.',
        'Built a simplified procurement workflow that helped hospital buyers place orders directly, lifting sales conversion by 20%.',
        'Reorganized customer intake forms with smart routing, reducing team triage time by 40% and boosting qualified inquiries by 18%.',
        'Ran iterative A/B tests on pricing calculators and donation options to identify which layouts communicated impact most clearly.',
      ],
      technicalStack: ['Squarespace Production', 'Figma UX Overhaul', 'A/B Multivariate Testing', 'Intake Pipelines'],
    },
  },
  {
    id: 'luxshare',
    chapter: '03',
    codeTag: 'telemetry.qa',
    subTag: 'scale:1.52',
    title: 'Luxshare Precision',
    subtitle: 'Hardware-Software Manufacturing Telemetry Integration',
    role: 'Product Management Intern · Hardware-Software Telemetry',
    period: '2025',
    position3D: [1.15, -0.85, 0.35],
    camPos: [0.95, -0.75, 1.9],
    lookAt: [1.1, -0.8, 0.3],
    accentColor: '#FFAA00',
    glowColor: 'rgba(255, 170, 0, 0.4)',
    story:
      'Working alongside engineering teams on high-precision electronics and EV production lines, I wrote clear product specifications and quality inspection workflows based on conversations with 15+ team leads. By standardizing testing checklists across 200 technical audits, we brought production accuracy to 98% and reduced training mistakes by 30%. I also automated data dashboards in Python and Excel to help supervisors catch delays early.',
    metrics: [
      { value: '98%', label: 'Production Accuracy' },
      { value: '-30%', label: 'Operator Training Errors' },
      { value: '1,000+', label: 'Daily Tasks Automated' },
    ],
    tags: ['Hardware-Software Integration', 'Python Telemetry', 'PRD Blueprints', 'Manufacturing QA'],
    websiteUrl: 'https://www.luxshare-ict.com',
    websiteLabel: 'luxshare-ict.com',
    isLive: true,
    links: [
      { label: 'Telemetry Python Architecture', url: 'https://github.com/kelseylin', category: 'Codebase' },
      { label: 'Hardware-Software PRD', url: 'https://notion.so/kelseylin/luxshare-prd', category: 'PRD Specifications' },
      { label: 'QA Protocol Documentation', url: 'https://notion.so/kelseylin/qa-audit', category: 'Technical Audit' },
    ],
    detailedBreakdown: {
      context:
        'Manufacturing high-end electronics and EV components requires exact coordination between automated software tests, optical cameras, and technicians on the assembly line. Misaligned documentation often leads to production delays and operator confusion.',
      bulletPoints: [
        'Interviewed 15+ firmware engineers, line supervisors, and quality managers to write unified product requirement documents (PRDs) and operational workflows.',
        'Standardized inspection protocols across more than 200 audits, helping teams reach 98% line accuracy and cutting training mistakes by 30%.',
        'Developed automated Python and Excel dashboards tracking line bottlenecks in real time, reducing daily rescheduling by 18% across 1,000+ operations.',
        'Bridged technical communication between bilingual engineering teams and floor technicians to keep production running smoothly.',
      ],
      technicalStack: ['Python Telemetry', 'PRD Specifications', 'Excel Automation', 'Hardware-Software QA'],
    },
  },
  {
    id: 'somaseek',
    chapter: '04',
    codeTag: 'embodied.ai',
    subTag: '647.7468',
    title: 'SomaSeek',
    subtitle: 'Multi-Robot Embodied AI & Interactive Robotics Platform',
    role: 'Product Manager · Embodied Robotics & AI',
    period: '2025 – 2026',
    position3D: [0.85, 0.45, -0.2],
    camPos: [0.65, 0.45, 2.0],
    lookAt: [0.8, 0.4, -0.15],
    accentColor: '#FF2A55',
    glowColor: 'rgba(255, 42, 85, 0.4)',
    story:
      'At SomaSeek, I worked on embodied robotics and education tools, designing prompt frameworks and evaluation rubrics that prevented AI hallucinations and increased pilot classroom adoption by 40%. We showcased the platform live to 1.5 million viewers at the China Big Data Expo 2025, validating interactive multi-robot learning systems at scale.',
    metrics: [
      { value: '1.5M+', label: 'Expo Live Audience' },
      { value: '+40%', label: 'Pilot Adoption Gain' },
      { value: '95%+', label: 'Educator Trust' },
    ],
    tags: ['LLM Prompt Grounding', 'Responsible AI', 'Multi-Robot Systems', 'Classroom Pilot UX'],
    links: [
      { label: 'China Big Data Expo Keynote', url: 'https://youtube.com', category: '1.5M+ Live Demo' },
      { label: 'LLM Prompt Rubric Architecture', url: 'https://github.com/kelseylin', category: 'Responsible AI' },
    ],
    detailedBreakdown: {
      context:
        'Using large language models to orchestrate and evaluate physical robotics activities requires precise, grounded feedback without errors or hallucinations across diverse classroom pilot environments.',
      bulletPoints: [
        'Designed structured prompts and few-shot evaluation rubrics for robotics tasks, eliminating hallucinations and increasing pilot adoption by 40%.',
        'Demonstrated the AI platform live in front of 1.5 million viewers at the China Big Data Expo 2025 while keeping educator trust above 95%.',
        'Streamlined development sprints with clear progress tracking, reducing delivery turnaround by 25%.',
        'Led user feedback loops with educators and students during pilot deployments, translating interactive physical robotics friction points into refined system prompts.',
      ],
      technicalStack: ['LLM Prompt Grounding', 'Few-Shot Evaluation', 'Responsible AI', 'Cross-Functional Agile'],
    },
  },
];
