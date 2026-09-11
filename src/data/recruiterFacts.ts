import { PROFILE_SECTIONS, EXPERTISE } from "./profile";
export const RECRUITER_FACTS = `
LATEST EXPERIENCE AND QUALIFICATIONS
- Gofore: AI Expert / Cybersecurity Expert / Senior Software Developer, 2026–present, remote.
- Current project: Finnish Ministry of Finance; secure budget-planning and public budget information systems using TypeScript, React, Node.js, Fastify, PostgreSQL and Azure.
- Anivera: CEO / CTO, Web3, 2024–ongoing, freelance side project for animal welfare and environmental stewardship.
- KronosVera: CEO / CTO, 2024–ongoing, freelance lifestyle-tracking side project; React Native, Expo, Node.js, PostgreSQL, Bedrock and AWS production infrastructure.
- AWS Certified AI Practitioner. AWS Solutions Architect knowledge; do not claim a Solutions Architect certification or an OffSec certification.
- Verify AWS Certified AI Practitioner certification: https://www.credly.com/badges/52baf543-b18a-4b55-ab8c-400289c7bff0/public_url
- EUPM Moldova workshops: 2 April 2025, cryptocurrencies in illicit political financing; 14–15 May 2025, OSINT-Crypto-Dark Web Lab. Two letters of appreciation from Head of Mission Cosmin Dinescu, available at /#appreciation.
- Education: Computer Science, Alexandru Ioan Cuza University, 2008–2012; Turbin3 2023 and 2024–2025; Encode Club Ethereum and ZK bootcamps, 2022.
- Languages: Romanian native, English C2, Spanish B2, Swedish B1.

CANDIDATE
Name: Daniel Burlacu
Location: Spain (open to remote)
GitHub: https://github.com/daniel-burlacu
Email: daniel.burlacu1983@yahoo.se

CORE SKILLS
- Languages: TypeScript/JavaScript, Rust, SQL, Java, Python basics, KSH, Bash, HTML/CSS
- Frontend: React, Vite, Next.js, MUI, Chakra UI, Tailwind, Framer Motion
- Backend: Node.js/NestJS, REST, WebSockets, Redis basics, PostgreSQL, Prisma basics, TypeORM basics
- Web3: Solana (Anchor, PDAs, ATAs, CPI), Ethereum ( Truffle, Ganache ) basics
- DevOps/Cloud: Docker, GitHub Actions; AWS architecture knowledge, EC2, ECR, RDS, Route 53, Lambda, Bedrock; Azure
- Security/Forensics: OWASP Top 10, vulnerability validation, secure SDLC, Wazuh, Sysmon, Kali Linux, Burp Suite, Nmap; blockchain intelligence and OSINT
- Teaching/Content: Workshops & labs on crypto tracing, dark-web investigations

HIGHLIGHT PROJECTS
- Anivera: Decentralized veterinary data platform on Solana.
  • On-chain medical records, NFTs for vaccination/ownership, validator DAO model.
  • Tech: Rust (Anchor), TypeScript/React, NestJS, PDAs/ATAs, program design & tests.
- Inspector Seppo AI (Gofore): AWS Bedrock (Anthropic) lambda integration for an AI-assisted product.
- CRUD App on Solana: Program + React front-end, journaling features, theming.

WHAT I’M LOOKING FOR
- Roles: Cybersecurity / Application Security, Senior Software Developer, AI, Cloud, and Web3 roles
- Value to team: System design + hands-on delivery. Can lead features end-to-end (frontend, backend, smart contracts).
- Strengths for HR: clear communication, product focus, learns fast, ships production-ready code, good at docs/demos.

FAQ HINTS
- Solana experience? Yes—Anchor programs, PDAs/ATAs, CPI, dev/test on Devnet; NFT minting flows, validators/DAO concepts.
- Security/Compliance? Familiar with tracing crypto transactions, OSINT, training analysts; hands-on application security testing and secure-development practices.
- Frontend polish? Yes—MUI/Chakra/Tailwind; animations with Framer Motion; responsive dashboards; good UX sense.
- Willing to learn new stacks? Absolutely—comfortable jumping into new domains quickly.

HOW WOULD I DESCRIBE MYSELF ?
- I am a passionate and dedicated software engineer with a strong interest in blockchain technology and cybersecurity.
- I enjoy learning new technologies and frameworks, and I am always looking for ways to improve my skills and knowledge.
- I am a team player and I enjoy collaborating with others to solve complex problems and deliver high-quality solutions.
- I am also a good communicator and I am able to explain technical concepts to non-technical stakeholders.

HOBBIES
- I have many hobbies and interests outside of work, here are some of them:
- Beside coding, blockchain and security, I am a passionate motorcycle rider and I like to do my own maintenance.
- I have trained with some of the top riders in the world, like Hector Garzo, Manu Gonzalez, Ivan Ortola, Quartararo, and others.
- My seccond passion is my dog, I have an GSD named Thor who is my best friend and companion.
- I also enjoy music, I play the guitar, from time to time I like to practice and get lost in the melodies. My favorite genres are rock and blues.
- Another hobby of mine is sailing, I have been inloved with the sea since I was a child, and I enjoy spending time on a boat, feeling the wind and the waves.
- I have the PAYANT license and I have sailed in the Mediterranean sea.
- When it comes to flying, I would like to learn how to fly a plane, but till I get enough funds I practice with my drone, I have a Autel Robotics 2, and I like to capture aerial images and videos.

LINKS TO SURFACING
- GitHub portfolio & repos > https://github.com/daniel-burlacu
- LinkedIn > https://www.linkedin.com/in/daniel-burlacu/
- Personal website (in progress) > https://danielburlacu.xyz
- KronosVera > https://www.kronosvera.xyz/
- KronosVera Android app > https://play.google.com/store/apps/details?id=com.kronosvera.app&hl=en
- discord > daniel-burlacu

PROFILE
${PROFILE_SECTIONS.map(section => `${section.title}: ${section.paragraphs.join(" ")}`).join("\n\n")}
${EXPERTISE.map(item => `${item.title}: ${item.description}`).join("\n")}
`;
