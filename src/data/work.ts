export type Project = { 
  title: string; 
  company?: string; 
  summary: string; 
  tags?: string[]; 
  link?: string
  github?: string;
  android?: string;
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
  "year": 2026,
  "items": [
    {
      "title": "AI Expert / Cybersecurity Expert / Senior Software Developer",
      "company": "Gofore",
      "summary": "2026–present · Madrid, remote. Designed a segmented VMware cybersecurity lab with Windows and Linux endpoints, DVWA, Mutillidae, Juice Shop and WebGoat. Investigated endpoint telemetry and performed authorized testing of injection, file inclusion, authentication, permissions and input validation.",
      "tags": [
        "Kali Linux",
        "Burp Suite",
        "Nmap",
        "Metasploit",
        "Wazuh",
        "Sysmon",
        "OWASP",
        "VMware"
      ],
      "workType": [
        "Remote"
      ]
    },
    {
      "title": "Senior Software Engineer — Finnish Ministry of Finance",
      "company": "Gofore · Current project",
      "summary": "Secure framework and budget-planning systems and a public government budget publishing and visualization platform. Frontend, backend and cloud delivery; authentication, authorization, API security, secure file handling, secrets management, dependency remediation, automated tests and code review.",
      "tags": [
        "TypeScript",
        "React",
        "Node.js",
        "Fastify",
        "PostgreSQL",
        "Azure",
        "Secure SDLC"
      ],
      "workType": [
        "Remote"
      ]
    }
  ]
},
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
        title: "EUPM — OSINT-Crypto-Dark Web Lab",
        summary: "14–15 May 2025 · Chișinău, Moldova. Hands-on workshop on cryptocurrencies, dark web research tools, marketplaces and investigative exercises. Recognized by an EUPM letter of appreciation.",
        tags: ["Training", "Blockchain", "Investigation", "Presentation", "Workshop","Crypto Forensics", "Sparrow","MetaMask","Explorers","Solana","Bitcoin","Ethereum", "Monero", "Maltego", "Chainalysis" ,"Etherscan","Blockchain Analysis"],
        github:"https://github.com/daniel-burlacu/Workshop-Crypto-In-Illicit-Political-Financing",
        language: ["English","Swedish","Romanian"],
        workType:["Remote","Presential"]
      },
      {
        title: "Workshop — Crypto in Illicit Political Financing",
        summary: "2 April 2025 · Chișinău, Moldova. EUPM workshop on the use of cryptocurrencies in illicit political financing: Bitcoin and Ethereum tracing, wallet analysis, blockchain explorers and suspicious on-chain activity. Recognized by an EUPM letter of appreciation.",
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
  "title": "Anivera — CEO / CTO, Web3",
  "link": "https://www.anivera.xyz/",
  "company": "Freelance · Side project",
  "summary": "2024–ongoing · Valencia. Lead product and technical strategy for a blockchain platform supporting animal welfare and environmental stewardship, with secure data and decentralized workflows for veterinarians, researchers, shelters, pet owners and conservationists.",
  "tags": [
    "TypeScript",
    "Rust",
    "FastAPI",
    "Next.js",
    "React",
    "MUI",
    "Chakra UI",
    "Anchor",
    "Solana"
  ]
},
{
  "title": "KronosVera — CEO / CTO",
  "link": "https://www.kronosvera.xyz/",
  "company": "Freelance · Side project",
  "summary": "2024–ongoing · Valencia. Founded a lifestyle-tracking product connecting habits, wellbeing, energy and recovery. Led roadmap, architecture and production delivery, including the mobile app, backend, data model, AI lifestyle insights and AWS infrastructure.",
  "tags": [
    "React Native",
    "Expo",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Amazon Bedrock",
    "Docker",
    "AWS EC2",
    "ECR",
    "RDS",
    "Route 53",
    "Nginx",
    "GitHub Actions"
  ],
  "android": "https://play.google.com/store/apps/details?id=com.kronosvera.app&hl=en"
},
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
        title: "Technical Team Lead",
        company: "HarteHanks",
        summary: "Automation on RHEL; data acquisition/validation pipelines.",
        tags: ["KSH", "Perl", "Oracle","SQL","Linux","DataBase Architecture/Modelling","Leadership",
          "Communication","Conflict Management"],
        link:"https://www.hartehanks.com/",
        language:["English","Romanian"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2014,
    items: [
      {
        title: "Technical Team Lead",
        company: "HarteHanks",
        summary: "Lead automation for IBM, Gartner, VMware, Symantec, etc.",
        tags: ["KSH", "Perl", "Oracle","SQL","Linux","DataBase Architecture/Modelling","Leadership",
          "Communication","Conflict Management"],
        link:"https://www.hartehanks.com/",
        language:["English","Romanian"],
        workType:["Remote","Presential"]
      },
    ],
  },
  {
    year: 2013,
    items: [
      {
        title: "Technical Team Lead",
        company: "HarteHanks",
        summary: "CRUD automation & client data pipelines.",
        tags: ["Perl", "Oracle", "Linux","SQL","KSH"],
        link:"https://www.hartehanks.com/",
        language:["English","Romanian"],
        workType:["Presential"]
      },
    ],
  },
  {
    year: 2012,
    items: [
      {
        title: "Technical Team Lead",
        company: "HarteHanks",
        summary: "Initial role; built data processing foundations.",
        tags: ["English","Romanian","Presential","Perl", "SQL", "Linux"],
        link:"https://www.hartehanks.com/",
        language:["English","Romanian"],
        workType:["Presential"]
      },
    ],
  },
];
