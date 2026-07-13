import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from 'react-icons/fi';
import { useVisitorCount } from '../../hooks/useVisitorCount';
import styles from './Footer.module.css';

const footerLinks = [
  { id: 'hero',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'github',       label: 'GitHub' },
  { id: 'timeline',     label: 'Timeline' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact',      label: 'Contact' },
];

const socials = [
  { icon: FiGithub,   href: 'https://github.com/abhidev17',                          label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/abhidev-mohan-7a300934b/', label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:abhidevmohan17@gmail.com',                       label: 'Email' },
];

export default function Footer() {
  const visitorCount = useVisitorCount();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className={`container ${styles.inner}`}>
        {/* Top */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="hero" smooth className={styles.logo}>
              <span className={styles.logoBracket}>&lt;</span>
              <span className={styles.logoText}>Abhidev</span>
              <span className={styles.logoBracket}>/&gt;</span>
            </Link>
            <p className={styles.tagline}>
              Computer Science Engineering Student<br />
              Full Stack Developer · Kerala, India
            </p>
            <div className={styles.socialRow}>
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.navList}>
              {footerLinks.map(link => (
                <li key={link.id}>
                  <Link
                    to={link.id}
                    smooth
                    offset={-80}
                    duration={600}
                    className={styles.navLink}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactList}>
              <a href="mailto:abhidevmohan17@gmail.com" className={styles.contactItem}>
                <FiMail size={14} /> abhidevmohan17@gmail.com
              </a>
              <a href="tel:+918590413576" className={styles.contactItem}>
                📞 +91 8590413576
              </a>
              <span className={styles.contactItem}>
                📍 Kerala, India
              </span>
              <a
                href="/resume.pdf"
                download="Abhidev_Mohan_Resume.pdf"
                className={styles.contactItem}
              >
                📄 Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Abhidev Mohan. All rights reserved.
          </p>
          <div className={styles.bottomRight}>
            {/* Visitor Counter */}
            <div className={styles.visitorCount}>
              <span className={styles.visitorDot} />
              <span>{visitorCount.toLocaleString()} visitor{visitorCount !== 1 ? 's' : ''}</span>
            </div>
            <p className={styles.madeWith}>
              Made with <FiHeart size={12} style={{ color: '#ec4899', display: 'inline', verticalAlign: 'middle' }} /> and <FiCode size={12} style={{ color: '#6366f1', display: 'inline', verticalAlign: 'middle' }} /> using React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}