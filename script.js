// Enhanced Configuration and Constants
const CONFIG = {
    API_KEY: 'CLiqy8UK-ptDrv1z7MuC51MKMOlP_DSs3DToSf-GYGY',
    BASE_URL: 'https://api.unsplash.com',
    DEMO_MODE: true,
    IMAGES_PER_PAGE: 30,
    SEARCH_DELAY: 500,
    ANIMATION_DELAY: 100,
    MAX_HISTORY_ITEMS: 50
};

// Demo Images with Enhanced Data
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

// Utility Functions
class Utils {
    static formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

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

    static debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

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
}

// Enhanced Stats Manager
class StatsManager {
    constructor() {
        this.stats = this.loadStats();
        this.updateDisplay();
    }

    loadStats() {
        return JSON.parse(localStorage.getItem('galleriaStats')) || {
            totalImages: 0,
            totalSearches: 0,
            totalDownloads: 0,
            lastActivity: null
        };
    }

    saveStats() {
        localStorage.setItem('galleriaStats', JSON.stringify(this.stats));
    }

    incrementImages(count = 1) {
        this.stats.totalImages += count;
        this.stats.lastActivity = new Date().toISOString();
        this.saveStats();
        this.updateDisplay();
    }

    incrementSearches() {
        this.stats.totalSearches++;
        this.stats.lastActivity = new Date().toISOString();
        this.saveStats();
        this.updateDisplay();
    }

    incrementDownloads() {
        this.stats.totalDownloads++;
        this.saveStats();
        this.updateDisplay();
    }

    updateDisplay() {
        const totalImages = document.getElementById('totalImages');
        const totalSearches = document.getElementById('totalSearches');
        const totalDownloads = document.getElementById('totalDownloads');
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
        if (lastActivity) {
            lastActivity.textContent = this.stats.lastActivity ? 
                Utils.formatTimeAgo(this.stats.lastActivity) : 'Never';
        }
    }
}

// Enhanced Gallery Class
class Galleria {
    constructor() {
        this.grid = document.getElementById('adaptiveGrid');
        this.searchInput = document.getElementById('searchInput');
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
        
        this.init();
    }

    async init() {
        this.setupIntersectionObserver();
        await this.loadImages();
        this.setupEventListeners();
        this.animateInitialElements();
        this.setupSearchSuggestions();
    }

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

    async loadImages() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.loading.style.display = 'flex';

        try {
            let data;
            if (CONFIG.DEMO_MODE || !CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                data = this.query ? 
                    DEMO_IMAGES.filter(img => 
                        img.description.toLowerCase().includes(this.query.toLowerCase()) ||
                        img.alt_description.toLowerCase().includes(this.query.toLowerCase())
                    ) : DEMO_IMAGES;
            } else {
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

    renderGallery() {
        this.grid.innerHTML = '';
        this.grid.className = `adaptive-grid ${this.viewMode}-view`;
        
        this.currentItems.forEach((item, index) => {
            const galleryItem = this.createGalleryItem(item, index);
            this.grid.appendChild(galleryItem);
            this.intersectionObserver.observe(galleryItem);
        });
    }

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
                    <button class="overlay-btn" onclick="galleria.showLightbox(${index})">
                        <i class="fas fa-expand"></i>
                    </button>
                    <button class="overlay-btn" onclick="galleria.quickSave(${index})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="overlay-btn" onclick="galleria.quickShare(${index})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        `;

        div.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && !e.target.closest('.overlay-actions')) {
                this.showLightbox(index);
            }
        });

        return div;
    }

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

        // Sort options
        document.getElementById('sortBy')?.addEventListener('change', async (e) => {
            this.sortBy = e.target.value;
            this.page = 1;
            await this.loadImages();
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

    selectSuggestion(suggestion) {
        this.searchInput.value = suggestion;
        this.searchInput.dispatchEvent(new Event('input'));
        document.getElementById('searchSuggestions').style.display = 'none';
    }

    setViewMode(mode) {
        this.viewMode = mode;
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${mode}View`).classList.add('active');
        this.renderGallery();
    }

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
        const unsplashLink = document.getElementById('unsplashLink');
        const downloadBtn = document.getElementById('downloadBtn');
        const addToPrivateBtn = document.getElementById('addToPrivateBtn');
        const shareBtn = document.getElementById('shareBtn');

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
        unsplashLink.href = item.links.html;

