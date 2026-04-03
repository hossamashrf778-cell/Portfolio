let swiper = null;

function applyColors() {
    document.documentElement.style.setProperty('--primary', window.siteData.colors.primary);
    document.documentElement.style.setProperty('--secondary', window.siteData.colors.secondary);
}

function updateContent() {
    document.getElementById('siteTitle').innerText = window.siteData.siteTitle;
    document.getElementById('heroTitle').innerText = window.siteData.heroTitle;
    document.getElementById('heroSubtitle').innerText = window.siteData.heroSubtitle;
    document.getElementById('heroTagline').innerText = window.siteData.heroTagline;
    document.getElementById('heroDesc').innerText = window.siteData.heroDesc;
    
    document.getElementById('projectsCount').innerText = window.siteData.stats.projects;
    document.getElementById('clientsCount').innerText = window.siteData.stats.clients;
    document.getElementById('expYears').innerText = window.siteData.stats.years;
    
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    window.siteData.services.forEach(service => {
        servicesGrid.innerHTML += `
            <div class="service-item">
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
                <span class="service-price">${service.price} <small>${service.priceNote || ''}</small></span>
            </div>
        `;
    });
    
    const pricingGrid = document.getElementById('pricingGrid');
    pricingGrid.innerHTML = '';
    window.siteData.pricing.forEach(pkg => {
        pricingGrid.innerHTML += `
            <div class="pricing-card">
                <h3>${pkg.title}</h3>
                <div class="pricing-price">${pkg.price} <span>ج</span></div>
                <ul class="pricing-features">
                    ${pkg.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                </ul>
                <a href="#contact" class="btn btn-${pkg.type}" style="padding: 12px 35px;">${pkg.button}</a>
            </div>
        `;
    });
    
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    testimonialsGrid.innerHTML = '';
    window.siteData.testimonials.forEach(t => {
        testimonialsGrid.innerHTML += `
            <div class="testimonial-card">
                <i class="fas fa-quote-right"></i>
                <div class="testimonial-text">"${t.text}"</div>
                <div class="client-name">- ${t.name}</div>
            </div>
        `;
    });
    
    const swiperWrapper = document.getElementById('swiperWrapper');
    swiperWrapper.innerHTML = '';
    window.siteData.projects.forEach(proj => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<div class="swiper-img" style="background-image: url('${proj.img}');"></div><div class="card-info"><h3>${proj.title}</h3><p><i class="fas fa-tag"></i> ${proj.category}</p></div>`;
        swiperWrapper.appendChild(slide);
    });
    
    if(swiper) swiper.destroy(true, true);
    swiper = new Swiper('.gallery-swiper', {
        loop: true, slidesPerView: 1, spaceBetween: 25,
        pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        autoplay: { delay: 3200, disableOnInteraction: false },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });
    
    document.getElementById('behanceLink').href = window.siteData.social.behance;
    document.getElementById('instagramLink').href = window.siteData.social.instagram;
    document.getElementById('whatsappLink').href = window.siteData.social.whatsapp;
    document.getElementById('emailLink').href = `mailto:${window.siteData.social.email}`;
    
    applyColors();
    displayComments();
}

function displayComments() {
    const container = document.getElementById('commentsContainer');
    if(!container) return;
    
    container.innerHTML = window.siteData.comments.map(c => `
        <div class="comment-item">
            <div class="comment-name"><i class="fas fa-user"></i> ${c.name}</div>
            <div class="comment-text">${c.text}</div>
            <div class="comment-date">${c.date || new Date().toLocaleDateString('ar-EG')}</div>
        </div>
    `).join('');
    
    if(window.siteData.comments.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">لا توجد تعليقات بعد. كن أول من يعلق!</p>';
    }
}

AOS.init({ duration: 1000, once: true, offset: 100 });

const savedData = localStorage.getItem('siteData');
if(savedData) {
    const parsed = JSON.parse(savedData);
    window.siteData = { ...window.siteData, ...parsed };
}

updateContent();

const sections = document.querySelectorAll('section');
const navLinksArr = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;
        if(window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinksArr.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
    const backBtn = document.getElementById('backToTop');
    if(window.scrollY > 500) backBtn.classList.add('show-btn');
    else backBtn.classList.remove('show-btn');
});

const menuBtn = document.getElementById('menuBtn');
const navUl = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navUl.classList.toggle('active'));
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => navUl.classList.remove('active')));
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const email = document.getElementById('userEmail').value;
    const message = document.getElementById('userMessage').value;
    const msgDiv = document.getElementById('formMessage');
    
    if(!name || !phone || !email) {
        msgDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> من فضلك املأ جميع الحقول المطلوبة';
        msgDiv.style.color = '#ff6b6b';
        return;
    }
    
    const whatsappMsg = `مرحباً حسام، أنا ${name}%0Aرقمي: ${phone}%0Aبريدي: ${email}%0Aالرسالة: ${message || 'أود الاستفسار عن خدمة'}`;
    window.open(`https://wa.me/message/N3XUZ37ZGJDWC1?text=${whatsappMsg}`, '_blank');
    msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال طلبك! سيتم التواصل معك قريباً';
    msgDiv.style.color = '#6bff6b';
    this.reset();
    setTimeout(() => msgDiv.innerHTML = '', 5000);
});

document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('commentName').value;
    const text = document.getElementById('commentText').value;
    
    if(!name || !text) {
        alert('الرجاء إدخال الاسم والتعليق');
        return;
    }
    
    window.siteData.comments.unshift({
        id: Date.now().toString(),
        name: name,
        text: text,
        date: new Date().toLocaleDateString('ar-EG')
    });
    
    localStorage.setItem('siteData', JSON.stringify(window.siteData));
    displayComments();
    this.reset();
    alert('✅ تم إضافة تعليقك بنجاح!');
});

if(checkAdminAccess()) {
    initAdminPanel();
} else {
    const adminBtn = document.createElement('div');
    adminBtn.className = 'admin-login-btn';
    adminBtn.innerHTML = '<i class="fas fa-lock"></i>';
    adminBtn.title = 'تسجيل دخول المدير';
    adminBtn.onclick = () => {
        if(requestAdminAccess()) location.reload();
    };
    document.body.appendChild(adminBtn);
    
    const style = document.createElement('style');
    style.textContent = `
        .admin-login-btn {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 45px;
            height: 45px;
            background: rgba(0,0,0,0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff6b6b;
            cursor: pointer;
            z-index: 999;
            backdrop-filter: blur(5px);
            border: 1px solid #ff6b6b;
            transition: 0.3s;
        }
        .admin-login-btn:hover { transform: scale(1.1); background: #ff6b6b; color: #000; }
    `;
    document.head.appendChild(style);
}