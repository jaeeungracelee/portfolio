import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from './ThreeScene';
import './home.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  useEffect(() => {
    const handleThemeChange = () => {
      const isDarkMode = document.body.classList.contains('dark-mode');
      document.body.style.backgroundColor = isDarkMode ? '#282c34' : '#ffffff';
      document.body.style.color = isDarkMode ? '#ffffff' : '#000000';
    };
    handleThemeChange(); // set initial theme
    document.body.addEventListener('classChange', handleThemeChange);

    return () => {
      document.body.removeEventListener('classChange', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const event = new Event('classChange');
    document.body.dispatchEvent(event);
  }, [darkMode]);

  return (
    <div className="home">
      <button className="toggle-button" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <nav className="navigation">
        <Link to="/about">About</Link>
        <Link to="/storyboard">Storyboard</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="three-container">
        <ThreeScene />
      </div>
      <header className="home-header">
        <h1>welcome to my portfolio</h1>
        <p>hi, i'm grace and i'm learning how to build a website</p>
      </header>
    </div>
  );
};

export default Home;
