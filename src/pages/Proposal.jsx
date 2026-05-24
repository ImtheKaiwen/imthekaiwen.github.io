import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDynamicIsland } from '../context/DynamicIslandContext';
import { Mail, Phone, MapPin, Send, Code, Smartphone, Monitor, CheckCircle, Sparkles, Shield, Cpu, RefreshCw, Edit2, AlertCircle } from 'lucide-react';
import './Proposal.css';

export default function Proposal() {
  const { setNavLinks, setLeftAction, showMessage } = useDynamicIsland();
  const formRef = useRef(null);
  
  // Step State: 'form' | 'preview' | 'sending' | 'success'
  const [step, setStep] = useState('form');

  // Form States
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [projectDescription, setProjectDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('Orta Segment');

  useEffect(() => {
    setNavLinks([
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' },
      { path: '/proposal', label: 'Proposal' }
    ]);
    setLeftAction('logo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setNavLinks, setLeftAction]);

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // 1. Move to Preview Screen
  const handleGoToPreview = (e) => {
    e.preventDefault();
    if (selectedPlatforms.length === 0) {
      showMessage("Lütfen en az bir platform seçin!", <AlertCircle size={18} style={{ color: '#f59e0b' }} />, 3000);
      return;
    }
    if (!contactName.trim() || !contactEmail.trim() || !projectDescription.trim()) {
      showMessage("Lütfen tüm alanları doldurun!", <AlertCircle size={18} style={{ color: '#f59e0b' }} />, 3000);
      return;
    }
    setStep('preview');
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // 2. Local Rate Limiter Control
  const checkRateLimit = () => {
    const now = Date.now();
    const storedSubmissions = localStorage.getItem('quote_submissions');
    let submissions = storedSubmissions ? JSON.parse(storedSubmissions) : [];

    // Filter submissions from the last 60 seconds (60000ms)
    submissions = submissions.filter(timestamp => now - timestamp < 60000);

    if (submissions.length >= 5) {
      return false;
    }

    // Add current timestamp and save
    submissions.push(now);
    localStorage.setItem('quote_submissions', JSON.stringify(submissions));
    return true;
  };

  // 3. Send Proposal to FormSubmit API
  const handleSendProposal = async () => {
    // Check Rate Limiter
    if (!checkRateLimit()) {
      showMessage(
        "Dakikada en fazla 5 istek gönderebilirsiniz. Lütfen biraz bekleyin.",
        <AlertCircle size={18} style={{ color: '#ef4444' }} />,
        4000
      );
      return;
    }

    setStep('sending');

    const emailTo = "kaiwen.info@gmail.com";
    const subject = `Proje Teklif Talebi - ${contactName}`;
    const mailtoBody = 
      `Merhaba Kerem,\n\nBenim için bir proje teklifi hazırlamanı rica ediyorum. Proje detayları aşağıdaki gibidir:\n\n` +
      `- Ad Soyad: ${contactName}\n` +
      `- E-posta: ${contactEmail}\n` +
      `- Hedef Platformlar: ${selectedPlatforms.join(', ')}\n` +
      `- Tahmini Bütçe: ${estimatedBudget}\n` +
      `- Proje Tanımı/İstekler:\n${projectDescription}\n\n` +
      `En kısa sürede dönüşünü bekliyorum.\n` +
      `İyi çalışmalar!`;

    const triggerMailtoFallback = () => {
      const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;
      window.location.href = mailtoUrl;
      setStep('success');
      showMessage(
        "Teklif e-posta istemcinize aktarıldı. Lütfen açılan uygulamadan 'Gönder' butonuna basın.",
        <CheckCircle size={18} style={{ color: '#f59e0b' }} />,
        8000
      );
    };

    const web3Key = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!web3Key) {
      console.warn("VITE_WEB3FORMS_KEY bulunamadı, mailto fallback çalıştırılıyor.");
      triggerMailtoFallback();
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: subject,
          name: contactName,
          email: contactEmail,
          platforms: selectedPlatforms.join(', '),
          budget: estimatedBudget,
          message: projectDescription
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep('success');
        showMessage("Teklif Başarıyla Gönderildi!", <CheckCircle size={18} style={{ color: '#10b981' }} />, 4000);
      } else {
        console.warn("Web3Forms API hatası:", data);
        triggerMailtoFallback();
      }
    } catch (error) {
      console.warn("Web3Forms API bağlantı hatası:", error);
      triggerMailtoFallback();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="proposal-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <motion.div className="proposal-hero" variants={itemVariants}>
        <div className="proposal-badge">
          <Sparkles size={16} />
          <span>Fikirlerinizi Kodlayalım</span>
        </div>
        <h1 className="proposal-title">
          Projeleriniz İçin <span className="gradient-text">Teklif Alın</span>
        </h1>
        <p className="proposal-subtitle">
          Web siteleri, masaüstü uygulamaları ve mobil platformlarda; profesyonel, modüler, esnek ve geleceğe hazır sistemler inşa ediyorum.
        </p>
      </motion.div>

      {/* Core Principles Grid */}
      <section className="principles-section">
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">Yazılım Geliştirme Yaklaşımım</h2>
          <p className="section-subtitle">Tüm projelerimde taviz vermediğim mühendislik prensipleri</p>
        </motion.div>

        <div className="principles-grid">
          {[
            {
              icon: <Cpu size={24} />,
              title: "Profesyonel & Modüler",
              desc: "Projenizi bağımsız, tekrar kullanılabilir modüller halinde tasarlıyorum. Bu sayede kod kalitesi artar, hata oranı düşer ve test süreçleri kolaylaşır.",
              color: "#4290F5"
            },
            {
              icon: <Shield size={24} />,
              title: "Esnek Mimari",
              desc: "Geliştirdiğim yapılar değişen iş gereksinimlerine göre kolayca genişletilebilir. Yeni bir özellik veya platform eklemek istediğinizde sistemi baştan yazmak gerekmez.",
              color: "#10b981"
            },
            {
              icon: <RefreshCw size={24} />,
              title: "Yenilenebilir & Sürdürülebilir",
              desc: "Geleceğin teknolojilerine uyumlu, teknik borç yaratmayan modern bağımlılıklar ve güncel kütüphaneler kullanarak sürdürülebilir ürünler teslim ediyorum.",
              color: "#8b5cf6"
            }
          ].map((principle, idx) => (
            <motion.div
              className="principle-card"
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}
            >
              <div className="principle-icon" style={{ color: principle.color, background: `${principle.color}12` }}>
                {principle.icon}
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Form & Info Split */}
      <section className="proposal-form-section" ref={formRef}>
        <div className="proposal-grid-layout">
          {/* Left Column: Multi-step Form & Preview */}
          <motion.div className="form-wrapper-card" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.form
                  key="proposal-form"
                  onSubmit={handleGoToPreview}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="proposal-form"
                >
                  <h3 className="form-card-title">Projenizi Tarif Edin</h3>
                  <p className="form-card-desc">Platform seçimi yapıp detayları girin, teklif talebini hazırlayalım.</p>

                  {/* Platform Selector */}
                  <div className="form-group">
                    <label className="form-label">Hedef Platformlar (Birden fazla seçebilirsiniz)</label>
                    <div className="platform-selector-grid">
                      {[
                        { id: 'Web', label: 'Web Uygulaması', icon: <Code size={20} /> },
                        { id: 'Mobil', label: 'Mobil Uygulama', icon: <Smartphone size={20} /> },
                        { id: 'Masaüstü', label: 'Masaüstü (Desktop)', icon: <Monitor size={20} /> }
                      ].map(platform => {
                        const isSelected = selectedPlatforms.includes(platform.id);
                        return (
                          <button
                            type="button"
                            key={platform.id}
                            className={`platform-btn-card ${isSelected ? 'active' : ''}`}
                            onClick={() => togglePlatform(platform.id)}
                          >
                            <span className="platform-btn-icon">{platform.icon}</span>
                            <span className="platform-btn-label">{platform.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Adınız Soyadınız</label>
                      <input
                        type="text"
                        id="name"
                        className="form-input"
                        placeholder="Örn. Kerem Keskinoğlu"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">E-posta Adresiniz</label>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Örn. ornek@email.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="form-group">
                    <label className="form-label">Tahmini Bütçe Segmenti</label>
                    <div className="budget-selector-grid">
                      {['Başlangıç', 'Orta Segment', 'Profesyonel / Özel'].map(budget => (
                        <button
                          type="button"
                          key={budget}
                          className={`budget-btn-card ${estimatedBudget === budget ? 'active' : ''}`}
                          onClick={() => setEstimatedBudget(budget)}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="form-group">
                    <label htmlFor="desc" className="form-label">Proje Detayları</label>
                    <textarea
                      id="desc"
                      className="form-textarea"
                      placeholder="Projenizin amacını, özelliklerini, hedef kitlesini ve varsa teknolojik tercihlerini kısaca yazın..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* Move to Preview */}
                  <button type="submit" className="form-submit-btn">
                    <span>Teklif Talebini Oluştur (Önizle)</span>
                    <Send size={18} />
                  </button>
                </motion.form>
              )}

              {step === 'preview' && (
                <motion.div
                  key="proposal-preview"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="preview-screen-container"
                >
                  <h3 className="form-card-title">Teklif Talebi Önizleme</h3>
                  <p className="form-card-desc">Lütfen bilgilerinizi kontrol edin. Gönder butonuna tıkladığınızda teklif bana iletilecektir.</p>

                  <div className="preview-fields-box">
                    <div className="preview-field">
                      <span className="preview-label">Ad Soyad</span>
                      <span className="preview-value">{contactName}</span>
                    </div>

                    <div className="preview-field">
                      <span className="preview-label">E-posta</span>
                      <span className="preview-value">{contactEmail}</span>
                    </div>

                    <div className="preview-field">
                      <span className="preview-label">Hedef Platformlar</span>
                      <span className="preview-value">{selectedPlatforms.join(', ')}</span>
                    </div>

                    <div className="preview-field">
                      <span className="preview-label">Bütçe Segmenti</span>
                      <span className="preview-value">{estimatedBudget}</span>
                    </div>

                    <div className="preview-field">
                      <span className="preview-label">Proje Tanımı</span>
                      <span className="preview-value preview-description">{projectDescription}</span>
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button type="button" className="preview-send-btn" onClick={handleSendProposal}>
                      <span>Teklifi Bana Gönder</span>
                      <Send size={18} />
                    </button>
                    <button type="button" className="preview-edit-btn" onClick={() => {
                      setStep('form');
                      setTimeout(() => {
                        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 50);
                    }}>
                      <Edit2 size={16} />
                      <span>Bilgileri Düzenle</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'sending' && (
                <motion.div
                  key="proposal-sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sending-state-container"
                >
                  <div className="loader-spinner"></div>
                  <h3>Teklifiniz İletiliyor...</h3>
                  <p>Lütfen bekleyin, talebiniz güvenli sunucuya yükleniyor.</p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="proposal-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-state-container"
                >
                  <div className="success-icon-wrapper">
                    <CheckCircle size={64} color="#10b981" />
                  </div>
                  <h3>Teklifiniz Başarıyla Gönderildi!</h3>
                  <p className="success-description">
                    Talebiniz doğrudan mail kutuma iletildi. En kısa sürede projenizin kapsamını inceleyip size geri dönüş sağlayacağım.
                  </p>
                  
                  <div className="success-copy-box">
                    <strong>Gönderilen Talebin Özeti:</strong>
                    <div className="summary-details">
                      <p><strong>Talep Eden:</strong> {contactName}</p>
                      <p><strong>Platformlar:</strong> {selectedPlatforms.join(', ')}</p>
                      <p><strong>Bütçe:</strong> {estimatedBudget}</p>
                      <p className="summary-desc-text"><strong>Detaylar:</strong> {projectDescription}</p>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className="reset-btn"
                    onClick={() => {
                      setStep('form');
                      setProjectDescription('');
                      setSelectedPlatforms([]);
                      setContactName('');
                      setContactEmail('');
                      setTimeout(() => {
                        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 50);
                    }}
                  >
                    Forma Geri Dön
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Contact Details & Info */}
          <motion.div className="contact-details-panel" variants={itemVariants}>
            <div className="info-card">
              <h4>İletişim & Danışmanlık</h4>
              <p>Projenizle ilgili aklınıza takılan tüm soruları sormak veya teknik danışmanlık almak için doğrudan bana ulaşabilirsiniz.</p>
              
              <div className="contact-channels">
                <a href="mailto:kaiwen.info@gmail.com" className="channel-link">
                  <div className="channel-icon"><Mail size={20} /></div>
                  <div className="channel-info">
                    <span className="channel-label">E-posta Gönder</span>
                    <span className="channel-val">kaiwen.info@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+905422645740" className="channel-link">
                  <div className="channel-icon"><Phone size={20} /></div>
                  <div className="channel-info">
                    <span className="channel-label">Telefon</span>
                    <span className="channel-val">+90 542 264 5740</span>
                  </div>
                </a>

                <div className="channel-link no-click">
                  <div className="channel-icon"><MapPin size={20} /></div>
                  <div className="channel-info">
                    <span className="channel-label">Konum</span>
                    <span className="channel-val">Düzce / Merkez, Türkiye</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faq-mini-card">
              <h4>Süreç Nasıl İşler?</h4>
              <ul className="faq-steps">
                <li>
                  <span className="step-num">1</span>
                  <div className="step-txt">
                    <strong>Gereksinim Analizi:</strong> Gönderdiğiniz detaylar üzerinden projenin kapsamını ve mimarisini planlarım.
                  </div>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <div className="step-txt">
                    <strong>Teklif & Planlama:</strong> İş teslim süresi ve bütçe kırılımını içeren detaylı bir yol haritası sunarım.
                  </div>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <div className="step-txt">
                    <strong>Geliştirme & Canlıya Alma:</strong> Projeyi modüler adımlarla kodlar, test eder ve sorunsuz şekilde teslim ederim.
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
