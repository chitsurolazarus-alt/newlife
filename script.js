// Image configuration
const youthImages = ['youth1.jpg', 'youth2.jpg', 'youth3.jpg', 'youth4.jpg', 'youth5.jpg'];
const ministryImages = ['ministry1.jpg', 'ministry2.jpg', 'ministry3.jpg', 'ministry4.jpg'];
const couplesImages = Array.from({ length: 16 }, (_, i) => `couple${i + 1}.jpg`);

// Create galleries
function createGallery(containerId, imageList, folder) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  imageList.forEach(img => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    const image = document.createElement('img');
    image.src = `images/${folder}/${img}`;
    image.onerror = () => {
      image.src = `https://placehold.co/400x300/1D4ED8/white?text=${folder}`;
    };
    image.alt = `${folder} gallery`;
    image.loading = 'lazy';
    div.appendChild(image);
    
    div.addEventListener('click', () => {
      const lb = document.getElementById('lightbox');
      const lbImg = document.getElementById('lightbox-img');
      lbImg.src = image.src;
      lb.classList.add('active');
    });
    
    container.appendChild(div);
  });
}

// Hide loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loadingScreen');
    if (loader) loader.classList.add('hide');
  }, 1500);
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create galleries
  createGallery('youthGallery', youthImages, 'youth');
  createGallery('ministryGallery', ministryImages, 'ministry');
  createGallery('couplesGallery', couplesImages, 'couples');

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.querySelector('.close-lightbox');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  // Scroll reveal with Intersection Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => observer.observe(el));

  // Progress bar on scroll
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // Button event handlers
  const joinBtn = document.getElementById('joinUsBtn');
  const learnBtn = document.getElementById('learnMoreBtn');
  const salvationBtn = document.getElementById('salvationBtn');

  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      alert('🙏 Welcome! Join us this Sunday. For service times, please contact our branch near you.');
    });
  }

  if (learnBtn) {
    learnBtn.addEventListener('click', () => {
      alert('📞 Contact us: South Africa +27 (0) 123 456 789 | Zimbabwe +263 123 456 789');
    });
  }

  if (salvationBtn) {
    salvationBtn.addEventListener('click', () => {
      alert('❤️ Thank you for taking this step! A pastor will reach out to you within 24 hours. God bless you abundantly!');
    });
  }

  // Parallax effect on hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      hero.style.backgroundPosition = `${50 + x * 0.1}% ${50 + y * 0.1}%`;
    });
  }

  // Particle background animation
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * 1.5 + 0.3;
        this.opacity = Math.random() * 0.6;
      }
      update() {
        this.y -= this.speedY;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity * 0.5})`;
        ctx.fill();
      }
    }
    
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }
    
    function animateParticles() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
  }

  // Add hover effect for ministry cards (dynamic ones)
  document.querySelectorAll('.ministry-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.08)';
      this.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
      this.style.color = 'white';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.background = 'white';
      this.style.color = '#1E293B';
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});