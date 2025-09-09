'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Box, ButtonBase, IconButton, Stack, Typography } from '@mui/material';
import { animate, motion, useMotionValue } from 'framer-motion';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CasinoIcon from '@mui/icons-material/Casino';

type Props = {
  years: number[];
  value: number;
  onChange: (y: number) => void;
};

export default function YearRoulette({ years, value, onChange }: Props) {
  const ITEM_H = 44;                 // one row height
  const VISIBLE = 7;                 // odd number keeps a center slot
  const CENTER = Math.floor(VISIBLE / 2);
  const H = ITEM_H * VISIBLE;

  // triple strip for seamless loops
  const strip = useMemo(() => [...years, ...years, ...years], [years]);
  const baseStart = years.length;

  // animated offset
  const y = useMotionValue(0);

  // center current value in the middle copy
  const idxInYears = Math.max(0, years.indexOf(value));
  const centeredTrackIndex = baseStart + idxInYears;
  const yForIndex = (trackIndex: number) => -(trackIndex - CENTER) * ITEM_H;

  useEffect(() => {
    y.set(yForIndex(centeredTrackIndex));
  }, [centeredTrackIndex, y]);

  const spinning = useRef(false);

  const spinToYear = async (target: number, loops = 0) => {
    const targetIdx = years.indexOf(target);
    if (targetIdx < 0 || spinning.current) return;

    spinning.current = true;
    const targetTrack = baseStart + targetIdx + loops * years.length;
    const targetY = yForIndex(targetTrack);

    await animate(y, targetY, {
      duration: Math.min(1 + loops * 0.35, 2.2),
      ease: [0.12, 0.8, 0.2, 1],
    }).finished;

    y.set(yForIndex(baseStart + targetIdx)); // normalize back to middle copy
    onChange(target);
    spinning.current = false;
  };

  // step by one year (descending list: +1 => newer, -1 => older)
  const step = (delta: 1 | -1) => {
    const i = years.indexOf(value);
    const next = years[(i + (delta === 1 ? -1 : 1) + years.length) % years.length];
    spinToYear(next, 0);
  };

  // Mouse wheel → step when threshold crossed
  const wheelAccum = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (spinning.current) return;
    wheelAccum.current += e.deltaY;
    const threshold = ITEM_H * 0.6;

    if (wheelAccum.current >= threshold) {
      wheelAccum.current = 0;
      step(-1); // wheel down => older
    } else if (wheelAccum.current <= -threshold) {
      wheelAccum.current = 0;
      step(1); // wheel up => newer
    }
  };

  const spinRandom = () => {
    const i = years.indexOf(value);
    let nextIdx = i;
    while (nextIdx === i) nextIdx = Math.floor(Math.random() * years.length);
    const loops = 2 + Math.floor(Math.random() * 3);
    spinToYear(years[nextIdx], loops);
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'sticky', top: 96, alignSelf: 'start' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Years</Typography>
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={() => step(1)} aria-label="newer">
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => step(-1)} aria-label="older">
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={spinRandom} aria-label="spin">
            <CasinoIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Wheel */}
      <Box
        onWheel={handleWheel}
        sx={{
          width: 220,
          height: H,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          overscrollBehavior: 'contain',
          cursor: 'ns-resize',
        }}
      >
        {/* Center highlight */}
        <Box
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            left: 0, right: 0,
            top: CENTER * ITEM_H,
            height: ITEM_H,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            background: 'linear-gradient(90deg, rgba(34,230,161,0.10), rgba(155,140,255,0.10))',
          }}
        />
        {/* Strip */}
        <motion.div style={{ y }}>
          {strip.map((yr, i) => {
            const active = yr === value && i >= years.length && i < years.length * 2;
            return (
              <ButtonBase
                key={`${yr}-${i}`}
                onClick={() => spinToYear(yr, 0)}
                sx={{ display: 'flex', alignItems: 'center', gap: 1, height: ITEM_H, width: '100%', px: 1.5 }}
              >
                <Box
                  sx={{
                    width: 8, height: 8, borderRadius: '50%',
                    bgcolor: active ? 'primary.main' : 'action.disabled',
                    boxShadow: active ? '0 0 0 4px rgba(34,230,161,0.15)' : 'none',
                    transition: 'all .2s',
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: active ? 900 : 700, color: active ? 'primary.main' : 'text.secondary' }}
                >
                  {yr}
                </Typography>
              </ButtonBase>
            );
          })}
        </motion.div>
      </Box>
    </Box>
  );
}
