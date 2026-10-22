import type { ResumeContent } from "./resume";

const en: ResumeContent = {
  profile: {
    firstName: "Marcos Aurélio",
    lastName: "Rodrigues Ramos",
    role: "Backend Developer",
    tagline: "System Integration & API Specialist",
    location: ["Rio de Janeiro · RJ", "(21) 98441-9879"],
    email: "rodrigues.ramos@gmail.com",
    phone: "(21) 98441-9879",
    about: [
      "Backend developer with 4+ years of experience in systems integrations and REST APIs in high-demand environments. Used to working in cross-functional squads, collaborating directly with product, business and external technical partner teams.",
      "Proven track record of integration with external partners (VTEX, carriers, ERPs), data flow validation, log analysis and troubleshooting of failures in production. English B2 (TOEFL ITP).",
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/marcos-ramos1",
      github: "https://github.com/gitrodrigues1",
    },
  },
  nav: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "interests", label: "Interests" },
    { id: "awards", label: "Awards" },
  ],
  experience: [
    {
      role: "Backend Developer",
      company: "Omie Experience S/A",
      period: "July 2022 – November 2023",
      description:
        "Omie is one of the largest SaaS ERPs in Brazil, with a base of tens of thousands of business customers. Direct work on partner integrations and business API development.",
      highlights: [
        "Partner integration: developed and maintained APIs consumed by strategic ERP partners, ensuring stability and clear interface contracts.",
        "NFS-e module from scratch: designed and delivered fiscal integration with city halls (Electronic Service Invoice), involving distinct JSON/XML data-format mapping per municipality — which demanded intense troubleshooting of integration flows.",
        "Troubleshooting & production support: responsible for log analysis, diagnosis of failures in client integrations and resolution of production incidents, reducing mean time to recovery (MTTR).",
        "Data flow validation: validated API responses and ensured JSON payload compliance between partner systems and the ERP — avoiding mass rejections in fiscal issuances.",
      ],
    },
    {
      role: "Backend Developer",
      company: "Edify Education",
      period: "October 2020 – July 2022",
      description:
        "E-commerce squad: development of APIs and integrations with external platforms, stack migration and AWS adoption.",
      highlights: [
        "Multi-partner integration: connected the e-commerce to VTEX and multiple carriers via REST APIs, managing distinct integration contracts per partner.",
        "Java → NestJS migration: refactored the squad's stack, accelerating development of new integrations by ~35% and introducing systematic unit-test coverage.",
        "AWS migration: moved squad applications to the cloud (EC2, S3, RDS), increasing resilience and enabling horizontal scaling of the integrations.",
      ],
    },
    {
      role: "System Analyst",
      company: "Oi S/A (Prestador de Serviços)",
      period: "September 2017 – November 2019",
      description:
        "Documentation, unit/integrated testing, configuration and implementation of stores throughout Brazil. Training Coordinator.",
    },
    {
      role: "System Analyst",
      company: "Rede D'Or São Luiz S/A",
      period: "May 2016 – February 2017",
      description:
        "TOTVS Protheus analyst supporting integrations and infrastructure in a high-criticality hospital network with strict SLAs — financial, accounting and personnel management modules.",
      highlights: [
        "Participated in data migration projects during the incorporation of new hospital units, keeping the integrity of flows between systems.",
      ],
    },
    {
      role: "System Analyst",
      company: "Nova Geração Comestíveis LTDA (Casas Pedro)",
      period: "March 2015 – May 2016",
      description:
        "Support TOTVS ERP Protheus system. Focused on sales market. Users support. Worked on new stores projects.",
    },
    {
      role: "System Analyst",
      company: "Ambient Air",
      period: "December 2014 – March 2015",
      description:
        "Support TOTVS ERP Protheus system. Focused on sales market. Users support.",
    },
    {
      role: "Business Consultant",
      company: "Korus Consultoria",
      period: "May 2014 – December 2014",
      description:
        "Support Totvs ERP new projects and the legacy ones. Focused on Sales market.",
    },
    {
      role: "IT Technician",
      company: "DEC 11 Hardware Informática",
      period: "September 2006 – May 2014",
      description:
        "Started as intern and hired later. Technical support for a group of 12 stores that sells technology products (motherboards, processors, storages, routers and many more). Client support included.",
    },
  ],
  education: [
    {
      school: "Universidade Federal Fluminense (UFF)",
      degree: "Technology in Computer Systems",
      note: "Incomplete — interrupted in the final term, with the capstone (TCC) completed.",
      period: "August 2013 – May 2021",
    },
    {
      school: "Escola Técnica Electra",
      degree: "IT Technician (Technical High School)",
      note: "Completed in December 2005.",
      period: "August 2004 – December 2005",
    },
  ],
  stackGroups: [
    {
      title: "APIs & Integration",
      items: [
        "REST",
        "Webhooks",
        "EDA",
        "ERP & external platform integrations",
        "Partner API contracts",
      ],
    },
    {
      title: "Cloud",
      items: [
        "AWS — EC2 · S3 · RDS · Lambda · ECS · SNS · SQS",
        "Azure (fundamentals)",
        "GCP (fundamentals)",
      ],
    },
    {
      title: "DevOps",
      items: [
        "Git",
        "Maven",
        "Docker",
        "CI/CD — Jenkins & GitHub Actions",
        "Kubernetes (fundamentals)",
        "Terraform (fundamentals)",
      ],
    },
    {
      title: "Databases",
      items: [
        "MS SQL Server",
        "MySQL",
        "Redis",
        "Relational modeling & migrations",
        "Performance tuning & caching",
      ],
    },
    {
      title: "Observability",
      items: ["Grafana", "Log analysis", "Automated alerting"],
    },
    {
      title: "Languages & Frameworks",
      items: ["Java (Spring Boot, Spring Data)", "Node.js", "NestJS", "JavaScript"],
    },
  ],
  practices: [
    "TDD (JUnit, Jest)",
    "Microservices",
    "Clean Architecture",
    "SOLID",
    "Design Patterns",
    "Cross-functional squads",
  ],
  interests: [
    "A business analyst turned developer — the career change is complete, and building integrations and APIs is now the day job.",
    "When forced indoors, I split a large amount of my free time educating and entertaining my 3 children and exploring the latest technology advancements in the web development world.",
  ],
  awards: [
    "AWS Certified Solutions Architect – Associate",
    "AWS Certified Cloud Practitioner",
    "Java – Collection e Streams – Digital Innovation One",
    "Introdução ao Github e comandos essenciais para trabalhar em equipe – Digital Innovation One",
    "Modelagem de Processos com Bizagi (BPMN)",
    "Totvs Formação – Programação Advpl",
    "Capacitação no ERP Totvs Microsiga Protheus: Configurador",
    "Capacitação no ERP Totvs Microsiga Protheus: Arquitetura e Instalação",
    "Certificação Microsoft 70-290 MCP Windows Server 2003",
  ],
  ui: {
    docTitle: "Marcos Ramos · Backend Developer",
    language: "Language",
    navLabel: "Resume sections",
    backToTop: "Back to top",
    skillsLanguages: "Languages, Frameworks & Tools",
    skillsStack: "Tech Stack",
    skillsPractices: "Practices",
    experienceTitle: "Experience",
    educationTitle: "Education",
    skillsTitle: "Skills",
    interestsTitle: "Interests",
    awardsTitle: "Awards & Certifications",
    builtWith: "Built with Next.js, Tailwind CSS & three.js",
  },
};

export default en;
