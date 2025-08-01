
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Tag, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import ThemeToggle from '@/components/ThemeToggle';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: blogPosts = [], isLoading, error } = useBlogPosts();

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content: string | null) => {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading blog</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav activeSection="" scrollProgress={0} />
      <ThemeToggle />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent pb-1">
                graceful blog
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              thoughts, insights, and experiences from my journey!
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="search articles, tags, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${selectedCategory === category ? 
                    "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" : 
                    "hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading articles...</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!isLoading && (
            <div className="space-y-8">
              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">no articles found</h3>
                  <p className="text-muted-foreground">try adjusting your search or filter criteria.</p>
                </motion.div>
              ) : (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-500 border-purple-500/20 hover:border-cyan-500/50 overflow-hidden">
                      <Link to={`/blog/${post.id}`} className="block">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            {post.image_url && (
                              <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                          </div>
                          <div className="md:w-2/3 p-6">
                            <CardHeader className="px-0 pt-0">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(post.created_at)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {estimateReadingTime(post.content)} min read
                                </div>
                                <div className="flex items-center gap-1">
                                  <Tag className="w-4 h-4" />
                                  <span className="capitalize">{post.category}</span>
                                </div>
                              </div>
                              <CardTitle className="text-2xl mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                                {post.title}
                              </CardTitle>
                              <CardDescription className="text-base leading-relaxed">
                                {post.excerpt}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="px-0 pb-0">
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags && post.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center text-purple-400 hover:text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                                <span>Read More</span>
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
