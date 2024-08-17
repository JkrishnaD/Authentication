// components/AnimatedContainer.js
"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface AnimatedContainerProps {
  children: React.ReactNode;
}

const AnimatedContainer = ({ children }: AnimatedContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 1 }}
      className="flex flex-col justify-center items-center text-center"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
