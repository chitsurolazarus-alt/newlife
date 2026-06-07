// Image configuration
const youthImages = ['youth1.jpg', 'youth2.jpg', 'youth3.jpg', 'youth4.jpg', 'youth5.jpg'];
const ministryImages = ['ministry1.jpg', 'ministry2.jpg', 'ministry3.jpg', 'ministry4.jpg'];
const couplesImages = Array.from({ length: 16 }, (_, i) => `couple${i + 1}.jpg`);

// Congregation data - ZIMBABWE (25+ congregations)
const zimbabweCongregations = [
  { name: "Masvingo City", pastor: "Pastor Kapeta & Mrs", phones: ["+263712432191", "+263771062191"] },
  { name: "Muchakata", pastor: "Pastor & Mrs Mpofu", phones: ["+263784340632", "+263774144504"] },
  { name: "Topora", pastor: "Pastor G & Mrs Mudakuvaka", phones: ["+263779442590"] },
  { name: "Topora (Alt)", pastor: "Pastor Alfred Muudakuvaka", phones: ["+263771205225"] },
  { name: "Sanagwe", pastor: "Overseer James Maravanyika & Mrs", phones: ["+263783765505", "+263777565537"] },
  { name: "Getu", pastor: "Pastor & Mrs Chiphuva", phones: ["+263776614588"] },
  { name: "Zimuto", pastor: "Elder Gova & Mrs", phones: ["+263775499904"] },
  { name: "Zimuto (Alt)", pastor: "Evangelist Gova & Mrs", phones: ["+263773415219"] },
  { name: "Mashava", pastor: "Pastor & Mrs", phones: ["+263775383108", "+263774386920"] },
  { name: "Zvishavani", pastor: "Pastor & Mrs Nhidza", phones: ["+263772488078", "+263773832935"] },
  { name: "Chisumbanje", pastor: "Pastor & Mrs Bella", phones: ["+263771871162", "+263778352233"] },
  { name: "Cheche", pastor: "Pastor & Mrs Nyambirai", phones: ["+263776088701", "+263784091571"] },
  { name: "Boroma", pastor: "Pastor & Mrs Chitambira", phones: ["+263788316571"] },
  { name: "Nemamwa Curos", pastor: "Pastor & Mrs Cheure", phones: ["+263774049779"] },
  { name: "Mapakomhere", pastor: "Pastor & Mrs Mashavakure", phones: ["+263789648482", "+263775089472"] },
  { name: "Chivi", pastor: "Mr Reply Marufu", phones: ["+263788906946", "+263786039356"] },
  { name: "Gwatuta", pastor: "Pastor & Mrs Fushai Junior", phones: ["+263773523210", "+263776249249"] },
  { name: "Deure", pastor: "Pastor & Mrs", phones: ["+263773705961"] },
  { name: "Daitai", pastor: "Alfred Mudakuvaka", phones: ["+263771205225"] },
  { name: "Makwau", pastor: "Elder Marandu", phones: ["+263774994848", "+27844077751"] },
  { name: "Bath Farm", pastor: "Deacon Nemukuyu", phones: ["+263774747714"] },
  { name: "Nhema", pastor: "Pastor & Mrs Sviure", phones: ["+263771224554", "+263774518619", "+263776172563"] }
];

// Congregation data - SOUTH AFRICA
const southAfricaCongregations = [
  { name: "Polokwane", pastor: "Elder Hlangan & Mrs", phones: ["+27833633678", "+27717924781"] },
  { name: "Polokwane (Alt)", pastor: "Elder Mutanda", phones: ["+27785141744"] }
];

// Function to create congregation cards
function createCongregationCards(containerId, congregations) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container not found:", containerId);
    return;
  }
  
  congregations.forEach(cong => {
    const card = document.createElement('div');
    card.className = 'congregation-card reveal';
    
    const phonesHtml = cong.phones.map(phone => 
      `<a href="tel:${phone}">📞 ${phone}</a>`
    ).join('');
    
    card.innerHTML = `
      <h4>🏛️ ${cong.name}</h4>
      <p><strong>👤 ${cong.pastor}</strong></p>
      <div class="contact-numbers">
        ${phonesHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

// Create gallery function
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
  console.log("DOM loaded - creating galleries and congregations");
  
  // Create galleries
  createGallery('youthGallery', youthImages, 'youth');
  createGallery('ministryGallery', ministryImages, 'ministry');
  createGallery('couplesGallery', couplesImages, 'couples');
  
  // Create congregation cards
  createCongregationCards('zimbabweCongregations', zimbabweCongregations);
  createCongregationCards('southAfricaCongregations', southAfricaCongregations);

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
      alert('📞 Contact us:\n\n🇿🇼 Zimbabwe: +263 712 432 191\n🇿🇦 South Africa: +27833633678');
    });
  }

  // UPDATED: Salvation button - asks user to call instead of fake email promise
  if (salvationBtn) {
    salvationBtn.addEventListener('click', () => {
      const userChoice = confirm('🙏 We are excited about your decision!\n\nWould you like to speak with a pastor directly?\n\nClick OK to see our contact numbers.\nClick Cancel to continue browsing.');
      
      if (userChoice) {
        // Show contact options in a more detailed way
        const contactMessage = "📞 Please call any of these numbers to speak with a pastor:\n\n" +
          "🇿🇼 ZIMBABWE:\n" +
          "• Pastor Kapeta: +263 712 432 191\n" +
          "• Pastor Mpofu: +263 784 340 632\n" +
          "• Overseer Maravanyika: +263 783 765 505\n\n" +
          "🇿🇦 SOUTH AFRICA:\n" +
          "• Elder Hlangan: +27 83 363 3678\n" +
          "• Elder Mutanda: +27 78 514 1744\n\n" +
          "🙌 God bless you! We look forward to praying with you.";
        
        alert(contactMessage);
      } else {
        alert("🙏 We'll be praying for you! Feel free to call us anytime. God bless you!");
      }
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

  // Add hover effect for ministry cards
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