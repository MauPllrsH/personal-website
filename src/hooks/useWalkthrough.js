import { useState, useEffect } from 'react';

const useWalkthrough = (slug) => {
  const [walkthrough, setWalkthrough] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWalkthrough = async () => {
      if (!slug) return;
      
      try {
        const response = await fetch(`/walkthroughs/${slug}.md`);
        if (!response.ok) throw new Error('Walkthrough not found');
        
        const text = await response.text();
        
        // Parse frontmatter
        const lines = text.split('\n');
        const metadata = {};
        let contentStart = 0;
        
        if (lines[0] === '---') {
          for (let i = 1; i < lines.length; i++) {
            if (lines[i] === '---') {
              contentStart = i + 1;
              break;
            }
            const [key, ...valueParts] = lines[i].split(':');
            if (key && valueParts.length > 0) {
              let value = valueParts.join(':').trim();
              
              // Handle arrays (techniques)
              if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
              } else {
                value = value.replace(/"/g, '');
              }
              
              metadata[key.trim()] = value;
            }
          }
        }
        
        setWalkthrough({
          ...metadata,
          slug,
          content: lines.slice(contentStart).join('\n')
        });
      } catch (error) {
        console.error('Error loading walkthrough:', error);
        setWalkthrough(null);
      } finally {
        setLoading(false);
      }
    };

    loadWalkthrough();
  }, [slug]);

  return { walkthrough, loading };
};

export default useWalkthrough;
