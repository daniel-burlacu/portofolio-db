'use client';

import { useMemo, useState } from 'react';
import {
  Box, Container, FormControl, InputLabel, MenuItem, Paper,
  Select, Stack, Typography, Divider
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { EXPERTISE } from '@/data/profile';
import SkillRadarChart from '@/components/skills/SkillRadarChart';
import SkillStarsList from '@/components/skills/SkillStarsList';

type Skill = { name: string; stars: number };

const SKILLS: Record<'frontend' | 'backend' | 'leadership' | 'apps' | 'ai' | 'cybersecurity', Skill[]> = {
  // Initial ratings: 2 = foundational knowledge, 3 = practical experience.
  ai: [
    { name: 'AI / ML Fundamentals', stars: 2 },
    { name: 'Generative AI', stars: 3 },
    { name: 'Foundation Models', stars: 2 },
    { name: 'Amazon Bedrock', stars: 3 },
    { name: 'Prompt Engineering', stars: 3 },
    { name: 'Responsible AI', stars: 2 },
    { name: 'AI Security & Governance', stars: 2 },
    { name: 'Model Evaluation', stars: 2 },
    { name: 'RAG & Embeddings', stars: 2 },
    { name: 'Fine-tuning Concepts', stars: 2 },
    { name: 'AWS AI Services', stars: 2 },
    { name: 'SageMaker Concepts', stars: 2 },
    { name: 'AI Use Cases', stars: 3 },
  ],
  cybersecurity: [
    { name: 'OWASP Top 10', stars: 3 },
    { name: 'Web App Testing', stars: 3 },
    { name: 'Authentication & Access', stars: 3 },
    { name: 'Secure SDLC', stars: 3 },
    { name: 'Burp Suite', stars: 3 },
    { name: 'Kali Linux', stars: 3 },
    { name: 'Wazuh SIEM', stars: 3 },
    { name: 'Sysmon Telemetry', stars: 3 },
    { name: 'Nmap', stars: 3 },
    { name: 'Metasploit', stars: 3 },
    { name: 'Network Analysis', stars: 3 },
    { name: 'Vulnerability Validation', stars: 3 },
    { name: 'Security Event Analysis', stars: 3 },
    { name: 'Lab Segmentation', stars: 3 },
    { name: 'API Security', stars: 3 },
    { name: 'OSINT & Crypto Tracing', stars: 3 },
  ],
  frontend: [
    { name: 'Tailwind CSS', stars: 2 },
    { name: 'React Native', stars: 2 },
    { name: 'Mocha', stars: 3 },
    { name: 'Android', stars: 2 },
    { name: 'Redux', stars: 3 },
    { name: 'Vue', stars: 3 },
    { name: 'Angular', stars: 3 },
    { name: 'Bootstrap', stars: 3 },
    { name: 'Material UI', stars: 4 },
    { name: 'React', stars: 4 },
    { name: 'JavaScript', stars: 4 },
    { name: 'TypeScript', stars: 4 },
    { name: 'Java (FE usage)', stars: 2 },
    { name: 'Vite', stars: 4 },
  ],
  backend: [
    { name: 'Spring Boot', stars: 2 },
    { name: 'Java', stars: 3 },
    { name: 'Rust', stars: 3 },
    { name: 'NestJS', stars: 3 },
    { name: 'Next.js', stars: 3 },
    { name: 'Node.js', stars: 4 },
    { name: 'Python', stars: 3 },
    { name: 'SQL', stars: 4 },
    { name: 'JavaScript', stars: 4 },
    { name: 'TypeScript', stars: 4 },
    { name: 'ORM', stars: 3 },
    { name: 'Bash', stars: 3 },
    { name: 'Solidity', stars: 3 },
  ],
  leadership: [
    { name: 'Agile', stars: 4 },
    { name: 'Scrum', stars: 4 },
    { name: 'Kanban', stars: 2 },
    { name: 'Communication', stars: 4 },
    { name: 'Conflict Management', stars: 4 },
    { name: 'Emotional Intelligence', stars: 3 },
    { name: 'Time Management', stars: 4 },
  ],
  apps: [
    { name: 'Visual Studio Code', stars: 4 },
    { name: 'IntelliJ', stars: 2 },
    { name: 'DBeaver', stars: 3 },
    { name: 'Figma', stars: 3 },
    { name: 'AWS', stars: 3 },
    { name: 'Truffle', stars: 3 },
    { name: 'Git', stars: 3 },
    { name: 'Ganache', stars: 3 },
    { name: 'Anchor', stars: 3 },
    { name: 'Confluence', stars: 3 },
    { name: 'Jira', stars: 3 },
    { name: 'Remix', stars: 3 },
    { name: 'Solpg', stars: 2 },
  ],
};

type Category = keyof typeof SKILLS;

export default function SkillsPage() {
  const [category, setCategory] = useState<Category>('frontend');

   const items = useMemo<Skill[]>(() => {
    const list = SKILLS[category];
    return [...list].sort((a, b) => (b.stars - a.stars) || a.name.localeCompare(b.name));
  }, [category]);

  const handleChange = (e: SelectChangeEvent<Category>) => {
    setCategory(e.target.value as Category);
  };

  // Fixed box size (both panels use the SAME size)
 const BOX_W = 560;
 const BOX_H = 360;

  return (
    <Container sx={{ py: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: 900 }}>Skills & Expertise</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        {EXPERTISE.map(item => <Paper key={item.title} sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" fontWeight={700}>{item.title}</Typography>
          <Typography sx={{ mt: 1 }}>{item.description}</Typography>
        </Paper>)}
      </Box>
      <Typography variant="h5" component="h2">Skill Radar</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="cat-label">Category</InputLabel>
          <Select labelId="cat-label" label="Category" value={category} onChange={handleChange}>
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="leadership">Flow &amp; Leadership</MenuItem>
            <MenuItem value="apps">Apps / Tools</MenuItem>
            <MenuItem value="ai">AI</MenuItem>
            <MenuItem value="cybersecurity">Cybersecurity</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ opacity: 0.8 }}>
          Showing {items.length} skills • Radar shows the top {Math.min(items.length, 8)} • 5★ max
        </Typography>
      </Stack>

      {category === 'ai' && (
        <Typography color="text.secondary">
          AWS Certified AI Practitioner topics: AI and ML fundamentals, generative AI,
          foundation model applications, responsible AI, and security, compliance and governance.
        </Typography>
      )}
      {category === 'cybersecurity' && (
        <Typography color="text.secondary">
          Application security, authorized lab testing, secure development and defensive monitoring.
        </Typography>
      )}

      {/* Two equal, fixed-size boxes; wrap on small screens */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Left: Radar box (fixed size) */}
       <Paper sx={{ width: BOX_W, maxWidth: '100%', height: BOX_H, p: 2, display: 'flex' }}>
          <SkillRadarChart items={items} max={5} topN={8} />
        </Paper>

        {/* Right: Detailed ratings (fixed size) */}
     <Paper
  sx={{
    width: BOX_W, maxWidth: '100%',
    height: BOX_H,
    p: 2,
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr', // title, divider, list
    rowGap: 0,                         // no extra gap; divider controls spacing
    minWidth: 0,
  }}
>
  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
    Detailed ratings
  </Typography>

  <Divider
    sx={{
      my: 0.5,                         // bring list closer to the title
      borderColor: 'divider',
      opacity: 0.5,                    // subtle line; tweak to taste
    }}
  />

  {/* List fills the remaining space and scrolls */}
  <SkillStarsList items={items} />
</Paper>
      </Box>
    </Container>
  );
}
