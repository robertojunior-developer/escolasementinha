(function() {
    function initSobreSlider() {
        const slides = document.querySelectorAll('.sobre-slide-img');
        const prevBtn = document.querySelector('.sobre-slide-btn.prev');
        const nextBtn = document.querySelector('.sobre-slide-btn.next');
        if (!slides.length || !prevBtn || !nextBtn) return;
        let current = 0;
        let interval = null;

        function showSlide(idx) {
            slides.forEach((img, i) => {
                img.classList.toggle('active', i === idx);
            });
        }

        function nextSlide() {
            current = (current + 1) % slides.length;
            showSlide(current);
        }

        function prevSlide() {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        }

        function startAutoSlide() {
            if (interval) clearInterval(interval);
            interval = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            if (interval) clearInterval(interval);
        }

        prevBtn.addEventListener('click', function() {
            prevSlide();
            startAutoSlide();
        });
        nextBtn.addEventListener('click', function() {
            nextSlide();
            startAutoSlide();
        });

        // Swipe support (mobile)
        let startX = null;
        const wrapper = document.querySelector('.sobre-slide-wrapper');
        if (wrapper) {
            wrapper.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            });
            wrapper.addEventListener('touchend', function(e) {
                if (startX === null) return;
                let endX = e.changedTouches[0].clientX;
                if (endX - startX > 40) prevBtn.click();
                else if (startX - endX > 40) nextBtn.click();
                startX = null;
            });
            wrapper.addEventListener('mouseenter', stopAutoSlide);
            wrapper.addEventListener('mouseleave', startAutoSlide);
        }

        showSlide(current);
        startAutoSlide();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSobreSlider);
    } else {
        initSobreSlider();
    }
})();

    function showSlide(idx) {
        slides.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    function startAutoSlide() {
        if (interval) clearInterval(interval);
        interval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        if (interval) clearInterval(interval);
    }

    prevBtn.addEventListener('click', function() {
        prevSlide();
        startAutoSlide();
    });
    nextBtn.addEventListener('click', function() {
        nextSlide();
        startAutoSlide();
    });

    // Swipe support (mobile)
    let startX = null;
    const wrapper = document.querySelector('.sobre-slide-wrapper');
    wrapper.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    wrapper.addEventListener('touchend', function(e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) prevBtn.click();
        else if (startX - endX > 40) nextBtn.click();
        startX = null;
    });

    // Pausar ao passar o mouse
    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);

    showSlide(current);
    startAutoSlide();
});
