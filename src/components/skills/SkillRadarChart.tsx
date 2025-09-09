// src/components/skills/SkillRadarChart.tsx
'use client';

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Tooltip
} from 'recharts';

type Item = { name: string; stars: number };

export default function SkillRadarChart({
  items, max = 5, topN = 8,
}: { items: Item[]; max?: number; topN?: number }) {
  const theme = useTheme();
  const color = theme.palette.primary.main;

  const data = useMemo(() => {
    const slice = items.slice(0, topN);
    return slice.map(s => ({ subject: s.name, value: s.stars }));
  }, [items, topN]);

  // explicit chart angles so we can place the radius ticks between spokes
  const START = 90;   // top
  const END   = -270; // clockwise full circle

  const radiusAngle = useMemo(() => {
    const n = data.length;
    if (!n) return START;
    const step = 360 / n;

    // Prefer gap between "Material UI" and "React" if adjacent; else between 0 & 1
    const iMat = data.findIndex(d => d.subject.toLowerCase() === 'material ui');
    const iReact = data.findIndex(d => d.subject.toLowerCase() === 'react');
    const adj = (a: number, b: number) => ((b - a + n) % n) === 1;

    let baseIndex = 0;
    if (iMat >= 0 && iReact >= 0) {
      if (adj(iMat, iReact)) baseIndex = iMat;
      else if (adj(iReact, iMat)) baseIndex = iReact;
    }

    return START - (baseIndex + 0.5) * step; // halfway between two axes
  }, [data]);

  if (data.length === 0) return null;

  return (
    <Box sx={{ width: '100%', height: '100%', minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} startAngle={START} endAngle={END} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke={theme.palette.divider} />
          <PolarAngleAxis
            dataKey="subject"
            tick={(props) => <AngleTick {...props} fill={theme.palette.text.secondary} />}
          />
          <PolarRadiusAxis
            domain={[0, max]}
            tickCount={max + 1}
            angle={radiusAngle}
            tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
            stroke={theme.palette.divider}
          />
          <Radar name="Skill" dataKey="value" stroke={color} fill={color} fillOpacity={0.25} />
          <Tooltip
            formatter={(v: string) => [`${v} / ${max}★`, 'Level']}
            labelStyle={{ color: theme.palette.text.primary }}
            contentStyle={{
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}

/** Wrap long angle labels into multiple lines using tspans */
type AngleTickProps = {
  payload: { value: string };
  x?: number | string;
  y?: number | string;
  fill?: string;
};

function AngleTick({ payload, x, y, fill }: AngleTickProps) {
  const maxLineLen = 12;
  const words = String(payload.value).split(' ');
  const lines: string[] = [];
  let line = '';

  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (candidate.length > maxLineLen) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  return (
    <text x={x} y={y} textAnchor="middle" fill={fill} fontSize={12}>
      {lines.map((ln, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>{ln}</tspan>
      ))}
    </text>
  );
}


