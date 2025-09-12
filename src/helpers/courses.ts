// lib/courses.ts
export type CourseKey = 'oscp' | 'oswe' | 'solana' | 'ethereum' | 'polygon'; // add your keys here

export const OSCP_CHAPTERS = [
  'Introduction to Cybersecurity',
  'Report Writing for Penetration Testers',
  'Information Gathering',
  'Vulnerability Scanning',
  'Introduction to Web Applications',
  'Common Web Application Attacks',
  'SQL Injection Attacks',
  'Client-Side Attacks',
  'Locating Public Exploits',
  'Fixing Exploits',
  'Antivirus Evasion',
  'Password Attacks',
  'Windows Privilege Escalation',
  'Linux Privilege Escalation',
  'Advanced Tunneling',
  'The Metasploit Framework',
  'Active Directory: Introduction and Enumeration',
  'Attacking Active Directory Authentication',
  'Lateral Movement in Active Directory',
];

export const SOLANA_CHAPTERS = [
  'Introduction to Blockchain and Solana',
  'Setting Up Your Development Environment',
  'Solana Architecture and Key Concepts',
  'Creating and Managing Wallets',
  'Understanding Solana Programs',
  'Building Your First Solana Program',
  'Deploying Programs on the Solana Network',
  'Interacting with Solana Programs',
  'Using Solana CLI and SDKs',
  'Developing Decentralized Applications (DApps)',
  'Smart Contract Security Best Practices',
  'Testing and Debugging Solana Programs',
  'Optimizing Performance on Solana',
  'Exploring Solana Ecosystem Tools',
];

export const ETHEREUM_CHAPTERS = [
  'Introduction to Blockchain and Ethereum',
  'Setting Up Your Development Environment',
  'Ethereum Architecture and Key Concepts',
  'Creating and Managing Wallets',
  'Understanding Smart Contracts',
  'Building Your First Smart Contract',
  'Deploying Smart Contracts on the Ethereum Network',
  'Interacting with Smart Contracts',
  'Using Ethereum CLI and SDKs',
  'Developing Decentralized Applications (DApps)',
  'Smart Contract Security Best Practices',
  'Testing and Debugging Smart Contracts',
  'Optimizing Performance on Ethereum',
  'Exploring Ethereum Ecosystem Tools',
];

export const POLYGON_CHAPTERS = [
  'Introduction to Blockchain and Polygon',
  'Setting Up Your Development Environment',
  'Polygon Architecture and Key Concepts',
  'Creating and Managing Wallets',
  'Understanding Smart Contracts on Polygon',
  'Building Your First Smart Contract on Polygon',
  'Deploying Smart Contracts on the Polygon Network',
  'Interacting with Smart Contracts on Polygon',
  'Using Polygon CLI and SDKs',
  'Developing Decentralized Applications (DApps) on Polygon',
  'Smart Contract Security Best Practices for Polygon',
  'Testing and Debugging Smart Contracts on Polygon',
  'Optimizing Performance on Polygon',
  'Exploring Polygon Ecosystem Tools',
];

export const COURSES: Record<CourseKey, { label: string; chapters: string[] }> = {
  oscp: { label: 'OSCP', chapters: OSCP_CHAPTERS },
  oswe: { label: 'OSWE', chapters: [] },
  solana: { label: 'Solana', chapters: SOLANA_CHAPTERS },
  ethereum: { label: 'Ethereum', chapters: ETHEREUM_CHAPTERS },
  polygon: { label: 'Polygon', chapters: POLYGON_CHAPTERS },
};

export function courseKeys(): CourseKey[] {
  return Object.keys(COURSES) as CourseKey[];
}

export function pad2(n: number) {
  return String(n).padStart(2, '0');
}
