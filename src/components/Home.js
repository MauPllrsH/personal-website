
import React from 'react';

const Home = () => {
  return (
    <div className="modern-layout">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="section-content">
          <div className="content-left">
            <h1 className="hero-title">Mauricio Pallares Hernández</h1>
            <h2 className="hero-subtitle">Cybersecurity Enthusiast & Software Developer</h2>
            <p className="hero-description">
              Recent Computer Science graduate passionate about ethical hacking, penetration testing, 
              and building secure software solutions. Currently pursuing CPTS and OSCP certifications 
              while climbing the ranks on HackTheBox.
            </p>
            <div className="hero-links">
              <a href="https://github.com/MauPllrsH" className="social-link">GitHub</a>
              <a href="https://www.linkedin.com/in/mauricio-pallares-54aa862b7/" className="social-link">LinkedIn</a>
              <a href="/htb" className="cta-button">View HTB Walkthroughs</a>
              <a href="/projects" className="cta-button">View Projects</a>
            </div>
          </div>
          <div className="content-right">
            <div className="hero-image-container">
              <img src="/imgs/mau.JPG" alt="Mauricio Pallares" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-content">
          <div className="content-left">
            <h2 className="section-title">About Me</h2>
            <p className="section-text">
              I'm a recent graduate of St. Edward's University with a degree in Computer Science. 
              My journey has taken me from competitive sports to esports, and now to the exciting 
              world of cybersecurity and software development.
            </p>
            <p className="section-text">
              What drives me is the constant learning and problem-solving that comes with ethical 
              hacking and penetration testing. Every vulnerability discovered and every system 
              secured is a step toward making the digital world safer.
            </p>
            <p className="section-text highlight">
              Currently pursuing a career as a Penetration Tester while maintaining strong 
              interests in Software Development and Machine Learning.
            </p>
          </div>
          <div className="content-right">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>HTB Rank</h3>
                <p>Climbing</p>
              </div>
              <div className="stat-card">
                <h3>Certifications</h3>
                <p>CPTS (In Progress)</p>
              </div>
              <div className="stat-card">
                <h3>Focus Areas</h3>
                <p>Penetration Testing</p>
              </div>
              <div className="stat-card">
                <h3>Education</h3>
                <p>St. Edward's University</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="section-content">
          <div className="content-left">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-categories">
              <div className="skill-category">
                <h3>Cybersecurity</h3>
                <ul>
                  <li>Penetration Testing</li>
                  <li>Active Directory Attacks</li>
                  <li>Web Application Security</li>
                  <li>Network Enumeration</li>
                  <li>Vulnerability Assessment</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Development</h3>
                <ul>
                  <li>Python</li>
                  <li>JavaScript/React</li>
                  <li>C++</li>
                  <li>Flask/Node.js</li>
                  <li>SQL/MongoDB</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Tools & Platforms</h3>
                <ul>
                  <li>Docker</li>
                  <li>Linux</li>
                  <li>Git</li>
                  <li>Cloud Platforms</li>
                  <li>Penetration Testing Tools</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="tech-icons-grid">
              <div className="tech-icon">Python</div>
              <div className="tech-icon">JavaScript</div>
              <div className="tech-icon">React</div>
              <div className="tech-icon">C++</div>
              <div className="tech-icon">Docker</div>
              <div className="tech-icon">Linux</div>
              <div className="tech-icon">Git</div>
              <div className="tech-icon">SQL</div>
              <div className="tech-icon">MongoDB</div>
              <div className="tech-icon">Flask</div>
              <div className="tech-icon">Node.js</div>
              <div className="tech-icon">AWS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Plans Section */}
      <section className="plans-section">
        <div className="section-content">
          <div className="content-left">
            <h2 className="section-title">Current Plans & Goals</h2>
            <div className="goals-timeline">
              <div className="goal-item">
                <div className="goal-status current">Current</div>
                <h3>HackTheBox CPTS Certification</h3>
                <p>Working through the comprehensive penetration testing certification path</p>
              </div>
              <div className="goal-item">
                <div className="goal-status next">Next</div>
                <h3>OSCP Certification</h3>
                <p>The gold standard in penetration testing certifications</p>
              </div>
              <div className="goal-item">
                <div className="goal-status ongoing">Ongoing</div>
                <h3>C++ Mastery</h3>
                <p>Strengthening low-level programming and system understanding</p>
              </div>
              <div className="goal-item">
                <div className="goal-status ongoing">Ongoing</div>
                <h3>Algorithm Practice</h3>
                <p>Climbing LeetCode ranks for technical interview preparation</p>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="progress-visualization">
              <div className="progress-circle">
                <div className="circle-content">
                  <span className="progress-text">HTB Progress</span>
                  <span className="progress-number">Rising</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Esports Section */}
      <section className="esports-section">
        <div className="section-content">
          <div className="content-left">
            <h2 className="section-title">Esports Background</h2>
            <div className="esports-achievements">
              <div className="achievement">
                <h3>St. Edward's University Varsity</h3>
                <span className="year">2021-2025</span>
                <p>
                  Member of the Call of Duty varsity team, consistently placing Top 4-6 
                  in national competitions throughout three active years.
                </p>
              </div>
              <div className="achievement highlight-achievement">
                <h3>North American Amateur Circuit</h3>
                <span className="year">2018-2024</span>
                <p>
                  7 years of competitive Call of Duty experience in the Challengers circuit.
                </p>
                <div className="achievement-highlight">
                  <strong>Notable Achievement:</strong> 2nd Place in NA Amateur Circuit Elite 
                  Tournament 2022 ($10,000 prize pool)
                </div>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="esports-gallery">
              <div className="gallery-item main-image">
                <img src="/imgs/opticmajor.JPG" alt="Optic Major SEU Team Picture" className="hero-image" />
              </div>
              <div className="gallery-item">
                <img src="/imgs/teamphoto.JPG" alt="Team Photo D1" className="hero-image" />
              </div>
              <div className="gallery-item">
                <img src="/imgs/thresh.JPG" alt="Headshot" className="hero-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="section-content">
          <div className="content-left">
            <h2 className="section-title">Let's Connect</h2>
            <p className="section-text">
              I'm always interested in discussing cybersecurity, software development, 
              or potential collaboration opportunities. Feel free to reach out!
            </p>
            <div className="contact-methods">
              <a href="mailto:maupllrshjbs@gmail.com" className="contact-method">
                <span className="contact-icon">📧</span>
                <span>Mail</span>
              </a>
              <a href="https://github.com/MauPllrsH" className="contact-method">
                <span className="contact-icon">🔗</span>
                <span>GitHub Profile</span>
              </a>
              <a href="https://www.linkedin.com/in/mauricio-pallares-54aa862b7/" className="contact-method">
                <span className="contact-icon">💼</span>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
          <div className="content-right">
            <div className="contact-visual">
              <div className="contact-card">
                <h3>Open to Opportunities</h3>
                <ul>
                  <li>Penetration Testing Roles</li>
                  <li>Cybersecurity Positions</li>
                  <li>Software Development</li>
                  <li>Freelance Security Assessments</li>
                  <li>Technical Writing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
