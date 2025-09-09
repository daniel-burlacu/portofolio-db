'use client';

import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function OscpIntro() {
  return (
    <Box sx={{ color: 'rgba(203,213,225,0.9)', maxWidth: 900 }}>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
        What is Cybersecurity?
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Cybersecurity protects systems, networks, and data from unauthorized access and disruption.
        In the OSCP track we approach it from an <b>offensive</b> angle: ethically finding and
        exploiting weaknesses so they can be fixed.
      </Typography>

      <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
        Core Concepts
      </Typography>
      <List dense>
        <ListItem><ListItemText primary="CIA Triad: Confidentiality, Integrity, Availability" /></ListItem>
        <ListItem><ListItemText primary="Threats vs. Vulnerabilities vs. Risk" /></ListItem>
        <ListItem><ListItemText primary="Attack Surface & Entry Points" /></ListItem>
        <ListItem><ListItemText primary="Defense-in-Depth, Least Privilege" /></ListItem>
      </List>

      <Typography variant="h6" fontWeight={800} sx={{ mt: 2 }}>
        Penetration Testing Phases
      </Typography>
      <List dense>
        <ListItem><ListItemText primary="Recon & Enumeration" /></ListItem>
        <ListItem><ListItemText primary="Exploitation (initial foothold)" /></ListItem>
        <ListItem><ListItemText primary="Post-Exploitation (priv-esc, loot)" /></ListItem>
        <ListItem><ListItemText primary="Documentation & Reporting" /></ListItem>
      </List>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
        What You’ll Need
      </Typography>
      <List dense>
        <ListItem><ListItemText primary="Kali/Parrot VM + VPN to labs" /></ListItem>
        <ListItem><ListItemText primary="Tools: Nmap, ffuf/Feroxbuster, tmux, LinPEAS/WinPEAS, etc." /></ListItem>
        <ListItem><ListItemText primary="Strong notes (Obsidian/CherryTree/Markdown)" /></ListItem>
      </List>
    </Box>
  );
}
