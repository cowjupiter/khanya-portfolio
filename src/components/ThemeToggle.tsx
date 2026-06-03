import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';

type CurtainPhase = "idle" | "falling" | "rising";

const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";
const DURATION = 550; // Curtain animation duration in ms

const BG_COLORS = {
  light: "#F2F5F8",
  dark: "#0C0C0C",
};

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const curtainColorRef = useRef<string>("");

  useEffect(() => {
    // Check local storage or system preference on mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (phase !== "idle") return;

    const nextIsDark = !isDark;
    const nextBgColor = nextIsDark ? BG_COLORS.dark : BG_COLORS.light;
    curtainColorRef.current = nextBgColor;
    setPhase("falling");

    setTimeout(() => {
      // Toggle theme class on document element
      const root = document.documentElement;
      if (nextIsDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      setIsDark(nextIsDark);

      setPhase("rising");
      setTimeout(() => setPhase("idle"), DURATION + 60);
    }, DURATION);
  }, [phase, isDark]);

  const curtainStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: curtainColorRef.current,
    transformOrigin: "top",
    transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
    transition: phase !== "idle" ? `transform ${DURATION}ms ${EASING}` : "none",
    zIndex: 99990,
    pointerEvents: "none",
  };

  return (
    <>
      {/* Curtain Transition Overlay */}
      <div aria-hidden="true" style={curtainStyle} />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-[99999] p-3 rounded-full bg-inverted text-textInverted shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </>
  );
};
