// 导航菜单切换
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // 关闭移动菜单（如果打开）
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 考虑导航栏高度
                behavior: 'smooth'
            });
        }
    });
});

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(5px)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'var(--white-color)';
        navbar.style.backdropFilter = 'none';
    }
});

// 元素滚动动画
const fadeElements = document.querySelectorAll('.feature-card, .platform-card, .info-item');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
// 初始加载时检查
fadeInOnScroll();

// 表单提交处理
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 获取表单数据
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());

        // 在实际应用中，这里会发送数据到服务器
        console.log('表单提交数据:', formValues);

        // 显示提交成功消息
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';

        // 模拟API请求延迟
        setTimeout(() => {
            alert('感谢您的留言，我们会尽快回复您！');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 1500);
    });
}

// 页面加载动画
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
            <div class="loader-text">小马畅行</div>
        </div>
    `;
    document.body.appendChild(loader);

    // 添加加载动画样式
    const style = document.createElement('style');
    style.textContent = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--white-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        }
        .spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(30, 87, 196, 0.1);
            border-top: 5px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        .loader-text {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary-color);
            letter-spacing: 1px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loader.hidden {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1200); // 稍微延长加载动画时间，提升感知质量
});

// 图片懒加载
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.classList.add('loaded');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
});

// 添加返回顶部按钮
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '30px';
backToTopButton.style.right = '30px';
backToTopButton.style.width = '50px';
backToTopButton.style.height = '50px';
backToTopButton.style.borderRadius = '50%';
backToTopButton.style.backgroundColor = 'var(--primary-color)';
backToTopButton.style.color = 'white';
backToTopButton.style.border = 'none';
backToTopButton.style.boxShadow = 'var(--shadow)';
backToTopButton.style.cursor = 'pointer';
backToTopButton.style.display = 'none';
backToTopButton.style.zIndex = '1000';
backToTopButton.style.transition = 'all 0.3s ease';
backToTopButton.style.alignItems = 'center';
backToTopButton.style.justifyContent = 'center';
backToTopButton.style.fontSize = '1.2rem';

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});