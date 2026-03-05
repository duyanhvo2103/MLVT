import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedLayout: React.FC = () => {
  const location = useLocation();

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        animate="animate"
        transition={{ duration: 0.5, ease: "circOut" }}
        style={{ width: "100%" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
