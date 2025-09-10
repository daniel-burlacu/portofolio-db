// src/components/Header.tsx
'use client';

import { useState } from 'react';
import {
  AppBar, Toolbar, Button, Typography, Stack,
  IconButton, Drawer, Box, Divider, List, ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Work History', href: '/work' },
    { label: 'Skills', href: '/skills' },
    { label: 'Cybersecurity', href: '/cybersecurity' },
    { label: 'Blockchains', href: '/blockchains' },
    { label: 'Playground', href: '/playground' },
  ] as const;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  return (
    <>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
        <Toolbar sx={{ gap: 2 }}>
          {/* Brand */}
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            DB<span style={{ color: '#14F195' }}>.</span>
          </Typography>

          {/* Desktop nav */}
          <Stack
            component="nav"
            aria-label="Primary"
            direction="row"
            spacing={1}
            sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
          >
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

          {/* Mobile hamburger */}
          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ ml: 'auto', display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 280, borderLeft: '1px solid', borderColor: 'divider' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            DB<span style={{ color: '#14F195' }}>.</span>
          </Typography>
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <List component="nav" aria-label="Mobile primary">
          {items.map(({ label, href }) => (
            <ListItemButton
              key={href}
              component={Link}
              href={href}
              selected={isActive(href)}
              onClick={() => setOpen(false)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
