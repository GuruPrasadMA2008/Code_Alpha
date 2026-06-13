// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Current image index
    let currentIndex = 0;
    let visibleItems = [];

    // ====== FILTER FUNCTIONALITY ======
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter images
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });

            // Update visible items list
            updateVisibleItems();
        });
    });

    // Update visible items array
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    }

    // Initialize visible items
    updateVisibleItems();

    // ====== LIGHTBOX FUNCTIONALITY ======
    
    // Open lightbox when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (this.classList.contains('hide')) return;
            
            currentIndex = visibleItems.indexOf(this);
            openLightbox(this);
        });
    });

    // Open lightbox with image
    function openLightbox(item) {
        const img = item.querySelector('img');
        const altText = img.getAttribute('alt');
        
        // Get larger image (replace size in URL)
        const largeImgSrc = img.src.replace('/400/300', '/800/600');
        
        lightboxImage.src = largeImgSrc;
        lightboxCaption.textContent = altText;
        lightbox.classList.add('active');
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Previous button
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxImage();
    });

    // Next button
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightboxImage();
    });

    // Update lightbox image
    function updateLightboxImage() {
        const item = visibleItems[currentIndex];
        const img = item.querySelector('img');
        const altText = img.getAttribute('alt');
        const largeImgSrc = img.src.replace('/400/300', '/800/600');
        
        // Add fade out/in animation
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = largeImgSrc;
            lightboxCaption.textContent = altText;
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    // ====== KEYBOARD NAVIGATION ======
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                updateLightboxImage();
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % visibleItems.length;
                updateLightboxImage();
                break;
        }
    });

    // Add smooth transition to lightbox image
    lightboxImage.style.transition = 'opacity 0.2s ease';
});