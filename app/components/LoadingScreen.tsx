"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DURATION_MS = 2_000;
const COMPLETION_DELAY_MS = 500;
const WORD_INTERVAL_MS = 750;
const WORDS = ["Design", "Create", "Inspire"] as const;

export interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startedAt = performance.now();
    let animationFrame = 0;
    let completionTimer: number | undefined;
    let completed = false;

    const wordTimer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % WORDS.length);
    }, WORD_INTERVAL_MS);

    const updateCounter = (now: number) => {
      const progress = Math.min((now - startedAt) / DURATION_MS, 1);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
        return;
      }

      if (!completed) {
        completed = true;
        setCount(100);
        completionTimer = window.setTimeout(() => {
          onCompleteRef.current();
        }, COMPLETION_DELAY_MS);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearInterval(wordTimer);

      if (completionTimer !== undefined) {
        window.clearTimeout(completionTimer);
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      role="status"
      aria-busy="true"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.p
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-hidden="true"
      >
        Portfolio
      </motion.p>

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={WORDS[wordIndex]}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {WORDS[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div
        className="absolute bottom-8 right-6 font-display text-6xl tabular-nums text-text-primary md:bottom-10 md:right-10 md:text-8xl lg:text-9xl"
        aria-hidden="true"
      >
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full w-full shadow-[0_0_8px_rgba(137,170,204,0.35)]"
          style={{
            transform: `scaleX(${count / 100})`,
            transformOrigin: "left center",
            willChange: "transform",
          }}
        />
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
