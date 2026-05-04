import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDynamicIsland } from '../context/DynamicIslandContext';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Monitor, Globe, Database, BrainCircuit, GraduationCap, Mail, Phone, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import pp from '../assets/pp.jpeg';
import './Home.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const { showMessage, setNavLinks, setLeftAction } = useDynamicIsland();
  const navigate = useNavigate();

  useEffect(() => {
    setNavLinks([
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' }
    ]);
    setLeftAction('logo');

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
        <motion.div className="profile-container" variants={itemVariants}>
          <div className="profile-img-wrapper">
            <img src={pp} alt="Kerem Keskinoğlu" className="profile-img" />
          </div>
        </motion.div>

        <motion.div className="hero-content" variants={itemVariants}>
          <div className="hero-badge">

            <span>Yazılım Mühendisliği Öğrencisi</span>
          </div>
          <h1 className="hero-title">
            Kerem <span className="gradient-text">Keskinoğlu</span>
          </h1>
          <p className="hero-subtitle">
            Modern teknolojilerle performanslı masaüstü uygulamaları, ölçeklenebilir backend mimarileri ve kullanıcı dostu dijital deneyimler inşa ediyorum.
          </p>

          <div className="hero-actions">
            <button className="cta-button primary" onClick={() => navigate('/projects')}>
              Projelerimi Gör <ChevronRight size={18} />
            </button>
            <button className="cta-button secondary" onClick={() => {
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}>
              İletişime Geç
            </button>
          </div>
        </motion.div>
      </motion.div>

      <section className="expertise-grid">
        <motion.div className="section-header" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="section-title">Uzmanlık Alanlarım</h2>
          <p className="section-subtitle">Farklı platformlarda uçtan uca çözümler üretiyorum</p>
        </motion.div>

        <div className="expertise-cards">
          {[
            {
              icon: <Monitor />,
              title: ".NET / Masaüstü",
              desc: "C# ve .NET ekosistemiyle performanslı Windows uygulamaları, UI/UX odaklı Forms tasarımları.",
              color: "#4290F5"
            },
            {
              icon: <Code2 />,
              title: "Full Stack / Web & Mobil",
              desc: "React, Node.js ve React Native ile modern web ve mobil uygulama geliştirme süreçleri.",
              color: "#10b981"
            },
            {
              icon: <Database />,
              title: "Backend Geliştirme",
              desc: "Python (Flask) ve Java (Spring Boot) ile modüler, ölçeklenebilir ve güvenli API mimarileri.",
              color: "#f59e0b"
            },
            {
              icon: <BrainCircuit />,
              title: "Veri Bilimi & AI",
              desc: "TensorFlow ve NLP kütüphaneleriyle görüntü işleme ve veri analizi odaklı modeller.",
              color: "#8b5cf6"
            }
          ].map((exp, i) => (
            <motion.div
              className="expertise-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="exp-icon" style={{ color: exp.color, background: `${exp.color}15` }}>{exp.icon}</div>
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="skills-section">
        <div className="skills-container">
          <div className="skills-info">
            <h2 className="section-title">Teknik Yetenekler</h2>
            <p className="section-subtitle">Kullandığım dil ve teknolojiler</p>
            <div className="education-mini-card">
              <GraduationCap size={24} />
              <div>
                <h4>Karabük Üniversitesi</h4>
                <p>Yazılım Mühendisliği | GPA: 3.2</p>
              </div>
            </div>
          </div>

          <div className="skills-groups">
            {[
              { icon: <Code2 size={20} />, label: "Diller", items: ["C#", "Python", "Java", "JavaScript", "TypeScript", "C", "SQL"] },
              { icon: <Monitor size={20} />, label: "Frameworks", items: [".NET", "Flask", "Spring Boot", "React", "React Native", "Electron.js"] },
              { icon: <Database size={20} />, label: "Veritabanı", items: ["SQL Server", "PostgreSQL", "MongoDB", "SQLite"] },
              { icon: <Sparkles size={20} />, label: "Diğer", items: ["Docker", "Git", "OCR", "Deep Learning", "NLP"] }
            ].map((group, i) => (
              <div className="skill-group" key={i}>
                <div className="skill-group-header">
                  {group.icon}
                  <h4>{group.label}</h4>
                </div>
                <div className="skill-tags">
                  {group.items.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="home-footer" id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-wrapper">
              <img src={pp} alt="Kerem Keskinoğlu" className="footer-logo" />
            </div>
            <div className="brand-info">
              <h3>Kerem Keskinoğlu</h3>
              <p>Yazılım Mühendisliği Öğrencisi</p>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>İletişim</h4>
              <a href="mailto:kaiwen.info@gmail.com" className="footer-link">
                <Mail size={18} /> kaiwen.info@gmail.com
              </a>
              <a href="tel:+905422645740" className="footer-link">
                <Phone size={18} /> +90 542 264 5740
              </a>
              <div className="footer-link">
                <MapPin size={18} /> Düzce / Merkez
              </div>
            </div>

            <div className="footer-column">
              <h4>Bağlantılar</h4>
              <a href="https://kaiwen.onrender.com" target="_blank" rel="noreferrer" className="footer-link">
                <Globe size={18} /> Kişisel Web Sitem
              </a>
              <button onClick={() => navigate('/projects')} className="footer-link-btn">
                <Monitor size={18} /> Projelerim
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Kerem Keskinoğlu. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
