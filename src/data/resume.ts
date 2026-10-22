import type { IconType } from "react-icons";

export interface NavSection {
  id: string;
  label: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  note?: string;
  period: string;
}

export interface DevIcon {
  key: string;
  name: string;
  icon: IconType;
}

export const profile = {
  firstName: "Marcos",
  lastName: "Ramos",
  role: "Front-end Developer",
  location: ["Saúde", "Rio de Janeiro · RJ", "(21) 98441-9879"],
  email: "rodrigues.ramos@outlook.com",
  phone: "(21) 98441-9879",
  about: [
    "Front-end developer, passionate about technology and my 3 children. Crazy about music too.",
    "I took my first steps in programming at the age of 15, studying Delphi in technical high school. Then, with the need to work and support my children, at 19 came my first job in the area of assembling and maintaining computers. It kept me for 8 years. Even though I didn't work directly with programming, I always developed solutions using programming concepts and also tried to keep up with technology.",
    "With no money to pay for college, I decided to use the leftover time to study and pass the entrance exam of a federal university. And so I went to UFF, where I applied for the Technology in Computer Systems course. I worked in several companies over these years, acquired knowledge in hard skills and soft skills, but the desire to become a developer doesn't go away. That's my goal.",
  ],
  social: {
    linkedin: "http://www.linkedin.com/in/marcos-ramos-8350074b",
    github: "https://github.com/gitrodrigues1",
  },
} as const;

export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "interests", label: "Interests" },
  { id: "awards", label: "Awards" },
];

export const experience: ExperienceItem[] = [
  {
    role: "System Analyst",
    company: "Oi S/A (Prestador de Serviços)",
    period: "September 2017 – November 2019",
    description:
      "Documentation, unit/integrated testing, configuration and implementation of stores throughout Brazil. Training Coordinator.",
  },
  {
    role: "System Analyst",
    company: "Rede DOR S/A",
    period: "May 2016 – February 2017",
    description:
      "Totvs Protheus Analyst. Focus on Personnel and Financial Management modules. Support for system users. Participation in projects for the incorporation of new hospital units.",
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
];

export const education: EducationItem[] = [
  {
    school: "Universidade Federal Fluminense",
    degree: "Technology in Computer Systems",
    note: "In progress",
    period: "August 2013 – May 2021",
  },
  {
    school: "Escola Técnica Electra (High School)",
    degree: "Information Technology",
    period: "August 2004 – May 2006",
  },
];

export const workflow: string[] = [
  "Mobile-First, Responsive Design",
  "Cross Browser Testing & Debugging",
  "Cross Functional Teams",
  "Agile Development & Scrum",
];

export const interests: string[] = [
  "A business analyst changing career to become a developer, finishing graduation.",
  "When forced indoors, I split a large amount of my free time educating and entertaining my 3 children and exploring the latest technology advancements in the front-end web development world.",
];

export const awards: string[] = [
  "Java – Collection e Streams – Digital Innovation One",
  "Introdução ao Github e comandos essenciais para trabalhar em equipe – Digital Innovation One",
  "Modelagem de Processos com Bizagi (BPMN)",
  "Totvs Formação – Programação Advpl",
  "Capacitação no ERP Totvs Microsiga Protheus: Configurador",
  "Capacitação no ERP Totvs Microsiga Protheus: Arquitetura e Instalação",
  "Certificação Microsoft 70-290 MCP Windows Server 2003",
];
