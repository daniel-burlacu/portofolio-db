'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box, Dialog, DialogContent, IconButton, Typography, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { ReviewImage } from '@/data/reviews';

type Props = {
  open: boolean;
  onClose: () => void;
  images: ReviewImage[];
  startIndex?: number;
  title?: string; // optional modal heading
};

export default function ReviewsModal({ open, onClose, images, startIndex = 0, title }: Props) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    if (open) setIdx(startIndex);
  }, [open, startIndex]);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  const hasMany = images.length > 1;
  const current = images[idx];

  return (
    <Dialog
      open={open}
      onClose={onClose}              // backdrop click closes
      fullWidth
      maxWidth="md"
      keepMounted
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" sx={{ px: 1, pb: 0.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }}>
            {title ?? 'Reviews'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, mr: 1 }}>
            {images.length ? `${idx + 1} / ${images.length}` : ''}
          </Typography>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {/* Image area */}
          <Box sx={{ position: 'relative', width: '100%', height: { xs: 420, sm: 520 }, bgcolor: 'black' }}>
            {current && (
              <Image
                src={current.src}
                alt={current.caption || 'review'}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: 'contain' }}
                priority
              />
            )}

            {hasMany && (
              <>
                <IconButton
                  onClick={prev}
                  aria-label="Previous"
                  sx={{
                    position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, color: 'white'
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                  onClick={next}
                  aria-label="Next"
                  sx={{
                    position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, color: 'white'
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}

            {!!current?.caption && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 0, right: 0, bottom: 0,
                  bgcolor: 'rgba(0,0,0,0.55)',
                  color: 'white',
                  p: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption">{current.caption}</Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
