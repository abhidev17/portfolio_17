import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiMessageSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);

  const go = (dir) => {
    setDirection(dir);
    setCurrent(c => (c + dir + testimonials.length) % testimonials.length);
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  return (
    <section id="testimonials" className="section">
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
            <FiMessageSquare size={12} /> Testimonials
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>What People Say</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Feedback from mentors, peers, and collaborators.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className={styles.carousel}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              className={`${styles.card} glass-card`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Quote mark */}
              <div className={styles.quoteMark}>"</div>

              {/* Stars */}
              <div className={styles.stars}>
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <FiStar key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
                ))}
              </div>

              <p className={styles.text}>{testimonials[current].text}</p>

              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: testimonials[current].color }}
                >
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className={styles.name}>{testimonials[current].name}</div>
                  <div className={styles.role}>
                    {testimonials[current].role} · {testimonials[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className={styles.controls}>
            <button className={styles.navBtn} onClick={() => go(-1)} aria-label="Previous">
              <FiChevronLeft size={20} />
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); resetInterval(); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className={styles.navBtn} onClick={() => go(1)} aria-label="Next">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* All cards mini-grid */}
        <div className={styles.allCards}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className={`${styles.miniCard} ${i === current ? styles.miniActive : ''}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); resetInterval(); }}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.miniAvatar} style={{ background: t.color }}>
                {t.avatar}
              </div>
              <div>
                <div className={styles.miniName}>{t.name}</div>
                <div className={styles.miniRole}>{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}