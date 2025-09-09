// lib/courses.ts
export type CourseKey = 'oscp' | 'oswe';

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

export const COURSES: Record<CourseKey, { label: string; chapters: string[] }> = {
  oscp: { label: 'OSCP', chapters: OSCP_CHAPTERS },
  oswe: { label: 'OSWE', chapters: [] },
};

export function courseKeys(): CourseKey[] {
  return Object.keys(COURSES) as CourseKey[];
}

export function pad2(n: number) {
  return String(n).padStart(2, '0');
}
