'use client';

import { useState, useEffect } from 'react';

const taglines = [
  {
    words: [
      { text: 'DIGITAL', highlighted: false },
      { text: 'TRANSFORMATION', highlighted: true },
      { text: 'FACILITATOR', highlighted: false },
    ],
  },
  {
    words: [
      { text: 'BUILDING', highlighted: false },
      { text: 'DIGITIZATION', highlighted: true },
      { text: 'EXPERTS', highlighted: false },
    ],
  },
  {
    words: [
      { text: 'DESIGN', highlighted: false },
      { text: 'TECHNOLOGY', highlighted: true },
      { text: 'SERVICE', highlighted: false },
      { text: 'PROVIDER', highlighted: false },
    ],
  },
];

export default function AnimatedTagline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // After exit animation completes, change the text
      setTimeout(() => {
        setDisplayIndex((prev) => (prev + 1) % taglines.length);
        setIsAnimating(false);
      }, 400);
      
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTagline = taglines[displayIndex];

  return (
    <h1 className="hero-tagline relative overflow-hidden">
      <span 
        className={`tagline-text inline-block ${isAnimating ? 'tagline-exit' : 'tagline-enter'}`}
        key={displayIndex}
      >
        {currentTagline.words.map((word, index) => (
          <span key={index}>
            <span className={word.highlighted ? 'highlight' : 'text-[var(--foreground)]'}>
              {word.text}
            </span>
            {index < currentTagline.words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </h1>
  );
}
