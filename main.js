function main() {
    const slides = Array.from(document.querySelectorAll('main > div')).filter(
        slide => !slide.classList.contains('modal-window')
    );
    let currentSlide = 0;
    
    const modal = document.querySelector('.modal-window');
    let isModalOpen = false;
    
    const modalContent = [
        `
        <li class="modal-window__item">
            <h2 class="item__number">01</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </li>
        <li class="modal-window__item">
            <h2 class="item__number">02</h2>
            <p>Faucibus pulvinar elementum integer enim</p>
        </li>
        <li class="modal-window__item">
            <h2 class="item__number">03</h2>
            <p>Faucibus pulvinar elementum integer enim</p>
        </li>
        `,
        `
        <li class="modal-window__item">
            <h2 class="item__number">04</h2>
            <p>Mi bibendum neque egestas congue quisque egestas diam</p>
        </li>
        <li class="modal-window__item">
            <h2 class="item__number">05</h2>
            <p>Venenatis lectus magna fringilla urna</p>
        </li>
        <li class="modal-window__item">
            <h2 class="item__number">06</h2>
            <p>Venenatis lectus magna fringilla urna</p>
        </li>
        `
    ];
    
    showSlide(currentSlide);
    function showSlide(index, direction = 'right') {
        if (isModalOpen) return;
        
        const currentActive = document.querySelector('main > div:not(.visually-hidden):not(.modal-window)');
        
        if (currentActive) {
            currentActive.classList.add(
                direction === 'right' ? 'hide-to-left' : 'hide-to-right'
            );
            
            setTimeout(() => {
                resetSlideClasses();
                slides[index].classList.remove('visually-hidden');
                slides[index].classList.add(
                    direction === 'right' ? 'slide-from-right' : 'slide-from-left'
                );
                currentSlide = index;
            }, 50);
        } else {
            resetSlideClasses();
            slides[index].classList.remove('visually-hidden');
            currentSlide = index;
        }
    }
    
    function resetSlideClasses() {
        slides.forEach(slide => {
            slide.classList.add('visually-hidden');
            slide.classList.remove(
                'hide-to-left', 
                'hide-to-right',
                'slide-from-left',
                'slide-from-right'
            );
        });
    }
    
    const nextButton = document.querySelector('.main-content__button');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex, 'right');
        });
    }
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        if (isModalOpen) return;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (isModalOpen) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    let mouseDownX = 0;
    let mouseUpX = 0;
    
    document.addEventListener('mousedown', function(e) {
        if (isModalOpen) return;
        mouseDownX = e.screenX;
    });
    
    document.addEventListener('mouseup', function(e) {
        if (isModalOpen) return;
        mouseUpX = e.screenX;
        handleMouseSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        
        if (touchEndX < touchStartX - threshold) {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex, 'right');
        } else if (touchEndX > touchStartX + threshold) {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex, 'left');
        }
    }
    
    function handleMouseSwipe() {
        const threshold = 50;
        
        if (mouseUpX < mouseDownX - threshold) {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex, 'right');
        } else if (mouseUpX > mouseDownX + threshold) {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex, 'left');
        }
    }
    
    const detailsButton = document.querySelector('.brend-slide__button');
    if (detailsButton) {
        detailsButton.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    const closeModalBtn = document.querySelector('.modal-window__pretitle');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            e.preventDefault();
            closeModal();
        }
    });
    
