"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GripHorizontal } from 'lucide-react';

import peaceHavenLogo from '../../assets/peacehaven/PeaceHavenLOGO.webp';
import isitheloLogo from '../../assets/isithelo sekhethelo/IS_LOGO.webp';
import monoshezLogo from '../../assets/Monoshez Holdings/MONOSHEZ_LOGO.webp';
import salmaxLogo from '../../assets/Salmax/SALMAX_LOGO.webp';

interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
  avatar: string;
}

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  id: number;
  author: string;
  avatar: string;
}

export function TestimonialCard({ handleShuffle, testimonial, position, author, avatar }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "3" : position === "middle" ? "2" : position === "back" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : position === "back" ? "6deg" : "12deg",
        x: position === "front" 
          ? "0%" 
          : position === "middle" 
            ? "calc(var(--card-offset) * 1)" 
            : position === "back" 
              ? "calc(var(--card-offset) * 2)" 
              : "calc(var(--card-offset) * 3)",
        scale: position === "front" ? 1 : position === "middle" ? 0.94 : position === "back" ? 0.88 : 0.82,
        filter: position === "front" ? "blur(0px)" : position === "middle" ? "blur(0.5px)" : position === "back" ? "blur(1.2px)" : "blur(2px)",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e: any) => {
        // Handle touch or mouse clientX
        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
        dragRef.current = clientX;
      }}
      onDragEnd={(e: any) => {
        const clientX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX) || 0;
        if (dragRef.current - clientX > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`absolute left-0 top-0 flex flex-col h-[400px] w-[300px] sm:h-[430px] sm:w-[330px] select-none justify-between rounded-3xl border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/40 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-colors duration-300 [--card-offset:10%] sm:[--card-offset:24%] ${
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* Top drag handle indicator */}
      {isFront && (
        <div className="flex justify-center items-center opacity-30 animate-pulse mb-2">
          <GripHorizontal className="w-5 h-5 text-textMain" />
        </div>
      )}

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <img
          src={avatar}
          alt={`Logo of ${author}`}
          className="pointer-events-none h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-white/40 dark:border-white/10 shadow-lg object-contain bg-white p-3"
        />
      </div>

      {/* Quote */}
      <p className="text-center text-sm sm:text-base italic font-light leading-relaxed text-textMain/80 flex-1 flex items-center justify-center py-4">
        "{testimonial}"
      </p>

      {/* Author Profile */}
      <div className="text-center">
        <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-textMain">
          {author.split(" — ")[0]}
        </h4>
        <p className="text-[10px] sm:text-xs font-light uppercase tracking-wider text-textMain/50 mt-1">
          {author.split(" — ")[1]}
        </p>
      </div>
    </motion.div>
  );
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    avatar: peaceHavenLogo,
    testimonial: "Khanya built a custom booking portal for our guest house that syncs rooms seamlessly. The user interface is absolutely breathtaking, and booking conversions increased by 42% in the first month!",
    author: "Peace Haven on Lagoon — FOUNDER"
  },
  {
    id: 2,
    avatar: isitheloLogo,
    testimonial: "We needed a highly bespoke e-commerce store with elegant visual interactions. Khanya delivered an absolute masterpiece. Our brand identity now feels incredibly premium and conversion-focused!",
    author: "Isithelo Sekhethelo — FOUNDER"
  },
  {
    id: 3,
    avatar: monoshezLogo,
    testimonial: "Our old platform was slow and clunky. Khanya migrated us to custom WordPress with custom plugins built specifically for our automated reporting sync. Exceptionally skilled developer and designer!",
    author: "Monoshez Holdings — FOUNDER"
  },
  {
    id: 4,
    avatar: salmaxLogo,
    testimonial: "Khanya engineered a high-performance customer portal and digital product catalog for our industrial supply operations. Our quoting process is now fully automated, saving us hours of manual work every single day!",
    author: "Salmax — FOUNDER"
  }
];

export function ShuffleCards() {
  const [positions, setPositions] = React.useState(["front", "middle", "back", "farback"]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      // Pull back to front
      const back = next.pop();
      if (back) next.unshift(back);
      return next;
    });
  };

  return (
    <section className="bg-main px-6 py-20 sm:py-24 md:py-32 w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 relative">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 sm:gap-16 lg:gap-24 xl:gap-32 relative z-10">
        
        {/* Left Column: Heading & Navigation Guide */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md gap-4 sm:gap-6">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-textMain/40 border border-textMain/20 rounded-full px-3 py-1 bg-textMain/5">
            Client Success
          </span>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(1.8rem,5.5vw,3.5rem)]">
            What they say
          </h2>
          <p className="text-textMain/60 font-light leading-relaxed text-sm sm:text-base">
            Honest feedback from long-term brand partners. Drag and throw the front card to cycle through our custom client projects.
          </p>

          {/* Interactive Swipe Guide */}
          <div className="flex items-center gap-3 mt-4 text-textMain/50 text-xs sm:text-sm font-medium animate-pulse">
            <ArrowLeft className="w-4 h-4 text-textMain/80" />
            <span>Swipe or drag card left to shuffle</span>
          </div>
        </div>

        {/* Right Column: Stacked Cards Showcase */}
        <div className="relative h-[410px] w-[300px] sm:h-[440px] sm:w-[330px] flex items-center justify-center -ml-[20px] sm:ml-0 lg:mr-16 xl:mr-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              handleShuffle={handleShuffle}
              position={positions[index]}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
