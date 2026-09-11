'use client';

import Image from 'next/image';
import Link from 'next/link';
import { keyframes } from '@mui/system';              // <-- add this
import { Paper, Stack, Box, Typography, Button, Chip, Container, Divider } from '@mui/material';
import { PROFILE_SECTIONS, EXPERTISE } from '@/data/profile';
import AppreciationLetters from '@/components/AppreciationLetters';
import DownloadIcon from '@mui/icons-material/Download';
import LaunchIcon from '@mui/icons-material/Launch';
// little animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const floaty = keyframes`
  0%,100% { transform: translateY(0) }
  50% { transform: translateY(-3px) }
`;

export default function HomePage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 3, md: 5 }, '& .MuiTypography-body1': { lineHeight: 1.75 } }}>
      <Stack spacing={3.5}>
        <Paper sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">

            {/* Animated circular avatar */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: 140, sm: 180 },
                height: { xs: 140, sm: 180 },
                borderRadius: '50%',
                flexShrink: 0,
                // subtle float
                animation: `${floaty} 6s ease-in-out infinite`,
                // rotating gradient ring (pseudo element so the image doesn't rotate)
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -4,                      // ring thickness
                  borderRadius: '50%',
                  background: 'conic-gradient(#22e6a1, #9b8cff, #22e6a1)',
                  animation: `${spin} 12s linear infinite`,
                  filter: 'blur(0.2px)',          // tiny soft edge
                  zIndex: 0,
                },
              }}
            >
              {/* Inner circle that holds the image */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid',
                  borderColor: 'primary.main',
                  zIndex: 1,
                  backgroundColor: 'background.default',
                }}
              >
                <Image
                  src="/profile-daniel.jpg"
                  alt="Daniel Burlacu"
                  fill
                  sizes="(max-width: 600px) 140px, 180px"
                  priority
                  style={{
                    objectFit: 'cover',          // <-- prevents stretching
                    objectPosition: 'center',    // tweak if you want to bias top/left/right
                  }}
                />
              </Box>
            </Box>
            {/* Intro */}
            <Stack spacing={1.25} sx={{ minWidth: 0 }}>
              <Typography variant="h3" component="h1" fontWeight={900}>Daniel Burlacu</Typography>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon />}
                component="a"
                href="/cv/Daniel_Burlacu_CV.docx"
                download
                sx={{ alignSelf: 'flex-start' }}
              >
                Download CV (Word)
              </Button>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Senior Software Developer | Cybersecurity | AI | Blockchain | Cloud Architecture
              </Typography>

              <Typography sx={{ opacity: 0.9 }}>
                I build secure software, cloud systems and AI-enabled products. My experience combines
                full-stack engineering and technical leadership with practical cybersecurity testing,
                blockchain intelligence and Web3 development.
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Based in Spain. Currently working at Gofore, with Anivera and KronosVera as side projects.
              </Typography>
              <Chip
                label="AWS Certified AI Practitioner"
                component="a"
                href="https://www.credly.com/badges/52baf543-b18a-4b55-ab8c-400289c7bff0/public_url"
                target="_blank"
                rel="noopener noreferrer"
                clickable
                color="primary"
                variant="outlined"
                sx={{ alignSelf: 'flex-start', maxWidth: '100%' }}
              />
              <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1.5} sx={{ pt: 1 }}>
                <Button component={Link} href="/skills" variant="contained">View Skills</Button>
                <Button component={Link} href="/work" variant="outlined">See Projects</Button>
                <Button component="a" href="#appreciation">Appreciation Letters</Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        <Paper component="section" sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" fontWeight={800} sx={{ mb: 2 }}>What I Do</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
            {EXPERTISE.map(item => <Box key={item.title}>
              <Typography component="h3" fontWeight={700}>{item.title}</Typography>
              <Typography color="text.secondary">{item.description}</Typography>
            </Box>)}
          </Box>
        </Paper>
        <Paper component="section" sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" fontWeight={800} sx={{ mb: 2 }}>Current Focus</Typography>
          <Stack spacing={2}>
            <Typography><b>Gofore — AI Expert / Cybersecurity Expert / Senior Software Developer (2026–present).</b> Secure software delivery and an isolated laboratory for offensive and defensive security testing.</Typography>
            <Typography><b>Finnish Ministry of Finance — current project.</b> Secure systems for framework and budget planning, including a public platform for publishing and visualizing government budget information. TypeScript, React, Node.js, Fastify, PostgreSQL and Azure.</Typography>
            <Typography><b>Anivera — CEO / CTO, Web3 (2024–ongoing, side project).</b> Product and technical strategy for animal welfare and environmental stewardship, using Solana, Rust, Anchor, FastAPI, Next.js and React.</Typography>
            <Typography><b>KronosVera — CEO / CTO (2024–ongoing, side project).</b> A lifestyle-tracking product connecting daily habits, wellbeing, energy and recovery. React Native, Expo, Node.js, PostgreSQL, Amazon Bedrock and AWS infrastructure.</Typography>
          </Stack>
        </Paper>

        {/* SELECTED PROJECTS (teaser) */}
        <Paper sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={800}>Selected Projects</Typography>
            <Button component={Link} href="/work" size="small">View all</Button>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack spacing={1.5}>
            <ProjectItem
              title="KronosVera"
              website="https://www.kronosvera.xyz/"
              blurb="Lifestyle tracking with AI insights connecting daily habits, wellbeing, energy and recovery. Founder-led product delivery from mobile app to production infrastructure."
              tech={['React Native', 'Expo', 'TypeScript', 'PostgreSQL', 'Amazon Bedrock', 'AWS']}
            />
            <ProjectItem
              title="Anivera"
              website="https://www.anivera.xyz/"
              blurb="A Web3 platform for animal welfare and environmental stewardship, supporting secure data and decentralized workflows."
              tech={['Solana', 'Rust', 'Anchor', 'FastAPI', 'Next.js', 'React']}
            />
            <ProjectItem
              title="Inspector Seppo AI"
              blurb="AI-assisted education flows using Anthropic via AWS Bedrock and serverless Lambdas."
              tech={['AWS', 'Lambda', 'Anthropic', 'TypeScript', 'Node.JS', 'MUI']}
            />
            <ProjectItem
              title="CRUD App (Solana)"
              blurb="Journal entries on-chain with clean Anchor program patterns and a minimal React UI."
              tech={['Solana', 'Anchor', 'React', 'TypeScript', 'Wallet Adapter', 'SolanaKit', 'Rust', 'Mocha', 'MUI']}
            />
          </Stack>
        </Paper>

        <AppreciationLetters />
        {PROFILE_SECTIONS.map(section => (
          <Paper component="section" key={section.title} sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" fontWeight={800} sx={{ mb: 2 }}>{section.title}</Typography>
            <Stack spacing={2}>{section.paragraphs.map(paragraph => <Typography key={paragraph} sx={{ lineHeight: 1.75 }}>{paragraph}</Typography>)}</Stack>
          </Paper>
        ))}
        <Paper component="section" sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" fontWeight={800} sx={{ mb: 2 }}>Education, Training & Languages</Typography>
          <Stack spacing={1.5}>
            <Typography><b>Computer Science</b> — Alexandru Ioan Cuza University, Faculty of Computer Science, Iași (2008–2012).</Typography>
            <Typography><b>Turbin3</b> — Solana Developer (2023); Solana Web3: Ship Your Product (2024–2025).</Typography>
            <Typography><b>Encode Club</b> — Ethereum Blockchain Developer Bootcamp with Solidity and ZK Bootcamp (2022).</Typography>
            <Typography><b>Security training</b> — OWASP-focused study, PortSwigger training, OffSec course material, and Udemy training in bug bounty hunting and web penetration testing.</Typography>
            <Typography><b>Languages</b> — Romanian: native · English: C2 · Spanish: B2 · Swedish: B1.</Typography>
          </Stack>
        </Paper>

        {/* VALUES / HOW I WORK */}
        <Paper sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
            How I Work
          </Typography>
          <Stack spacing={0.75}>
            <Typography>• <b>Curiosity first</b>: understand the system before changing it</Typography>
            <Typography>• <b>Security by design</b>: simple architectures, explicit invariants, tests</Typography>
            <Typography>• <b>Team-first</b>: patient, empathetic, communicates early, unblocks others</Typography>
            <Typography>• <b>Persistence</b>: I don’t run from hard problems; I ask for help when it saves time</Typography>
          </Stack>
        </Paper>

        {/* TECH / TOOLS */}
        <Paper sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={800}>Tech I Use</Typography>
            <Button component={Link} href="/skills" size="small">Full skills</Button>
          </Stack>
          <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[
              'Fastify',
              'Azure',
              'Amazon Bedrock',
              'React Native',
              'Expo',
              'Wazuh',
              'Sysmon',
              'Burp Suite',
              'Solana (Rust)',
              'Anchor',
              'Ethereum (Solidity)',
              'Truffle',
              'TypeScript',
              'Vite',
              'React',
              'Nest.js',
              'Next.js',
              'Node.js',
              'web3.js',
              'solanakit',
              'ethers.js',
              'PostgreSQL',
              'MongoDB',
              'AWS',
              'Docker',
              'CI/CD',
              'Jenkins'
            ].map((t) => (
              <Chip key={t} label={t} variant="outlined" />
            ))}
          </Box>
        </Paper>

        {/* CONTACT CTA */}
        <Paper sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={900}>Let’s build something secure.</Typography>
          <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
            Consulting, audits, workshops, or a new dApp—from idea to delivery.
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 2 }}>
            <Button component={Link} href="/work" variant="outlined">See my work</Button>
            <Button component={Link} href="mailto:daniel.burlacu1983@yahoo.se" variant="contained">
              Email me
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

/* ------------ tiny helper component for a cleaner list ------------ */
function ProjectItem({
  title,
  blurb,
  tech,
  website,
}: {
  title: string;
  blurb: string;
  tech: string[];
  website?: string;
}) {
  return (
    <Box sx={{ py: 2.5 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
        <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
        {website && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<LaunchIcon />}
            component="a"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </Button>
        )}
      </Stack>
      <Typography sx={{ opacity: 0.9, mt: 0.75 }}>{blurb}</Typography>
      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {tech.map((t) => (
          <Chip key={t} label={t} size="small" variant="outlined" />
        ))}
      </Box>
    </Box>
  );
}
