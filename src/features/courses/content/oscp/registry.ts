import type { ComponentType } from 'react';
import OscpIntro from '../oscp/Intro';
// import OscpMethodology from './oscp/Methodology' // example next chapter

export const COURSE_COMPONENTS: Record<string, ComponentType[] | undefined> = {
  oscp: [
    OscpIntro,
    // OscpMethodology,
    // ... add more in exact chapter order
  ],
};

export default COURSE_COMPONENTS;