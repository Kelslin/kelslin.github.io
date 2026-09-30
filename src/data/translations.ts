export type Language = 'en' | 'zh' | 'es' | 'fr';

export interface Translations {
  header: {
    works: string;
    about: string;
    index: string;
    contact: string;
    overviewExit: string;
    prev: string;
    next: string;
  };
  hero: {
    name: string;
    intro: string;
  };
  constellation: {
    title: string;
    subtitle: string;
    hint: string;
  };
  lenses: {
    ventures: string;
    leadership: string;
    craft: string;
  };
  macro: {
    readFullCase: string;
    dragToRotate: string;
    overviewBtn: string;
    visitWebsite: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    manifesto: string;
    location: string;
    story1Title: string;
    story1Text: string;
    story2Title: string;
    story2Text: string;
    story3Title: string;
    story3Text: string;
    moreTitle: string;
    moreText: string;
    getInTouch: string;
    essays: string;
    close: string;
  };
  index: {
    badge: string;
    title: string;
    close: string;
    experienceSection: string;
    educationSection: string;
    skillsSection: string;
    connectSection: string;
    viewProject: string;
  };
  projects: Record<
    string,
    {
      title: string;
      subtitle: string;
      role: string;
      period: string;
      story: string;
      deckSummary?: string;
      context: string;
      bulletPoints: string[];
    }
  >;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    header: {
      works: 'WORKS',
      about: 'ABOUT',
      index: 'INDEX',
      contact: 'CONTACT ↗',
      overviewExit: 'Overview',
      prev: 'Prev',
      next: 'Next',
    },
    hero: {
      name: 'Kelsey Lin',
      intro:
        'Product manager and 0→1 builder at the University of Michigan, focused on turning complex systems into intuitive, human-centered products.',
    },
    constellation: {
      title: 'Lens Perspectives',
      subtitle: 'Products & Leadership',
      hint: 'Click or drag flower to explore',
    },
    lenses: {
      ventures: 'Ventures',
      leadership: 'Leadership',
      craft: 'Craft',
    },
    macro: {
      readFullCase: 'View Case Spec',
      dragToRotate: 'Drag horizontally to rotate petals · Click to explore',
      overviewBtn: 'Exit to Overview',
      visitWebsite: 'Visit Live Site ↗',
    },
    about: {
      badge: 'ABOUT ME',
      title: 'Building products with empathy,',
      subtitle: 'technical care, and curiosity.',
      manifesto:
        'To me, great products come from paying close attention to people—not just measuring clicks, but understanding what people truly feel and need.',
      location: 'KELSEY LIN · UNIVERSITY OF MICHIGAN',
      story1Title: 'Learning to listen and observe',
      story1Text:
        'When I was 13, I moved from China to the United States entirely on my own, stepping into a completely new environment, culture, and lifestyle. Being immersed in unfamiliar territory where I had to navigate situations I had never experienced before taught me to become exceptionally adaptable and observant—learning to read room dynamics, unspoken emotional cues, and human intent long before words were shared. That formative journey built my resilience in high-ambiguity spaces, and it directly shapes my work in product management today: uncovering latent user needs, rapidly adapting across complex technical domains, and designing with genuine empathy.',
      story2Title: 'Turning ideas into reality',
      story2Text:
        'I love taking complex, ambiguous problems and turning them into clear, reliable systems. Whether that meant co-founding a digital memory platform with Afterlife Club, streamlining telemetry dashboards across assembly lines at Luxshare, or creating prompt guardrails for robotics at SomaSeek, I focus on helping teams move fast while keeping people at the center.',
      story3Title: 'Craft, discipline, and community',
      story3Text:
        'Playing classical violin for 14 years taught me patience, micro-timing, and how tiny details change the entire harmony. Outside of technology, I also started a community project connecting student photographers with local immigrant families to help them capture meaningful family portraits and feel welcomed.',
      moreTitle: 'A little more about me',
      moreText:
        'Outside of product roadmaps and technical specs, you can usually find me practicing the violin, designing detailed press-on nail art, or weightlifting at the gym. These everyday routines keep me grounded, creative, and focused on putting genuine care into everything I make.',
      getInTouch: 'Get in Touch ↗',
      essays: 'Essays & Reflections ↗',
      close: 'Close',
    },
    index: {
      badge: 'QUICK INDEX',
      title: 'Executive Catalog',
      close: 'Close',
      experienceSection: 'Selected Work Experience',
      educationSection: 'Education & Honors',
      skillsSection: 'Core Capabilities',
      connectSection: 'Direct Channels',
      viewProject: 'View Project',
    },
    projects: {
      afterlife: {
        title: 'Afterlife Club',
        subtitle: 'AI Life Journaling & Digital Legacy Platform',
        role: 'Co-Founder & Lead Product Manager',
        period: '2026 – Present',
        deckSummary:
          'An AI memory preservation and digital legacy platform that transforms end-of-life planning into daily life celebration—deliberately built without artificial voice cloning to safeguard family trust.',
        story:
          'When we talked with people about end-of-life planning, facing mortality directly felt overwhelming and emotionally draining. We reframed the product around daily memory journaling and life stories instead, raising task completion to 88% while enforcing strict ethical boundaries without voice cloning to ensure safety and comfort.',
        context:
          'Most traditional legacy planning tools see high drop-off because thinking about death brings up heavy emotions. We built Afterlife Club as a warm, comforting space where people can naturally preserve memories, record voice reflections, and leave meaningful letters for their families.',
        bulletPoints: [
          'Led product strategy from initial concept through user journey maps and sprint roadmaps across design, engineering, and legal.',
          'Interviewed over 25 users to understand emotional friction points, leading the strategic shift to daily life storytelling that raised task completion to 88%.',
          'Created ethical boundaries for our generative AI features by intentionally avoiding voice cloning, maintaining a 92% user trust rating.',
          'Designed interactive prototypes in Figma and organized weekly sprint cycles to keep our cross-functional team aligned and moving quickly.',
        ],
      },
      warmilu: {
        title: 'Warmilu',
        subtitle: 'Non-Electric Neonatal Medical Warming Technology',
        role: 'Product Management Intern',
        period: '2026',
        deckSummary:
          'Engineered digital procurement and clinician intake workflows for non-electric phase-change medical blankets saving preterm infants in resource-constrained clinics without reliable electricity.',
        story:
          'Warmilu creates non-electric warming blankets to prevent infant hypothermia in resource-constrained clinics. I led the complete redesign of our customer intake workflows and direct sales journey, increasing orders by 20% and cutting clinician triage response time by 40%.',
        context:
          'Warmilu creates phase-change medical blankets that keep newborn infants warm in clinics where electricity is unreliable. However, their earlier website made it difficult for hospital buyers and donors to find the right information or complete purchases.',
        bulletPoints: [
          'Researched and redesigned the full website experience in Figma and Squarespace to help doctors and relief workers easily understand our warming technology.',
          'Built a simplified procurement workflow that helped hospital buyers place orders directly, lifting sales conversion by 20%.',
          'Reorganized customer intake forms with smart routing, reducing team triage time by 40% and boosting qualified inquiries by 18%.',
          'Ran iterative A/B tests on pricing calculators and donation options to identify which layouts communicated impact most clearly.',
        ],
      },
      luxshare: {
        title: 'Luxshare Precision',
        subtitle: 'Hardware-Software Manufacturing Telemetry Integration',
        role: 'Product Management Intern · Hardware-Software Telemetry',
        period: '2025',
        deckSummary:
          'Standardized hardware-software telemetry and automated optical QA protocols across EV electronics manufacturing lines, auditing 200 checkpoints to eliminate assembly bottlenecks.',
        story:
          'Working on high-precision EV electronics lines, I unified telemetry specifications and inspection checklists across 200 technical audits, achieving 98% line accuracy and reducing operator training errors by 30% through real-time Python and Excel monitoring.',
        context:
          'Manufacturing high-end electronics and EV components requires exact coordination between automated software tests, optical cameras, and technicians on the assembly line. Misaligned documentation often leads to production delays and operator confusion.',
        bulletPoints: [
          'Interviewed 15+ firmware engineers, line supervisors, and quality managers to write unified product requirement documents (PRDs) and operational workflows.',
          'Standardized inspection protocols across more than 200 audits, helping teams reach 98% line accuracy and cutting training mistakes by 30%.',
          'Developed automated Python and Excel dashboards tracking line bottlenecks in real time, reducing daily rescheduling by 18% across 1,000+ operations.',
          'Bridged technical communication between bilingual engineering teams and floor technicians to keep production running smoothly.',
        ],
      },
      somaseek: {
        title: 'SomaSeek',
        subtitle: 'Multi-Robot Embodied AI & Interactive Robotics Platform',
        role: 'Product Manager · Embodied Robotics & AI',
        period: '2025 – 2026',
        deckSummary:
          'Designed hallucination-free prompt grounding and few-shot evaluation rubrics for multi-robot embodied AI education, validated live before 1.5M viewers at the China Big Data Expo.',
        story:
          'At SomaSeek, I designed structured prompt frameworks and evaluation rubrics for physical multi-robot interactions, eliminating AI hallucinations and boosting classroom pilot adoption by 40% with 95%+ educator trust.',
        context:
          'Using large language models to orchestrate and evaluate physical robotics activities requires precise, grounded feedback without errors or hallucinations across diverse classroom pilot environments.',
        bulletPoints: [
          'Designed structured prompts and few-shot evaluation rubrics for robotics tasks, eliminating hallucinations and increasing pilot adoption by 40%.',
          'Demonstrated the AI platform live in front of 1.5 million viewers at the China Big Data Expo 2025 while keeping educator trust above 95%.',
          'Streamlined development sprints with clear progress tracking, reducing delivery turnaround by 25%.',
          'Led user feedback loops with educators and students during pilot deployments, translating interactive physical robotics friction points into refined system prompts.',
        ],
      },
      bestfit: {
        title: 'Best Fit',
        subtitle: 'Freshman Year Hackathon · Fashion Scholarship & Alumni Network',
        role: 'Product Designer & Frontend Developer',
        period: 'Freshman Year',
        deckSummary:
          'Engineered during freshman year to connect prospective students with Fashion Scholarship Fund opportunities and alumni mentors through personalized matchmaking algorithms.',
        story:
          'Developed during a freshman year hackathon, Best Fit bridges the gap between prospective students and competitive fashion scholarships. We built an intuitive matching interface in Figma and CodePen that surfaces tailored opportunities from the Fashion Scholarship Fund and pairs applicants directly with alumni mentors.',
        context:
          'Navigating competitive scholarship applications like the Fashion Scholarship Fund is intimidating for first-year applicants without an existing alumni network. Best Fit was designed to demystify requirements and provide automated mentor matchmaking.',
        bulletPoints: [
          'Designed end-to-end user experience and wireframes in Figma within a high-speed 36-hour hackathon environment.',
          'Engineered responsive frontend components with HTML, CSS, and CodePen interactive prototypes.',
          'Curated scholarship criteria and alumni mentorship directory to help students discover funding tailored to their background.',
        ],
      },
      portrait_project: {
        title: 'Captured Moments: Through The Eyes Of Our Youth',
        subtitle: 'Richard Collins Fellowship · Brandeis Arts Festival & Chesterbrook Community',
        role: 'Richard Collins Fellow & Co-Founder',
        period: '2024 – Present',
        deckSummary:
          'Provided after-school photography lessons to youth at Chesterbrook Community Foundation to learn camera mechanics and express themselves creatively, culminating in an exhibition at the Brandeis University Leonard Bernstein Festival of the Creative Arts.',
        story:
          'As a Richard Collins Fellow in collaboration with Efosa Ologbosere and the Chesterbrook Community Foundation, I initiated this project to share the magic of photography with youth. Over weekly sessions, we taught students camera settings and led neighborhood photo walks, culminating in a public exhibition at the Brandeis University Leonard Bernstein Festival of the Creative Arts featuring their personal perspectives.',
        context:
          'Chesterbrook Community Foundation empowers children and teens living in the Chesterbrook Gardens public housing community in Waltham, MA through mentoring and enrichment. Partnering with Brandeis University CAST and the Richard Collins Fellowship, we created a dedicated photography program for youth to document their daily lives, families, and neighborhood.',
        bulletPoints: [
          'Co-founded and led weekly after-school photography workshops teaching youth camera mechanics, framing, and creative self-expression.',
          'Guided students on neighborhood photo walks, fostering meaningful relationships and artistic confidence within the community.',
          'Curated and mounted a physical exhibition featuring youth photography in the Slosberg Lobby during the 2026 Brandeis Leonard Bernstein Festival of the Creative Arts.',
          'Produced archival research posters and established sustainable partnership pipelines between local colleges and Chesterbrook.',
        ],
      },
      campus_leadership: {
        title: 'Product Motion & CFE Advising',
        subtitle: 'VP of Product Motion · CFE Peer Advisor · ELP Cohort 2 Fellow',
        role: 'VP of Product Motion · CFE Peer Advisor · ELP Fellow',
        period: '2024 – Present',
        deckSummary:
          'Championing student venture building and opening accessible product management pathways as Vice President of Product Motion, Entrepreneurial Leadership Program (ELP) Cohort 2 Fellow, and CFE Peer Advisor at the University of Michigan.',
        story:
          'Leading Product Motion and advising at the Center for Entrepreneurship (CFE), I facilitate hands-on product sprints, portfolio critiques, and mentorship sessions that demystify technical PM careers for students from non-traditional backgrounds while advancing venture leadership as an ELP Cohort 2 fellow.',
        context:
          'Breaking into product management and entrepreneurship is often opaque, especially for students from diverse academic and cultural backgrounds. Product Motion and the UMich Center for Entrepreneurship provide real-world venture sprints, curriculum pathways, and founder mentorship.',
        bulletPoints: [
          'Elected Vice President of Product Motion, designing hands-on PM case competitions, product sprint roadmaps, and student workshops.',
          'Selected for the competitive Entrepreneurial Leadership Program (ELP) Cohort 2, immersing in high-growth venture creation.',
          'Advise students across campus as an official CFE Entrepreneurship Minor Peer Advisor, guiding venture curriculum, capstones, and career roadmaps.',
          'Organized speaker panels and portfolio review sessions connecting undergrads with product leaders across software, health tech, and hardware.',
        ],
      },
      classical_violin: {
        title: '14-Year Classical Violin & Piano',
        subtitle: 'Acoustic Resonance, Micro-Timing & Ensemble Harmony',
        role: 'Classical Violinist & Sound Explorer',
        period: '14 Years of Discipline',
        deckSummary:
          '14 years of rigorous classical violin training and acoustic piano study, cultivating acute attention to micro-timing, harmonic nuance, and patient tactile craftsmanship.',
        story:
          'Music is where I learned patience and listening. Mastering classical violin demands listening across an ensemble, refining physical micro-intonation by millimeters, and understanding that how you hold space is just as crucial as the notes you play.',
        context:
          'Classical performance is an exercise in absolute precision under pressure. The discipline of daily scales, tonal warmth, and ensemble balance directly translates into how I approach product craft and systemic flow.',
        bulletPoints: [
          '14 years of intensive classical violin study, performing solo repertoire, chamber quartets, and symphony orchestras.',
          'Explored acoustic resonance and lo-fi piano arrangements as a tactile creative outlet alongside technical work.',
          'Brought acoustic discipline into user experience design: pacing, cadence, and eliminating dissonance in user flows.',
        ],
      },
      micro_sculpture: {
        title: 'Miniature Wearable Sculptures',
        subtitle: 'Millimeter-Scale Physical Craft & Mineral Chemistry',
        role: 'Miniature Artisan & Sculptural Designer',
        period: '2023 – Present',
        deckSummary:
          'Handcrafting millimeter-scale wearable sculptures using high-viscosity gels, Japanese chrome pigments, and raw minerals, exploring tactile aesthetics on miniature living canvases.',
        story:
          'Miniature nail sculpture is an obsession with extreme detail. Working on a 15mm canvas requires precision brushwork under magnifying light, balancing material viscosity, curing temperatures, and refractive light play.',
        context:
          'Product design is often intangible pixels on a glass screen. Handcrafting bespoke wearable nail art allows me to touch physical matter, test polymer chemistry, and experiment with luxury three-dimensional forms.',
        bulletPoints: [
          'Formulated custom layering techniques combining magnetic cat-eye pigments, real gold foil, and optical glass gels.',
          'Crafted over 80 custom commissioned sets, custom-fitted to individual nail anatomy with micro-sculpting tools.',
          'Refined acute spatial patience and steady-hand motor discipline that informs high-precision UI micro-interactions.',
        ],
      },
      physical_discipline: {
        title: 'Physical Discipline & Strength',
        subtitle: 'Biomechanical Precision, Progressive Overload & Mental Grounding',
        role: 'Strength Athlete & Mind-Body Grounding',
        period: 'Ongoing Practice',
        deckSummary:
          'Grounding mental resilience and daily clarity through dedicated barbell strength training, biomechanical precision, and progressive athletic discipline.',
        story:
          'Lifting heavy barbells strips away distractions. It teaches honest feedback—gravity does not negotiate. The daily habit of showing up, tracking mechanical leverage, and managing physical recovery keeps me centered in high-stakes environments.',
        context:
          'High-paced product cycles and technical problem-solving can easily cause mental exhaustion without physical grounding. Powerlifting and strength training offer an unbending anchor of discipline and physiological clarity.',
        bulletPoints: [
          'Maintain consistent 4-day weekly strength training regimen focusing on compound barbell movements.',
          'Applied principles of progressive overload and data logging to physical health and daily energy management.',
          'Builds physical stamina and unwavering psychological endurance for navigating ambiguous 0→1 challenges.',
        ],
      },
    },
  },
  zh: {
    header: {
      works: '作品',
      about: '关于我',
      index: '索引',
      contact: '联系 ↗',
      overviewExit: '返回总览',
      prev: '上一篇',
      next: '下一篇',
    },
    hero: {
      name: 'Kelsey Lin',
      intro:
        '密歇根大学产品经理与 0 到 1 架构构建者，专注于将复杂系统转化为符合直觉与人性化的产品体验。',
    },
    constellation: {
      title: '多重视角',
      subtitle: '产品实践与领导力',
      hint: '点击或拖拽琉璃花进行浏览',
    },
    lenses: {
      ventures: '商业项目',
      leadership: '领导力与DEI',
      craft: '匠心纪律',
    },
    macro: {
      readFullCase: '查看项目详述',
      dragToRotate: '左右滑动花瓣切换项目 · 点击深入探索',
      overviewBtn: '返回总览',
      visitWebsite: '访问项目官网 ↗',
    },
    about: {
      badge: '关于我',
      title: '用同理心、严谨技术与好奇心',
      subtitle: '打磨真正打动人心的产品。',
      manifesto:
        '对我而言，优秀的产品源于对人的细致观察——不仅是追踪数据转化，更是真正理解用户的内心渴望与情感诉求。',
      location: 'KELSEY LIN · 密歇根大学',
      story1Title: '学会倾听与敏锐观察',
      story1Text:
        '13岁那年，我独自一人从中国来到美国，置身于一个完全陌生的文化与生活环境中。面对从未经历过的新环境，我必须保持高度的适应力与敏锐的观察力——去读懂他人的肢体语言、微表情与未曾言明的真实感受。这段经历培养了我在面对高度不确定性时的坚韧心态，也深刻塑造了我今天作为产品经理的核心特质：不仅倾听用户口头表达的需求，更善于洞察他们内心的潜意识诉求，在复杂多变的业务场景中迅速适应，打磨出真正体贴入微的产品。',
      story2Title: '将复杂问题化为现实系统',
      story2Text:
        '我热衷于拆解复杂模糊的系统难题。无论是联合创办 Afterlife Club 记忆归档平台、在立讯精密优化千万级产线数据看板，还是在 SomaSeek 为具身机器人构建提示词护栏，我都坚持在推进敏捷交付的同时，始终把人的体验放在核心位置。',
      story3Title: '匠心纪律与社会联结',
      story3Text:
        '14年的小提琴古典演奏经历磨练了我的耐心与细微把控力。在科技之外，我还发起了摄影公益项目，组织学生摄影师为当地移民家庭拍摄全家福，帮助他们在异国他乡感受到社区的温暖与接纳。',
      moreTitle: '工作之外的生活',
      moreText:
        '在产品规划与技术规范之外，你通常会发现我正在练习小提琴、设计手工穿戴甲艺术，或在健身房进行力量训练。这些日常积累让我保持专注、富有创造力，并将对生活的热忱倾注在每一个产品细节中。',
      getInTouch: '与我联系 ↗',
      essays: '深度随笔与反思 ↗',
      close: '关闭',
    },
    index: {
      badge: '快速索引',
      title: '项目与能力目录',
      close: '关闭',
      experienceSection: '精选工作与项目经历',
      educationSection: '教育与学术荣誉',
      skillsSection: '核心专业能力',
      connectSection: '直接联系渠道',
      viewProject: '查看详情',
    },
    projects: {
      afterlife: {
        title: 'Afterlife Club',
        subtitle: 'AI 人生记忆归档与数字遗产平台',
        role: '联合创始人 & 主产品经理',
        period: '2026 – 至今',
        deckSummary:
          '联合创立 AI 个人生命记忆归档平台，将临终规划重构为温暖的日常回忆记录；坚决摒弃拟真声音克隆，捍卫用户家庭信任。',
        story:
          '在与用户探讨生命终末期规划时，我们发现直面死亡令人产生巨大的心理沉重感。我主导产品核心转型，将焦点转向“日常记忆记录与生命故事致敬”，使得原型任务完成率提升至88%。为捍卫用户信任，我制定了坚决不采用AI声音克隆的道德隐私准则。',
        context:
          '传统数字遗产工具因话题过于沉重往往流失率极高。我们将 Afterlife Club 构想为一个温暖治愈的空间，让人们可以轻松记录回忆、留下声音片段并向家人传达深情嘱托。',
        bulletPoints: [
          '主导产品全流程战略，统筹设计、工程研发与法律合规跨部门敏捷冲刺。',
          '深度访谈25+位核心用户，推动以“日常生活叙事”为核心的产品重构，原型任务完成率达88%。',
          '为生成式AI制定严格伦理边界，摒弃拟真声音克隆，用户信任度达92%。',
          '构建高保真 Figma 原型，主导双周敏捷开发节奏，保障产品高效落地。',
        ],
      },
      warmilu: {
        title: 'Warmilu',
        subtitle: '非电动新生儿医疗保暖技术',
        role: '产品管理实习生',
        period: '2026',
        deckSummary:
          '为电力短缺的边远诊所打造非电动相变早产儿医疗保暖设备，全面重构采购体验与咨询分流，加速救援订单交付。',
        story:
          'Warmilu 致力于为电力不稳定的诊所提供非电动相变保暖毯，拯救早产儿生命。我主导了官网及用户采购旅程的全面重构，深入调研医护人员需求，使直接采购转化率提升20%；同时通过自动化客户咨询分流管线，将团队响应时间缩短40%。',
        context:
          'Warmilu 的相变保暖技术可在断电环境下维持婴儿体温，但此前繁杂的网站体验严重阻碍了海外医院采购人员与援助机构获取产品信息与下单。',
        bulletPoints: [
          '在 Figma 与 Squarespace 中全面重构数字化产品体验，使医护工作者能快速理解相变技术与采购方案。',
          '简化医疗机构直采流程，直接销售转化率提升20%。',
          '搭建智能化客户意向分流体系，内部处理时间减少40%，高意向咨询量提升18%。',
          '针对价格计算器和捐赠通道进行多次 A/B 测试，优化信息传达与信任感。',
        ],
      },
      luxshare: {
        title: '立讯精密 (Luxshare)',
        subtitle: '软硬件协同制造遥测系统集成',
        role: '产品管理实习生 · 软硬件遥测',
        period: '2025',
        deckSummary:
          '面向高精度新能源车产线的软硬件遥测监控与光学自动化质检系统，规范200项检测清单消除产线瓶颈。',
        story:
          '深入高精度消费电子与新能源车产线，与15位工程主管协作制定标准产品需求文档(PRD)与质检流程。通过在200次技术审核中规范检测清单，产线准确率提升至98%，作业员培训差错减少30%。',
        context:
          '高端精密制造要求软件自动化测试、工业相机与一线装配技师之间的高度协同，原有文档碎片化导致排期延误与作业差错。',
        bulletPoints: [
          '深度访谈15位固件工程师、产线主管与质量经理，编写统一的 PRD 与作业流规范。',
          '在200多项审核中推行标准化质检方案，产线准确率达98%，培训失误率降低30%。',
          '搭建 Python/Excel 实时遥测数据看板，涵盖1000+项日常工序，排程变更率降低18%。',
          '充当双语研发团队与一线技术人员的技术沟通桥梁，保障产线平稳运行。',
        ],
      },
      somaseek: {
        title: 'SomaSeek',
        subtitle: '多机器人具身智能与交互式教育平台',
        role: '产品经理 · 具身智能与机器人',
        period: '2025 – 2026',
        deckSummary:
          '多机器人具身智能交互平台，构建结构化提示词与少样本评测标准杜绝 AI 幻觉，在中国数博会现场向150万观众演示。',
        story:
          '在 SomaSeek 负责具身智能教育工具产品设计，构建结构化提示词与少样本评测标准，彻底消除 AI 幻觉，试点课堂采用率提升40%；在2025中国数博会向150万在线观众进行现场实机演示。',
        context:
          '利用大语言模型协同与评测实体机器人教学活动，必须在多样化的试点课堂环境中保持输出的高可靠性与严格接地，杜绝幻觉输出。',
        bulletPoints: [
          '设计提示词工程与评测基准，杜绝幻觉输出，试点课堂采用率提升40%。',
          '在中国数博会向150万观众进行实机演示，教育行业信任度达95%。',
          '优化敏捷开发迭代周期，将核心功能交付周期缩短25%。',
          '建立师生实地试点反馈闭环，将实体机器人操作痛点转化为持续优化的系统指令规范。',
        ],
      },
      bestfit: {
        title: 'Best Fit',
        subtitle: '大一黑客松获奖项目 · 时尚奖学金与校友连接网络',
        role: '产品设计师 & 前端开发',
        period: '大一学年',
        deckSummary:
          '在大一黑客松期间设计并开发，通过智能匹配算法帮助跨背景学生精准对接时尚奖学金基金(FSF)与行业校友导师。',
        story:
          '大一时针对奖学金申请门槛高、信息不对称的痛点，我们在黑客松中打造了 Best Fit。通过 Figma 原型与响应式前端开发，为申请者提供清晰的申请指南，并一键对接行业导师。',
        context:
          '对于初入大学的学生而言，竞争激烈的专业奖学金往往缺乏透明的辅导资源。Best Fit 旨在打破信息壁垒，实现导师与奖学金的智能匹配。',
        bulletPoints: [
          '在36小时的高强度黑客松中完成从用户旅程调研到 Figma 全套高保真原型的设计。',
          '利用 HTML5、CSS3 与 CodePen 快速开发出交互式前端原型与筛选匹配算法。',
          '梳理时尚基金评审指标与校友库，助力初次申请者清晰规划申请材料。',
        ],
      },
      portrait_project: {
        title: '镜头里的成长：青少年的视角',
        subtitle: '理查德·柯林斯学者基金 · 布兰迪斯艺术节 & Chesterbrook 社区合作',
        role: '理查德·柯林斯学者 & 项目联合发起人',
        period: '2024 – 至今',
        deckSummary:
          '在 Chesterbrook 社区为当地青少年提供课后摄影教学，指导学生掌握相机拍摄与自我表达，成果在布兰迪斯大学伯恩斯坦艺术节进行实体大厅展览。',
        story:
          '作为理查德·柯林斯学者，我与 Efosa Ologbosere 联合 Chesterbrook 基金会发起该公益项目。我们带领孩子们从基础参数学起，进行社区户外摄影采风，并在布兰迪斯大学伯恩斯坦艺术节上举办专属摄影作品展，让孩子们用自己的眼睛记录并展示真实世界。',
        context:
          'Chesterbrook 基金会致力于通过辅导与素质拓展赋能低收入公共社区的青少年。结合布兰迪斯大学社会变革艺术(CAST)项目与柯林斯学者基金，我们建立了长效摄影教学机制。',
        bulletPoints: [
          '发起并组织每周课后摄影工作坊，指导青少年掌握相机操作、构图与艺术情感表达。',
          '带领孩子们在社区周围进行自然与人文采风，建立深厚跨代际信任与艺术自信。',
          '在2026年布兰迪斯大学伯恩斯坦艺术节期间，于 Slosberg 大厅策划并落地实体摄影作品展。',
          '制作严谨的学术与实践海报，为高校与社区建立可持续长效合作桥梁。',
        ],
      },
      campus_leadership: {
        title: 'Product Motion 与创业同辈辅导',
        subtitle: 'Product Motion 副主席 · 密歇根大学创业中心同辈导师 · ELP 第二期学者',
        role: '副主席 · CFE 同辈导师 · ELP 学者',
        period: '2024 – 至今',
        deckSummary:
          '作为 Product Motion 副主席、创业领导力项目(ELP)学者及 CFE 同辈导师，主导真实产品冲刺，为多元背景学生开拓科技产品经理成长路径。',
        story:
          '统筹产品管理社团与密歇根大学创业中心(CFE)咨询辅导，通过真实产品冲刺、作品集互评与行业导师分享，帮助非传统技术背景的同学跨越产品经理准入门槛，并在 ELP 学者团队中持续探索高增长创业。',
        context:
          '产品经理准入路径往往不够透明，特别是对于多元文化与非工科背景的学生。Product Motion 在密歇根大学构建了一个包容开放的产品实战社群。',
        bulletPoints: [
          '当选 Product Motion 副主席，主导学期产品实战课程与商业案例大赛。',
          '入选竞争激烈的密歇根大学创业中心领导力项目(ELP)第二期学者，深度浸润创新生态。',
          '作为 CFE 官方创业辅导员，每学期深度指导50余名学生的创业课程规划与求职路径。',
          '举办多场跨界工作坊，链接硬件、生物医疗与软件行业的资深产品导师。',
        ],
      },
      classical_violin: {
        title: '十四载古典小提琴与钢琴',
        subtitle: '声学共振、微观律动与多声部交融',
        role: '古典小提琴手 & 声学探索者',
        period: '14年专注练习',
        deckSummary:
          '十四年严谨的小提琴古典演奏与声学钢琴探索，培养了对微秒律动、和声层次与触感细节的极致敏锐度。',
        story:
          '音乐是我学会沉淀与倾听的起点。古典小提琴的严苛训练要求在毫米之间精准修正音准，倾听四重奏中彼此的呼吸与留白，这深刻影响了我对产品体验节奏与留白的理解。',
        context:
          '古典音乐演奏是对高压环境下绝对专注的终极锤炼。每日音阶的打磨、音色的纯净度与声部间的平衡，直接映射到了我构建产品架构与交互细节的审美要求中。',
        bulletPoints: [
          '14年系统化古典小提琴训练，长期担任交响乐团与室内乐弦乐四重奏演奏。',
          '在技术研发之余，探索声学钢琴即兴编配与律动设计，保持充沛的感性创造力。',
          '将声学节奏美学注入产品体验设计中：把控用户流程的呼吸感，消除交互生硬阻滞。',
        ],
      },
      micro_sculpture: {
        title: '微型指尖穿戴雕塑',
        subtitle: '毫米级物理工艺与矿物凝胶化学',
        role: '微雕手作艺术家 & 造型设计',
        period: '2023 – 至今',
        deckSummary:
          '在15毫米微型甲面上运用高粘度凝胶、日本铬粉与原矿矿石手工微雕穿戴艺术，探索方寸之间的立体触感美学。',
        story:
          '微型指甲雕塑是对极致细节的专注。在15毫米的方寸之间，需要在放大镜下精细运笔，平衡凝胶粘度、固化温控与光泽折射，打磨出兼具艺术美感与日常佩戴耐久度的微型雕塑。',
        context:
          '数字化设计往往停留在冰冷屏幕的像素之中。手工微缩指尖雕塑让我能真切触摸实体材料，测试聚合物化学特性，并在三维微观世界中实践前沿工艺。',
        bulletPoints: [
          '研发多层折射工艺，将磁性猫眼粉、纯金金箔与高透光波光学胶进行艺术融合。',
          '定制设计并制作超过80套穿戴甲作品，根据个人甲型解剖结构进行高精度量体微雕。',
          '锻炼出极致手部稳定性与微观空间感知力，为高精度数字交互与视觉设计提供独特灵感。',
        ],
      },
      physical_discipline: {
        title: '力量训练与身心沉淀',
        subtitle: '生物力学、渐进负荷与日常心智锚定',
        role: '力量训练者 & 身心沉淀',
        period: '日常坚持',
        deckSummary:
          '通过杠铃力量训练、生物力学精准发力与日常规律纪律沉淀心绪，在复杂多变的高强度挑战中保持澄明专注。',
        story:
          '举起沉重杠铃的过程摒弃了一切浮躁。地心引力从不说谎，它给予最客观的即时反馈。每日坚持记录负荷数据、校准杠杆支点与专注呼吸，让我在高压环境中始终保持坚韧与清醒。',
        context:
          '快节奏的产品研发与高强度思考容易让人产生认知疲劳。力量训练提供了一个绝对纯粹的物理锚点，让身心在对抗阻力中重获平静与力量。',
        bulletPoints: [
          '坚持每周4次规律大重量杠铃复合力量训练，严格保持动作力学轨迹。',
          '将渐进超负荷与数据量化追踪原则运用于体能管理与精力调配中。',
          '锤炼出直面高难度不确定性时毫不退缩的专注力与抗压心理素质。',
        ],
      },
    },
  },
  es: {
    header: {
      works: '// PROYECTOS',
      about: '// SOBRE MÍ',
      index: '// ÍNDICE',
      contact: 'CONTACTO ↗',
      overviewExit: 'Resumen',
      prev: 'Anterior',
      next: 'Siguiente',
    },
    hero: {
      name: 'Kelsey Lin',
      intro:
        'Gerente de producto y creadora 0→1 en la Universidad de Michigan, enfocada en transformar sistemas complejos en productos intuitivos y centrados en las personas.',
    },
    constellation: {
      title: 'Perspectivas',
      subtitle: 'Productos, Liderazgo y Artesanía',
      hint: 'Haz clic o arrastra la flor para explorar',
    },
    lenses: {
      ventures: '01 // Proyectos',
      leadership: '02 // Liderazgo y DEI',
      craft: '03 // Artesanía',
    },
    macro: {
      readFullCase: 'Ver Caso Completo',
      dragToRotate: 'Desliza horizontalmente para rotar · Clic para explorar',
      overviewBtn: 'Volver al resumen',
      visitWebsite: 'Visitar sitio web ↗',
    },
    about: {
      badge: 'SOBRE MÍ',
      title: 'Creando productos con empatía,',
      subtitle: 'cuidado técnico y curiosidad.',
      manifesto:
        'Para mí, los grandes productos nacen de prestar atención profunda a las personas: no solo medir clics, sino comprender lo que realmente sienten y necesitan.',
      location: 'KELSEY LIN · UNIVERSIDAD DE MICHIGAN',
      story1Title: '01 // Aprender a escuchar y observar con agudeza',
      story1Text:
        'A los 13 años me mudé completamente sola de China a los Estados Unidos, sumergiéndome en un entorno, cultura y estilo de vida totalmente nuevos. Estar frente a situaciones nunca antes experimentadas me obligó a ser extraordinariamente adaptable y observadora: aprendí a captar el lenguaje no verbal, los silencios y las dinámicas humanas antes de que se pronunciara una sola palabra. Esta experiencia forjó mi resiliencia en entornos de alta incertidumbre y guía mi enfoque como líder de producto: descifrar las necesidades no articuladas de los usuarios, adaptarme con rapidez a problemas complejos y diseñar con profunda empatía.',
      story2Title: '02 // Convertir ideas en realidad',
      story2Text:
        'Me apasiona tomar problemas complejos y ambiguos y transformarlos en sistemas claros y confiables. Ya sea cofundando Afterlife Club, optimizando paneles de telemetría en Luxshare o diseñando salvaguardas para robótica en SomaSeek, mantengo siempre a las personas en el centro.',
      story3Title: '03 // Disciplina, arte y comunidad',
      story3Text:
        'Tocar el violín clásico durante 14 años me enseñó paciencia, sincronización y cómo los detalles microscópicos transforman la armonía. Fuera de la tecnología, fundé una iniciativa comunitaria conectando fotógrafos con familias inmigrantes para retratar sus recuerdos familiares.',
      moreTitle: '// Más sobre mí',
      moreText:
        'Fuera de especificaciones y mapas de ruta de producto, usualmente me encontrarás practicando violín, diseñando arte de uñas personalizado o entrenando fuerza en el gimnasio.',
      getInTouch: 'Contáctame ↗',
      essays: 'Ensayos y Reflexiones ↗',
      close: 'Cerrar',
    },
    index: {
      badge: 'ÍNDICE RÁPIDO',
      title: 'Catálogo de Proyectos',
      close: 'Cerrar',
      experienceSection: 'Experiencia Laboral',
      educationSection: 'Educación y Logros',
      skillsSection: 'Competencias Principales',
      connectSection: 'Canales Directos',
      viewProject: 'Ver Proyecto',
    },
    projects: {
      afterlife: {
        title: 'Afterlife Club',
        subtitle: 'Plataforma de Memorias y Legado Digital con IA',
        role: 'Cofundadora & Lead PM',
        period: '2026 – Presente',
        deckSummary:
          'Plataforma de legado digital y diario de vida con IA que transforma la planificación del final de la vida en una celebración de memorias sin clonación artificial de voz.',
        story:
          'Rediseñé el producto hacia la celebración de vidas en lugar del duelo, elevando la finalización de tareas al 88% sin clonación artificial de voz.',
        context:
          'Las herramientas tradicionales sufren alto abandono debido al peso emocional. Diseñamos Afterlife Club como un espacio cálido y reconfortante para preservar recuerdos y cartas familiares.',
        bulletPoints: [
          'Lideré la estrategia de producto desde el concepto inicial hasta mapas de viaje de usuario y sprints ágiles.',
          'Entrevisté a más de 25 usuarios para resolver fricciones emocionales, logrando 88% de finalización.',
          'Establecí límites éticos de IA excluyendo clonación de voz, alcanzando 92% de confianza de usuario.',
          'Diseñé prototipos interactivos en Figma y lideré sprints semanales con ingeniería y diseño.',
        ],
      },
      warmilu: {
        title: 'Warmilu',
        subtitle: 'Tecnología Médica Térmica No Eléctrica para Neonatos',
        role: 'Pasante de PM',
        period: '2026',
        deckSummary:
          'Tecnología médica térmica no eléctrica para prevenir la hipotermia neonatal en clínicas con suministro inestable, optimizando la adquisición y triaje clínico.',
        story:
          'Rediseñé la experiencia web y el embudo de compra médica, aumentando las ventas directas un 20% y recortando la respuesta un 40%.',
        context:
          'Las mantas médicas salvan vidas infantiles, pero el sitio anterior complicaba a hospitales y donantes comprender la tecnología o adquirir unidades.',
        bulletPoints: [
          'Rediseñé la experiencia integral en Figma y Squarespace para simplificar la comprensión clínica.',
          'Diseñé un flujo de compra directa para compradores hospitalarios, incrementando ventas un 20%.',
          'Automaticé el formulario de consulta clínica, reduciendo el tiempo de respuesta un 40%.',
          'Ejecuté pruebas A/B iterativas en calculadoras de impacto y opciones de donación.',
        ],
      },
      luxshare: {
        title: 'Luxshare Precision',
        subtitle: 'Integración Telemática en Manufactura de Hardware y Software',
        role: 'Pasante de PM · Telemetría HW/SW',
        period: '2025',
        deckSummary:
          'Sistema telemático e inspección óptica automatizada para líneas de vehículos eléctricos, estandarizando 200 auditorías técnicas.',
        story:
          'Estandaricé especificaciones técnicas en 200 auditorías, elevando la precisión de línea al 98% y reduciendo fallas de capacitación un 30%.',
        context:
          'La fabricación de alta tecnología requiere sincronización entre pruebas de software automatizadas, cámaras ópticas y técnicos de ensamblaje.',
        bulletPoints: [
          'Entrevisté a más de 15 ingenieros de firmware y supervisores para crear PRDs y flujos de calidad unificados.',
          'Estandaricé protocolos de inspección en 200 auditorías, alcanzando 98% de precisión de línea.',
          'Desarrollé paneles en Python y Excel para monitorear cuellos de botella en tiempo real.',
          'Facilité la comunicación técnica entre equipos bilingües de ingeniería y técnicos en planta.',
        ],
      },
      somaseek: {
        title: 'SomaSeek',
        subtitle: 'IA Corpórea Multirrobot y Plataforma Educativa',
        role: 'Product Manager · Robótica e IA Corpórea',
        period: '2025 – 2026',
        deckSummary:
          'Plataforma interactiva de robótica e IA corpórea presentada ante 1.5M de espectadores, con rúbricas que eliminaron alucinaciones de IA.',
        story:
          'Diseñé prompts estructurados para robótica educativa, eliminando alucinaciones de IA y aumentando la adopción en aulas piloto un 40%.',
        context:
          'Evaluar tareas robóticas con modelos de lenguaje exige confiabilidad absoluta sin margen de error ni alucinaciones.',
        bulletPoints: [
          'Diseñé prompts estructurados y rúbricas de evaluación, elevando la adopción en aulas piloto un 40%.',
          'Presenté demostración en vivo ante 1.5 millones de espectadores en la China Big Data Expo.',
          'Optimicé sprints de desarrollo reduciendo el tiempo de entrega un 25%.',
          'Establecí ciclos de retroalimentación con educadores para perfeccionar la interacción físico-robótica.',
        ],
      },
      portrait_project: {
        title: 'Proyecto de Retratos Comunitarios',
        subtitle: 'Beca Richard Collins · Archivo Familiar Inmigrante',
        role: 'Becaria Richard Collins & Líder de Proyecto',
        period: '2024 – Presente',
        deckSummary:
          'Iniciativa de fotografía comunitaria que conecta fotógrafos estudiantiles con familias inmigrantes para preservar retratos familiares intergeneracionales.',
        story:
          'Como becaria Richard Collins, creé este programa para ofrecer retratos familiares de estudio gratuitos a hogares inmigrantes, preservando sus memorias y pertenencia.',
        context:
          'Establecerse en un nuevo país suele implicar dejar atrás recuerdos visuales de la familia extendida. Esta iniciativa entrega impresiones de archivo de forma gratuita.',
        bulletPoints: [
          'Obtuve fondos de beca y coordiné a 12 fotógrafos y editores para sesiones comunitarias.',
          'Alcancé a más de 50 familias multiculturales, regalando impresiones fotográficas de archivo.',
          'Realicé entrevistas bilingües para registrar historias orales junto a cada retrato familiar.',
        ],
      },
      campus_leadership: {
        title: 'Product Motion & Asesoría CFE',
        subtitle: 'Vicepresidenta de Product Motion & Asesora Estudiantil CFE',
        role: 'Vicepresidenta & Asesora Estudiantil',
        period: '2024 – Presente',
        deckSummary:
          'Impulsé el emprendimiento estudiantil y abrí caminos en gestión de producto para fundadores subrepresentados en la Universidad de Michigan.',
        story:
          'Liderando Product Motion y asesorando en el Centro de Emprendimiento (CFE), guío sprints prácticos de producto y mentorías para estudiantes de diversos orígenes.',
        context:
          'El acceso al campo de Product Management suele ser opaco. Product Motion crea un entorno colaborativo y accesible para futuros líderes tecnológicos.',
        bulletPoints: [
          'Elegida Vicepresidenta de Product Motion, diseñando planes de estudio y competencias de casos.',
          'Asesoro a más de 50 estudiantes cada semestre en planes de carrera y emprendimiento en CFE.',
          'Organicé talleres conectando a estudiantes con líderes de la industria en software y hardware.',
        ],
      },
      classical_violin: {
        title: '14 Años de Violín Clásico y Piano',
        subtitle: 'Resonancia Acústica, Micro-Sincronización y Armonía',
        role: 'Violinista Clásica & Exploradora Sonora',
        period: '14 Años de Práctica',
        deckSummary:
          '14 años de riguroso entrenamiento en violín clásico y piano acústico, cultivando atención al detalle sonoro y paciencia táctil.',
        story:
          'La música clásica me enseñó paciencia y escucha profunda: cómo ajustar la afinación en milímetros y respirar junto al ensamble de cámara.',
        context:
          'La interpretación clásica exige concentración total bajo presión. La disciplina de las escalas diarias y el equilibrio sonoro informan mi diseño de productos.',
        bulletPoints: [
          '14 años de estudio intensivo de violín en repertorio solista, cuartetos de cuerda y orquesta.',
          'Exploración de resonancia acústica y composiciones en piano como contrapunto creativo.',
          'Aplicación de cadencia y armonía acústica a la fluidez de flujos de interacción digital.',
        ],
      },
      micro_sculpture: {
        title: 'Esculturas Portátiles en Miniatura',
        subtitle: 'Artesanía a Escala Milimétrica y Química Mineral',
        role: 'Artesana de Miniaturas & Diseñadora Escultórica',
        period: '2023 – Presente',
        deckSummary:
          'Creación manual de esculturas portátiles en miniatura sobre lienzos de 15 mm mediante geles de alta viscosidad y pigmentos minerales.',
        story:
          'La escultura en miniatura es una obsesión por el detalle extremo bajo luz de aumento, equilibrando viscosidad, curado y refracción.',
        context:
          'El diseño digital suele limitarse a píxeles en pantalla. La escultura en miniatura me conecta con materiales físicos y química de polímeros.',
        bulletPoints: [
          'Diseño de técnicas de capas combinando pigmentos magnéticos, oro y geles de vidrio óptico.',
          'Creación de más de 80 sets personalizados adaptados anatómicamente a cada uña.',
          'Desarrollo de precisión motriz que enriquece el diseño de microinteracciones de interfaz.',
        ],
      },
      physical_discipline: {
        title: 'Disciplina Física y Fuerza',
        subtitle: 'Precisión Biomecánica, Sobrecarga Progresiva y Claridad Mental',
        role: 'Atleta de Fuerza & Enfoque Mental',
        period: 'Práctica Constante',
        deckSummary:
          'Fortalecimiento de la resiliencia mental y claridad diaria mediante entrenamiento estructurado con barra y disciplina atlética progresiva.',
        story:
          'El levantamiento de pesas elimina distracciones. La gravedad no negocia: el hábito diario de entrenar y registrar datos mantiene mi mente firme y enfocada.',
        context:
          'Los ciclos rápidos de producto pueden agotar mentalmente. El levantamiento de pesas proporciona un ancla inamovible de claridad fisiológica.',
        bulletPoints: [
          'Entrenamiento estructurado 4 veces por semana con movimientos compuestos de barra.',
          'Aplicación de principios de sobrecarga progresiva y registro de datos biométricos.',
          'Construcción de resistencia física y determinación psicológica para desafíos 0→1.',
        ],
      },
    },
  },
  fr: {
    header: {
      works: '// TRAVAUX',
      about: '// À PROPOS',
      index: '// INDEX',
      contact: 'CONTACT ↗',
      overviewExit: 'Aperçu',
      prev: 'Précédent',
      next: 'Suivant',
    },
    hero: {
      name: 'Kelsey Lin',
      intro:
        "Chef de produit et créatrice 0→1 à l'Université du Michigan, dédiée à transformer des systèmes complexes en produits intuitifs et centrés sur l'humain.",
    },
    constellation: {
      title: 'Perspectives',
      subtitle: 'Produits, Leadership et Artisanat',
      hint: 'Cliquez ou glissez la fleur pour explorer',
    },
    lenses: {
      ventures: '01 // Projets',
      leadership: '02 // Leadership & DEI',
      craft: '03 // Artisanat',
    },
    macro: {
      readFullCase: 'Voir le Projet',
      dragToRotate: 'Glissez horizontalement pour faire tourner · Cliquez pour explorer',
      overviewBtn: "Retour à l'aperçu",
      visitWebsite: 'Visiter le site officiel ↗',
    },
    about: {
      badge: 'À PROPOS',
      title: 'Concevoir des produits avec empathie,',
      subtitle: 'rigueur technique et curiosité.',
      manifesto:
        "Pour moi, les grands produits naissent d'une attention profonde aux personnes : comprendre ce qu'elles ressentent plutôt que simplement mesurer des clics.",
      location: 'KELSEY LIN · UNIVERSITÉ DU MICHIGAN',
      story1Title: '01 // Écouter et observer avec acuité',
      story1Text:
        "À 13 ans, j'ai déménagé entièrement seule de Chine aux États-Unis, plongée dans un environnement, une culture et un mode de vie totalement inédits. Me retrouver face à des situations jamais vécues m'a appris à être profondément adaptable et observatrice — déchiffrer le langage corporel, les non-dits et les réactions humaines avant même que les mots ne soient prononcés. Cette expérience a forgé ma résilience face à l'inconnu et définit ma vision du Product Management : capter les besoins implicites des utilisateurs, pivoter rapidement dans des écosystèmes complexes et concevoir avec une authentique empathie.",
      story2Title: '02 // Donner vie aux idées',
      story2Text:
        "J'aime transformer des problèmes complexes et ambigus en systèmes clairs et fiables. Que ce soit en cofondant Afterlife Club, en optimisant la télémétrie industrielle chez Luxshare ou en cadrant la robotique chez SomaSeek, je place toujours l'humain au centre.",
      story3Title: '03 // Discipline, art et communauté',
      story3Text:
        "La pratique du violon classique pendant 14 ans m'a enseigné la patience et la précision du détail. Parallèlement, j'ai initié un projet communautaire réunissant étudiants photographes et familles immigrées pour créer leurs premiers portraits de famille.",
      moreTitle: '// En savoir plus',
      moreText:
        "En dehors des spécifications produit, vous me trouverez souvent au violon, en création de nail art personnalisé ou à la salle d'entraînement.",
      getInTouch: 'Me Contacter ↗',
      essays: 'Essais & Réflexions ↗',
      close: 'Fermer',
    },
    index: {
      badge: 'INDEX RAPIDE',
      title: 'Catalogue des Projets',
      close: 'Fermer',
      experienceSection: 'Expérience Professionnelle',
      educationSection: 'Formation & Distinctions',
      skillsSection: 'Compétences Clés',
      connectSection: 'Canaux Directs',
      viewProject: 'Voir le Projet',
    },
    projects: {
      afterlife: {
        title: 'Afterlife Club',
        subtitle: 'Plateforme de Mémoire et d’Héritage Numérique par IA',
        role: 'Cofondatrice & Chef de Produit Principale',
        period: '2026 – Présent',
        deckSummary:
          "Plateforme d'héritage numérique par IA transformant la fin de vie en célébration quotidienne des souvenirs, délibérément conçue sans clonage vocal artificiel.",
        story:
          'En échangeant avec des utilisateurs sur la fin de vie, nous avons constaté le poids émotionnel de ce sujet. J’ai réorienté le produit vers le récit quotidien des souvenirs, portant le taux de complétion à 88% sans clonage vocal artificiel.',
        context:
          'Les outils traditionnels connaissent un fort abandon en raison de la charge émotionnelle. Nous avons conçu Afterlife Club comme un espace apaisant pour préserver souvenirs et messages aux proches.',
        bulletPoints: [
          'Pilotage de la stratégie produit du concept initial aux feuilles de route et sprints agiles.',
          'Interviews de 25+ utilisateurs pour lever les freins émotionnels, atteignant 88% de complétion.',
          'Établissement de règles éthiques strictes interdisant le clonage vocal (92% de confiance).',
          'Prototypage interactif sous Figma et coordination des sprints avec le design et l’ingénierie.',
        ],
      },
      warmilu: {
        title: 'Warmilu',
        subtitle: 'Technologie Médicale Thermique Non-Électrique pour Nouveau-Nés',
        role: 'Stagiaire en Gestion de Produit',
        period: '2026',
        deckSummary:
          "Dispositif médical thermique non-électrique conçu pour prévenir l'hypothermie des nouveau-nés dans les cliniques sans électricité stable.",
        story:
          'Warmilu crée des couvertures thermiques non-électriques pour sauver les prématurés dans les cliniques sans électricité stable. J’ai piloté la refonte intégrale du site et du parcours d’achat, augmentant les ventes directes de 20%.',
        context:
          'Les couvertures à changement de phase sauvent des vies infantiles, mais l’ancien site compliquait la compréhension et la commande par les hôpitaux.',
        bulletPoints: [
          'Refonte globale de l’expérience web sur Figma et Squarespace pour clarifier l’offre clinique.',
          'Simplification du flux de commande hospitalier, augmentant la conversion directe de 20%.',
          'Automatisation du routage des demandes médicales, diminuant le temps de traitement de 40%.',
          'Tests A/B itératifs sur les simulateurs de coûts et les modules de don.',
        ],
      },
      luxshare: {
        title: 'Luxshare Precision',
        subtitle: 'Intégration Télémétrique Matérielle et Logicielle en Production',
        role: 'Stagiaire Chef de Produit · Télémétrie Hardware-Software',
        period: '2025',
        deckSummary:
          "Système télémétrique et contrôle qualité optique automatisé sur les lignes de production de véhicules électriques, harmonisant 200 audits.",
        story:
          'Sur les lignes d’assemblage électronique de pointe et de véhicules électriques, j’ai rédigé les spécifications et procédures de contrôle qualité sur 200 audits techniques, portant la précision à 98%.',
        context:
          'La fabrication de haute précision exige une parfaite synchronisation entre tests logiciels automatisés, caméras optiques et opérateurs sur ligne.',
        bulletPoints: [
          'Entretiens avec 15+ ingénieurs firmware et superviseurs pour unifier les PRDs et flux opérationnels.',
          'Harmonisation des protocoles sur 200 audits, atteignant 98% de conformité de production.',
          'Développement de tableaux de bord automatisés Python et Excel pour détecter les goulets d’étranglement.',
          'Coordination technique fluide entre équipes bilingues d’ingénierie et techniciens d’atelier.',
        ],
      },
      somaseek: {
        title: 'SomaSeek',
        subtitle: 'IA Incarnée Multi-Robots & Plateforme Éducative',
        role: 'Chef de Produit · Robotique & IA Incarnée',
        period: '2025 – 2026',
        deckSummary:
          "Plateforme interactive d'IA incarnée multi-robots présentée en direct devant 1,5 million de spectateurs à la China Big Data Expo.",
        story:
          'Chez SomaSeek, j’ai conçu des cadres de prompts et d’évaluation pour la robotique éducative, éliminant les hallucinations IA et augmentant l’adoption en classe de 40%.',
        context:
          'L’évaluation d’activités robotiques réelles par des modèles de langage requiert une fiabilité absolue sans la moindre hallucination.',
        bulletPoints: [
          'Conception de prompts structurés et de métriques d’évaluation, augmentant l’adoption pilote de 40%.',
          'Démonstration en direct devant 1,5 million de spectateurs à la China Big Data Expo 2025.',
          'Optimisation des cycles de développement, réduisant les délais de livraison de 25%.',
          'Mise en place de boucles de retours avec les enseignants pour perfectionner l’orchestration robotique.',
        ],
      },
      portrait_project: {
        title: 'Projet de Portraits Communautaires',
        subtitle: 'Bourse Richard Collins · Archive des Familles Immigrées',
        role: 'Boursière Richard Collins & Responsable de Projet',
        period: '2024 – Présent',
        deckSummary:
          'Initiative photographique solidaire associant étudiants et familles immigrées pour créer et transmettre des portraits de famille intergénérationnels.',
        story:
          "En tant que boursière Richard Collins, j'ai fondé cette initiative pour offrir aux familles immigrées des séances de portrait gratuites et archiver leurs récits familiaux.",
        context:
          "S'installer dans un nouveau pays signifie souvent laisser derrière soi les archives visuelles familiales. Ce projet offre des tirages d'art physiques gratuitement.",
        bulletPoints: [
          'Obtention du financement de la bourse et coordination de 12 étudiants photographes et retoucheurs.',
          'Partenariat avec des centres communautaires pour accueillir plus de 50 familles multiculturelles.',
          'Entretiens bilingues pour enregistrer l’histoire orale transmise à travers chaque portrait.',
        ],
      },
      campus_leadership: {
        title: 'Product Motion & Conseil CFE',
        subtitle: 'Vice-Présidente de Product Motion & Conseillère Étudiante CFE',
        role: 'Vice-Présidente & Conseillère Étudiante',
        period: '2024 – Présent',
        deckSummary:
          'Promotion de l’entrepreneuriat étudiant et ouverture des carrières en gestion de produit pour les fondateurs sous-représentés à l’Université du Michigan.',
        story:
          'À la tête de Product Motion et conseillère au Center for Entrepreneurship (CFE), j’anime des sprints produit et des mentorats concrets pour étudiants de tous horizons.',
        context:
          'L’accès au Product Management manque souvent de transparence. Product Motion crée une communauté inclusive d’apprentissage et de pratique.',
        bulletPoints: [
          'Élue Vice-Présidente de Product Motion, création de programmes de formation et de concours d’études de cas.',
          'Conseil de plus de 50 étudiants par semestre au CFE sur leurs parcours entrepreneuriaux et professionnels.',
          'Organisation d’ateliers réunissant étudiants et mentors seniors de la tech et du hardware.',
        ],
      },
      classical_violin: {
        title: '14 Ans de Violon Classique & Piano',
        subtitle: 'Résonance Acoustique, Micro-Rythme & Harmonie d’Ensemble',
        role: 'Violoniste Classique & Exploratrice Sonore',
        period: '14 Ans de Rigueur',
        deckSummary:
          '14 années de pratique intensive du violon classique et du piano acoustique, développant une écoute millimétrique et une sensibilité tactile rigoureuse.',
        story:
          'La musique m’a appris la patience et l’écoute active : corriger l’intonation au millimètre près et respirer en osmose avec un quatuor à cordes.',
        context:
          'L’interprétation classique est une école de précision sous tension. La rigueur des gammes quotidiennes irrigue directement ma conception de parcours fluides.',
        bulletPoints: [
          '14 ans d’études de violon classique en soliste, quatuors à cordes et orchestres symphoniques.',
          'Exploration de la résonance acoustique et arrangements au piano en contrepoint créatif.',
          'Transposition de la respiration musicale dans le design d’interaction utilisateur.',
        ],
      },
      micro_sculpture: {
        title: 'Sculptures Portables Miniatures',
        subtitle: 'Artisanat à l’Échelle Millimétrique & Chimie Minérale',
        role: 'Artisane Miniaturiste & Créatrice Sculpturale',
        period: '2023 – Présent',
        deckSummary:
          'Conception manuelle de sculptures portables sur ongles de 15 mm avec des gels haute viscosité, pigments japonais et poudres de quartz brut.',
        story:
          'La micro-sculpture sur ongle est une quête de précision absolue sous loupe grossissante, équilibrant viscosité, catalysation et réfraction de la lumière.',
        context:
          'Le design numérique s’arrête aux pixels. Façonner des sculptures portables me permet d’expérimenter la matière physique et la chimie des polymères.',
        bulletPoints: [
          'Développement de techniques de superposition combinant pigments magnétiques, or véritable et gels optiques.',
          'Création de plus de 80 parures uniques ajustées sur mesure à l’anatomie de chaque main.',
          'Maîtrise d’une motricité fine et d’une patience spatiale transposées dans les micro-interactions UI.',
        ],
      },
      physical_discipline: {
        title: 'Discipline Physique & Force',
        subtitle: 'Biomécanique, Surcharge Progressive & Clarté Mentale',
        role: 'Athlète de Force & Ancrage Mental',
        period: 'Pratique Continue',
        deckSummary:
          'Ancrage mental et clarté quotidienne par la force athlétique à la barre, la précision biomécanique et la régularité physique.',
        story:
          'Soulever des barres lourdes élimine le superflu. La gravité ne négocie pas : cette rigueur quotidienne de mouvement et de respiration me garde centrée.',
        context:
          'Le rythme intense des cycles produit peut épuiser l’esprit. La force athlétique offre un socle immuable de clarté physiologique.',
        bulletPoints: [
          'Entraînement régulier 4 fois par semaine axé sur les mouvements composés à la barre.',
          'Application des principes de surcharge progressive et de quantification métrique.',
          'Développement d’une endurance psychologique inébranlable face aux défis 0→1.',
        ],
      },
    },
  },
};
