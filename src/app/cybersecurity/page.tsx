'use client';

import Link from 'next/link';
import { COURSES } from '@/helpers/courses';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const assetInventory = [
  { component: 'VMware Workstation', role: 'Hypervisor', config: 'Version 17.5.2 used on a Windows 11 Pro host' },
  { component: 'pfSense', role: 'Firewall and router', config: 'LAN gateway 192.168.10.1/24; WAN connected through VMware NAT' },
  { component: 'Kali Linux', role: 'Authorized attack workstation', config: 'Connected to 192.168.10.0/24; historical examples include 192.168.10.120 and 192.168.10.133' },
  { component: 'Metasploitable', role: 'Deliberately vulnerable target', config: 'Hosts DVWA, Mutillidae, TIKIWIKI and legacy services at 192.168.20.10' },
  { component: 'Windows Server 2022', role: 'Identity and infrastructure', config: 'Active Directory Domain Services, DNS, centralized users and access; Wazuh agent name Win-Server' },
  { component: 'Windows workstation', role: 'Domain member and monitored endpoint', config: 'Domain authentication, Wazuh Agent, and Sysmon telemetry' },
  { component: 'Ubuntu server/member', role: 'Linux endpoint and/or application host', config: 'Joined to the Windows domain so authorized domain users can sign in' },
  { component: 'Wazuh', role: 'SIEM/XDR platform', config: 'Manager reachable at 192.168.10.30:1514/tcp; AES-protected agent communication' },
  { component: 'Ubuntu — Suricata', role: 'Network and endpoint monitoring', config: 'ens33 at 192.168.10.20/24; Suricata and Sysmon for Linux' },
  { component: 'Nessus', role: 'Network scanner', config: 'Scans operating systems, services, and ports to find weaknesses' },
  { component: 'OWASP Juice Shop', role: 'Modern insecure web application', config: 'Used for security trainings, awareness demos and CTFs' },
  { component: 'OWASP WebGoat', role: 'Deliberately insecure Java application', config: 'Exercises vulnerabilities common in Java-based components' },
];

const applications = [
  { target: 'DVWA', objective: 'SQL injection, file inclusion, command execution, upload handling, and authentication weaknesses' },
  { target: 'OWASP Mutillidae', objective: 'OWASP-style web vulnerabilities, SQL injection, input validation, file access, and permissions' },
  { target: 'Metasploitable', objective: 'Network discovery, legacy-service analysis, controlled exploitation, and post-exploitation observation' },
  { target: 'OWASP Juice Shop', objective: 'Modern web application and API security testing' },
  { target: 'WebGoat', objective: 'Guided OWASP vulnerability lessons' },
];

