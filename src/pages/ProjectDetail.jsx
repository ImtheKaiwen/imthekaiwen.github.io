import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDynamicIsland } from '../context/DynamicIslandContext';
import campusMealImg from '../assets/campusmeal.png';
import visionJournalImg from '../assets/visionjournal.png';
import './ProjectDetail.css';

const projectData = {
  'campus-meal': {
    title: 'Campus Meal',
    img: campusMealImg,
    subtitle: 'Kampüs ve Yurt menülerini hızlıca takip et',
    themeColor: '#4290F5',
    themeGradient: 'linear-gradient(135deg, #4290F5, #6bb3ff)',
    screenshots: [2, 3, 4, 5, 6, 7, 8].map(n => `/project-imgs/campus-meal/${n}.png`),
    features: [
      { icon: 'fas fa-university', title: 'Üniversite', value: '2' },
      { icon: 'fas fa-city', title: 'Şehir', value: '10' }
    ],
    universities: ['Karabük Üniversitesi', 'Karadeniz Teknik Üniversitesi'],
    appStore: 'https://apps.apple.com/us/app/campus-meal-yemek-takibi/id6762930611',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.campusmeal',
    contact: 'kaiwen.info@gmail.com'
  },
  'vision-journal': {
    title: 'Vision Journal',
    img: visionJournalImg,
    subtitle: 'Günlük tutma, vizyon belirleme ve bunları takip etme',
    themeColor: '#141210',
    themeGradient: 'linear-gradient(135deg, #2a2a2a, #000000)',
    screenshots: [2, 3, 4, 5, 6, 7, 8, 9].map(n => `/project-imgs/vision-journal/${n}.png`),
    features: [
      { icon: 'fas fa-book-open', title: 'Günlük', value: 'Sınırsız' },
      { icon: 'fas fa-eye', title: 'Vizyon', value: 'Hedefler' }
    ],
    universities: [],
    appStore: 'https://apps.apple.com/us/app/vision-journal-hedef-takibi/id6762062493',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.visionjournal',
    contact: 'kaiwen.info@gmail.com'
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setNavLinks, setLeftAction, showMessage } = useDynamicIsland();
  const scrollRef = useRef(null);
  const project = projectData[id];
  
  useEffect(() => {
    if (project) {
      setNavLinks([
        { path: `/project/${id}#about`, label: 'About' },
        { path: `/project/${id}#app-content`, label: 'Features' },
        { path: `/project/${id}#contact`, label: 'Contact' }
      ]);
      setLeftAction('back');
    }
  }, [id, project, setNavLinks, setLeftAction]);

  const isAutoScrolling = useRef(false);

  useEffect(() => {
    if (location.hash) {
      isAutoScrolling.current = true;
      const hash = location.hash.replace('#', '');
      const el = document.getElementById(hash);
      
      if (el) {
        const offset = 110;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        
        // Unlock after a while
        const timer = setTimeout(() => {
          isAutoScrolling.current = false;
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, id]);

  useEffect(() => {
    const sections = ['about', 'app-content', 'contact'];
    let throttleTimer = false;

    const handleScroll = () => {
      if (throttleTimer || isAutoScrolling.current || window.isNavigating) return;
      
      throttleTimer = true;
      setTimeout(() => { throttleTimer = false; }, 30); // Reduced from 100ms to 30ms

      const scrollPos = window.scrollY + 200;
      const scrollBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (scrollBottom) {
        if (location.hash !== '#contact') navigate('#contact', { replace: true });
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          if (location.hash !== `#${section}`) {
            navigate(`#${section}`, { replace: true });
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.hash, navigate]);

  if (!project) return <Navigate to="/projects" />;

  const scrollPictures = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleIslandAction = (action) => {
    if (action === 'appstore') {
      showMessage("App Store'a Yönlendiriliyor...", <i className="fab fa-apple"></i>, 2000);
      window.open(project.appStore, '_blank');
    }
    if (action === 'googleplay') {
      showMessage("Google Play'e Yönlendiriliyor...", <i className="fab fa-google-play"></i>, 2000);
      window.open(project.googlePlay, '_blank');
    }
    if (action === 'mail') {
      showMessage("E-posta uygulaması açılıyor...", <i className="fas fa-envelope"></i>, 2000);
      window.location.href = `mailto:${project.contact}`;
    }
    if (action === 'linkedin') {
      showMessage("LinkedIn açılıyor...", <i className="fab fa-linkedin"></i>, 2000);
      window.open('https://www.linkedin.com/in/kerem-keskino%C4%9Flu-977387299/', '_blank');
    }
  };

  return (
    <motion.div 
      className="project-detail-wrapper"
      style={{
        '--theme-color': project.themeColor,
        '--theme-gradient': project.themeGradient
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main>
        <section className="top-info" id="about">
          <motion.img 
            layoutId={`app-icon-${id}`}
            src={project.img} 
            alt={`${project.title} logo`} 
            className="logo" 
          />
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
          <div className="download-btn-container">
            {project.appStore && (
              <button className="download-btn appstore" onClick={() => handleIslandAction('appstore')}>
                <i className="fab fa-apple"></i> App Store
              </button>
            )}
            {project.googlePlay && (
              <button className="download-btn googleplay" onClick={() => handleIslandAction('googleplay')}>
                <i className="fab fa-google-play"></i> Google Play
              </button>
            )}
          </div>

          <div className="features">
            {project.features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="header-info">
                  <div className="icon"><i className={f.icon}></i></div>
                  <h3>{f.title}</h3>
                </div>
                <h1>{f.value}</h1>
              </div>
            ))}
          </div>
        </section>

        {project.screenshots.length > 0 && (
          <section id="app-content" className="app-view">
            <h1 className="top-header">Uygulama İçeriği</h1>
            <h2 className="sub-header">Ekran Görüntüleri ile daha yakından incele</h2>
            <div className="picture-box">
              <button className="arrow" onClick={() => scrollPictures('left')} aria-label="Sola kaydır"><i className="fas fa-chevron-left"></i></button>
              <div className="app-pictures" ref={scrollRef}>
                {project.screenshots.map((src, i) => (
                  <img key={i} className="picture" src={src} alt={`${project.title} screenshot ${i + 1}`} />
                ))}
              </div>
              <button className="arrow" onClick={() => scrollPictures('right')} aria-label="Sağa kaydır"><i className="fas fa-chevron-right"></i></button>
            </div>
          </section>
        )}

        {project.universities.length > 0 && (
          <section className="university-info">
            <h1>Desteklenen Üniversiteler</h1>
            <div className="university-feature-card-container">
              {project.universities.map((uni, i) => (
                <div className="university-feature-card" key={i}>
                  <div className="icon"><i className="fas fa-university"></i></div>
                  <h1>{uni}</h1>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer id="contact">
        <div className="logo-side">
          <img className="logo-footer" src={project.img} alt="" />
          <h1>{project.title}</h1>
        </div>
        <div className="info-side">
          <div className="info-box">
            <h1>İletişim</h1>
            <button className="footer-link-btn" onClick={() => handleIslandAction('mail')}>
              <i className="fas fa-envelope"></i> {project.contact}
            </button>
          </div>
          <div className="info-box">
            <h1>Sosyal Medya</h1>
            <button className="footer-link-btn" onClick={() => handleIslandAction('linkedin')}>
              <i className="fab fa-linkedin"></i> LinkedIn
            </button>
          </div>
          <div className="info-box">
            <h1>Linkler</h1>
            <button className="footer-link-btn" onClick={() => handleIslandAction('appstore')}>
              <i className="fab fa-apple"></i> App Store
            </button>
            <button className="footer-link-btn" onClick={() => handleIslandAction('googleplay')}>
              <i className="fab fa-google-play"></i> Google Play
            </button>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
