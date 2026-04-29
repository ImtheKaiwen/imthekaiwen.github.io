import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DynamicIslandProvider } from './context/DynamicIslandContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import DynamicIsland from './components/DynamicIsland/DynamicIsland';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetail />} />
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
