import type { ResumeContent } from "./resume";

const en: ResumeContent = {
  profile: {
    firstName: "Marcos",
    lastName: "Ramos",
    role: "Backend Developer",
    tagline: "System Integration & API Specialist",
    location: ["Rio de Janeiro · RJ"],
    email: "rodrigues.ramos@gmail.com",
    about: [
      "Backend developer specialized in systems integration, REST APIs and microservices architecture. Throughout my career, I have designed and delivered critical integrations between ERPs, e-commerce platforms, carriers and government tax systems, ensuring scalability, traceability and fiscal compliance.",
      "I work well in cross-functional squads, collaborating with product, business and external technical partners. I have experience in scrum projects, production incident troubleshooting and data flow optimization. AWS Certified Solutions Architect and English B2 (TOEFL ITP).",
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
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "interests", label: "Interests" },
    { id: "awards", label: "Awards" },
    { id: "contact", label: "Contact" },
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
        "System migration project: documentation, unit/integrated testing, configuration implementation and training of stores throughout Brazil.",
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
        "Started as intern and hired later. Technical support for a group of 12 stores that sells technology products (motherboards, processors, storages, routers and many more). This is where my career in ERP started, where I could perform the first implementation of a TOTVS Protheus system.",
    },
  ],
  education: [
    {
      school: "Universidade Federal Fluminense (UFF)",
      degree: "Technology in Computer Systems",
      note: "Education in software development and computer systems. Capstone Course Project (TCC) completed.",
      period: "August 2019 – May 2021",
    },
    {
      school: "Escola Técnica Electra",
      degree: "IT Technician (Technical High School)",
      note: "Completed in December 2005.",
      period: "August 2004 – December 2005",
    },
  ],
  projects: [
    {
      title: "5% Imobiliária",
      description:
        "Hybrid platform connecting properties, brokers and franchisees. Institutional website with property catalog, franchise proposal, testimonials and lead generation integrations.",
      url: "https://5porcentoimobiliaria.com",
      snapshots: [
        "/projects/5porcento/desktop.png",
        "/projects/5porcento/mobile.png",
      ],
      tags: ["Next.js", "React", "SEO", "Integrations"],
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
    "Emerging technologies in web development, backend, AI and cloud computing.",
    "I have interests in music, nature, sports and learning new languages. I enjoy exploring trails, waterfalls and beaches.",
  ],
  awards: [
    "AWS Certified Solutions Architect – Associate (SAA-C03)",
    "AWS Certified Cloud Practitioner (CLF-C02)",
    "NestJS Fundamentals (Node.js framework)",
    "Bizagi Modeler (BPMN)",
    "Advpl Programming Language (TOTVS Protheus ERP)",
    "ERP Totvs Microsiga Protheus: Configuration and Customization",
    "ERP Totvs Microsiga Protheus: Arquitecture",
    "Certificação Microsoft 70-290 MCP Windows Server 2003",
  ],
  ui: {
    docTitle: "Marcos Ramos · Backend Developer",
    language: "Language",
    navLabel: "Resume sections",
    theme: "Theme",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    backToTop: "Back to top",
    skillsLanguages: "Languages, Frameworks & Tools",
    skillsStack: "Tech Stack",
    skillsPractices: "Practices",
    experienceTitle: "Experience",
    educationTitle: "Education",
    skillsTitle: "Skills",
    interestsTitle: "Interests",
    awardsTitle: "Awards & Certifications",
    projectsTitle: "Projects",
    contactTitle: "Contact",
    contactIntro:
      "Open to new opportunities and good conversations about backend, APIs, integrations and cloud. The fastest way to reach me is by email.",
    contactEmailLabel: "Send an email",
    builtWith: "Built with Next.js & Tailwind CSS",
    experienceHighlights: "Highlights",
  },
};

export default en;