        // Setup action buttons
        downloadBtn.onclick = () => this.downloadImage(item);
        shareBtn.onclick = () => shareManager.showShareModal(item);
        addToPrivateBtn.onclick = () => this.addToPrivate(item);

        // Setup navigation
        this.setupLightboxNavigation();

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

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

    navigateImage(direction) {
        const newIndex = this.currentIndex + direction;
        if (newIndex >= 0 && newIndex < this.currentItems.length) {
            this.showLightbox(newIndex);
        }
    }

    closeLightbox() {
        document.getElementById('fullscreenLightbox').classList.remove('active');
        document.body.style.overflow = '';
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    downloadImage(item) {
        const link = document.createElement('a');
        link.href = item.urls.full;
        link.download = `galleria-${item.id}-${Date.now()}.jpg`;
        link.target = '_blank';
        link.click();
        this.stats.incrementDownloads();
        this.showNotification('Download started!', 'success');
    }

    quickSave(index) {
        const item = this.currentItems[index];
        this.addToPrivate(item);
    }

    quickShare(index) {
        const item = this.currentItems[index];
        shareManager.showShareModal(item);
    }

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
                this.showNotification('Image saved to private gallery!', 'success');
            } else {
                this.showNotification('Image already in private gallery!', 'info');
            }
        } else {
            authManager.showAuthModal();
        }
    }

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

// Enhanced Private Gallery Class
class PrivateGallery {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('galleryUsers')) || {};
        this.currentUser = null;
        this.searchResults = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

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

    logout() {
        this.currentUser = null;
        document.getElementById('privateAuth').style.display = 'block';
        document.getElementById('privateGallery').style.display = 'none';
        document.getElementById('privateUserId').value = '';
        document.getElementById('privatePasscode').value = '';
        this.hideSearchContainer();
        this.showAuthMessage('Logged out successfully', 'success');
    }

    showSearchContainer() {
        document.getElementById('privateSearchContainer').style.display = 'block';
        document.getElementById('privateSearchInput').focus();
    }

    hideSearchContainer() {
        document.getElementById('privateSearchContainer').style.display = 'none';
        document.getElementById('privateSearchInput').value = '';
        document.getElementById('privateSearchResults').innerHTML = '';
    }

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

    addImageFromSearch(imageId) {
        const item = this.searchResults.find(img => img.id === imageId);
        if (item) {
            this.addImageToPrivate({
                url: item.urls.full,
                thumbnail: item.urls.small,
                title: item.description || item.alt_description,
                author: item.user.name,
                likes: item.likes,
                savedAt: new Date().toISOString()
            });
        }
    }

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
                        <button onclick="privateGallery.viewImage(${index})" class="private-btn view">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="privateGallery.downloadPrivateImage(${index})" class="private-btn download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button onclick="privateGallery.removeImage(${index})" class="private-btn remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

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

    updateImageCount() {
        const count = this.users[this.currentUser]?.images.length || 0;
        const countElement = document.getElementById('privateImageCount');
        if (countElement) {
            Utils.animateValue(countElement, 0, count, 500);
        }
    }

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

// Search History Manager
class SearchHistory {
    constructor() {
        this.history = this.loadHistory();
        this.maxItems = CONFIG.MAX_HISTORY_ITEMS;
    }

    loadHistory() {
        return JSON.parse(localStorage.getItem('searchHistory')) || [];
    }

    saveHistory() {
        localStorage.setItem('searchHistory', JSON.stringify(this.history));
    }

