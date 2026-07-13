import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiMail, FiMapPin, FiPhone, FiSend,
  FiGithub, FiLinkedin, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import styles from './Contact.module.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const contactInfo = [
  { icon: FiMail,   label: 'Email',    value: 'abhidevmohan17@gmail.com', href: 'mailto:abhidevmohan17@gmail.com' },
  { icon: FiPhone,  label: 'Phone',    value: '+91 8590413576',           href: 'tel:+918590413576' },
  { icon: FiMapPin, label: 'Location', value: 'Kerala, India',            href: null },
];

const socialLinks = [
  { icon: FiGithub,   href: 'https://github.com/abhidev17',                           label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/abhidev-mohan-7a300934b/',  label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:abhidevmohan17@gmail.com',                        label: 'Email' },
];

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      // Replace with your EmailJS credentials
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="section">
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
            <FiMail size={12} /> Get In Touch
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>Let's Connect</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Have an opportunity, project idea, or just want to say hello?
            My inbox is always open!
          </motion.p>
        </motion.div>

        <div className={styles.grid}>
          {/* Left – Info */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <p className={styles.infoText}>
                I'm currently open to internships and full-time opportunities.
                Whether you have a question, project idea, or just want to connect —
                feel free to reach out!
              </p>

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className={styles.infoItem}>
                  <div className={styles.infoIconWrap}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>{label}</span>
                    {href ? (
                      <a href={href} className={styles.infoValue}>{value}</a>
                    ) : (
                      <span className={styles.infoValue}>{value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className={styles.socials}>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>

              {/* Decorative blob */}
              <div className={styles.blob} />
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className={`${styles.form} glass-card`} noValidate>
              <h3 className={styles.formTitle}>Send a Message</h3>

              <div className={styles.row}>
                <FormField
                  name="name"
                  label="Full Name"
                  placeholder="Abhidev Mohan"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  focused={focused}
                  setFocused={setFocused}
                  required
                />
                <FormField
                  name="email"
                  label="Email Address"
                  placeholder="hello@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  focused={focused}
                  setFocused={setFocused}
                  required
                />
              </div>

              <FormField
                name="subject"
                label="Subject"
                placeholder="Internship Opportunity / Project Collab"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                focused={focused}
                setFocused={setFocused}
              />

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className={`${styles.textarea} ${focused === 'message' ? styles.inputFocused : ''}`}
                  placeholder="Hi Abhidev, I'd love to discuss..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  rows={5}
                  required
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  className={`${styles.alert} ${styles.alertSuccess}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiCheckCircle /> Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className={`${styles.alert} ${styles.alertError}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle /> Failed to send. Please email me directly at abhidevmohan17@gmail.com
                </motion.div>
              )}

              <motion.button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={status === 'sending'}
                whileHover={{ scale: status !== 'sending' ? 1.02 : 1 }}
                whileTap={{ scale: status !== 'sending' ? 0.98 : 1 }}
              >
                {status === 'sending' ? (
                  <>
                    <div className={styles.spinner} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              <p className={styles.note}>
                📝 Note: For demo, the form uses EmailJS. Add your credentials to enable.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({ name, label, placeholder, type, value, onChange, focused, setFocused, required }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label} {required && '*'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`${styles.input} ${focused === name ? styles.inputFocused : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused('')}
        required={required}
        autoComplete={type === 'email' ? 'email' : 'off'}
      />
    </div>
  );
}