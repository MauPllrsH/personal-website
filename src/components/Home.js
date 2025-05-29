import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Matrix transition effect logic can be added here
    const htbLink = document.getElementById('htb-link');
    const overlay = document.getElementById('matrix-overlay');
    
    if (htbLink && overlay) {
      const handleClick = (event) => {
        event.preventDefault();
        overlay.style.display = 'flex';
        setTimeout(() => {
          overlay.classList.add('show');
        }, 10);
        
        setTimeout(() => {
          window.location.href = '/htb';
        }, 3100);
      };
      
      htbLink.addEventListener('click', handleClick);
      
      return () => {
        htbLink.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Mauricio Pallares Hernández</h1>
        <img src="public/imgs/kidgoku.jpg" alt="Kid Goku" className="profile-pic" />
        <h2 style={{ textAlign: 'center' }}>Welcome to my personal website!</h2>
        <p style={{ textAlign: 'center' }}>
          <a href="https://github.com/MauPllrsH">GitHub</a> |{' '}
          <a href="https://www.linkedin.com/in/mauricio-pallares-54aa862b7/">LinkedIn</a>
        </p>
      </header>

      <nav className="nav">
        <ul>
          <li><a href="#about">About Me</a></li>
          <li><a href="#current-plans">Current Plans</a></li>
          <li><a href="#esports">Esports</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><Link to="/htb" id="htb-link">HTB Walkthroughs</Link></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section id="about">
        <h2>About Me</h2>
        <p>
          I'm a recent graduate of St. Edward's University in Computer Science. I'm really passionate about learning and at the time of this writing, Ethical Hacking.
          I'm currently pursuing a career as a Penetration Tester, but I'm also interested in Software Development.
          I was almost a professional soccer player, and then almost a professional Esports player, but I decided to pursue a career in technology instead.
        </p>
      </section>

      <section id="current-plans">
        <h2>Current Plans</h2>
        <p>
          Currently I'm pursuing the HackTheBox CPTS certification, once I have that, I will be pursuing the OSCP certification.
          On top of that, I'm also learning how to code in C++, and trying to climb the ranks of both HackTheBox and LeetCode.
        </p>
      </section>

      <section id="esports">
        <h2>Esports: Call of Duty</h2>
        <h3>St. Edward's University Varsity <span style={{ fontWeight: 'normal' }}>(2021-2025)</span></h3>
        <p>
          I was a part of the Call of Duty team for the school. We participated in multiple national 
          competitions and consistently placed between Top 6 and 4 for the three years the team was active.
        </p>
        <h3>North American Amateur Circuit (Challengers) <span style={{ fontWeight: 'normal' }}>(2018-2024)</span></h3>
        <p>
          While I was in college, I also played in the North American Amateur Circuit (Challengers) 
          for Call of Duty. I started playing competitive Call of Duty when I was 16 years old,
          and I have been playing for 7 years now. I have played in multiple amateur tournaments,
          and I have been a part of multiple teams. 
          <br />
          My most notable achievement was when I placed 2nd in the
          North American Amateur Circuit (Challengers) Elite tournament in 2022. The Elite tournament
          was an online tournament with a prize pool of $10,000.
        </p>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        
        <div className="project">
          <h3>Machine Learning Powered Web Application Firewall</h3>
          <p className="project-date">Sep 2024 – Apr 2025</p>
          <ul>
            <li>Designed and deployed a multi-cloud solution using a Public Key Infrastructure</li>
            <li>Implemented real-time ML anomaly detection with a detection rate of 88% for true positives</li>
            <li>Built responsive React dashboard with performance metrics visualization</li>
            <li>Utilized microservices architecture with gRPC for inter-service communication</li>
          </ul>
          <p><strong>Tech Stack:</strong> Flask, Docker, React, JavaScript, Tailwind CSS, SQL, MongoDB, gRPC, Ubuntu</p>
        </div>

        <div className="project">
          <h3>Data Science Application with LLMs</h3>
          <p className="project-date">Apr 2025</p>
          <ul>
            <li>Built Streamlit application integrating OpenAI API to assist with data science workflows</li>
            <li>Implemented three-module pipeline: data cleaning, analysis, and modeling - each triggered by user</li>
            <li>Features include: custom instruction input, AI-generated suggestions, regeneration options, and PDF export</li>
            <li>Processes datasets up to 200MB with AI-generated visualizations and model metrics on demand</li>
            <li>Reduces data preparation time from hours to minutes through AI-assisted code generation</li>
          </ul>
          <p><strong>Tech Stack:</strong> Python, Streamlit, OpenAI API, Pandas, NumPy, Matplotlib</p>
          <p><a href="https://csv-openai-analyst.streamlit.app/">Link to App</a></p>
        </div>

        <div className="project">
          <h3>Transportation as a Service Platform</h3>
          <p className="project-date">Jan 2024 – May 2024</p>
          <ul>
            <li>Led DevOps for multi-cloud deployment</li>
            <li>Developed REST APIs handling multiple concurrent connections</li>
            <li>Built CI/CD pipeline eliminating manual deployment approvals, enabling team members to deploy tested changes autonomously</li>
            <li>Collaborated using Agile methodology with 2-week sprints</li>
          </ul>
          <p><strong>Tech Stack:</strong> Flask, Docker, Digital Ocean, Ubuntu, Bash, Bitbucket</p>
        </div>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>If you would like to get in touch, feel free to reach out via email at <a href="mailto:maupllrshjbs@gmail.com">Mail</a></p>
      </section>

      <div id="matrix-overlay" className="transition-overlay matrix-bg"></div>
    </div>
  );
};

export default Home;
