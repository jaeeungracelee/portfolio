
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      if (location.pathname === '/') {
        const sections = ['hero', 'about', 'projects', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        setActiveSection(current || '');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', href: '/', section: 'hero' },
    { name: 'About', href: '/#about', section: 'about' },
    { name: 'Projects', href: '/#projects', section: 'projects' },
    { name: 'Contact', href: '/#contact', section: 'contact' },
    { name: 'Blog', href: '/blog', section: 'blog' },
    { name: 'Gallery', href: '/gallery', section: 'gallery' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (item: any) => {
    if (location.pathname === '/blog' && item.section === 'blog') return true;
    if (location.pathname === '/gallery' && item.section === 'gallery') return true;
    if (location.pathname === '/' && activeSection === item.section) return true;
    return false;
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/10 dark:bg-black/10 backdrop-blur-md' : 'bg-transparent'
      } rounded-full px-6 py-3 border border-white/20 dark:border-gray-800/20`}>
        <div className="flex items-center space-x-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  if (item.href.includes('#')) {
                    const sectionId = item.href.split('#')[1];
                    if (sectionId) scrollToSection(sectionId);
                  }
                }}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isActive(item)
                    ? 'text-purple-400 dark:text-cyan-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-400 dark:hover:text-cyan-400'
                }`}
              >
                {item.name}
                {isActive(item) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 hover:scale-110"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/10 dark:bg-black/10 hover:scale-110 transition-transform duration-200"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="fixed top-20 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (item.href.includes('#')) {
                    const sectionId = item.href.split('#')[1];
                    if (sectionId) scrollToSection(sectionId);
                  }
                }}
                className="block py-3 text-gray-700 dark:text-gray-300 hover:text-purple-400 dark:hover:text-cyan-400 transition-colors duration-200 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 transition-all duration-200"
          style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
        />
      </div>
    </>
  );
};

export default Navigation;
