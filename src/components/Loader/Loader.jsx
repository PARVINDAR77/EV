import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, FastForward, Zap } from 'lucide-react';
import loadingVideo from '../../assets/images/EV_charging_commercial_video_prompt_20261015162719.mp4';
import AxionLogo from '../common/AxionLogo';

const Loader = ({ onComplete }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const statusTextRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browser policy requires initial muted state for autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    let isPlaying = false;
    const tryPlay = () => {
      if (isPlaying || !video) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying = true;
            setVideoLoaded(true);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn("Autoplay deferred:", err);
            }
          });
      }
    };

    let safetyTimer = setTimeout(() => {
      onComplete();
    }, 12000);

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('playing', () => {
      isPlaying = true;
      setVideoLoaded(true);
      if (safetyTimer) {
        clearTimeout(safetyTimer);
        safetyTimer = null;
      }
    });

    // Smooth progress update via DOM refs to avoid re-rendering entire video element
    const handleTimeUpdate = () => {
      if (!video.duration || isNaN(video.duration)) return;
      const pct = Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100));
      
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(pct)}%`;
      }
      if (statusTextRef.current) {
        if (pct < 30) {
          statusTextRef.current.textContent = 'CONNECTING HIGH-POWER GRID...';
        } else if (pct < 65) {
          statusTextRef.current.textContent = 'CALIBRATING 800V ARCHITECTURE...';
        } else if (pct < 92) {
          statusTextRef.current.textContent = 'SYNCHRONIZING CHARGING NETWORK...';
        } else {
          statusTextRef.current.textContent = 'ENERGY : EVOLVED';
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    // Handle end with a brief pause on the final glowing logo frame
    const handleEnded = () => {
      setTimeout(() => {
        onComplete();
      }, 500);
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (safetyTimer) {
        clearTimeout(safetyTimer);
      }
    };
  }, [onComplete]);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#020403] overflow-hidden select-none"
    >
      {/* Dynamic ambient energy glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vh] bg-accent/10 rounded-full blur-[140px] animate-pulse" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)',
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* Main Full-Bleed Video with edge-to-edge cinematic cover on all screen sizes */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={() => {
            if (videoRef.current && !videoRef.current.src.includes('/videos/loading.mp4')) {
              videoRef.current.src = '/videos/loading.mp4';
              videoRef.current.play().catch(() => onComplete());
            } else {
              onComplete();
            }
          }}
        >
          <source src={loadingVideo} type="video/mp4" />
          <source src="/videos/loading.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Initial loading placeholder before video frames decode */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
            <Zap className="w-6 h-6 text-accent absolute animate-pulse" />
          </div>
          <span className="mt-4 text-xs font-mono uppercase tracking-[0.25em] text-white/50">
            LOADING EXPERIENCE...
          </span>
        </div>
      )}

      {/* Cinematic Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/85 pointer-events-none z-10" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8">
        {/* Brand identity badge */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg">
          <AxionLogo className="h-5 md:h-6 w-auto" />
          <span className="hidden sm:inline-block w-[1px] h-3.5 bg-white/20" />
          <span className="flex items-center gap-1.5 text-[0.65rem] font-mono tracking-widest text-accent uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            NETWORK LIVE
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md text-[0.7rem] font-mono tracking-wider text-white/80 hover:text-accent hover:border-accent/40 transition-all cursor-pointer shadow-md"
          >
            {isMuted ? (
              <>
                <VolumeX size={14} className="text-white/60" />
                <span className="hidden sm:inline">SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 size={14} className="text-accent" />
                <span className="text-accent font-semibold">SOUND ON</span>
              </>
            )}
          </button>

          {/* Skip Button */}
          <button
            onClick={onComplete}
            aria-label="Skip intro video"
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[0.7rem] font-mono tracking-widest text-white/90 hover:text-black hover:bg-accent hover:border-accent transition-all duration-300 uppercase cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          >
            <span>SKIP</span>
            <FastForward size={12} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry HUD & Progress Bar */}
      <div className="relative z-20 px-6 md:px-12 pb-8 md:pb-10 w-full max-w-5xl mx-auto">
        <div className="flex items-end justify-between text-xs font-mono mb-2.5">
          <div className="flex items-center gap-2 text-white/70 tracking-wider">
            <Zap size={14} className="text-accent animate-pulse" />
            <span ref={statusTextRef} className="text-[0.7rem] md:text-xs">
              CONNECTING HIGH-POWER GRID...
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[0.65rem] text-white/40 tracking-widest uppercase">
              ULTRA-FAST DC
            </span>
            <span
              ref={progressTextRef}
              className="text-xs md:text-sm font-bold text-accent tracking-wider"
            >
              0%
            </span>
          </div>
        </div>

        {/* High-Tech Glowing Progress Track */}
        <div className="relative w-full h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-accent/80 via-accent to-[#55FF55] shadow-[0_0_12px_#00FF00] rounded-full transition-all duration-100 ease-linear"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
