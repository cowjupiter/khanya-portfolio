"use client";

import { useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";

export function InfiniteGrid() {
  const mouseX = useMotionValue(-1000); // Start off-screen
  const mouseY = useMotionValue(-1000);

  // Global mouse position tracking relative to the Hero section
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return; // Skip mouse listener on mobile
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();

      // Check if cursor is inside the Hero section boundaries
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      } else {
        mouseX.set(-1000);
        mouseY.set(-1000);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.25; // Subtle, high-end diagonal scroll speed
  const speedY = 0.25;

  useAnimationFrame(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return; // Skip grid scrolling animation on mobile
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Faint static background grid */}
      <div className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.03] text-textMain dark:text-white pointer-events-none">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} id="static-grid" />
      </div>

      {/* Interactive spotlight grid overlay */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30 dark:opacity-15 text-textMain dark:text-white pointer-events-none"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} id="spotlight-grid" />
      </motion.div>
    </div>
  );
}

const GridPattern = ({ offsetX, offsetY, id }: { offsetX: any; offsetY: any; id: string }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};
