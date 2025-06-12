// Enhanced Configuration and Constants - Central configuration for the application
const CONFIG = {
    API_KEY: 'CLiqy8UK-ptDrv1z7MuC51MKMOlP_DSs3DToSf-GYGY', // Unsplash API key
    BASE_URL: 'https://api.unsplash.com', // Unsplash API base URL
    DEMO_MODE: true, // Enable demo mode for development
    IMAGES_PER_PAGE: 30, // Number of images to load per page
    SEARCH_DELAY: 500, // Delay for search input debouncing
    ANIMATION_DELAY: 100, // Animation delay between elements
    MAX_HISTORY_ITEMS: 50 // Maximum items in search history
};

// Demo Images with Enhanced Data - Sample data for demo mode
const DEMO_IMAGES = [
    {
        id: 'demo1',
        urls: {
            regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
            small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
        },
        alt_description: 'Beautiful mountain landscape at sunset',
        user: { name: 'Nature Photographer', username: 'naturephoto' },
        links: { html: 'https://unsplash.com/photos/mountain-landscape' },
        likes: 1250,
        views: 50000,
        downloads: 8500,
        description: 'Stunning mountain vista at sunrise with golden light',
        created_at: '2024-01-15T10:30:00Z'
    },
    {
        id: 'demo2',
        urls: {
            regular: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
            full: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920',
            small: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400'
        },
        alt_description: 'Misty forest path in autumn',
        user: { name: 'Forest Explorer', username: 'forestexplorer' },
        links: { html: 'https://unsplash.com/photos/forest-path' },
        likes: 890,
        views: 32000,
        downloads: 5200,
        description: 'Peaceful autumn forest path with morning mist',
        created_at: '2024-02-10T08:15:00Z'
    },
    {
        id: 'demo3',
        urls: {
            regular: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
            full: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920',
            small: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
        },
        alt_description: 'Peaceful lake with perfect reflection',
        user: { name: 'Water Artist', username: 'waterartist' },
        links: { html: 'https://unsplash.com/photos/lake-reflection' },
        likes: 2100,
        views: 75000,
        downloads: 12300,
        description: 'Mirror-like lake reflecting the sky and clouds',
        created_at: '2024-03-05T16:45:00Z'
    },
    {
        id: 'demo4',
        urls: {
            regular: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
            full: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920',
            small: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400'
        },
        alt_description: 'Starry night sky over mountains',
        user: { name: 'Star Gazer', username: 'stargazer' },
        links: { html: 'https://unsplash.com/photos/starry-night' },
        likes: 3500,
        views: 120000,
        downloads: 18900,
        description: 'Breathtaking starry night sky over mountain silhouettes',
        created_at: '2024-01-28T22:30:00Z'
    },
    {
        id: 'demo5',
        urls: {
            regular: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
            full: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920',
            small: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400'
        },
        alt_description: 'Dense green forest canopy',
        user: { name: 'Green World', username: 'greenworld' },
        links: { html: 'https://unsplash.com/photos/forest-canopy' },
        likes: 1680,
        views: 64000,
        downloads: 9800,
        description: 'Lush green forest canopy from below',
        created_at: '2024-02-22T14:20:00Z'
    },
    {
        id: 'demo6',
        urls: {
            regular: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
            full: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920',
            small: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'
        },
        alt_description: 'Ocean waves at sunset',
        user: { name: 'Ocean Dreams', username: 'oceandreams' },
        links: { html: 'https://unsplash.com/photos/ocean-sunset' },
        likes: 2890,
        views: 98000,
        downloads: 15600,
        description: 'Powerful ocean waves during golden sunset',
        created_at: '2024-03-12T19:45:00Z'
    }
];

// Utility Functions - Helper functions for common operations
class Utils {
    // Format numbers with K/M suffixes
    static formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    // Format date strings to readable format
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Format date as time ago (e.g., "2h ago")
    static formatTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return Utils.formatDate(dateString);
    }

    // Debounce function to limit function calls
    static debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Animate number counting effect
    static animateValue(element, start, end, duration, formatter = (v) => v) {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = start + (end - start) * progress;
            element.textContent = formatter(Math.floor(currentValue));
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    }

    // Generate unique ID
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Enhanced Stats Manager - Tracks and displays application statistics
class StatsManager {
    constructor() {
        this.stats = this.loadStats();
        this.updateDisplay();
    }

    // Load statistics from localStorage
    loadStats() {
        return JSON.parse(localStorage.getItem('galleriaStats')) || {
            totalImages: 0,
            totalSearches: 0,
            totalDownloads: 0,
            totalAlbums: 0,
            totalFavorites: 0,
            lastActivity: null
        };
    }

    // Save statistics to localStorage
    saveStats() {
        localStorage.setItem('galleriaStats', JSON.stringify(this.stats));
    }

    // Increment image counter
    incrementImages(count = 1) {
        this.stats.totalImages += count;
        this.stats.lastActivity = new Date().toISOString();
        this.saveStats();
        this.updateDisplay();
    }

    // Increment search counter
    incrementSearches() {
        this.stats.totalSearches++;
        this.stats.lastActivity = new Date().toISOString();
        this.saveStats();
        this.updateDisplay();
    }

    // Increment download counter
    incrementDownloads() {
        this.stats.totalDownloads++;
        this.saveStats();
        this.updateDisplay();
    }

    // Increment album counter
    incrementAlbums() {
        this.stats.totalAlbums++;
        this.saveStats();
        this.updateDisplay();
    }

    // Decrement album counter
    decrementAlbums() {
        this.stats.totalAlbums = Math.max(0, this.stats.totalAlbums - 1);
        this.saveStats();
        this.updateDisplay();
    }

    // Increment favorites counter
    incrementFavorites() {
        this.stats.totalFavorites++;
        this.saveStats();
        this.updateDisplay();
    }

    // Update display elements with current statistics
    updateDisplay() {
        const totalImages = document.getElementById('totalImages');
        const totalSearches = document.getElementById('totalSearches');
        const totalDownloads = document.getElementById('totalDownloads');
        const totalAlbums = document.getElementById('totalAlbums');
        const totalFavorites = document.getElementById('totalFavorites');
        const lastActivity = document.getElementById('lastActivity');

        if (totalImages) {
            Utils.animateValue(totalImages, 0, this.stats.totalImages, 1000, Utils.formatNumber);
        }
        if (totalSearches) {
            Utils.animateValue(totalSearches, 0, this.stats.totalSearches, 1000, Utils.formatNumber);
        }
        if (totalDownloads) {
            Utils.animateValue(totalDownloads, 0, this.stats.totalDownloads, 1000, Utils.formatNumber);
        }
        if (totalAlbums) {
            Utils.animateValue(totalAlbums, 0, this.stats.totalAlbums, 1000, Utils.formatNumber);
        }
        if (totalFavorites) {
            Utils.animateValue(totalFavorites, 0, this.stats.totalFavorites, 1000, Utils.formatNumber);
        }
        if (lastActivity) {
            lastActivity.textContent = this.stats.lastActivity ? 
                Utils.formatTimeAgo(this.stats.lastActivity) : 'Never';
        }
    }
}

