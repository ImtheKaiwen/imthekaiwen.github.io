import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { useDynamicIsland } from '../context/DynamicIslandContext';
import campusMealImg from '../assets/campusmeal.png';
import visionJournalImg from '../assets/visionjournal.png';
import './ProjectDetail.css';

const projectData = {
  'cube-rivals': {
    title: 'Cube Rivals',
    img: '/cube-rival.png',
    subtitle: 'Step into the world of 3D cube puzzles with guided challenges and global leaderboards.',
    themeColor: '#4C1D95',
    themeGradient: 'linear-gradient(135deg, #2E1065, #4C1D95)',
    screenshots: [1, 2, 3, 4, 5, 6, 7].map(n => `/project-imgs/cube-rival/${n}.png`),
    features: [
      { icon: 'fas fa-graduation-cap', title: 'Easy Onboarding', value: 'Warmup Puzzles' },
      { icon: 'fas fa-stopwatch', title: 'Puzzle Rush', value: '60-Second Runs' },
      { icon: 'fas fa-globe', title: 'Daily Cube', value: 'Global Leaderboard' },
      { icon: 'fas fa-cube', title: 'Premium 3D', value: 'Haptic Feedback' }
    ],
    universities: [],
    contact: 'kaiwen.info@gmail.com'
  },
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
    githubRepoForLatestRelease: 'ImtheKaiwen/vision_journal_desktop',
    contact: 'kaiwen.info@gmail.com'
  },
  'kause': {
    title: 'Kause',
    img: '/kause-icon.png',
    subtitle: 'Yapay zeka destekli göz kırpma ve duruş takip uygulaması',
    themeColor: '#0A0A0A',
    themeGradient: 'linear-gradient(135deg, #1f1f1f, #050505)',
    screenshots: [],
    video: '/video/kause.mp4',
    howToVideo: '/video/Kause-How.mp4',
    features: [
      { icon: 'fas fa-eye', title: 'Göz Kırpma', value: 'Akıllı Uyarı' },
      { icon: 'fas fa-child', title: 'Postür', value: 'Duruş Analizi' },
      { icon: 'fas fa-users', title: 'Yönetim', value: 'Canlı Ekip Takibi' }
    ],
    universities: [],
    downloadUrl: 'https://github.com/ImtheKaiwen/kause/releases/download/v0.1.2/Kause-Setup-0.1.2.exe',
    githubRepoForLatestRelease: 'ImtheKaiwen/kause',
    contact: 'kaiwen.info@gmail.com'
  },
  'kallor': {
    title: 'Kallor',
    img: '/kallor.jpg',
    subtitle: 'Ekran cetveli, anlık çizim ve gelişmiş renk paleti araçları sunan akıllı tasarım asistanı',
    themeColor: '#7C3AED',
    themeGradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
    screenshots: [],
    video: '/video/kallor-anim.mp4',
    howToVideo: '/video/kallor.mp4',
    features: [
      { icon: 'fas fa-palette', title: 'Renk Paleti', value: 'Akıllı Uyum' },
      { icon: 'fas fa-ruler-combined', title: 'Hassas Ölçüm', value: 'Ekran Cetveli' },
      { icon: 'fas fa-paint-brush', title: 'Ekran Çizimi', value: 'Anlık Çizim' }
    ],
    universities: [],
    downloadUrl: 'https://github.com/ImtheKaiwen/kallor/releases/download/v1.0.0/Kallor-Setup-1.0.0.exe',
    githubRepoForLatestRelease: 'ImtheKaiwen/kallor',
    contact: 'kaiwen.info@gmail.com'
  },
  'kaifridge': {
    title: 'kaiFridge',
    img: '/kaifridge.jpg',
    subtitle: '"Bu akşam ne pişirsem?" sorusuna veda edin.',
    themeColor: '#10B981',
    themeGradient: 'linear-gradient(135deg, #10B981, #34D399)',
    screenshots: [1, 2, 3, 4, 5, 6, 7].map(n => `/project-imgs/kaifridge/${n}.png`),
    features: [
      { icon: 'fas fa-camera', title: 'Vision AI', value: 'Fotoğraf Çek' },
      { icon: 'fas fa-microphone', title: 'Kişiye Özel', value: 'Ses ve Yazı' },
      { icon: 'fas fa-feather', title: 'Sıfır Karmaşa', value: 'Sade Arayüz' }
    ],
    universities: [],
    appStore: 'https://apps.apple.com/tr/app/kaifridge-ai-meal-planner/id6783181650?l=tr',
    contact: 'kaiwen.info@gmail.com'
  },
  'kaido': {
    title: 'kaido',
    img: '/kaido.jpg',
    subtitle: 'Sade tasarımı ve dinamik ada entegrasyonuyla şık todo asistanı',
    themeColor: '#0f1115',
    themeGradient: 'linear-gradient(135deg, #1f2937, #111827)',
    webUrl: 'https://kwdo.vercel.app/',
    screenshots: [
      'Ekran görüntüsü 2026-06-23 211123.png',
      'Ekran görüntüsü 2026-06-23 211135.png',
      'Ekran görüntüsü 2026-06-23 211202.png',
      'Ekran görüntüsü 2026-06-23 211239.png',
      'Ekran görüntüsü 2026-06-23 211252.png',
      'Ekran görüntüsü 2026-06-23 211302.png'
    ].map(name => `/project-imgs/kaido/${name}`),
    features: [
      { icon: 'fas fa-check-circle', title: 'Minimalist Todo', value: 'Sade Tasarım' },
      { icon: 'fas fa-clock', title: 'Dinamik Ada', value: 'Timer Desteği' },
      { icon: 'fas fa-folder', title: 'Klasörleme', value: 'Pratik Düzen' }
    ],
    universities: [],
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
          borderColor: stage === 'success' ? '#4ade80' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: stage === 'success' ? '0 0 30px rgba(74, 222, 128, 0.4)' : '0 20px 40px rgba(0, 90, 158, 0.15)'
        }}
        transition={{ duration: 0.5 }}
        style={{ border: '1px solid transparent', borderRadius: '12px' }}
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

