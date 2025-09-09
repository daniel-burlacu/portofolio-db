'use client';

import Image from 'next/image';
import Link from 'next/link';
import { keyframes } from '@mui/system';              // <-- add this
import { Paper, Stack, Box, Typography, Button, Chip, Container, Divider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
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
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={3.5}>
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
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
              <Typography variant="h3" fontWeight={900}>Daniel Burlacu</Typography>
               <Button
    size="small"
    variant="outlined"
    startIcon={<DownloadIcon />}
    component="a"
    href="/cv/Daniel_Burlacu_CV.pdf"
    download
    sx={{ ml: { xs: 0, sm: 1 } }}
  >
    Download CV
  </Button>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Full-stack / Web3 Developer & Blockchain Intelligence Consultant
              </Typography>

              <Typography sx={{ opacity: 0.9 }}>
                I design and build secure dApps and smart contracts on <b>Solana (Anchor)</b> and
                {' '}<b>Ethereum (Solidity)</b>, with a focus on <b>DeFi security</b>, transaction
                analytics, and pragmatic UX. I’m relentlessly curious about how systems work, I don’t
                give up easily, and I’m a patient, empathetic teammate who communicates early—and asks
                for help when it unblocks progress.
              </Typography>

              <Typography sx={{ opacity: 0.9 }}>
                I regularly join the <b>Turbin3</b> cohort to refine my skills and push forward my
                long-term project, <b>Solana Ark Foundation</b>—a decentralized platform for veterinary
                data (on-chain records, NFTs, and governance).
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                <Button component={Link} href="/skills" variant="contained">View Skills</Button>
                <Button component={Link} href="/work" variant="outlined">See Projects</Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        {/* WHAT I DO */}
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>What I Do</Typography>
          <Typography sx={{ opacity: 0.9 }}>
            I turn complex blockchain ideas into secure, usable products. My work spans smart-contract
            development, protocol integration, audits/assessments, and hands-on training for teams who
            need to understand Web3 risks and investigative workflows.
          </Typography>
          <Stack spacing={0.75} sx={{ mt: 1.5 }}>
            <Typography>• Smart contracts in <b>Rust/Anchor</b> and <b>Solidity</b> (design → build → test)</Typography>
            <Typography>• dApps with <b>TypeScript, React, Next.js, Node.js</b></Typography>
            <Typography>• Security reviews: cryptographic patterns, upgrade safety, auth/roles, fees/gas</Typography>
            <Typography>• Blockchain intelligence: tracing suspicious flows, workshop delivery</Typography>
            <Typography>• Infra & delivery: <b>AWS</b>, Docker, CI/CD, monitoring, pragmatic data stores</Typography>
          </Stack>
        </Paper>

        {/* CURRENT FOCUS */}
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>Current Focus</Typography>
           <Typography sx={{ opacity: 0.9 }}>
            <b>Gofore</b>: day-to-day tasks, fully employed from 2023.
           </Typography>
          <Typography sx={{ opacity: 0.9, mt: 1 }}>
            <b>Solana Ark Foundation</b>: decentralized veterinary data with verifiable medical records,
            vaccination NFTs, and role-based access for cabinets, shelters, and owners. Exploring validator
            governance, staking economics, and privacy-aware data sharing.
          </Typography>
          <Typography sx={{ opacity: 0.9, mt: 1 }}>
            <b>Turbin3 Cohort</b>: continuing education in Solana program patterns, PDAs/ATAs, CPI safety,
            and performance—while mentoring peers and contributing to the community.
          </Typography>
        </Paper>

        {/* SELECTED PROJECTS (teaser) */}
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={800}>Selected Projects</Typography>
            <Button component={Link} href="/work" size="small">View all</Button>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack spacing={1.5}>
            <ProjectItem
              title="Solana Ark Foundation"
              blurb="Decentralized veterinary platform—on-chain animal records, NFTs for vaccines/ownership, validator governance."
              tech={['Solana', 'Anchor', 'TypeScript', 'React', 'Wallet Adapter','SolanaKit', 'Rust', 'MUI','Mocha']}
            />
            <ProjectItem
              title="Inspector Seppo AI"
              blurb="AI-assisted education flows using Anthropic via AWS Bedrock and serverless Lambdas."
              tech={['AWS', 'Lambda', 'Anthropic', 'TypeScript','Node.JS','MUI']}
            />
            <ProjectItem
              title="CRUD App (Solana)"
              blurb="Journal entries on-chain with clean Anchor program patterns and a minimal React UI."
              tech={['Solana','Anchor', 'React','TypeScript', 'Wallet Adapter','SolanaKit','Rust','Mocha', 'MUI']}
            />
          </Stack>
        </Paper>

        {/* TRAINING / WORKSHOPS */}
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
            Training & Workshops
          </Typography>
          <Typography sx={{ opacity: 0.9 }}>
            I deliver compact, practical sessions on blockchain forensics, DeFi risk, and secure
            engineering patterns for Web3 teams. Formats range from 2-hour labs to multi-day
            intensives with hands-on tracing exercises.
          </Typography>
          <Stack spacing={0.75} sx={{ mt: 1.5 }}>
            <Typography>• Transaction tracing on Bitcoin & Ethereum with real tooling</Typography>
            <Typography>• Solana program security basics: PDAs, CPIs, account constraints</Typography>
            <Typography>• Smart-contract testing pipelines and incident response</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} sx={{ pt: 1.5 }}>
            <Button component={Link} href="/blockchains" variant="outlined">See Courses</Button>
          </Stack>
        </Paper>

        {/* VALUES / HOW I WORK */}
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
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
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={800}>Tech I Use</Typography>
            <Button component={Link} href="/skills" size="small">Full skills</Button>
          </Stack>
          <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[
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
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, textAlign: 'center' }}>
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
}: {
  title: string;
  blurb: string;
  tech: string[];
}) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
      <Typography sx={{ opacity: 0.9 }}>{blurb}</Typography>
      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {tech.map((t) => (
          <Chip key={t} label={t} size="small" variant="outlined" />
        ))}
      </Box>
    </Box>
  );
}