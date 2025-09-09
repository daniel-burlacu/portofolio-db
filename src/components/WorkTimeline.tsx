'use client';

import { useMemo, useState } from 'react';
import { Box, Chip, Stack } from '@mui/material';
import type { YearBlock } from '@/data/work';
import YearRoulette from '@/components/work/YearRoulette';
import YearCards from '@/components/work/YearCards';

type Props = { data: YearBlock[] };

export default function WorkTimeline({ data }: Props) {
  const blocks = useMemo(() => [...data].sort((a, b) => b.year - a.year), [data]);
  const years = useMemo(() => blocks.map(b => b.year), [blocks]);

  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const current = blocks.find(b => b.year === selectedYear) ?? blocks[0];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
        columnGap: 3,
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Left: roulette wheel */}
      <YearRoulette years={years} value={selectedYear} onChange={setSelectedYear} />

      {/* Right: full-height column */}
      <Box sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile year chips */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, display: { xs: 'flex', md: 'none' }, flexWrap: 'wrap' }}
        >
          {years.map(y => (
            <Chip
              key={y}
              label={y}
              color={y === selectedYear ? 'primary' : 'default'}
              onClick={() => setSelectedYear(y)}
              size="small"
            />
          ))}
        </Stack>

        {/* Year heading + cards (scrolls only if > 3) */}
        <YearCards block={current} maxStaticRows={3} />
      </Box>
    </Box>
  );
}
