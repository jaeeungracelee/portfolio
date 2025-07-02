
import React from 'react';
import { Code, Palette, Rocket, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AboutSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();

  const skills = [
    { icon: Code, title: 'Development', desc: 'Full-stack web development with modern technologies' },
    { icon: Palette, title: 'Design', desc: 'UI/UX design with focus on user experience' },
    { icon: Rocket, title: 'Performance', desc: 'Optimized solutions for maximum efficiency' },
    { icon: Users, title: 'Collaboration', desc: 'Team player with excellent communication skills' }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer who loves creating beautiful, functional, and user-friendly digital experiences. 
            With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design.
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`grid md:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 delay-200 ${
            contentVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          {/* Profile Image Placeholder - Purpose: Personal connection */}
          <div className="relative group">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-700/40 backdrop-blur-sm p-8 flex items-center justify-center hover:scale-105 transition-transform duration-500 border border-white/20 dark:border-gray-700/20">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">👨‍💻</div>
            </div>
          </div>

          {/* About Text */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              Creating Digital Excellence
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              With over 3 years of experience in web development, I specialize in creating 
              responsive, accessible, and performant applications. My journey began with a 
              curiosity for how things work, and has evolved into a passion for crafting 
              digital solutions that make a difference.
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing 
              to open source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>

        {/* Skills Grid - Purpose: Highlight core competencies */}
        <div 
          ref={skillsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-400 ${
            skillsVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          {skills.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className={`p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-gray-800/80`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{title}</h4>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
