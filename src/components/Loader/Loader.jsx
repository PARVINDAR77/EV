import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import loadingVideo from '../../assets/images/erasio_Axion_charger_loading_animation_20261005181352.mp4';

const Loader = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicit DOM property assignments required by Chrome & Edge to guarantee instant autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          // If browser somehow blocked autoplay, allow quick transition
          console.warn("Autoplay deferred:", err);
        });
      }
    };

    // Attempt playback immediately and on data readiness
    tryPlay();
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);

    // Track playback progress for the subtle bottom indicator
    const handleTimeUpdate = () => {
      if (video.duration && !isNaN(video.duration)) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Safety timeout: video is 10s; safety fires at 10.5s so it never truncates the animation
    const safetyTimer = setTimeout(() => {
      onComplete();
    }, 10500);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Video directly bound to src for instant hardware decoding */}
      <video 
        ref={videoRef}
        src={loadingVideo}
        autoPlay 
        muted 
        playsInline 
        preload="auto"
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-contain md:object-cover"
      />

      {/* Subtle Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none z-10" />

      {/* Skip Button for immediate entry */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-[0.65rem] font-mono tracking-widest text-white/80 hover:text-[#00FF00] hover:border-[#00FF00] transition-all uppercase cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        SKIP &rarr;
      </button>

      {/* Subtle High-Tech Energy Progress Bar along bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 overflow-hidden">
        <div 
          className="h-full bg-[#00FF00] shadow-[0_0_8px_#00FF00] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
