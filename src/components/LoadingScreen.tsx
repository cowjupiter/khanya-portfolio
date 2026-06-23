import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const facts = [
  { emoji: '🏆', text: "I won a logo competition for a Choma initiative called WeCare." },
  { emoji: '☕', text: "I probably drink way more coffee than the daily recommended intake. Probably." },
  { emoji: '✔️', text: "I have a Nike swoosh tattoo. Just do it, right?" },
  { emoji: '🎮', text: "I love and hate FPS games. Mostly hate. But also love." },
  { emoji: '🎬', text: "Big fan of horror movies and TV shows. The scarier, the better." },
  { emoji: '📖', text: "My favourite book is 'The Game of Life and How to Play It' by Florence Shinn." },
  { emoji: '🕷️', text: "My favourite superhero is Spider-Man. No further questions." },
  { emoji: '📺', text: "Self & YouTube-taught in everything — except cyber security. That one came with a certificate." },
  { emoji: '💡', text: "My design philosophy: create now, make it perfect later." },
  { emoji: '🧠', text: "I think I have ADHD. I also think I— oh look, a new design idea." },
];

// No props needed — the loader manages its own lifecycle
export function LoadingScreen() {
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * facts.length));
  const [visible, setVisible] = useState(true);

  const FACT_INTERVAL = 2400;
  const MIN_DISPLAY_TIME = 3500;

  const handleDone = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    let minTimeDone = false;
    let pageLoaded = false;

    const tryDismiss = () => {
      if (minTimeDone && pageLoaded) handleDone();
    };

    const minTimer = setTimeout(() => {
      minTimeDone = true;
      tryDismiss();
    }, MIN_DISPLAY_TIME);

    if (document.readyState === 'complete') {
      pageLoaded = true;
    } else {
      const onLoad = () => { pageLoaded = true; tryDismiss(); };
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => clearTimeout(minTimer);
  }, [handleDone]);

  // Cycle through facts continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % facts.length);
    }, FACT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-white overflow-hidden select-none"
          // Pointer events none so the page behind is already interactive once loaded
          style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
          <div className="relative z-10 flex flex-col items-center gap-10 px-8 max-w-xl text-center">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-black/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em]">
                Hold on tight ✨
              </span>
              <h2 className="hero-heading font-black text-2xl sm:text-3xl tracking-tight leading-snug max-w-[420px] uppercase">
                Random facts about me
              </h2>
              <p className="text-black/40 font-light text-sm sm:text-base tracking-wide">
                while we get things ready for you
              </p>
            </motion.div>

            {/* Divider */}
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-black/15 to-transparent" />

            {/* Cycling Fact Card */}
            <div className="w-full min-h-[110px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={factIndex}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-4"
                >
                  <span className="text-5xl sm:text-6xl">
                    {facts[factIndex].emoji}
                  </span>
                  <p className="text-black/70 font-medium text-base sm:text-lg leading-relaxed max-w-sm">
                    {facts[factIndex].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-2">
              {facts.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i === factIndex ? 1.4 : 1,
                    backgroundColor: i === factIndex ? '#000000' : '#00000020'
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-1.5 h-1.5 rounded-full"
                />
              ))}
            </div>

            {/* Subtle bottom note */}
            <p className="text-black/25 text-[10px] uppercase tracking-widest font-semibold">
              Preparing your experience...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
