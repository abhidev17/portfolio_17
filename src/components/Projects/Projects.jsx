import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch, FiGrid, FiLayers } from 'react-icons/fi';
import { projects, projectCategories } from '../../data/projects';
import styles from './Projects.module.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const [filter,  setFilter]  = useState('All');
  const [search,  setSearch]  = useState('');
  const [hovered, setHovered] = useState(null);

  const filtered = projects.filter(p => {
    const matchCat = filter === 'All' || p.category.includes(filter);
    const matchSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="section">
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
            <FiGrid size={12} /> My Work
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>Featured Projects</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Real-world applications built with modern tech stacks and clean architecture.
          </motion.p>
        </motion.div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Search */}
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              className={styles.searchInput}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className={styles.filterRow}>
            {projectCategories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div className={styles.grid} layout>
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  isHovered={hovered === project.id}
                  onHover={() => setHovered(project.id)}
                  onLeave={() => setHovered(null)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <p>No projects found. Try a different search or filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isHovered, onHover, onLeave }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${project.featured ? styles.featured : ''}`}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-color': project.color }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className={styles.featuredBadge}>
          ⭐ Featured
        </div>
      )}

      {/* Top Section */}
      <div className={styles.cardTop}>
        <div className={styles.projectIcon}>{project.icon}</div>
        <div className={styles.projectMeta}>
          <span
            className={styles.statusBadge}
            style={{
              background: project.status === 'Live'
                ? 'rgba(34, 197, 94, 0.15)'
                : 'rgba(99, 102, 241, 0.15)',
              color: project.status === 'Live' ? '#22c55e' : '#6366f1',
            }}
          >
            {project.status === 'Live' ? '🟢' : '✅'} {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        {/* Features */}
        <div className={styles.features}>
          {project.features.map(f => (
            <span key={f} className={styles.feature}>✓ {f}</span>
          ))}
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.cardActions}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionBtn}
        >
          <FiGithub size={15} />
          <span>Code</span>
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionBtn} ${styles.liveBtn}`}
          >
            <FiExternalLink size={15} />
            <span>Live Demo</span>
          </a>
        )}
      </div>

      {/* Glow overlay */}
      <div className={styles.cardGlow} style={{ background: project.color }} />
    </motion.div>
  );
}