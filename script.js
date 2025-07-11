// ========== Article Data ==========
const articles = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring emerging trends and technologies shaping the web development landscape.",
    content: "The web development landscape is constantly evolving, with new technologies and frameworks emerging regularly. From progressive web apps to serverless architectures, developers are embracing innovative solutions to create faster, more efficient applications. The rise of AI-powered development tools is revolutionizing how we write code, while new CSS features like container queries and cascade layers are providing more powerful styling capabilities. As we look to the future, the focus remains on creating better user experiences through performance optimization, accessibility improvements, and seamless cross-platform compatibility.",
    author: "Jane Smith",
    date: "March 15, 2024"
  },
  {
    id: 2,
    title: "Understanding Modern CSS Grid",
    excerpt: "A comprehensive guide to mastering CSS Grid layout for modern web design.",
    content: "CSS Grid has transformed how we approach web layout design, offering unprecedented control over two-dimensional layouts. Unlike Flexbox, which excels at one-dimensional layouts, Grid allows us to work with both rows and columns simultaneously. This powerful layout system enables developers to create complex, responsive designs with cleaner markup and more maintainable code. From basic grid containers to advanced techniques like subgrid and container queries, CSS Grid provides the foundation for modern web layouts. Understanding grid areas, track sizing, and alignment properties is essential for any developer looking to create sophisticated user interfaces.",
    author: "Mike Johnson",
    date: "March 12, 2024"
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization",
    excerpt: "Best practices and techniques for optimizing JavaScript performance in modern applications.",
    content: "JavaScript performance optimization is crucial for creating fast, responsive web applications. From reducing bundle sizes through code splitting to optimizing rendering performance with virtual DOM techniques, there are numerous strategies developers can employ. Understanding the JavaScript event loop, memory management, and browser rendering processes helps identify performance bottlenecks. Techniques like lazy loading, debouncing, and efficient data structures can significantly improve application responsiveness. Modern tools like webpack, Vite, and Rollup provide powerful optimization capabilities, while performance monitoring tools help track and measure improvements over time.",
    author: "Sarah Wilson",
    date: "March 10, 2024"
  },
  {
    id: 4,
    title: "Responsive Design Principles",
    excerpt: "Essential principles for creating websites that work beautifully across all devices.",
    content: "Responsive design has become a fundamental requirement for modern web development. With the proliferation of devices and screen sizes, creating flexible layouts that adapt to different viewports is essential. The mobile-first approach encourages developers to start with the smallest screen size and progressively enhance for larger displays. Flexible grids, fluid images, and media queries form the foundation of responsive design, while modern CSS features like clamp(), min(), and max() functions provide even more control over responsive behavior. Container queries represent the next evolution in responsive design, allowing components to respond to their container size rather than the viewport.",
    author: "David Chen",
    date: "March 8, 2024"
  },
  {
    id: 5,
    title: "Web Accessibility Best Practices",
    excerpt: "Creating inclusive web experiences for users with disabilities and diverse needs.",
    content: "Web accessibility ensures that digital content is usable by everyone, including people with disabilities. Following WCAG guidelines, developers can create more inclusive experiences through proper semantic markup, keyboard navigation support, and screen reader compatibility. Color contrast, focus management, and alternative text for images are fundamental accessibility considerations. Modern frameworks and tools provide built-in accessibility features, but understanding the underlying principles is crucial for creating truly inclusive applications. Regular accessibility audits, user testing with assistive technologies, and staying updated with evolving standards help maintain high accessibility standards throughout the development process.",
    author: "Lisa Rodriguez",
    date: "March 5, 2024"
  }
];

// ========== Get Elements ==========
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const articleList = document.getElementById('articleList');
const contentArea = document.getElementById('contentArea');
const tooltip = document.getElementById('tooltip');
const backdrop = document.getElementById('backdrop');
const copyBtn = document.getElementById('copyBtn');
const highlightBtn = document.getElementById('highlightBtn');
const shareBtn = document.getElementById('shareBtn');

// ========== State ==========
let selectedArticle = null; // Stores the currently selected article object

// ========== Start App ==========
function init() {
  showArticles(); // Render all articles in sidebar
  addEvents();  // Add event listeners
}
init();

