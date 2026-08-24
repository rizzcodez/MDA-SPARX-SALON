/**
 * MDA Sparx Salon - Men's Beauty (Nazarathpettai, Chennai)
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initShopStatus();
  initServiceFilter();
  initBookingForm();
  initFaqAccordion();
  initSmoothScroll();
});

/* -------------------------------------------------------------
   1. Navbar & Mobile Menu
   ------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    });
  }
}

/* -------------------------------------------------------------
   2. Real-Time Shop Open/Closed Status
   ------------------------------------------------------------- */
function initShopStatus() {
  const statusBadges = document.querySelectorAll('.shop-status-indicator');
  const now = new Date();
  const currentHour = now.getHours(); // 0 to 23
  
  // Working Hours: 8:00 AM to 10:00 PM (8 to 22)
  const isOpen = currentHour >= 5 && currentHour < 20;

  statusBadges.forEach(badge => {
    if (isOpen) {
      badge.innerHTML = `
        <span class="status-badge">
          <span class="status-dot"></span>
          Open Now • Closes 8:00 PM
        </span>
      `;
    } else {
      badge.innerHTML = `
        <span class="status-badge" style="background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.3); color: #f87171;">
          <span class="status-dot" style="background: #ef4444; animation: none;"></span>
          Closed Now • Opens Tomorrow 5:00 AM
        </span>
      `;
    }
  });
}

/* -------------------------------------------------------------
   3. Service Category Filtering
   ------------------------------------------------------------- */
function initServiceFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   4. Interactive WhatsApp Appointment Booking Builder
   ------------------------------------------------------------- */
function initBookingForm() {
  const bookingForm = document.getElementById('whatsappBookingForm');
  const serviceSelect = document.getElementById('bookingService');
  const quickBookBtns = document.querySelectorAll('.quick-book-btn');

  // Handle Quick Book clicks from service cards
  quickBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
      
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle Form Submission -> Launch WhatsApp
  if (bookingForm) {
    // Set default date to today
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName')?.value.trim() || 'Valued Customer';
      const phone = document.getElementById('bookingPhone')?.value.trim() || 'Not specified';
      const service = document.getElementById('bookingService')?.value || 'General Grooming';
      const date = document.getElementById('bookingDate')?.value || 'Today';
      const time = document.getElementById('bookingTime')?.value || 'Any convenient time';
      const notes = document.getElementById('bookingNotes')?.value.trim() || 'None';

      // Formatted WhatsApp Message
      const message = `*✂️ MDA SPARX SALON - APPOINTMENT REQUEST*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📞 *Contact Number:* ${phone}\n` +
        `💈 *Requested Service:* ${service}\n` +
        `📅 *Preferred Date:* ${date}\n` +
        `⏰ *Preferred Time:* ${time}\n` +
        `📝 *Special Notes:* ${notes}\n\n` +
        `📍 *Location:* 335, Kamarajar Salai, Nazarathpettai, Chennai\n` +
        `_Sent via MDA Sparx Salon Website_`;

      const encodedMessage = encodeURIComponent(message);
      // Client's primary WhatsApp number: 9952079014
      const whatsappUrl = `https://wa.me/917200357052?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    });
  }
}

/* -------------------------------------------------------------
   5. FAQ Accordion
   ------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current FAQ
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        }
      });
    }
  });
}

/* -------------------------------------------------------------
   6. Smooth Scroll & Active Nav Highlighting
   ------------------------------------------------------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
