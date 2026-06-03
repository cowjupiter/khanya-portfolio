import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const TABS = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact" },
];

export const NavHeader = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [hoverStyle, setHoverStyle] = useState<{ left: number; width: number } | null>(null);
  const [activeStyle, setActiveStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLUListElement>(null);

  // Dynamic Island State
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const lastScrollY = useRef(0);

  // Measure and store a tab's position relative to the <ul>
  const measure = (index: number) => {
    const tab = tabRefs.current[index];
    if (!tab) return null;
    return { left: tab.offsetLeft, width: tab.offsetWidth };
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      if (window.innerWidth >= 768) {
        setIsExpanded(false); // Reset expansion if we go back to desktop
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set scroll baseline when opened and toggle body class
  useEffect(() => {
    if (isExpanded) {
      lastScrollY.current = window.scrollY;
    }

    if (isMobile && isExpanded) {
      document.body.classList.add("nav-menu-open");
    } else {
      document.body.classList.remove("nav-menu-open");
    }

    return () => {
      document.body.classList.remove("nav-menu-open");
    };
  }, [isExpanded, isMobile]);

  // Collapse on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded && isMobile) {
        if (Math.abs(window.scrollY - lastScrollY.current) > 15) {
          setIsExpanded(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded, isMobile]);

  // Robustly update active pill whenever activeTab changes, layout mounts, or window resizes
  useEffect(() => {
    const updateActive = () => {
      if (isMobile && !isExpanded) return; // Don't measure if full menu is hidden
      
      const idx = TABS.findIndex((t) => t.id === activeTab);
      const dim = measure(idx);
      if (dim) {
        setActiveStyle(dim);
      }
    };

    updateActive();
    const timer = setTimeout(updateActive, 150);

    window.addEventListener("resize", updateActive);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateActive);
    };
  }, [activeTab, isExpanded, isMobile]);

  // Scroll spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(id); },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (isMobile) setIsExpanded(false);
  };

  const showIslandPill = isMobile && !isExpanded;

  return (
    <motion.nav
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative flex border border-textMain/20 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden transition-colors duration-300 ${
        showIslandPill 
          ? "p-2 px-4 items-center gap-2 cursor-pointer rounded-2xl bg-black/90 dark:bg-white/90 text-white dark:text-black border-transparent shadow-xl" 
          : isMobile && isExpanded
            ? "p-2 flex-col items-stretch rounded-[20px] bg-black/95 dark:bg-white/95 text-white dark:text-black border-transparent shadow-2xl min-w-[200px]"
            : "p-1 items-center w-fit rounded-full bg-textMain/5"
      }`}
      onClick={() => {
        if (showIslandPill) setIsExpanded(true);
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {showIslandPill ? (
          <motion.div
            key="island-pill"
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Menu className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Menu</span>
          </motion.div>
        ) : (
          <motion.ul
            key="full-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={containerRef}
            className={`relative flex ${isMobile ? "flex-col w-full" : "w-fit items-center"}`}
            onMouseLeave={() => !isMobile && setHoverStyle(null)}
          >
            {isMobile && (
              <div className="flex items-center justify-between w-full pl-4 pr-2 py-1.5 border-b border-white/10 dark:border-black/10 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 dark:text-black/40">Menu</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="text-white/70 hover:text-white dark:text-black/70 dark:hover:text-black p-1 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Hover pill */}
            <AnimatePresence>
              {!isMobile && hoverStyle && (
                <motion.div
                  key="hover"
                  className="absolute top-1 bottom-1 rounded-full bg-textMain/20 pointer-events-none"
                  initial={{ opacity: 0, ...hoverStyle }}
                  animate={{ opacity: 1, ...hoverStyle }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  style={{ left: hoverStyle.left, width: hoverStyle.width }}
                />
              )}
            </AnimatePresence>

            {/* Active pill */}
            {!isMobile && (
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-textMain pointer-events-none"
                animate={activeStyle}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                style={{
                  left: activeStyle.left,
                  width: activeStyle.width,
                  opacity: activeStyle.width > 0 ? 1 : 0,
                }}
              />
            )}

            {TABS.map((tab, i) => {
              const isActive = tab.id === activeTab;
              return (
                <li
                  key={tab.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      const dim = measure(i);
                      if (dim) setHoverStyle(dim);
                    }
                  }}
                  className={`relative z-10 ${isMobile ? "w-full" : ""}`}
                >
                  <a
                    href={`#${tab.id}`}
                    onClick={(e) => handleClick(e, tab.id)}
                    className={
                      isMobile
                        ? `block w-full px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-widest select-none transition-all duration-300 rounded-xl ${
                            isActive
                              ? "bg-white text-black dark:bg-black dark:text-white shadow-sm scale-[1.02]"
                              : "text-white/60 hover:text-white dark:text-black/60 dark:hover:text-black hover:bg-white/5 dark:hover:bg-black/5"
                          }`
                        : `block px-3 py-2.5 sm:px-4 md:px-5 md:py-2.5 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest whitespace-nowrap select-none transition-colors duration-300 ${
                            isActive 
                              ? "text-main" 
                              : "text-textMain/60 hover:text-textMain"
                          }`
                    }
                  >
                    {tab.label}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
