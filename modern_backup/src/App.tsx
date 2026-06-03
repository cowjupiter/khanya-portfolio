import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ContactButton } from './components/ContactButton';
import { LiveProjectButton } from './components/LiveProjectButton';
import { FadeIn } from './components/FadeIn';
import { Magnet } from './components/Magnet';
import { AnimatedText } from './components/AnimatedText';
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
    <div className="w-full bg-[#0C0C0C] overflow-x-clip text-[#D7E2EA]">
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col overflow-x-clip">
        <FadeIn delay={0} y={-20} as="nav" className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </FadeIn>

        <div className="flex-1 flex flex-col justify-center">
          <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
            <FadeIn delay={0.15} y={40}>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-center text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw]">
                Web Designs by Khanya
              </h1>
            </FadeIn>
          </div>
        </div>

        <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
          <FadeIn delay={0.35} y={20}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
              a web designer & developer crafting striking, conversion-focused digital experiences
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={150} strength={3}>
              <img 
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
                alt="Khanya Portrait"
                className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-contain pointer-events-none"
              />
            </Magnet>
          </FadeIn>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section ref={marqueeRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
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
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="w-full object-contain" />
        </FadeIn>
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-full object-contain" />
        </FadeIn>
        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="w-full object-contain" />
        </FadeIn>
        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]">
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
              className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]"
            />
            <ContactButton />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Services
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col">
          {services.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.1} y={30} className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] last:border-0">
              <span className="text-[#0C0C0C] font-black text-[clamp(3rem,10vw,140px)] leading-none sm:w-[150px] md:w-[200px] shrink-0">
                {svc.num}
              </span>
              <div className="flex flex-col gap-2 sm:gap-4">
                <h3 className="text-[#0C0C0C] font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)]">
                  {svc.title}
                </h3>
                <p className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60">
                  {svc.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section ref={projectsContainerRef} className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
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
                  className="w-full h-full max-h-[800px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className="text-[#D7E2EA] font-black text-[clamp(3rem,8vw,100px)] leading-none">
                        {proj.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm mb-1">{proj.cat}</span>
                        <h3 className="text-[#D7E2EA] font-medium uppercase text-[clamp(1.2rem,3vw,2.5rem)] leading-tight">
                          {proj.name}
                        </h3>
                      </div>
                    </div>
                    <LiveProjectButton />
                  </div>

                  {/* Card Images */}
                  <div className="flex flex-col sm:flex-row gap-4 h-full min-h-0">
                    <div className="w-full sm:w-[40%] flex flex-col gap-4">
                      <div className="h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden shrink-0">
                        <img src={proj.img1} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden min-h-[clamp(160px,22vw,340px)]">
                        <img src={proj.img2} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="w-full sm:w-[60%] flex-1 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden min-h-[300px] sm:min-h-0">
                      <img src={proj.img3} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
