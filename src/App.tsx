import { useEffect, useRef, Suspense, lazy, useState, useCallback } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));
import { motion, useScroll, useTransform } from 'framer-motion';
import { ContactButton } from './components/ContactButton';
import { GraphicDesignPortfolio } from './components/ui/graphic-design-portfolio';
import { LiveProjectButton } from './components/LiveProjectButton';
import { FadeIn } from './components/FadeIn';
import { AnimatedText } from './components/AnimatedText';
import { ThemeToggle } from './components/ThemeToggle';
import { NavHeader } from './components/NavHeader';
import { LoadingScreen } from './components/LoadingScreen';
import { ShuffleCards } from './components/ui/testimonial-cards';
import { ContactSection } from './components/ui/liquid-glass';
import { InfiniteGrid } from './components/ui/infinite-grid';
import MultiOrbitSemiCircle from './components/ui/multi-orbit-semi-circle';
import { LogoCard } from './components/ui/logo-card';
import AnimatedServices from './components/ui/animated-services';
import Lenis from 'lenis';

import peaceHavenLogo from './assets/peacehaven/PeaceHavenLOGO.webp';
import peaceHavenPng from './assets/peacehaven/peacehavenPNG.webp';
import peaceHavenGif from './assets/peacehaven/peacehavenIGF.gif';

import isitheloLogo from './assets/isithelo sekhethelo/IS_LOGO.webp';
import isitheloPng from './assets/isithelo sekhethelo/IS_PNG.webp';
import isitheloGif from './assets/isithelo sekhethelo/is_GIF.gif';

import monoshezLogo from './assets/Monoshez Holdings/MONOSHEZ_LOGO.webp';
import monoshezPng from './assets/Monoshez Holdings/monoshez_PNG.webp';
import monoshezGif from './assets/Monoshez Holdings/monoshez_GIF.gif';

import ultimateLogo from './assets/Ultimate Holdings/uh_logo.webp';
import ultimatePng from './assets/Ultimate Holdings/uh_PNG.webp';
import ultimateGif from './assets/Ultimate Holdings/uh_GIF.gif';

import amplifyLogo from './assets/AmplifySA/AMPLIFY_LOGO.webp';
import amplifyPng from './assets/AmplifySA/ammplify_PNG.webp';
import amplifyGif from './assets/AmplifySA/amplify_GIF.gif';

import ekhayaLogo from './assets/EKHAYA/ekhaya-logo.webp';
import ekhayaPng from './assets/EKHAYA/ekhaya_PNG.webp';
import ekhayaGif from './assets/EKHAYA/ekhaya_GIF.gif';

import serenityLogo from './assets/Shades of Serenity/sos_LOGO.webp';
import serenityPng from './assets/Shades of Serenity/sos_PNG.webp';
import serenityGif from './assets/Shades of Serenity/sos_GIF.gif';

import salmaxLogo from './assets/Salmax/SALMAX_LOGO.webp';
import salmaxPng from './assets/Salmax/salmax_PNG.webp';
import salmaxGif from './assets/Salmax/salmax_GIF.gif';

import academatrixLogo from './assets/Academatrix/ACADEMATRIX_LOGO.webp';
import academatrixPng from './assets/Academatrix/academatrix_still.webp';
import academatrixGif from './assets/Academatrix/academatrix_GIF.gif';

import selfAvatar from './assets/New Project.webp';

import wdbkLogo from './assets/innet money logos/wdbk logo.png';

import academatrixLogoImg from './assets/LOGOS/Logo - academatrix.webp';
import peaceHavenLogoImg from './assets/LOGOS/PeaceHaven_PeaceHaven Logo-06.webp';

import allThingsAdsLogoImg from './assets/LOGOS/all things ads logo.webp';
import amplifyLogoImg from './assets/LOGOS/amplify logo.webp';
import ekhayaLogoImg from './assets/LOGOS/ekhaya-logo (1).webp';
import financePortalLogoImg from './assets/LOGOS/finance portal logo.webp';
import isitheloLogoImg from './assets/LOGOS/isithelo sekhethelo logo.webp';
import salmaxLogoImg from './assets/LOGOS/logo-salmax.webp';
import monoshezLogoImg from './assets/LOGOS/monoshez logo.webp';
import ultimateLogoImg from './assets/LOGOS/ultimate holdings_logo.webp';
import weCareLogoImg from './assets/LOGOS/we care logo.webp';