    addSearch(query) {
        if (!query.trim()) return;

        const existingIndex = this.history.findIndex(item => item.query === query);
        if (existingIndex > -1) {
            this.history[existingIndex].timestamp = new Date().toISOString();
            this.history[existingIndex].count++;
        } else {
            this.history.unshift({
                query,
                timestamp: new Date().toISOString(),
                count: 1
            });
        }

        if (this.history.length > this.maxItems) {
            this.history = this.history.slice(0, this.maxItems);
        }

        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        const container = document.getElementById('historyContent');
        if (!container) return;

        if (this.history.length === 0) {
            container.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-search glitter-effect"></i>
                    <h3>No Search History</h3>
                    <p>Your search history will appear here</p>
                </div>
            `;
            return;
        }

        const filteredHistory = this.getFilteredHistory();
        container.innerHTML = filteredHistory.map(item => `
            <div class="history-item">
                <div class="history-details">
                    <h4 onclick="searchHistory.repeatSearch('${item.query}')" style="cursor: pointer; color: var(--sky-blue);">
                        "${item.query}"
                    </h4>
                    <div class="history-meta">
                        <span><i class="fas fa-clock"></i> ${Utils.formatTimeAgo(item.timestamp)}</span>
                        <span><i class="fas fa-redo"></i> ${item.count} times</span>
                    </div>
                </div>
                <button onclick="searchHistory.removeItem('${item.query}')" class="remove-history-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    getFilteredHistory() {
        const filter = document.getElementById('historyFilter')?.value || 'all';
        const now = new Date();
        
        return this.history.filter(item => {
            const itemDate = new Date(item.timestamp);
            const diffInDays = (now - itemDate) / (1000 * 60 * 60 * 24);
            
            switch(filter) {
                case 'today': return diffInDays < 1;
                case 'week': return diffInDays < 7;
                case 'month': return diffInDays < 30;
                default: return true;
            }
        });
    }

    repeatSearch(query) {
        document.getElementById('searchInput').value = query;
        document.getElementById('searchInput').dispatchEvent(new Event('input'));
        navigationHandler.showSection('homeBtn', 'mainApp');
    }

    removeItem(query) {
        this.history = this.history.filter(item => item.query !== query);
        this.saveHistory();
        this.renderHistory();
    }

    clearAll() {
        const confirmed = confirm('Are you sure you want to clear all search history?');
        if (confirmed) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
            galleria.showNotification('Search history cleared!', 'info');
        }
    }
}