const PromoVideo = ({ src }) => {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const videoRef = React.useRef(null);
  const progressRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(err => console.error("Fullscreen error:", err));
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (videoRef.current?.webkitEnterFullscreen) {
        // iPhone Safari fallback
        videoRef.current.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  return (
    <motion.section
      className="promo-video-section"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
    >
      <div
        ref={containerRef}
        className={`video-wrapper ${isFullscreen ? 'fullscreen-mode' : ''}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="promo-video"
          onTimeUpdate={handleTimeUpdate}
        />

        <div className={`video-controls ${isHovering ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="control-btn play-btn" onClick={togglePlay} aria-label={isPlaying ? "Durdur" : "Oynat"}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>

          <div className="progress-container" ref={progressRef} onClick={handleSeek}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          <button className="control-btn mute-btn" onClick={toggleMute} aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}>
            <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
          </button>

          <button className="control-btn fullscreen-btn" onClick={toggleFullscreen} aria-label={isFullscreen ? "Küçült" : "Tam Ekran"}>
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
        </div>
      </div>
    </motion.section>
  );
};

const KausePrivacyCards = () => {
  return (
    <div className="kause-bento-grid">
      <motion.div
        className="bento-item wide privacy-highlight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-user-shield"></i></div>
          <h3>Tam Gizlilik Garantisi</h3>
          <p>Kamera görüntüleri asla kaydedilmez, izlenmez veya herhangi bir bulut sunucusuna yüklenmez. Uygulama içerisindeki tüm analiz süreci anlık olarak gerçekleşir ve verileriniz tamamen sizin kontrolünüzdedir.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item offline-highlight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper">
            <i className="fas fa-wifi"></i>
            <div className="slash-line"></div>
          </div>
          <h3>İnternet Gerekmez</h3>
          <p>Yapay zeka modelleri cihazınızda lokal olarak çalışır. Seyahatte, kafede veya internetin olmadığı her yerde kesintisiz aktif kalır.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item backup-highlight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-hdd"></i></div>
          <h3>Yerel Yedekleme</h3>
          <p>Tüm gelişim verileriniz kendi bilgisayarınızın diskinde çevrimdışı bir şekilde depolanır ve yedeklenir. Güvenliğiniz en üst seviyededir.</p>
        </div>
      </motion.div>
    </div>
  );
};

const KauseSloganAnimation = () => {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.9 },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="kause-slogan-section wider">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="p0" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>Hit</motion.span>
              <motion.span variants={itemVariants} className="highlight pause">pause</motion.span>
              <motion.span variants={itemVariants}>on the</motion.span>
              <motion.span variants={itemVariants} className="highlight cause">causes</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>that break your focus.</motion.span>
            </div>
            <div className="slogan-line final-kause">
              <motion.span variants={itemVariants}>Meet</motion.span>
              <motion.span variants={itemVariants} className="highlight kause">Kause.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="p1" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>AI-Powered</motion.span>
            </div>
            <div className="slogan-line">
              <motion.span variants={itemVariants} className="highlight ai">Eye & Posture Tracking</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Running seamlessly in the background.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="p2" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>Live</motion.span>
              <motion.span variants={itemVariants} className="highlight team">Team Analytics</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Elevate your workspace productivity.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div key="p3" className="slogan-content logo-phase" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <motion.img
              src="/kause-icon.png"
              alt="Kause Logo"
              className="kause-animated-logo"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="kause-logo-text"
            >
              Kause
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KallorSloganAnimation = () => {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.9 },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="kallor-slogan-section wider">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="p0" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>Design with</motion.span>
              <motion.span variants={itemVariants} className="highlight ruler">Precision,</motion.span>
              <motion.span variants={itemVariants}>Create with</motion.span>
              <motion.span variants={itemVariants} className="highlight color">Color.</motion.span>
            </div>
            <div className="slogan-line final-kause">
              <motion.span variants={itemVariants}>Meet</motion.span>
              <motion.span variants={itemVariants} className="highlight kallor">Kallor.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="p1" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>Custom</motion.span>
              <motion.span variants={itemVariants} className="highlight color">Color Palettes & Conversions</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>HEX, RGB, and HSL formats instantly at your fingertips.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="p2" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>Precision</motion.span>
              <motion.span variants={itemVariants} className="highlight ruler">Screen Ruler</motion.span>
              <motion.span variants={itemVariants}>&</motion.span>
              <motion.span variants={itemVariants} className="highlight draw">Sketching</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Measure pixels directly on your screen and annotate instantly.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div key="p3" className="slogan-content logo-phase" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <motion.img
              src="/kallor.jpg"
              alt="Kallor Logo"
              className="kallor-animated-logo"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="kallor-logo-text"
            >
              Kallor
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KallorDetailedFeatures = () => {
  return (
    <div className="kause-bento-grid" id="app-content">
      <motion.div
        className="bento-item wide color-highlight kallor-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-palette"></i></div>
          <h3>Akıllı Renk Paletleri</h3>
          <p>Uyumlu renk kombinasyonları oluşturun, kontrast oranlarını (WCAG standartları) anlık test edin ve tasarımlarınız için en doğru renk şemalarını kolayca kurgulayın.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item measure-highlight kallor-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-ruler-combined"></i></div>
          <h3>Hassas Ekran Cetveli</h3>
          <p>Ekranda seçtiğiniz iki nokta arasındaki mesafeyi piksel bazında hatasız bir şekilde ölçün. Frontend tasarımlarınızı birebir koda dökerken mesafe hatalarına son verin.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item draw-highlight kallor-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-paint-brush"></i></div>
          <h3>Ekran Çizim Aracı</h3>
          <p>Ekranın herhangi bir bölgesi üzerine serbestçe çizimler yapın, notlar alın ve anlık geribildirimler/açıklamalar için görsel işaretlemeler oluşturun.</p>
        </div>
      </motion.div>
    </div>
  );
};

const KaiFridgeSloganAnimation = () => {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.9 },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="kaifridge-slogan-section wider">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="p0" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>"Bu akşam ne pişirsem?"</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>sorusuna veda edin.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="p1" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants} className="highlight snap">Buzdolabını Tara</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Vision AI malzemelerinizi anında tanır ve kaydeder.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="p2" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants} className="highlight taste">Sana Özel Tarifler</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Sesli veya yazılı taleplerinize göre damak tadınıza özel tarifler.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div key="p3" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants} className="highlight clean">Minimalist Arayüz</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Pürüzsüz animasyonlar ve sıfır karmaşa.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div key="p4" className="slogan-content logo-phase" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <motion.img
              src="/kaifridge.jpg"
              alt="kaiFridge Logo"
              className="kaifridge-animated-logo"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="kaifridge-logo-text"
            >
              kaiFridge
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KaiFridgeDetailedFeatures = () => {
  return (
    <div className="kause-bento-grid" id="app-content">
      <motion.div
        className="bento-item wide snap-highlight kaifridge-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-camera"></i></div>
          <h3>Fotoğraf Çek ve Keşfet (SNAP & DISCOVER)</h3>
          <p>Yazı yazarak zaman kaybetmeyin. Premium kullanıcılar buzdolabının bir fotoğrafını çekerek gelişmiş Vision AI teknolojimizin tüm malzemeleri anında algılamasını sağlayabilir. Sanal buzdolabınız otomatik olarak güncellenir.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item taste-highlight kaifridge-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-microphone"></i></div>
          <h3>Damak Tadınıza Özel (TAILORED TO YOUR TASTE)</h3>
          <p>Canınızın ne çektiğini kaiFridge'e söyleyin. İster sesli olarak dile getirin ister yazılı olarak ifade edin; yapay zekamız modunuza, elinizdeki malzemelere ve seçtiğiniz dünya mutfaklarına en uygun tarifi sizin için tasarlar.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item clean-highlight kaifridge-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-feather-alt"></i></div>
          <h3>Minimalist & Akıcı Deneyim</h3>
          <p>Karmaşadan tamamen uzak, pürüzsüz animasyonlar ve modern şık ikonlarla bezenmiş arayüz. Emojiler veya karmaşık ızgaralar yok, sadece sade ve sezgisel bir tasarım.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item wide flexible-highlight kaifridge-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.3 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-sliders-h"></i></div>
          <h3>Esnek Kalın (STAY FLEXIBLE)</h3>
          <p>Manuel yönetimi mi tercih ediyorsunuz? Malzemelerinizi sade ve yumuşak tonlu kategorilerle kolayca düzenleyin. Hatta kalan yemeklerinizi sisteme ekleyerek yapay zekanın onları sonraki akşam yemeği planınızla harmanlamasını sağlayın.</p>
        </div>
      </motion.div>
    </div>
  );
};

