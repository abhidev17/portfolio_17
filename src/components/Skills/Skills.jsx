import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiZap } from 'react-icons/fi';
import { skillCategories } from '../../data/skills';
import styles from './Skills.module.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  const [active, setActive] = useState('all');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = active === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.id === active);

  return (
    <section id="skills" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
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
            <FiZap size={12} /> Tech Stack
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>Skills & Expertise</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Technologies and tools I work with to build modern, scalable applications.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <div className={styles.filterRow}>
          <button
            className={`${styles.filterBtn} ${active === 'all' ? styles.active : ''}`}
            onClick={() => setActive('all')}
          >
            All
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${active === cat.id ? styles.active : ''}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={styles.grid} ref={ref}>
          <AnimatePresence mode="popLayout">
            {filtered.map((category, ci) => (
              <motion.div
                key={category.id}
                className={`${styles.categoryCard} glass-card`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: ci * 0.05 }}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <h3 className={styles.categoryTitle} style={{ color: category.color }}>
                    {category.title}
                  </h3>
                </div>

                {/* Linear Progress Bars */}
                <div className={styles.skillsList}>
                  {category.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      inView={inView}
                      delay={ci * 0.1 + si * 0.08}
                      color={category.color}
                    />
                  ))}
                </div>

                {/* Circular indicators for top 2 skills */}
                {category.skills.length >= 2 && (
                  <div className={styles.circleRow}>
                    {category.skills.slice(0, 2).map((skill) => (
                      <div key={skill.name} className={styles.circleItem}>
                        <div className={styles.circleWrap}>
                          <CircularProgressbar
                            value={inView ? skill.level : 0}
                            text={`${skill.level}%`}
                            styles={buildStyles({
                              pathColor: category.color,
                              textColor: category.color,
                              trailColor: 'rgba(255,255,255,0.06)',
                              textSize: '24px',
                              pathTransitionDuration: 1.5,
                            })}
                          />
                        </div>
                        <span className={styles.circleName}>
                          {skill.icon} {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, inView, delay, color }) {
  const { ref, inView: visible } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className={styles.skillItem} ref={ref}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>
          <span>{skill.icon}</span> {skill.name}
        </span>
        <span className={styles.skillLevel}>{skill.level}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: (visible || inView) ? `${skill.level}%` : '0%' }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
        <div
          className={styles.barGlow}
          style={{
            width: (visible || inView) ? `${skill.level}%` : '0%',
            background: color,
            transition: `width 1.2s ${delay}s ease-out`,
          }}
        />
      </div>
    </div>
  );
}