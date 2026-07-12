"use client";

import Hls, { ErrorTypes, Events } from "hls.js";
import { useEffect, useRef } from "react";

export const PORTFOLIO_VIDEO_URL =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export interface HlsVideoProps {
  className?: string;
  flip?: boolean;
  src?: string;
}

export function HlsVideo({
  className = "",
  flip = false,
  src = PORTFOLIO_VIDEO_URL,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    let hls: Hls | null = null;
    let disposed = false;
    let nativeReadyHandler: (() => void) | null = null;

    // Safari can occasionally ignore the muted attribute during hydration.
    // Setting both properties before loading keeps autoplay reliable.
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      if (!disposed) {
        void video.play().catch(() => {
          // Browsers may still block autoplay in unusual user settings. The
          // autoplay attribute remains in place so playback can resume later.
        });
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
      });

      hls.attachMedia(video);
      hls.on(Events.MEDIA_ATTACHED, () => {
        if (!disposed) {
          hls?.loadSource(src);
        }
      });
      hls.on(Events.MANIFEST_PARSED, playVideo);
      hls.on(Events.ERROR, (_event, data) => {
        if (!data.fatal || disposed || !hls) {
          return;
        }

        if (data.type === ErrorTypes.NETWORK_ERROR) {
          hls.startLoad();
        } else if (data.type === ErrorTypes.MEDIA_ERROR) {
          hls.recoverMediaError();
        } else {
          hls.destroy();
          hls = null;
        }
      });
    } else if (
      video.canPlayType("application/vnd.apple.mpegurl") ||
      video.canPlayType("application/x-mpegURL")
    ) {
      nativeReadyHandler = playVideo;
      video.addEventListener("loadedmetadata", nativeReadyHandler);
      video.src = src;
      video.load();
    }

    return () => {
      disposed = true;

      if (nativeReadyHandler) {
        video.removeEventListener("loadedmetadata", nativeReadyHandler);
      }

      hls?.destroy();
      hls = null;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  const videoClassName = [flip ? "scale-y-[-1]" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <video
      ref={videoRef}
      className={videoClassName}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export default HlsVideo;
