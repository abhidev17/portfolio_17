import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      className={styles.toggle}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className={styles.track}
        animate={{ background: theme === 'dark' ? 'rgba(99,102,241,0.15)' : 'rgba(251,191,36,0.15)' }}
      >
        <motion.div
          className={styles.thumb}
          animate={{ x: theme === 'dark' ? 0 : 26 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {theme === 'dark' ? (
            <FiMoon size={12} color="#6366f1" />
          ) : (
            <FiSun size={12} color="#f59e0b" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}