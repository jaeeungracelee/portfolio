
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloatingNav from '@/components/FloatingNav';
import ThemeToggle from '@/components/ThemeToggle';
import Timeline from '@/components/Timeline';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Only update if scroll has changed significantly
          if (Math.abs(currentScrollY - lastScrollY) > 10) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (currentScrollY / totalHeight) * 100;
            setScrollProgress(progress);

            // Update active section based on scroll position with debouncing
            const sections = ['hero', 'about', 'projects', 'contact'];
            const sectionElements = sections.map(id => document.getElementById(id));
            
            // Check if we're near the bottom of the page (contact section)
            const scrollPosition = currentScrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            let newActiveSection = activeSection;
            
            if (scrollPosition >= documentHeight - 50) {
              newActiveSection = 'contact';
            } else {
              // Normal section detection for other sections
              for (let i = sectionElements.length - 1; i >= 0; i--) {
                const element = sectionElements[i];
                if (element && element.offsetTop <= currentScrollY + 150) {
                  newActiveSection = sections[i];
                  break;
                }
              }
            }
            
            // Only update if section actually changed
            if (newActiveSection !== activeSection) {
              setActiveSection(newActiveSection);
            }
            
            setLastScrollY(currentScrollY);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, lastScrollY]);

  const projects = [
    {
      id: 1,
      title: "NaverScraper",
      description: "A modern web application built with Next.js and TypeScript",
      image: "/placeholder.svg",
      technologies: ["React", "TypeScript", "Tailwind"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "web"
    },
    {
      id: 2,
      title: "EyeSpeak",
      description: "Meta Llama Hackathon Winner",
      image: "/placeholder.svg",
      technologies: ["Next.js", "Three.js", "CSS"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "mobile"
    },
    {
      id: 3,
      title: "InterviewAid",
      description: "Full-stack application with real-time features",
      image: "/placeholder.svg",
      technologies: ["Node.js", "React", "Socket.io"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "fullstack"
    }
  ];

  const timelineItems = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2021 - Present',
      description: 'Led development of scalable web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers. Implemented CI/CD pipelines and improved deployment efficiency by 40%.',
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker']
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Digital Innovations Inc',
      location: 'Remote',
      period: '2019 - 2021',
      description: 'Developed responsive web applications with modern React ecosystem. Collaborated with design teams to implement pixel-perfect UI components. Optimized application performance achieving 95+ lighthouse scores.',
      technologies: ['React', 'JavaScript', 'CSS3', 'Webpack', 'Jest', 'Figma']
    },
    {
      id: '3',
      title: 'Junior Web Developer',
      company: 'StartupHub',
      location: 'Berkeley, CA',
      period: '2018 - 2019',
      description: 'Built interactive web interfaces for early-stage startups. Learned modern development practices and agile methodologies. Contributed to open-source projects and participated in hackathons.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'Git']
    },
    {
      id: '4',
      title: 'Computer Science Degree',
      company: 'UC Berkeley',
      location: 'Berkeley, CA',
      period: '2014 - 2018',
      description: 'Bachelor of Science in Computer Science with focus on web technologies and software engineering. Participated in coding competitions and tech club activities. Graduated Magna Cum Laude.',
      technologies: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms', 'Database Systems']
    }
  ];

  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav activeSection={activeSection} scrollProgress={scrollProgress} />
      <ThemeToggle />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-10 px-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            grace lee
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            full stack developer & creative designer
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              see my work
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              about me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="text-left">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  i'm a passionate full-stack developer with an eye for design and user experience. 
                  with over 3 years of experience, i specialize in creating modern, responsive web applications 
                  that not only look great but perform exceptionally well.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My expertise spans across frontend technologies like React, TypeScript, and Three.js, 
                  as well as backend development with Node.js and various databases. I love bringing 
                  creative ideas to life through code.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'TypeScript', 'Node.js', 'Three.js', 'Python', 'PostgreSQL'].map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-sm font-medium border border-purple-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-purple-400 via-cyan-400 to-blue-400 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <div className="text-6xl">👋</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Timeline Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                My Journey
              </h3>
              <Timeline items={timelineItems} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              my projects
            </h2>
            <div className="flex justify-center gap-4 mb-12">
              {['all', 'web', 'mobile', 'fullstack'].map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className={filter === category ? 
                    "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" : 
                    "hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 border-purple-500/20 hover:border-cyan-500/50 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="p-2">
                          <Github className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              contact me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              i'm always open to discussing new opportunities and interesting projects. 
              let's create something cool together!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-purple-500/20">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>contact information</CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span>jaeeungracelee@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span>+1 (236) 518-6846</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>toronto, ON</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-purple-500/20">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name">name</Label>
                    <Input id="name" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">email</Label>
                    <Input id="email" type="email" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="message">message</Label>
                    <textarea 
                      id="message"
                      rows={4}
                      className="w-full mt-2 px-3 py-2 border border-input bg-background rounded-md resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  >
                    send message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
