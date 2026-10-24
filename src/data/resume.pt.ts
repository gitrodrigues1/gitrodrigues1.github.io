import type { ResumeContent } from "./resume";

const pt: ResumeContent = {
  profile: {
    firstName: "Marcos",
    lastName: "Ramos",
    role: "Desenvolvedor Backend",
    tagline: "Integração de Sistemas e APIs",
    location: ["Rio de Janeiro · RJ"],
    email: "rodrigues.ramos@gmail.com",
    about: [
      "Desenvolvedor Backend com experiência em integrações de sistemas e APIs REST. Habituado a atuar em squads multifuncionais, colaborando diretamente com times de produto, negócios e parceiros técnicos externos.",
      "Histórico comprovado de integração com parceiros externos (VTEX, transportadoras, ERPs), validação de fluxos de dados, análise de logs e troubleshooting de falhas em produção. Inglês B2 (TOEFL ITP).",
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/marcos-ramos1",
      github: "https://github.com/gitrodrigues1",
    },
  },
  nav: [
    { id: "about", label: "Sobre" },
    { id: "experience", label: "Experiência" },
    { id: "education", label: "Formação" },
    { id: "skills", label: "Habilidades" },
    { id: "interests", label: "Interesses" },
    { id: "awards", label: "Certificações" },
    { id: "contact", label: "Contato" },
  ],
  experience: [
    {
      role: "Desenvolvedor Backend",
      company: "Omie Experience S/A",
      period: "Julho 2022 – Novembro 2023",
      description:
        "A Omie é um dos maiores ERPs SaaS do Brasil, com base de dezenas de milhares de empresas clientes. Atuação direta em integrações com parceiros e desenvolvimento de APIs de negócio.",
      highlights: [
        "Integração com parceiros externos: desenvolvimento e manutenção de APIs consumidas por parceiros estratégicos do ERP, garantindo estabilidade e contratos de interface claros.",
        "Módulo NFS-e do zero: projetou e entregou integração fiscal com prefeituras (Nota Fiscal de Serviços Eletrônica), envolvendo mapeamento de formatos distintos de dados (JSON/XML) por município — exigiu troubleshooting intenso de fluxos de integração.",
        "Troubleshooting e sustentação: responsável por análise de logs, diagnóstico de falhas em integrações de clientes e resolução de incidentes em produção, reduzindo o tempo médio de recuperação (MTTR).",
        "Validação de fluxos de dados: validou respostas de API e garantiu conformidade de payloads JSON entre sistemas parceiros e o ERP — evitou rejeições em massa nas emissões fiscais.",
      ],
    },
    {
      role: "Desenvolvedor Backend",
      company: "Edify Education",
      period: "Outubro 2020 – Julho 2022",
      description:
        "Squad de e-commerce: desenvolvimento de APIs e integrações com plataformas externas, migração de stack e adoção de AWS.",
      highlights: [
        "Integração multi-parceiro: conectou o e-commerce à VTEX e a múltiplas transportadoras via APIs REST, gerenciando contratos de integração distintos por parceiro.",
        "Migração Java → NestJS: refatoração da stack do squad, acelerando o desenvolvimento de novas integrações em ~35% e introduzindo cobertura de testes unitários sistematizada.",
        "Migração para AWS: moveu aplicações do squad para a nuvem (EC2, S3, RDS), aumentando resiliência e habilitando escalonamento horizontal das integrações.",
      ],
    },
    {
      role: "Analista de Sistemas",
      company: "Oi S/A (Prestador de Serviços)",
      period: "Setembro 2017 – Novembro 2019",
      description:
        "Documentação, testes unitários e integrados, configuração e implementação de lojas em todo o Brasil. Coordenador de treinamento.",
    },
    {
      role: "Analista de Sistemas",
      company: "Rede D'Or São Luiz S/A",
      period: "Maio 2016 – Fevereiro 2017",
      description:
        "Analista TOTVS Protheus dando suporte a integrações e infraestrutura do ERP em uma rede hospitalar de alta criticidade com SLA rigoroso — módulos financeiro, contábil e de gestão de pessoal.",
      highlights: [
        "Participação em projetos de migração de dados durante a incorporação de novas unidades hospitalares, mantendo a integridade dos fluxos entre sistemas.",
      ],
    },
    {
      role: "Analista de Sistemas",
      company: "Nova Geração Comestíveis LTDA (Casas Pedro)",
      period: "Março 2015 – Maio 2016",
      description:
        "Suporte ao sistema TOTVS ERP Protheus. Foco no mercado de vendas. Atendimento a usuários. Atuação em projetos de novas lojas.",
    },
    {
      role: "Analista de Sistemas",
      company: "Ambient Air",
      period: "Dezembro 2014 – Março 2015",
      description:
        "Suporte ao sistema TOTVS ERP Protheus. Foco no mercado de vendas. Atendimento a usuários.",
    },
    {
      role: "Consultor de Negócios",
      company: "Korus Consultoria",
      period: "Maio 2014 – Dezembro 2014",
      description:
        "Suporte a novos projetos do ERP Totvs e aos projetos legados. Foco no mercado de Vendas/Varejo.",
    },
    {
      role: "Técnico de TI",
      company: "DEC 11 Hardware Informática",
      period: "Setembro 2006 – Maio 2014",
      description:
        "Comecei como estagiário e fui efetivado. Suporte técnico para um grupo de 12 lojas de produtos de tecnologia (placas-mãe, processadores, armazenamento, roteadores e muito mais). Aqui começou minha carreira em ERP, onde pude realizar a primeira implantação de um sistema TOTVS Protheus.",
    },
  ],
  education: [
    {
      school: "Universidade Federal Fluminense (UFF)",
      degree: "Tecnologia em Sistemas para Computação",
      note: "Incompleto — interrompido no último período, com TCC concluído.",
      period: "Agosto 2013 – Maio 2021",
    },
    {
      school: "Escola Técnica Electra",
      degree: "Técnico em Informática (Ensino Médio Técnico)",
      note: "Concluído em dezembro de 2005.",
      period: "Agosto 2004 – Dezembro 2005",
    },
  ],
  stackGroups: [
    {
      title: "APIs & Integração",
      items: [
        "REST",
        "Webhooks",
        "EDA",
        "Integrações com ERPs e plataformas externas",
        "Contratos de API para parceiros",
      ],
    },
    {
      title: "Nuvem",
      items: [
        "AWS — EC2 · S3 · RDS · Lambda · ECS · SNS · SQS",
        "Azure (fundamentos)",
        "GCP (fundamentos)",
      ],
    },
    {
      title: "DevOps",
      items: [
        "Git",
        "Maven",
        "Docker",
        "CI/CD — Jenkins & GitHub Actions",
        "Kubernetes (fundamentos)",
        "Terraform (fundamentos)",
      ],
    },
    {
      title: "Bancos de Dados",
      items: [
        "MS SQL Server",
        "MySQL",
        "Redis",
        "Modelagem relacional e migrações",
        "Ajuste de performance e cache",
      ],
    },
    {
      title: "Observabilidade",
      items: ["Grafana", "Análise de logs", "Alertas automatizados"],
    },
    {
      title: "Linguagens & Frameworks",
      items: ["Java (Spring Boot, Spring Data)", "Node.js", "NestJS", "JavaScript"],
    },
  ],
  practices: [
    "TDD (JUnit, Jest)",
    "Microsserviços",
    "Arquitetura Clean",
    "SOLID",
    "Design Patterns",
    "Squads multifuncionais",
  ],
  interests: [
    "Tecnologias emergentes em desenvolvimento web, backend, IA e computação em nuvem.",
    "Possuo interesses em música, natureza, esportes e aprender novos idiomas. Gosto de explorar trilhas, cachoeiras e praias.",
  ],
  awards: [
    "AWS Certified Solutions Architect – Associate (SAA-C03)",
    "AWS Certified Cloud Practitioner (CLF-C02)",
    "Modelagem de Processos com Bizagi (BPMN)",
    "Totvs Formação – Programação Advpl",
    "Capacitação no ERP Totvs Microsiga Protheus: Configurador",
    "Capacitação no ERP Totvs Microsiga Protheus: Arquitetura e Instalação",
    "Certificação Microsoft 70-290 MCP Windows Server 2003",
  ],
  ui: {
    docTitle: "Marcos Ramos · Desenvolvedor Backend",
    language: "Idioma",
    navLabel: "Seções do currículo",
    theme: "Tema",
    darkMode: "Modo escuro",
    lightMode: "Modo claro",
    backToTop: "Voltar ao topo",
    skillsLanguages: "Linguagens, Frameworks & Ferramentas",
    skillsStack: "Stack Tecnológica",
    skillsPractices: "Práticas",
    experienceTitle: "Experiência",
    educationTitle: "Formação",
    skillsTitle: "Habilidades",
    interestsTitle: "Interesses",
    awardsTitle: "Certificações & Reconhecimentos",
    contactTitle: "Contato",
    contactIntro:
      "Aberto a novas oportunidades e boas conversas sobre backend, APIs, integrações e nuvem. A forma mais rápida de falar comigo é por e-mail.",
    contactEmailLabel: "Enviar e-mail",
    builtWith: "Construído com Next.js, Tailwind CSS & Canvas rain",
  },
};

export default pt;
