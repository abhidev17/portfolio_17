import { motion } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';
import { FiGithub, FiStar, FiGitCommit, FiFolder } from 'react-icons/fi';
import styles from './GithubStats.module.css';

const USERNAME = 'abhidev17';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const statCards = [
  {
    label: 'GitHub Profile',
    icon: FiGithub,
    color: '#6366f1',
    imgSrc: `https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=6366f1&text_color=94a3b8&icon_color=06b6d4`,
    alt: 'GitHub Stats',
  },
  {
    label: 'Top Languages',
    icon: FiFolder,
    color: '#06b6d4',
    imgSrc: `https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=6366f1&text_color=94a3b8`,
    alt: 'Top Languages',
  },
  {
    label: 'GitHub Streak',
    icon: FiGitCommit,
    color: '#8b5cf6',
    imgSrc: `https://github-readme-streak-stats.herokuapp.com?user=${USERNAME}&theme=dark&hide_border=true&ring=6366f1&fire=ec4899&currStreakLabel=06b6d4&background=00000000`,
    alt: 'GitHub Streak',
  },
];

export default function GithubStats() {
  return (
    <section id="github" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span className="section-tag" variants={fadeUp}>
            <FiGithub size={12} /> Open Source
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>GitHub Activity</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            My contributions, streaks, and coding activity on GitHub.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={`${styles.statCard} glass-card`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className={styles.cardHeader}>
                <card.icon size={16} style={{ color: card.color }} />
                <span className={styles.cardLabel}>{card.label}</span>
              </div>
              <div className={styles.imgWrapper}>
                <img
                  src={card.imgSrc}
                  alt={card.alt}
                  className={styles.statImg}
                  loading="lazy"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.fallback} style={{ display: 'none' }}>
                  <card.icon size={32} style={{ color: card.color, opacity: 0.5 }} />
                  <span>Stats unavailable offline</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Calendar */}
        <motion.div
          className={`${styles.calendarCard} glass-card`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={styles.calendarHeader}>
            <FiGitCommit size={16} style={{ color: '#6366f1' }} />
            <h3 className={styles.calendarTitle}>Contribution Calendar</h3>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.profileLink}
            >
              View Profile →
            </a>
          </div>
          <div className={styles.calendarWrap}>
            <GitHubCalendar
              username={USERNAME}
              colorScheme="dark"
              theme={{
                dark: ['#0d1117', '#1e1b4b', '#3730a3', '#4f46e5', '#6366f1'],
              }}
              fontSize={12}
              blockSize={14}
              blockMargin={4}
              labels={{
                tooltip: '<strong>{{count}} contributions</strong> on {{date}}',
              }}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FiGithub size={16} />
            <span>View GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}