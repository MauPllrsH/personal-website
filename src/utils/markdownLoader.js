import matter from 'gray-matter';

export const loadMarkdownFile = async (filename) => {
  try {
    const response = await fetch(`/walkthroughs/${filename}.md`);
    const text = await response.text();
    const { data, content } = matter(text);
    return { metadata: data, content };
  } catch (error) {
    console.error('Error loading markdown file:', error);
    return null;
  }
};
