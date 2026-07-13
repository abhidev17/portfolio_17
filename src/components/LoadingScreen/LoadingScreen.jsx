import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const steps = [
      { target: 30, delay: 200 },
      { target: 60, delay: 400 },
      { target: 85, delay: 600 },
      { target: 100, delay: 900 },
    ];

    let timeout;
    steps.forEach(({ target, delay }) => {
      timeout = setTimeout(() => setProgress(target), delay);
    });

    const phaseTimer1 = setTimeout(() => setPhase(1), 300);
    const phaseTimer2 = setTimeout(() => setPhase(2), 700);
    const completeTimer = setTimeout(() => onComplete(), 1800);

    return () => {
      clearTimeout(timeout);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const letters = "Abhidev Mohan".split("");

  return (
    <AnimatePresence>
      <motion.div
        className={styles.loader}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Background gradient blobs */}
        <div className={styles.blob1} />
        <div className={styles.blob2} />

        {/* Grid pattern */}
        <div className={styles.grid} />

        {/* Main content */}
        <div className={styles.content}>
          {/* Logo mark */}
          <motion.div
            className={styles.logoMark}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <span>A</span>
          </motion.div>

          {/* Animated name */}
          <div className={styles.nameContainer}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className={`${styles.letter} ${letter === ' ' ? styles.space : ''}`}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.05,
                  ease: "backOut"
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Role text */}
          <motion.p
            className={styles.role}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <motion.span
              className={styles.progressText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}%
            </motion.span>
          </div>

          {/* Loading dots */}
          <div className={styles.dots}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className={styles.dot}
                animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
              />
            ))}
          </div>
        </div>

        {/* Corner decorations */}
        <div className={styles.cornerTL} />
        <div className={styles.cornerBR} />
      </motion.div>
    </AnimatePresence>
  );
}