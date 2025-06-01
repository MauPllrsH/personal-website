import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <div className="modern-layout">
      <main>
        {/* Navigation Header */}
          <div className="content">
            <div className="container">
              <header className="header">
                <p style={{ textAlign: 'center' }}>
                  <Link to="/">← Back to Home</Link> | 
                  <Link to="/htb">HTB Walkthroughs</Link>
                </p>
              </header>
            </div>
          </div>

        {/* Project 1 - ML WAF */}
        <section className="section">
          <div className="content">
            <div className="section-content">
              <div className="content-left">
                <h1 className="hero-title">Machine Learning Powered Web Application Firewall</h1>
                <h2 className="hero-subtitle">Sep 2024 – Apr 2025</h2>
                <p className="section-text">
                  Designed and deployed a multi-cloud solution using a Public Key Infrastructure with real-time ML anomaly detection achieving 88% true positive rate.
                </p>
                <div className="skills-categories">
                  <div className="skill-category">
                    <h3>Key Features</h3>
                    <ul>
                      <li>Multi-cloud PKI solution deployment</li>
                      <li>Real-time ML anomaly detection (88% accuracy)</li>
                      <li>Responsive React dashboard with metrics</li>
                      <li>Microservices architecture with gRPC</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="content-right">
                <div className="tech-icons-grid">
                  <div className="tech-icon hover-lift">Flask</div>
                  <div className="tech-icon hover-lift">Docker</div>
                  <div className="tech-icon hover-lift">React</div>
                  <div className="tech-icon hover-lift">JavaScript</div>
                  <div className="tech-icon hover-lift">Tailwind CSS</div>
                  <div className="tech-icon hover-lift">SQL</div>
                  <div className="tech-icon hover-lift">MongoDB</div>
                  <div className="tech-icon hover-lift">gRPC</div>
                  <div className="tech-icon hover-lift">Ubuntu</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project 2 - Data Science LLM App */}
        <section className="section">
          <div className="content">
            <div className="section-content">
              <div className="content-left">
                <h1 className="hero-title">Data Science Application with LLMs</h1>
                <h2 className="hero-subtitle">Apr 2025</h2>
                <p className="section-text">
                  Built Streamlit application integrating OpenAI API to assist with data science workflows, reducing data preparation time from hours to minutes.
                </p>
                <div className="skills-categories">
                  <div className="skill-category">
                    <h3>Key Features</h3>
                    <ul>
                      <li>Three-module pipeline: cleaning, analysis, modeling</li>
                      <li>Custom instruction input with AI suggestions</li>
                      <li>Processes datasets up to 200MB</li>
                      <li>AI-generated visualizations and metrics</li>
                      <li>PDF export functionality</li>
                    </ul>
                  </div>
                </div>
                <div className="hero-links">
                  <a href="https://csv-openai-analyst.streamlit.app/" className="cta-button hover-glow pulse-glow">View Live App</a>
                </div>
              </div>
              <div className="content-right">
                <div className="tech-icons-grid">
                  <div className="tech-icon hover-lift">Python</div>
                  <div className="tech-icon hover-lift">Streamlit</div>
                  <div className="tech-icon hover-lift">OpenAI API</div>
                  <div className="tech-icon hover-lift">Pandas</div>
                  <div className="tech-icon hover-lift">NumPy</div>
                  <div className="tech-icon hover-lift">Matplotlib</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project 3 - Transportation Platform */}
        <section className="section">
          <div className="content">
            <div className="section-content">
              <div className="content-left">
                <h1 className="hero-title">Transportation as a Service Platform</h1>
                <h2 className="hero-subtitle">Jan 2024 – May 2024</h2>
                <p className="section-text">
                  Led DevOps for multi-cloud deployment with REST APIs handling multiple concurrent connections and autonomous CI/CD pipeline.
                </p>
                <div className="skills-categories">
                  <div className="skill-category">
                    <h3>Key Features</h3>
                    <ul>
                      <li>Multi-cloud deployment leadership</li>
                      <li>REST APIs with concurrent connections</li>
                      <li>Autonomous CI/CD pipeline</li>
                      <li>Agile methodology with 2-week sprints</li>
                      <li>Eliminated manual deployment approvals</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="content-right">
                <div className="tech-icons-grid">
                  <div className="tech-icon hover-lift">Flask</div>
                  <div className="tech-icon hover-lift">Docker</div>
                  <div className="tech-icon hover-lift">Digital Ocean</div>
                  <div className="tech-icon hover-lift">Ubuntu</div>
                  <div className="tech-icon hover-lift">Bash</div>
                  <div className="tech-icon hover-lift">Bitbucket</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Projects;
