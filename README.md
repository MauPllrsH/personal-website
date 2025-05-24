# Mauricio Pallares - Personal Website

A Flask-powered personal website showcasing my journey, projects, and HackTheBox walkthroughs.

## 🌟 Features

- **Personal Portfolio**: About me, current plans, and professional background
- **HTB Walkthroughs**: Detailed write-ups of HackTheBox machines with filtering and search
- **Project Showcase**: Machine learning, data science, and DevOps projects
- **Esports Background**: Call of Duty competitive gaming experience
- **Responsive Design**: Dark theme with animated space background

## 🛠️ Current Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with animations
- **Content**: Markdown with frontmatter for walkthroughs
- **Deployment Ready**: Structured for easy hosting

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MauPllrsH/personal-website.git
   cd personal-website
   ```

2. **Create virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python3 app.py
   ```

5. **Visit the website**
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/            # HTML templates
│   ├── main.html         # Homepage
│   ├── htb_list.html     # HTB walkthroughs list
│   └── htb_walkthrough.html # Individual walkthrough view
├── static/              # Static assets
│   ├── styles.css       # Main stylesheet
│   ├── js/              # JavaScript files
│   ├── imgs/            # Images
│   └── walkthroughs/    # Markdown walkthrough files
└── README.md           # This file
```

## 📝 Adding New HTB Walkthroughs

1. Create a new `.md` file in `static/walkthroughs/`
2. Include frontmatter with metadata:
   ```yaml
   ---
   title: "Machine Name Walkthrough"
   machine_name: "MachineName"
   difficulty: "Easy/Medium/Hard"
   os: "Windows/Linux"
   date_completed: "YYYY-MM-DD"
   techniques: ["Technique1", "Technique2"]
   box_ip: "10.10.10.xxx"
   ---
   ```
3. Write your walkthrough content in Markdown
4. The file will automatically appear on the HTB page

## 🎯 Learning Goals & Future Evolution

My goal with this site is to continuously learn and stay current with the most widely-used technologies in the industry. Here's my planned migration path:

### Phase 1: Current Foundation ✅
- **Flask Backend**: Solid Python foundation
- **Custom CSS**: Learning fundamental styling concepts
- **Markdown Processing**: Content management system

### Phase 2: Modern Frontend (Planned)
- **Next.js 14/15**: React framework with SSR/SSG
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and micro-interactions

### Phase 3: Full-Stack Evolution (Future)
- **Next.js API Routes**: Serverless functions
- **Supabase**: PostgreSQL database + authentication + real-time features
- **Prisma**: Modern ORM for database operations

### Phase 4: Professional Deployment (Goal)
- **Vercel**: Optimized hosting for Next.js
- **GitHub Actions**: CI/CD pipeline automation
- **Analytics**: User behavior tracking and performance monitoring

### Why This Tech Stack Evolution?
- **Industry Relevance**: These technologies are in high demand in 2025
- **Performance**: Modern frameworks provide superior loading speeds and user experience
- **Scalability**: Can handle growth from personal site to professional portfolio
- **Career Value**: Demonstrates ability to work with current web development standards

## 🎨 Features Showcase

- **Animated Background**: Nebula gradient with twinkling stars
- **Search & Filter**: Find HTB machines by name, difficulty, OS, or technique
- **Responsive Cards**: Hover effects and clean layout
- **Code Highlighting**: Syntax highlighting for command examples
- **Smooth Transitions**: Matrix-style transition effects

## 🔗 Connect With Me

- **GitHub**: [MauPllrsH](https://github.com/MauPllrsH)
- **LinkedIn**: [Mauricio Pallares](https://www.linkedin.com/in/mauricio-pallares-54aa862b7/)
- **Website**: Coming Soon!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal website, feedback and suggestions are welcome! Feel free to open an issue or reach out directly.

---

*Built by Mauricio Pallares - Aspiring Penetration Tester & Software Engineer*
