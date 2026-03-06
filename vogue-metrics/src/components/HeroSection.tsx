import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
import heroVideoAlt from "@/assets/hero-video-alt.mp4";

// User-uploaded NYC street fashion videos — primary + fallback
const VIDEO_SOURCES = [heroVideo, heroVideoAlt];

const TITLE_WORDS = ["NYC", "Fashion", "Inventory", "Intelligence"];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSource, setCurrentSource] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.85;
  }, []);

  function handleVideoError() {
    if (currentSource < VIDEO_SOURCES.length - 1) {
      setCurrentSource((s) => s + 1);
    }
  }

  function handleVideoLoaded() {
    setVideoLoaded(true);
  }

  return (
    <div ref={ref} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">

      {/* ── Video layer ─────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-15%] will-change-transform bg-black"
      >
        <video
          ref={videoRef}
          key={currentSource}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.5) saturate(0.7)",
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1.5s ease",
          }}
        >
          <source src={VIDEO_SOURCES[currentSource]} type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Cinematic gradient ──────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--ink)/0.15) 0%, hsl(var(--ink)/0.45) 40%, hsl(var(--ink)/0.90) 80%, hsl(var(--ink)/0.99) 100%)",
        }}
      />

      {/* ── Grain texture ──────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Top bar ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 px-8 md:px-14 py-5 flex items-center justify-between z-20"
      >
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-matcha animate-pulse" />
          <span className="text-[10px] font-body tracking-[0.35em] uppercase text-matcha">Live Analytics</span>
        </div>
        <span className="text-[10px] font-body text-foreground/25 hidden sm:block tracking-[0.3em] uppercase">
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </span>
      </motion.div>

      {/* ── Hero content ────────────────────────────── */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Edition tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-10 bg-matcha/70" />
          <span className="text-[9px] font-body tracking-[0.55em] uppercase text-matcha/80">
            Vol. I — New York City
          </span>
          <div className="h-px w-10 bg-matcha/70" />
        </motion.div>

        {/* Main title */}
        <h1 className="font-editorial font-black leading-[0.88] tracking-tight mb-8">
          {TITLE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${
                i <= 1
                  ? "text-[clamp(3.8rem,9.5vw,9rem)]"
                  : "text-[clamp(2.2rem,5.5vw,5.2rem)] text-foreground/65"
              } ${i === 1 ? "text-matcha italic" : "text-foreground"}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-px bg-matcha mx-auto mb-7 origin-left"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="font-body text-sm md:text-base text-foreground/50 tracking-[0.18em] uppercase max-w-md mx-auto leading-relaxed"
        >
          Real-time anomaly detection for fashion retail supply chains.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="flex flex-col items-center gap-2.5 mt-16 cursor-pointer group"
          onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[9px] font-body tracking-[0.5em] uppercase text-foreground/25 group-hover:text-matcha transition-colors duration-300">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-matcha/50 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* ── Bottom edge fade ────────────────────────── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--ink)))" }}
      />

      {/* ── Bottom caption ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-7 left-8 md:left-14 z-20"
      >
        <p className="text-[9px] font-body text-foreground/20 tracking-[0.35em] uppercase italic">
          Isolation Forest · Risk Scoring v1.0
        </p>
      </motion.div>
    </div>
  );
}
