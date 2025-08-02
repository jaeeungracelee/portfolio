
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
      title: "EyeSpeak",
      description: "Meta Llama Hackathon Winner - A tool that enables users to communicate solely with their eyes, leveraging AI-powered sentence generation with llama3.2-vision:90b for intuitive, context-aware autocompletion.",
      image: "/placeholder.svg",
      technologies: ["Vite", "Webgazer.js", "Llama 3.2"],
      github: "https://github.com",
      demo: "https://cerebralvalley.pixieset.com/torontohackathon/demovideoswinners/",
      category: "ai"
    },
    {
      id: 2,
      title: "InterviewAId",
      description: "CalHacks 2024 - Built an AI-powered platform for simulating voice-to-voice technical interviews with real-time feedback using FastAPI and Socket.IO. Managed data storage in AWS S3 with OpenAI Whisper for audio transcription.",
      image: "/placeholder.svg",
      technologies: ["Next.js", "FastAPI", "Socket.IO", "Docker", "hume.AI", "LMNT"],
      github: "https://github.com/jaeeungracelee/InterviewAId",
      demo: "https://github.com/jaeeungracelee/InterviewAId",
      category: "fullstack"
    },
    {
      id: 3,
      title: "Inter-University Big Data Challenge 2024",
      description: "Developed a random forest classifier using NLTK and Kaggle Datasets to scan & analyze text for sentiment ratings based on social media usage patterns. Used BeautifulSoup4 to web scrape and Reddit API and Twitter API to gather data.",
      image: "/placeholder.svg",
      technologies: ["Python", "NLTK", "BeautifulSoup4", "Reddit API", "Twitter API"],
      github: "https://github.com",
      demo: "https://sentiment-scanner.vercel.app/",
      category: "data"
    },
    {
      id: 4,
      title: "SmileQuest",
      description: "StormHacks 2024 - Built a social media app promoting mental wellness using Node, Express, and Firebase DB. Developed Smiley, an interactive virtual friend with the ChatGPT API, engineered to stimulate supportive conversations.",
      image: "/placeholder.svg",
      technologies: ["React Native", "TypeScript", "Node", "Express", "Firebase", "ChatGPT API"],
      github: "https://github.com/jaeeungracelee/SmileQuest",
      demo: "https://github.com/jaeeungracelee/SmileQuest",
      category: "mobile"
    },
    {
      id: 5,
      title: "NaverScraper",
      description: "A Next.js web application that scrapes Naver blogs and news articles based on keywords and date ranges, providing AI-powered sentiment analysis & data export capabilities for market trend research.",
      image: "/placeholder.svg",
      technologies: ["Next.js", "Web Scraping", "AI", "Sentiment Analysis", "Data Export"],
      github: "https://github.com/jaeeungracelee/NaverScraper",
      demo: "https://github.com/jaeeungracelee/NaverScraper",
      category: "fullstack"
    }
  ];

  const timelineItems = [
    {
      id: '1',
      title: 'Software Dev Engineer Intern',
      company: 'Amazon Web Services (AWS)',
      location: 'Toronto, ON',
      period: 'May 2025 - Present',
      description: 'Contributing to the open-source AWS labs MCP repository by designing and developing a production-ready server to enable LLM-powered control plane operations across all Amazon RDS database engines.',
      technologies: ['Python', 'AWS', 'RDS', 'LLM', 'Open Source'],
      logo: 'https://www.google.com/s2/favicons?sz=64&domain=aws.amazon.com'
    },
    {
      id: '2',
      title: 'Digital & Tech Intern',
      company: 'GSK (Formerly GlaxoSmithKline)',
      location: 'Seoul, Korea',
      period: 'Jan 2025 - Apr 2025',
      description: 'Leveraged Databricks to map 78,000+ hospitals to 25,000+ pharmacies, enabling precise sales data tracking. Built a social listening platform on PowerBI using Naver API and pytrends to benchmark competing vaccines and support pre-launch activities for Arexvy.',
      technologies: ['Databricks', 'PowerBI', 'Python', 'Naver API', 'pytrends'],
      logo: 'https://www.google.com/s2/favicons?sz=64&domain=gsk.com'
    },
    {
      id: '3',
      title: 'Machine Learning Undergraduate Researcher',
      company: 'WAT.ai x Hamming.ai (YC S24)',
      location: 'Waterloo, ON',
      period: 'Sept 2024 - Present',
      description: 'Developed LLM-based self-correction systems and established benchmarks to evaluate their efficiency in detecting and resolving bugs in extensive codebases. Achieved No.1 (MapCoder) and No.11 (Monte Carlo Tree Search) on the MBPP Leaderboard.',
      technologies: ['Python', 'LLM', 'Machine Learning', 'Monte Carlo Tree Search', 'MBPP'],
      logo: 'https://www.google.com/s2/favicons?sz=64&domain=hamming.ai'
    },
    {
      id: '4',
      title: 'Business Analyst Intern',
      company: 'Aquilini Investment Group',
      location: 'Vancouver, BC',
      period: 'May 2024 - Aug 2024',
      description: 'Spearheaded a project consolidating 6000+ accounts using SQL, pandas, and Microsoft\'s SQL Server Reporting Services. Developed a trained AI model utilizing OCR and regex to automate invoice processing, reducing 400+ manual PDF data entries per day with 96%+ accuracy.',
      technologies: ['SQL', 'Python', 'pandas', 'PowerApps', 'OCR', 'AI/ML'],
      logo: 'https://www.google.com/s2/favicons?sz=64&domain=aquilini.com'
    },
    {
      id: '5',
      title: 'Bachelor of Computer Science & Business Administration',
      company: 'University of Waterloo & Wilfrid Laurier University',
      location: 'Waterloo, ON',
      period: '2021 - Present',
      description: 'Double Degree program combining Computer Science and Business Administration. Active in Computer Science Club as Web Designer, 3x Hackathon Winner, Math Faculty Orientation Team Head & MC. Coursework includes Object-Oriented Programming, Algorithm Design, and Software Development.',
      technologies: ['C++', 'Python', 'Java', 'Web Development', 'Algorithms', 'Data Structures'],
      logo: 'https://www.google.com/s2/favicons?sz=64&domain=uwaterloo.ca'
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
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent pb-2"
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
                  my expertise spans across frontend technologies like react, next.js, and typescript, 
                  as well as backend development with node.js and various databases. i love bringing 
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
                    <img 
                      src="/favicon.ico" 
                      alt="Grace Lee" 
                      className="w-52 h-52 object-contain"
                    />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent pb-1">
              my projects
            </h2>
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {['all', 'ai', 'fullstack', 'data', 'mobile', 'creative'].map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className={filter === category ? 
                    "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" : 
                    "hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20"
                  }
                >
                  {category.charAt(0) + category.slice(1)}
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
