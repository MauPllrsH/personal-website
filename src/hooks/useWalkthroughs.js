import { useState, useEffect } from 'react';

const useWalkthroughs = () => {
  const [walkthroughs, setWalkthroughs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWalkthroughs = async () => {
      try {
        // List of your walkthrough files (you add new ones here)
        const walkthroughFiles = [
          'active',
          'cascade', 
          'forest',
          'resolute'
          // Add new files here when you create them
        ];

        const walkthroughPromises = walkthroughFiles.map(async (filename) => {
          try {
            const response = await fetch(`/walkthroughs/${filename}.md`);
            const text = await response.text();
            
            // Parse frontmatter manually (simple version)
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
            
            return {
              ...metadata,
              slug: filename,
              content: lines.slice(contentStart).join('\n')
            };
          } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
          }
        });

        const results = await Promise.all(walkthroughPromises);
        const validWalkthroughs = results.filter(w => w !== null);
        
        // Sort by date completed (newest first)
        validWalkthroughs.sort((a, b) => 
          new Date(b.date_completed) - new Date(a.date_completed)
        );
        
        setWalkthroughs(validWalkthroughs);
      } catch (error) {
        console.error('Error loading walkthroughs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWalkthroughs();
  }, []);

  return { walkthroughs, loading };
};

export default useWalkthroughs;
