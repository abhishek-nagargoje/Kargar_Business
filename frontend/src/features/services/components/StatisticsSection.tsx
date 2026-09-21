/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { memo, useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { usePrefersReducedMotion } from '@/components/ui/logos/hooks/usePrefersReducedMotion';
import type { ServiceBlockProps } from '../registry/BlockRenderer';

const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Extract number and suffix (e.g., "500+" -> num: 500, suffix: "+")
  const match = /^([\d,.]+)(.*)$/.exec(value);
  const targetNum = match?.[1] ? parseFloat(match[1].replace(/,/g, '')) : 0;
  const suffix = match?.[2] ?? value;
  const isNumber = match !== null;

  // Start at the real target value so prerendered/no-JS/crawler-visible HTML always shows the
  // correct number — only reset to 0 and count up once the animation actually triggers in a
  // real browser (see effect below).
  const [count, setCount] = useState(isNumber ? targetNum : 0);

  useEffect(() => {
    if (isInView && isNumber && !prefersReducedMotion) {
      setCount(0);
      const start = 0;
      const end = targetNum;
      // Duration in ms
      const duration = 2000;
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(start + easeOut * (end - start));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, isNumber, targetNum, prefersReducedMotion]);

  const displayValue = isNumber ? (
    Number.isInteger(targetNum) ? Math.floor(count).toString() : count.toFixed(1)
  ) : value;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 text-5xl font-bold text-navy-900 mb-3 flex items-center">
        {isNumber ? displayValue : value}
        <span className="text-orange-500 ml-1">{suffix}</span>
      </div>
      <div className="relative z-10 text-slate-500 font-medium text-lg text-center">
        {label}
      </div>
    </motion.div>
  );
};

export const StatisticsSection = memo(function StatisticsSection({ entity, block }: ServiceBlockProps) {
  if (!entity.statistics || entity.statistics.length === 0) return null;

  const bgClass = block.background === 'light' ? 'bg-slate-50' 
                : block.background === 'dark' ? 'bg-navy-900' 
                : 'bg-white';

  return (
    <section id={block.id} className={`py-20 lg:py-28 ${bgClass}`}>
      <Container size="xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {entity.statistics.map((stat, i) => (
            <AnimatedCounter key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </section>
  );
});