const clientLogos = [
  { src: academatrixLogoImg, name: "academatrix", w: 256, h: 176, rot: -4 },
  { src: peaceHavenLogoImg, name: "peacehaven", w: 336, h: 224, rot: 3 },
  { src: allThingsAdsLogoImg, name: "all things ads logo.jpg", isDarkBg: true, w: 304, h: 200, rot: -5 },
  { src: amplifyLogoImg, name: "amplify", w: 240, h: 160, rot: 4 },
  { src: ekhayaLogoImg, name: "ekhaya", w: 280, h: 200, rot: -2 },
  { src: financePortalLogoImg, name: "finance portal", w: 320, h: 208, rot: 0 },
  { src: isitheloLogoImg, name: "isithelo", w: 256, h: 256, rot: 5 },
  { src: salmaxLogoImg, name: "salmax", w: 360, h: 224, rot: -3 },
  { src: monoshezLogoImg, name: "monoshez", w: 240, h: 160, rot: 2 },
  { src: ultimateLogoImg, name: "ultimate", w: 304, h: 208, rot: -6 },
  { src: weCareLogoImg, name: "we care", w: 272, h: 192, rot: 0 }
];

const row1 = [...clientLogos, ...clientLogos, ...clientLogos];



const projects = [
  {
    num: "01",
    cat: "Hospitality",
    name: "Peace Haven on Lagoon",
    img1: peaceHavenPng,
    img2: peaceHavenLogo,
    img3: peaceHavenGif,
    img2Class: "object-contain bg-white p-[10%]",
    link: "https://peacehavenonlagoon.com/"
  },
  {
    num: "02",
    cat: "Client",
    name: "Isithelo Sekhethelo",
    img1: isitheloPng,
    img2: isitheloLogo,
    img3: isitheloGif,
    img2Class: "object-contain bg-white p-[10%]",
    link: "https://isithelosekhethelo.co.za/"
  },
  {
    num: "03",
    cat: "Client",
    name: "Monoshez Holdings",
    img1: monoshezPng,
    img2: monoshezLogo,
    img3: monoshezGif,
    img2Class: "object-contain bg-white p-[10%]",
    link: "https://monoshezholdings.co.za/"
  },
  {
    num: "04",
    cat: "Client",
    name: "Ultimate Holdings",
    img1: ultimatePng,
    img2: ultimateLogo,
    img3: ultimateGif,
    img2Class: "object-contain bg-white p-[10%]",
    img3Class: "object-cover scale-[1.15] object-bottom",
    link: "https://ultimatehol.com/"
  },
  {
    num: "05",
    cat: "Client",
    name: "AmplifySA",
    img1: amplifyPng,
    img2: amplifyLogo,
    img3: amplifyGif,
    img2Class: "object-contain bg-white p-[10%]",
    link: "https://mbkbizsolutions.co.za/"
  },
  {
    num: "06",
    cat: "Client",
    name: "EKHAYA",
    img1: ekhayaPng,
    img2: ekhayaLogo,
    img3: ekhayaGif,
    img2Class: "object-contain bg-white p-[10%]",
    link: "https://ekhayalentokozo.co.za/"
  },
  {
    num: "07",
    cat: "Client",
    name: "Shades of Serenity",
    img1: serenityPng,
    img2: serenityLogo,
    img3: serenityGif,
    img2Class: "object-contain bg-white p-[10%]",
    link: "http://serenityblinds.co.za/"
  },
  {
    num: "08",
    cat: "Client",
    name: "Academatrix",
    img1: academatrixPng,
    img2: academatrixLogo,
    img3: academatrixGif,
    img2Class: "object-contain bg-white p-[10%]",
    img2MobileClass: "object-contain bg-white p-[8%]",
    img3Class: "object-cover scale-[1.15] object-bottom",
    link: "https://academatrix.com/"
  },
  {
    num: "09",
    cat: "Industrial",
    name: "Salmax",
    img1: salmaxPng,
    img2: salmaxLogo,
    img3: salmaxGif,
    img2Class: "object-contain bg-white p-[10%]",
    img2MobileClass: "object-contain bg-white p-[8%]",
    link: "https://salmax.co.za/"
  },
  {
    num: "10",
    cat: "This Portfolio",
    name: "THIS WEBSITE :)",
    isSelfCard: true
  }
];

