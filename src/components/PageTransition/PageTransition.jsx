import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children, locationKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative w-full h-full"
      >
        {/* Subtle green line transition effect overlay */}
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0, opacity: 0 }}
          exit={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed top-1/2 left-0 w-full h-[2px] bg-accent z-40 origin-center"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
