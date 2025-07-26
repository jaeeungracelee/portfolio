
-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'Grace',
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for gallery_images (public read access)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images" 
  ON public.gallery_images 
  FOR SELECT 
  USING (true);

-- Add RLS policies for blog_posts (public read access)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = true);

-- Insert sample gallery images
INSERT INTO public.gallery_images (title, description, image_url, category) VALUES
('Nature Photography', 'Beautiful landscape captured at sunset', '/placeholder.svg', 'nature'),
('Urban Architecture', 'Modern building design', '/placeholder.svg', 'architecture'),
('Portrait Session', 'Creative portrait photography', '/placeholder.svg', 'portrait'),
('Street Art', 'Vibrant street art documentation', '/placeholder.svg', 'street'),
('Botanical Study', 'Close-up botanical photography', '/placeholder.svg', 'nature'),
('City Lights', 'Night photography in the city', '/placeholder.svg', 'urban'),
('Abstract Composition', 'Creative abstract photography', '/placeholder.svg', 'abstract'),
('Wedding Moments', 'Capturing special moments', '/placeholder.svg', 'portrait');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, excerpt, content, category, tags, image_url) VALUES
('Building Modern Web Applications with React and TypeScript', 'Exploring the power of TypeScript in React development and best practices for scalable applications.', 'Full article content would go here...', 'development', '{"React","TypeScript","Web Development"}', '/placeholder.svg'),
('The Art of 3D Web Experiences with Three.js', 'Creating immersive 3D experiences on the web using Three.js and modern browser capabilities.', 'Full article content would go here...', 'design', '{"Three.js","3D","WebGL"}', '/placeholder.svg'),
('My Journey into Full Stack Development', 'Reflecting on my path from frontend to full stack development and lessons learned along the way.', 'Full article content would go here...', 'personal', '{"Career","Learning","Development"}', '/placeholder.svg'),
('Optimizing Performance in Modern Web Applications', 'Techniques and strategies for building fast, responsive web applications that users love.', 'Full article content would go here...', 'development', '{"Performance","Optimization","Web Vitals"}', '/placeholder.svg'),
('Design Systems: Building Consistent User Experiences', 'How to create and maintain design systems that scale across teams and products.', 'Full article content would go here...', 'design', '{"Design Systems","UI/UX","Consistency"}', '/placeholder.svg');