function App() {
  const [isMobileDevice, setIsMobileDevice] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobileDevice(prev => prev !== mobile ? mobile : prev);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    if (isMobileDevice) return;
    const handleLoad = () => {
      setTimeout(() => setShouldLoad3D(true), 1200);
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isMobileDevice]);

  useEffect(() => {
    if (isMobileDevice) return; // Skip Lenis smooth scrolling on mobile devices to save main thread CPU

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isMobileDevice]);

  useEffect(() => {
    if (isMobileDevice) return; // Skip watermark removal polling on mobile since Spline is not rendered

    const removeWatermark = () => {
      const viewers = document.querySelectorAll('spline-viewer');
      viewers.forEach(viewer => {
        if (viewer.shadowRoot) {
          // Hide logo container inside the shadow DOM
          const logo = viewer.shadowRoot.querySelector('#logo');
          if (logo) {
            (logo as HTMLElement).style.display = 'none';
            (logo as HTMLElement).style.opacity = '0';
            (logo as HTMLElement).style.pointerEvents = 'none';
          }
          // Also hide via styling links with spline.design
          const links = viewer.shadowRoot.querySelectorAll('a');
          links.forEach(link => {
            if (link.href && link.href.includes('spline.design')) {
              link.style.display = 'none';
              link.style.opacity = '0';
              link.style.pointerEvents = 'none';
            }
          });
        }
      });
    };

    // Run immediately and then poll to ensure it catches dynamically loaded elements
    removeWatermark();
    const interval = setInterval(removeWatermark, 100);
    return () => clearInterval(interval);
  }, [isMobileDevice]);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectsScrollY } = useScroll({ target: projectsContainerRef });





  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <div className={`w-full bg-main overflow-x-clip text-textMain transition-colors duration-300 ${isLoading ? 'invisible' : 'visible'}`}>
      <div className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <FadeIn delay={0} y={-20} className="pointer-events-auto flex justify-center">
          <NavHeader />
        </FadeIn>
      </div>
      {/* SITE LOGO — top left, mirrors theme toggle on the right, positioned/sized to match white highlight */}
      <div className="fixed top-[20px] left-6 md:top-[12.5px] md:left-10 z-[99999] pointer-events-none">
        <FadeIn delay={0} y={-20}>
          <img
            src={wdbkLogo}
            alt="WDBK logo"
            className="h-[52px] md:h-[83px] w-auto object-contain"
          />
        </FadeIn>
      </div>
      <ThemeToggle />
      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex flex-col overflow-x-clip">
        {/* Spacer to keep layout intact since navbar is now fixed */}
        <div className="h-16 sm:h-20 md:h-24 flex-shrink-0" />

        <div className="flex-1 flex flex-col justify-center pointer-events-none relative z-20">
          <div className="overflow-hidden w-full mt-14 sm:mt-18 md:mt-20">
            <FadeIn delay={0.15} y={40}>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-normal sm:whitespace-nowrap text-center text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw]">
                Web Designs by Khanya
              </h1>
            </FadeIn>
          </div>
        </div>

        <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20 relative">
          <div className="flex flex-col gap-5 sm:gap-6 max-w-[160px] sm:max-w-[220px] md:max-w-[260px] relative z-30">
            <FadeIn delay={0.35} y={20}>
              <p className="text-textMain/80 font-light uppercase tracking-widest leading-relaxed text-[clamp(0.68rem,0.9vw,0.88rem)]">
                a web designer & developer crafting striking, conversion-focused digital experiences
              </p>
            </FadeIn>
            <FadeIn delay={0.5} y={20}>
              <ContactButton />
            </FadeIn>
          </div>
        </div>

        {/* SPLINE 3D ASSET */}
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
          <InfiniteGrid />
          {/* Floating Orb Wrapper - moves slowly across the screen (z-0) - 20% larger */}
          <div className="absolute z-0 w-[55vw] h-[55vw] max-w-[620px] max-h-[620px] min-w-[340px] min-h-[340px] pointer-events-none float-orb">
            {/* Morphing & Spinning Liquid Orb shape */}
            <div className="w-full h-full rounded-full liquid-orb blur-[70px] sm:blur-[100px] md:blur-[130px] opacity-45 dark:opacity-30 bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 dark:from-indigo-600 dark:via-purple-500 dark:to-cyan-500 transition-all duration-500" />
          </div>

          {/* Spline Canvas wrapper - strictly z-10 to stay in front of the liquid background - disabled on mobile */}
          {!isMobileDevice && shouldLoad3D && (
            <motion.div 
              className="relative z-10 w-full h-full pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -15, 0] }}
              transition={{
                opacity: { duration: 1, ease: "easeOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Suspense fallback={null}>
                <Spline
                  scene="https://prod.spline.design/AamdgtFi4U53xPxO/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
            </motion.div>
          )}
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section ref={marqueeRef} className="bg-main pt-24 sm:pt-32 md:pt-40 pb-2 sm:pb-4 overflow-hidden transition-colors duration-300 relative">
        <div className="absolute inset-0 max-md:hidden top-[20%] -z-10 h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]"></div>

        <div className="flex flex-col items-center mb-8 sm:mb-12 px-4">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-textMain/40 border border-textMain/20 rounded-full px-3 py-1 bg-textMain/5 mb-3 sm:mb-4">
            Partners & Clients
          </span>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(1rem,3vw,35px)]">
            Companies I've Worked With
          </h2>
        </div>

        <div className="flex flex-col items-center pt-8 pb-14 w-full overflow-hidden">
          <div
            className="animate-marquee-infinite flex items-center flex-nowrap will-change-transform w-max -space-x-6 sm:-space-x-10 md:-space-x-16"
          >
            {row1.map((logo, i) => (
              <LogoCard
                key={`r1-${i}`}
                src={logo.src}
                alt={logo.name}
                isDarkBg={logo.isDarkBg}
                width={logo.w}
                height={logo.h}
                rotation={logo.rot}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative min-h-[75vh] md:min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 pt-4 pb-14 sm:pt-6 sm:pb-20 overflow-hidden">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[2%] sm:left-[6%] md:left-[10%] w-[60px] sm:w-[140px] md:w-[180px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-full object-contain" />
        </FadeIn>
        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[2%] sm:right-[6%] md:right-[10%] w-[80px] sm:w-[170px] md:w-[220px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-full object-contain" />
        </FadeIn>

        <div className="flex flex-col items-center z-10 gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(1.8rem,5.5vw,3.5rem)]">
              About me
            </h2>
          </FadeIn>

          <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
            <AnimatedText
              text="With over five years of experience in web design and development, i specialise in WordPress, custom plugin development, and premium digital experiences. i work with businesses across South Africa — from hospitality to skincare to financial services — helping them show up online with clarity, confidence, and style. Let's build something incredible together!"
              className="text-textMain font-medium text-justify leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]"
            />
            <ContactButton />
          </div>
        </div>
      </section>

      {/* CREATIVE TOOLKIT (SKILLS) */}
      <MultiOrbitSemiCircle />

      {/* SERVICES SECTION */}
      <AnimatedServices />

      {/* PROJECTS SECTION */}
      <section id="projects" ref={projectsContainerRef} className="bg-main rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 transition-colors duration-300">
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(1.8rem,5.5vw,3.5rem)] tracking-tight mb-16 sm:mb-20 md:mb-28">
          Projects
        </h2>

        {/* === MOBILE: plain vertical list (no stacking) === */}
          {isMobileDevice && (
            <div className="flex flex-col gap-6">
              {projects.map((proj, i) => (
                <div key={i} className="w-full rounded-[30px] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-4 flex flex-col gap-4 transition-colors duration-300">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-textMain font-black text-[clamp(2rem,10vw,3.5rem)] leading-none">{proj.num}</span>
                      <div className="flex flex-col">
                        <span className="text-textMain/60 uppercase tracking-widest text-[10px] mb-0.5">{proj.cat}</span>
                        <h3 className="text-textMain font-medium uppercase text-[clamp(0.9rem,4.5vw,1.4rem)] leading-tight">{proj.name}</h3>
                      </div>
                    </div>
                    {!proj.isSelfCard && <LiveProjectButton href={proj.link} />}
                  </div>

                  {/* Card Image */}
                  {proj.isSelfCard ? (
                    <div className="rounded-[20px] overflow-hidden relative h-[200px] bg-black/5 dark:bg-white/5">
                      <img src={selfAvatar} alt="Khanya avatar" className="absolute inset-0 w-full h-full object-cover scale-[1.15]" loading="lazy" />
                    </div>
                  ) : (
                    <div className="rounded-[20px] overflow-hidden relative h-[200px]" style={{ background: (proj as any).img2MobileClass ? '#ffffff' : 'rgba(0,0,0,0.05)' }}>
                      <img
                        src={proj.img2}
                        alt={`${proj.name} logo`}
                        className={`absolute inset-0 w-full h-full ${
                          (proj as any).img2MobileClass || ((proj as any).img2Class || 'object-contain p-[10%]')
                        }`}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* === DESKTOP: sticky stacked animation === */}
          {!isMobileDevice && projects.map((proj, i) => (
            <DesktopProjectCard
              key={i}
              proj={proj}
              i={i}
              projectsScrollY={projectsScrollY}
              totalProjects={projects.length}
            />
          ))}
      </section>

      {/* GRAPHIC DESIGN PORTFOLIO */}
      <GraphicDesignPortfolio />

      {/* TESTIMONIALS SECTION */}
      <ShuffleCards />

      {/* CONTACT/FOOTER SECTION */}
      <ContactSection />
    </div>
    </>
  );
}

interface DesktopProjectCardProps {
  proj: typeof projects[0];
  i: number;
  projectsScrollY: any;
  totalProjects: number;
}

function DesktopProjectCard({ proj, i, projectsScrollY, totalProjects }: DesktopProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const targetScale = 1 - (totalProjects - 1 - i) * 0.03;
  const scale = useTransform(projectsScrollY, [i / totalProjects, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 md:top-32 h-[85vh] flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(10vh + ${i * 28}px)` }}
        className="w-full h-full max-h-[800px] rounded-[50px] md:rounded-[60px] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col gap-6 sm:gap-8 transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="text-textMain font-black text-[clamp(3rem,8vw,100px)] leading-none">{proj.num}</span>
            <div className="flex flex-col">
              <span className="text-textMain/60 uppercase tracking-widest text-xs sm:text-sm mb-1">{proj.cat}</span>
              <h3 className="text-textMain font-medium uppercase text-[clamp(1.2rem,3vw,2.5rem)] leading-tight">{proj.name}</h3>
            </div>
          </div>
          {!proj.isSelfCard && <LiveProjectButton href={proj.link} />}
        </div>

        {/* Card Content */}
        {proj.isSelfCard ? (
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 flex-1 min-h-0 items-stretch p-2 sm:p-4">
            <div className="w-full sm:w-[50%] flex flex-col justify-center gap-4 text-left">
              <h4 className="text-[clamp(1.1rem,2.5vw,2rem)] font-bold text-textMain uppercase tracking-tight">Khanya's Digital Space</h4>
              <p className="text-[clamp(0.8rem,1.5vw,1.1rem)] text-textMain/80 font-light leading-relaxed">
                This portfolio landing page is built from scratch as a showcase of interactive 3D elements, premium micro-interactions, responsive typography, and state-of-the-art asset optimization.
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {['React 18', 'TypeScript', 'TailwindCSS', 'Spline 3D', 'Framer Motion', 'Lenis', 'Sharp (WebP)'].map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white/40 dark:bg-black/30 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 text-textMain/80">{tech}</span>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-[50%] flex-1 rounded-[40px] md:rounded-[50px] overflow-hidden min-h-[200px] relative">
              <img src={selfAvatar} alt="Khanya pixel art avatar" className="absolute inset-0 w-full h-full object-cover scale-[1.15]" loading="lazy" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 flex-1 min-h-0">
            <div className="hidden sm:flex w-full sm:w-[40%] flex-col gap-4 min-h-0">
              <div className="h-[30%] sm:h-[clamp(130px,16vw,230px)] rounded-[40px] md:rounded-[50px] overflow-hidden shrink-0 relative bg-black/5 dark:bg-white/5">
                <img src={proj.img2} alt={`${proj.name} logo`} className={`absolute inset-0 w-full h-full ${(proj as any).img2Class || 'object-cover'}`} loading="lazy" />
              </div>
              <div className="flex-1 rounded-[40px] md:rounded-[50px] overflow-hidden min-h-0 relative bg-black/5 dark:bg-white/5">
                <img src={proj.img1} alt={`${proj.name} desktop preview`} className={`absolute inset-0 w-full h-full ${(proj as any).img1Class || 'object-cover'}`} loading="lazy" />
              </div>
            </div>
            {/* The right side defaults to img1 (still WebP) and swaps to img3 (GIF) on hover. */}
            <div className="w-full sm:w-[60%] flex-1 rounded-[40px] md:rounded-[50px] overflow-hidden min-h-0 relative min-h-[220px] bg-black/5 dark:bg-white/5">
              <img 
                src={isHovered ? proj.img3 : proj.img1} 
                alt={`${proj.name} showcase preview`} 
                className={`absolute inset-0 w-full h-full ${isHovered ? ((proj as any).img3Class || 'object-cover') : ((proj as any).img1Class || 'object-cover')}`} 
                loading="lazy" 
              />
              {/* Subtle hover overlay prompt to show it's interactive on desktop */}
              {!isHovered && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-textMain">
                    Hover to Play GIF
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
