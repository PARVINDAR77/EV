import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none"
    >
      {/* Background Video - No loop, calls onComplete when finished */}
      <video 
        autoPlay 
        muted 
        playsInline 
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
      </video>

      {/* Subtle Dark gradient overlay just at the edges so it fades nicely, but mostly transparent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
    </motion.div>
  );
};

export default Loader;
