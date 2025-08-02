
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies?: string[];
  logo?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-cyan-400 to-blue-400" />
      
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative flex items-start mb-12 last:mb-0"
        >
          {/* Timeline dot */}
          <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full border-4 border-background shadow-lg" />
          
          {/* Content */}
          <div className="ml-16 flex-1">
            <div className="bg-card border border-purple-500/20 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-start gap-4">
                  {item.logo && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-purple-500/20 bg-background p-2 flex-shrink-0">
                      <img 
                        src={item.logo} 
                        alt={`${item.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 text-left">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{item.company}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:text-right">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{item.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed text-left">
                {item.description}
              </p>
              
              {item.technologies && (
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-foreground border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
