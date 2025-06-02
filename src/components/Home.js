import React from 'react';

const Home = () => {
  return (
    <div className="modern-layout home-page">
      <main>
        {/* Hero Section */}
        <section className="section">
          <div className="content">
            <div className="section-content">
              <div className="content-left">
                <h1 className="hero-title">Mauricio Pallares Hernández</h1>
                <h2 className="hero-subtitle">Aspiring Penetration Tester</h2>
                <div className="hero-links">
                  <a href="/htb" className="cta-button">View HTB Walkthroughs</a>
                  <a href="/projects" className="cta-button">View Projects</a>
                </div>
              </div>
              <div>
                <div className="hero-image-container">
                  <img src="/imgs/mau.JPG" alt="Mauricio Pallares" className="hero-image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section">
          <div className="content">
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
              <div>
                <div className="hero-image-container">
                  <img src="/imgs/aboutme.JPG" alt="Mauricio Pallares" className="hero-image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section">
          <div className="content">
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
              <div>
                <div className="tech-icons-grid">
                  <div className="tech-icon hover-lift">Python</div>
                  <div className="tech-icon hover-lift">JavaScript</div>
                  <div className="tech-icon hover-lift">React</div>
                  <div className="tech-icon hover-lift">C++</div>
                  <div className="tech-icon hover-lift">Docker</div>
                  <div className="tech-icon hover-lift">Git</div>
                  <div className="tech-icon hover-lift">SQL</div>
                  <div className="tech-icon hover-lift">MongoDB</div>
                  <div className="tech-icon hover-lift">Flask</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Esports Section */}
        <section className="section">
          <div className="content">
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
                  </div>
                </div>
              </div>
              <div>
                <div className="esports-gallery">
                  <div className="gallery-item">
                    <img src="/imgs/opticmajor.JPG" alt="Optic Major SEU Team" className="esports-image" />
                  </div>
                  <div className="gallery-item">
                    <img src="/imgs/teamphoto.JPG" alt="D1 Team" className="esports-image" />
                  </div>
                  <div className="gallery-item">
                    <img src="/imgs/thresh.JPG" alt="Headshot" className="esports-image" />
                  </div>
                  <div className="gallery-item">
                    <img src="/imgs/goat.JPG" alt="Fear The Goat" className="esports-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section">
          <div className="content">
            <div className="section-content">
              <div className="content-left">
                <h2 className="section-title">Let's Connect</h2>
                <p className="section-text">
                  I'm always interested in discussing cybersecurity, software development, 
                  or potential collaboration opportunities. Feel free to reach out!
                </p>
                <div className="contact-methods">
                  <a href="mailto:maupllrshjbs@gmail.com" className="contact-method hover-lift">
                    <span className="contact-icon">📧</span>
                    <span>Mail</span>
                  </a>
                  <a href="https://github.com/MauPllrsH" className="contact-method hover-lift">
                    <span className="contact-icon">🔗</span>
                    <span>GitHub Profile</span>
                  </a>
                  <a href="https://www.linkedin.com/in/mauricio-pallares-54aa862b7/" className="contact-method hover-lift">
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
