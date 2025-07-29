
import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Camera, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface FloatingNavProps {
  activeSection: string;
  scrollProgress: number;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection, scrollProgress }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { id: 'hero', label: 'home', icon: Home, href: '#hero' },
    { id: 'about', label: 'about', icon: User, href: '#about' },
    { id: 'projects', label: 'projects', icon: Briefcase, href: '#projects' },
    { id: 'contact', label: 'contact', icon: Mail, href: '#contact' },
  ];

  const externalNavItems = [
    { label: 'captures', icon: Camera, href: '/gallery' },
    { label: 'blog', icon: BookOpen, href: '/blog' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>

      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed top-4 left-0 right-0 z-40 flex justify-center"
      >
        <div className={`flex items-center ${isMobile ? 'gap-1 px-3 py-2' : 'gap-2 px-6 py-3'} bg-background/80 backdrop-blur-md border border-purple-500/20 rounded-full shadow-lg`}>
          {/* Home link for non-home pages */}
          {location.pathname !== '/' && (
            <Link to="/">
              <motion.div
                className={`relative ${isMobile ? 'px-2 py-1.5' : 'px-4 py-2'} rounded-full transition-all duration-300 text-muted-foreground hover:text-foreground`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  {!isMobile && <span className="text-sm font-medium">Home</span>}
                </div>
              </motion.div>
            </Link>
          )}

          {/* Main sections (only show on home page) */}
          {location.pathname === '/' && navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative ${isMobile ? 'px-2 py-1.5' : 'px-4 py-2'} rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {!isMobile && <span className="text-sm font-medium">{item.label}</span>}
                </div>
              </motion.button>
            );
          })}

          {/* Separator */}
          {((location.pathname === '/' && navItems.length > 0) || location.pathname !== '/') && (
            <div className={`${isMobile ? 'w-px h-4 mx-1' : 'w-px h-6 mx-2'} bg-border`} />
          )}

          {/* External pages */}
          {externalNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className={`relative ${isMobile ? 'px-2 py-1.5' : 'px-4 py-2'} rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                  )}
                  <div className="relative flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {!isMobile && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default FloatingNav;