const KaidoSloganAnimation = () => {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.9 },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="kaido-slogan-section wider">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="p0" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>Gereksiz detayları geride bırakın.</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Sadece işlerinize odaklanın.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="p1" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants} className="highlight timer">Dinamik Ada & Zamanlayıcı</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Zamanlayıcı (timer) başlatın, odaklanma sürenizi doğrudan adadan izleyin.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="p2" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants} className="highlight folders">Düzenli Klasörleme</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Yapılacakları temiz kategoriler ve modern klasörlerle gruplayın.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div key="p3" className="slogan-content" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <div className="slogan-line">
              <motion.span variants={itemVariants}>Sade ve Ferah Arayüz</motion.span>
            </div>
            <div className="slogan-line text-sm">
              <motion.span variants={itemVariants}>Karmaşık paneller yerine, sadece yapacağınız görevler.</motion.span>
            </div>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div key="p4" className="slogan-content logo-phase" variants={containerVariants} initial="hidden" animate="show" exit="exit">
            <motion.img
              src="/kaido.jpg"
              alt="kaido Logo"
              className="kaido-animated-logo"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="kaido-logo-text"
            >
              kaido
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KaidoDetailedFeatures = () => {
  return (
    <div className="kause-bento-grid" id="app-content">
      <motion.div
        className="bento-item wide todo-highlight kaido-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-check-circle"></i></div>
          <h3>Sade & Minimalist Tasarım</h3>
          <p>Karmaşık panellerden, dikkat dağıtan reklamlardan ve kalabalıktan uzak kalın. kaido, yalnızca görevlerinizi organize etmenize ve üretken kalmanıza odaklanan, son derece sade ve ferah bir tasarım sunar.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item timer-highlight kaido-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-clock"></i></div>
          <h3>Dinamik Ada & Zamanlayıcı</h3>
          <p>Görevleriniz için ekranın üst kısmındaki akıllı dinamik ada aracılığıyla zamanlayıcı (timer) başlatabilirsiniz. Çalışma ve mola sürelerinizi zahmetsizce yönetip odaklanın.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item folder-highlight kaido-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-folder"></i></div>
          <h3>Kolay Klasörleme & Düzen</h3>
          <p>Yapılacak listelerinizi projelerinize veya konu başlıklarına göre özel klasörler altında gruplayın. İş, okul ve kişisel hayatınızı kategorilere bölerek kontrol altında tutun.</p>
        </div>
      </motion.div>

      <motion.div
        className="bento-item wide todo-highlight kaido-light-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.3 }}
      >
        <div className="bento-content">
          <div className="icon-glow-wrapper"><i className="fas fa-magic"></i></div>
          <h3>Akıcı ve Tatlı Deneyim</h3>
          <p>Ultra akıcı geçiş animasyonları, yumuşak renk tonları ve sezgisel buton yerleşimleriyle bezenmiş bir yapılacaklar listesi deneyimi. Kaido, işlerinizi organize etmeyi keyifli hale getirir.</p>
        </div>
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
        { path: `/project/${id}#${id === 'kallor' ? 'app-content' : (project.screenshots.length > 0 ? 'app-content' : (project.howToVideo ? 'how-it-works' : 'about'))}`, label: 'Features' },
        { path: `/project/${id}#contact`, label: 'Contact' }
      ]);
      setLeftAction('back');

      if (id === 'kause') {
        const originalTitle = document.title;
        const favicon = document.querySelector("link[rel~='icon']");
        const originalFavicon = favicon ? favicon.href : '';

        document.title = 'Kause - AI Eye & Posture Tracking';
        if (favicon) {
          favicon.href = '/kause-icon.png';
        }

        return () => {
          document.title = originalTitle;
          if (favicon && originalFavicon) {
            favicon.href = originalFavicon;
          }
        };
      }

      if (id === 'kallor') {
        const originalTitle = document.title;
        const favicon = document.querySelector("link[rel~='icon']");
        const originalFavicon = favicon ? favicon.href : '';

        document.title = 'Kallor - Smart Color & Measure Tool';
        if (favicon) {
          favicon.href = '/kallor.jpg';
        }

        return () => {
          document.title = originalTitle;
          if (favicon && originalFavicon) {
            favicon.href = originalFavicon;
          }
        };
      }

      if (id === 'kaifridge') {
        const originalTitle = document.title;
        const favicon = document.querySelector("link[rel~='icon']");
        const originalFavicon = favicon ? favicon.href : '';

        document.title = 'kaiFridge - Akıllı Mutfak Asistanı';
        if (favicon) {
          favicon.href = '/kaifridge.jpg';
        }

        return () => {
          document.title = originalTitle;
          if (favicon && originalFavicon) {
            favicon.href = originalFavicon;
          }
        };
      }

      if (id === 'kaido') {
        const originalTitle = document.title;
        const favicon = document.querySelector("link[rel~='icon']");
        const originalFavicon = favicon ? favicon.href : '';

        document.title = 'kaido - Sade ve Şık Todo Uygulaması';
        if (favicon) {
          favicon.href = '/kaido.jpg';
        }

        return () => {
          document.title = originalTitle;
          if (favicon && originalFavicon) {
            favicon.href = originalFavicon;
          }
        };
      }
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
    const sections = ['about', 'app-content', 'how-it-works', 'contact'];
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

  const isLandscape = id.includes('desktop') || project.type === 'desktop' || project.type === 'web' || id === 'kaido';

  const scrollPictures = (direction) => {
    if (scrollRef.current) {
      // Masaüstü projeleri için daha fazla kaydır (resim genişliği + gap)
      const scrollAmount = isLandscape ? 620 : 300;
      const amount = direction === 'left' ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleIslandAction = async (action) => {
    if (action === 'weburl') {
      showMessage("Web sitesine yönlendiriliyor...", <i className="fas fa-globe"></i>, 2000);
      window.open(project.webUrl, '_blank');
    }
    if (action === 'appstore') {
      showMessage("App Store'a Yönlendiriliyor...", <i className="fab fa-apple"></i>, 2000);
      window.open(project.appStore, '_blank');
    }
    if (action === 'googleplay') {
      showMessage("Google Play'e Yönlendiriliyor...", <i className="fab fa-google-play"></i>, 2000);
      window.open(project.googlePlay, '_blank');
    }
    if (action === 'download') {
      if (project.githubRepoForLatestRelease) {
        showMessage("En güncel sürüm bulunuyor...", <i className="fas fa-sync fa-spin"></i>, 2000);
        try {
          const response = await fetch(`https://api.github.com/repos/${project.githubRepoForLatestRelease}/releases/latest`);
          const data = await response.json();
          const exeAsset = data.assets?.find(asset => asset.name.toLowerCase().includes('setup') && asset.name.endsWith('.exe')) || data.assets?.find(asset => asset.name.endsWith('.exe'));

          if (exeAsset) {
            showMessage("İndirme başlatılıyor...", <i className="fas fa-download"></i>, 2000);
            window.open(exeAsset.browser_download_url, '_blank');
          } else {
            // Eğer exe bulunamazsa direkt releases sayfasına yönlendir
            window.open(`https://github.com/${project.githubRepoForLatestRelease}/releases/latest`, '_blank');
          }
        } catch (error) {
          // Hata durumunda statik linke dön
          window.open(project.downloadUrl, '_blank');
        }
      } else {
        showMessage("İndirme sayfasına yönlendiriliyor...", <i className="fas fa-download"></i>, 2000);
        window.open(project.downloadUrl, '_blank');
      }
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

          {project.video && (
            <PromoVideo src={project.video} />
          )}

          {id === 'kause' && <KauseSloganAnimation />}
          {id === 'kallor' && <KallorSloganAnimation />}
          {id === 'kaifridge' && <KaiFridgeSloganAnimation />}
          {id === 'kaido' && <KaidoSloganAnimation />}

          <div className="download-btn-container">
            {project.webUrl && (
              <button className="download-btn weburl" onClick={() => handleIslandAction('weburl')}>
                <i className="fas fa-globe"></i> Web Sitesini Ziyaret Et
              </button>
            )}
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
              <div className={`feature-card ${id === 'kallor' ? `kallor-card-${i}` : ''}`} key={i}>
                <div className="header-info">
                  <div className="icon"><i className={f.icon}></i></div>
                  <h3>{f.title}</h3>
                </div>
                <h1>{f.value}</h1>
              </div>
            ))}
          </div>

          {id === 'kause' && <KausePrivacyCards />}
        </section>

        {id === 'kallor' && <KallorDetailedFeatures />}
        {id === 'kaifridge' && <KaiFridgeDetailedFeatures />}
        {id === 'kaido' && <KaidoDetailedFeatures />}

        {project.howToVideo && (
          <div className="how-to-section" id="how-it-works">
            <h1 className="section-title">Nasıl Çalışır?</h1>
            <h2 className="section-subtitle">Programın kullanımı hakkında detaylı bilgi</h2>
            <PromoVideo src={project.howToVideo} />
          </div>
        )}

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
                    className={`picture ${isLandscape ? 'desktop-picture' : ''}`}
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

      <footer id="contact" className={id === 'kallor' ? 'kallor-footer' : ''}>
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
            {project.webUrl && (
              <button className="footer-link-btn" onClick={() => handleIslandAction('weburl')}>
                <i className="fas fa-globe"></i> Web Sitesi
              </button>
            )}
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
