import { useEffect, useRef, Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));
import { motion, useScroll, useTransform } from 'framer-motion';
import { ContactButton } from './components/ContactButton';
import { LiveProjectButton } from './components/LiveProjectButton';
import { FadeIn } from './components/FadeIn';
import { AnimatedText } from './components/AnimatedText';
import { ThemeToggle } from './components/ThemeToggle';
import { NavHeader } from './components/NavHeader';
import { ShuffleCards } from './components/ui/testimonial-cards';
import { ContactSection } from './components/ui/liquid-glass';
import Lenis from 'lenis';

const images = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const row1 = [...images.slice(0, 11), ...images.slice(0, 11), ...images.slice(0, 11)];
const row2 = [...images.slice(11), ...images.slice(11), ...images.slice(11)];

const services = [
  { num: "01", title: "Web Design", desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience — tailored to your brand and your audience." },
  { num: "02", title: "WordPress Development", desc: "Custom WordPress builds from the ground up, including theme customisation, plugin integration, and performance optimisation for reliable, scalable sites." },
  { num: "03", title: "Custom Plugin Development", desc: "Bespoke WordPress plugins built to solve your exact business needs — from booking sync tools and payment integrations to custom dashboards and beyond." },
  { num: "04", title: "Branding & Identity", desc: "Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear, memorable, and premium presence." },
  { num: "05", title: "UI/UX Design", desc: "Thoughtful, user-centred interface design that balances aesthetics with function, ensuring every interaction feels intuitive and on-brand." }
];

const projects = [
  {
    num: "01",
    cat: "Hospitality",
    name: "Peace Haven on Lagoon",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
  },
  {
    num: "02",
    cat: "Client",
    name: "Isithelo Sekhethelo",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
  },
  {
    num: "03",
    cat: "Client",
    name: "Monoshez Holdings",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
  },
  {
    num: "04",
    cat: "Industrial",
    name: "Salmax Group",
    img1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1280&q=85",
    img2: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1280&q=85",
    img3: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1280&q=85"
  }
];

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectsScrollY } = useScroll({ target: projectsContainerRef });

  const x1 = useTransform(scrollY, (y) => {
    if (!marqueeRef.current) return -200;
    const sectionTop = marqueeRef.current.offsetTop;
    const offset = (y - sectionTop + window.innerHeight) * 0.3;
    return offset - 200;
  });

  const x2 = useTransform(scrollY, (y) => {
    if (!marqueeRef.current) return 200;
    const sectionTop = marqueeRef.current.offsetTop;
    const offset = (y - sectionTop + window.innerHeight) * 0.3;
    return -(offset - 200);
  });

  return (
    <div className="w-full bg-main overflow-x-clip text-textMain transition-colors duration-300">
      <ThemeToggle />
      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex flex-col overflow-x-clip">
        <FadeIn delay={0} y={-20} className="flex justify-center items-center px-6 md:px-10 pt-6 md:pt-8 relative z-30">
          <NavHeader />
        </FadeIn>

        <div className="flex-1 flex flex-col justify-center relative z-10 pointer-events-none">
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
        <div className="absolute inset-0 z-0 w-full h-full flex items-center justify-center overflow-hidden">
          {/* Floating Orb Wrapper - moves slowly across the screen (z-0) - 20% larger */}
          <div className="absolute z-0 w-[55vw] h-[55vw] max-w-[620px] max-h-[620px] min-w-[340px] min-h-[340px] pointer-events-none float-orb">
            {/* Morphing & Spinning Liquid Orb shape */}
            <div className="w-full h-full rounded-full liquid-orb blur-[70px] sm:blur-[100px] md:blur-[130px] opacity-45 dark:opacity-30 bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 dark:from-indigo-600 dark:via-purple-500 dark:to-cyan-500 transition-all duration-500" />
          </div>
          
          {/* Spline Canvas wrapper - strictly z-10 to stay in front of the liquid background */}
          <div className="relative z-10 w-full h-full">
            <Suspense fallback={null}>
              <Spline
                scene="https://prod.spline.design/AamdgtFi4U53xPxO/scene.splinecode"
                className="w-full h-full"
              />
            </Suspense>
          </div>
          {/* Spline Watermark Mask - strictly z-20 so it sits on top of the canvas */}
          <div className="absolute bottom-0 right-0 w-[150px] h-[48px] bg-main transition-colors duration-300 pointer-events-none z-20" />
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section ref={marqueeRef} className="bg-main pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden transition-colors duration-300">
        <div className="flex flex-col gap-3">
          <motion.div 
            className="flex gap-3 will-change-transform"
            style={{ x: x1 }}
          >
            {row1.map((src, i) => (
              <img key={`r1-${i}`} src={src} className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" loading="lazy" alt="" />
            ))}
          </motion.div>
          <motion.div 
            className="flex gap-3 will-change-transform"
            style={{ x: x2 }}
          >
            {row2.map((src, i) => (
              <img key={`r2-${i}`} src={src} className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" loading="lazy" alt="" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[2%] sm:left-[6%] md:left-[10%] w-[60px] sm:w-[140px] md:w-[180px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-full object-contain" />
        </FadeIn>
        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[2%] sm:right-[6%] md:right-[10%] w-[80px] sm:w-[170px] md:w-[220px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-full object-contain" />
        </FadeIn>

        <div className="flex flex-col items-center z-10 gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
              About me
            </h2>
          </FadeIn>
          
          <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
            <AnimatedText 
              text="With over five years of experience in web design and development, i specialise in WordPress, custom plugin development, and premium digital experiences. i work with businesses across South Africa — from hospitality to skincare to financial services — helping them show up online with clarity, confidence, and style. Let's build something incredible together!"
              className="text-textMain font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]"
            />
            <ContactButton />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="bg-inverted rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 transition-colors duration-300">
        <h2 className="text-textInverted font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Services
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col">
          {services.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.1} y={30} className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 border-b border-borderLight last:border-0">
              <span className="text-textInverted font-black text-[clamp(3rem,10vw,140px)] leading-none sm:w-[150px] md:w-[200px] shrink-0">
                {svc.num}
              </span>
              <div className="flex flex-col gap-2 sm:gap-4">
                <h3 className="text-textInverted font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)]">
                  {svc.title}
                </h3>
                <p className="text-textInverted font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60">
                  {svc.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" ref={projectsContainerRef} className="bg-main rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 transition-colors duration-300">
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Projects
        </h2>
        
        <div className="max-w-[1400px] mx-auto flex flex-col gap-[10vh]">
          {projects.map((proj, i) => {
            const targetScale = 1 - (projects.length - 1 - i) * 0.03;
            const scale = useTransform(projectsScrollY, [i / projects.length, 1], [1, targetScale]);
            
            return (
              <div key={i} className="sticky top-24 md:top-32 h-[85vh] flex items-center justify-center">
                <motion.div 
                  style={{ scale, top: `calc(10vh + ${i * 28}px)` }}
                  className="w-full h-full max-h-[800px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 transition-colors duration-300"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className="text-textMain font-black text-[clamp(3rem,8vw,100px)] leading-none">
                        {proj.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-textMain/60 uppercase tracking-widest text-xs sm:text-sm mb-1">{proj.cat}</span>
                        <h3 className="text-textMain font-medium uppercase text-[clamp(1.2rem,3vw,2.5rem)] leading-tight">
                          {proj.name}
                        </h3>
                      </div>
                    </div>
                    <LiveProjectButton />
                  </div>

                  {/* Card Images */}
                  <div className="flex flex-col sm:flex-row gap-4 flex-1 min-h-0">
                    <div className="hidden sm:flex w-full sm:w-[40%] flex-col gap-4 min-h-0">
                      <div className="h-[30%] sm:h-[clamp(130px,16vw,230px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden shrink-0 relative">
                        <img src={proj.img1} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden min-h-0 relative">
                        <img src={proj.img2} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="w-full sm:w-[60%] flex-1 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden min-h-0 relative min-h-[220px]">
                      <img src={proj.img3} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <ShuffleCards />

      {/* CONTACT/FOOTER SECTION */}
      <ContactSection />
    </div>
  );
}

export default App;
