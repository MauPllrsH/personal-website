import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="container">
      <header className="header">
        <h1>Mauricio Pallares Hernández</h1>
        <img src="/imgs/kidgoku.jpg" alt="Kid Goku" className="profile-pic" />
        <h2 style={{ textAlign: 'center' }}>Welcome to my personal website!</h2>
        <p style={{ textAlign: 'center' }}>
          <a href="https://github.com/MauPllrsH">GitHub</a> |{' '}
          <a href="https://www.linkedin.com/in/mauricio-pallares-54aa862b7/">LinkedIn</a> |{' '}
          <a href="mailto:maupllrshjbs@gmail.com">Mail</a>
        </p>
      </header>

      <nav className="nav">
        <ul>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/htb">HTB Walkthroughs</Link></li>
        </ul>
      </nav>

      <section id="about">
        <h2>About Me</h2>
        <p>
          I'm a recent graduate of St. Edward's University in Computer Science. I'm really passionate about learning and at the time of this writing, Ethical Hacking.
          I'm currently pursuing a career as a Penetration Tester, but I'm also interested in Software Development.
          I was almost a professional soccer player, and then almost a professional Esports player, but I decided to pursue a career in technology instead.
          Currently I'm pursuing the HackTheBox CPTS certification, once I have that, I will be pursuing the OSCP certification.
          On top of that, I'm also learning how to code in C++, and trying to climb the ranks of both HackTheBox and LeetCode.
        </p>
      </section>

      <section id="education">
        <h2>Education</h2>
        <p>
          Saint Edward's University, Austin, TX <br />
          Bachelor of Science in Computer Science, 3.58GPA, May 2025 <br />
          Relevant Coursework: Data Structures, Algorithms, Operating Systems, Computer Networks, Web Development, Software Engineering <br />
          Cum Laude Honors, 6x Dean's List <br />
        </p>
        {/* LOGO OF STEDS / GRAD PHOTO?*/}
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <p>
          For Software Engineering, I particularly enjoy working with Python in the backend and doing server work in the terminal. I do have experience with web development using React, Flask and Django.
            I'm currently learning C++, and I have experience with SQL databases like MySQL, sqlite and Maria.
          <br />
            For Cybersecurity, I have experience with penetration testing primarily using Kali Linux, and I have experience with a large set of tools. I primarily focus on Web Application, Linux, Windows and Active Directory hacking.
          <br />
          I have experience with HackTheBox, PortSwigger, TryHackMe, PicoCTF, and other CTFs. I also have experience with Python and Bash scripting for automation and tool development.
        </p>
      </section>

      <section id="certifications">
        <h2>Certifications</h2>
        <p>
            I currently hold the following certifications:
          <ul>
            <li>CompTIA Security+ (SY0-601)</li>
            <li>Google Cybersecurity</li>
          </ul>
            I am currently pursuing the following certifications:
            <ul>
                <li>HackTheBox Certified Penetration Tester (CPTS)</li>
                <li>Offensive Security Certified Professional (OSCP)</li>
            </ul>
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

    </div>
  );
};

export default Home;
