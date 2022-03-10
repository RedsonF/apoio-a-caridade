import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const AnimatedPage = ({ children }) => (
  <motion.div
    variants={animations}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.1 }}
    style={{ height: '100%' }}
  >
    {children}
  </motion.div>
);

export default AnimatedPage;
