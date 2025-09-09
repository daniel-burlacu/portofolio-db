// src/components/skills/SkillStarsList.tsx
'use client';

import { Box, Rating, Stack, Typography } from '@mui/material';

type Item = { name: string; stars: number };

export default function SkillStarsList({ items }: { items: Item[] }) {
  return (
        <Box
      sx={{
        height: '100%',          // fill grid row
        minHeight: 0,
        overflowY: 'auto',       // scroll inside the box
        pr: 1,
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.18) transparent',
        '&::-webkit-scrollbar': { width: 8 },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.18)',
          borderRadius: 8,
        },
      }}
    >
      {items.map((s, i) => (
        <Stack
          key={`${s.name}-${i}`}
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            py: 0.5,
            px: 0.5,
            borderRadius: 1,
            minWidth: 0, // allow the name to ellipsis
            '&:hover': { backgroundColor: 'action.hover' },
          }}
          title={s.name} // hover to see full text if ellipsized
        >
          {/* Name: single line */}
          <Typography noWrap sx={{ flex: 1, minWidth: 0, pr: 1 }}>
            {s.name}
          </Typography>

          {/* Stars */}
          <Rating value={s.stars} max={5} readOnly size="small" />

          {/* x/5 */}
          <Typography
            variant="caption"
            sx={{ opacity: 0.7, width: 36, textAlign: 'right' }}
          >
            {s.stars}/5
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}
