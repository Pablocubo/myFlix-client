import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('day'); // Default theme is 'day'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'day' ? 'night' : 'day'));
  };

  // Effect to apply body class based on the current theme
  useEffect(() => {
    document.body.className = theme;
    document.body.style.transition = 'background-color 0.3s, color 0.3s';
    if (theme === 'day') {
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#000000';
    } else {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#FFFFFF';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
