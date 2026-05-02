import { useState, useEffect, useCallback } from 'react';

const useScrollHighlight = (sections, containerRef) => {
  const [highlightedSections, setHighlightedSections] = useState([]);

  const updateHighlightedSections = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const visibleSections = [];

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
          visibleSections.push(section.id);
        }
      }
    }

    setHighlightedSections(prev => {
      const newHighlighted = [...prev];
      visibleSections.forEach(sectionId => {
        if (!newHighlighted.includes(sectionId)) {
          newHighlighted.push(sectionId);
        }
      });
      return newHighlighted;
    });
  }, [sections, containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateHighlightedSections);
      updateHighlightedSections();
      
      return () => {
        container.removeEventListener('scroll', updateHighlightedSections);
      };
    }
  }, [updateHighlightedSections, containerRef]);

  const resetHighlighted = useCallback(() => {
    setHighlightedSections([]);
  }, []);

  return { highlightedSections, updateHighlightedSections, resetHighlighted };
};

export default useScrollHighlight;