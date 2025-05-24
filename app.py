from flask import Flask, render_template, abort
import markdown
import frontmatter
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/htb')
def htb_list():
    # Get all walkthrough files
    walkthroughs_dir = os.path.join(app.static_folder, 'walkthroughs')
    walkthroughs = []
    
    if os.path.exists(walkthroughs_dir):
        for filename in os.listdir(walkthroughs_dir):
            if filename.endswith('.md'):
                filepath = os.path.join(walkthroughs_dir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    post = frontmatter.load(f)
                    
                # Add the filename without extension as slug
                post.metadata['slug'] = filename[:-3]  # Remove .md
                walkthroughs.append(post)
    
    # Sort by date completed (newest first)
    walkthroughs.sort(key=lambda x: x.metadata.get('date_completed', ''), reverse=True)
    
    return render_template('htb_list.html', walkthroughs=walkthroughs)

@app.route('/htb/<slug>')
def htb_walkthrough(slug):
    filepath = os.path.join(app.static_folder, 'walkthroughs', f'{slug}.md')
    
    if not os.path.exists(filepath):
        abort(404)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    # Convert markdown to HTML
    html_content = markdown.markdown(post.content, extensions=['codehilite', 'fenced_code'])
    
    return render_template('htb_walkthrough.html', 
                         post=post, 
                         content=html_content)

@app.errorhandler(404)
def not_found(error):
    return "Page not found", 404

if __name__ == '__main__':
    app.run(debug=True)
