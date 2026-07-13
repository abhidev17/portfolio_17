export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function isMobile() {
  return window.innerWidth <= 768;
}