let isFirstModalOpen = true; 
function openModal() {
    isModalOpen = true;
    modal.classList.remove('visually-hidden');
    document.querySelector('.brend-slide').classList.add('visually-hidden');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    
    if (isFirstModalOpen) {
        updateModalContent(0, false);
        isFirstModalOpen = false;
    } else {
        updateModalContent(0, true);
    }
}
    
    function closeModal() {
        isModalOpen = false;
        modal.classList.add('visually-hidden');
        document.querySelector('.brend-slide').classList.remove('visually-hidden');
        document.body.style.overflow = '';
        document.body.style.position = '';
    }
    
    function updateModalContent(index, shouldAnimate = true) {
        const listContainer = document.querySelector('.modal-window__list');
        const dots = document.querySelectorAll('.circle-pagination');
        
        if (listContainer && dots.length) {
            if (shouldAnimate) {
                listContainer.classList.add('fade-out');
                
                setTimeout(() => {
                    listContainer.innerHTML = modalContent[index];
                    listContainer.classList.remove('fade-out');
                    listContainer.classList.add('fade-in');
                    
                    setTimeout(() => {
                        listContainer.classList.remove('fade-in');
                    }, 300);
                    
                    dots.forEach(dot => dot.classList.remove('is-active'));
                    dots[index].classList.add('is-active');
                }, 300);
            } else {
                listContainer.innerHTML = modalContent[index];
                dots.forEach(dot => dot.classList.remove('is-active'));
                dots[index].classList.add('is-active');
            }
        }
    }

    const paginationArrows = document.querySelectorAll('.modal-window__pagination span');
    if (paginationArrows.length > 0) {
        paginationArrows.forEach(arrow => {
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                if (!isModalOpen) return;
                
                const dots = document.querySelectorAll('.circle-pagination');
                let activeIndex = Array.from(dots).findIndex(dot => dot.classList.contains('is-active'));
                
                if (this.textContent === '<') {
                    activeIndex = (activeIndex - 1 + modalContent.length) % modalContent.length;
                } else if (this.textContent === '>') {
                    activeIndex = (activeIndex + 1) % modalContent.length;
                }
                
                updateModalContent(activeIndex, true);
            });
        });

        const dots = document.querySelectorAll('.circle-pagination');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                if (!isModalOpen) return;
                updateModalContent(index, true); 
            });
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });

    const content = document.querySelector('.scroll-section__text');  
    const scrollTrack = document.querySelector('.scroll');
    const scrollThumb = document.querySelector('.scroll-thumb');
    const contentInner = document.querySelector('.inner-content');

    function updateScrollThumb() {
        const scrollRatio = contentInner.scrollTop / (contentInner.scrollHeight - contentInner.clientHeight);
        const trackHeight = scrollTrack.clientHeight - scrollThumb.clientHeight;
        const thumbPosition = scrollRatio * trackHeight;
        
        scrollThumb.style.top = `${thumbPosition}px`;
    }

    contentInner.addEventListener('scroll', updateScrollThumb);

    scrollThumb.addEventListener('mousedown', function(e) {
        e.preventDefault();
        
        const startY = e.clientY;
        const startTop = parseInt(scrollThumb.style.top) || 0;
        
        function moveThumb(e) {
            const deltaY = e.clientY - startY;
            let newTop = startTop + deltaY;
            
            const maxTop = scrollTrack.clientHeight - scrollThumb.clientHeight + 10;
            newTop = Math.max(0, Math.min(maxTop, newTop));
            
            scrollThumb.style.top = `${newTop}px`;
            
            const scrollRatio = newTop / maxTop;
            contentInner.scrollTop = scrollRatio * (contentInner.scrollHeight - contentInner.clientHeight);
        }
        
        function stopDrag() {
            document.removeEventListener('mousemove', moveThumb);
            document.removeEventListener('mouseup', stopDrag);
        }
        
        document.addEventListener('mousemove', moveThumb);
        document.addEventListener('mouseup', stopDrag);
    });

    scrollTrack.addEventListener('click', function(e) {
        const rect = scrollTrack.getBoundingClientRect();
        const clickPosition = e.clientY - rect.top - scrollThumb.clientHeight / 2;
        
        const maxTop = scrollTrack.clientHeight - scrollThumb.clientHeight + 10;
        const newTop = Math.max(0, Math.min(maxTop, clickPosition));
        
        scrollThumb.style.top = `${newTop}px`;
        
        const scrollRatio = newTop / maxTop;
        contentInner.scrollTop = scrollRatio * (contentInner.scrollHeight - contentInner.clientHeight);
    });

    updateScrollThumb();
}

main()