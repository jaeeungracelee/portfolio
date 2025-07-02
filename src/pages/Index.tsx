
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer - Consistent background */}
      <footer className="bg-gradient-to-br from-purple-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 text-gray-800 dark:text-white py-12 px-4 border-t border-white/20 dark:border-gray-700/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Always open to discussing new opportunities and creative projects.
            </p>
          </div>
          
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              © 2025 Portfolio. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
