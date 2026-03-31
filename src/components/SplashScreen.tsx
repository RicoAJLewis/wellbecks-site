"use client";

import Image from "next/image";
import * as React from "react";

const SESSION_KEY = "wellbecksSplashSeen";
const EXIT_DURATION_MS = 700;

type SplashPhase = "checking" | "visible" | "exiting" | "hidden";

export default function SplashScreen() {
  const [phase, setPhase] = React.useState<SplashPhase>("checking");
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [videoAvailable, setVideoAvailable] = React.useState(true);
  const [videoStarted, setVideoStarted] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasSeenSplash = window.sessionStorage.getItem(SESSION_KEY) === "true";
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setPrefersReducedMotion(motionQuery.matches);
    setPhase(hasSeenSplash ? "hidden" : "visible");

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  React.useEffect(() => {
    if (phase !== "visible" || prefersReducedMotion || !videoAvailable) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playAttempt = video.play();

    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt
        .then(() => {
          setVideoStarted(true);
        })
        .catch(() => {
          setVideoAvailable(false);
        });
    } else {
      setVideoStarted(true);
    }
  }, [phase, prefersReducedMotion, videoAvailable]);

  const dismiss = React.useCallback(() => {
    if (phase === "exiting" || phase === "hidden") {
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    }

    setPhase("exiting");

    window.setTimeout(() => {
      setPhase("hidden");
    }, EXIT_DURATION_MS);
  }, [phase]);

  if (phase === "hidden") {
    return null;
  }

  const showPoster = prefersReducedMotion || !videoAvailable;

  return (
    <div
      className={`fixed inset-0 z-[80] transition-opacity duration-700 ${
        phase === "visible" ? "opacity-100" : phase === "exiting" ? "opacity-0" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink-900" />

      {showPoster ? (
        <Image
          src="/images/splash-poster.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-label="WELLBECKS brand introduction video"
          poster="/images/splash-poster.png"
          onEnded={dismiss}
          onLoadedData={() => setVideoStarted(true)}
          onError={() => setVideoAvailable(false)}
        >
          <source src="/videos/wellbecks-intro.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,18,18,0.70),rgba(18,18,18,0.35),rgba(18,18,18,0.55))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_38%)]" />

      <div className="relative flex min-h-full flex-col justify-between px-5 py-6 text-white md:px-8 md:py-8">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {showPoster ? "Enter Site" : "Skip Intro"}
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-5xl items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">WELLBECKS</p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-white md:text-6xl">
              Cold-Pressed Wellness, Delivered.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
              Raw, unprocessed juices prepared in Barbados and delivered with care.
            </p>
          </div>

          {!showPoster && !videoStarted ? (
            <p className="hidden text-sm text-white/70 md:block">Loading intro...</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

