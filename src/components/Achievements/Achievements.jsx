import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FiAward } from 'react-icons/fi';
import { achievements, achievementCards } from '../../data/achievements';
import styles from './Achievements.module.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="achievements" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
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
            <FiAward size={12} /> Wins
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>Achievements</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Milestones and accomplishments in my coding journey.
          </motion.p>
        </motion.div>

        {/* Counter Stats */}
        <div className={styles.countersRow} ref={ref}>
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.counterCard}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -6 }}
            >
              <span className={styles.counterIcon}>{item.icon}</span>
              <span className={styles.counterValue} style={{ color: item.color }}>
                {inView ? (
                  <CountUp end={item.value} duration={2.5} suffix={item.suffix} />
                ) : `0${item.suffix}`}
              </span>
              <span className={styles.counterTitle}>{item.title}</span>
              <span className={styles.counterDesc}>{item.description}</span>
              <div className={styles.cardGlow} style={{ background: item.color }} />
            </motion.div>
          ))}
        </div>

        {/* Achievement Cards */}
        <div className={styles.cardsGrid}>
          {achievementCards.map((card, i) => (
            <motion.div
              key={card.id}
              className={`${styles.achieveCard} glass-card`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div
                className={styles.achieveIconWrap}
                style={{
                  background: `${card.color}15`,
                  border: `1px solid ${card.color}30`,
                }}
              >
                <span className={styles.achieveIcon}>{card.icon}</span>
              </div>
              <div>
                <h3 className={styles.achieveTitle}>{card.title}</h3>
                <p className={styles.achieveDesc}>{card.description}</p>
              </div>
              <div
                className={styles.achieveAccent}
                style={{ background: card.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}