// Share Manager
class ShareManager {
    constructor() {
        this.currentItem = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('closeShareModal')?.addEventListener('click', () => {
            this.hideShareModal();
        });

        document.getElementById('copyLink')?.addEventListener('click', () => {
            this.copyShareLink();
        });

        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.shareToSocial(e.target.closest('.share-btn').dataset.platform);
            });
        });

        // Close modal on overlay click
        document.getElementById('shareModal')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideShareModal();
            }
        });
    }

    showShareModal(item) {
        this.currentItem = item;
        const modal = document.getElementById('shareModal');
        const shareLink = document.getElementById('shareLink');
        
        shareLink.value = item.links.html;
        modal.classList.add('active');
    }

    hideShareModal() {
        document.getElementById('shareModal').classList.remove('active');
        this.currentItem = null;
    }

    copyShareLink() {
        const shareLink = document.getElementById('shareLink');
        shareLink.select();
        document.execCommand('copy');
        galleria.showNotification('Link copied to clipboard!', 'success');
    }

    shareToSocial(platform) {
        if (!this.currentItem) return;

        const url = encodeURIComponent(this.currentItem.links.html);
        const text = encodeURIComponent(`Check out this amazing photo by ${this.currentItem.user.name}!`);
        const hashtags = encodeURIComponent('photography,galleria,unsplash');

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
            reddit: `https://reddit.com/submit?url=${url}&title=${text}`,
            whatsapp: `https://wa.me/?text=${text} ${url}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
            galleria.showNotification(`Shared to ${platform}!`, 'success');
        }
    }
}

// Authentication Manager
class AuthManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('closeAuthModal')?.addEventListener('click', () => {
            this.hideAuthModal();
        });

        document.getElementById('goToPrivate')?.addEventListener('click', () => {
            this.hideAuthModal();
            navigationHandler.showSection('privateBtn', 'privateSection');
        });

        document.getElementById('cancelAuth')?.addEventListener('click', () => {
            this.hideAuthModal();
        });

        // Close modal on overlay click
        document.getElementById('authModal')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideAuthModal();
            }
        });
    }

    showAuthModal() {
        document.getElementById('authModal').classList.add('active');
    }

    hideAuthModal() {
        document.getElementById('authModal').classList.remove('active');
    }
}

// Enhanced Navigation Handler
class NavigationHandler {
    constructor() {
        this.sections = {
            homeBtn: 'mainApp',
            aboutBtn: 'aboutSection',
            privateBtn: 'privateSection',
            historyBtn: 'historySection'
        };
        this.init();
    }

    init() {
        Object.entries(this.sections).forEach(([btnId, sectionId]) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', () => this.showSection(btnId, sectionId));
            }
        });

        // History filter
        document.getElementById('historyFilter')?.addEventListener('change', () => {
            searchHistory.renderHistory();
        });

        // Clear history
        document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
            searchHistory.clearAll();
        });
    }

    showSection(btnId, sectionId) {
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(btnId).classList.add('active');

        // Show/hide sections
        document.querySelectorAll('.app-container > section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';

        // Special handling for history section
        if (sectionId === 'historySection') {
            searchHistory.renderHistory();
        }

        // Animate section entrance
        const section = document.getElementById(sectionId);
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Scroll Animation Handler
class ScrollAnimationHandler {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(
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

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        this.addScrollClasses();
    }

    addScrollClasses() {
        const elementsToAnimate = [
            '.about-card',
            '.contact-card',
            '.auth-card',
            '.private-header',
            '.private-stats',
            '.stat-card'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('scroll-animate');
            });
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    window.galleria = new Galleria();
    window.privateGallery = new PrivateGallery();
    window.searchHistory = new SearchHistory();
    window.shareManager = new ShareManager();
    window.authManager = new AuthManager();
    window.navigationHandler = new NavigationHandler();
    window.scrollAnimationHandler = new ScrollAnimationHandler();

    // Add additional CSS for new features
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .overlay-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .overlay-btn {
            width: 35px;
            height: 35px;
            background: rgba(0, 191, 255, 0.8);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .overlay-btn:hover {
            background: var(--sky-blue);
            transform: scale(1.1);
        }

        .search-result-item {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            background: white;
            box-shadow: var(--shadow-md);
            transition: all 0.3s ease;
        }

        .search-result-item:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .search-result-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .result-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.9));
            color: white;
            padding: 1rem;
        }

        .add-btn {
            padding: 0.5rem 1rem;
            background: var(--sky-blue);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 500;
            margin-top: 0.5rem;
            transition: all 0.3s ease;
        }

        .add-btn:hover {
            background: var(--sky-blue-dark);
            transform: scale(1.05);
        }

        .private-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .private-btn {
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 0.75rem;
        }

        .private-btn.view {
            background: var(--sky-blue);
            color: white;
        }

        .private-btn.download {
            background: var(--success-color);
            color: white;
        }

        .private-btn.remove {
            background: var(--danger-color);
            color: white;
        }

        .private-btn:hover {
            transform: scale(1.2);
        }

        .private-meta {
            display: flex;
            gap: 1rem;
            font-size: 0.75rem;
            margin: 0.5rem 0;
        }

        .private-meta span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        #privateSearchResults {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .history-item {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }

        .history-item:hover {
            background: rgba(0, 191, 255, 0.05);
            border-left: 4px solid var(--sky-blue);
            padding-left: calc(1.5rem - 4px);
        }

        .history-item:last-child {
            border-bottom: none;
        }

        .history-details h4 {
            color: var(--text-primary);
            margin-bottom: 0.25rem;
            font-weight: 500;
        }

        .history-meta {
            display: flex;
            gap: 1rem;
            font-size: 0.875rem;
            color: var(--text-secondary);
        }

        .history-meta span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .remove-history-btn {
            width: 30px;
            height: 30px;
            background: var(--danger-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            opacity: 0.7;
        }

        .remove-history-btn:hover {
            opacity: 1;
            transform: scale(1.1);
        }

        .error-message .action-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--sky-blue);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .error-message .action-btn:hover {
            background: var(--sky-blue-dark);
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            .overlay-actions {
                flex-direction: column;
                align-items: stretch;
            }

            .overlay-btn {
                width: 100%;
                height: 40px;
                border-radius: 20px;
            }

            #privateSearchResults {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }

            .history-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }

            .history-meta {
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    `;
    
    document.head.appendChild(additionalStyles);

    console.log('🎨 Enhanced Galleria initialized successfully!');
});
