"use client";
import { useState, useEffect } from "react";

// Brand-specific glow and metadata configurations for the 6 primary tools
const CORE_SKILLS = [
  {
    name: "Figma",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    glow: "rgba(242, 78, 29, 0.35)",
    border: "rgba(242, 78, 29, 0.4)",
  },
  {
    name: "WordPress",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg",
    glow: "rgba(33, 117, 155, 0.35)",
    border: "rgba(33, 117, 155, 0.4)",
  },
  {
    name: "Adobe Photoshop",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    glow: "rgba(49, 168, 255, 0.35)",
    border: "rgba(49, 168, 255, 0.4)",
  },
  {
    name: "Adobe Illustrator",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
    glow: "rgba(255, 154, 0, 0.35)",
    border: "rgba(255, 154, 0, 0.4)",
  },
  {
    name: "CapCut",
    icon: "https://cdn.brandfetch.io/idUmqKFgE3/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    glow: "rgba(0, 229, 255, 0.35)",
    border: "rgba(0, 229, 255, 0.4)",
  },
  {
    name: "Canva",
    icon: "https://cdn.brandfetch.io/id9mVQlyB1/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    glow: "rgba(0, 196, 204, 0.35)",
    border: "rgba(0, 196, 204, 0.4)",
  },
];

// Curated supplementary technologies for Khanya's secondary orbit to fill it out beautifully
const TECH_SKILLS = [
  {
    name: "React",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    glow: "rgba(97, 218, 251, 0.25)",
    border: "rgba(97, 218, 251, 0.3)",
  },
  {
    name: "TypeScript",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    glow: "rgba(49, 120, 198, 0.25)",
    border: "rgba(49, 120, 198, 0.3)",
  },
  {
    name: "Tailwind CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    glow: "rgba(56, 189, 248, 0.25)",
    border: "rgba(56, 189, 248, 0.3)",
  },
  {
    name: "WooCommerce",
    icon: "https://woocommerce.com/wp-content/themes/woo/images/woo-logo.svg",
    glow: "rgba(150, 91, 140, 0.25)",
    border: "rgba(150, 91, 140, 0.3)",
  },
  {
    name: "GitHub",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    glow: "rgba(255, 255, 255, 0.2)",
    border: "rgba(255, 255, 255, 0.3)",
  },
  {
    name: "HTML5",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    glow: "rgba(227, 79, 38, 0.25)",
    border: "rgba(227, 79, 38, 0.3)",
  },
  {
    name: "CSS3",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    glow: "rgba(21, 114, 182, 0.25)",
    border: "rgba(21, 114, 182, 0.3)",
  },
  {
    name: "Elementor",
    icon: "https://cdn.brandfetch.io/idDXbvsZJH/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    glow: "rgba(207, 46, 116, 0.25)",
    border: "rgba(207, 46, 116, 0.3)",
  },
];

interface SemiCircleOrbitProps {
  radius: number;
  centerX: number;
  centerY: number;
  skills: Array<{ name: string; icon: string; glow: string; border: string }>;
  iconSize: number;
}

