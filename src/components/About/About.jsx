import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useIntersect } from 'react-intersection-observer';
import {
  FiCode, FiGlobe, FiCpu, FiGithub,
  FiMail, FiPhone, FiMapPin, FiBook
} from 'react-icons/fi';
import styles from './About.module.css';

const interests = [
  { icon: '⚛️', label: 'React & Frontend' },
  { icon: '🟢', label: 'Node.js Backend' },
  { icon: '☕', label: 'Java & OOP' },
  { icon: '🤖', label: 'Machine Learning' },
  { icon: '🌍', label: 'Open Source' },
  { icon: '🎨', label: 'UI/UX Design' },
  { icon: '🧩', label: 'Problem Solving' },
  { icon: '🗄️', label: 'Databases' },
];

const stats = [
  { value: 4,  suffix: '+', label: 'Projects Built',      color: '#6366f1' },
  { value: 94, suffix: '%', label: 'Academic Score',      color: '#06b6d4' },
  { value: 10, suffix: '+', label: 'Technologies',        color: '#8b5cf6' },
  { value: 1,  suffix: '+', label: 'Years of Coding',     color: '#ec4899' },
];

const info = [
  { icon: FiMapPin, label: 'Location', value: 'Kerala, India' },
  { icon: FiMail,   label: 'Email',    value: 'abhidevmohan17@gmail.com' },
  { icon: FiPhone,  label: 'Phone',    value: '+91 8590413576' },
  { icon: FiBook,   label: 'Degree',   value: 'B.Tech CSE – SJCET Palai' },
  { icon: FiGithub, label: 'GitHub',   value: 'github.com/abhidev17', link: 'https://github.com/abhidev17' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { ref: statsRef, inView: statsVisible } = useIntersect({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="about" className="section">
      <div className={`container ${styles.wrapper}`}>
        {/* Header */}
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span className="section-tag" variants={fadeUp}>
            <FiCode size={12} /> About Me
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Who Am I?
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            A passionate CS student building real-world solutions with modern web technologies.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <div className={styles.statsRow} ref={statsRef}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <span className={styles.statValue} style={{ color: stat.color }}>
                {statsVisible ? (
                  <CountUp end={stat.value} duration={2} delay={0.5} suffix={stat.suffix} />
                ) : `0${stat.suffix}`}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statGlow} style={{ background: stat.color }} />
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className={styles.grid} ref={ref}>
          {/* Left – Bio */}
          <motion.div
            className={styles.bioCard}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Avatar */}
            <div className={styles.avatarContainer}>
              <div className={styles.avatarRing} />
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>AM</span>
                <div className={styles.avatarGradient} />
              </div>
              {/* Status badge */}
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span>Open to Work</span>
              </div>
            </div>

            <div className={styles.bioText}>
              <h3 className={styles.bioName}>Abhidev Mohan</h3>
              <p className={styles.bioRole}>Full Stack Developer · CS Engineering Student</p>
              <p className={styles.bioDesc}>
                I'm a passionate Computer Science Engineering student who loves building
                modern web applications, solving real-world problems, and exploring new
                technologies. From Kerala, India — always curious, always building.
              </p>
              <p className={styles.bioDesc}>
                My journey in tech began with Java and problem solving, and has grown into
                a love for full-stack development with the MERN stack. I believe in writing
                clean, scalable code and creating impactful user experiences.
              </p>
            </div>

            {/* Contact Info */}
            <div className={styles.infoList}>
              {info.map(({ icon: Icon, label, value, link }) => (
                <div key={label} className={styles.infoItem}>
                  <div className={styles.infoIconWrap}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>{label}</span>
                    {link ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.infoValueLink}>
                        {value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Education + Interests */}
          <div className={styles.rightCol}>
            {/* Education */}
            <motion.div
              className={`${styles.card} glass-card`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.cardTitle}>
                <FiBook size={16} /> Education
              </h3>
              <div className={styles.eduList}>
                <div className={styles.eduItem}>
                  <div className={styles.eduIcon}>🎓</div>
                  <div>
                    <h4 className={styles.eduTitle}>B.Tech – Computer Science Engineering</h4>
                    <p className={styles.eduOrg}>SJCET Palai, Kerala</p>
                    <p className={styles.eduYear}>2024 – Present</p>
                  </div>
                  <span className={styles.eduBadge}>Current</span>
                </div>
                <div className={styles.eduItem}>
                  <div className={styles.eduIcon}>🏫</div>
                  <div>
                    <h4 className={styles.eduTitle}>Higher Secondary (Science – CS)</h4>
                    <p className={styles.eduOrg}>NSS HSS Kallara</p>
                    <p className={styles.eduYear}>2022 – 2023</p>
                  </div>
                  <span className={styles.eduBadge} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                    94%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              className={`${styles.card} glass-card`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className={styles.cardTitle}>
                <FiCpu size={16} /> Interests
              </h3>
              <div className={styles.interests}>
                {interests.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className={styles.interestTag}
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className={`${styles.card} glass-card`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className={styles.cardTitle}>
                <FiGlobe size={16} /> Quick Links
              </h3>
              <div className={styles.quickLinks}>
                <a href="https://github.com/abhidev17" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                  <FiGithub /> GitHub Profile
                </a>
                <a href="https://www.linkedin.com/in/abhidev-mohan-7a300934b/" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                  <FiGlobe /> LinkedIn Profile
                </a>
                <a href="mailto:abhidevmohan17@gmail.com" className={styles.quickLink}>
                  <FiMail /> Send Email
                </a>
                <a href="/resume.pdf" download="Abhidev_Mohan_Resume.pdf" className={styles.quickLink}>
                  📄 Download Resume
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}