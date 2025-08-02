import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  strings,
  typeSpeed = 100,
  backSpeed = 80,
  backDelay = 2000,
  className = ""
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentString = strings[currentStringIndex];
    
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === currentString) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), backDelay);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next string
      setIsDeleting(false);
      setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
    } else {
      // Typing or deleting
      const speed = isDeleting ? backSpeed : typeSpeed;
      
      timeout = setTimeout(() => {
        setCurrentText(prevText => {
          if (isDeleting) {
            return currentString.substring(0, prevText.length - 1);
          } else {
            return currentString.substring(0, prevText.length + 1);
          }
        });
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentStringIndex, strings, typeSpeed, backSpeed, backDelay]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
        |
      </span>
    </span>
  );
};

export default TypingAnimation;