const suricataRules = [
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - UNION SELECT detected"; flow:established,to_server; http.request_body; content:"union"; nocase; content:"select"; nocase; sid:9000101; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - MySQL SLEEP detected"; flow:established,to_server; http.request_body; content:"sleep("; nocase; sid:9000103; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - MySQL BENCHMARK detected"; flow:established,to_server; http.request_body; content:"benchmark("; nocase; sid:9000104; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - information_schema enumeration"; flow:established,to_server; http.request_body; content:"information_schema"; nocase; sid:9000105; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - PostgreSQL pg_sleep detected"; flow:established,to_server; http.request_body; content:"pg_sleep("; nocase; sid:9000106; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - MySQL INTO OUTFILE file write attempt"; flow:established,to_server; http.request_body; content:"into"; nocase; content:"outfile"; nocase; distance:0; within:30; sid:9000110; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - MySQL INTO DUMPFILE file write attempt"; flow:established,to_server; http.request_body; content:"into"; nocase; content:"dumpfile"; nocase; distance:0; within:30; sid:9000111; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi BODY - MySQL LOAD_FILE filesystem read attempt"; flow:established,to_server; http.request_body; content:"load_file("; nocase; sid:9000112; rev:1;)',
  'alert http any any -> $HOME_NET any (msg:"LAB SQLi - MySQL LOAD_FILE attempt"; flow:established,to_server; http.uri; content:"load_file("; nocase; sid:9000012; rev:1;)',
  'alert tcp 192.168.20.10 any -> 192.168.10.133 8080 (msg:"LAB Possible Reverse Shell Callback to Kali"; flow:established,to_server; sid:9000020; rev:1;)',
];

export default function CybersecurityLanding() {
  const entries = (['oscp', 'oswe'] as const).map(key => [key, COURSES[key]] as const);
  const desc: Record<string, string> = {
    oscp:
      'Get hands-on experience with penetration testing and ethical hacking. Learn to identify and exploit vulnerabilities in various systems, preparing you for the OSCP certification.',
    oswe:
      'Master advanced web application security techniques. Learn to find and exploit complex vulnerabilities, enhancing your skills for the OSWE certification.',
  };

return (
    <Box sx={{
      minHeight: '100vh',
      color: 'rgba(248,250,252,0.95)',
      background: 'linear-gradient(to bottom, #0f172a, #020617 40%, #000 100%)',
      py: { xs: 4, md: 6 },
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, textAlign: 'center' }}>
          Cybersecurity
        </Typography>
        <Typography sx={{ opacity: 0.85, mb: 4, textAlign: 'center' }}>
          Practical application security, monitoring and continuous learning.
        </Typography>

        <Paper component="section" id="lab" sx={{ p: 3, mb: 4, scrollMarginTop: 90 }}>
          <Typography variant="h5" component="h2" fontWeight={800}>My Cybersecurity Laboratory</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
            Beginner&apos;s Private Cybersecurity Lab v1 · isolated from production, used only for authorized testing against deliberately vulnerable machines
          </Typography>
          <Typography sx={{ mt: 2 }}>I designed a segmented VMware lab with isolated Windows and Linux systems and vulnerable applications including DVWA, OWASP Mutillidae, Juice Shop and WebGoat. I use Kali Linux, Burp Suite, Nmap, Netcat and Metasploit for authorized testing of injection, file inclusion, authentication, permissions and input validation.</Typography>
          <Typography sx={{ mt: 2 }}>Wazuh, Sysmon and endpoint agents support investigation of suspicious processes, authentication events and network activity. I document weaknesses, root causes and remediation options, connecting offensive testing with defensive monitoring.</Typography>
          <Typography sx={{ mt: 2 }}>My learning includes OWASP-focused study, PortSwigger training and OffSec course material. The guides below are study resources.</Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" component="h3" fontWeight={800} sx={{ mb: 1 }}>High-level architecture</Typography>
            <Box sx={{
              borderRadius: 2, overflow: 'hidden', bgcolor: '#fff',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Box
                component="iframe"
                src="/diagrams/cybersecurity-lab-architecture.html"
                title="Cybersecurity lab high-level architecture diagram"
                loading="lazy"
                sx={{ width: '100%', height: { xs: 380, md: 560 }, border: 0, display: 'block' }}
              />
            </Box>
          </Box>

          <Stack spacing={1.5} sx={{ mt: 3 }}>
            <Accordion disableGutters elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, '&::before': { display: 'none' }, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>Asset inventory</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Component</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Known configuration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assetInventory.map(row => (
                      <TableRow key={row.component}>
                        <TableCell>{row.component}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>{row.config}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, '&::before': { display: 'none' }, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>Offensive workstation & vulnerability assessment</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Kali Linux is a dedicated authorized testing workstation (a customized Z Security image chosen for its tooling against Mutillidae and DVWA). Tools used or planned:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 3, py: 0 }}>
                  {[
                    'Burp Suite for intercepting and modifying web traffic',
                    'Nmap for host, port, and service discovery',
                    'Metasploit for controlled exploitation',
                    'Netcat for listeners and connectivity tests',
                    'Wireshark for packet capture and protocol analysis',
                    'Weevely for controlled web-shell exercises',
                    'BloodHound for future Active Directory security analysis',
                  ].map(tool => (
                    <ListItem key={tool} sx={{ display: 'list-item', p: 0 }}>{tool}</ListItem>
                  ))}
                </List>
                <Typography sx={{ mt: 2 }}>
                  Nessus provides vulnerability assessment separate from Kali/Metasploit testing and Wazuh monitoring:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 3, py: 0 }}>
                  {[
                    'Define an explicit allowlist of owned lab assets and take recoverable snapshots',
                    'Record the scanner host, edition, plugin-feed date, policy, and assessment date',
                    'Use non-disruptive assessment settings appropriate for fragile legacy targets; record credentialed coverage where authorized',
                    'Review findings for relevance and false positives, including plugin ID, CVE, affected service, severity, and evidence',
                    'Prioritize remediation and compare timestamps with endpoint/network telemetry where available — no automatic Nessus-to-Wazuh integration',
                    'Rescan after remediation and retain before/after evidence; never include credentials in exported documentation',
                  ].map(item => (
                    <ListItem key={item} sx={{ display: 'list-item', p: 0 }}>{item}</ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, '&::before': { display: 'none' }, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>Vulnerable applications & learning objectives</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Target</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Learning objective</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map(row => (
                      <TableRow key={row.target}>
                        <TableCell>{row.target}</TableCell>
                        <TableCell>{row.objective}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, '&::before': { display: 'none' }, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>Defensive monitoring</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Ubuntu is a domain member (authentication via Windows Server) that also hosts two distinct monitoring components: Suricata for network intrusion detection, and the Wazuh Agent, which collects Ubuntu logs and host telemetry and can forward Suricata events when configured.
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Suricata inspects traffic reaching its capture interface (ens33 at 192.168.10.20/24) and applies detection rules against activity aimed at the vulnerable applications. Its documentation still needs to confirm the capture method — hosting Suricata on Ubuntu does not automatically make it see traffic between Kali and Metasploitable, and a missing alert does not prove nothing suspicious happened.
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Wazuh centralizes security events from monitored Windows and Linux systems:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 3, py: 0 }}>
                  {[
                    'Wazuh Agent — collects configured endpoint events and sends them to the server',
                    'Wazuh server/manager — decodes received events and evaluates detection rules',
                    'Wazuh indexer — stores and indexes forwarded security data',
                    'Wazuh dashboard — interface for searching events, reviewing alerts, and investigating findings',
                  ].map(item => (
                    <ListItem key={item} sx={{ display: 'list-item', p: 0 }}>{item}</ListItem>
                  ))}
                </List>
                <Typography sx={{ mt: 2 }}>
                  Sysmon records selected Windows endpoint activity (e.g. process creation) into the Event Log, which the Wazuh Agent collects — giving a host-level perspective that complements Suricata&apos;s network view. A practical validation workflow:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 3, py: 0 }}>
                  {[
                    'Confirm the relevant agents and sensor are running',
                    'Generate a benign, recognizable event (e.g. opening Notepad on a monitored Windows endpoint)',
                    'Verify it locally, then verify its arrival in Wazuh',
                    'Separately confirm that Suricata receives the intended network traffic',
                    'Validate a known detection and follow its alert through to Wazuh',
                    'Record timestamps, affected hosts, evidence, and any visibility gaps',
                  ].map(item => (
                    <ListItem key={item} sx={{ display: 'list-item', p: 0 }}>{item}</ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, '&::before': { display: 'none' }, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>Custom Suricata rules</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ minWidth: 0 }}>
                <Box component="pre" sx={{ m: 0, p: { xs: 2, md: 3 }, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.3)', overflowX: 'auto', fontSize: '0.8rem', lineHeight: 1.7 }}>
                  <code>{suricataRules.join('\n\n')}</code>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Paper>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {entries.map(([key, course]) => (
            <Grid key={key} size={{ xs: 12, sm: 10, md: 6 }} display="flex">
              <Paper
                elevation={0}
                sx={{
                  p: 3, borderRadius: 4, bgcolor: 'rgba(2,6,23,0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  width: '100%', minHeight: 380,
                  display: 'flex', flexDirection: 'column', gap: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {course.label} : Study Guide & Roadmap
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                  {course.chapters.length ? `${course.chapters.length} chapters` : 'Chapters coming soon'}
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                  {desc[key] ?? 'Course details coming soon.'}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  {course.chapters.length ? (
                    <Link href={`/courses/${key}/1`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained">View Guide</Button>
                    </Link>
                  ) : (
                    <Button variant="outlined" disabled>Coming soon</Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}