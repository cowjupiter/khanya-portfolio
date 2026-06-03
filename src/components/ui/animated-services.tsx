"use client";

import * as React from "react";
import { MotionConfig, motion, HTMLMotionProps } from "framer-motion";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined);

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (!context) {
    throw new Error("useHoverSliderContext must be used within a HoverSlider");
  }
  return context;
}

export const HoverSlider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const changeSlide = React.useCallback((index: number) => setActiveSlide(index), []);

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </HoverSliderContext.Provider>
    );
  }
);
HoverSlider.displayName = "HoverSlider";

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "));
  const characters = words.map((word) => word.split("")).flat(1);
  return { words, characters };
}

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { text: string; index: number }
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const { characters } = splitText(text);
  const isActive = activeSlide === index;

  return (
    <span
      className={cn("relative inline-block origin-bottom overflow-hidden cursor-pointer pb-1", className)}
      {...props}
      ref={ref}
      onMouseEnter={() => changeSlide(index)}
    >
      {characters.map((char, i) => {
        const displayChar = char === " " ? "\u00A0" : char;
        return (
          <span key={`${char}-${i}`} className="relative inline-block overflow-hidden">
            <MotionConfig
              transition={{
                delay: i * 0.02,
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Inactive State (faded, pushed up when active) */}
              <motion.span
                className="inline-block opacity-40 transition-opacity"
                initial={{ y: "0%" }}
                animate={isActive ? { y: "-120%" } : { y: "0%" }}
              >
                {displayChar}
              </motion.span>

              {/* Active State (bright, rolls up from bottom) */}
              <motion.span
                className="absolute left-0 top-0 inline-block opacity-100"
                initial={{ y: "120%" }}
                animate={isActive ? { y: "0%" } : { y: "120%" }}
              >
                {displayChar}
              </motion.span>
            </MotionConfig>
          </span>
        );
      })}
    </span>
  );
});
TextStaggerHover.displayName = "TextStaggerHover";

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  },
};

export const HoverSliderContentWrap = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
          className
        )}
        {...props}
      />
    );
  }
);
HoverSliderContentWrap.displayName = "HoverSliderContentWrap";

export const HoverSliderTextContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & { index: number; description: string }
>(({ index, description, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext();
  return (
    <motion.div
      className={cn("flex flex-col justify-center", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.6 }}
      variants={clipPathVariants}
      initial="hidden"
      animate={activeSlide === index ? "visible" : "hidden"}
      ref={ref}
      {...props}
    >
      <p className="text-[clamp(1rem,1.6vw,1.6rem)] font-light leading-relaxed text-textInverted opacity-80 text-justify">
        {description}
      </p>
    </motion.div>
  );
});
HoverSliderTextContent.displayName = "HoverSliderTextContent";

const SERVICES = [
  { 
    num: "01", 
    title: "Web Design", 
    desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience — tailored to your brand and your audience." 
  },
  { 
    num: "02", 
    title: "WordPress Development", 
    desc: "Custom WordPress builds from the ground up, including theme customisation, plugin integration, and performance optimisation for reliable, scalable sites." 
  },
  { 
    num: "03", 
    title: "Custom Plugin Development", 
    desc: "Bespoke WordPress plugins built to solve your exact business needs — from booking sync tools and payment integrations to custom dashboards and beyond." 
  },
  { 
    num: "04", 
    title: "Branding & Identity", 
    desc: "Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear, memorable, and premium presence." 
  },
  { 
    num: "05", 
    title: "UI/UX Design", 
    desc: "Thoughtful, user-centred interface design that balances aesthetics with function, ensuring every interaction feels intuitive and on-brand." 
  },
  { 
    num: "06", 
    title: "Frontend Web Dev", 
    desc: "Building responsive, high-performance web applications using modern JavaScript frameworks like React, Next.js, and sleek animation libraries for premium interactive experiences." 
  }
];

export default function AnimatedServices() {
  return (
    <section id="services" className="bg-inverted rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 transition-colors duration-300 relative z-20">
      <h2 className="text-textInverted font-black uppercase text-center text-[clamp(1.8rem,5.5vw,3.5rem)] tracking-tight mb-16 sm:mb-20 md:mb-28 leading-none">
        Services
      </h2>
      
      <HoverSlider className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 lg:items-stretch">
          
          {/* Left Side: Staggered Titles */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6 w-full lg:w-[55%] pb-10 lg:pb-0">
            {SERVICES.map((svc, index) => (
              <div key={svc.num} className="flex items-center gap-4 sm:gap-6 group">
                <span className="text-textInverted opacity-40 font-black text-[clamp(1rem,1.8vw,1.8rem)] leading-none transition-opacity group-hover:opacity-80">
                  {svc.num}
                </span>
                <TextStaggerHover
                  index={index}
                  className="text-textInverted text-[clamp(1rem,2.1vw,2.2rem)] font-black uppercase tracking-tight"
                  text={svc.title}
                />
              </div>
            ))}
          </div>

          {/* Right Side: Elaborating Text that swaps via clip-path */}
          <div className="w-full lg:w-[45%] flex items-center lg:border-l border-textInverted/20 lg:pl-16 relative min-h-[150px] lg:min-h-[400px]">
            <HoverSliderContentWrap className="absolute inset-0 lg:left-16 flex items-center">
              {SERVICES.map((svc, index) => (
                <HoverSliderTextContent
                  key={svc.num}
                  index={index}
                  description={svc.desc}
                />
              ))}
            </HoverSliderContentWrap>
          </div>
          
        </div>
      </HoverSlider>
    </section>
  );
}
