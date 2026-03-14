'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionReveal({ children, className }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
