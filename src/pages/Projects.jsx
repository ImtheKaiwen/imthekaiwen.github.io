import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDynamicIsland } from '../context/DynamicIslandContext';
import visionJournalImg from '../assets/visionjournal.png';
import campusMealImg from '../assets/campusmeal.png';
import './Projects.css';

export default function Projects() {
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
      className="projects-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="title" style={{ marginBottom: '40px' }}>Projelerim</h1>

      <div className="apps-grid">
        <Link to="/project/campus-meal" className="app-card">
          <motion.img
            layoutId="app-icon-campus-meal"
            src={campusMealImg}
            alt="Campus Meal"
            className="app-icon"
          />
          <h2 className="app-title">Campus Meal</h2>
          <p className="app-desc">Üniversite yemekhane menülerini takip edebileceğiniz modern platform.</p>
        </Link>

        <Link to="/project/vision-journal" className="app-card">
          <motion.img
            layoutId="app-icon-vision-journal"
            src={visionJournalImg}
            alt="Vision Journal"
            className="app-icon"
          />
          <h2 className="app-title">Vision Journal</h2>
          <p className="app-desc">Kişisel gelişiminizi takip edip günlük tutabileceğiniz akıllı ajanda.</p>
        </Link>
      </div>

      <div className="github-section">
        <h2 className="github-title">Diğer Çalışmalar</h2>
        <div className="github-grid">
          <div className="github-card">
            <div className="github-repo-name">react-dynamic-island</div>
            <div className="github-repo-desc">Framer Motion ile geliştirilmiş açık kaynaklı Apple Dinamik Ada klonu.</div>
          </div>
          <div className="github-card">
            <div className="github-repo-name">weather-app-swiftui</div>
            <div className="github-repo-desc">iOS için geliştirilmiş minimalist hava durumu uygulaması.</div>
          </div>
          <div className="github-card">
            <div className="github-repo-name">ai-chat-interface</div>
            <div className="github-repo-desc">OpenAI entegreli, modern arayüzlü sohbet botu şablonu.</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
