'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MuiProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Chapter-to-chapter navigation inside /courses must not remount Header/Footer/
  // the course sidebar, so the whole section shares one stable transition key.
  const transitionKey = pathname.startsWith('/courses') ? '/courses' : pathname;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait" initial={false}>
        {/* Single child, keyed by transitionKey */}
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{ minHeight: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
