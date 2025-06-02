import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useWalkthrough from '../hooks/useWalkthrough';

const HTBWalkthrough = () => {
  const { slug } = useParams();
  const { walkthrough, loading } = useWalkthrough(slug);

  useEffect(() => {
    // Parallax animation implementation
    const initParallax = () => {
      const feature = document.querySelector('.walkthrough-feature');
      if (!feature) return;

      // For images, we'll use a zoom effect instead of background-size manipulation
      const handleScroll = () => {
        const fromTop = window.pageYOffset;
        const htmlHeight = document.documentElement.scrollHeight;
        
        // Calculate zoom and blur effects
        const scale = 1 + (fromTop / 2000); // Subtle zoom effect
        const blur = fromTop / 100; // Gradual blur
        const opacity = Math.max(0.3, 1 - (fromTop / htmlHeight)); // Keep minimum opacity
        
        // Apply transform instead of background-size for better performance
        feature.style.transform = `scale(${scale})`;
        feature.style.filter = `blur(${blur}px)`;
        feature.style.opacity = opacity;
      };

      // Browser-specific opacity overlay for non-Chrome/Safari
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
      
      if (!isChrome && !isSafari) {
        const opaque = document.querySelector('.opaque');
        if (opaque) {
          const handleOpaqueScroll = () => {
            const opacity = Math.min(0.7, 0 + (window.pageYOffset / 3000));
            opaque.style.opacity = opacity;
          };
          window.addEventListener('scroll', handleOpaqueScroll);
          
          return () => {
            window.removeEventListener('scroll', handleOpaqueScroll);
            window.removeEventListener('scroll', handleScroll);
          };
        }
      }

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    // Initialize parallax after component mounts and walkthrough loads
    if (walkthrough && !loading) {
      const cleanup = initParallax();
      return cleanup;
    }
  }, [walkthrough, loading]);

  if (loading) {
    return (
      <div className="modern-layout walkthrough-page">
        <div className="container">
          <p className="section-text">Loading walkthrough...</p>
        </div>
      </div>
    );
  }

  if (!walkthrough) {
    return (
      <div className="modern-layout walkthrough-page">
        <div className="container">
          <p className="section-text">Walkthrough not found.</p>
          <Link to="/htb">← Back to HTB Walkthroughs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="walkthrough-page">
      {/* Parallax Background with machine image */}
      <div 
        className="walkthrough-feature"
        style={{
          backgroundImage: walkthrough.htb_completion_image 
            ? `url(/imgs/walkthroughs/${walkthrough.htb_completion_image})`
            : 'linear-gradient(135deg, #0b132b 0%, #1e3475 50%, #2a4d7a 100%)'
        }}
      >
        <div className="opaque"></div>
      </div>

      {/* Main Content */}
      <div className="walkthrough-content">
        <header className="walkthrough-nav">
          <Link to="/htb">← Back to HTB Walkthroughs</Link>
          <span className="nav-separator">|</span>
          <Link to="/">Home</Link>
        </header>

        <div className="walkthrough-meta">
          <h1>{walkthrough.title}</h1>
          <div className="meta-info">
            <span className={`difficulty difficulty-${walkthrough.difficulty?.toLowerCase()}`}>
              {walkthrough.difficulty}
            </span>
            <span className="os">{walkthrough.os}</span>
            <span className="date">{walkthrough.date_completed}</span>
          </div>
          
          {walkthrough.techniques && (
            <div className="techniques">
              {walkthrough.techniques.map((technique, index) => (
                <span key={index} className="technique-tag">
                  {technique}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {walkthrough.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default HTBWalkthrough;
