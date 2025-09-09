'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
  Box, List, ListItemButton, ListItemText, Typography, Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { COURSES, courseKeys, pad2 } from '@/helpers/courses';

export default function CourseSidebar() {
  const pathname = usePathname();
  const params = useParams<{ courseKey?: string; chapter?: string }>();
  const activeCourseKey = (params?.courseKey as string) ?? 'oscp';
  const activeChapter = Number(params?.chapter ?? '1');

  const [openKey, setOpenKey] = useState<string>(activeCourseKey);

  useEffect(() => {
    setOpenKey(activeCourseKey);
  }, [activeCourseKey]);

  return (
    <Box
      sx={{
        borderRight: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(2,6,23,0.9)',
        backdropFilter: 'blur(6px)',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ px: 2, py: 2, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Courses
        </Typography>
      </Box>

      <List sx={{ p: 0 }}>
        {courseKeys().map((key: keyof typeof COURSES) => {
          const course = COURSES[key];
          const skey = String(key);
          const isOpen = openKey === skey;
            const isActiveCourse = activeCourseKey === skey;

          return (
            <Box key={skey}>
              <ListItemButton
                onClick={() => setOpenKey(isOpen ? '' : skey)}
                sx={{
                  bgcolor: isActiveCourse ? 'rgba(99,102,241,0.15)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <ListItemText
                  primary={course.label}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: isActiveCourse ? 'rgba(199,210,254,0.95)' : 'inherit',
                  }}
                />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {course.chapters.length === 0 && (
                    <ListItemButton sx={{ pl: 4, py: 0.75, opacity: 0.7 }} disabled>
                      <ListItemText primary="Coming soon" />
                    </ListItemButton>
                  )}

                  {course.chapters.map((ch: string, i: number) => {
                    const chapNum = i + 1;
                    const href = `/courses/${skey}/${chapNum}`;
                    const selected =
                      isActiveCourse && activeChapter === chapNum && pathname === href;

                    return (
                      <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                        <ListItemButton
                          sx={{
                            pl: 4,
                            py: 0.75,
                            bgcolor: selected ? 'rgba(99,102,241,0.25)' : 'transparent',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                          }}
                        >
                          <ListItemText
                            primary={`${pad2(chapNum)}. ${ch}`}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: selected ? 700 : 400,
                              color: selected ? 'rgba(156, 226, 169, 0.9)' : 'rgba(20, 233, 59, 0.9)',
                            }}
                          />
                        </ListItemButton>
                      </Link>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
