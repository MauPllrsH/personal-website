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

      const zoom = parseFloat(getComputedStyle(feature).backgroundSize) / 100 || 2.5;
      const size = zoom * feature.offsetWidth;

      const handleScroll = () => {
        const fromTop = window.pageYOffset;
        const newSize = size - (fromTop / 3);
        const htmlHeight = document.documentElement.scrollHeight;
        
        if (newSize > feature.offsetWidth) {
          // Apply parallax effects
          feature.style.backgroundSize = `${newSize}px`;
          feature.style.filter = `blur(${0 + (fromTop / 100)}px)`;
          feature.style.opacity = 1 - ((fromTop / htmlHeight) * 1.3);
        }
      };

      // Browser-specific opacity overlay for non-Chrome/Safari
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
      
      if (!isChrome && !isSafari) {
        const opaque = document.querySelector('.opaque');
        if (opaque) {
          const handleOpaqueScroll = () => {
            const opacity = 0 + (window.pageYOffset / 5000);
            opaque.style.opacity = Math.min(opacity, 1);
          };
          window.addEventListener('scroll', handleOpaqueScroll);
          
          return () => {
            window.removeEventListener('scroll', handleOpaqueScroll);
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
      <div className="modern-layout">
        <div className="container">
          <p className="section-text">Loading walkthrough...</p>
        </div>
      </div>
    );
  }

  if (!walkthrough) {
    return (
      <div className="modern-layout">
        <div className="container">
          <p className="section-text">Walkthrough not found.</p>
          <Link to="/htb">← Back to HTB Walkthroughs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-layout">
      {/* Parallax Background */}
      <div className="walkthrough-feature">
        <div className="opaque"></div>
      </div>

      {/* Main Content */}
      <article className="walkthrough-content">
        <header className="header">
          <p style={{ textAlign: 'center' }}>
            <Link to="/htb">← Back to HTB Walkthroughs</Link> | 
            <Link to="/">Home</Link>
          </p>
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
      </article>
    </div>
  );
};

export default HTBWalkthrough;