function SemiCircleOrbit({ radius, centerX, centerY, skills, iconSize }: SemiCircleOrbitProps) {
  const count = skills.length;

  return (
    <>
      {/* Orbit icons */}
      {skills.map((skill, index) => {
        // Calculate dynamic distribution across 180 degrees
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        
        // Tooltip above or below based on position in circle
        const tooltipAbove = angle > 90;

        return (
          <div
            key={skill.name}
            className="absolute flex flex-col items-center group cursor-pointer"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 50,
            }}
          >
            {/* Frosted Glass Icon Card Container */}
            <div 
              className="flex items-center justify-center rounded-full p-2.5 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-md transition-all duration-300 hover:scale-115 hover:-translate-y-1 select-none pointer-events-auto"
              style={{
                width: iconSize,
                height: iconSize,
                boxShadow: `inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)`,
              }}
              // Applies dynamic brand-colored shadow on hover
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 0 25px ${skill.glow}`;
                e.currentTarget.style.borderColor = skill.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)`;
                e.currentTarget.style.borderColor = "";
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* Premium Glassmorphic Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+12px)]" : "top-[calc(100%+12px)]"
              } scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none w-36 rounded-xl bg-white/80 dark:bg-black/80 border border-white/40 dark:border-white/10 px-3 py-1.5 shadow-xl text-center backdrop-blur-md z-[100]`}
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase text-textMain dark:text-white">
                {skill.name}
              </span>
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/80 dark:bg-black/80 border-l border-t border-white/40 dark:border-white/10 ${
                  tooltipAbove ? "top-full -mt-1 border-r border-b border-l-0 border-t-0" : "bottom-full -mb-1"
                }`}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);

    // Track active dark mode class dynamically
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", updateSize);
      observer.disconnect();
    };
  }, []);

  const baseWidth = Math.min(size.width * 0.9, 840);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const iconSize =
    size.width < 480
      ? Math.max(34, baseWidth * 0.07)
      : size.width < 768
      ? Math.max(42, baseWidth * 0.08)
      : Math.max(50, baseWidth * 0.09);

  // Dynamically swap CapCut logo based on theme (white logo on dark background, dark logo on light background)
  const dynamicCoreSkills = CORE_SKILLS.map((skill) => {
    if (skill.name === "CapCut") {
      return {
        ...skill,
        icon: isDark
          ? "https://cdn.brandfetch.io/idUmqKFgE3/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
          : "https://cdn.brandfetch.io/idUmqKFgE3/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      };
    }
    return skill;
  });

  // Dynamically swap GitHub logo based on theme (white symbol on dark background, dark symbol on light background)
  const dynamicTechSkills = TECH_SKILLS.map((skill) => {
    if (skill.name === "GitHub") {
      return {
        ...skill,
        icon: isDark
          ? "https://cdn.brandfetch.io/idZAyF9rlg/theme/light/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B"
          : "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      };
    }
    return skill;
  });

  return (
    <section className="py-24 relative w-full overflow-hidden flex flex-col items-center bg-main transition-colors duration-300">
      
      {/* Dynamic blurred glow background orbs for cosmic depth */}
      <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06),transparent_70%)] blur-3xl -mt-60" />
        <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)] blur-3xl mt-40" />
      </div>

      <div className="relative flex flex-col items-center text-center z-10 w-full px-6">
        <h2 className="text-[clamp(1.8rem,5.5vw,3.5rem)] font-black uppercase tracking-tight text-textMain dark:text-white leading-none">
          Creative Toolkit
        </h2>
        <p className="mt-4 mb-16 max-w-xl text-[clamp(0.85rem,1.2vw,1.05rem)] font-light leading-relaxed text-textMain/75 dark:text-textMain/60 uppercase tracking-widest">
          The professional design & development ecosystem that drives my digital workflow.
        </p>

        {/* Orbit Radar Display Wrapper */}
        <div
          className="relative select-none pointer-events-none mt-6"
          style={{ width: baseWidth, height: baseWidth * 0.55 }}
        >
          {/* SVG Faint Concentric Dashed Radar Tracks */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-textMain/10 dark:text-white/10 transition-colors duration-300">
            {/* Core Skills (Inner Orbit) Line */}
            <circle
              cx={centerX}
              cy={centerY}
              r={baseWidth * 0.23}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 8"
            />
            {/* Tech Skills (Outer Orbit) Line */}
            <circle
              cx={centerX}
              cy={centerY}
              r={baseWidth * 0.42}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="5 10"
            />
          </svg>

          {/* Core Design & Video (Inner Orbit - Radius 0.23 - requested 6 key items) */}
          <SemiCircleOrbit 
            radius={baseWidth * 0.23} 
            centerX={centerX} 
            centerY={centerY} 
            skills={dynamicCoreSkills} 
            iconSize={iconSize} 
          />

          {/* Supplement Dev & Integration Tools (Outer Orbit - Radius 0.42 - Supplementary toolkit) */}
          <SemiCircleOrbit 
            radius={baseWidth * 0.42} 
            centerX={centerX} 
            centerY={centerY} 
            skills={dynamicTechSkills} 
            iconSize={iconSize * 0.9} 
          />
        </div>
      </div>
    </section>
  );
}
