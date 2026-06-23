import { motion } from 'framer-motion';

import img1 from '../../assets/for graphic design section/KHANYA MOLOKE Graphic Designer Creative Portfolio for website-1.webp';
import img2 from '../../assets/for graphic design section/KHANYA MOLOKE Graphic Designer Creative Portfolio for website-2.webp';
import img3 from '../../assets/for graphic design section/KHANYA MOLOKE Graphic Designer Creative Portfolio for website-3.webp';
import img4 from '../../assets/for graphic design section/KHANYA MOLOKE Graphic Designer Creative Portfolio for website-4.webp';
import img5 from '../../assets/for graphic design section/KHANYA MOLOKE Graphic Designer Creative Portfolio for website-5.webp';
import img6 from '../../assets/for graphic design section/KHANYA MOLOKE Graphic Designer Creative Portfolio for website-6.webp';

const slides = [
  { id: 1, src: img1, title: 'Portfolio Cover' },
  { id: 2, src: img2, title: 'Brand Strategy & Identity' },
  { id: 3, src: img3, title: 'Visual Systems' },
  { id: 4, src: img4, title: 'Typography & Layout' },
  { id: 5, src: img5, title: 'Digital & Print' },
  { id: 6, src: img6, title: 'Final Showcase' }
];

export function GraphicDesignPortfolio() {
  return (
    <section id="graphic-design" className="relative bg-main text-textMain py-24 sm:py-32 px-4 sm:px-8 md:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-24 z-10 text-center">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-textMain/40 border border-textMain/20 rounded-full px-3 py-1 bg-textMain/5 mb-3 sm:mb-4">
            Beyond The Web
          </span>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(1.8rem,5.5vw,3.5rem)]">
            Creative Archives
          </h2>
          <p className="mt-4 text-textMain/60 font-light text-[clamp(0.9rem,1.5vw,1.1rem)] max-w-[600px]">
            A curated selection of brand identities, visual systems, and digital artwork.
          </p>
        </div>

        {/* Vertical Flow Showcase */}
        <div className="flex flex-col gap-6 sm:gap-10 md:gap-12 w-full">
          {slides.map((slide) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              key={slide.id} 
              className="w-full flex flex-col items-center"
            >
              <div className="w-full rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/5 bg-[#0a0a0a]">
                <img 
                  src={slide.src} 
                  alt={slide.title} 
                  className="w-full h-auto object-contain block" 
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-24 sm:mt-32 w-full max-w-[800px] rounded-[30px] sm:rounded-[40px] border-2 border-dashed border-textMain/20 flex flex-col items-center justify-center p-10 sm:p-16 text-center bg-textMain/5 backdrop-blur-sm"
        >
          <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-textMain mb-4">Ready to collaborate?</h3>
          <p className="text-textMain/60 font-light text-sm sm:text-base mb-8 max-w-[80%]">
            If you loved this showcase and want to elevate your brand's visual identity, let's create something incredible together.
          </p>
          <a href="#contact" className="px-8 py-4 rounded-full bg-textMain text-main font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform shadow-lg">
            Start a Project
          </a>
        </motion.div>

      </div>
    </section>
  );
}
