import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Sparkles, Navigation, Bot } from 'lucide-react';
import campusMealImg from '../../assets/campusmeal.png';
import visionJournalImg from '../../assets/visionjournal.png';
import './IslandShowcase.css';

const SHOWCASE_DATA = [
  {
    id: 'ai-search',
    tag: 'Akıllı Arama',
    title: 'Hızın Ötesinde Navigasyon',
    desc: 'Sadece ismini söyleyin. Yapay zeka projeyi anında tespit eder ve sizi oraya ışınlar.',
    sequence: [
      { mode: 'search', text: 'Campus Meal projesine git', duration: 2000 },
      { mode: 'loading', text: 'Hedef analiz ediliyor...', duration: 2000 },
      { mode: 'success', text: 'Bulundu! Yönlendiriliyorsun...', duration: 1500 }
    ]
  },
  {
    id: 'ai-assistant',
    tag: 'Portfolyo Asistanı',
    title: 'Sayfa İçeriğine Hakim Olun',
    desc: 'Karmaşık sayfalar arasında kaybolmayın. Asistanınıza sorun, o sizin için okuyup özetlesin.',
    sequence: [
      { mode: 'search', text: 'Bu sayfa ne hakkında?', duration: 2000 },
      { mode: 'loading', text: 'İçerik taranıyor...', duration: 1200 },
      { mode: 'interactive', text: 'Bu sayfa, portfolyonuzdaki yapay zeka destekli özellikleri deneyimlemeniz için tasarlandı.', duration: 5000 }
    ]
  },
  {
    id: 'smart-options',
    tag: 'Karar Mekanizması',
    title: 'Akıllı Seçenekler Sunar',
    desc: 'Eğer bir sorunun birden fazla cevabı varsa, ada size en mantıklı seçenekleri butonlar halinde sunar.',
    sequence: [
      { mode: 'search', text: 'Hangi uygulamaların var?', duration: 2000 },
      { mode: 'loading', text: 'Portfolyo taranıyor...', duration: 1200 },
      {
        mode: 'interactive_options', text: 'Şu an aktif 2 ana projen var:', options: [
          { id: 'campus-meal', label: 'Campus Meal', img: campusMealImg },
          { id: 'vision-journal', label: 'Vision Journal', img: visionJournalImg }
        ], duration: 5000
      }
    ]
  }
];

export default function IslandShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const activeFeature = SHOWCASE_DATA[activeIndex];
    const sequence = activeFeature.sequence;
    let timer;
    let typingTimer;
    let isMounted = true;

    const playSequence = (stepIdx) => {
      if (!isMounted) return;

      if (stepIdx >= sequence.length) {
        // Feature complete, move to next after a delay
        timer = setTimeout(() => {
          if (isMounted) {
            setActiveIndex((prev) => (prev + 1) % SHOWCASE_DATA.length);
            setCurrentStep(0);
          }
        }, 3000);
        return;
      }

      const step = sequence[stepIdx];
      setCurrentStep(stepIdx);

      if (step.mode === 'search') {
        let i = 0;
        setDisplayText('');
        typingTimer = setInterval(() => {
          if (isMounted) {
            setDisplayText(step.text.substring(0, i));
            i++;
            if (i > step.text.length) {
              clearInterval(typingTimer);
              timer = setTimeout(() => playSequence(stepIdx + 1), step.duration);
            }
          }
        }, 50);
      } else {
        timer = setTimeout(() => playSequence(stepIdx + 1), step.duration);
      }
    };

    setDisplayText('');
    playSequence(0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(typingTimer);
    };
  }, [activeIndex, isPaused]);

  const activeFeature = SHOWCASE_DATA[activeIndex];
  const currentStepData = activeFeature.sequence[currentStep] || activeFeature.sequence[0];

  return (
    <section className="showcase-section carousel-mode">
      <div className="showcase-carousel-container">
        
        {/* Top Content Card */}
        <div className="showcase-card-wrapper">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFeature.id}
              className="showcase-feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="feature-tag">{activeFeature.tag}</span>
              <h2 className="feature-title">{activeFeature.title}</h2>
              <p className="feature-desc">{activeFeature.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Simulator Area */}
        <div className="showcase-simulator-centered">
          <motion.div
            layout
            className="mock-island"
            animate={{
              width: currentStepData.mode.includes('interactive') ? 420 : 320,
              height: currentStepData.mode.includes('interactive') ? 180 : 60,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFeature.id}-${currentStep}`}
                className="mock-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentStepData.mode === 'search' && (
                  <div className="mock-search-ui">
                    <Search size={18} className="mock-icon" />
                    <div className="mock-input-sim">
                      {displayText}<span className="cursor-blink" />
                    </div>
                  </div>
                )}

                {currentStepData.mode === 'loading' && (
                  <div className="mock-search-ui">
                    <div className="custom-spinner" />
                    <span className="mock-text">{currentStepData.text}</span>
                  </div>
                )}

                {currentStepData.mode === 'success' && (
                  <div className="mock-search-ui">
                    <Sparkles size={18} className="mock-icon" style={{ color: '#f59e0b' }} />
                    <span className="mock-text">{currentStepData.text}</span>
                  </div>
                )}

                {currentStepData.mode === 'interactive' && (
                  <div className="mock-interactive-ui">
                    <div className="mock-response-text">{currentStepData.text}</div>
                  </div>
                )}

                {currentStepData.mode === 'interactive_options' && (
                  <div className="mock-interactive-ui">
                    <div className="mock-response-text">{currentStepData.text}</div>
                    <div className="mock-options-list">
                      {currentStepData.options.map((opt, i) => (
                        <div key={i} className="mock-option-item">
                          {opt.img && <img src={opt.img} alt="" className="mock-opt-img" />}
                          <span>{opt.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="showcase-dots">
          {SHOWCASE_DATA.map((_, i) => (
            <button 
              key={i} 
              className={`dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(i);
                setCurrentStep(0);
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
