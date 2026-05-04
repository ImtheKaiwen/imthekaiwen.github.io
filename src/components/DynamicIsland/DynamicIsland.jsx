import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useDynamicIsland } from '../../context/DynamicIslandContext';
import { Search, Bell, Loader2, X, ArrowLeft, Mail, Bot } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { askAI } from '../../services/aiService';
import pp from '../../assets/pp.jpeg';
import campusMealImg from '../../assets/campusmeal.png';
import visionJournalImg from '../../assets/visionjournal.png';
import './DynamicIsland.css';

// Using constants for stability
const PROJECT_CAMPUS = '/project/campus-meal';
const PROJECT_VISION = '/project/vision-journal';

const GLOBAL_KEYWORDS = [
  { keywords: ['campus', 'meal', 'yemek', 'menü', 'kampüs', 'harita'], path: PROJECT_CAMPUS },
  { keywords: ['vision', 'journal', 'günlük', 'duygu', 'analiz', 'vizyon'], path: PROJECT_VISION },
  { keywords: ['proje', 'uygulama', 'portfolio', 'çalışma'], path: '/projects' },
  { keywords: ['hakkında', 'kim', 'özgeçmiş'], path: '/#about' },
  { keywords: ['iletişim', 'mail', 'ulaş'], path: '#contact' }
];

const LOCAL_MAP = {
  'anasayfa': { action: 'navigate', path: '/' },
  'ana sayfa': { action: 'navigate', path: '/' },
  'home': { action: 'navigate', path: '/' },
  'projects': { action: 'navigate', path: '/projects' },
  'projeler': { action: 'options', answerText: 'Projelerimiz:', options: [{ id: 'campus-meal', label: 'Campus Meal' }, { id: 'vision-journal', label: 'Vision Journal' }] },
  'projelerim': { action: 'options', answerText: 'Projelerimiz:', options: [{ id: 'campus-meal', label: 'Campus Meal' }, { id: 'vision-journal', label: 'Vision Journal' }] },
  'uygulamalar': { action: 'options', answerText: 'Uygulamalarımız:', options: [{ id: 'campus-meal', label: 'Campus Meal' }, { id: 'vision-journal', label: 'Vision Journal' }] },
  'about': { action: 'scroll', target: 'about' },
  'hakkında': { action: 'scroll', target: 'about' },
  'hakkımda': { action: 'scroll', target: 'about' },
  'features': { action: 'scroll', target: 'app-content' },
  'özellikler': { action: 'scroll', target: 'app-content' },
  'contact': { action: 'contact' },
  'iletişim': { action: 'contact' },
  'campus': { action: 'navigate', path: PROJECT_CAMPUS },
  'vision': { action: 'navigate', path: PROJECT_VISION },
  'linkedin': { action: 'options', answerText: 'LinkedIn profilim:', options: [{ id: 'linkedin', label: 'LinkedIn' }] },
  'mail': { action: 'options', answerText: 'E-posta adresim:', options: [{ id: 'mail', label: 'E-posta' }] },
};

