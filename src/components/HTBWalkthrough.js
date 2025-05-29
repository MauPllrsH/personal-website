import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useWalkthrough from '../hooks/useWalkthrough';

const HTBWalkthrough = () => {
  const { slug } = useParams();
  const { walkthrough, loading } = useWalkthrough(slug);

  if (loading) {
    return (
      <div className="container">
        <p>Loading walkthrough...</p>
      </div>
    );
  }

  if (!walkthrough) {
    return (
      <div className="container">
        <p>Walkthrough not found.</p>
        <Link to="/htb">← Back to HTB Walkthroughs</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <p style={{ textAlign: 'center' }}>
          <Link to="/htb">← Back to HTB Walkthroughs</Link> | 
          <Link to="/">Home</Link>
        </p>
      </header>

      <article className="walkthrough-content">
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
