// Enhanced Configuration and Constants
const CONFIG = {
    API_KEY: 'CLiqy8UK-ptDrv1z7MuC51MKMOlP_DSs3DToSf-GYGY',
    BASE_URL: 'https://api.unsplash.com',
    DEMO_MODE: false,
    IMAGES_PER_PAGE: 30,
    SEARCH_DELAY: 500,
    ANIMATION_DELAY: 100,
    MAX_HISTORY_ITEMS: 50
};

// Demo Images for fallback
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
    }
];

// Enhanced Utility Functions
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

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
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
            totalAlbums: 0,
            totalFavorites: 0,
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

    incrementAlbums() {
        this.stats.totalAlbums++;
        this.saveStats();
        this.updateDisplay();
    }

    decrementAlbums() {
        this.stats.totalAlbums = Math.max(0, this.stats.totalAlbums - 1);
        this.saveStats();
        this.updateDisplay();
    }

    incrementFavorites() {
        this.stats.totalFavorites++;
        this.saveStats();
        this.updateDisplay();
    }

    updateDisplay() {
        const totalImages = document.getElementById('totalImages');
        const totalSearches = document.getElementById('totalSearches');
        const totalDownloads = document.getElementById('totalDownloads');
        const totalAlbums = document.getElementById('totalAlbums');
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
            const searchQuery = this.query || 'nature';
            
            if (CONFIG.DEMO_MODE) {
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
                    `${CONFIG.BASE_URL}/search/photos?query=${encodeURIComponent(searchQuery)}&page=${this.page}&per_page=${CONFIG.IMAGES_PER_PAGE}&order_by=${this.sortBy}&client_id=${CONFIG.API_KEY}` :
                    `${CONFIG.BASE_URL}/search/photos?query=${encodeURIComponent(searchQuery)}&page=${this.page}&per_page=${CONFIG.IMAGES_PER_PAGE}&order_by=${this.sortBy}&client_id=${CONFIG.API_KEY}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const result = await response.json();
                data = result.results || result;
            }

            this.currentItems = data;
            this.stats.incrementImages(data.length);
            this.renderGallery();
        } catch (error) {
            console.error('Error loading images:', error);
            // Fallback to demo mode
            CONFIG.DEMO_MODE = true;
            this.currentItems = DEMO_IMAGES;
            this.renderGallery();
            this.showNotification('Using demo images - API unavailable', 'info');
        } finally {
            this.isLoading = false;
            this.loading.style.display = 'none';
        }
    }

    renderGallery() {
        this.grid.innerHTML = '';
        this.grid.className = `adaptive-grid ${this.viewMode}-view`;
        
        if (this.currentItems.length === 0) {
            this.grid.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: white;">No images found for your search.</div>';
            return;
        }
        
        this.currentItems.forEach((item, index) => {
            const galleryItem = this.createGalleryItem(item, index);
            this.grid.appendChild(galleryItem);
            this.intersectionObserver.observe(galleryItem);
        });
    }

    createGalleryItem(item, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item scroll-animate neon-border';
        div.style.animationDelay = `${index * CONFIG.ANIMATION_DELAY}ms`;
        div.dataset.index = index;
        
        // Smart sizing based on image dimensions
        const aspectRatio = item.width / item.height;
        if (aspectRatio > 1.5) {
            div.dataset.size = 'large';
        } else if (aspectRatio < 0.7) {
            div.dataset.size = 'tall';
        } else {
            div.dataset.size = 'medium';
        }
        
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
                 class="neon-border">
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

    setupEventListeners() {
        // Enhanced search with debounce
        this.searchInput.addEventListener('input', Utils.debounce(async (e) => {
            this.query = e.target.value.trim();
            if (this.query.length > 2 || this.query.length === 0) {
                if (this.query) {
                    this.stats.incrementSearches();
                    searchHistory.addSearch(this.query);
                }
                this.page = 1;
                await this.loadImages();
            }
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

        // Sort options
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

        this.searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (suggestionsContainer) {
                    suggestionsContainer.style.display = 'none';
                }
            }, 200);
        });
    }

    showSuggestions(suggestions) {
        const container = document.getElementById('searchSuggestions');
        if (!container) return;
        
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
        this.searchBtn.click();
        const container = document.getElementById('searchSuggestions');
        if (container) {
            container.style.display = 'none';
        }
    }

    setViewMode(mode) {
        this.viewMode = mode;
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
        const modeBtn = document.getElementById(`${mode}View`);
        if (modeBtn) {
            modeBtn.classList.add('active');
        }
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
        const downloadBtn = document.getElementById('downloadBtn');
        const addToPrivateBtn = document.getElementById('addToPrivateBtn');
        const shareBtn = document.getElementById('shareBtn');
        const addToAlbumLightboxBtn = document.getElementById('addToAlbumLightboxBtn');

        // Show loading
        const imageLoader = document.getElementById('imageLoader');
        if (imageLoader) imageLoader.style.display = 'block';
        lightboxImg.style.opacity = '0';

        // Load high-res image
        const img = new Image();
        img.onload = () => {
            lightboxImg.src = item.urls.full;
            lightboxImg.style.opacity = '1';
            if (imageLoader) imageLoader.style.display = 'none';
        };
        img.src = item.urls.full;

        // Set content
        if (imageTitle) imageTitle.textContent = item.description || item.alt_description || 'Beautiful Image';
        if (imageAuthor) imageAuthor.textContent = `by ${item.user.name}`;
        if (imageLikes) imageLikes.innerHTML = `<i class="fas fa-heart"></i> ${Utils.formatNumber(item.likes || 0)}`;
        if (imageViews) imageViews.innerHTML = `<i class="fas fa-eye"></i> ${Utils.formatNumber(item.views || 0)}`;
        if (imageDate) imageDate.innerHTML = `<i class="fas fa-calendar"></i> ${Utils.formatDate(item.created_at)}`;

        // Setup action buttons
        if (downloadBtn) downloadBtn.onclick = () => this.downloadImage(item);
        if (shareBtn) shareBtn.onclick = () => shareManager.showShareModal(item);
        if (addToPrivateBtn) addToPrivateBtn.onclick = () => this.addToPrivate(item);
        if (addToAlbumLightboxBtn) addToAlbumLightboxBtn.onclick = () => albumManager.showAddToAlbumModal(item);

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

        if (prevBtn) prevBtn.onclick = () => this.navigateImage(-1);
        if (nextBtn) nextBtn.onclick = () => this.navigateImage(1);
        if (closeBtn) closeBtn.onclick = () => this.closeLightbox();
        
        if (toggleFullscreen) {
            toggleFullscreen.onclick = () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                    toggleFullscreen.innerHTML = '<i class="fas fa-expand"></i>';
                } else {
                    document.getElementById('fullscreenLightbox').requestFullscreen();
                    toggleFullscreen.innerHTML = '<i class="fas fa-compress"></i>';
                }
            };
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('fullscreenLightbox')?.classList.contains('active')) {
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
                        if (toggleFullscreen) toggleFullscreen.click();
                        break;
                    case 'd':
                        if (downloadBtn) downloadBtn.click();
                        break;
                    case 's':
                        if (shareBtn) shareBtn.click();
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
        const lightbox = document.getElementById('fullscreenLightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
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

    addToAlbumQuick(index) {
        const item = this.currentItems[index];
        albumManager.showAddToAlbumModal(item);
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

    animateInitialElements() {
        setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.animation = 'slideDown 0.6s ease forwards';
            }
        }, 100);

        setTimeout(() => {
            document.querySelectorAll('.animate-slide-up').forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
                el.style.opacity = '1';
            });
        }, 300);
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

// Private Gallery Class
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

        if (loginBtn) loginBtn.addEventListener('click', () => this.handleLogin());
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
        if (addImageBtn) addImageBtn.addEventListener('click', () => this.showSearchContainer());
        if (cancelPrivateSearch) cancelPrivateSearch.addEventListener('click', () => this.hideSearchContainer());

        if (privateSearchInput) {
            privateSearchInput.addEventListener('input', Utils.debounce((e) => {
                this.searchUnsplashImages(e.target.value);
            }, 500));
        }

        // Enter key login
        ['privateUserId', 'privatePasscode'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.handleLogin();
                });
            }
        });
    }

    handleLogin() {
        const usernameEl = document.getElementById('privateUserId');
        const passcodeEl = document.getElementById('privatePasscode');
        
        if (!usernameEl || !passcodeEl) return;
        
        const username = usernameEl.value.trim();
        const passcode = passcodeEl.value.trim();

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

    showPrivateGallery() {
        const authEl = document.getElementById('privateAuth');
        const galleryEl = document.getElementById('privateGallery');
        const userNameEl = document.getElementById('userName');
        
        if (authEl) authEl.style.display = 'none';
        if (galleryEl) galleryEl.style.display = 'block';
        if (userNameEl) userNameEl.textContent = `Welcome, ${this.currentUser}!`;
        
        this.updateUserStats();
        this.renderPrivateImages();
        this.updateImageCount();
        
        // Update last login
        this.users[this.currentUser].lastLogin = new Date().toISOString();
        localStorage.setItem('galleryUsers', JSON.stringify(this.users));
    }

    logout() {
        this.currentUser = null;
        const authEl = document.getElementById('privateAuth');
        const galleryEl = document.getElementById('privateGallery');
        
        if (authEl) authEl.style.display = 'block';
        if (galleryEl) galleryEl.style.display = 'none';
        
        // Clear form
        document.getElementById('privateUserId').value = '';
        document.getElementById('privatePasscode').value = '';
        
        galleria.showNotification('Logged out successfully!', 'info');
    }

    addImageToPrivate(imageData) {
        if (!this.currentUser) return false;
        
        const user = this.users[this.currentUser];
        
        // Check if image already exists
        const exists = user.images.some(img => img.url === imageData.url);
        if (exists) return false;
        
        user.images.unshift({
            ...imageData,
            id: Utils.generateId()
        });
        
        localStorage.setItem('galleryUsers', JSON.stringify(this.users));
        this.updateImageCount();
        this.renderPrivateImages();
        
        return true;
    }

    renderPrivateImages() {
        if (!this.currentUser) return;
        
        const grid = document.getElementById('privateGrid');
        const user = this.users[this.currentUser];
        
        if (!user.images || user.images.length === 0) {
            grid.innerHTML = `
                <div class="empty-private" style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: white;">
                    <i class="fas fa-heart" style="font-size: 3rem; color: hsl(var(--hue1), 80%, 60%); margin-bottom: 1rem;"></i>
                    <h3>No Private Images</h3>
                    <p>Start saving images to your private collection</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = user.images.map((image, index) => `
            <div class="gallery-item neon-border">
                <img src="${image.thumbnail}" alt="${image.title}">
                <div class="image-overlay">
                    <h3>${image.title}</h3>
                    <p>by ${image.author}</p>
                    <div class="image-stats">
                        <span><i class="fas fa-heart"></i> ${Utils.formatNumber(image.likes || 0)}</span>
                        <span><i class="fas fa-calendar"></i> ${Utils.formatTimeAgo(image.savedAt)}</span>
                    </div>
                    <div class="overlay-actions">
                        <button class="overlay-btn" onclick="privateGallery.viewPrivateImage(${index})" title="View Fullscreen">
                            <i class="fas fa-expand"></i>
                        </button>
                        <button class="overlay-btn" onclick="privateGallery.removePrivateImage(${index})" title="Remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateImageCount() {
        const countEl = document.getElementById('privateImageCount');
        if (countEl && this.currentUser) {
            const count = this.users[this.currentUser].images.length;
            countEl.textContent = count;
        }
    }

    updateUserStats() {
        if (!this.currentUser) return;
        
        const user = this.users[this.currentUser];
        const lastActivityEl = document.getElementById('lastActivity');
        
        if (lastActivityEl) {
            lastActivityEl.textContent = Utils.formatTimeAgo(user.lastLogin);
        }
    }

    showSearchContainer() {
        const container = document.getElementById('privateSearchContainer');
        if (container) {
            container.style.display = 'block';
            document.getElementById('privateSearchInput').focus();
        }
    }

    hideSearchContainer() {
        const container = document.getElementById('privateSearchContainer');
        if (container) {
            container.style.display = 'none';
            document.getElementById('privateSearchInput').value = '';
            document.getElementById('privateSearchResults').innerHTML = '';
        }
    }

    async searchUnsplashImages(query) {
        if (!query.trim()) {
            document.getElementById('privateSearchResults').innerHTML = '';
            return;
        }

        try {
            const url = `${CONFIG.BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${CONFIG.API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            
            this.renderSearchResults(data.results);
        } catch (error) {
            console.error('Search error:', error);
        }
    }

    renderSearchResults(results) {
        const container = document.getElementById('privateSearchResults');
        
        if (!results || results.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center; padding: 2rem;">No results found</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="search-results-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
                ${results.map(image => `
                    <div class="search-result-item" style="position: relative; border-radius: 10px; overflow: hidden; cursor: pointer; border: 2px solid hsl(var(--hue1), 50%, 30%);" onclick="privateGallery.addSearchResultToPrivate('${image.id}')">
                        <img src="${image.urls.small}" alt="${image.alt_description}" style="width: 100%; height: 120px; object-fit: cover;">
                        <div style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.7); border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.searchResults = results;
    }

    addSearchResultToPrivate(imageId) {
        const image = this.searchResults.find(img => img.id === imageId);
        if (!image) return;
        
        const success = this.addImageToPrivate({
            url: image.urls.full,
            thumbnail: image.urls.small,
            title: image.description || image.alt_description,
            author: image.user.name,
            likes: image.likes,
            savedAt: new Date().toISOString()
        });
        
        if (success) {
            galleria.showNotification('Image added to private gallery!', 'success');
            this.hideSearchContainer();
        } else {
            galleria.showNotification('Image already in private gallery!', 'info');
        }
    }

    viewPrivateImage(index) {
        if (!this.currentUser) return;
        
        const user = this.users[this.currentUser];
        const image = user.images[index];
        
        // Create a temporary item for lightbox
        const tempItem = {
            id: image.id,
            urls: {
                full: image.url,
                regular: image.thumbnail
            },
            description: image.title,
            alt_description: image.title,
            user: { name: image.author },
            likes: image.likes || 0,
            views: 0,
            downloads: 0,
            created_at: image.savedAt
        };
        
        galleria.currentItems = [tempItem];
        galleria.showLightbox(0);
    }

    removePrivateImage(index) {
        if (!this.currentUser) return;
        
        if (confirm('Are you sure you want to remove this image from your private gallery?')) {
            const user = this.users[this.currentUser];
            user.images.splice(index, 1);
            localStorage.setItem('galleryUsers', JSON.stringify(this.users));
            this.renderPrivateImages();
            this.updateImageCount();
            galleria.showNotification('Image removed from private gallery', 'info');
        }
    }

    showAuthMessage(message, type) {
        const msgEl = document.getElementById('privateAuthMsg');
        if (msgEl) {
            msgEl.textContent = message;
            msgEl.className = `auth-message ${type}`;
            setTimeout(() => {
                msgEl.textContent = '';
                msgEl.className = 'auth-message';
            }, 3000);
        }
    }
}

// Album Manager Class
class AlbumManager {
    constructor() {
        this.albums = JSON.parse(localStorage.getItem('galleriaAlbums')) || {};
        this.selectedAlbum = null;
        this.currentImage = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderAlbums();
    }

    setupEventListeners() {
        const createAlbumBtn = document.getElementById('createAlbumBtn');
        const createAlbumConfirm = document.getElementById('createAlbumConfirm');
        const cancelCreateAlbum = document.getElementById('cancelCreateAlbum');
        const closeCreateAlbumModal = document.getElementById('closeCreateAlbumModal');
        const addToSelectedAlbum = document.getElementById('addToSelectedAlbum');
        const cancelAddToAlbum = document.getElementById('cancelAddToAlbum');
        const closeAddToAlbumModal = document.getElementById('closeAddToAlbumModal');

        if (createAlbumBtn) createAlbumBtn.addEventListener('click', () => this.showCreateAlbumModal());
        if (createAlbumConfirm) createAlbumConfirm.addEventListener('click', () => this.createAlbum());
        if (cancelCreateAlbum) cancelCreateAlbum.addEventListener('click', () => this.hideCreateAlbumModal());
        if (closeCreateAlbumModal) closeCreateAlbumModal.addEventListener('click', () => this.hideCreateAlbumModal());
        if (addToSelectedAlbum) addToSelectedAlbum.addEventListener('click', () => this.addImageToSelectedAlbum());
        if (cancelAddToAlbum) cancelAddToAlbum.addEventListener('click', () => this.hideAddToAlbumModal());
        if (closeAddToAlbumModal) closeAddToAlbumModal.addEventListener('click', () => this.hideAddToAlbumModal());

        // Enter key for album creation
        const albumNameInput = document.getElementById('albumName');
        if (albumNameInput) {
            albumNameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.createAlbum();
            });
        }
    }

    showCreateAlbumModal() {
        const modal = document.getElementById('createAlbumModal');
        if (modal) {
            modal.classList.add('active');
            document.getElementById('albumName').focus();
        }
    }

    hideCreateAlbumModal() {
        const modal = document.getElementById('createAlbumModal');
        if (modal) {
            modal.classList.remove('active');
            document.getElementById('albumName').value = '';
            document.getElementById('albumDescription').value = '';
        }
    }

    createAlbum() {
        const nameEl = document.getElementById('albumName');
        const descEl = document.getElementById('albumDescription');
        
        const name = nameEl.value.trim();
        const description = descEl.value.trim();

        if (!name) {
            galleria.showNotification('Please enter an album name', 'error');
            return;
        }

        if (this.albums[name]) {
            galleria.showNotification('Album with this name already exists', 'error');
            return;
        }

        const albumId = Utils.generateId();
        this.albums[name] = {
            id: albumId,
            name: name,
            description: description,
            images: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem('galleriaAlbums', JSON.stringify(this.albums));
        galleria.stats.incrementAlbums();
        this.renderAlbums();
        this.hideCreateAlbumModal();
        galleria.showNotification(`Album "${name}" created successfully!`, 'success');
    }

    renderAlbums() {
        const albumsGrid = document.getElementById('albumsGrid');
        const albumNames = Object.keys(this.albums);

        if (albumNames.length === 0) {
            albumsGrid.innerHTML = `
                <div class="empty-albums">
                    <i class="fas fa-folder-plus neon-glow"></i>
                    <h3>No Albums Yet</h3>
                    <p>Create your first album to organize your photos</p>
                    <button onclick="albumManager.showCreateAlbumModal()" class="control-btn primary neon-glow">
                        <i class="fas fa-plus"></i> Create First Album
                    </button>
                </div>
            `;
            return;
        }

        albumsGrid.innerHTML = albumNames.map(name => {
            const album = this.albums[name];
            const imageCount = album.images.length;
            const firstImage = album.images[0];
            
            return `
                <div class="album-card neon-border" onclick="albumManager.viewAlbum('${name}')">
                    <div class="album-preview">
                        ${firstImage ? 
                            `<img src="${firstImage.thumbnail}" alt="${album.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
                            `<i class="fas fa-folder" style="font-size: 3rem; color: white;"></i>`
                        }
                        <div class="album-overlay" style="position: absolute; top: 10px; right: 10px;">
                            <div class="album-actions">
                                <button onclick="event.stopPropagation(); albumManager.deleteAlbum('${name}')" class="overlay-btn" title="Delete Album" style="background: var(--danger-color);">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="album-info">
                        <h3>${album.name}</h3>
                        <p>${album.description || 'No description'}</p>
                        <div class="album-meta">
                            <span><i class="fas fa-images"></i> ${imageCount} photos</span>
                            <span><i class="fas fa-calendar"></i> ${Utils.formatTimeAgo(album.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    viewAlbum(albumName) {
        const album = this.albums[albumName];
        if (!album) return;

        // Create a temporary gallery view for the album
        const albumImages = album.images.map(img => ({
            id: img.id || Utils.generateId(),
            urls: { 
                regular: img.thumbnail || img.url, 
                full: img.url,
                small: img.thumbnail || img.url
            },
            description: img.title,
            alt_description: img.title,
            user: { name: img.author },
            likes: img.likes || 0,
            views: 0,
            downloads: 0,
            created_at: img.savedAt || new Date().toISOString()
        }));

        // Switch to main gallery and show album images
        navigationHandler.showSection('homeBtn', 'mainApp');
        galleria.currentItems = albumImages;
        galleria.query = `Album: ${albumName}`;
        galleria.renderGallery();
        
        // Update search input to show album name
        galleria.searchInput.value = `Album: ${albumName}`;
        
        galleria.showNotification(`Viewing album: ${albumName}`, 'info');
    }

    deleteAlbum(albumName) {
        if (confirm(`Are you sure you want to delete the album "${albumName}"? This action cannot be undone.`)) {
            delete this.albums[albumName];
            localStorage.setItem('galleriaAlbums', JSON.stringify(this.albums));
            galleria.stats.decrementAlbums();
            this.renderAlbums();
            galleria.showNotification(`Album "${albumName}" deleted`, 'info');
        }
    }

    showAddToAlbumModal(image) {
        this.currentImage = image;
        const modal = document.getElementById('addToAlbumModal');
        const albumList = document.getElementById('albumList');
        
        const albumNames = Object.keys(this.albums);
        
        if (albumNames.length === 0) {
            albumList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: white;">
                    <p>No albums available. Create an album first.</p>
                    <button onclick="albumManager.hideAddToAlbumModal(); albumManager.showCreateAlbumModal();" class="action-btn primary neon-glow">
                        <i class="fas fa-plus"></i> Create Album
                    </button>
                </div>
            `;
        } else {
            albumList.innerHTML = albumNames.map(name => {
                const album = this.albums[name];
                return `
                    <div class="album-option neon-border" onclick="albumManager.selectAlbum('${name}')">
                        <i class="fas fa-folder"></i>
                        <h4>${album.name}</h4>
                        <p>${album.images.length} photos</p>
                    </div>
                `;
            }).join('');
        }

        if (modal) modal.classList.add('active');
    }

    hideAddToAlbumModal() {
        const modal = document.getElementById('addToAlbumModal');
        if (modal) {
            modal.classList.remove('active');
            this.selectedAlbum = null;
            this.currentImage = null;
            
            // Remove selection styling
            document.querySelectorAll('.album-option').forEach(option => {
                option.classList.remove('selected');
            });
        }
    }

    selectAlbum(albumName) {
        this.selectedAlbum = albumName;
        
        // Update visual selection
        document.querySelectorAll('.album-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        event.target.closest('.album-option').classList.add('selected');
    }

    addImageToSelectedAlbum() {
        if (!this.selectedAlbum || !this.currentImage) {
            galleria.showNotification('Please select an album first', 'error');
            return;
        }

        const album = this.albums[this.selectedAlbum];
        const imageData = {
            id: this.currentImage.id || Utils.generateId(),
            url: this.currentImage.urls.full,
            thumbnail: this.currentImage.urls.small,
            title: this.currentImage.description || this.currentImage.alt_description,
            author: this.currentImage.user.name,
            likes: this.currentImage.likes || 0,
            savedAt: new Date().toISOString()
        };

        // Check if image already exists in album
        const exists = album.images.some(img => img.url === imageData.url);
        if (exists) {
            galleria.showNotification('Image already exists in this album', 'info');
            return;
        }

        album.images.push(imageData);
        album.updatedAt = new Date().toISOString();
        localStorage.setItem('galleriaAlbums', JSON.stringify(this.albums));
        
        this.hideAddToAlbumModal();
        galleria.showNotification(`Image added to album "${this.selectedAlbum}"!`, 'success');
        
        // Update albums view if currently visible
        if (document.getElementById('albumsSection').style.display !== 'none') {
            this.renderAlbums();
        }
    }
}

// Share Manager Class
class ShareManager {
    constructor() {
        this.currentImage = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeShareModal = document.getElementById('closeShareModal');
        const copyLinkBtn = document.getElementById('copyLink');
        
        if (closeShareModal) closeShareModal.addEventListener('click', () => this.hideShareModal());
        if (copyLinkBtn) copyLinkBtn.addEventListener('click', () => this.copyImageLink());

        // Social media share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareToSocialMedia(platform);
            });
        });

        // Close modal when clicking overlay
        const shareModal = document.getElementById('shareModal');
        if (shareModal) {
            shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) this.hideShareModal();
            });
        }
    }

    showShareModal(image) {
        this.currentImage = image;
        const modal = document.getElementById('shareModal');
        const shareLink = document.getElementById('shareLink');
        
        // Generate shareable link (in real app, this would be a proper URL)
        const imageUrl = image.links?.html || `https://galleria.app/image/${image.id}`;
        
        if (shareLink) shareLink.value = imageUrl;
        if (modal) modal.classList.add('active');
    }

    hideShareModal() {
        const modal = document.getElementById('shareModal');
        if (modal) {
            modal.classList.remove('active');
            this.currentImage = null;
        }
    }

    copyImageLink() {
        const shareLink = document.getElementById('shareLink');
        if (shareLink) {
            shareLink.select();
            document.execCommand('copy');
            galleria.showNotification('Link copied to clipboard!', 'success');
        }
    }

    shareToSocialMedia(platform) {
        if (!this.currentImage) return;

        const imageUrl = this.currentImage.links?.html || `https://galleria.app/image/${this.currentImage.id}`;
        const text = `Check out this amazing photo by ${this.currentImage.user.name} on Galleria!`;
        const hashtags = 'photography,galleria,art';

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(imageUrl)}&hashtags=${hashtags}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`;
                break;
            case 'pinterest':
                shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(imageUrl)}&media=${encodeURIComponent(this.currentImage.urls.full)}&description=${encodeURIComponent(text)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            galleria.showNotification(`Shared to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`, 'success');
        }
    }
}

// Search History Manager
class SearchHistoryManager {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('galleriaSearchHistory')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderHistory();
    }

    setupEventListeners() {
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => this.clearAllHistory());
        }
    }

    addSearch(query) {
        if (!query.trim()) return;

        // Remove if already exists
        this.history = this.history.filter(item => item.query !== query);
        
        // Add to beginning
        this.history.unshift({
            query: query,
            timestamp: new Date().toISOString(),
            id: Utils.generateId()
        });

        // Keep only last 50 searches
        if (this.history.length > CONFIG.MAX_HISTORY_ITEMS) {
            this.history = this.history.slice(0, CONFIG.MAX_HISTORY_ITEMS);
        }

        localStorage.setItem('galleriaSearchHistory', JSON.stringify(this.history));
        
        // Update history view if visible
        if (document.getElementById('historySection').style.display !== 'none') {
            this.renderHistory();
        }
    }

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

        historyContent.innerHTML = `
            <div class="history-list">
                ${this.history.map(item => `
                    <div class="history-item">
                        <div class="history-details">
                            <h4 onclick="searchHistory.repeatSearch('${item.query}')">${item.query}</h4>
                            <div class="history-meta">
                                <span><i class="fas fa-clock"></i> ${Utils.formatTimeAgo(item.timestamp)}</span>
                                <span><i class="fas fa-calendar"></i> ${Utils.formatDate(item.timestamp)}</span>
                            </div>
                        </div>
                        <button onclick="searchHistory.removeHistoryItem('${item.id}')" class="remove-history-btn" title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    repeatSearch(query) {
        galleria.searchInput.value = query;
        galleria.searchBtn.click();
        navigationHandler.showSection('homeBtn', 'mainApp');
        galleria.showNotification(`Searching for "${query}"...`, 'info');
    }

    removeHistoryItem(id) {
        this.history = this.history.filter(item => item.id !== id);
        localStorage.setItem('galleriaSearchHistory', JSON.stringify(this.history));
        this.renderHistory();
        galleria.showNotification('Search removed from history', 'info');
    }

    clearAllHistory() {
        if (confirm('Are you sure you want to clear all search history?')) {
            this.history = [];
            localStorage.setItem('galleriaSearchHistory', JSON.stringify(this.history));
            this.renderHistory();
            galleria.showNotification('Search history cleared', 'info');
        }
    }
}

// Navigation Handler
class NavigationHandler {
    constructor() {
        this.currentSection = 'mainApp';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('homeBtn')?.addEventListener('click', () => {
            this.showSection('homeBtn', 'mainApp');
        });
        
        document.getElementById('aboutBtn')?.addEventListener('click', () => {
            this.showSection('aboutBtn', 'aboutSection');
        });
        
        document.getElementById('privateBtn')?.addEventListener('click', () => {
            this.showSection('privateBtn', 'privateSection');
        });
        
        document.getElementById('albumsBtn')?.addEventListener('click', () => {
            this.showSection('albumsBtn', 'albumsSection');
        });
        
        document.getElementById('historyBtn')?.addEventListener('click', () => {
            this.showSection('historyBtn', 'historySection');
        });
    }

    showSection(buttonId, sectionId) {
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(buttonId)?.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.content-section, #mainApp').forEach(section => {
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            this.currentSection = sectionId;
            
            // Trigger section-specific updates
            this.onSectionChange(sectionId);
        }
    }

    onSectionChange(sectionId) {
        switch(sectionId) {
            case 'albumsSection':
                albumManager.renderAlbums();
                break;
            case 'historySection':
                searchHistory.renderHistory();
                break;
            case 'privateSection':
                if (privateGallery.currentUser) {
                    privateGallery.renderPrivateImages();
                }
                break;
        }
    }
}

// Context Menu Handler
class ContextMenuHandler {
    constructor() {
        this.menu = document.getElementById('contextMenu');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateHueValues();
    }

    setupEventListeners() {
        // Context menu trigger
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });

        // Close context menu
        document.addEventListener('click', (e) => {
            if (!this.menu.contains(e.target)) {
                this.hideContextMenu();
            }
        });

        // Context menu actions
        document.getElementById('contextHome')?.addEventListener('click', () => {
            navigationHandler.showSection('homeBtn', 'mainApp');
            this.hideContextMenu();
        });

        document.getElementById('contextPrivate')?.addEventListener('click', () => {
            navigationHandler.showSection('privateBtn', 'privateSection');
            this.hideContextMenu();
        });

        document.getElementById('contextAlbums')?.addEventListener('click', () => {
            navigationHandler.showSection('albumsBtn', 'albumsSection');
            this.hideContextMenu();
        });
    }

    showContextMenu(x, y) {
        if (!this.menu) return;

        const menuBox = this.menu.getBoundingClientRect();
        const bodyBox = { width: window.innerWidth, height: window.innerHeight };
        const target = { x: x, y: y };
        const padding = { x: 30, y: 20 };

        const hitX = target.x + menuBox.width >= bodyBox.width - padding.x;
        const hitY = target.y + menuBox.height >= bodyBox.height - padding.y;

        if (hitX) {
            target.x = bodyBox.width - menuBox.width - padding.x;
        }

        if (hitY) {
            target.y = bodyBox.height - menuBox.height - padding.y;
        }

        this.menu.style.left = target.x + 'px';
        this.menu.style.top = target.y + 'px';
        this.menu.classList.add('open');
        this.isOpen = true;
    }

    hideContextMenu() {
        if (this.menu) {
            this.menu.classList.remove('open');
            this.isOpen = false;
        }
    }

    updateHueValues() {
        // Generate random hue values for dynamic theming
        const rand1 = 120 + Math.floor(Math.random() * 240);
        const rand2 = rand1 - 80 + (Math.floor(Math.random() * 60) - 30);
        
        document.body.style.setProperty('--hue1', rand1);
        document.body.style.setProperty('--hue2', rand2);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize global instances
    window.galleria = new Galleria();
    window.privateGallery = new PrivateGallery();
    window.albumManager = new AlbumManager();
    window.shareManager = new ShareManager();
    window.searchHistory = new SearchHistoryManager();
    window.navigationHandler = new NavigationHandler();
    window.contextMenuHandler = new ContextMenuHandler();
    
    console.log('🎨 Galleria initialized successfully!');
});
