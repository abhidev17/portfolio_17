import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { timelineItems } from '../../data/timeline';
import styles from './Timeline.module.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Timeline() {
  return (
    <section id="timeline" className="section">
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
            <FiClock size={12} /> Journey
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>My Timeline</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            The milestones and experiences that shaped my development journey.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {/* Center line */}
          <div className={styles.centerLine}>
            <motion.div
              className={styles.lineProgress}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {timelineItems.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`${styles.item} ${isLeft ? styles.left : styles.right}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Content card */}
      <motion.div
        className={styles.card}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ '--item-color': item.color }}
      >
        <div className={styles.cardHeader}>
          <span className={styles.year} style={{ color: item.color }}>
            {item.year}
          </span>
          <span
            className={styles.typeBadge}
            style={{
              background: `${item.color}20`,
              color: item.color,
              border: `1px solid ${item.color}30`,
            }}
          >
            {item.type}
          </span>
        </div>

        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardOrg}>{item.organization}</p>
        <p className={styles.cardDesc}>{item.description}</p>

        <div className={styles.tags}>
          {item.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Center dot */}
      <div className={styles.dotWrapper}>
        <motion.div
          className={styles.dot}
          style={{ background: item.color, boxShadow: `0 0 20px ${item.color}60` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className={styles.dotIcon}>{item.icon}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}