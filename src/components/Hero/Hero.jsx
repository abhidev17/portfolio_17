import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import {
  FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload
} from 'react-icons/fi';
import ParticlesBackground from '../ParticlesBackground/ParticlesBackground';
import { techIcons } from '../../data/skills';
import styles from './Hero.module.css';

const socialLinks = [
  { icon: FiGithub,   href: 'https://github.com/abhidev17',                          label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/abhidev-mohan-7a300934b/', label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:abhidevmohan17@gmail.com',                       label: 'Email' },
];

const terminalLines = [
  { type: 'prompt',  text: 'whoami' },
  { type: 'output',  text: 'Abhidev Mohan — Full Stack Developer' },
  { type: 'prompt',  text: 'cat skills.txt' },
  { type: 'output',  text: 'React · Node.js · Java · MongoDB · Python' },
  { type: 'prompt',  text: 'echo $STATUS' },
  { type: 'output',  text: '🟢 Open to internships & opportunities' },
  { type: 'prompt',  text: 'cat location.txt' },
  { type: 'output',  text: '📍 Kerala, India' },
];

export default function Hero({ theme }) {
  return (
    <section id="hero" className={styles.hero}>
      <ParticlesBackground theme={theme} />

      {/* Background Elements */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.grid} />

      {/* Floating Tech Icons */}
      <div className={styles.floatingIcons}>
        {techIcons.map((tech, i) => (
          <motion.div
            key={tech.name}
            className={styles.floatingIcon}
            style={{
              top:  `${10 + (i * 8) % 80}%`,
              left: i % 2 === 0
                ? `${3 + (i * 6) % 15}%`
                : `${80 + (i * 4) % 15}%`,
              animationDelay: `${i * 0.3}s`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity:  { duration: 3, repeat: Infinity, delay: i * 0.3 },
              y:        { duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 },
              scale:    { duration: 0.5, delay: 0.5 + i * 0.1 },
            }}
            title={tech.name}
          >
            <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
            <span className={styles.iconLabel}>{tech.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`${styles.content} container`}>
        <div className={styles.left}>
          {/* Badge */}
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.badgeDot} />
            <span>Available for Opportunities</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            className={styles.greeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hi there, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Abhidev<br />
            <span className="gradient-text">Mohan</span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            className={styles.typingContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className={styles.typingPrefix}>I'm a </span>
            <TypeAnimation
              sequence={[
                'Full Stack Developer', 2000,
                'React Developer',      2000,
                'Java Programmer',      2000,
                'CS Engineering Student', 2000,
                'Problem Solver',       2000,
                'Open Source Learner',  2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className={styles.typingText}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Passionate CS Engineering student from Kerala, India. I build modern web apps,
            solve real-world problems, and love exploring cutting-edge technologies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link to="contact" smooth offset={-80} duration={600}>
              <button className={`btn-primary ${styles.ctaBtn}`}>
                <span>Hire Me</span>
              </button>
            </Link>
            <a
              href="/resume.pdf"
              download="Abhidev_Mohan_Resume.pdf"
              className={`btn-secondary ${styles.ctaBtn}`}
            >
              <FiDownload size={16} />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className={styles.socials}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className={styles.socialLabel}>Find me on:</span>
            <div className={styles.socialIcons}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  title={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Terminal */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Terminal lines={terminalLines} />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link to="about" smooth offset={-80} duration={600}>
          <motion.div
            className={styles.scrollBtn}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiArrowDown size={20} />
          </motion.div>
        </Link>
        <span className={styles.scrollText}>Scroll Down</span>
      </motion.div>
    </section>
  );
}

function Terminal({ lines }) {
  return (
    <div className={styles.terminal}>
      {/* Terminal Header */}
      <div className={styles.terminalHeader}>
        <div className={styles.terminalDots}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
        </div>
        <span className={styles.terminalTitle}>abhidev@portfolio ~ </span>
      </div>

      {/* Terminal Body */}
      <div className={styles.terminalBody}>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className={`${styles.terminalLine} ${styles[line.type]}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.3 }}
          >
            {line.type === 'prompt' && (
              <>
                <span className={styles.promptUser}>abhidev</span>
                <span className={styles.promptAt}>@</span>
                <span className={styles.promptHost}>portfolio</span>
                <span className={styles.promptSep}> $ </span>
                <span className={styles.promptCmd}>{line.text}</span>
              </>
            )}
            {line.type === 'output' && (
              <span className={styles.outputText}>{line.text}</span>
            )}
          </motion.div>
        ))}
        {/* Blinking cursor */}
        <motion.div
          className={styles.cursor}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className={styles.promptUser}>abhidev</span>
          <span className={styles.promptAt}>@</span>
          <span className={styles.promptHost}>portfolio</span>
          <span className={styles.promptSep}> $ </span>
          <span className={styles.cursorBlink}>▋</span>
        </motion.div>
      </div>
    </div>
  );
}