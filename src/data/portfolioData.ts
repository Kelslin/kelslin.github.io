import { Project, ProjectVisualType } from './projects';
export type { Project, ProjectVisualType };

export type LensType = 'ventures' | 'leadership' | 'craft';

export interface Waypoint extends Project {
  lens: LensType;
  chapter: string;
  codeTag: string;
  subTag: string;
  subtitle: string;
  position3D: [number, number, number];
  camPos: [number, number, number];
  lookAt: [number, number, number];
  accentColor: string;
  glowColor: string;
  story: string;
  deckSummary?: string;
  narrativeOrigin?: string;
  imageVisual?: string;
  metrics: { value: string; label: string; delta?: string }[];
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

export const LENS_CONFIG: Record<
  LensType,
  {
    id: LensType;
    index: string;
    label: string;
    shortLabel: string;
    description: string;
    tagline: string;
  }
> = {
  ventures: {
    id: 'ventures',
    index: '01',
    label: 'Ventures & Products',
    shortLabel: 'Ventures',
    description: '0→1 Products, Medical Devices & Industrial Telemetry',
    tagline: 'Physical + Digital Systems',
  },
  leadership: {
    id: 'leadership',
    index: '02',
    label: 'Leadership',
    shortLabel: 'Leadership',
    description: 'Fellowships, Student Ventures & Community Stewardship',
    tagline: 'Campus & Community Impact',
  },
  craft: {
    id: 'craft',
    index: '03',
    label: 'Craft & Disciplines',
    shortLabel: 'Craft & Passions',
    description: 'Classical Violin, Miniature Wearable Sculptures & Grounding',
    tagline: 'Tactile Artistry & Routine',
  },
};

export const PORTFOLIO_WAYPOINTS: Waypoint[] = [
  // ==========================================
  // LENS 01 // VENTURES & PRODUCTS
  // ==========================================
  {
    id: 'afterlife',
    slug: 'afterlife-club',
    visualType: 'wireframe',
    statusBadge: 'BETA',
    specimenCode: '01 / AC',
    images: ['/visuals/logos/afterlife.png'],
    lens: 'ventures',
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
    accentColor: '#FF6600',
    glowColor: 'rgba(255, 102, 0, 0.20)',
    imageVisual: '/visuals/logos/afterlife.png',
    summary:
      'An AI memory preservation and digital legacy platform that transforms end-of-life planning into daily life celebration—deliberately built without artificial voice cloning to safeguard family trust.',
    deckSummary:
      'An AI memory preservation and digital legacy platform that transforms end-of-life planning into daily life celebration—deliberately built without artificial voice cloning to safeguard family trust.',
    story:
      'When we talked with people about end-of-life planning, facing mortality directly felt overwhelming and emotionally draining. We reframed the product around daily memory journaling and life stories instead, raising task completion to 88% while enforcing strict ethical boundaries without voice cloning to ensure safety and comfort.',
    narrativeOrigin:
      'Rooted in my family annual portrait tradition—finding ways to keep loved ones feeling close across oceans.',
    metrics: [
      { value: '88%', label: 'Task Completion', delta: '+42%' },
      { value: '92%', label: 'User Trust Rating', delta: 'High Confidence' },
      { value: '0 → 1', label: 'Venture & PRD', delta: 'Shipped' },
    ],
    tags: ['Digital Legacy', 'Zero Voice Cloning', 'Field Interviews', 'Figma Interactive V1'],
    websiteUrl: 'https://afterlife-club.github.io/afterlife-site/',
    websiteLabel: 'Afterlife Club Website',
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
    slug: 'warmilu-neonatal',
    visualType: 'liuli',
    statusBadge: 'CLINICAL',
    specimenCode: '02 / WM',
    images: ['/visuals/logos/warmilu.png'],
    lens: 'ventures',
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
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.20)',
    imageVisual: '/visuals/logos/warmilu.png',
    summary:
      'Engineered digital procurement and clinician intake workflows for non-electric phase-change medical blankets saving preterm infants in resource-constrained clinics without reliable electricity.',
    deckSummary:
      'Engineered digital procurement and clinician intake workflows for non-electric phase-change medical blankets saving preterm infants in resource-constrained clinics without reliable electricity.',
    story:
      'Warmilu creates non-electric warming blankets to prevent infant hypothermia in resource-constrained clinics. I led the complete redesign of our customer intake workflows and direct sales journey, increasing orders by 20% and cutting clinician triage response time by 40%.',
    metrics: [
      { value: '+20%', label: 'Direct Sale Conversion', delta: 'Revenue' },
      { value: '-40%', label: 'Internal Triage Time', delta: 'Efficiency' },
      { value: '+18%', label: 'Qualified Inquiries', delta: 'Pipelines' },
    ],
    tags: ['Medical Phase-Change', 'Non-Electric Heating', 'Clinician Triage', 'A/B Testing'],
    websiteUrl: 'https://warmilu.com',
    websiteLabel: 'Warmilu Website',
    isLive: true,
    links: [
      { label: 'Warmilu Welcome Announcement', url: 'https://www.facebook.com/Warmilu/posts/please-join-us-in-welcoming-kelsey-lin-to-the-warmilu-summer-2026-internship-tea/1639424828161830/', category: 'Team News' },
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
    slug: 'luxshare-ict-ev',
    visualType: 'telemetry',
    statusBadge: 'DEPLOYED',
    specimenCode: '03 / LX',
    images: ['/visuals/logos/luxshare.png'],
    lens: 'ventures',
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
    glowColor: 'rgba(255, 170, 0, 0.18)',
    imageVisual: '/visuals/logos/luxshare.png',
    summary:
      'Standardized hardware-software telemetry and automated optical QA protocols across EV electronics manufacturing lines, auditing 200 checkpoints to eliminate assembly bottlenecks.',
    deckSummary:
      'Standardized hardware-software telemetry and automated optical QA protocols across EV electronics manufacturing lines, auditing 200 checkpoints to eliminate assembly bottlenecks.',
    story:
      'Working on high-precision EV electronics lines, I unified telemetry specifications and inspection checklists across 200 technical audits, achieving 98% line accuracy and reducing operator training errors by 30% through real-time Python and Excel monitoring.',
    metrics: [
      { value: '98%', label: 'Production Accuracy', delta: 'ISO QA' },
      { value: '-30%', label: 'Operator Training Errors', delta: 'Standardized' },
      { value: '1,000+', label: 'Daily Tasks Automated', delta: 'High Scale' },
    ],
    tags: ['Hardware-Software QA', 'Python Telemetry', 'EV Assembly Lines', 'Optical Inspection'],
    websiteUrl: 'https://www.luxshare-ict.com',
    websiteLabel: 'Luxshare ICT Website',
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
    slug: 'somaseek-robotics',
    visualType: 'telemetry',
    statusBadge: 'PILOT',
    specimenCode: '04 / SS',
    images: [],
    lens: 'ventures',
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
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    summary:
      'Designed hallucination-free prompt grounding and few-shot evaluation rubrics for multi-robot embodied AI education, validated live before 1.5M viewers at the China Big Data Expo.',
    deckSummary:
      'Designed hallucination-free prompt grounding and few-shot evaluation rubrics for multi-robot embodied AI education, validated live before 1.5M viewers at the China Big Data Expo.',
    story:
      'At SomaSeek, I designed structured prompt frameworks and evaluation rubrics for physical multi-robot interactions, eliminating AI hallucinations and boosting classroom pilot adoption by 40% with 95%+ educator trust.',
    metrics: [
      { value: '1.5M+', label: 'Expo Live Audience', delta: 'Broadcast' },
      { value: '+40%', label: 'Pilot Adoption Gain', delta: 'Schools' },
      { value: '95%+', label: 'Educator Trust', delta: 'Validation' },
    ],
    tags: ['Embodied Robotics', 'Prompt Grounding', 'Responsible AI', 'Classroom Pilot UX'],
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
  {
    id: 'portrait_project',
    slug: 'captured-moments',
    visualType: 'contact-sheet',
    statusBadge: 'EXHIBITION',
    specimenCode: '05 / CM',
    images: [
      '/visuals/rich_collins_exhibition.jpg',
      '/visuals/portrait_project.jpg',
      '/visuals/rich_collins_poster.jpg',
    ],
    lens: 'ventures',
    chapter: '05',
    codeTag: 'fellowship.arts',
    subTag: 'brandeis.cast',
    title: 'Captured Moments: Through The Eyes Of Our Youth',
    subtitle: 'Richard Collins Fellowship · Brandeis Arts Festival & Chesterbrook Community',
    role: 'Richard Collins Fellow & Co-Founder',
    period: '2024 – Present',
    position3D: [-0.8, -0.2, 0.4],
    camPos: [-0.6, 0.0, 2.1],
    lookAt: [-0.75, -0.15, 0.35],
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    imageVisual: '/visuals/rich_collins_exhibition.jpg',
    summary:
      'Co-founded after-school photography workshops teaching camera mechanics and visual self-expression to youth at Chesterbrook Community Foundation, culminating in a featured public exhibition at the Brandeis University Leonard Bernstein Festival of the Creative Arts.',
    deckSummary:
      'Co-founded after-school photography workshops teaching camera mechanics and visual self-expression to youth at Chesterbrook Community Foundation, culminating in a featured public exhibition at the Brandeis University Leonard Bernstein Festival of the Creative Arts.',
    story:
      'As a Richard Collins Fellow in collaboration with Efosa Ologbosere and the Chesterbrook Community Foundation, I initiated this project to share the magic of photography with youth. Over weekly sessions, we taught students camera settings and led neighborhood photo walks, culminating in a public exhibition at the Brandeis University Leonard Bernstein Festival of the Creative Arts featuring their personal perspectives.',
    narrativeOrigin:
      'Drawn to photography in elementary school for its power to convey personal emotion without words—now offering young students a space to tell their stories through their own lens.',
    metrics: [
      { value: '2nd Year', label: 'Festival Feature', delta: 'Annual' },
      { value: '100%', label: 'Youth-Curated Art', delta: 'Student Led' },
      { value: 'Slosberg', label: 'Lobby Exhibition', delta: 'Brandeis CAST' },
    ],
    tags: ['Richard Collins Fellowship', 'Youth Photography', 'Chesterbrook Foundation', 'Brandeis Arts Festival'],
    websiteUrl: 'https://www.brandeis.edu/arts/festival/festival-features.html',
    websiteLabel: 'Brandeis Festival Feature',
    isLive: true,
    links: [
      { label: 'Brandeis Festival Feature', url: 'https://www.brandeis.edu/arts/festival/festival-features.html', category: 'University Exhibition' },
      { label: 'View Research Poster', url: '/visuals/rich_collins_poster.jpg', category: 'Project Spec' },
    ],
    detailedBreakdown: {
      context:
        'Chesterbrook Community Foundation empowers children and teens living in the Chesterbrook Gardens public housing community in Waltham, MA through mentoring and enrichment. Partnering with Brandeis University CAST and the Richard Collins Fellowship, we created a dedicated photography program for youth to document their daily lives, families, and neighborhood.',
      bulletPoints: [
        'Co-founded and led weekly after-school photography workshops teaching youth camera mechanics, framing, and creative self-expression.',
        'Guided students on neighborhood photo walks, fostering meaningful relationships and artistic confidence within the community.',
        'Curated and mounted a physical exhibition featuring youth photography in the Slosberg Lobby during the 2026 Brandeis Leonard Bernstein Festival of the Creative Arts.',
        'Produced archival research posters and established sustainable partnership pipelines between local colleges and Chesterbrook.',
      ],
      technicalStack: ['DSLR & 35mm Cameras', 'Archival Printing', 'Community Mentorship', 'Brandeis CAST'],
    },
  },
  // ==========================================
  // LENS 02 // LEADERSHIP & COMMUNITY
  // ==========================================
  // LENS 02 // LEADERSHIP & CAMPUS INITIATIVES
  // ==========================================
  {
    id: 'product_motion',
    slug: 'product-motion',
    visualType: 'telemetry',
    statusBadge: 'ACTIVE',
    specimenCode: 'PM',
    images: ['/visuals/logos/product_motion.png'],
    lens: 'leadership',
    chapter: '01',
    codeTag: 'pm.guild',
    subTag: 'vp.motion',
    title: 'Product Motion',
    subtitle: 'Undergraduate Product Management Guild · University of Michigan',
    role: 'Vice President',
    period: 'Jan 2026 – Present',
    position3D: [0.7, 0.3, 0.3],
    camPos: [0.55, 0.3, 2.0],
    lookAt: [0.65, 0.25, 0.25],
    accentColor: '#FFAA00',
    glowColor: 'rgba(255, 170, 0, 0.18)',
    imageVisual: '/visuals/logos/product_motion.png',
    summary:
      'Directing Michigan’s premier undergraduate product management guild. Leading end-to-end strategy for PM case competitions, sprint curricula, and industry portfolio teardowns to open accessible product pathways for students across disciplines.',
    deckSummary:
      'Directing Michigan’s premier undergraduate product management guild. Leading end-to-end strategy for PM case competitions, sprint curricula, and industry portfolio teardowns to open accessible product pathways for students across disciplines.',
    story:
      'As VP of Product Motion, I lead our executive board in architecting hands-on product sprints, case competitions, and interview preparation tracks that bridge academic coursework with real-world product management execution.',
    metrics: [],
    tags: ['Product Motion VP', 'PM Case Sprints', 'Curriculum Design', 'Student Guild'],
    websiteUrl: 'https://www.productmotion.org/',
    websiteLabel: 'productmotion.org',
    isLive: true,
    links: [
      { label: 'Product Motion Website', url: 'https://www.productmotion.org/', category: 'Student Org' },
    ],
    detailedBreakdown: {
      context:
        'Breaking into product management is traditionally opaque and competitive. Product Motion provides hands-on product sprints, curriculum tracks, and mentorship to demystify technical PM careers for students from non-traditional backgrounds.',
      bulletPoints: [
        'Directed organization strategy, leading weekly executive meetings and coordinating student case competitions.',
        'Designed and facilitated practical PM workshops covering user story mapping, metrics definition, and technical roadmapping.',
        'Connected undergraduate students with industry PM mentors across software, healthcare, and robotics.',
      ],
      technicalStack: ['Product Sprints', 'Roadmap Workshops', 'Case Competitions', 'Student Guild Leadership'],
    },
  },
  {
    id: 'cfe_advising',
    slug: 'cfe-advising',
    visualType: 'specimen',
    statusBadge: 'ADVISING',
    specimenCode: 'CFE',
    images: ['/visuals/logos/entr_minor.png'],
    lens: 'leadership',
    chapter: '02',
    codeTag: 'cfe.advising',
    subTag: 'peer.advisor',
    title: 'Center for Entrepreneurship (CFE)',
    subtitle: 'CFE Entrepreneurship Minor Peer Advising · UMich College of Engineering',
    role: 'Peer Advisor · Entrepreneurship Minor',
    period: 'Sep 2026 – Present',
    position3D: [0.5, 0.1, 0.2],
    camPos: [0.4, 0.2, 1.9],
    lookAt: [0.45, 0.1, 0.15],
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    imageVisual: '/visuals/logos/entr_minor.png',
    summary:
      'Appointed peer advisor guiding undergraduate founders and engineers across campus through venture capstones, grant navigation, and zero-to-one business hypotheses at the Center for Entrepreneurship.',
    deckSummary:
      'Appointed peer advisor guiding undergraduate founders and engineers across campus through venture capstones, grant navigation, and zero-to-one business hypotheses at the Center for Entrepreneurship.',
    story:
      'At the Center for Entrepreneurship (CFE), I provide one-on-one academic and venture advising for students pursuing the Entrepreneurship Minor, helping them select capstones, test market hypotheses, and secure campus startup resources.',
    metrics: [],
    tags: ['CFE Peer Advisor', 'Entrepreneurship Minor', 'Venture Capstones', 'Founder Office Hours'],
    websiteUrl: 'https://ent-minor.umich.edu/advising/',
    websiteLabel: 'ent-minor.umich.edu',
    isLive: true,
    links: [
      { label: 'CFE Advising Directory', url: 'https://ent-minor.umich.edu/advising/', category: 'U-M Advising' },
    ],
    detailedBreakdown: {
      context:
        'The Entrepreneurship Minor at Michigan unites students across Engineering, LSA, Ross, and Art & Design. Peer advisors serve as the primary bridge helping students tailor courses and incubate startup capstones.',
      bulletPoints: [
        'Held weekly advising office hours, mentoring over 80 prospective and declared student founders on venture capstones.',
        'Assisted students in applying for campus grants, pitch competitions, and incubator programs.',
        'Collaborated with CFE faculty to organize experiential entrepreneurship showcases and community panels.',
      ],
      technicalStack: ['Academic Advising', 'Capstone Roadmaps', 'Founder Office Hours', 'CFE Program Operations'],
    },
  },
  {
    id: 'elp_fellowship',
    slug: 'elp-fellowship',
    visualType: 'contact-sheet',
    statusBadge: 'FELLOW',
    specimenCode: 'ELP',
    images: ['/visuals/logos/cfe.png'],
    lens: 'leadership',
    chapter: '03',
    codeTag: 'elp.cohort2',
    subTag: 'fellow.launch',
    title: 'Entrepreneurial Leadership Program (ELP)',
    subtitle: 'ELP Cohort 2 Fellow · Center for Entrepreneurship',
    role: 'ELP Cohort 2 Fellow',
    period: 'Jan 2026 – Present',
    position3D: [0.6, -0.2, 0.3],
    camPos: [0.5, -0.1, 2.0],
    lookAt: [0.55, -0.2, 0.25],
    accentColor: '#FFAA00',
    glowColor: 'rgba(255, 170, 0, 0.18)',
    imageVisual: '/visuals/logos/cfe.png',
    summary:
      'Selected for the competitive, year-long venture leadership fellowship. Immersion in venture creation, founder masterclasses, and executive problem-solving alongside top builders across the university.',
    deckSummary:
      'Selected for the competitive, year-long venture leadership fellowship. Immersion in venture creation, founder masterclasses, and executive problem-solving alongside top builders across the university.',
    story:
      'As an ELP Cohort 2 Fellow, I participate in rigorous venture leadership immersions, executive roundtables, and collaborative problem-solving treks designed to build resilient 0→1 founders and technology leaders.',
    metrics: [],
    tags: ['ELP Fellowship', 'Venture Immersion', 'Cohort 2', 'Founder Masterclasses'],
    websiteUrl: 'https://cfe.umich.edu/launch/entrepreneurial-leadership-program/entrepreneurial-leadership-program-cohort-2/',
    websiteLabel: 'cfe.umich.edu/elp',
    isLive: true,
    links: [
      { label: 'ELP Cohort 2 Profile', url: 'https://cfe.umich.edu/launch/entrepreneurial-leadership-program/entrepreneurial-leadership-program-cohort-2/', category: 'CFE Leadership' },
    ],
    detailedBreakdown: {
      context:
        'The Entrepreneurial Leadership Program (ELP) is the Center for Entrepreneurship’s flagship, highly selective venture leadership accelerator for top undergraduate entrepreneurs.',
      bulletPoints: [
        'Engaged in intensive leadership development retreats, executive simulations, and cross-functional team building.',
        'Analyzed venture financing, product-market fit dynamics, and ethical technology scaling with guest founders and venture partners.',
        'Applied venture hypotheses directly to real-world venture capstones and Michigan community impact initiatives.',
      ],
      technicalStack: ['Venture Accelerator', 'Executive Simulations', 'Leadership Retreats', 'Venture Finance'],
    },
  },
  {
    id: 'mpowered_career_fair',
    slug: 'mpowered-career-fair',
    visualType: 'specimen',
    statusBadge: 'DIRECTOR',
    specimenCode: 'MP',
    images: ['/visuals/logos/mpowered.png'],
    lens: 'leadership',
    chapter: '04',
    codeTag: 'mpowered.fair',
    subTag: 'director.startup',
    title: 'MPowered Entrepreneurship',
    subtitle: 'Director of Startup Career Fair · University of Michigan',
    role: 'Director of Startup Career Fair',
    period: 'Oct 2025 – Apr 2026',
    position3D: [0.65, -0.3, 0.25],
    camPos: [0.55, -0.2, 1.95],
    lookAt: [0.6, -0.25, 0.2],
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.18)',
    imageVisual: '/visuals/logos/mpowered.png',
    summary:
      'Directed Michigan’s premier annual Startup Career Fair, connecting venture-backed startups and early-stage founders with top engineering, design, and product talent across campus.',
    deckSummary:
      'Directed Michigan’s premier annual Startup Career Fair, connecting venture-backed startups and early-stage founders with top engineering, design, and product talent across campus.',
    story:
      'At MPowered Entrepreneurship, I served as Director of the Startup Career Fair, leading team logistics, employer recruitment, and student attendee outreach to bridge campus builders with high-growth startup ecosystems.',
    metrics: [],
    tags: ['MPowered', 'Startup Career Fair', 'Director', 'Ecosystem Building'],
    websiteUrl: 'https://mpowered.umich.edu/',
    websiteLabel: 'mpowered.umich.edu',
    isLive: true,
    links: [
      { label: 'MPowered Entrepreneurship', url: 'https://mpowered.umich.edu/', category: 'Student Org' },
    ],
    detailedBreakdown: {
      context: 'MPowered is Michigan’s oldest student-run entrepreneurship organization.',
      bulletPoints: [
        'Directed end-to-end planning and logistics for the annual campus Startup Career Fair.',
        'Liaised with founders and recruiting leads from venture-backed startups nationwide.',
        'Facilitated career opportunities for hundreds of multidisciplinary student applicants.',
      ],
      technicalStack: ['Event Operations', 'Sponsor Relations', 'Team Leadership'],
    },
  },
  {
    id: 'si201_ia',
    slug: 'si201-ia',
    visualType: 'specimen',
    statusBadge: 'INSTRUCTION',
    specimenCode: 'SI',
    images: ['/visuals/logos/umsi.png'],
    lens: 'leadership',
    chapter: '05',
    codeTag: 'umich.si201',
    subTag: 'ia.data',
    title: 'School of Information (UMSI)',
    subtitle: 'Instructional Assistant (IA) · SI 201: Data Manipulation',
    role: 'Instructional Assistant (IA) · SI 201',
    period: 'Jan 2026 – Present',
    position3D: [0.75, -0.35, 0.2],
    camPos: [0.65, -0.25, 1.9],
    lookAt: [0.7, -0.3, 0.15],
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    imageVisual: '/visuals/logos/umsi.png',
    summary:
      'Teaching and mentoring students in computational data manipulation, Python architecture, RESTful API integration, and structured data handling at the University of Michigan School of Information.',
    deckSummary:
      'Teaching and mentoring students in computational data manipulation, Python architecture, RESTful API integration, and structured data handling at the University of Michigan School of Information.',
    story:
      'As an Instructional Assistant for SI 201, I facilitate lab sections and office hours, breaking down complex programming concepts in Python, JSON/APIs, and relational databases for students embarking on their technical journeys.',
    metrics: [],
    tags: ['SI 201', 'Instructional Assistant', 'Python', 'Data Manipulation', 'UMSI'],
    websiteUrl: 'https://www.si.umich.edu/',
    websiteLabel: 'si.umich.edu',
    isLive: true,
    links: [
      { label: 'UMSI SI 201', url: 'https://www.si.umich.edu/', category: 'Academic' },
    ],
    detailedBreakdown: {
      context: 'SI 201 introduces foundational programming and data manipulation techniques.',
      bulletPoints: [
        'Lead lab discussions and weekly technical office hours for undergraduate students.',
        'Guide students through Python debugging, API queries, and structured data extraction.',
        'Collaborate with faculty and instructional team on grading rubrics and assignment feedback.',
      ],
      technicalStack: ['Python', 'APIs', 'JSON', 'Data Manipulation'],
    },
  },
  {
    id: 'campus_tech_consultant',
    slug: 'campus-tech-consultant',
    visualType: 'telemetry',
    statusBadge: 'CONSULTING',
    specimenCode: 'TC',
    images: ['/visuals/logos/its.png'],
    lens: 'leadership',
    chapter: '06',
    codeTag: 'umich.its',
    subTag: 'tech.consultant',
    title: 'University Technology Services',
    subtitle: 'Campus Technology Consultant · University of Michigan',
    role: 'Campus Technology Consultant',
    period: 'Jan 2026 – Present',
    position3D: [0.8, -0.4, 0.15],
    camPos: [0.7, -0.3, 1.85],
    lookAt: [0.75, -0.35, 0.1],
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    imageVisual: '/visuals/logos/its.png',
    summary:
      'Providing hardware, software, and systems consulting across campus computing sites, troubleshooting technical issues and supporting accessible digital infrastructure for university students and faculty.',
    deckSummary:
      'Providing hardware, software, and systems consulting across campus computing sites, troubleshooting technical issues and supporting accessible digital infrastructure for university students and faculty.',
    story:
      'Serving as a Technology Consultant on campus, I diagnose and resolve operating system, network, and application issues, ensuring high-reliability technology access for the university community.',
    metrics: [],
    tags: ['Tech Consultant', 'Systems Support', 'Digital Infrastructure', 'U-M'],
    websiteUrl: 'https://its.umich.edu/',
    websiteLabel: 'its.umich.edu',
    isLive: true,
    links: [
      { label: 'U-M Information and Technology Services', url: 'https://its.umich.edu/', category: 'Campus Tech' },
    ],
    detailedBreakdown: {
      context: 'Campus Technology Services provides front-line technical support across U-M computing environments.',
      bulletPoints: [
        'Troubleshoot hardware, enterprise operating systems, and network connectivity issues.',
        'Advise students and faculty on digital workflow tools, software licenses, and cloud computing.',
        'Maintain and monitor public computing clusters and collaborative technical spaces.',
      ],
      technicalStack: ['Systems Troubleshooting', 'Network Infrastructure', 'Client Support'],
    },
  },

  // ==========================================
  // LENS 03 // CRAFT & DISCIPLINES
  // ==========================================
  {
    id: 'classical_violin',
    slug: 'classical-violin',
    visualType: 'specimen',
    statusBadge: 'DISCIPLINE',
    specimenCode: '01 / VN',
    images: ['/visuals/violin_piano.jpg'],
    lens: 'craft',
    chapter: '01',
    codeTag: 'resonance.hz',
    subTag: 'acoustic:14y',
    title: '14-Year Classical Violin & Piano',
    subtitle: 'Acoustic Resonance, Micro-Timing & Ensemble Harmony',
    role: 'Classical Violinist & Sound Explorer',
    period: '14 Years of Discipline',
    position3D: [-0.6, 0.5, -0.3],
    camPos: [-0.4, 0.4, 2.1],
    lookAt: [-0.55, 0.45, -0.25],
    accentColor: '#FF6600',
    glowColor: 'rgba(255, 102, 0, 0.18)',
    imageVisual: '/visuals/violin_piano.jpg',
    summary:
      '14 years of rigorous classical violin training and acoustic piano study, cultivating acute attention to micro-timing, harmonic nuance, and patient tactile craftsmanship.',
    deckSummary:
      '14 years of rigorous classical violin training and acoustic piano study, cultivating acute attention to micro-timing, harmonic nuance, and patient tactile craftsmanship.',
    story:
      'Music is where I learned patience and listening. Mastering classical violin demands listening across an ensemble, refining physical micro-intonation by millimeters, and understanding that how you hold space is just as crucial as the notes you play.',
    metrics: [
      { value: '14 Yrs', label: 'Continuous Practice', delta: 'Daily' },
      { value: '1,200+', label: 'Rehearsal Hours', delta: 'Mastery' },
      { value: 'Ensemble', label: 'Chamber Repertoire', delta: 'Harmonic' },
    ],
    tags: ['14-Year Practice', 'Acoustic Timbre', 'Micro-Timing Nuance', 'Chamber Harmony'],
    detailedBreakdown: {
      context:
        'Classical performance is an exercise in absolute precision under pressure. The discipline of daily scales, tonal warmth, and ensemble balance directly translates into how I approach product craft and systemic flow.',
      bulletPoints: [
        '14 years of intensive classical violin study, performing solo repertoire, chamber quartets, and symphony orchestras.',
        'Explored acoustic resonance and lo-fi piano arrangements as a tactile creative outlet alongside technical work.',
        'Brought acoustic discipline into user experience design: pacing, cadence, and eliminating dissonance in user flows.',
      ],
      technicalStack: ['Acoustic Violin', 'Steinway Grand Piano', 'Chamber Repertoire', 'Micro-Pacing'],
    },
  },
  {
    id: 'micro_sculpture',
    slug: 'miniature-wearables',
    visualType: 'specimen',
    statusBadge: 'PRECISION',
    specimenCode: '02 / NA',
    images: ['/visuals/nail_art.jpg'],
    lens: 'craft',
    chapter: '02',
    codeTag: 'mineral.gel',
    subTag: 'sculpt:0.1mm',
    title: 'Miniature Wearable Sculptures',
    subtitle: 'Millimeter-Scale Physical Craft & Mineral Chemistry',
    role: 'Miniature Artisan & Sculptural Designer',
    period: '2023 – Present',
    position3D: [0.6, -0.5, 0.2],
    camPos: [0.45, -0.4, 2.0],
    lookAt: [0.55, -0.45, 0.15],
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    imageVisual: '/visuals/nail_art.jpg',
    summary:
      'Handcrafting millimeter-scale wearable sculptures using high-viscosity gels, Japanese chrome pigments, and raw minerals, exploring tactile aesthetics on miniature living canvases.',
    deckSummary:
      'Handcrafting millimeter-scale wearable sculptures using high-viscosity gels, Japanese chrome pigments, and raw minerals, exploring tactile aesthetics on miniature living canvases.',
    story:
      'Miniature nail sculpture is an obsession with extreme detail. Working on a 15mm canvas requires precision brushwork under magnifying light, balancing material viscosity, curing temperatures, and refractive light play.',
    metrics: [
      { value: '80+', label: 'Bespoke Sets', delta: 'Handmade' },
      { value: '0.1mm', label: 'Brush Precision', delta: 'Tactile' },
      { value: 'Hand-Made', label: 'Wearable Sculptures', delta: 'Bespoke' },
    ],
    tags: ['0.1mm Detail Precision', 'Quartz & Gold Leaf', 'High-Viscosity Gels', 'Wearable Sculptures'],
    detailedBreakdown: {
      context:
        'Product design is often intangible pixels on a glass screen. Handcrafting bespoke wearable nail art allows me to touch physical matter, test polymer chemistry, and experiment with luxury three-dimensional forms.',
      bulletPoints: [
        'Formulated custom layering techniques combining magnetic cat-eye pigments, real gold foil, and optical glass gels.',
        'Crafted over 80 custom commissioned sets, custom-fitted to individual nail anatomy with micro-sculpting tools.',
        'Refined acute spatial patience and steady-hand motor discipline that informs high-precision UI micro-interactions.',
      ],
      technicalStack: ['Japanese Gel Formulations', 'Gold Leaf Inlay', '0.1mm Micro-Brushes', 'Tactile Chemistry'],
    },
  },
  {
    id: 'physical_discipline',
    slug: 'physical-discipline',
    visualType: 'specimen',
    statusBadge: 'GROUNDING',
    specimenCode: '03 / PD',
    images: ['/visuals/physical_discipline.jpg'],
    lens: 'craft',
    chapter: '03',
    codeTag: 'biomech.iron',
    subTag: 'cadence:4x',
    title: 'Physical Discipline & Strength',
    subtitle: 'Biomechanical Precision, Progressive Overload & Mental Grounding',
    role: 'Strength Athlete & Mind-Body Grounding',
    period: 'Ongoing Practice',
    position3D: [0.1, 0.6, 0.2],
    camPos: [0.0, 0.5, 2.2],
    lookAt: [0.1, 0.55, 0.15],
    accentColor: '#FFAA00',
    glowColor: 'rgba(255, 170, 0, 0.18)',
    imageVisual: '/visuals/physical_discipline.jpg',
    summary:
      'Grounding mental resilience and daily clarity through dedicated barbell strength training, biomechanical precision, and progressive athletic discipline.',
    deckSummary:
      'Grounding mental resilience and daily clarity through dedicated barbell strength training, biomechanical precision, and progressive athletic discipline.',
    story:
      'Lifting heavy barbells strips away distractions. It teaches honest feedback—gravity does not negotiate. The daily habit of showing up, tracking mechanical leverage, and managing physical recovery keeps me centered in high-stakes environments.',
    metrics: [
      { value: '4x / Wk', label: 'Discipline Cadence', delta: 'Consistency' },
      { value: '100%', label: 'Mental Clarity', delta: 'Focus' },
      { value: 'Biomechanical', label: 'Movement Control', delta: 'Leverage' },
    ],
    tags: ['Kinetic Biomechanics', 'Barbell Strength', 'Progressive Overload', 'Mental Grounding'],
    detailedBreakdown: {
      context:
        'High-paced product cycles and technical problem-solving can easily cause mental exhaustion without physical grounding. Powerlifting and strength training offer an unbending anchor of discipline and physiological clarity.',
      bulletPoints: [
        'Maintain consistent 4-day weekly strength training regimen focusing on compound barbell movements.',
        'Applied principles of progressive overload and data logging to physical health and daily energy management.',
        'Builds physical stamina and unwavering psychological endurance for navigating ambiguous 0→1 challenges.',
      ],
      technicalStack: ['Compound Barbell Lifts', 'Biomechanical Leverage', 'Progressive Overload', 'Recovery Protocol'],
    },
  },
];
