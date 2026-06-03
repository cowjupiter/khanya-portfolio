import React from 'react';

interface LiveProjectButtonProps {
  className?: string;
  href?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ className = '', href = '#' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center text-center rounded-full border-2 border-textMain px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-textMain transition-colors hover:bg-textMain/10 ${className}`}
    >
      Visit Website
    </a>
  );
};
