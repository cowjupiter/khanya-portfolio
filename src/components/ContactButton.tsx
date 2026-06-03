import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ className = '' }) => {
  return (
    <a
      href="mailto:hello@khanya.design"
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-[10px] sm:text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-textMain dark:text-white bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/35 dark:hover:bg-white/10 hover:border-white/60 dark:hover:border-white/20 active:scale-95 duration-300 pointer-events-auto select-none ${className}`}
      style={{
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.35), 0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      }}
    >
      <span>Get In Touch</span>
      <ArrowUpRight 
        size={15} 
        className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" 
      />
    </a>
  );
};
