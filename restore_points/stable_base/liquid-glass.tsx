"use client";

import React from "react";
import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";
import { FadeIn } from "../FadeIn";

// Types
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

interface DockIcon {
  icon: React.ReactNode;
  alt: string;
  href: string;
}

// Glass Effect Wrapper Component
export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
}) => {
  const glassStyle = {
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(255, 255, 255, 0.2)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={`relative flex overflow-hidden cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      {/* Glass Layers */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-3xl"
        style={{
          backdropFilter: "blur(8px) saturate(120%)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 bg-white/20 dark:bg-white/5"
      />
      <div
        className="absolute inset-0 z-20 rounded-3xl"
        style={{
          boxShadow:
            "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Content */}
      <div className="relative z-30 w-full h-full flex items-center justify-center">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block select-none">
      {content}
    </a>
  ) : (
    content
  );
};

// Dock Component
export const GlassDock: React.FC<{ icons: DockIcon[] }> = ({ icons }) => (
  <GlassEffect className="rounded-[28px] p-2.5">
    <div className="flex items-center justify-center gap-3 rounded-2xl p-1 overflow-hidden">
      {icons.map((icon, index) => (
        <a
          key={index}
          href={icon.href}
          target={icon.href.startsWith("mailto:") || icon.href.startsWith("tel:") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="group relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-textMain hover:text-textMain/80 transition-all duration-500 hover:scale-110 hover:bg-white/25 dark:hover:bg-white/10 shadow-md cursor-pointer select-none"
          style={{
            transformOrigin: "center center",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          }}
        >
          {icon.icon}
        </a>
      ))}
    </div>
  </GlassEffect>
);

// Button Component
export const GlassButton: React.FC<{ children: React.ReactNode; href?: string }> = ({
  children,
  href,
}) => (
  <GlassEffect
    href={href}
    target={href?.startsWith("mailto:") ? "_self" : "_blank"}
    className="rounded-full px-8 py-5 sm:px-10 sm:py-6 hover:px-9 hover:py-5.5 sm:hover:px-11 sm:hover:py-7 hover:scale-[1.03] overflow-hidden"
  >
    <div
      className="transition-all duration-700 flex items-center gap-3 text-textMain select-none"
      style={{
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
      }}
    >
      {children}
    </div>
  </GlassEffect>
);

// SVG Filter Component
export const GlassFilter: React.FC = () => (
  <svg style={{ display: "none", position: "absolute", width: 0, height: 0 }} aria-hidden="true">
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.002 0.008"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="4"
        specularConstant="0.8"
        specularExponent="80"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-150" y="-150" z="250" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="25"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// Re-designed Contact Section incorporating Liquid Glass & Glow Orbs
export function ContactSection() {
  const contactIcons: DockIcon[] = [
    {
      icon: <Mail className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />,
      alt: "Email",
      href: "mailto:hello@khanya.design",
    },
    {
      icon: <Phone className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />,
      alt: "Phone",
      href: "tel:+27823456789",
    },
    {
      icon: <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />,
      alt: "LinkedIn",
      href: "https://linkedin.com/in/khanya-design",
    },
  ];

  return (
    <section
      id="contact"
      className="bg-main text-textMain rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 -mt-10 sm:-mt-12 md:-mt-14 relative z-20 flex flex-col items-center justify-center text-center transition-colors duration-300 overflow-hidden min-h-[90vh]"
    >
      {/* SVG Liquid Refraction Filter */}
      <GlassFilter />

      {/* Hero-like Dynamic Background Liquid Orb Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[75%] rounded-full bg-gradient-to-tr from-purple-500/10 via-rose-500/10 to-cyan-500/10 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20 blur-[120px]" />
        
        {/* Slow Floating, Warping Liquid Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] float-orb opacity-80 sm:opacity-90">
          <div 
            className="w-full h-full liquid-orb blur-[80px] sm:blur-[110px]"
            style={{
              background: "linear-gradient(135deg, var(--orb-start, #ff8da1), var(--orb-end, #ffcd8b))",
            }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl w-full flex flex-col items-center gap-12 sm:gap-16 relative z-10">
        
        {/* Headings */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-2xl">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-textMain/40 border border-textMain/20 rounded-full px-3 py-1 bg-textMain/5">
            Let's Collaborate
          </span>
          <FadeIn delay={0.1} y={35}>
            <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,7vw,96px)] leading-[0.9] tracking-tight">
              Let's create <br className="sm:hidden" /> together
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} y={35}>
            <p className="text-textMain/60 font-light leading-relaxed text-sm sm:text-base md:text-lg max-w-lg mt-2">
              Ready to elevate your digital presence? Reach out today via email or social links and let's craft a premium, high-converting digital experience.
            </p>
          </FadeIn>
        </div>

        {/* Action Controls - Glass CTA Button & Social Dock */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 w-full">
          {/* Glass Button CTA */}
          <FadeIn delay={0.3} y={35}>
            <GlassButton href="mailto:hello@khanya.design">
              <span className="text-sm sm:text-base font-semibold uppercase tracking-widest">
                hello@khanya.design
              </span>
              <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </GlassButton>
          </FadeIn>

          {/* Social & Contact Dock */}
          <FadeIn delay={0.4} y={35}>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-textMain/35">
                Quick Connect
              </span>
              <GlassDock icons={contactIcons} />
            </div>
          </FadeIn>
        </div>

        {/* Footer Sub-credits */}
        <div className="w-full border-t border-textMain/10 pt-10 sm:pt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-textMain/40 font-light uppercase tracking-widest mt-8">
          <span>© 2026 Khanya. All rights reserved.</span>
          <span className="normal-case tracking-normal opacity-70">
            3D assets powered by{" "}
            <a
              href="https://spline.design"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-textMain transition-colors"
            >
              Spline
            </a>
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-textMain transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-textMain transition-colors">
              Dribbble
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
