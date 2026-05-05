import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDynamicIsland } from '../context/DynamicIslandContext';
import visionJournalImg from '../assets/visionjournal.png';
import campusMealImg from '../assets/campusmeal.png';
import { Layers, Terminal, Cpu, Code, Gamepad2, Eye, BookOpen, Monitor, Smartphone, LayoutGrid, Globe } from 'lucide-react';
import './Projects.css';

const APPS = [
  {
    id: 'campus-meal',
    title: 'Campus Meal',
    desc: 'Üniversite yemekhane menülerini takip edebileceğiniz modern platform.',
    img: campusMealImg,
    type: 'mobile'
  },
  {
    id: 'vision-journal',
    title: 'Vision Journal',
    desc: 'Kişisel gelişiminizi takip edip günlük tutabileceğiniz akıllı ajanda.',
    img: visionJournalImg,
    type: 'mobile'
  },
  {
    id: 'vision-journal-desktop',
    title: 'Vision Journal Desktop',
    desc: 'Masaüstü için geliştirilmiş, odaklanma odaklı vizyon ve günlük uygulaması.',
    img: '/vision_journal_desktop.jpg',
    type: 'desktop'
  },
  {
    id: 'kaivertion',
    title: 'Kaivertion',
    desc: 'PDF-Word dönüşümü, resim işleme ve QR kod araçları sunan kapsamlı web platformu.',
    img: '/kaivertion.jpg',
    type: 'web',
    url: 'https://kaivertion.onrender.com/'
  }
];

export default function Projects() {
  const { setNavLinks, setLeftAction } = useDynamicIsland();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setNavLinks([
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' }
    ]);
    setLeftAction('logo');
  }, [setNavLinks, setLeftAction]);

  const filteredApps = APPS.filter(app => filter === 'all' || app.type === filter);

  return (
    <motion.div
      className="projects-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="title" style={{ marginBottom: '20px' }}>Projelerim</h1>

      <div className="filter-container">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
          onClick={() => setFilter('all')}
        >
          <LayoutGrid size={18} />
          Hepsi
        </button>
        <button 
          className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`} 
          onClick={() => setFilter('mobile')}
        >
          <Smartphone size={18} />
          Mobil
        </button>
        <button 
          className={`filter-btn ${filter === 'desktop' ? 'active' : ''}`} 
          onClick={() => setFilter('desktop')}
        >
          <Monitor size={18} />
          Masaüstü
        </button>
        <button 
          className={`filter-btn ${filter === 'web' ? 'active' : ''}`} 
          onClick={() => setFilter('web')}
        >
          <Globe size={18} />
          Web
        </button>
      </div>

      <motion.div className="apps-grid" layout>
        <AnimatePresence mode="popLayout">
          {filteredApps.map((app) => (
            <motion.div
              layout
              key={app.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', height: '100%' }}
            >
              {app.url ? (
                <a href={app.url} target="_blank" rel="noopener noreferrer" className="app-card">
                  <motion.img
                    layoutId={`app-icon-${app.id}`}
                    src={app.img}
                    alt={app.title}
                    className="app-icon"
                  />
                  <h2 className="app-title">{app.title}</h2>
                  <p className="app-desc">{app.desc}</p>
                </a>
              ) : (
                <Link to={`/project/${app.id}`} className="app-card">
                  <motion.img
                    layoutId={`app-icon-${app.id}`}
                    src={app.img}
                    alt={app.title}
                    className="app-icon"
                  />
                  <h2 className="app-title">{app.title}</h2>
                  <p className="app-desc">{app.desc}</p>
                </Link>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="github-section">
        <div className="section-header">
          <h2 className="github-title">Mühendislik Arşivi</h2>
          <p className="github-subtitle">GitHub üzerinden derlenen çalışmalarım </p>
        </div>
        
        <div className="github-grid">
          {[
            {
              name: 'turkish-pos-tag-model',
              desc: 'Doğal Dil İşleme (NLP) teknikleri kullanılarak geliştirilmiş, Türkçe metinler için Part-of-Speech etiketleme modeli.',
              tags: ['Python', 'NLP', 'AI'],
              icon: <Cpu size={20} />
            },
            {
              name: 'glasses-for-visually-impaired',
              desc: 'Görüntü işleme teknolojisiyle görme engelliler için nesne tanımlama ve sesli geri bildirim sağlayan yardımcı teknoloji.',
              tags: ['Python', 'OpenCV', 'Assistive Tech'],
              icon: <Eye size={20} />
            },
            {
              name: 'laser-chess-godot',
              desc: 'Godot Engine kullanılarak geliştirilmiş, strateji ve lazer mekaniklerini birleştiren özgün bir satranç varyasyonu.',
              tags: ['GDScript', 'Godot', 'Game Dev'],
              icon: <Gamepad2 size={20} />
            },
            {
              name: 'callmetricai-benchmark',
              desc: 'AI transkript modellerinin doğruluğunu ve performansını ölçen kapsamlı bir kıyaslama (benchmarking) aracı.',
              tags: ['Python', 'AI Benchmarking', 'Data'],
              icon: <Terminal size={20} />
            },
          ].map((repo, i) => (
            <motion.div 
              className="github-card" 
              key={i}
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
              <div className="card-top">
                <div className="repo-icon">{repo.icon}</div>
              </div>
              <h3 className="github-repo-name">{repo.name}</h3>
              <p className="github-repo-desc">{repo.desc}</p>
              <div className="repo-tags">
                {repo.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
