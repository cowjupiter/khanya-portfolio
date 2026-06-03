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

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        
        return (
          <React.Fragment key={wordIdx}>
            <span className="inline-block whitespace-nowrap">
              {chars.map((char, charIdx) => {
                const currentIdx = charIndex++;
                const start = currentIdx / totalChars;
                const end = start + (1 / totalChars);
                
                return (
                  <span key={charIdx} className="relative inline-block">
                    <span className="opacity-0">{char}</span>
                    <motion.span
                      className="absolute left-0 top-0"
                      style={{
                        opacity: useTransform(scrollYProgress, [start, end], [0.2, 1])
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              })}
            </span>
            {/* Standard space character enables browser text-justify layout spacing */}
            {wordIdx < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};