export default function DynamicIsland() {
  const { state, reset, showMessage, showSearch, showInteractive } = useDynamicIsland();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isIconSticky, setIsIconSticky] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize global navigation lock
  if (typeof window !== 'undefined' && window.isNavigating === undefined) {
    window.isNavigating = false;
  }

  const isProjectPage = location.pathname.startsWith('/project/');
  const projectId = isProjectPage ? location.pathname.split('/')[2] : null;

  // Track the logo position for the "Sticky Icon" effect
  useEffect(() => {
    if (!isProjectPage) {
      setIsIconSticky(false);
      document.body.classList.remove('island-icon-stuck');
      return;
    }

    const checkLogo = () => {
      const logo = document.querySelector('.project-detail-wrapper .logo');
      if (logo) {
        const rect = logo.getBoundingClientRect();
        const isStuck = rect.top < 60;
        setIsIconSticky(isStuck);
        
        // Direct manipulation for 100% reliability
        logo.style.opacity = isStuck ? '0' : '1';
        logo.style.visibility = isStuck ? 'hidden' : 'visible';
        logo.style.transform = isStuck ? 'scale(0.8)' : 'scale(1)';
        logo.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    };

    window.addEventListener('scroll', checkLogo);
    checkLogo(); // Initial check
    return () => {
      window.removeEventListener('scroll', checkLogo);
      document.body.classList.remove('island-icon-stuck');
    };
  }, [isProjectPage, location.pathname]);

  // Derive links directly from location to avoid transition delay
  const navLinks = React.useMemo(() => {
    if (isProjectPage && projectId) {
      return [
        { path: `/project/${projectId}#about`, label: 'About' },
        { path: `/project/${projectId}#app-content`, label: 'Features' },
        { path: `/project/${projectId}#contact`, label: 'Contact' }
      ];
    }
    return [
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' }
    ];
  }, [isProjectPage, projectId]);

  // Use a callback ref for more reliable auto-focus
  const inputRefCallback = useCallback((node) => {
    if (node) {
      // Focus with more delay for mobile keyboard reliability
      setTimeout(() => node.focus(), 250);
    }
  }, []);

  const handleReset = useCallback(() => {
    setSearchQuery('');
    reset();
  }, [reset]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Global Escape to close everything
      if (e.key === 'Escape' && state.mode !== 'default') {
        handleReset();
      }

      // Global Enter to open search
      if (e.key === 'Enter') {
        const activeNode = document.activeElement?.nodeName;
        // If not in search mode and not typing in another input, open search
        if (state.mode !== 'search' && activeNode !== 'INPUT' && activeNode !== 'TEXTAREA') {
          e.preventDefault();
          setSearchQuery(''); // Clear previous query
          showSearch();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.mode, showSearch, handleReset]);

  const executeAction = useCallback((actionData) => {
    const scrollWithOffset = (targetId) => {
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(targetId);
      if (!el) return;
      const offset = 110;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    };

    if (actionData.action === 'navigate') {
      const cleanPath = actionData.path.split('#')[0];
      navigate(cleanPath);
      handleReset();
    }
    else if (actionData.action === 'contact') {
      showInteractive({ 
        answerText: "Bana buradan ulaşabilirsiniz:", 
        options: [
          { id: 'mail', label: 'E-posta Gönder' }, 
          { id: 'linkedin', label: 'LinkedIn' }
        ] 
      });
    }
    else if (actionData.action === 'scroll') {
      scrollWithOffset(actionData.target);
      handleReset();
    }
    else if (actionData.action === 'options') {
      showInteractive(actionData);
    }
  }, [navigate, handleReset, showInteractive]);

  const handleNavLinkClick = useCallback((e, link) => {
    if (link.path.includes('#')) {
      const parts = link.path.split('#');
      const linkPath = parts[0];
      const hash = parts[1];
      
      if (location.pathname === linkPath) {
        e.preventDefault();
        window.isNavigating = true; // Lock ScrollSpy
        navigate(`#${hash}`, { replace: true });
        
        // Safety unlock
        setTimeout(() => { window.isNavigating = false; }, 1200);
      }
    }
  }, [location.pathname, navigate]);

  const highlightElement = useCallback((el, searchTerm) => {
    if (!el || !searchTerm) return;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    
    // Safety check: Don't highlight if the element contains other complex elements
    // or if we've already highlighted it.
    if (el.querySelector('.word-highlight')) return;

    // Recursive function to find and highlight only text nodes
    const processNode = (node) => {
      if (node.nodeType === 3) { // Text node
        const matches = node.nodeValue.match(regex);
        if (matches) {
          const span = document.createElement('span');
          span.innerHTML = node.nodeValue.replace(regex, '<span class="word-highlight">$1</span>');
          node.parentNode.replaceChild(span, node);
          return true;
        }
      } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE', 'SVG'].includes(node.nodeName)) {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (processNode(node.childNodes[i])) return true; // Only highlight first match
        }
      }
      return false;
    };

    const originalContent = el.innerHTML;
    const found = processNode(el);

    if (found) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        el.innerHTML = originalContent; // Restore to original to clean up the temporary spans
      }, 2500);
    }
  }, []);

  // Global Search Param Handler
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');
    if (searchTerm) {
      setTimeout(() => {
        const pageElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, b, strong, li, a, button');
        for (const el of pageElements) {
          if (el.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            highlightElement(el, searchTerm);
            break;
          }
        }
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
      }, 500);
    }
  }, [location.pathname, highlightElement]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const q = query.toLowerCase();
    
    // --- 1. PRIORITY: CRITICAL COMMANDS & GLOBAL REDIRECTS ---
    const isHome = q === 'ev' || q === 'ana' || q === 'baş' || q.includes('home') || q.includes('ana sayfa');
    if (isHome) { 
      handleReset();
      executeAction(LOCAL_MAP['anasayfa']); 
      return; 
    }

    // Check for other pages keywords
    const globalMatch = GLOBAL_KEYWORDS.find(g => g.keywords.some(k => q.includes(k)));
    if (globalMatch && !location.pathname.includes(globalMatch.path.split('#')[0])) {
      setSearchQuery('');
      navigate(`${globalMatch.path}${globalMatch.path.includes('?') ? '&' : '?'}search=${encodeURIComponent(query)}`);
      return;
    }

    if (q.includes('iletişim') || q.includes('contact') || q.includes('ulaş') || q.includes('yaz')) {
      setSearchQuery('');
      executeAction({ action: 'contact' });
      return;
    }

    // --- 2. PRIORITY: IN-PAGE SEARCH ---
    if (q.length > 2) {
      const pageElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, b, strong, li, a, button');
      for (const el of pageElements) {
        if (el.closest('.dynamic-island') || el.children.length > 10) continue;
        if (el.textContent.toLowerCase().includes(q)) {
          setSearchQuery('');
          highlightElement(el, query);
          showMessage(`"${query}" bulundu.`, <Search size={16} />, 1500);
          return;
        }
      }
    }

    // --- 3. PRIORITY: AI FALLBACK ---
    if (isAiLoading) return;
    setSearchQuery('');
    setIsAiLoading(true);
    showMessage("Düşünüyor...", <div className="custom-spinner" />, 0);

    // Extract page content (excluding the island itself)
    const contentEl = document.querySelector('main') || document.querySelector('.app-container') || document.body;
    const pageContent = Array.from(contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, a, button, span'))
      .map(el => el.innerText)
      .join(' ')
      .substring(0, 3000);

    const result = await askAI(query, location.pathname, pageContent);
    setIsAiLoading(false);

    let finalAction = result.actionData;
    
    // Smart keyword detection if AI forgot action
    if (!finalAction) {
      const text = result.text.toLowerCase();
      if (text.includes('içerik') || text.includes('özellik')) finalAction = { action: 'scroll', target: 'app-content' };
      else if (text.includes('hakkında') || text.includes('kim')) finalAction = { action: 'scroll', target: 'about' };
      else if (text.includes('iletişim')) finalAction = { action: 'contact' };
    }

    if (finalAction) {
      // Direct execute for scroll/navigate/contact to be proactive
      if (finalAction.action === 'scroll' || finalAction.action === 'contact' || finalAction.action === 'navigate') {
        executeAction(finalAction);
        if (result.text) showMessage(result.text, null, 4000);
      } else if (finalAction.action === 'options') {
        showInteractive(finalAction);
      }
    } else {
      showInteractive({ answerText: result.text });
    }
  };

  const handleIslandAction = (opt) => {
    const id = opt.id?.toLowerCase() || '';
    
    // 1. Social & External Actions
    if (id === 'mail' || id.includes('posta')) { window.location.href = 'mailto:kaiwen.info@gmail.com'; handleReset(); return; }
    if (id === 'linkedin') { window.open('https://www.linkedin.com/in/kerem-keskino%C4%9Flu-977387299/', '_blank'); handleReset(); return; }
    
    // 2. Navigation Actions
    if (opt.action === 'navigate' || opt.path) {
      navigate(opt.path);
      handleReset();
      return;
    }

    // 3. Scroll Actions
    if (opt.action === 'scroll' || opt.target || id === 'about' || id.includes('hakkında')) {
      const target = opt.target || (id.includes('hakkında') ? 'about' : id);
      executeAction({ action: 'scroll', target });
      return;
    }

    // 4. Contextual Logic (Projects, Contact)
    if (id.includes('proje') || id.includes('keşfet')) { navigate('/projects'); handleReset(); return; }
    if (id.includes('iletişim') || id === 'contact') {
      executeAction({ action: 'contact' });
      return;
    }

    // 5. Project Specific
    if (id === 'campus-meal') { navigate(PROJECT_CAMPUS); handleReset(); return; }
    if (id === 'vision-journal') { navigate(PROJECT_VISION); handleReset(); return; }

    handleReset();
  };

  return (
    <div className="dynamic-island-container">
      <motion.div 
        layout
        className={`dynamic-island ${state.mode || 'default'}`} 
        transition={{ type: "spring", stiffness: 600, damping: 48, mass: 0.8 }}
      >
        <AnimatePresence mode="popLayout">
          {(state.mode === 'default' || !state.mode) && (
            <motion.div 
              key="default" 
              className="island-state-wrapper island-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            >
              <div className="island-left-group">
                {isProjectPage ? (
                  <div className="island-back-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} color="white" />
                  </div>
                ) : (
                  <img src={pp} className="island-avatar" alt="Profile" />
                )}
                
                {isProjectPage && isIconSticky && (
                  <motion.img 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    src={
                      projectId === 'campus-meal' ? campusMealImg : 
                      projectId === 'vision-journal-desktop' ? '/vision_journal_desktop.jpg' : 
                      visionJournalImg
                    } 
                    className="island-sticky-icon" 
                    alt="Project Icon" 
                  />
                )}
              </div>

              <div className="nav-links">
                {navLinks.map((link, index) => {
                  const linkPath = link.path.split('#')[0];
                  const linkHash = link.path.split('#')[1] ? '#' + link.path.split('#')[1] : '';
                  const normalizedHash = location.hash || (isProjectPage ? '#about' : '');
                  const isActive = location.pathname === linkPath && (normalizedHash === linkHash || (isProjectPage && !location.hash && index === 0));

                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={(e) => handleNavLinkClick(e, link)}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="active-indicator"
                          transition={{
                            type: "spring",
                            stiffness: 2500,
                            damping: 100,
                            mass: 0.4
                          }}
                        />
                      )}
                      <span className="link-text">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
              <div className="island-search-trigger" onClick={showSearch}><Search size={18} color="white" /></div>
            </motion.div>
          )}

          {state.mode === 'search' && (
            <motion.form key="search" className="island-state-wrapper island-search" onSubmit={handleSearch} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
              {isAiLoading ? <div className="custom-spinner" /> : <Search size={18} className="search-icon" />}
              <input
                ref={inputRefCallback}
                type="text"
                placeholder="AI ile konuşun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                disabled={isAiLoading}
              />
              <X size={18} className="close-icon" onClick={handleReset} />
            </motion.form>
          )}

          {state.mode === 'message' && (
            <motion.div key="message" className="island-state-wrapper island-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="message-content"><span className="message-text">{state.message}</span></div>
            </motion.div>
          )}

          {state.mode === 'interactive' && (
            <motion.div key="interactive" className="island-state-wrapper island-interactive" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}>
              <button className="island-close-btn absolute" onClick={handleReset}><X size={18} /></button>
              
              <div className="ai-response-container">
                <p className="ai-response-text">{state.interactiveData?.answerText}</p>
              </div>

              {state.interactiveData?.options && (
                <div className="interactive-options">
                  {state.interactiveData.options.map((opt) => (
                    <button key={opt.id} className="interactive-option-btn" onClick={() => handleIslandAction(opt)}>
                      {opt.id === 'campus-meal' && <img src={campusMealImg} alt="" className="opt-icon" />}
                      {opt.id === 'vision-journal' && <img src={visionJournalImg} alt="" className="opt-icon" />}
                      {(opt.id === 'mail' || opt.id.includes('posta')) && <Mail size={18} />}
                      {opt.id === 'linkedin' && <i className="fab fa-linkedin"></i>}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
