export type Project = { 
  title: string; 
  company?: string; 
  summary: string; 
  tags?: string[]; 
  link?: string
  github?: string;
  language?: string[];
  workType?: string[]; 
};

export type YearBlock = { year: number; items: Project[] };

export type TestimonialImage = {
  src: string;          // e.g. "/testimonials/seppo-1.jpg"
  alt?: string;
  caption?: string;
  width?: number;       // optional, if you know it
  height?: number;      // optional
};



export const WORK: YearBlock[] = [
  {
    year: 2025,
    items: [
      {
        title: "Govstack Sandbox Maintanance & Dev",
        company: "Gofore FI/ES",
        summary: " GovStack accelerates the digital transformation of government services, utilising recognized international best practices for public sector digitization.",
        tags: ["Typescript", "MUI", "REACT", "Node.JS","Router", "Figma", "UI/UX","Docker","Agile","Scrum"],
        link: "https://sandbox.govstack.global/",
        github: "https://github.com/GovStackWorkingGroup",
        language: ["English","Spanish"],
        workType:["Remote"]
      },
      {
        title: "Software Development Cookbook",
        company: "Gofore FI/ES",
        summary: "Task force creates internal material collected in one place to help developers and technical persons in going and existing in customer project. ",
        tags: ["Confluence", "Documentation", "Technical-Documentation", "Ways Of Working - Development","Communication"],
        language: ["English","Spanish"],
        workType:["Remote"]
      },
      {
        title: "Workshop — Crypto in Illicit Political Financing (hands-on)",
        summary: "Hands-on training for analysts: Tor/DNMs, BTC/Monero tracing, OPSEC.",
        tags: ["Training", "Blockchain", "Investigation", "Presentation", "Workshop","Crypto Forensics", "Sparrow","MetaMask","Explorers","Solana","Bitcoin","Ethereum", "Monero", "Maltego", "Chainalysis" ,"Etherscan","Blockchain Analysis"],
        github:"https://github.com/daniel-burlacu/Workshop-Crypto-In-Illicit-Political-Financing",
        language: ["English","Swedish","Romanian"],
        workType:["Remote","Presential"]
      },
      {
        title: "Workshop — Crypto in Illicit Political Financing",
        summary: "BTC & Ethereum tracing with Sparrow, MetaMask, explorers; practical labs.",
        tags: ["Blockchain", "Investigation", "Presentation", "Workshop","Crypto Forensics"],
        github:"https://github.com/daniel-burlacu/Workshop-Crypto-In-Illicit-Political-Financing",
        language: ["English","Swedish","Romanian"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        title: "Gofore — Inspector Seppo / Hohto CV Checker",
        company: "Gofore FI/ES",
        summary: "AI-enhanced CV quality checks & multilingual pitch gen with AWS Bedrock.",
        tags: ["TypeScript", "AWS","React", "MUI", "AI Prompting", "AI Integration","BedRock","Anthropic","Docker", 
          "GIT","Figma", "UI/UX", "Emotional Intelligence","LLM","Personal Time Tracking","Self-Management"],
        link: "https://inspector-seppo.gofore.com",
        language:["English","Spanish"],
        workType:["Remote"]
      },
      {
        title: "Solana Ark Foundation",
        company:"Startup",
        summary: "On-chain vet data, PDAs, NFTs for vaccination, validators’ treasury.",
        tags: ["Solana", "Anchor", "Nest.js", "Vite", "MUI", "Architecture","Mocha","Rust","Presentation","AI Script Manipulation","ORM","SQL","GIT",
          "Docker","BluePrint","Figma","UI/UX","CyberSecurity","Product Owner"],
        link: "https://www.solana-ark-foundation.xyz/",
        github:"https://github.com/daniel-burlacu/solana_ark_foundation_blinks",
        language:["English","Romanian"],
        workType:["Remote"]
      },
      {
        title: "3 Step IT — Asset Management LC",
        company: "Gofore",
        summary: "Lifecycle mgmt for leased devices: registration, delivery, end-of-lease.",
        tags: ["Java", "JavaScript","NodeJS","Spring Boot", "Vue", "PostgreSQL", "Docker","JEST","Srum","Agile"],
        language:["English","Spanish"],
        workType:["Remote"]
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        title: "Resourcing Helper — Staffing Platform",
        company: "Gofore",
        summary: "Infra on AWS, data ingestor, server architecture; improved staffing flows.",
        tags: ["AWS CDK", "Node.js", "React", "TypeScript","Scrum","Agile","GIT"],
        language:["English","Spanish"],
        workType:["Remote"]
      },
      {
        title: "Cardiff University — HateLab (finalisation)",
        summary: "Data science/ML engineering; dashboard & analysis tooling.",
        tags: ["TypeScript", "Python", "AWS", "Data","React","Node.JS","MUI","Scrum","Agile"],
        link: "https://hatelab.net/",
        language:["English","Spanish"],
        workType:["Remote"]
      },
      {
        title: "The Risk Protocol",
        summary: "TradingView integration, gasless (Biconomy EOA), ZK-Rollups POC.",
        tags: ["Solidity", "ZK-Rollups", "React", "MUI","Typescript","Node.JS","Smart Contracts","Blockchain","Cryptocurrency","DeFi",
          "Web3","Truffle", "Ganache","Ethers.js","MetaMask","OpenZeppelin","Remix","IPFS","Mocha","Chai"],
        link:"https://www.riskprotocol.io/",
        language:["English","Spanish"],
        workType:["Remote"]
      },
      {
        title: "Prototyping Move SDK App",
        summary: "QA Engineer - GPS Data Collection and Analysis Application.",
        tags: ["Android", "Emotional Intelligence", "Intellij Idea", "MoveSDK","Personal Time Tracking",
          "React-Native"
        ],
        language:["English","Spanish"],
        workType:["Remote"]
      },
    ],
  },
  {
    year: 2022,
    items: [
      {
        title: "Behind Masks Society — Cofounder & CTO",
        summary: "NFT art & game integrations; slot machine, escape room, giveaways.",
        tags: ["Solidity","Ethereum","Polygon", "NFT-Creation","NFT", "React", "Web3","Truffle","Ganache","Ethers.js","MetaMask","OpenZeppelin","Remix",
           "IPFS","Mocha","Chai","Pinata","UI/UX","Figma","DAO","Cryptocurrency","Blockchain","Smart Contracts","JavaScript","Product Owner"],
        github:"https://github.com/daniel-burlacu/behindmaskssociety",
        language:["English","Spanish","Romanian"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2021,
    items: [
      {
        title: "Capgemini — Medlife (continues into 2022)",
        summary: "Private health insurance platform; deliver, debug, integrate, test.",
        tags: ["Leadership","Communication","Conflict Management","Java", "Spring Boot","Docker","DBeaver","SQL","Postman","Agile","Scrum","Jira","Confluence","GIT","CI/CD", "Jenkins"],
        link:"https://www.capgemini.com/",
        language:["English","Spanish"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2020,
    items: [
      {
        title: "Capgemini — Tech Lead (start)",
        summary: "Tech leadership, planning & delivery for Medlife project.",
        tags: ["Leadership","Communication","Conflict Management","Java", "Spring Boot","Docker","DBeaver","SQL","Postman","Agile","Scrum","Jira","Confluence","GIT","CI/CD", "Jenkins"],
        link:"https://www.capgemini.com/",
        language:["English","Spanish"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2019,
    items: [
      {
        title: "Freelancer — Full-Stack",
        summary: "Websites & presentation sites for diverse clients.",
        tags: ["Laravel", "PHP", "JavaScript", "PostgreSQL","Linux","GIT","Docker","UI/UX", "DBeaver"],
        language:["English","Spanish","Romanian"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2018,
    items: [
      {
        title: "Freelancer — Full-Stack",
        summary: "Full-stack builds; infra & DX improvements.",
        tags: ["JavaScript","PHP","Oracle","Linux","DataBase Architecture/Modelling","Consulting"],
        language:["English"],
        workType:["Remote"]
      },
    ],
  },
  {
    year: 2017,
    items: [
      {
        title: "Freelancer — Senior Developer ",
        summary: "Start of freelance period; web apps, data systems, consulting.",
        tags: ["JavaScript","PHP","Oracle","Linux","DataBase Architecture/Modelling","Consulting"],
        language:["English"],
        workType:["Remote"]
      },
      {
        title: "Software Developer",
        company: "HarteHanks UK",
        summary: "Global database for APAC/EMEA/LAD/NA; geo & phone code accuracy.",
        tags: ["Perl","Java", "Oracle", "PL/SQL", "Linux","KSH","DataBase Architecture/Modelling","Consulting"],
        link: "https://www.hartehanks.com/",
        language:["English"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2016,
    items: [
      {
        title: "Software Developer ",
        company: "HarteHanks UK",
        summary: "Data systems engineering; client collaboration across regions.",
        tags:  ["Perl","Java", "Oracle", "PL/SQL", "Linux","KSH","DataBase Architecture/Modelling"],
        link:"https://www.hartehanks.com/",
        language:["English"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2015,
    items: [
      {
        title: "Solution DB Team Lead",
        company: "XEROX",
        summary: "Automation on RHEL; data acquisition/validation pipelines.",
        tags: ["KSH", "Perl", "Oracle","SQL","Linux","DataBase Architecture/Modelling","Leadership",
          "Communication","Conflict Management"],
        link:"https://www.xerox.com/en-us",
        language:["English","Romanian"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2014,
    items: [
      {
        title: "Solution DB Team Lead",
        company: "XEROX",
        summary: "Lead automation for IBM, Gartner, VMware, Symantec, etc.",
        tags: ["KSH", "Perl", "Oracle","SQL","Linux","DataBase Architecture/Modelling","Leadership",
          "Communication","Conflict Management"],
        link:"https://www.xerox.com/en-us",
        language:["English","Romanian"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2013,
    items: [
      {
        title: "Analyst Programmer-senior",
        company: "XEROX",
        summary: "CRUD automation & client data pipelines.",
        tags: ["Perl", "Oracle", "Linux","SQL","KSH"],
        link:"https://www.xerox.com/en-us",
        language:["English","Romanian"],
        workType:["Presential"]
      },
    ],
  },
  {
    year: 2012,
    items: [
      {
        title: "Analyst Programmer-junior",
        company: "XEROX",
        summary: "Initial role; built data processing foundations.",
        tags: ["English","Romanian","Presential","Perl", "SQL", "Linux"],
        link:"https://www.xerox.com/en-us",
        language:["English","Romanian"],
        workType:["Presential"]
      },
    ],
  },
];
