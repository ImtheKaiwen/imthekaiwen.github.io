import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDynamicIsland } from '../context/DynamicIslandContext';

export default function About() {
  const { setNavLinks, setLeftAction } = useDynamicIsland();

  useEffect(() => {
    setNavLinks([
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' }
    ]);
    setLeftAction('logo');
  }, [setNavLinks, setLeftAction]);

  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="title">Hakkımda</h1>
      <p className="subtitle">
        Yenilikçi arayüzler tasarlıyor ve Apple benzeri pürüzsüz animasyonlara sahip modern web uygulamaları geliştiriyorum.
      </p>
    </motion.div>
  );
}
