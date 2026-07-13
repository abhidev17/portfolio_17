# 🚀 Abhidev Mohan – Portfolio

> An award-worthy, premium personal portfolio built with **React 19 + Vite**, featuring glassmorphism, Framer Motion animations, GitHub stats, 3D tilt project cards, particle backgrounds, and much more.

[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=for-the-badge)](https://abhidev17.github.io/portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-abhidev17-333?style=for-the-badge&logo=github)](https://github.com/abhidev17)

---

## ✨ Features

### 🎨 Design
- Dark / Light mode toggle
- Glassmorphism & Neumorphism design language
- Animated gradient backgrounds + noise texture
- Custom cursor with magnetic hover effects
- Framer Motion page transitions & scroll reveals
- Fully responsive (mobile, tablet, laptop, desktop)

### 🧩 Sections
| Section | Features |
|---|---|
| **Hero** | Typing animation, animated terminal, floating tech icons, particles, social links |
| **About** | Profile card, education timeline, interest tags, animated counters |
| **Skills** | Linear + circular progress bars, category filter |
| **Projects** | 3D tilt cards, search, filter by technology, glow effects |
| **GitHub Stats** | Contribution calendar, stats cards, streak, top languages |
| **Timeline** | Animated alternating milestones |
| **Achievements** | CountUp stats, achievement cards |
| **Testimonials** | Animated carousel with auto-play |
| **Contact** | EmailJS-ready form, social links |
| **Footer** | Visitor counter, quick links, social icons |

### ⚙️ Technical
- Custom cursor with lag effect
- Scroll-to-top with progress ring
- Scroll progress bar at top
- Background music toggle (when audio provided)
- One-click resume download
- SEO optimized (Open Graph, Twitter Cards, Structured Data)
- sitemap.xml + robots.txt
- Lighthouse score 95+

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, Vite 5 |
| Animations | Framer Motion 11 |
| Icons | React Icons 5 |
| Particles | tsParticles |
| Typing | React Type Animation |
| Progress | React Circular Progressbar |
| Calendar | React GitHub Calendar |
| Counter | React CountUp |
| Email | EmailJS Browser |
| Styles | Pure CSS Modules |

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/abhidev17/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📧 EmailJS Setup

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service and template
3. In `src/components/Contact/Contact.jsx`, replace:
   - `YOUR_SERVICE_ID` → your EmailJS service ID
   - `YOUR_TEMPLATE_ID` → your template ID
   - `YOUR_PUBLIC_KEY` → your public key

---

## 🎵 Background Music (Optional)

Place an `mp3` file at `public/music.mp3` — the music toggle will appear automatically in the navbar.

---

## 📄 Resume

Place your PDF resume at `public/resume.pdf` to enable one-click download.

---

## 📦 Deployment

### GitHub Pages
```bash
npm run build
# Copy contents of /dist to your gh-pages branch
# Or use gh-pages package:
npm install -D gh-pages
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
npm run deploy
```

### Vercel / Netlify
Simply connect your GitHub repo — auto-deploy on push.

---

## 📁 Project Structure