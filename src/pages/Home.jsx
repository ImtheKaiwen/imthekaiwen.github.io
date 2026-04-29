import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDynamicIsland } from '../context/DynamicIslandContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import IslandShowcase from '../components/IslandShowcase/IslandShowcase';
import './Home.css';

let hasShownWelcome = false;

// Stagger variants for smooth entry
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const { showMessage, setNavLinks, setLeftAction } = useDynamicIsland();
  const navigate = useNavigate();

  useEffect(() => {
    // Set default Home context
    setNavLinks([
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' }
    ]);
    setLeftAction('logo');

    // Welcome message only once per session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      showMessage("Portfolyoma Hoş Geldiniz!", <Sparkles size={18} />, 3000);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, [showMessage, setNavLinks, setLeftAction]);

  return (
    <div className="home-container">
      <motion.div
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >


        <h1 className="hero-title">
          Dijital Dünyada <br />
          <span className="gradient-text">Yepyeni Bir Deneyim</span>
        </h1>

        <p className="hero-subtitle">
          Sıradan menülerin ötesine geçin. Kaiwen'in projelerini ve vizyonunu,
          üstteki Akıllı Dinamik Ada ile konuşarak keşfedin.
        </p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="cta-button primary" onClick={() => navigate('/projects')}>
            Projeleri Keşfet
          </button>
        </motion.div>
      </motion.div>

      <IslandShowcase />
    </div>
  );
}
