import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type HeroVideoBackgroundProps = {
  videoSrc: string;
  posterSrc: string;
  preload?: "none" | "metadata" | "auto";
  showPlaybackControl?: boolean;
  playbackControlClassName?: string;
};

export function HeroVideoBackground({
  videoSrc,
  posterSrc,
  preload = "metadata",
  showPlaybackControl = false,
  playbackControlClassName = "",
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowPlayback, setAllowPlayback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const updatePlayback = () =>
      setAllowPlayback(!motionPreference.matches && !connection?.saveData);

    updatePlayback();
    if (typeof motionPreference.addEventListener === "function") {
      motionPreference.addEventListener("change", updatePlayback);
      return () => motionPreference.removeEventListener("change", updatePlayback);
    }

    motionPreference.addListener(updatePlayback);
    return () => motionPreference.removeListener(updatePlayback);
  }, []);

  useEffect(() => {
    if (!allowPlayback) return;

    const video = videoRef.current;
    if (!video) return;

    const attemptPlayback = () => {
      const playRequest = video.play();
      if (playRequest) {
        void playRequest.catch(() => {
          setPlaybackFailed(true);
          setIsPlaying(false);
        });
      }
    };

    attemptPlayback();
    video.addEventListener("canplay", attemptPlayback, { once: true });
    return () => video.removeEventListener("canplay", attemptPlayback);
  }, [allowPlayback, videoSrc]);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!allowPlayback || !video) {
      setPlaybackFailed(false);
      setAllowPlayback(true);
      return;
    }

    if (video.paused) {
      setPlaybackFailed(false);
      void video.play().catch(() => setPlaybackFailed(true));
    } else {
      video.pause();
    }
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-carbon"
      aria-hidden={showPlaybackControl ? undefined : true}
    >
      <img
        src={posterSrc}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {allowPlayback && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload={preload}
          poster={posterSrc}
          onPlaying={() => {
            setPlaybackFailed(false);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setPlaybackFailed(true);
            setIsPlaying(false);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {showPlaybackControl ? (
        <button
          type="button"
          onClick={togglePlayback}
          className={`pointer-events-auto absolute bottom-3 right-3 z-30 inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-carbon/75 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md transition hover:border-brand/70 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:bottom-5 sm:right-5 ${playbackControlClassName}`}
          aria-label={isPlaying ? "Pause About Modtech video" : "Play About Modtech video"}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
          ) : (
            <Play className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
          )}
          {isPlaying ? "Pause" : playbackFailed ? "Retry video" : "Play video"}
        </button>
      ) : null}
    </div>
  );
}
