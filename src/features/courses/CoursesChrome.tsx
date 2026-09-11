// src/features/courses/CourseChrome.tsx
'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Drawer, IconButton, List, ListItemButton, ListItemText,
  Typography, Divider, Stack, Button, Paper, useMediaQuery, Accordion, AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Shape coming from your COURSES helper
type CoursesMap = Record<string, { label: string; chapters: string[] }>;

type Props = {
  children: React.ReactNode;  // chapter content
  courses: CoursesMap;        // pass COURSES here
};

const SIDEBAR_W = 300;

type ChapterLinkProps = {
  courseKey: string;
  idx: number;
  title: string;
  active: boolean;
  onNavigate: () => void;
  variant: 'sidebar' | 'drawer';
};

// Memoized so a chapter change only re-renders the previously/newly active link,
// not every item in the list.
const ChapterLink = memo(function ChapterLink({ courseKey, idx, title, active, onNavigate, variant }: ChapterLinkProps) {
  return (
    <ListItemButton
      selected={active}
      component={Link}
      href={`/courses/${courseKey}/${idx + 1}`}
      scroll={false}
      onClick={onNavigate}
      sx={{
        alignItems: 'flex-start',
        ...(variant === 'sidebar' && { color: active ? 'common.white' : 'success.main' }),
        '& .MuiListItemText-primary': {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          fontWeight: active ? 700 : 600,
          ...(variant === 'sidebar' && {
            color: active ? 'common.white' : 'success.main',
            transition: 'color 0.2s',
          }),
        },
      }}
    >
      <ListItemText primary={`${idx + 1}. ${title}`} />
    </ListItemButton>
  );
});

export default function CourseChrome({ children, courses }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const match = /^\/courses\/([^/]+)\/(\d+)\/?$/.exec(pathname);
  const courseKey = match?.[1] ?? '';
  const chapterIndex = Number(match?.[2] ?? 1) - 1;
  const theme = useTheme();

  // Treat <lg as “mobile/tablet” so sidebar is hidden there
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(courseKey);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const go = (key: string, idx: number) => {
    // Go through Next.js router (not raw history.pushState) so only the
    // chapter segment re-renders instead of the whole route tree.
    router.push(`/courses/${key}/${idx + 1}`, { scroll: false });
    setDrawerOpen(false);
  };

  // Make a stable array of courses for rendering (OSCP first, then OSWE if present)
  const courseEntries = useMemo(() => {
    const entries = Object.entries(courses);
    // optional: sort to prefer OSCP, OSWE order
    entries.sort((a, b) => {
      const order = ['oscp', 'oswe', 'oswa']; // add your actual keys here
      return order.indexOf(a[0]) - order.indexOf(b[0]);
    });
    return entries;
  }, [courses]);

  // ————— Sidebar (desktop only, now expandable) —————
  const Sidebar = (
    <Box sx={{ width: SIDEBAR_W, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '2rem' }}>
          Courses
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {courseEntries.map(([key, def]) => (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={(_, isExp) => setExpanded(isExp ? key : false)}
            disableGutters
            elevation={0}
            sx={{ '&::before': { display: 'none' }, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: expanded === key ? 'common.white' : 'success.main',
                  transition: 'color 0.2s',
                }}
              >
                {def.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List dense>
                {def.chapters.map((title, i) => (
                  <ChapterLink
                    key={`${key}-${i}`}
                    courseKey={key}
                    idx={i}
                    title={title}
                    active={key === courseKey && i === chapterIndex}
                    onNavigate={closeDrawer}
                    variant="sidebar"
                  />
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );

  // ————— Drawer content (mobile/tablet) —————
  const DrawerContent = (
    <Box sx={{ width: SIDEBAR_W, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, flex: 1, minWidth: 140, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Chapters
            </Typography>
        <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        {courseEntries.map(([key, def]) => (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={(_, isExp) => setExpanded(isExp ? key : false)}
            disableGutters
            elevation={0}
            sx={{ '&::before': { display: 'none' }, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 800 }}>{def.label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List dense>
                {def.chapters.map((title, i) => (
                  <ChapterLink
                    key={`${key}-${i}`}
                    courseKey={key}
                    idx={i}
                    title={title}
                    active={key === courseKey && i === chapterIndex}
                    onNavigate={closeDrawer}
                    variant="drawer"
                  />
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );

  // ————— Main content column —————
  const chapterTitles = courses[courseKey]?.chapters ?? [];
  const onPrev = () => go(courseKey, Math.max(0, chapterIndex - 1));
  const onNext = () => go(courseKey, Math.min(chapterTitles.length - 1, chapterIndex + 1));

  return (
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        maxWidth: 1440,
        minWidth: 0,
        px: { xs: 1, md: 2 },
        gridTemplateColumns: { xs: '1fr', lg: `${SIDEBAR_W}px 1fr` }, // sidebar only on lg+
        gap: 2,
        alignItems: 'start',
      }}
    >
      {/* Desktop sidebar */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'block' }, // 🔒 completely hidden on mobile/tablet
          borderRight: '1px solid',
          borderColor: 'divider',
          minHeight: 'calc(100dvh - 160px)',
        }}
      >
        {Sidebar}
      </Box>

      {/* Content */}
      <Box sx={{ minWidth: 0 }}>
        {/* Mobile header with hamburger + Prev/Next */}
        <Stack direction="row" useFlexGap flexWrap="wrap" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label="Open chapters"
            sx={{ display: { xs: 'inline-flex', lg: 'none' } }} // only on mobile/tablet
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" sx={{ fontWeight: 800, flex: 1, minWidth: 140, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            {chapterTitles[chapterIndex] ?? 'Chapter'}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <Button size="small" onClick={onPrev} disabled={chapterIndex <= 0}>
              Prev
            </Button>
            <Button size="small" onClick={onNext} disabled={chapterIndex >= chapterTitles.length - 1}>
              Next
            </Button>
          </Stack>
        </Stack>

        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 3, width: '100%', minWidth: 0, boxSizing: 'border-box', maxWidth: 1000, mx: 'auto' }}>
          {children}
        </Paper>
      </Box>

      {/* Mobile/tablet Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen && !isDesktop}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: SIDEBAR_W } }}
      >
        {DrawerContent}
      </Drawer>
    </Box>
  );
}