// Enhanced Gallery Class - Main gallery functionality
class Galleria {
    constructor() {
        this.grid = document.getElementById('adaptiveGrid');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.clearBtn = document.getElementById('clearSearch');
        this.loading = document.getElementById('loading');
        this.currentItems = [];
        this.currentIndex = 0;
        this.query = '';
        this.page = 1;
        this.isLoading = false;
        this.viewMode = 'grid';
        this.sortBy = 'relevance';
        this.intersectionObserver = null;
        this.stats = new StatsManager();
        this.selectedAlbum = null;
        
        this.init();
    }

    // Initialize the gallery
    async init() {
        this.setupIntersectionObserver();
        await this.loadImages();
        this.setupEventListeners();
        this.animateInitialElements();
        this.setupSearchSuggestions();
    }

    // Setup intersection observer for lazy loading animations
    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );
    }

    // Load images from API or demo data
    async loadImages() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.loading.style.display = 'flex';

        try {
            let data;
            if (CONFIG.DEMO_MODE || !CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                data = this.query ? 
                    DEMO_IMAGES.filter(img => 
                        img.description.toLowerCase().includes(this.query.toLowerCase()) ||
                        img.alt_description.toLowerCase().includes(this.query.toLowerCase())
                    ) : DEMO_IMAGES;
            } else {
                // Real API call
                const url = this.query ? 
                    `${CONFIG.BASE_URL}/search/photos?query=${this.query}&page=${this.page}&per_page=${CONFIG.IMAGES_PER_PAGE}&order_by=${this.sortBy}&client_id=${CONFIG.API_KEY}` :
                    `${CONFIG.BASE_URL}/photos?page=${this.page}&per_page=${CONFIG.IMAGES_PER_PAGE}&order_by=${this.sortBy}&client_id=${CONFIG.API_KEY}`;

                const response = await fetch(url);
                const result = await response.json();
                data = this.query ? result.results : result;
            }

            this.currentItems = data;
            this.stats.incrementImages(data.length);
            this.renderGallery();
        } catch (error) {
            console.error('Error loading images:', error);
            this.showError('Failed to load images. Please try again.');
        } finally {
            this.isLoading = false;
            this.loading.style.display = 'none';
        }
    }

    // Render gallery grid with images
    renderGallery() {
        this.grid.innerHTML = '';
        this.grid.className = `adaptive-grid ${this.viewMode}-view`;
        
        this.currentItems.forEach((item, index) => {
            const galleryItem = this.createGalleryItem(item, index);
            this.grid.appendChild(galleryItem);
            this.intersectionObserver.observe(galleryItem);
        });
    }

    // Create individual gallery item HTML
    createGalleryItem(item, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item scroll-animate glitter-border';
        div.style.animationDelay = `${index * CONFIG.ANIMATION_DELAY}ms`;
        div.dataset.index = index;
        
        div.innerHTML = `
            <img src="${item.urls.regular}" 
                 alt="${item.alt_description || 'Beautiful image'}"
                 data-full="${item.urls.full}"
                 data-user="${item.user.name}"
                 data-username="${item.user.username || ''}"
                 data-link="${item.links.html}"
                 data-likes="${item.likes || 0}"
                 data-views="${item.views || 0}"
                 data-downloads="${item.downloads || 0}"
                 data-description="${item.description || item.alt_description || 'Beautiful image'}"
                 data-created="${item.created_at || new Date().toISOString()}"
                 loading="lazy"
                 class="glitter-border">
            <div class="image-overlay">
                <h3>${item.user.name}</h3>
                <p>${item.description || item.alt_description || 'Beautiful image'}</p>
                <div class="image-stats">
                    <span><i class="fas fa-heart"></i> ${Utils.formatNumber(item.likes || 0)}</span>
                    <span><i class="fas fa-eye"></i> ${Utils.formatNumber(item.views || 0)}</span>
                    <span><i class="fas fa-download"></i> ${Utils.formatNumber(item.downloads || 0)}</span>
                </div>
                <div class="overlay-actions">
                    <button class="overlay-btn" onclick="galleria.showLightbox(${index})" title="View Fullscreen">
                        <i class="fas fa-expand"></i>
                    </button>
                    <button class="overlay-btn" onclick="galleria.quickSave(${index})" title="Save to Private">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="overlay-btn" onclick="galleria.quickShare(${index})" title="Share">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="overlay-btn" onclick="galleria.addToAlbumQuick(${index})" title="Add to Album">
                        <i class="fas fa-folder-plus"></i>
                    </button>
                </div>
            </div>
        `;

        // Click event for lightbox
        div.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && !e.target.closest('.overlay-actions')) {
                this.showLightbox(index);
            }
        });

        return div;
    }

    // Setup event listeners for gallery controls
    setupEventListeners() {
        // Enhanced search with debounce
        this.searchInput.addEventListener('input', Utils.debounce(async (e) => {
            this.query = e.target.value.trim();
            if (this.query) {
                this.stats.incrementSearches();
                searchHistory.addSearch(this.query);
            }
            this.page = 1;
            await this.loadImages();
        }, CONFIG.SEARCH_DELAY));

        // Search button functionality
        this.searchBtn.addEventListener('click', async () => {
            this.query = this.searchInput.value.trim();
            if (this.query) {
                this.stats.incrementSearches();
                searchHistory.addSearch(this.query);
            }
            this.page = 1;
            await this.loadImages();
        });

        // Enhanced clear button
        this.clearBtn.addEventListener('click', async () => {
            this.searchInput.value = '';
            this.query = '';
            this.page = 1;
            await this.loadImages();
            this.showNotification('Search cleared!', 'info');
        });

        // View mode toggles
        document.getElementById('gridView')?.addEventListener('click', () => {
            this.setViewMode('grid');
        });

        document.getElementById('listView')?.addEventListener('click', () => {
            this.setViewMode('list');
        });

        // Enhanced sort options with modern buttons
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const sortValue = e.currentTarget.dataset.sort;
                document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.sortBy = sortValue;
                this.page = 1;
                await this.loadImages();
            });
        });

        // Enter key for search
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.searchBtn.click();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        this.searchInput.focus();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.setViewMode(this.viewMode === 'grid' ? 'list' : 'grid');
                        break;
                }
            }
        });
    }

    // Setup search suggestions functionality
    setupSearchSuggestions() {
        const suggestions = [
            'nature', 'landscape', 'sunset', 'ocean', 'mountains', 'forest',
            'city', 'architecture', 'travel', 'food', 'animals', 'flowers',
            'technology', 'business', 'people', 'art', 'abstract', 'minimal'
        ];

        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        this.searchInput.addEventListener('focus', () => {
            if (!this.searchInput.value) {
                this.showSuggestions(suggestions.slice(0, 6));
            }
        });

        this.searchInput.addEventListener('blur', (e) => {
            setTimeout(() => {
                suggestionsContainer.style.display = 'none';
            }, 200);
        });
    }

    // Show search suggestions
    showSuggestions(suggestions) {
        const container = document.getElementById('searchSuggestions');
        container.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="galleria.selectSuggestion('${suggestion}')">
                <i class="fas fa-search"></i>
                <span>${suggestion}</span>
            </div>
        `).join('');
        container.style.display = 'block';
    }

    // Select a search suggestion
    selectSuggestion(suggestion) {
        this.searchInput.value = suggestion;
        this.searchBtn.click();
        document.getElementById('searchSuggestions').style.display = 'none';
    }

    // Set view mode (grid/list)
    setViewMode(mode) {
        this.viewMode = mode;
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${mode}View`).classList.add('active');
        this.renderGallery();
    }

    // Show fullscreen lightbox
    showLightbox(index) {
        this.currentIndex = index;
        const item = this.currentItems[index];
        if (!item) return;

        const lightbox = document.getElementById('fullscreenLightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const imageTitle = document.getElementById('imageTitle');
        const imageAuthor = document.getElementById('imageAuthor');
        const imageLikes = document.getElementById('imageLikes');
        const imageViews = document.getElementById('imageViews');
        const imageDate = document.getElementById('imageDate');
        const downloadBtn = document.getElementById('downloadBtn');
        const addToPrivateBtn = document.getElementById('addToPrivateBtn');
        const shareBtn = document.getElementById('shareBtn');
        const addToAlbumLightboxBtn = document.getElementById('addToAlbumLightboxBtn');

        // Show loading
        const imageLoader = document.getElementById('imageLoader');
        imageLoader.style.display = 'block';
        lightboxImg.style.opacity = '0';

        // Load high-res image
        const img = new Image();
        img.onload = () => {
            lightboxImg.src = item.urls.full;
            lightboxImg.style.opacity = '1';
            imageLoader.style.display = 'none';
        };
        img.src = item.urls.full;

        // Set content
        imageTitle.textContent = item.description || item.alt_description || 'Beautiful Image';
        imageAuthor.textContent = `by ${item.user.name}`;
        imageLikes.innerHTML = `<i class="fas fa-heart"></i> ${Utils.formatNumber(item.likes || 0)}`;
        imageViews.innerHTML = `<i class="fas fa-eye"></i> ${Utils.formatNumber(item.views || 0)}`;
        imageDate.innerHTML = `<i class="fas fa-calendar"></i> ${Utils.formatDate(item.created_at)}`;

        // Setup action buttons
        downloadBtn.onclick = () => this.downloadImage(item);
        shareBtn.onclick = () => shareManager.showShareModal(item);
        addToPrivateBtn.onclick = () => this.addToPrivate(item);
        addToAlbumLightboxBtn.onclick = () => albumManager.showAddToAlbumModal(item);

        // Setup navigation
        this.setupLightboxNavigation();

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Setup lightbox navigation
    setupLightboxNavigation() {
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');
        const closeBtn = document.getElementById('closeLightbox');
        const toggleFullscreen = document.getElementById('toggleFullscreen');

        prevBtn.onclick = () => this.navigateImage(-1);
        nextBtn.onclick = () => this.navigateImage(1);
        closeBtn.onclick = () => this.closeLightbox();
        
        toggleFullscreen.onclick = () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                toggleFullscreen.innerHTML = '<i class="fas fa-expand"></i>';
            } else {
                document.getElementById('fullscreenLightbox').requestFullscreen();
                toggleFullscreen.innerHTML = '<i class="fas fa-compress"></i>';
            }
        };

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('fullscreenLightbox').classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.navigateImage(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateImage(1);
                        break;
                    case 'f':
                        toggleFullscreen.click();
                        break;
                    case 'd':
                        downloadBtn.click();
                        break;
                    case 's':
                        shareBtn.click();
                        break;
                }
            }
        });
    }

    // Navigate between images in lightbox
    navigateImage(direction) {
        const newIndex = this.currentIndex + direction;
        if (newIndex >= 0 && newIndex < this.currentItems.length) {
            this.showLightbox(newIndex);
        }
    }

    // Close lightbox
    closeLightbox() {
        document.getElementById('fullscreenLightbox').classList.remove('active');
        document.body.style.overflow = '';
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    // Download image
    downloadImage(item) {
        const link = document.createElement('a');
        link.href = item.urls.full;
        link.download = `galleria-${item.id}-${Date.now()}.jpg`;
        link.target = '_blank';
        link.click();
        this.stats.incrementDownloads();
        this.showNotification('Download started!', 'success');
    }

    // Quick save from overlay
    quickSave(index) {
        const item = this.currentItems[index];
        this.addToPrivate(item);
    }

    // Quick share from overlay
    quickShare(index) {
        const item = this.currentItems[index];
        shareManager.showShareModal(item);
    }

    // Quick add to album from overlay
    addToAlbumQuick(index) {
        const item = this.currentItems[index];
        albumManager.showAddToAlbumModal(item);
    }

    // Add image to private gallery
    addToPrivate(item) {
        if (privateGallery.currentUser) {
            const success = privateGallery.addImageToPrivate({
                url: item.urls.full,
                thumbnail: item.urls.small,
                title: item.description || item.alt_description,
                author: item.user.name,
                likes: item.likes,
                savedAt: new Date().toISOString()
            });
            
            if (success) {
                this.stats.incrementFavorites();
                this.showNotification('Image saved to private gallery!', 'success');
            } else {
                this.showNotification('Image already in private gallery!', 'info');
            }
        } else {
            this.showNotification('Please login to save images!', 'error');
            navigationHandler.showSection('privateBtn', 'privateSection');
        }
    }

    // Animate initial elements
    animateInitialElements() {
        setTimeout(() => {
            document.querySelector('.navbar').style.animation = 'slideDown 0.6s ease forwards';
        }, 100);

        setTimeout(() => {
            document.querySelectorAll('.animate-slide-up').forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
                el.style.opacity = '1';
            });
        }, 300);
    }

    // Show error message
    showError(message) {
        this.grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem;" class="error-message">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                <h3 style="color: #ef4444; margin-bottom: 1rem;">Error</h3>
                <p style="color: #6b7280;">${message}</p>
                <button onclick="galleria.loadImages()" class="action-btn primary" style="margin-top: 1rem;">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
    }

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'error' ? 'exclamation-circle' : 'info-circle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Enhanced Private Gallery Class - User's private photo collection
class PrivateGallery {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('galleryUsers')) || {};
        this.currentUser = null;
        this.searchResults = [];
        this.init();
    }

    // Initialize private gallery
    init() {
        this.setupEventListeners();
    }

    // Setup event listeners for private gallery
    setupEventListeners() {
        const loginBtn = document.getElementById('privateLoginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const addImageBtn = document.getElementById('addImageBtn');
        const privateSearchInput = document.getElementById('privateSearchInput');
        const cancelPrivateSearch = document.getElementById('cancelPrivateSearch');

        loginBtn?.addEventListener('click', () => this.handleLogin());
        logoutBtn?.addEventListener('click', () => this.logout());
        addImageBtn?.addEventListener('click', () => this.showSearchContainer());
        cancelPrivateSearch?.addEventListener('click', () => this.hideSearchContainer());

        if (privateSearchInput) {
            privateSearchInput.addEventListener('input', Utils.debounce((e) => {
                this.searchUnsplashImages(e.target.value);
            }, 500));
        }

        // Enter key login
        ['privateUserId', 'privatePasscode'].forEach(id => {
            document.getElementById(id)?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
        });
    }

    // Handle user login
    handleLogin() {
        const username = document.getElementById('privateUserId').value.trim();
        const passcode = document.getElementById('privatePasscode').value.trim();

        if (!username || !passcode) {
            this.showAuthMessage('Please enter both username and passcode', 'error');
            return;
        }

        if (passcode.length !== 4 || !/^\d{4}$/.test(passcode)) {
            this.showAuthMessage('Passcode must be exactly 4 digits', 'error');
            return;
        }

        if (this.users[username]) {
            if (this.users[username].passcode === passcode) {
                this.currentUser = username;
                this.showPrivateGallery();
                this.showAuthMessage('Welcome back!', 'success');
            } else {
                this.showAuthMessage('Incorrect passcode', 'error');
            }
        } else {
            // Create new user
            this.users[username] = {
                passcode: passcode,
                images: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            localStorage.setItem('galleryUsers', JSON.stringify(this.users));
            this.currentUser = username;
            this.showPrivateGallery();
            this.showAuthMessage('Account created successfully!', 'success');
        }
    }

    // Show private gallery interface
    showPrivateGallery() {
        document.getElementById('privateAuth').style.display = 'none';
        document.getElementById('privateGallery').style.display = 'block';
        
        // Update user info
        document.getElementById('userName').textContent = `Welcome, ${this.currentUser}!`;
        
        this.updateUserStats();
        this.renderPrivateImages();
        this.updateImageCount();
        
        // Update last login
        this.users[this.currentUser].lastLogin = new Date().toISOString();
        localStorage.setItem('galleryUsers', JSON.stringify(this.users));
    }

    // Update user statistics display
    updateUserStats() {
        const user = this.users[this.currentUser];
        const statsElement = document.getElementById('userStats');
        const lastActivity = document.getElementById('lastActivity');
        
        if (statsElement) {
            statsElement.textContent = `Member since ${Utils.formatDate(user.createdAt)}`;
        }
        
        if (lastActivity) {
            lastActivity.textContent = Utils.formatTimeAgo(user.lastLogin);
        }
    }

    // Logout user
    logout() {
        this.currentUser = null;
        document.getElementById('privateAuth').style.display = 'block';
        document.getElementById('privateGallery').style.display = 'none';
        document.getElementById('privateUserId').value = '';
        document.getElementById('privatePasscode').value = '';
        this.hideSearchContainer();
        this.showAuthMessage('Logged out successfully', 'success');
    }

    // Show search container for adding images
    showSearchContainer() {
        document.getElementById('privateSearchContainer').style.display = 'block';
        document.getElementById('privateSearchInput').focus();
    }

    // Hide search container
    hideSearchContainer() {
        document.getElementById('privateSearchContainer').style.display = 'none';
        document.getElementById('privateSearchInput').value = '';
        document.getElementById('privateSearchResults').innerHTML = '';
    }

    // Search for images to add to private gallery
    async searchUnsplashImages(query) {
        if (!query.trim()) {
            document.getElementById('privateSearchResults').innerHTML = '';
            return;
        }

        try {
            let results;
            if (CONFIG.DEMO_MODE) {
                results = DEMO_IMAGES.filter(img => 
                    img.description.toLowerCase().includes(query.toLowerCase()) ||
                    img.alt_description.toLowerCase().includes(query.toLowerCase())
                );
            } else {
                const response = await fetch(
                    `${CONFIG.BASE_URL}/search/photos?query=${query}&per_page=12&client_id=${CONFIG.API_KEY}`
                );
                const data = await response.json();
                results = data.results;
            }

            this.renderSearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
        }
    }

    // Render search results for private gallery
    renderSearchResults(results) {
        const container = document.getElementById('privateSearchResults');
        container.innerHTML = results.map(item => `
            <div class="search-result-item glitter-border">
                <img src="${item.urls.small}" alt="${item.alt_description}" loading="lazy">
                <div class="result-overlay">
                    <h4>${item.user.name}</h4>
                    <p>${(item.description || item.alt_description || '').substring(0, 50)}...</p>
                    <button onclick="privateGallery.addImageFromSearch('${item.id}')" class="add-btn glitter-effect">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        `).join('');
        
        this.searchResults = results;
    }

    // Add image from search results
    addImageFromSearch(imageId) {
        const item = this.searchResults.find(img => img.id === imageId);
        if (item) {
            const success = this.addImageToPrivate({
                url: item.urls.full,
                thumbnail: item.urls.small,
                title: item.description || item.alt_description,
                author: item.user.name,
                likes: item.likes,
                savedAt: new Date().toISOString()
            });

            if (success) {
                galleria.showNotification('Image added to private gallery!', 'success');
            } else {
                galleria.showNotification('Image already in private gallery!', 'info');
            }
        }
    }

    // Render private gallery images
    renderPrivateImages() {
        const privateGrid = document.getElementById('privateGrid');
        const images = this.users[this.currentUser].images;
        
        if (images.length === 0) {
            privateGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem;" class="empty-gallery">
                    <i class="fas fa-images glitter-effect" style="font-size: 4rem; color: #87ceeb; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6b7280; margin-bottom: 1rem;">Your Private Gallery is Empty</h3>
                    <p style="color: #9ca3af; margin-bottom: 2rem;">Start building your collection by saving images from the main gallery or searching for new ones.</p>
                    <button onclick="privateGallery.showSearchContainer()" class="action-btn primary glitter-effect">
                        <i class="fas fa-search"></i> Search & Add Images
                    </button>
                </div>
            `;
            return;
        }

        privateGrid.innerHTML = images.map((img, index) => `
            <div class="gallery-item private-item glitter-border" style="animation-delay: ${index * 100}ms">
                <img src="${img.thumbnail || img.url}" alt="${img.title}" loading="lazy" class="glitter-border">
                <div class="image-overlay">
                    <h3>${img.title}</h3>
                    <p>by ${img.author}</p>
                    <div class="private-meta">
                        <span><i class="fas fa-heart"></i> ${Utils.formatNumber(img.likes || 0)}</span>
                        <span><i class="fas fa-calendar"></i> ${Utils.formatTimeAgo(img.savedAt)}</span>
                    </div>
                    <div class="private-actions">
                        <button onclick="privateGallery.viewImage(${index})" class="private-btn view" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="privateGallery.downloadPrivateImage(${index})" class="private-btn download" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button onclick="privateGallery.removeImage(${index})" class="private-btn remove" title="Remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Add image to private gallery
    addImageToPrivate(imageData) {
        if (!this.currentUser) return false;

        const userImages = this.users[this.currentUser].images;
        
        const exists = userImages.some(img => img.url === imageData.url);
        if (exists) {
            return false;
        }

        userImages.push(imageData);
        localStorage.setItem('galleryUsers', JSON.stringify(this.users));
        
        if (document.getElementById('privateGallery').style.display !== 'none') {
            this.renderPrivateImages();
            this.updateImageCount();
        }
        
        return true;
    }

    // View private image in lightbox
    viewImage(index) {
        const image = this.users[this.currentUser].images[index];
        if (image) {
            // Create a temporary item for the lightbox
            const tempItem = {
                urls: { full: image.url, regular: image.url },
                description: image.title,
                alt_description: image.title,
                user: { name: image.author },
                links: { html: '#' },
                likes: image.likes || 0,
                views: 0,
                downloads: 0,
                created_at: image.savedAt
            };
            
            // Use the main gallery lightbox
            galleria.currentItems = [tempItem];
            galleria.showLightbox(0);
        }
    }

    // Download private image
    downloadPrivateImage(index) {
        const image = this.users[this.currentUser].images[index];
        if (image) {
            const link = document.createElement('a');
            link.href = image.url;
            link.download = `private-${image.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${Date.now()}.jpg`;
            link.click();
            galleria.showNotification('Download started!', 'success');
        }
    }

    // Remove image from private gallery
    removeImage(index) {
        if (!this.currentUser) return;

        const confirmed = confirm('Are you sure you want to remove this image from your private gallery?');
        if (confirmed) {
            this.users[this.currentUser].images.splice(index, 1);
            localStorage.setItem('galleryUsers', JSON.stringify(this.users));
            this.renderPrivateImages();
            this.updateImageCount();
            galleria.showNotification('Image removed from private gallery', 'info');
        }
    }

    // Update private image count display
    updateImageCount() {
        const count = this.users[this.currentUser]?.images.length || 0;
        const countElement = document.getElementById('privateImageCount');
        if (countElement) {
            Utils.animateValue(countElement, 0, count, 500);
        }
    }

    // Show authentication message
    showAuthMessage(message, type) {
        const authMsg = document.getElementById('privateAuthMsg');
        authMsg.textContent = message;
        authMsg.className = `auth-message ${type}`;
        
        const styles = {
            success: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
            error: { bg: '#fee2e2', color: '#991b1b', border: '#ef4444' },
            info: { bg: '#dbeafe', color: '#1e40af', border: '#3b82f6' }
        };
        
        const style = styles[type] || styles.info;
        authMsg.style.cssText = `
            padding: 0.75rem;
            border-radius: 10px;
            margin-top: 1rem;
            text-align: center;
            background: ${style.bg};
            color: ${style.color};
            border: 1px solid ${style.border};
        `;
        
        setTimeout(() => {
            authMsg.textContent = '';
            authMsg.className = 'auth-message';
            authMsg.style.cssText = '';
        }, 4000);
    }
}

// Album Manager Class - Manages custom photo albums
class AlbumManager {
    constructor() {
        this.albums = JSON.parse(localStorage.getItem('photoAlbums')) || {};
        this.currentAlbum = null;
        this.selectedImageForAlbum = null;
        this.init();
    }

    // Initialize album manager
    init() {
        this.setupEventListeners();
        this.renderAlbums();
    }

    // Setup event listeners for album functionality
    setupEventListeners() {
        // Create album button
        document.getElementById('createAlbumBtn')?.addEventListener('click', () => {
            this.showCreateAlbumModal();
        });

        // Album view toggles
        document.getElementById('albumGridView')?.addEventListener('click', () => {
            this.setAlbumViewMode('grid');
        });

        document.getElementById('albumListView')?.addEventListener('click', () => {
            this.setAlbumViewMode('list');
        });

        // Back to albums button
        document.getElementById('backToAlbums')?.addEventListener('click', () => {
            this.showAlbumsView();
        });

        // Album action buttons
        document.getElementById('addToAlbumBtn')?.addEventListener('click', () => {
            // Show search or allow adding from main gallery
            galleria.showNotification('Navigate to main gallery to add images to this album', 'info');
        });

        document.getElementById('editAlbumBtn')?.addEventListener('click', () => {
            this.editCurrentAlbum();
        });

        document.getElementById('deleteAlbumBtn')?.addEventListener('click', () => {
            this.deleteCurrentAlbum();
        });

        // Create album modal
        document.getElementById('createAlbumConfirm')?.addEventListener('click', () => {
            this.createAlbum();
        });

        document.getElementById('cancelCreateAlbum')?.addEventListener('click', () => {
            this.hideCreateAlbumModal();
        });

        document.getElementById('closeCreateAlbumModal')?.addEventListener('click', () => {
            this.hideCreateAlbumModal();
        });

        // Add to album modal
        document.getElementById('addToSelectedAlbum')?.addEventListener('click', () => {
            this.addToSelectedAlbum();
        });

        document.getElementById('cancelAddToAlbum')?.addEventListener('click', () => {
            this.hideAddToAlbumModal();
        });

        document.getElementById('closeAddToAlbumModal')?.addEventListener('click', () => {
            this.hideAddToAlbumModal();
        });
    }

    // Create new album
    createAlbum() {
        const name = document.getElementById('albumName').value.trim();
        const description = document.getElementById('albumDescription').value.trim();

        if (!name) {
            galleria.showNotification('Please enter an album name', 'error');
            return;
        }

        const albumId = Utils.generateId();
        this.albums[albumId] = {
            id: albumId,
            name: name,
            description: description || '',
            images: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem('photoAlbums', JSON.stringify(this.albums));
        galleria.stats.incrementAlbums();
        this.renderAlbums();
        this.hideCreateAlbumModal();
        galleria.showNotification('Album created successfully!', 'success');
    }

    // Show create album modal
    showCreateAlbumModal() {
        document.getElementById('albumName').value = '';
        document.getElementById('albumDescription').value = '';
        document.getElementById('createAlbumModal').classList.add('active');
    }

    // Hide create album modal
    hideCreateAlbumModal() {
        document.getElementById('createAlbumModal').classList.remove('active');
    }

    // Show add to album modal
    showAddToAlbumModal(imageData) {
        this.selectedImageForAlbum = imageData;
        this.renderAlbumSelection();
        document.getElementById('addToAlbumModal').classList.add('active');
    }

    // Hide add to album modal
    hideAddToAlbumModal() {
        document.getElementById('addToAlbumModal').classList.remove('active');
        this.selectedImageForAlbum = null;
    }

    // Render album selection in modal
    renderAlbumSelection() {
        const albumList = document.getElementById('albumList');
        const albums = Object.values(this.albums);

        if (albums.length === 0) {
            albumList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #6b7280;">
                    <i class="fas fa-folder-plus" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>No albums yet. Create your first album!</p>
                    <button onclick="albumManager.hideAddToAlbumModal(); albumManager.showCreateAlbumModal();" class="action-btn primary" style="margin-top: 1rem;">
                        <i class="fas fa-plus"></i> Create Album
                    </button>
                </div>
            `;
            return;
        }

        albumList.innerHTML = albums.map(album => `
            <div class="album-option" data-album-id="${album.id}">
                <i class="fas fa-folder"></i>
                <h4>${album.name}</h4>
                <p>${album.images.length} photos</p>
            </div>
        `).join('');

        // Add click event listeners
        albumList.querySelectorAll('.album-option').forEach(option => {
            option.addEventListener('click', () => {
                albumList.querySelectorAll('.album-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    }

    // Add to selected album
    addToSelectedAlbum() {
        const selectedOption = document.querySelector('.album-option.selected');
        if (!selectedOption) {
            galleria.showNotification('Please select an album', 'error');
            return;
        }

        const albumId = selectedOption.dataset.albumId;
        const album = this.albums[albumId];
        
        if (!album || !this.selectedImageForAlbum) return;

        // Check if image already exists in album
        const exists = album.images.some(img => img.url === this.selectedImageForAlbum.urls.full);
        if (exists) {
            galleria.showNotification('Image already in this album', 'info');
            return;
        }

        // Add image to album
        album.images.push({
            url: this.selectedImageForAlbum.urls.full,
            thumbnail: this.selectedImageForAlbum.urls.small,
            title: this.selectedImageForAlbum.description || this.selectedImageForAlbum.alt_description,
            author: this.selectedImageForAlbum.user.name,
            likes: this.selectedImageForAlbum.likes,
            addedAt: new Date().toISOString()
        });

        album.updatedAt = new Date().toISOString();
        localStorage.setItem('photoAlbums', JSON.stringify(this.albums));
        
        this.hideAddToAlbumModal();
        galleria.showNotification(`Image added to ${album.name}!`, 'success');
        
        // Update current view if viewing this album
        if (this.currentAlbum === albumId) {
            this.renderAlbumPhotos();
        }
    }

    // Render all albums
    renderAlbums() {
        const albumsGrid = document.getElementById('albumsGrid');
        const albums = Object.values(this.albums);

        if (albums.length === 0) {
            albumsGrid.innerHTML = `
                <div class="empty-albums">
                    <i class="fas fa-folder-plus glitter-effect"></i>
                    <h3>No Albums Yet</h3>
                    <p>Create your first album to organize your photos</p>
                    <button onclick="albumManager.showCreateAlbumModal()" class="action-btn primary glitter-effect" style="margin-top: 1rem;">
                        <i class="fas fa-plus"></i> Create Album
                    </button>
                </div>
            `;
            return;
        }

        albumsGrid.innerHTML = albums.map(album => `
            <div class="album-card glitter-border" onclick="albumManager.viewAlbum('${album.id}')">
                <div class="album-preview">
                    ${album.images.length > 0 ? 
                        `<img src="${album.images[0].thumbnail}" alt="${album.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
                        '<i class="fas fa-folder"></i>'
                    }
                </div>
                <div class="album-info">
                    <h3>${album.name}</h3>
                    <p>${album.description || 'No description'}</p>
                    <div class="album-meta">
                        <span><i class="fas fa-images"></i> ${album.images.length} photos</span>
                        <span><i class="fas fa-calendar"></i> ${Utils.formatTimeAgo(album.updatedAt)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // View specific album
    viewAlbum(albumId) {
        this.currentAlbum = albumId;
        const album = this.albums[albumId];
        
        if (!album) return;

        document.getElementById('albumsGrid').parentElement.style.display = 'none';
        document.getElementById('albumView').style.display = 'block';
        
        document.getElementById('currentAlbumName').textContent = album.name;
        document.getElementById('currentAlbumDescription').textContent = album.
// ... (continuing from where the previous code was cut off)

        document.getElementById('currentAlbumDescription').textContent = album.description || 'No description';
        
        this.renderAlbumPhotos();
    }

    // Render photos in current album
    renderAlbumPhotos() {
        const albumPhotosGrid = document.getElementById('albumPhotosGrid');
        const album = this.albums[this.currentAlbum];
        
        if (!album) return;

        if (album.images.length === 0) {
            albumPhotosGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem;" class="empty-album">
                    <i class="fas fa-images glitter-effect" style="font-size: 4rem; color: #87ceeb; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6b7280; margin-bottom: 1rem;">Album is Empty</h3>
                    <p style="color: #9ca3af; margin-bottom: 2rem;">Add photos from the main gallery to start building this collection.</p>
                    <button onclick="navigationHandler.showSection('homeBtn', 'mainApp')" class="action-btn primary glitter-effect">
                        <i class="fas fa-search"></i> Browse Gallery
                    </button>
                </div>
            `;
            return;
        }

        albumPhotosGrid.innerHTML = album.images.map((img, index) => `
            <div class="gallery-item album-photo glitter-border" style="animation-delay: ${index * 100}ms">
                <img src="${img.thumbnail || img.url}" alt="${img.title}" loading="lazy" class="glitter-border">
                <div class="image-overlay">
                    <h3>${img.title}</h3>
                    <p>by ${img.author}</p>
                    <div class="album-meta">
                        <span><i class="fas fa-heart"></i> ${Utils.formatNumber(img.likes || 0)}</span>
                        <span><i class="fas fa-calendar"></i> ${Utils.formatTimeAgo(img.addedAt)}</span>
                    </div>
                    <div class="album-actions">
                        <button onclick="albumManager.viewAlbumImage(${index})" class="album-btn view" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="albumManager.downloadAlbumImage(${index})" class="album-btn download" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button onclick="albumManager.removeFromAlbum(${index})" class="album-btn remove" title="Remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // View image from album in lightbox
    viewAlbumImage(index) {
        const album = this.albums[this.currentAlbum];
        const image = album.images[index];
        
        if (image) {
            const tempItem = {
                urls: { full: image.url, regular: image.url },
                description: image.title,
                alt_description: image.title,
                user: { name: image.author },
                links: { html: '#' },
                likes: image.likes || 0,
                views: 0,
                downloads: 0,
                created_at: image.addedAt
            };
            
            galleria.currentItems = [tempItem];
            galleria.showLightbox(0);
        }
    }

    // Download image from album
    downloadAlbumImage(index) {
        const album = this.albums[this.currentAlbum];
        const image = album.images[index];
        
        if (image) {
            const link = document.createElement('a');
            link.href = image.url;
            link.download = `album-${album.name}-${image.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${Date.now()}.jpg`;
            link.click();
            galleria.showNotification('Download started!', 'success');
        }
    }

    // Remove image from album
    removeFromAlbum(index) {
        const album = this.albums[this.currentAlbum];
        
        if (!album) return;

        const confirmed = confirm('Are you sure you want to remove this image from the album?');
        if (confirmed) {
            album.images.splice(index, 1);
            album.updatedAt = new Date().toISOString();
            localStorage.setItem('photoAlbums', JSON.stringify(this.albums));
            this.renderAlbumPhotos();
            galleria.showNotification('Image removed from album', 'info');
        }
    }

    // Show albums view
    showAlbumsView() {
        document.getElementById('albumsGrid').parentElement.style.display = 'block';
        document.getElementById('albumView').style.display = 'none';
        this.currentAlbum = null;
        this.renderAlbums();
    }

    // Edit current album
    editCurrentAlbum() {
        const album = this.albums[this.currentAlbum];
        if (!album) return;

        const newName = prompt('Enter new album name:', album.name);
        if (newName && newName.trim() !== album.name) {
            album.name = newName.trim();
            album.updatedAt = new Date().toISOString();
            localStorage.setItem('photoAlbums', JSON.stringify(this.albums));
            document.getElementById('currentAlbumName').textContent = album.name;
            galleria.showNotification('Album updated!', 'success');
        }
    }

    // Delete current album
    deleteCurrentAlbum() {
        const album = this.albums[this.currentAlbum];
        if (!album) return;

        const confirmed = confirm(`Are you sure you want to delete the album "${album.name}"? This action cannot be undone.`);
        if (confirmed) {
            delete this.albums[this.currentAlbum];
            localStorage.setItem('photoAlbums', JSON.stringify(this.albums));
            galleria.stats.decrementAlbums();
            this.showAlbumsView();
            galleria.showNotification('Album deleted', 'info');
        }
    }

    // Set album view mode
    setAlbumViewMode(mode) {
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`album${mode.charAt(0).toUpperCase() + mode.slice(1)}View`).classList.add('active');
    }
}

// Share Manager Class - Handles social media sharing
class ShareManager {
    constructor() {
        this.currentImage = null;
        this.init();
    }

    // Initialize share manager
    init() {
        this.setupEventListeners();
    }

    // Setup event listeners for sharing
    setupEventListeners() {
        // Share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareToSocial(platform);
            });
        });

        // Copy link button
        document.getElementById('copyLink')?.addEventListener('click', () => {
            this.copyShareLink();
        });

        // Close share modal
        document.getElementById('closeShareModal')?.addEventListener('click', () => {
            this.hideShareModal();
        });
    }

    // Show share modal
    showShareModal(imageData) {
        this.currentImage = imageData;
        const shareLink = document.getElementById('shareLink');
        
        // Generate shareable link (in real app, this would be a proper URL)
        const link = imageData.links.html || `https://galleria.app/image/${imageData.id}`;
        shareLink.value = link;
        
        document.getElementById('shareModal').classList.add('active');
    }

    // Hide share modal
    hideShareModal() {
        document.getElementById('shareModal').classList.remove('active');
        this.currentImage = null;
    }

    // Share to social media platforms
    shareToSocial(platform) {
        if (!this.currentImage) return;

        const image = this.currentImage;
        const text = `Check out this amazing photo by ${image.user.name}`;
        const url = image.links.html || `https://galleria.app/image/${image.id}`;
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'pinterest':
                shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image.urls.regular)}&description=${encodeURIComponent(text)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            galleria.showNotification(`Sharing to ${platform}!`, 'success');
        }
    }

    // Copy share link to clipboard
    async copyShareLink() {
        const shareLink = document.getElementById('shareLink');
        
        try {
            await navigator.clipboard.writeText(shareLink.value);
            galleria.showNotification('Link copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            shareLink.select();
            shareLink.setSelectionRange(0, 99999);
            document.execCommand('copy');
            galleria.showNotification('Link copied to clipboard!', 'success');
        }
    }
}

// Search History Manager - Tracks and displays search history
class SearchHistory {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        this.init();
    }

    // Initialize search history
    init() {
        this.setupEventListeners();
        this.renderHistory();
    }

    // Setup event listeners for history
    setupEventListeners() {
        // Clear history button
        document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
            this.clearHistory();
        });

        // History filter
        document.getElementById('historyFilter')?.addEventListener('change', (e) => {
            this.filterHistory(e.target.value);
        });
    }

    // Add search to history
    addSearch(query) {
        if (!query.trim()) return;

        // Remove existing entry if it exists
        this.history = this.history.filter(item => item.query !== query);
        
        // Add new entry at the beginning
        this.history.unshift({
            query: query,
            timestamp: new Date().toISOString(),
            results: galleria.currentItems.length
        });

        // Limit history size
        if (this.history.length > CONFIG.MAX_HISTORY_ITEMS) {
            this.history = this.history.slice(0, CONFIG.MAX_HISTORY_ITEMS);
        }

        localStorage.setItem('searchHistory', JSON.stringify(this.history));
        this.renderHistory();
    }

    // Render search history
    renderHistory() {
        const historyContent = document.getElementById('historyContent');
        
        if (this.history.length === 0) {
            historyContent.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-search"></i>
                    <h3>No Search History</h3>
                    <p>Your search history will appear here</p>
                </div>
            `;
            return;
        }

        historyContent.innerHTML = this.history.map((item, index) => `
            <div class="history-item">
                <div class="history-details">
                    <h4 onclick="searchHistory.repeatSearch('${item.query}')">${item.query}</h4>
                    <div class="history-meta">
                        <span><i class="fas fa-clock"></i> ${Utils.formatTimeAgo(item.timestamp)}</span>
                        <span><i class="fas fa-images"></i> ${item.results} results</span>
                    </div>
                </div>
                <button class="remove-history-btn" onclick="searchHistory.removeItem(${index})" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // Repeat a search from history
    repeatSearch(query) {
        document.getElementById('searchInput').value = query;
        galleria.searchBtn.click();
        navigationHandler.showSection('homeBtn', 'mainApp');
    }

    // Remove specific history item
    removeItem(index) {
        this.history.splice(index, 1);
        localStorage.setItem('searchHistory', JSON.stringify(this.history));
        this.renderHistory();
        galleria.showNotification('Search removed from history', 'info');
    }

    // Clear all history
    clearHistory() {
        const confirmed = confirm('Are you sure you want to clear all search history?');
        if (confirmed) {
            this.history = [];
            localStorage.setItem('searchHistory', JSON.stringify(this.history));
            this.renderHistory();
            galleria.showNotification('Search history cleared', 'info');
        }
    }

    // Filter history by time period
    filterHistory(period) {
        const now = new Date();
        let filteredHistory = [...this.history];

        switch(period) {
            case 'today':
                filteredHistory = this.history.filter(item => {
                    const itemDate = new Date(item.timestamp);
                    return itemDate.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredHistory = this.history.filter(item => 
                    new Date(item.timestamp) >= weekAgo
                );
                break;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filteredHistory = this.history.filter(item => 
                    new Date(item.timestamp) >= monthAgo
                );
                break;
            default:
                filteredHistory = this.history;
        }

        this.renderFilteredHistory(filteredHistory);
    }

    // Render filtered history
    renderFilteredHistory(items) {
        const historyContent = document.getElementById('historyContent');
        
        if (items.length === 0) {
            historyContent.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-search"></i>
                    <h3>No Search History</h3>
                    <p>No searches found for the selected time period</p>
                </div>
            `;
            return;
        }

        historyContent.innerHTML = items.map((item, index) => `
            <div class="history-item">
                <div class="history-details">
                    <h4 onclick="searchHistory.repeatSearch('${item.query}')">${item.query}</h4>
                    <div class="history-meta">
                        <span><i class="fas fa-clock"></i> ${Utils.formatTimeAgo(item.timestamp)}</span>
                        <span><i class="fas fa-images"></i> ${item.results} results</span>
                    </div>
                </div>
                <button class="remove-history-btn" onclick="searchHistory.removeItem(${this.history.indexOf(item)})" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
}

// Navigation Handler - Manages navigation between sections
class NavigationHandler {
    constructor() {
        this.currentSection = 'mainApp';
        this.init();
    }

    // Initialize navigation
    init() {
        this.setupEventListeners();
        this.showSection('homeBtn', 'mainApp');
    }

    // Setup navigation event listeners
    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnId = e.currentTarget.id;
                const sectionMap = {
                    'homeBtn': 'mainApp',
                    'aboutBtn': 'aboutSection',
                    'privateBtn': 'privateSection',
                    'albumsBtn': 'albumsSection',
                    'historyBtn': 'historySection'
                };
                
                const sectionId = sectionMap[btnId];
                if (sectionId) {
                    this.showSection(btnId, sectionId);
                }
            });
        });

        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.closest('.modal, .share-modal').classList.remove('active');
            });
        });

        // Lightbox overlay click
        document.querySelector('.lightbox-overlay')?.addEventListener('click', () => {
            galleria.closeLightbox();
        });
    }

    // Show specific section
    showSection(buttonId, sectionId) {
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(buttonId)?.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.content-section, #mainApp').forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        document.getElementById(sectionId).style.display = 'block';
        this.currentSection = sectionId;

        // Section-specific actions
        switch(sectionId) {
            case 'albumsSection':
                albumManager.renderAlbums();
                break;
            case 'historySection':
                searchHistory.renderHistory();
                break;
            case 'privateSection':
                if (privateGallery.currentUser) {
                    privateGallery.showPrivateGallery();
                }
                break;
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize Application - Creates instances of all managers
class GalleriaApp {
    constructor() {
        this.init();
    }

    // Initialize the complete application
    async init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
    }

    // Start the application
    startApp() {
        try {
            // Initialize all managers
            window.galleria = new Galleria();
            window.privateGallery = new PrivateGallery();
            window.albumManager = new AlbumManager();
            window.shareManager = new ShareManager();
            window.searchHistory = new SearchHistory();
            window.navigationHandler = new NavigationHandler();

            // Setup global error handling
            this.setupErrorHandling();
            
            // Setup service worker for offline support (if needed)
            this.setupServiceWorker();
            
            console.log('Galleria application initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize Galleria:', error);
            this.showCriticalError();
        }
    }

    // Setup global error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            galleria?.showNotification('An unexpected error occurred', 'error');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            galleria?.showNotification('An unexpected error occurred', 'error');
        });
    }

    // Setup service worker for offline support
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    // Show critical error when app fails to initialize
    showCriticalError() {
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f3f4f6; font-family: system-ui;">
                <div style="text-align: center; padding: 2rem; background: white; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 500px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <h2 style="color: #374151; margin-bottom: 1rem;">Application Error</h2>
                    <p style="color: #6b7280; margin-bottom: 2rem;">Failed to initialize Galleria. Please refresh the page and try again.</p>
                    <button onclick="window.location.reload()" style="padding: 1rem 2rem; background: #3b82f6; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 500;">
                        <i class="fas fa-redo"></i> Reload Page
                    </button>
                </div>
            </div>
        `;
    }
}

// Additional CSS for overlay buttons and enhanced styles
const additionalStyles = `
.overlay-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;
}

