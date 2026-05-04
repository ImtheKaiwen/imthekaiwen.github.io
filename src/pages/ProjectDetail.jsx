import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
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
      { icon: 'fas fa-book-open', title: 'Derin Odak', value: 'Zihnini Özgür Bırak' },
      { icon: 'fas fa-eye', title: 'Büyük Resim', value: 'Geleceğini Tasarla' }
    ],
    universities: [],
    appStore: 'https://apps.apple.com/us/app/vision-journal-hedef-takibi/id6762062493',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.visionjournal',
    contact: 'kaiwen.info@gmail.com'
  },
  'vision-journal-desktop': {
    title: 'Vision Journal Desktop',
    img: '/vision_journal_desktop.jpg',
    subtitle: 'Masaüstü için optimize edilmiş vizyon ve günlük uygulaması',
    themeColor: '#0A0A0A',
    themeGradient: 'linear-gradient(135deg, #1a1a1a, #050505)',
    screenshots: [
      'Ekran görüntüsü 2026-05-04 191618.png',
      'Ekran görüntüsü 2026-05-04 191625.png',
      'Ekran görüntüsü 2026-05-04 191637.png',
      'Ekran görüntüsü 2026-05-04 191646.png',
      'Ekran görüntüsü 2026-05-04 191702.png',
      'Ekran görüntüsü 2026-05-04 193058.png',
      'Ekran görüntüsü 2026-05-04 193155.png',
      'Ekran görüntüsü 2026-05-04 193218.png'
    ].map(name => `/project-imgs/vision-journal-desktop/${name}`),
    features: [
      { icon: 'fas fa-desktop', title: 'Desktop First', value: 'Büyük Ekran Deneyimi' },
      { icon: 'fas fa-bolt', title: 'Hızlı Erişim', value: 'Her An Elinin Altında' },
      { icon: 'fas fa-shield-alt', title: 'Gizlilik', value: 'Veriler Yerelde Saklanır' }
    ],
    universities: [],
    downloadUrl: 'https://github.com/ImtheKaiwen/vision_journal_desktop/releases/download/v1.0.3/Vision-Journal-Setup-1.0.3.exe',
    contact: 'kaiwen.info@gmail.com'
  }
};

