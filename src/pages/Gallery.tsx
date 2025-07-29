
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FloatingNav from '@/components/FloatingNav';
import ThemeToggle from '@/components/ThemeToggle';
import { useGalleryImages } from '@/hooks/useGalleryImages';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const { data: galleryImages = [], isLoading, error } = useGalleryImages();

  const categories = ['all', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const openLightbox = (imageId: string) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage 
    ? filteredImages.find(img => img.id === selectedImage)
    : null;

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading gallery</h2>
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Camera className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                graceful captures
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              a curated collection of my photography work, capturing moments and stories through the lens.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={`capitalize ${filter === category ? 
                  "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" : 
                  "hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20"
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading gallery...</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!isLoading && (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                  >
                    <Card 
                      className="group cursor-pointer overflow-hidden border-purple-500/20 hover:border-cyan-500/50 transition-all duration-300"
                      onClick={() => openLightbox(image.id)}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={image.image_url}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                          <p className="text-sm text-gray-200">{image.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImageData.image_url}
                alt={selectedImageData.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-2xl font-bold mb-2">{selectedImageData.title}</h3>
                <p className="text-gray-200">{selectedImageData.description}</p>
              </div>

              {/* Close Button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={closeLightbox}
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
