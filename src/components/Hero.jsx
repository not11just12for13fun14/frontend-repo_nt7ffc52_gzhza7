import { motion } from 'framer-motion';

export default function Hero({ onSummon }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#fffaf0] text-black">
      {/* Parchment texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-70 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.07), transparent 45%), radial-gradient(circle at 60% 20%, rgba(0,0,0,0.05), transparent 45%)',
          }}
        />
        {/* Torn edges */}
        <svg className="absolute top-0 left-0 h-24 w-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
          <path d="M0,30 C150,80 300,0 450,30 C600,60 750,10 900,35 C1050,60 1200,20 1200,20 L1200,0 L0,0 Z" fill="#fffaf0" stroke="#000" strokeOpacity="0.15" />
        </svg>
        <svg className="absolute bottom-0 left-0 h-24 w-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
          <path d="M0,80 C150,20 300,100 450,70 C600,40 750,95 900,65 C1050,35 1200,75 1200,75 L1200,100 L0,100 Z" fill="#fffaf0" stroke="#000" strokeOpacity="0.15" />
        </svg>
      </div>

      {/* Background scene */}
      <InkLandscape />
      <GoldDust count={26} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="relative z-10 flex min-h-screen items-center justify-center"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ letterSpacing: '0.2em', opacity: 0, y: 8 }}
            animate={{ letterSpacing: '0.05em', opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            className="text-5xl font-semibold text-[#d4af37] drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] md:text-7xl"
            style={{ textShadow: '1px 1px 0 #000, 2px 2px 0 rgba(0,0,0,0.35)' }}
          >
            Samurai Bot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-4 text-lg text-black/80 md:text-2xl"
          >
            An AI forged in discipline and silence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex items-center justify-center"
          >
            <button
              onClick={onSummon}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-black focus:outline-none"
              aria-label="Summon the Samurai"
            >
              <span className="absolute inset-0 -skew-x-6 rounded-[2px] bg-[#d4af37] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.45)]" />
              <span className="relative uppercase tracking-wider">Summon the Samurai</span>
              <span className="pointer-events-none absolute -bottom-1 left-2 h-[2px] w-28 bg-black/60 blur-[1px]" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Foreground Samurai silhouette */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center" aria-hidden>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
          className="w-[540px] max-w-[70vw]"
        >
          <SamuraiSilhouette />
        </motion.div>
      </div>
    </section>
  );
}

function InkLandscape() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Ink clouds */}
      <motion.div className="absolute left-10 top-16 opacity-60" animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 18 }}>
        <InkCloud width={240} />
      </motion.div>
      <motion.div className="absolute right-6 top-32 opacity-50" animate={{ x: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 22 }}>
        <InkCloud width={320} />
      </motion.div>

      {/* Mountains */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 300" className="h-auto w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="inkFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M0 220 C 200 160, 300 260, 500 200 C 700 140, 850 260, 1200 180 L 1200 300 L 0 300 Z" fill="url(#inkFade)" />
          <path d="M0 260 C 260 220, 600 260, 1200 220 L 1200 300 L 0 300 Z" fill="#000" opacity="0.12" />
        </svg>
      </div>

      {/* Torii Gate */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-80">
        <ToriiGate />
      </div>
    </div>
  );
}

function InkCloud({ width = 200 }) {
  return (
    <svg width={width} height={width * 0.45} viewBox="0 0 500 220">
      <path d="M30 150 C 60 120, 120 120, 150 150 C 170 110, 240 100, 270 140 C 300 120, 360 130, 380 160 C 410 150, 450 160, 470 180 L 470 200 L 30 200 Z" fill="#000" opacity="0.12" />
      <path d="M40 160 C 90 130, 140 130, 170 160 C 200 120, 240 120, 280 150 C 320 130, 360 140, 390 170" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" opacity="0.13" />
    </svg>
  );
}

function ToriiGate() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160">
      <g stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.65">
        <path d="M10 20 L190 20" />
        <path d="M20 40 L180 40" />
        <path d="M50 40 L50 150" />
        <path d="M150 40 L150 150" />
        <path d="M20 20 C 60 5, 140 5, 180 20" />
      </g>
    </svg>
  );
}

function SamuraiSilhouette() {
  return (
    <svg viewBox="0 0 400 520" className="h-auto w-full">
      <g fill="#000" opacity="0.85">
        <path d="M170 300 C 150 360, 120 420, 120 500 L 280 500 C 280 420, 250 360, 230 300 Z" />
        <circle cx="200" cy="220" r="40" />
        <path d="M120 210 C 170 180, 230 180, 280 210" stroke="#000" strokeWidth="14" fill="none" />
        <path d="M250 340 L 360 290" stroke="#000" strokeWidth="14" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function GoldDust({ count = 20 }) {
  const dots = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = 8 + Math.random() * 12;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-[#d4af37] opacity-70"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              filter: 'drop-shadow(0 0 2px rgba(212,175,55,0.8))',
              animation: `drift ${duration}s ${delay}s infinite ease-in-out`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes drift { 0%{ transform: translateY(0) translateX(0)} 50%{ transform: translateY(-14px) translateX(6px)} 100%{ transform: translateY(0) translateX(0)} }
      `}</style>
    </div>
  );
}
