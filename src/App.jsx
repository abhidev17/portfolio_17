import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoadingScreen  from './components/LoadingScreen/LoadingScreen';
import CustomCursor   from './components/CustomCursor/CustomCursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import BackToTop      from './components/BackToTop/BackToTop';
import Navbar         from './components/Navbar/Navbar';
import Hero           from './components/Hero/Hero';
import About          from './components/About/About';
import Skills         from './components/Skills/Skills';
import Projects       from './components/Projects/Projects';
import GithubStats    from './components/GithubStats/GithubStats';
import Timeline       from './components/Timeline/Timeline';
import Achievements   from './components/Achievements/Achievements';
import Testimonials   from './components/Testimonials/Testimonials';
import Contact        from './components/Contact/Contact';
import Footer         from './components/Footer/Footer';
import { useTheme }   from './hooks/useTheme';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  // Prevent flash of un-themed content
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          key="app"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          <CustomCursor />
          <ScrollProgress />
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main>
            <Hero theme={theme} />
            <About />
            <Skills />
            <Projects />
            <GithubStats />
            <Timeline />
            <Achievements />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </>
  );
}