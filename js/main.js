/**
 * 云雀顺风车官方网站 - 核心交互脚本
 */

document.addEventListener('DOMContentLoaded', function () {
    // ===== 1. 导航栏滚动交互与锚点高亮 =====
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id], footer[id]');

    function handleScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    }

    function updateActiveNav() {
        const scrollY = window.scrollY;
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const isNearBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 60);

        if (isNearBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#footer') {
                    link.classList.add('active');
                }
            });
            return;
        }

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 80;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== 2. 移动端汉堡菜单切换 =====
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    function closeMobileMenu() {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // 点击页面其他区域关闭移动端菜单
    document.addEventListener('click', function (e) {
        if (navbar && !navbar.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ===== 3. 平滑滚动到锚点 =====
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - (navbar ? navbar.offsetHeight : 60);
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                    closeMobileMenu();
                }
            }
        });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ===== 4. 元素进场淡入上浮动画 =====
    const animatedCards = document.querySelectorAll('.cooperation-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, 50);
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '100px 0px 50px 0px'
        });

        animatedCards.forEach(card => {
            card.classList.add('anim-card');
            observer.observe(card);
        });

        // 兜底：1.5秒后确保所有卡片均可见
        setTimeout(() => {
            animatedCards.forEach(card => card.classList.add('is-visible'));
        }, 1500);
    } else {
        animatedCards.forEach(card => card.classList.add('is-visible'));
    }

    // ===== 5. 合作申请按钮点击涟漪波纹效果 =====
    const buttons = document.querySelectorAll('.btn-cooperation-apply');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: btnRipple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    const styleElem = document.createElement('style');
    styleElem.textContent = `
        @keyframes btnRipple {
            to {
                transform: scale(2.4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleElem);
});