// ========== Show Articles in Sidebar ==========
function showArticles() {
  articleList.innerHTML = articles.map(article => `
    <div class="article-item" data-id="${article.id}">
      <div class="article-title">${article.title}</div>
      <div class="article-excerpt">${article.excerpt}</div>
    </div>
  `).join(''); // Create HTML string for each article and insert it
}

// ========== Add All Event Listeners ==========
function addEvents() {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  articleList.addEventListener('click', handleClick);
  articleList.addEventListener('dblclick', handleDoubleClick);

  backdrop.addEventListener('click', hideTooltip);
  tooltip.addEventListener('click', e => e.stopPropagation());

  copyBtn.addEventListener('click', copyContent);
  highlightBtn.addEventListener('click', highlightArticle);
  shareBtn.addEventListener('click', shareArticle);
}

// ========== Click on Article ==========
function handleClick(e) {
  const item = e.target.closest('.article-item'); // Find closest article item
  if (!item) return;

  const article = findArticle(item.dataset.id); // Get article object by ID
  if (article) {
    selectedArticle = article;
    showArticle(article); // Show article content
    setActive(item); // Highlight selected article
  }
}

// ========== Double-Click for Tooltip ==========
function handleDoubleClick(e) {
  const item = e.target.closest('.article-item');
  if (!item) return;

  const article = findArticle(item.dataset.id);
  if (article) {
    selectedArticle = article;
    showTooltip(e); // Show tooltip menu near mouse
  }
}

// ========== Find Article by ID ==========
function findArticle(id) {
  return articles.find(a => a.id === parseInt(id)); // converts dataid into string
  // returns the article object with the matching ID
  // or undefined if not found
}

// ========== Display Article Content ==========
function showArticle(article) {
  contentArea.innerHTML = `
    <div class="content-header">
      <h1 class="content-title">${article.title}</h1>
      <div class="content-meta">By ${article.author} • ${article.date}</div>
    </div>
    <div class="content-body">
      <p>${article.content}</p>
    </div>
  `;
}

// ========== Highlight Active Article ==========
function setActive(activeItem) {
  document.querySelectorAll('.article-item').forEach(item => {
    item.classList.remove('active'); // Remove active class from all
  });
  activeItem.classList.add('active'); // Add active to selected one
}

// ========== Show Tooltip ==========
function showTooltip(e) {
  const pos = e.target.getBoundingClientRect(); // Get position of clicked element
  tooltip.style.left = `${pos.left + window.scrollX}px`; // Position tooltip horizontally
  tooltip.style.top = `${pos.bottom + window.scrollY + 10}px`; // Position below element
  tooltip.classList.add('active');
  backdrop.classList.add('active');
}

// ========== Hide Tooltip ==========
function hideTooltip() {
  tooltip.classList.remove('active');
  backdrop.classList.remove('active');
  selectedArticle = null; // Reset selection  
}

// ========== Copy Article ==========
function copyContent() {
  if (!selectedArticle) return;

  const text = `${selectedArticle.title}\n\n${selectedArticle.content}`;
  navigator.clipboard.writeText(text) // Try modern clipboard API
    .then(() => showToast('Copied to clipboard!'))
    .catch(() => { // ensuring text is copied in every possible way
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Copied to clipboard!');
    });

  hideTooltip();
}

// ========== Highlight Article ==========
function highlightArticle() {
  if (!selectedArticle) return;

  const item = document.querySelector(`[data-id="${selectedArticle.id}"]`);
  item?.classList.add('highlighted'); // Add CSS class for animation
  setTimeout(() => item?.classList.remove('highlighted'), 2000); // Remove after 2s
  showToast('Article highlighted!');
  hideTooltip();
}

// ========== Share Article ==========
function shareArticle() {
  if (!selectedArticle) return;

  const data = {
    title: selectedArticle.title,
    text: selectedArticle.excerpt,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(data); // Use native share dialog on mobile
  } else {
    const link = `${data.title}\n${data.text}\n\n${data.url}`;
    navigator.clipboard.writeText(link).then(() => {
      showToast('Share link copied!');
    });
  }

  hideTooltip();
}

// ========== Show Toast Message ==========
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Slide in toast
  setTimeout(() => toast.style.transform = 'translateX(0)', 100);
  // Slide out and remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
