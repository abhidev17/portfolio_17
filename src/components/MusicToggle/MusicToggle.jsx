import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMusic, FiVolumeX } from 'react-icons/fi';
import styles from './MusicToggle.module.css';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if music file exists
    fetch('/music.mp3', { method: 'HEAD' })
      .then(r => { if (r.ok) setAvailable(true); })
      .catch(() => {});
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} loop src="/music.mp3" preload="none" />
      <motion.button
        className={`${styles.btn} ${playing ? styles.active : ''}`}
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute music' : 'Play ambient music'}
      >
        {playing ? (
          <>
            <FiMusic size={14} />
            <div className={styles.bars}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.bar} style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </>
        ) : (
          <FiVolumeX size={14} />
        )}
      </motion.button>
    </>
  );
}