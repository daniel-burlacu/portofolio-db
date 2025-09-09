'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/theme/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MuiProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait" initial={false}>
        {/* Single child, keyed by pathname */}
        <motion.div
          key={pathname}
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