.overlay-btn {
    width: 35px;
    height: 35px;
    background: rgba(0, 191, 255, 0.9);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.overlay-btn:hover {
    background: var(--sky-blue-dark);
    transform: scale(1.1);
}

.search-result-item {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    background: white;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    cursor: pointer;
    margin-bottom: 1rem;
}

.search-result-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.result-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    color: white;
    padding: 1rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.search-result-item:hover .result-overlay {
    transform: translateY(0);
}

.add-btn {
    padding: 0.5rem 1rem;
    background: var(--gradient-sky);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    margin-top: 0.5rem;
    transition: all 0.3s ease;
}

.add-btn:hover {
    transform: scale(1.05);
}

.private-btn, .album-btn {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    color: white;
    font-size: 0.875rem;
}

.private-btn.view, .album-btn.view {
    background: var(--sky-blue);
}

.private-btn.download, .album-btn.download {
    background: var(--success-color);
}

.private-btn.remove, .album-btn.remove {
    background: var(--danger-color);
}

.private-btn:hover, .album-btn:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-sm);
}

.private-actions, .album-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;
}

.private-meta, .album-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
}

.private-meta span, .album-meta span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.auth-message {
    font-size: 0.875rem;
    font-weight: 500;
}

.auth-message.success {
    color: var(--success-color);
}

