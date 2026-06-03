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
    offset: ['start 0.85', 'end 0.25']
  });

  const words = text.split(' ');
  const totalWords = words.length;

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wordIdx) => {
        const start = wordIdx / totalWords;
        const end = start + (1.5 / totalWords); // Stagger word entry slightly
        
        return (
          <span key={wordIdx} className="relative inline-block mr-[0.25em] last:mr-0">
            <span className="opacity-0">{word}</span>
            <motion.span
              className="absolute left-0 top-0"
              style={{
                opacity: useTransform(scrollYProgress, [start, Math.min(end, 1)], [0.15, 1])
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};
