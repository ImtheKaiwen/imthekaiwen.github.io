import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DynamicIslandProvider } from './context/DynamicIslandContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DynamicIsland from './components/DynamicIsland/DynamicIsland';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) return;

    const updateFavicon = (href, isCircular = false) => {
      if (isCircular) {
        const img = new Image();
        img.src = href;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 64;
          canvas.height = 64;
          const ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.arc(32, 32, 32, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, 0, 0, 64, 64);
          favicon.href = canvas.toDataURL('image/png');
        };
      } else {
        favicon.href = href;
      }
    };

    if (location.pathname.includes('vision-journal-desktop')) {
      updateFavicon('./vision_journal_desktop.jpg', true);
    } else if (location.pathname.includes('vision-journal')) {
      updateFavicon('./vision-icon.png', true);
    } else if (location.pathname.includes('campus-meal')) {
      updateFavicon('./campus-icon.png', true);
    } else {
      updateFavicon('./favicon.jpeg', true); // Make PP circular
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="privacy/:id" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <DynamicIslandProvider>
      <HashRouter>
        <DynamicIsland />
        <AnimatedRoutes />
      </HashRouter>
    </DynamicIslandProvider>
  );
}

export default App;
