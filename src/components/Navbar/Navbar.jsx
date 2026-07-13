import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import MusicToggle from '../MusicToggle/MusicToggle';
import styles from './Navbar.module.css';

const navLinks = [
  { id: 'hero',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'github',       label: 'GitHub' },
  { id: 'timeline',     label: 'Timeline' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact',      label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link to="hero" smooth spy offset={-80} className={styles.logo}>
            <span className={styles.logoBracket}>&lt;</span>
            <span className={styles.logoText}>Abhidev</span>
            <span className={styles.logoBracket}>/&gt;</span>
          </Link>

          {/* Desktop Links */}
          <ul className={styles.links}>
            {navLinks.map(link => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth
                  spy
                  offset={-80}
                  duration={600}
                  className={styles.link}
                  activeClass={styles.linkActive}
                  onSetActive={() => setActiveLink(link.id)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Controls */}
          <div className={styles.controls}>
            <MusicToggle />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            
          <a    href="/resume.pdf"
              download="Abhidev_Mohan_Resume.pdf"
              className={`${styles.resumeBtn} btn-primary`}
            >
              <span>Resume</span>
            </a>
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className={styles.drawerHeader}>
                <span className={styles.logoText} style={{ fontSize: '1.2rem' }}>Menu</span>
                <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <FiX size={22} />
                </button>
              </div>
              <ul className={styles.drawerLinks}>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.id}
                      smooth
                      offset={-80}
                      duration={600}
                      className={styles.drawerLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className={styles.drawerControls}>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <a
                  href="/resume.pdf"
                  download="Abhidev_Mohan_Resume.pdf"
                  className="btn-primary"
                  style={{ fontSize: '0.9rem', padding: '10px 24px' }}
                >
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}