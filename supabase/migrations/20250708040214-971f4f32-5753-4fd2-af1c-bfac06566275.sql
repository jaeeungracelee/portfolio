
-- Insert mock gallery images
INSERT INTO gallery_images (title, image_url, description, category) VALUES
('Modern Architecture', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop', 'A stunning example of contemporary architectural design with clean lines and geometric patterns.', 'architecture'),
('Tech Workspace', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop', 'A modern tech workspace featuring the latest in computer technology and design.', 'technology'),
('Circuit Board Art', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', 'Macro photography showcasing the intricate beauty of electronic circuit boards.', 'technology'),
('Creative Coding', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', 'A developer''s screen showing elegant Java code in a modern IDE environment.', 'development'),
('Digital Nomad Life', 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop', 'The modern remote work lifestyle captured in a cozy, productive setting.', 'lifestyle');

-- Insert mock blog posts
INSERT INTO blog_posts (title, excerpt, content, category, tags, image_url) VALUES
('Getting Started with React Hooks', 'Learn how to use React Hooks to build more efficient and cleaner components in your applications.', 'React Hooks revolutionized the way we write React components by allowing us to use state and other React features without writing class components. In this comprehensive guide, we''ll explore the most commonly used hooks and how they can improve your development workflow.

## useState Hook

The useState hook is the most fundamental hook that allows you to add state to functional components:

```javascript
const [count, setCount] = useState(0);
```

This simple line gives us a state variable and a function to update it, making our components reactive and dynamic.

## useEffect Hook

The useEffect hook lets you perform side effects in function components, replacing lifecycle methods from class components:

```javascript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

The dependency array ensures our effect only runs when specific values change, optimizing performance.

## Custom Hooks

One of the most powerful features is the ability to create custom hooks that encapsulate reusable logic:

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return { count, increment, decrement };
}
```

This pattern allows you to share stateful logic between components without complex higher-order components or render props.

## Conclusion

React Hooks provide a more direct API to the React concepts you already know. They offer a way to reuse stateful logic between components, make components easier to understand, and enable better performance optimizations.', 'development', ARRAY['react', 'javascript', 'hooks', 'frontend'], 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop'),

('The Future of Web Development', 'Exploring upcoming trends and technologies that will shape the future of web development in the next decade.', 'The web development landscape is constantly evolving, and staying ahead of the curve is crucial for developers who want to remain competitive. Let''s explore the key trends that will define the future of web development.

## WebAssembly Revolution

WebAssembly (WASM) is changing how we think about web performance. By allowing languages like Rust, C++, and Go to run in the browser at near-native speeds, WASM opens up possibilities we never had before.

## AI-Powered Development

Artificial Intelligence is transforming how we write code. Tools like GitHub Copilot and ChatGPT are becoming essential parts of the developer toolkit, helping with everything from code generation to debugging.

## Progressive Web Apps (PWAs)

PWAs continue to bridge the gap between web and native applications. With improved capabilities for offline functionality, push notifications, and device integration, PWAs are becoming increasingly powerful.

## Micro-Frontends Architecture

As applications grow in complexity, micro-frontends offer a way to break down large applications into smaller, manageable pieces that different teams can develop independently.

## Edge Computing

Moving computation closer to users through edge computing is reducing latency and improving user experiences globally. This trend is particularly important for real-time applications.

## Sustainability in Development

Green coding practices are becoming more important as developers recognize their environmental impact. Writing efficient code and choosing sustainable hosting solutions are becoming priorities.

The future of web development is exciting and full of opportunities. By staying informed about these trends and continuously learning, developers can build better, faster, and more sustainable web applications.', 'technology', ARRAY['webdev', 'future', 'trends', 'technology'], 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop'),

('Building Scalable APIs with Node.js', 'Best practices for creating robust and scalable backend APIs using Node.js and modern development patterns.', 'Building scalable APIs is one of the most important skills for backend developers. In this article, we''ll explore best practices for creating APIs that can handle growth and maintain performance.

## API Design Principles

Good API design starts with clear principles:

### RESTful Design
Follow REST conventions for intuitive endpoints:
- GET /users - List users
- POST /users - Create user
- GET /users/:id - Get specific user
- PUT /users/:id - Update user
- DELETE /users/:id - Delete user

### Consistent Response Format
Maintain consistent JSON responses:

```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0"
  }
}
```

## Performance Optimization

### Database Optimization
- Use database indexing strategically
- Implement connection pooling
- Consider read replicas for heavy read workloads

### Caching Strategies
- Redis for session storage and caching
- CDN for static assets
- Application-level caching for computed results

### Rate Limiting
Implement rate limiting to protect your API:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## Security Best Practices

- Always validate input data
- Use HTTPS everywhere
- Implement proper authentication and authorization
- Keep dependencies updated
- Use security headers

## Monitoring and Logging

Comprehensive monitoring is essential for scalable APIs:
- Request/response logging
- Performance metrics
- Error tracking
- Health check endpoints

Building scalable APIs requires careful planning and attention to detail, but following these practices will set you up for success.', 'development', ARRAY['nodejs', 'api', 'backend', 'scalability'], 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'),

('Design Systems in Modern UI/UX', 'How to create and maintain effective design systems that scale across products and teams.', 'Design systems have become essential for maintaining consistency and efficiency in modern product development. They provide a shared language between designers and developers while ensuring brand consistency across all touchpoints.

## What is a Design System?

A design system is more than just a style guide or component library. It''s a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.

## Core Components

### Design Tokens
Design tokens are the visual design decisions of a design system, stored as data:

```json
{
  "color": {
    "primary": {
      "value": "#007bff",
      "type": "color"
    },
    "secondary": {
      "value": "#6c757d",
      "type": "color"
    }
  },
  "spacing": {
    "small": {
      "value": "8px",
      "type": "dimension"
    }
  }
}
```

### Component Library
A well-organized component library includes:
- Basic components (buttons, inputs, cards)
- Complex components (data tables, forms)
- Layout components (grids, containers)

### Documentation
Comprehensive documentation should cover:
- Usage guidelines
- Code examples
- Design rationale
- Accessibility considerations

## Implementation Strategies

### Start Small
Begin with the most commonly used components and gradually expand the system.

### Version Control
Treat your design system like any other product with proper versioning and release cycles.

### Cross-functional Collaboration
Involve designers, developers, and product managers in the creation and maintenance process.

## Tools and Technologies

Popular tools for building design systems:
- Storybook for component documentation
- Figma for design collaboration
- Style Dictionary for design tokens
- Chromatic for visual testing

## Measuring Success

Track adoption metrics:
- Component usage across products
- Time saved in development
- Design consistency scores
- Developer and designer satisfaction

A well-implemented design system becomes the foundation for rapid, consistent product development while maintaining high quality and user experience standards.', 'design', ARRAY['design-system', 'ui-ux', 'frontend', 'consistency'], 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'),

('Remote Work Best Practices', 'Essential tips and strategies for staying productive and maintaining work-life balance while working remotely.', 'Remote work has transformed from a nice-to-have perk to a fundamental part of modern work culture. Whether you''re new to remote work or looking to optimize your setup, these practices will help you thrive.

## Creating Your Workspace

### Physical Environment
Your workspace significantly impacts productivity:
- Dedicated work area separate from relaxation spaces
- Ergonomic chair and desk setup
- Good lighting (natural light when possible)
- Minimal distractions and clutter

### Technical Setup
Invest in quality tools:
- Reliable internet connection
- Good quality webcam and microphone
- Dual monitors for increased productivity
- Comfortable keyboard and mouse

## Time Management

### Structured Schedule
Maintain regular work hours:
- Start and end times
- Scheduled breaks
- Lunch away from your desk
- Clear boundaries between work and personal time

### Productivity Techniques
Try different methods to find what works:
- Pomodoro Technique (25-minute focused work sessions)
- Time blocking for different types of tasks
- The two-minute rule for small tasks

## Communication

### Overcommunicate
In remote settings, more communication is usually better:
- Regular check-ins with team members
- Clear status updates on projects
- Proactive communication about blockers

### Choose the Right Medium
- Slack/Teams for quick questions
- Email for formal communications
- Video calls for complex discussions
- Async video messages for detailed explanations

## Maintaining Relationships

### Virtual Coffee Chats
Schedule informal conversations with colleagues to maintain social connections.

### Team Building Activities
Participate in virtual team events and contribute to building team culture.

## Health and Wellness

### Physical Health
- Take regular breaks to move
- Maintain good posture
- Stay hydrated
- Get outside during breaks

### Mental Health
- Set clear boundaries
- Take actual lunch breaks
- Maintain social connections
- Practice stress management techniques

## Professional Development

Remote work shouldn''t slow down your career growth:
- Attend virtual conferences and workshops
- Take online courses
- Seek feedback regularly
- Volunteer for visible projects

Remote work success comes down to intentionality - being deliberate about your workspace, schedule, communication, and professional development will help you not just survive, but thrive in a remote environment.', 'lifestyle', ARRAY['remote-work', 'productivity', 'work-life-balance', 'tips'], 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop');
