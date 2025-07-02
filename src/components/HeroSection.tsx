
import React, { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 transition-colors duration-300">
      {/* Purpose-driven Background Elements - Guide user's eye to content */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl transform transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl transform transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            right: '15%',
            top: '30%'
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Content - Consistent Typography Scale */}
        <div className={`mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Grace Lee
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Full Stack Developer & Designer
          </p>
        </div>

        {/* Social Links - Purpose: Quick contact access */}
        <div className={`flex justify-center space-x-6 mb-12 transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#contact', label: 'Contact' }
          ].map(({ icon: Icon, href, label }, index) => (
            <a
              key={label}
              href={href}
              className="p-4 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 hover:scale-125 group"
              aria-label={label}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-cyan-400 transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator - Purpose: Guide user to explore content */}
        <button
          onClick={scrollToAbout}
          className={`animate-bounce p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 hover:scale-110 group ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          <ArrowDown className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-cyan-400 transition-colors duration-300" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
