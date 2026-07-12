"use client";

import {
  AnimatePresence,
  motion,
  type Transition,
} from "framer-motion";
import { useCallback, useEffect, useId, useRef } from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  title: string;
};

export type LightboxProps = {
  item: LightboxItem | null;
  onClose: () => void;
};

const dialogTransition: Transition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
};

export function Lightbox({ item, onClose }: LightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const isOpen = item !== null;

  const restoreFocus = useCallback(() => {
    const previouslyFocused = previouslyFocusedRef.current;

    if (previouslyFocused?.isConnected) {
      previouslyFocused.focus();
    }

    previouslyFocusedRef.current = null;
  }, []);

  useEffect(() => {
    return restoreFocus;
  }, [restoreFocus]);

  useEffect(() => {
    if (!isOpen) return;

    if (!previouslyFocusedRef.current) {
      previouslyFocusedRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    }

    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence onExitComplete={restoreFocus}>
      {item ? (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col items-center outline-none"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={dialogTransition}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close lightbox"
              onClick={onClose}
              className="absolute right-2 top-2 z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-black/70 text-2xl leading-none text-white backdrop-blur-md transition hover:scale-105 hover:border-white/40 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:right-4 md:top-4"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <figure className="flex max-h-[92vh] w-full flex-col items-center gap-3">
              {/* The source is runtime-provided and may not be compatible with next/image. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl shadow-black/50"
              />
              <figcaption
                id={titleId}
                className="font-display text-center text-xl italic text-white sm:text-2xl"
              >
                {item.title}
              </figcaption>
            </figure>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Lightbox;
