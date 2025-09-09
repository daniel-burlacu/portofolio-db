'use client';
import { AppBar, Toolbar, Button, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Work History', href: '/work' },
    { label: 'Skills', href: '/skills' },
    { label: 'Cybersecurity', href: '/cybersecurity' },
    { label: "Blockchains", href: '/blockchains' },
    { label: 'Playground', href: '/playground' },
   
  ] as const;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
          DB<span style={{ color: '#14F195' }}>.</span>
        </Typography>

        <Stack component="nav" aria-label="Primary" direction="row" spacing={1}>
          {items.map(({ label, href }) => (
            <Button
              key={href}
              component={Link}
              href={href}
              variant={isActive(href) ? 'contained' : 'text'}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
