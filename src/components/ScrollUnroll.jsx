import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollUnroll({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const curtain = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const edgeOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.1]);

  return (
    <section ref={ref} className="relative w-full bg-[#fffaf0]">
      {/* Top parchment roll that retracts as you scroll */}
      <motion.div
        style={{ height: curtain }}
        className="pointer-events-none absolute left-0 top-0 w-full origin-top overflow-hidden"
        aria-hidden
      >
        <div className="h-[200px] w-full bg-[#fffaf0]" />
        <svg className="h-8 w-full" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C200,10 400,60 600,30 C800,0 1000,50 1200,20 L1200,60 L0,60 Z"
            fill="#fffaf0"
            stroke="#000"
            strokeOpacity={0.15}
          />
        </svg>
      </motion.div>

      {/* Subtle ink border edges */}
      <motion.div style={{ opacity: edgeOpacity }} className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 border-x-4 border-black/10" />
      </motion.div>

      {children}
    </section>
  );
}
