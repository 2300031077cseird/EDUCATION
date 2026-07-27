/* ==========================================================================
   PREMIUM ACADEMY - INTERACTIVE LOGIC & ENGINE
   Default Light Theme with Dark Mode Toggle Capability
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCourseFilters();
  initGalleryFilters();
  initFaqAccordion();
  initPortalTabs();
  initAboutTabs();
  initCounterAnimations();
  initFormHandler();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Light / Dark Mode - Default: Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('academy-theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('academy-theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} theme!`);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

/* --------------------------------------------------------------------------
   2. Course Hub Filtering
   -------------------------------------------------------------------------- */
function initCourseFilters() {
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Gallery Filter & Lightbox
   -------------------------------------------------------------------------- */
function initGalleryFilters() {
  const galleryBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-wrap');

  galleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-gallery');

      galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function openLightbox(imgSrc, title, desc) {
  const modal = document.getElementById('genericModal');
  const modalBody = document.getElementById('modalBodyContent');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="text-align: center;">
      <img src="${imgSrc}" style="width:100%; max-height:450px; object-fit:cover; border-radius:14px; margin-bottom:1.25rem; border:1px solid rgba(0,0,0,0.1);">
      <h3 style="font-size:1.5rem; margin-bottom:0.5rem; color:var(--text-primary);">${title}</h3>
      <p style="color:var(--text-secondary); font-size:0.95rem;">${desc}</p>
    </div>
  `;
  modal.classList.add('active');
}

/* --------------------------------------------------------------------------
   4. FAQ Accordion & Live Search
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  const faqSearch = document.getElementById('faqSearchInput');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      item.classList.toggle('active');
    });
  });

  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Interactive Portals (Student & Parent Views)
   -------------------------------------------------------------------------- */
function initPortalTabs() {
  const portalBtns = document.querySelectorAll('.portal-tab-btn');
  const portalViews = document.querySelectorAll('.portal-view-content');

  portalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portalBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-portal');
      portalViews.forEach(view => {
        if (view.id === target) {
          view.style.display = 'block';
        } else {
          view.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. About Section Tabs
   -------------------------------------------------------------------------- */
function initAboutTabs() {
  const tabs = document.querySelectorAll('.about-tab-btn');
  const panes = document.querySelectorAll('.about-tab-pane');

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(btn => btn.classList.remove('active'));
      t.classList.add('active');

      const targetId = t.getAttribute('data-about-target');
      panes.forEach(pane => {
        if (pane.id === targetId) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Counter Animation on Scroll
   -------------------------------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = target / 50;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = Math.ceil(count).toLocaleString();
              setTimeout(updateCount, 25);
            } else {
              counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('results');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   8. Form Handling & Instant Notifications
   -------------------------------------------------------------------------- */
function initFormHandler() {
  const form = document.getElementById('quickAdmissionForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = document.getElementById('formStudentName').value;
    const selectedClass = document.getElementById('formClassSelect').value;

    showToast(`🎉 Registration Successful! Free Demo booked for ${studentName} (${selectedClass}). Our admissions team will contact you shortly.`);
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   9. Modal Control Utilities
   -------------------------------------------------------------------------- */
function closeModal() {
  const modal = document.getElementById('genericModal');
  if (modal) modal.classList.remove('active');
}

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--accent-cyan);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* --------------------------------------------------------------------------
   10. Specialized Presentation & Pitch Modals
   -------------------------------------------------------------------------- */
function openClientPitchModal() {
  const modal = document.getElementById('genericModal');
  const modalBody = document.getElementById('modalBodyContent');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="padding: 0.5rem;">
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
        <span style="background:rgba(2,132,199,0.1); color:var(--accent-cyan); padding:0.3rem 0.8rem; border-radius:6px; font-weight:700; font-size:0.8rem;">CLIENT PRESENTATION PITCH</span>
        <span style="color:var(--accent-cyan); font-weight:600; font-size:0.85rem;">Digital Admission System Architecture</span>
      </div>
      <h2 style="font-size:1.8rem; margin-bottom:1rem; color:var(--text-primary);">Why This Web Application Transforms Student Enrollment</h2>
      <p style="color:var(--text-secondary); margin-bottom:1.5rem;">When presenting to an academy director or board, emphasize that this platform is not a static website—it is an integrated <strong>Digital Admission Pipeline & Engagement Engine</strong>.</p>
      
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:12px;">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;"><i class="fas fa-shield-alt"></i> 1. Instant Trust & Proof</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Direct faculty credentials, verified Google reviews, topper statistics, and video testimonials immediately address parent concerns.</p>
        </div>
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:12px;">
          <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;"><i class="fas fa-bullseye"></i> 2. High Lead Capture</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Sticky "Book Free Demo Class" CTAs, WhatsApp quick chat, and brochure downloads capture high-intent student leads 24/7.</p>
        </div>
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:12px;">
          <h4 style="color:var(--accent-blue); margin-bottom:0.5rem;"><i class="fas fa-user-graduate"></i> 3. Parent & Student Retention</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Interactive portals for real-time attendance, test score analytics, homework downloads, and fee payment reduce churn.</p>
        </div>
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:12px;">
          <h4 style="color:var(--accent-purple); margin-bottom:0.5rem;"><i class="fas fa-chart-line"></i> 4. Scalable Brand Value</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Lightning-fast clean design system positions the academy as the #1 premium educational choice in the region.</p>
        </div>
      </div>
      <button class="btn btn-primary" style="width:100%;" onclick="closeModal()">Proceed with Live Presentation</button>
    </div>
  `;
  modal.classList.add('active');
}

function openBrochureModal() {
  const modal = document.getElementById('genericModal');
  const modalBody = document.getElementById('modalBodyContent');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="text-align:center;">
      <div style="width:60px; height:60px; background:rgba(2,132,199,0.1); color:var(--accent-cyan); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 1rem auto;">
        <i class="fas fa-file-pdf"></i>
      </div>
      <h3 style="font-size:1.6rem; margin-bottom:0.5rem;">Apex Academy Prospectus 2026-27</h3>
      <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem;">Comprehensive guide including Course Syllabus, Fee Structure, Faculty Directory & Scholarship Test Details.</p>
      
      <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:12px; margin-bottom:1.5rem; text-align:left;">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.5rem;">
          <span>File Name:</span> <strong>Apex_Academy_Brochure_2026.pdf</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.5rem;">
          <span>File Size:</span> <strong>4.8 MB</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-secondary);">
          <span>Pages:</span> <strong>24 Pages (Full Color)</strong>
        </div>
      </div>
      
      <button class="btn btn-gold" style="width:100%; margin-bottom:0.75rem;" onclick="showToast('📥 Downloading Apex_Academy_Brochure_2026.pdf...'); closeModal();">
        <i class="fas fa-download"></i> Download Full Brochure PDF
      </button>
      <button class="btn btn-outline" style="width:100%;" onclick="closeModal()">Close Preview</button>
    </div>
  `;
  modal.classList.add('active');
}

function openCourseDetailModal(courseName, classTarget, feeRange) {
  const modal = document.getElementById('genericModal');
  const modalBody = document.getElementById('modalBodyContent');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div>
      <span style="color:var(--accent-cyan); font-weight:700; font-size:0.85rem; text-transform:uppercase;">${classTarget}</span>
      <h3 style="font-size:1.75rem; margin:0.25rem 0 1rem 0;">${courseName}</h3>
      <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Intensive academic program designed for complete conceptual mastery, daily practice problem (DPP) sheets, and competitive exam readiness.</p>
      
      <h4 style="margin-bottom:0.75rem; color:var(--text-primary);">Program Structure & Benefits:</h4>
      <ul style="margin-bottom:1.5rem; color:var(--text-secondary); font-size:0.9rem; line-height:1.8;">
        <li><i class="fas fa-check" style="color:var(--accent-cyan);"></i> Daily 3 hours live interactive classroom sessions.</li>
        <li><i class="fas fa-check" style="color:var(--accent-cyan);"></i> Personal doubt mentor allocated for 1-on-1 assistance.</li>
        <li><i class="fas fa-check" style="color:var(--accent-cyan);"></i> Bi-weekly AI-driven computer-based test (CBT) analysis.</li>
        <li><i class="fas fa-check" style="color:var(--accent-cyan);"></i> Complete physical study kit & mobile portal access.</li>
      </ul>
      
      <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:1rem; border-radius:12px; border:1px solid var(--border-color); margin-bottom:1.5rem;">
        <div>
          <span style="font-size:0.8rem; color:var(--text-secondary);">Course Fee Investment:</span>
          <div style="font-size:1.25rem; font-weight:800; color:var(--accent-amber);">${feeRange}</div>
        </div>
        <span style="background:rgba(5,150,105,0.12); color:#059669; padding:0.3rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.8rem;">Scholarships Available</span>
      </div>
      
      <button class="btn btn-primary" style="width:100%;" onclick="closeModal(); document.getElementById('quick-admission').scrollIntoView({behavior:'smooth'});">
        Apply for ${courseName} Now
      </button>
    </div>
  `;
  modal.classList.add('active');
}

function openVideoModal(studentName, rankTitle) {
  const modal = document.getElementById('genericModal');
  const modalBody = document.getElementById('modalBodyContent');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div>
      <div style="position:relative; width:100%; height:320px; background:#0F172A; border-radius:14px; overflow:hidden; margin-bottom:1rem; display:flex; align-items:center; justify-content:center;">
        <div style="text-align:center;">
          <i class="fas fa-play-circle" style="font-size:4rem; color:var(--accent-cyan); cursor:pointer;" onclick="showToast('▶ Playing student video review...')"></i>
          <p style="color:#FFF; margin-top:0.5rem; font-size:0.9rem;">Click to play video interview</p>
        </div>
      </div>
      <h3 style="font-size:1.3rem;">${studentName} - ${rankTitle}</h3>
      <p style="color:var(--text-secondary); font-size:0.9rem;">"Apex Academy gave me the exact problem-solving shortcuts and exam strategy needed to crack IIT-JEE with AIR 4. The faculty doubt sessions were game-changers!"</p>
    </div>
  `;
  modal.classList.add('active');
}

function openAdminModal() {
  const modal = document.getElementById('genericModal');
  const modalBody = document.getElementById('modalBodyContent');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3 style="font-size:1.5rem; color:var(--text-primary);"><i class="fas fa-user-shield" style="color:var(--accent-indigo);"></i> Academy Admin Dashboard</h3>
        <span class="status-badge status-paid">SYSTEM ACTIVE</span>
      </div>
      <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1.5rem;">Backend portal view preview for Academy Directors & Management Staff.</p>
      
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:10px;">
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Total Enrolled Students</span>
          <div style="font-size:1.5rem; font-weight:800; color:var(--accent-cyan);">1,280</div>
        </div>
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:10px;">
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Pending Lead Enquiries</span>
          <div style="font-size:1.5rem; font-weight:800; color:var(--accent-amber);">48</div>
        </div>
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:10px;">
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Fee Collections (This Month)</span>
          <div style="font-size:1.5rem; font-weight:800; color:#059669;">₹24,50,000</div>
        </div>
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:10px;">
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Faculty Active Roster</span>
          <div style="font-size:1.5rem; font-weight:800; color:var(--accent-blue);">32 Teachers</div>
        </div>
      </div>
      
      <button class="btn btn-outline" style="width:100%;" onclick="closeModal()">Close Admin Preview</button>
    </div>
  `;
  modal.classList.add('active');
}
