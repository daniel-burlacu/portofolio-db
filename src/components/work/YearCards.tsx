'use client';

import { useState } from 'react';
import { Box, Chip, Paper, Stack, Typography, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import type { YearBlock } from '@/data/work';
import ReviewsModal from '@/features/reviews/ReviewsModal';
import { getReviewsForTitle, type ReviewImage } from '@/data/reviews';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

type Props = { block: YearBlock; maxStaticRows?: number };

export default function YearCards({ block, maxStaticRows = 3 }: Props) {
  const shouldScroll = block.items.length > maxStaticRows;

  // modal state (shared for all cards in this year)
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<ReviewImage[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState<string>('');

  const openReviews = (title: string, imgs: ReviewImage[], start = 0) => {
    setImages(imgs);
    setStartIndex(start);
    setModalTitle(title);
    setOpen(true);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={block.year}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
          {block.year}
        </Typography>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: shouldScroll ? 'auto' : 'visible',
            pr: shouldScroll ? 1 : 0,
            overscrollBehavior: 'contain',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.18) transparent',
            '&::-webkit-scrollbar': { width: 8 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 8 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
          }}
        >
          <Stack spacing={2} sx={{ pb: 2 }}>
            {block.items.map((p, idx) => {
              const reviews = getReviewsForTitle(`${p.title} ${p.company ?? ''}`); // include company in matcher // undefined if none
              return (
                <Paper
                  key={`${block.year}-${p.title}-${idx}`}
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                      background: 'linear-gradient(180deg, rgba(34,230,161,0.9), rgba(155,140,255,0.9))',
                      opacity: 0.85,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {p.title}
                    {p.company ? (
                      <Typography component="span" sx={{ ml: 1, opacity: 0.8 }}>
                        — {p.company}
                      </Typography>
                    ) : null}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {p.summary}
                  </Typography>

                  {!!p.tags?.length && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap' }}>
                      {p.tags.map((t) => (
                        <Chip key={t} label={t} size="small" sx={{ opacity: 0.9 }} />
                      ))}
                    </Stack>
                  )}

                  {/* Reviews button (only if images exist) */}
                  {/* Actions: GitHub / Website / Reviews (only those that exist) */}
                  {(p.github || p.link || reviews) && (
                    <Box sx={{ mt: 1.5 }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {p.github && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<GitHubIcon />}
                            component="a"
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub
                          </Button>
                        )}

                        {p.link && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<LaunchIcon />}
                            component="a"
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Website
                          </Button>
                        )}

                        {reviews && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => openReviews(p.title, reviews, 0)}
                          >
                            {reviews.length > 1 ? 'Reviews' : 'Review'}
                          </Button>
                        )}
                      </Stack>
                    </Box>
                  )}

                </Paper>
              );
            })}
          </Stack>
        </Box>
      </motion.div>

      {/* Modal lives once per YearCards */}
      <ReviewsModal
        open={open}
        onClose={() => setOpen(false)}
        images={images}
        startIndex={startIndex}
        title={modalTitle}
      />
    </AnimatePresence>
  );
}
