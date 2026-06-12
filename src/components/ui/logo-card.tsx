import { motion } from "framer-motion";

export const LogoCard = ({
  src,
  alt,
  isDarkBg,
  width,
  height,
  rotation = 0,
}: {
  src: string;
  alt: string;
  isDarkBg?: boolean;
  width: number | string;
  height: number | string;
  rotation?: number;
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.1, zIndex: 50 }}
      whileHover={{
        scale: 1.05,
        rotateZ: rotation > 0 ? rotation + 2 : rotation - 2,
        zIndex: 50,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 50,
      }}
      initial={{ rotate: rotation }}
      animate={{ rotate: rotation }}
      style={{
        width: typeof width === 'number' ? `calc(${width}px * var(--logo-scale, 1))` : width,
        height: typeof height === 'number' ? `calc(${height}px * var(--logo-scale, 1))` : height,
      }}
      className={`relative shrink-0 cursor-grab active:cursor-grabbing rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2rem] p-2.5 sm:p-4 md:p-6 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)] border border-black/5 dark:border-white/10 ${
        isDarkBg ? "bg-[#140047]" : "bg-white"
      }`}
    >
      <img
        src={src}
        className="w-full h-full object-contain pointer-events-none select-none"
        loading="lazy"
        alt={alt}
        draggable={false}
      />
    </motion.div>
  );
};
