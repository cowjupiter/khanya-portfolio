import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const characters = text.split('');

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        
        return (
          <span key={i} className="relative inline-block">
            {/* Invisible placeholder to maintain spacing */}
            <span className="opacity-0">{char === ' ' ? '\u00A0' : char}</span>
            {/* Animated character overlay */}
            <motion.span
              className="absolute left-0 top-0"
              style={{
                opacity: useTransform(scrollYProgress, [start, end], [0.2, 1])
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};
