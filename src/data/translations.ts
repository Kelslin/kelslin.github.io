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
      context: string;
      bulletPoints: string[];
    }
  >;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    header: {
      works: '// WORKS',
      about: '// ABOUT',
      index: '// INDEX',
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
      title: 'Selected Works',
      subtitle: '0→1 Products & Systems',
      hint: 'Click or drag flower to explore',
    },
    macro: {
      readFullCase: 'Read full case study ↗',
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
      story1Title: '01 // Learning to listen and observe',
      story1Text:
        'When I was 13, I moved from China to the United States entirely on my own, stepping into a completely new environment, culture, and lifestyle. Being immersed in unfamiliar territory where I had to navigate situations I had never experienced before taught me to become exceptionally adaptable and observant—learning to read room dynamics, unspoken emotional cues, and human intent long before words were shared. That formative journey built my resilience in high-ambiguity spaces, and it directly shapes my work in product management today: uncovering latent user needs, rapidly adapting across complex technical domains, and designing with genuine empathy.',
      story2Title: '02 // Turning ideas into reality',
      story2Text:
        'I love taking complex, ambiguous problems and turning them into clear, reliable systems. Whether that meant co-founding a digital memory platform with Afterlife Club, streamlining telemetry dashboards across assembly lines at Luxshare, or creating prompt guardrails for robotics at SomaSeek, I focus on helping teams move fast while keeping people at the center.',
      story3Title: '03 // Craft, discipline, and community',
      story3Text:
        'Playing classical violin for 14 years taught me patience, micro-timing, and how tiny details change the entire harmony. Outside of technology, I also started a community project connecting student photographers with local immigrant families to help them capture meaningful family portraits and feel welcomed.',
      moreTitle: '// A little more about me',
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
        story:
          'When we talked with people about end-of-life planning, we noticed that facing mortality directly felt overwhelming and emotionally draining. I led our pivot to reframe the product around daily memory journaling and celebrating life stories instead, which brought our prototype completion rate up to 88%. To protect user trust, I also established strict privacy guidelines that avoided artificial voice cloning, ensuring the platform felt authentic, comforting, and safe.',
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
        story:
          'Warmilu creates non-electric warming blankets to help save preterm infants in clinics without consistent power. I led the complete redesign of our website and customer journey, conducting user research with healthcare workers to clarify the ordering process and increase direct sales by 20%. I also automated our customer intake workflow to route clinician inquiries faster, cutting response times by 40%.',
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
        story:
          'Working alongside engineering teams on high-precision electronics and EV production lines, I wrote clear product specifications and quality inspection workflows based on conversations with 15+ team leads. By standardizing testing checklists across 200 technical audits, we brought production accuracy to 98% and reduced training mistakes by 30%. I also automated data dashboards in Python and Excel to help supervisors catch delays early.',
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
        subtitle: 'Multi-Robot Embodied AI & Michigan Startup Ecosystem',
        role: 'Product Manager & Ecosystem Director',
        period: '2025 – 2026',
        story:
          'At SomaSeek, I worked on embodied robotics and education tools, designing prompt frameworks and evaluation rubrics that prevented AI hallucinations and increased pilot classroom adoption by 40%. We showcased the platform live to 1.5 million viewers at the China Big Data Expo 2025. In parallel, as Director of the Michigan Startup Career Fair, I led a student team of 11 to organize an event connecting over 300 students with 70 venture-backed companies.',
        context:
          'Using large language models to grade physical robotics activities requires precise, reliable feedback without errors or hallucinations. At the same time, university students often struggle to find clear pathways into early-stage, fast-moving startup environments.',
        bulletPoints: [
          'Designed structured prompts and few-shot evaluation rubrics for robotics tasks, eliminating hallucinations and increasing pilot adoption by 40%.',
          'Demonstrated the AI platform live in front of 1.5 million viewers at the China Big Data Expo 2025 while keeping educator trust above 95%.',
          'Streamlined development sprints with clear progress tracking, reducing delivery turnaround by 25%.',
          'Directed an 11-person team to host the Michigan Startup Career Fair, bringing together 300+ students and 70 startups while raising $3,000 in sponsorships.',
        ],
      },
    },
  },
  zh: {
    header: {
      works: '// 作品',
      about: '// 关于我',
      index: '// 索引',
      contact: '联系 ↗',
      overviewExit: '返回总览',
      prev: '上一项目',
      next: '下一项目',
    },
    hero: {
      name: 'Kelsey Lin',
      intro:
        '密歇根大学产品经理与 0 到 1 架构构建者，专注于将复杂系统转化为符合直觉与人性化的产品体验。',
    },
    constellation: {
      title: '精选项目',
      subtitle: '0→1 产品与系统设计',
      hint: '点击或拖拽琉璃花进行浏览',
    },
    macro: {
      readFullCase: '查看完整项目分析 ↗',
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
      story1Title: '01 // 学会倾听与敏锐观察',
      story1Text:
        '13岁那年，我独自一人从中国来到美国，置身于一个完全陌生的文化与生活环境中。面对从未经历过的新环境，我必须保持高度的适应力与敏锐的观察力——去读懂他人的肢体语言、微表情与未曾言明的真实感受。这段经历培养了我在面对高度不确定性时的坚韧心态，也深刻塑造了我今天作为产品经理的核心特质：不仅倾听用户口头表达的需求，更善于洞察他们内心的潜意识诉求，在复杂多变的业务场景中迅速适应，打磨出真正体贴入微的产品。',
      story2Title: '02 // 将复杂问题化为现实系统',
      story2Text:
        '我热衷于拆解复杂模糊的系统难题。无论是联合创办 Afterlife Club 记忆归档平台、在立讯精密优化千万级产线数据看板，还是在 SomaSeek 为具身机器人构建提示词护栏，我都坚持在推进敏捷交付的同时，始终把人的体验放在核心位置。',
      story3Title: '03 // 匠心纪律与社会联结',
      story3Text:
        '14年的小提琴古典演奏经历磨练了我的耐心与细微把控力。在科技之外，我还发起了摄影公益项目，组织学生摄影师为当地移民家庭拍摄全家福，帮助他们在异国他乡感受到社区的温暖与接纳。',
      moreTitle: '// 工作之外的生活',
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
      viewProject: '查看项目',
    },
    projects: {
      afterlife: {
        title: 'Afterlife Club',
        subtitle: 'AI 人生记忆归档与数字遗产平台',
        role: '联合创始人 & 主产品经理',
        period: '2026 – 至今',
        story:
          '在与用户探讨生命终末期规划时，我们发现直面死亡令人产生巨大的心理沉重感。我主导产品核心转型，将焦点转向“日常记忆记录与生命故事致敬”，使得原型任务完成率提升至88%。为捍卫用户信任，我制定了坚决不采用AI声音克隆的道德隐私准则，确保平台真实、安心且温暖。',
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
        story:
          '深入高精度消费电子与新能源车产线，与15位工程主管协作制定标准产品需求文档(PRD)与质检流程。通过在200次技术审核中规范检测清单，产线准确率提升至98%，作业员培训差错减少30%。同时开发 Python/Excel 自动化看板，助力主管实时排查瓶颈。',
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
        subtitle: '多机器人具身智能与密歇根创投生态',
        role: '产品经理 & 创投生态总监',
        period: '2025 – 2026',
        story:
          '在 SomaSeek 负责具身智能教育工具产品设计，构建结构化提示词与少样本评测标准，彻底消除 AI 幻觉，试点课堂采用率提升40%；在2025中国数博会向150万在线观众进行现场实机演示。同时作为密歇根创业招聘展总监，带领11人团队连接300+学生与70家顶级风投初创企业。',
        context:
          '利用大模型评判实体机器人操作必须保持绝对精准严谨；与此同时，高校优秀人才往往缺乏进入早期高成长科技企业的清晰通道。',
        bulletPoints: [
          '设计提示词工程与评测基准，杜绝幻觉输出，试点课堂采用率提升40%。',
          '在中国数博会向150万观众进行实机演示，教育行业信任度达95%。',
          '优化开发迭代周期，将功能交付时间缩短25%。',
          '统筹11人学生团队成功举办密歇根创业招聘展，服务300+学生与70家创新企业，筹集赞助资金。',
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
      title: 'Proyectos Destacados',
      subtitle: 'Productos y Sistemas 0→1',
      hint: 'Haz clic o arrastra la flor para explorar',
    },
    macro: {
      readFullCase: 'Leer caso de estudio completo ↗',
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
        subtitle: 'IA Corpórea y Ecosistema Emprendedor de Michigan',
        role: 'Product Manager & Directora de Ecosistema',
        period: '2025 – 2026',
        story:
          'Diseñé prompts estructurados para robótica educativa, eliminando alucinaciones de IA y aumentando la adopción en aulas piloto un 40%.',
        context:
          'Evaluar tareas robóticas con modelos de lenguaje exige confiabilidad absoluta sin margen de error ni alucinaciones.',
        bulletPoints: [
          'Diseñé prompts estructurados y rúbricas de evaluación, elevando la adopción en aulas piloto un 40%.',
          'Presenté demostración en vivo ante 1.5 millones de espectadores en la China Big Data Expo.',
          'Optimicé sprints de desarrollo reduciendo el tiempo de entrega un 25%.',
          'Lideré un equipo de 11 personas para conectar 300+ estudiantes con 70 startups de tecnología.',
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
      title: 'Projets Sélectionnés',
      subtitle: 'Produits et Systèmes 0→1',
      hint: 'Cliquez ou glissez la fleur pour explorer',
    },
    macro: {
      readFullCase: "Lire l'étude de cas complète ↗",
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
        story:
          'En échangeant avec des utilisateurs sur la fin de vie, nous avons constaté le poids émotionnel de ce sujet. J’ai réorienté le produit vers le récit quotidien des souvenirs, portant le taux de complétion à 88%. Pour préserver la confiance, j’ai banni le clonage vocal artificiel.',
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
        story:
          'Warmilu crée des couvertures thermiques non-électriques pour sauver les prématurés dans les cliniques sans électricité stable. J’ai piloté la refonte intégrale du site et du parcours d’achat, augmentant les ventes directes de 20% et réduisant les délais de réponse de 40%.',
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
        story:
          'Sur les lignes d’assemblage électronique de pointe et de véhicules électriques, j’ai rédigé les spécifications et procédures de contrôle qualité. Sur 200 audits techniques, la précision a atteint 98% et les erreurs de formation ont diminué de 30%.',
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
        subtitle: 'IA Incarnée Multi-Robots & Écosystème Entrepreneurial',
        role: 'Chef de Produit & Directrice de l’Écosystème',
        period: '2025 – 2026',
        story:
          'Chez SomaSeek, j’ai conçu des cadres de prompts et d’évaluation pour la robotique éducative, éliminant les hallucinations IA et augmentant l’adoption en classe de 40%. Présentation en direct devant 1,5 million de spectateurs à la China Big Data Expo. En parallèle, j’ai dirigé une équipe de 11 étudiants pour réunir 300+ étudiants et 70 startups financées.',
        context:
          'L’évaluation d’activités robotiques réelles par des modèles de langage requiert une fiabilité absolue sans la moindre hallucination.',
        bulletPoints: [
          'Conception de prompts structurés et de métriques d’évaluation, augmentant l’adoption pilote de 40%.',
          'Démonstration en direct devant 1,5 million de spectateurs à la China Big Data Expo 2025.',
          'Optimisation des cycles de développement, réduisant les délais de livraison de 25%.',
          'Direction d’une équipe de 11 personnes pour connecter 300+ étudiants avec 70 startups innovantes.',
        ],
      },
    },
  },
};