const SmartScreenSimulation = () => {
  const [stage, setStage] = React.useState('initial');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStage(prev => {
        if (prev === 'initial') return 'expanded';
        if (prev === 'expanded') return 'clicked';
        if (prev === 'clicked') return 'loading';
        if (prev === 'loading') return 'success';
        return 'initial';
      });
    }, stage === 'loading' ? 2000 : 2500);
    return () => clearInterval(timer);
  }, [stage]);

  return (
    <div className="ss-window">
      <motion.div 
        className="ss-container"
        animate={{ 
          backgroundColor: stage === 'success' ? '#4ade80' : (stage === 'loading' ? '#ffffff' : '#0078d7'),
        }}
        transition={{ duration: 0.5 }}
      >
        {stage === 'initial' || stage === 'expanded' || stage === 'clicked' ? (
          <div className="ss-dialog">
            <div className="ss-header">Windows protected your PC</div>
            
            <div className="ss-body">
              <p className="ss-text-small">Microsoft Defender SmartScreen prevented an unrecognized app from starting...</p>
              
              <motion.span 
                className={`ss-more-info ${stage !== 'initial' ? 'hidden' : ''}`}
                animate={{ opacity: stage === 'initial' ? 1 : 0 }}
              >
                More info
              </motion.span>

              <motion.div 
                className="ss-expanded-info"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: stage === 'initial' ? 0 : 'auto',
                  opacity: stage === 'initial' ? 0 : 1 
                }}
              >
                <p className="ss-text-extra">App: Vision_Journal.exe</p>
                <p className="ss-text-extra">Publisher: Unknown publisher</p>
              </motion.div>
            </div>

            <div className="ss-footer-actions">
              {stage !== 'initial' && (
                <motion.button 
                  className="ss-run-anyway active"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: stage === 'clicked' ? 0.9 : 1,
                    backgroundColor: stage === 'clicked' ? '#e1e1e1' : '#ffffff'
                  }}
                >
                  Run anyway
                </motion.button>
              )}
              <button className="ss-dont-run">Don't run</button>
            </div>
          </div>
        ) : null}

        {stage === 'loading' && (
          <div className="ss-loading-view">
            <div className="ss-progress-container">
              <motion.div 
                className="ss-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            <p>Kuruluyor...</p>
          </div>
        )}

        {stage === 'success' && (
          <motion.div 
            className="ss-success-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="ss-check-icon-wrapper"
              initial={{ scale: 0.5, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <i className="fas fa-check"></i>
            </motion.div>
          </motion.div>
        )}

        {/* Cursor Simulation */}
        {(stage === 'initial' || stage === 'expanded') && (
          <motion.div 
            className="ss-cursor"
            initial={{ x: 200, y: 150 }}
            animate={stage === 'initial' ? { x: 50, y: 110 } : { x: 180, y: 240 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <motion.div 
              className="cursor-arrow"
              animate={stage === 'clicked' ? { scale: 0.8 } : { scale: 1 }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
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
      if (throttleTimer || isAutoScrolling.current) return;
      
      throttleTimer = true;
      setTimeout(() => { throttleTimer = false; }, 100);

      const scrollPos = window.scrollY + 250;
      const scrollBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      let currentSection = '';
      if (scrollBottom) {
        currentSection = 'contact';
      } else {
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection && !location.hash.includes(`#${currentSection}`)) {
        // HashRouter compatible silent update
        const currentHash = window.location.hash; // e.g. #/project/id#about
        const baseRoute = currentHash.split('#')[1] || ''; // /project/id
        const cleanRoute = baseRoute.split('#')[0]; // /project/id
        
        window.history.replaceState(null, '', `#${cleanRoute}#${currentSection}`);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.hash]);

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
    if (action === 'download') {
      showMessage("İndirme sayfasına yönlendiriliyor...", <i className="fas fa-download"></i>, 2000);
      window.open(project.downloadUrl, '_blank');
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
            {project.downloadUrl && (
              <div className="download-section">
                <button className="download-btn download" onClick={() => handleIslandAction('download')}>
                  <i className="fas fa-download"></i> Hemen İndir (Windows .exe)
                </button>
                
                <div className="security-notice">
                  <div className="security-main">
                    <div className="security-text">
                      <div className="security-header">
                        <i className="fas fa-shield-alt"></i>
                        <h4>Güvenlik ve Kurulum Notu</h4>
                      </div>
                      <p>
                        Uygulama henüz yeni olduğu için Windows <strong>"SmartScreen"</strong> uyarısı verebilir. 
                      </p>
                      <div className="security-steps">
                        <div className="step-item">1. <span>Ek Bilgi</span>'ye tıklayın.</div>
                        <div className="step-item">2. <span>Yine de Çalıştır</span>'a tıklayın.</div>
                      </div>
                    </div>
                    
                    <div className="security-simulation">
                      <SmartScreenSimulation />
                    </div>
                  </div>
                </div>
              </div>
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
                  <img 
                    key={i} 
                    className={`picture ${id.includes('desktop') ? 'desktop-picture' : ''}`} 
                    src={src} 
                    alt={`${project.title} screenshot ${i + 1}`} 
                  />
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
            {project.appStore && (
              <button className="footer-link-btn" onClick={() => handleIslandAction('appstore')}>
                <i className="fab fa-apple"></i> App Store
              </button>
            )}
            {project.googlePlay && (
              <button className="footer-link-btn" onClick={() => handleIslandAction('googleplay')}>
                <i className="fab fa-google-play"></i> Google Play
              </button>
            )}
            {project.downloadUrl && (
              <button className="footer-link-btn" onClick={() => handleIslandAction('download')}>
                <i className="fas fa-download"></i> İndir
              </button>
            )}
            <Link to={`/privacy/${id}`} className="footer-link-btn">
              <i className="fas fa-shield-alt"></i> Gizlilik Politikası
            </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