.auth-message.error {
    color: var(--danger-color);
}

.auth-message.info {
    color: var(--sky-blue);
}

@media (max-width: 768px) {
    .private-search-container {
        margin: 1rem;
        padding: 1rem;
    }
    
    .search-result-item {
        margin: 0.5rem 0;
    }
    
    .private-actions, .album-actions {
        gap: 0.25rem;
    }
    
    .overlay-actions {
        gap: 0.25rem;
    }
    
    .overlay-btn {
        width: 30px;
        height: 30px;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
const app = new GalleriaApp();

// Export for global access (if needed for debugging)
window.GalleriaApp = GalleriaApp;
window.Utils = Utils;
window.CONFIG = CONFIG;

// Console welcome message
console.log(`
%c  ____       _ _            _       
 / ___| __ _| | | ___ _ __(_) __ _ 
| |  _ / _\` | | |/ _ \\ '__| |/ _\` |
| |_| | (_| | | |  __/ |  | | (_| |
 \\____|\\__,_|_|_|\\___|_|  |_|\\__,_|

Advanced Photo Gallery Application
Developed by Amit Kumar
Under Guidance of Tarush Sir
`, 'color: #00bfff; font-weight: bold;');

console.log('🚀 Galleria initialized successfully!');
console.log('📱 Responsive design active');
console.log('✨ All features loaded and ready');
console.log('🎨 Enhanced UI with glitter effects active');
console.log('📊 Statistics tracking enabled');
