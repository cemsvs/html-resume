// Skill bars animation on scroll - sadece bir kez çalışacak
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const animatedSkills = new Set(); // Animasyon yapılmış skill'leri takip et
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                
                progressBars.forEach(bar => {
                    // Eğer bu skill daha önce animate edilmediyse
                    if (!animatedSkills.has(bar)) {
                        const skillValue = bar.getAttribute('data-skill');
                        
                        // Animasyonu başlat
                        setTimeout(() => {
                            bar.style.width = skillValue + '%';
                            bar.classList.add('animate');
                        }, 100);
                        
                        // Bu skill'i animasyon yapıldı olarak işaretle
                        animatedSkills.add(bar);
                    }
                });
            }
        });
    }, observerOptions);

    // Skills grid'i gözlemle
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillObserver.observe(skillsGrid);
    }

    // Smooth parallax effect on mouse move (hafif efekt)
    let mouseTimer;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(mouseTimer);
        
        mouseTimer = setTimeout(() => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Çok hafif bir gradient değişimi
            const angle = 135 + (x * 10 - 5); // -5 ile +5 derece arası
            document.body.style.background = `linear-gradient(${angle}deg, #0a0e27 0%, #1a1f3a 100%)`;
        }, 50); // 50ms gecikme ile performansı artır
    });

    // Sayfa yenilendiğinde scroll pozisyonunu sıfırla (opsiyonel)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Profile image click animation
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function(e) {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    }

    // Section fade in on scroll - sadece bir kez
    const sections = document.querySelectorAll('.section');
    const sectionObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animatedSections = new Set();

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedSections.has(entry.target)) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animatedSections.add(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Button hover sound effect (opsiyonel - ses efekti için)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Hover efekti için ekstra animasyon
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for tagline (opsiyonel)
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Sayfa yüklendiğinde typing efekti başlat
        setTimeout(typeWriter, 500);
    }

    // Progress number counter animation (skill yüzdeleri için)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Skill level animasyonu
    const skillLevels = document.querySelectorAll('.skill-level');
    const animatedLevels = new Set();

    const levelObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedLevels.has(entry.target)) {
                const endValue = parseInt(entry.target.textContent);
                animateValue(entry.target, 0, endValue, 1500);
                animatedLevels.add(entry.target);
            }
        });
    }, observerOptions);

    skillLevels.forEach(level => {
        levelObserver.observe(level);
    });
});
