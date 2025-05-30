import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
    return (
      <div>
        <div className="container">
          <header className="header">
            <h1>Software Engineering Projects</h1>
            <p style={{ textAlign: 'center' }}>
              <Link to="/">← Back to Home </Link>
              {' | '}
              <Link to="/htb">HTB Walkthroughs</Link>
            </p>
          </header>
        </div>
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
      </div>
    );
}
export default Projects;
