import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const DynamicIslandContext = createContext();

export const useDynamicIsland = () => useContext(DynamicIslandContext);

export const DynamicIslandProvider = ({ children }) => {
  const [state, setState] = useState({
    mode: 'default', // 'default', 'message', 'search', 'interactive'
    message: null,
    icon: null,
    interactiveData: null, // { answerText: string, options: array }
  });

  const [navLinks, setNavLinks] = useState([
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' }
  ]);

  const [leftAction, setLeftAction] = useState('logo'); // 'logo' or 'back'

  const timeoutRef = useRef(null);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState({ mode: 'default', message: null, icon: null, interactiveData: null });
  }, []);

  const showMessage = useCallback((message, icon = null, duration = 3000) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState({ mode: 'message', message, icon });
    
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        reset();
      }, duration);
    }
  }, [reset]);

  const showSearch = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState({ mode: 'search', message: null, icon: null, interactiveData: null });
  }, []);

  const showInteractive = useCallback((data) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState({ mode: 'interactive', message: null, icon: null, interactiveData: data });
  }, []);

  return (
    <DynamicIslandContext.Provider value={{ 
      state, 
      showMessage, 
      showSearch, 
      showInteractive,
      reset,
      navLinks,
      setNavLinks,
      leftAction,
      setLeftAction
    }}>
      {children}
    </DynamicIslandContext.Provider>
  );
};
