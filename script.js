// Galleria Photo Gallery Application
class Galleria {
    constructor() {
        this.apiKey = 'CLiqy8UK-ptDrv1z7MuC51MKMOlP_DSs3DToSf-GYGY';
        this.baseURL = 'https://api.unsplash.com';
        this.currentPage = 1;
        this.currentQuery = '';
        this.currentCategory = 'popular';
        this.currentView = 'grid';
        this.selectedImages = new Set();
        this.allImages = [];
        this.currentLightboxIndex = 0;
        this.isLoading = false;
        
        // Storage keys
        this.storageKeys = {
            searchHistory: 'galleria_search_history',
            userStats: 'galleria_user_stats',
            albums: 'galleria_albums',
            settings: 'galleria_settings',
            theme: 'galleria_theme'
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTheme();
        this.loadUserStats();
        this.checkAPIConnection();
        this.loadInitialData();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav__item').forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        if (searchInput && searchBtn) {
            searchInput.addEventListener('input', this.debounce((e) => this.handleSearch(e.target.value), 500));
            searchBtn.addEventListener('click', () => this.handleSearch(searchInput.value));
            
            // Enter key for search
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        // Voice search
        const voiceBtn = document.getElementById('voiceSearchBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.handleVoiceSearch());
        }

        // Categories
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryChange(e));
        });

        // View controls
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewChange(e));
        });

        // Bulk operations
        const selectAllBtn = document.getElementById('selectAllBtn');
        const downloadSelectedBtn = document.getElementById('downloadSelectedBtn');
        if (selectAllBtn) selectAllBtn.addEventListener('click', () => this.handleSelectAll());
        if (downloadSelectedBtn) downloadSelectedBtn.addEventListener('click', () => this.handleBulkDownload());

        // Load more
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => this.loadMoreImages());

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.addEventListener('click', () => this.toggleTheme());

        // Lightbox
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const lightboxDownload = document.getElementById('lightboxDownload');
        
        if (lightboxClose) lightboxClose.addEventListener('click', () => this.closeLightbox());
        if (lightboxPrev) lightboxPrev.addEventListener('click', () => this.navigateLightbox(-1));
        if (lightboxNext) lightboxNext.addEventListener('click', () => this.navigateLightbox(1));
        if (lightboxDownload) lightboxDownload.addEventListener('click', () => this.downloadCurrentImage());

        // Private gallery
        const privateSubmit = document.getElementById('privateSubmit');
        if (privateSubmit) privateSubmit.addEventListener('click', () => this.handlePrivateAccess());

        // Albums
        const createAlbumBtn = document.getElementById('createAlbumBtn');
        const albumCreate = document.getElementById('albumCreate');
        const albumCancel = document.getElementById('albumCancel');
        const albumModalClose = document.getElementById('albumModalClose');
        
        if (createAlbumBtn) createAlbumBtn.addEventListener('click', () => this.showAlbumModal());
        if (albumCreate) albumCreate.addEventListener('click', () => this.createAlbum());
        if (albumCancel) albumCancel.addEventListener('click', () => this.hideAlbumModal());
        if (albumModalClose) albumModalClose.addEventListener('click', () => this.hideAlbumModal());

        // Settings
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        const imagesPerPage = document.getElementById('imagesPerPage');
        const defaultView = document.getElementById('defaultView');
        
        if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', () => this.clearSearchHistory());
        if (imagesPerPage) imagesPerPage.addEventListener('change', (e) => this.updateSetting('imagesPerPage', e.target.value));
        if (defaultView) defaultView.addEventListener('change', (e) => this.updateSetting('defaultView', e.target.value));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Click outside modals
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    async checkAPIConnection() {
        const statusElement = document.getElementById('apiStatus');
        if (!statusElement) return;
        
        try {
            statusElement.innerHTML = '<span class="status status--info">Connecting...</span>';
            const response = await fetch(`${this.baseURL}/photos?client_id=${this.apiKey}&per_page=1`);
            
            if (response.ok) {
                statusElement.innerHTML = '<span class="status status--success">Connected</span>';
                console.log('API connection successful');
            } else {
                throw new Error(`API responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error('API connection error:', error);
            statusElement.innerHTML = '<span class="status status--error">Connection Failed</span>';
            this.showError('Failed to connect to Unsplash API. Some features may not work.');
        }
    }

    async loadInitialData() {
        console.log('Loading initial data...');
        this.showLoading();
        try {
            await this.fetchImages('popular');
            console.log('Initial data loaded successfully');
        } catch (error) {
            console.error('Failed to load initial data:', error);
            this.showError('Failed to load initial images');
        } finally {
            this.hideLoading();
        }
    }

    async fetchImages(category, query = '', page = 1) {
        try {
            this.isLoading = true;
            console.log(`Fetching images - Category: ${category}, Query: ${query}, Page: ${page}`);
            
            let url;
            if (query) {
                url = `${this.baseURL}/search/photos?client_id=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}&per_page=24`;
            } else if (category === 'popular') {
                url = `${this.baseURL}/photos?client_id=${this.apiKey}&page=${page}&per_page=24&order_by=popular`;
            } else {
                url = `${this.baseURL}/search/photos?client_id=${this.apiKey}&query=${encodeURIComponent(category)}&page=${page}&per_page=24`;
            }

            console.log('Fetching from URL:', url);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('API Response:', data);
            
            const images = query || category !== 'popular' ? (data.results || []) : data;
            console.log(`Received ${images.length} images`);
            
            if (page === 1) {
                this.allImages = images;
            } else {
                this.allImages = [...this.allImages, ...images];
            }
            
            this.renderGallery();
            this.isLoading = false;
            
            return images;
        } catch (error) {
            console.error('Error fetching images:', error);
            this.showError(`Failed to load images: ${error.message}`);
            this.isLoading = false;
            
            // Show fallback message
            this.showFallbackContent();
        }
    }

    showFallbackContent() {
        const gallery = document.getElementById('gallery');
        if (gallery) {
            gallery.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--color-text-secondary);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <h3>Unable to load images</h3>
                    <p>Please check your internet connection and try again.</p>
                    <button class="btn btn--primary" onclick="galleria.retryLoad()">Retry</button>
                </div>
            `;
        }
    }

    retryLoad() {
        this.loadInitialData();
    }

    renderGallery() {
        const gallery = document.getElementById('gallery');
        if (!gallery) return;
        
        gallery.className = `gallery gallery--${this.currentView}`;
        
        if (!this.allImages || this.allImages.length === 0) {
            gallery.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--color-text-secondary);">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <h3>No images found</h3>
                    <p>Try searching for something else or select a different category.</p>
                </div>
            `;
            return;
        }

        console.log(`Rendering ${this.allImages.length} images in ${this.currentView} view`);
        gallery.innerHTML = this.allImages.map((image, index) => this.createImageHTML(image, index)).join('');
        
        // Bind image events
        this.bindImageEvents();
    }

    createImageHTML(image, index) {
        if (!image || !image.urls) {
            console.warn('Invalid image data:', image);
            return '';
        }
        
        const isListView = this.currentView === 'list';
        const imageClass = `gallery-item${isListView ? ' gallery-item--list' : ''}`;
        const imageUrl = image.urls.small || image.urls.regular || image.urls.thumb;
        const fullImageUrl = image.urls.regular || image.urls.full || imageUrl;
        
        return `
            <div class="${imageClass}" data-index="${index}">
                <div class="gallery-item__checkbox">
                    <input type="checkbox" id="img-${image.id}" data-image-id="${image.id}">
                    <label for="img-${image.id}">
                        <i class="fas fa-check"></i>
                    </label>
                </div>
                <img class="gallery-item__image" 
                     src="${imageUrl}" 
                     alt="${image.alt_description || image.description || 'Unsplash photo'}"
                     loading="lazy"
                     onerror="this.style.display='none';">
                <div class="gallery-item__overlay">
                    <div class="gallery-item__info">
                        <div class="gallery-item__title">${this.truncateText(image.alt_description || image.description || 'Untitled', 50)}</div>
                        <div class="gallery-item__author">by ${image.user?.name || 'Unknown'}</div>
                        <div class="gallery-item__actions">
                            <button class="gallery-item__action" onclick="galleria.downloadImage('${image.id}')">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="gallery-item__action" onclick="galleria.addToAlbum('${image.id}')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    truncateText(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    bindImageEvents() {
        // Image clicks for lightbox
        document.querySelectorAll('.gallery-item').forEach(item => {
            const img = item.querySelector('.gallery-item__image');
            if (img) {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(item.dataset.index);
                    this.openLightbox(index);
                });
            }
        });

        // Checkbox changes
        document.querySelectorAll('.gallery-item__checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleImageSelection());
        });
    }

    openLightbox(index) {
        if (!this.allImages[index]) return;
        
        this.currentLightboxIndex = index;
        const image = this.allImages[index];
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxAuthor = document.getElementById('lightboxAuthor');
        const lightboxDimensions = document.getElementById('lightboxDimensions');

        if (lightboxImage) lightboxImage.src = image.urls.full || image.urls.regular;
        if (lightboxImage) lightboxImage.alt = image.alt_description || image.description || 'Unsplash photo';
        if (lightboxTitle) lightboxTitle.textContent = image.alt_description || image.description || 'Untitled';
        if (lightboxDescription) lightboxDescription.textContent = image.description || '';
        if (lightboxAuthor) lightboxAuthor.textContent = `Photo by ${image.user?.name || 'Unknown'}`;
        if (lightboxDimensions) lightboxDimensions.textContent = `${image.width || '?'} × ${image.height || '?'}`;

        if (lightbox) {
            lightbox.classList.add('lightbox--active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('lightbox--active');
            document.body.style.overflow = '';
        }
    }

    navigateLightbox(direction) {
        this.currentLightboxIndex += direction;
        
        if (this.currentLightboxIndex < 0) {
            this.currentLightboxIndex = this.allImages.length - 1;
        } else if (this.currentLightboxIndex >= this.allImages.length) {
            this.currentLightboxIndex = 0;
        }
        
        this.openLightbox(this.currentLightboxIndex);
    }

    handleNavigation(e) {
        const section = e.currentTarget.dataset.section;
        
        // Update nav active state
        document.querySelectorAll('.nav__item').forEach(item => {
            item.classList.remove('nav__item--active');
        });
        e.currentTarget.classList.add('nav__item--active');

        // Show section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('section--active');
        });
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('section--active');
        }

        // Load section-specific data
        this.loadSectionData(section);
    }

    loadSectionData(section) {
        switch (section) {
            case 'history':
                this.loadSearchHistory();
                break;
            case 'albums':
                this.loadAlbums();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    handleSearch(query) {
        if (!query || query.trim() === '') {
            // Reset to popular category
            const popularBtn = document.querySelector('.category-btn[data-category="popular"]');
            if (popularBtn) {
                this.handleCategoryChange({ target: popularBtn });
            }
            return;
        }

        console.log('Searching for:', query);
        this.currentQuery = query.trim();
        this.currentPage = 1;
        this.showLoading();
        
        // Add to search history
        this.addToSearchHistory(this.currentQuery);
        
        // Update UI
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('category-btn--active');
        });
        
        this.fetchImages('', this.currentQuery, 1).then(() => {
            this.hideLoading();
        });
    }

    handleVoiceSearch() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showError('Voice search is not supported in your browser.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        const voiceBtn = document.getElementById('voiceSearchBtn');

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        if (voiceBtn) voiceBtn.classList.add('recording');
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = transcript;
            this.handleSearch(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.showError('Voice search failed. Please try again.');
        };

        recognition.onend = () => {
            if (voiceBtn) voiceBtn.classList.remove('recording');
        };

        recognition.start();
    }

    handleCategoryChange(e) {
        const button = e.target.closest('.category-btn');
        if (!button) return;
        
        const category = button.dataset.category;
        console.log('Category changed to:', category);
        
        this.currentCategory = category;
        this.currentQuery = '';
        this.currentPage = 1;
        
        // Update category active state
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('category-btn--active');
        });
        button.classList.add('category-btn--active');

        // Clear search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';

        this.showLoading();
        this.fetchImages(category, '', 1).then(() => {
            this.hideLoading();
        });
    }

    handleViewChange(e) {
        const button = e.target.closest('.view-btn');
        if (!button) return;
        
        const view = button.dataset.view;
        console.log('View changed to:', view);
        
        this.currentView = view;
        
        // Update view button active state
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('view-btn--active');
        });
        button.classList.add('view-btn--active');

        this.renderGallery();
    }

    handleImageSelection() {
        const checkboxes = document.querySelectorAll('.gallery-item__checkbox input:checked');
        const downloadBtn = document.getElementById('downloadSelectedBtn');
        
        this.selectedImages.clear();
        checkboxes.forEach(checkbox => {
            this.selectedImages.add(checkbox.dataset.imageId);
        });

        if (downloadBtn) {
            downloadBtn.disabled = this.selectedImages.size === 0;
            downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download Selected (${this.selectedImages.size})`;
        }
    }

    handleSelectAll() {
        const checkboxes = document.querySelectorAll('.gallery-item__checkbox input');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
        });
        
        this.handleImageSelection();
    }

    async handleBulkDownload() {
        if (this.selectedImages.size === 0) return;

        const downloads = Array.from(this.selectedImages).map(imageId => {
            return this.downloadImage(imageId, false);
        });

        try {
            await Promise.all(downloads);
            this.showSuccess(`Downloaded ${this.selectedImages.size} images successfully!`);
            this.updateUserStats('downloads', this.selectedImages.size);
        } catch (error) {
            this.showError('Some downloads failed. Please try again.');
        }
    }

    async downloadImage(imageId, showNotification = true) {
        try {
            const image = this.allImages.find(img => img.id === imageId);
            if (!image) return;

            // Track download with Unsplash API
            try {
                await fetch(`${this.baseURL}/photos/${imageId}/download?client_id=${this.apiKey}`);
            } catch (e) {
                console.warn('Failed to track download with Unsplash API');
            }

            // Create download link
            const link = document.createElement('a');
            link.href = image.urls.full || image.urls.regular;
            link.download = `unsplash-${imageId}.jpg`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (showNotification) {
                this.showSuccess('Image download initiated!');
                this.updateUserStats('downloads', 1);
            }
        } catch (error) {
            console.error('Download error:', error);
            if (showNotification) {
                this.showError('Download failed. Please try again.');
            }
        }
    }

    addToAlbum(imageId) {
        this.showSuccess('Album feature coming soon!');
    }

    downloadCurrentImage() {
        if (this.allImages[this.currentLightboxIndex]) {
            this.downloadImage(this.allImages[this.currentLightboxIndex].id);
        }
    }

    async loadMoreImages() {
        if (this.isLoading) return;
        
        this.currentPage++;
        this.showLoading();
        
        await this.fetchImages(this.currentCategory, this.currentQuery, this.currentPage);
        this.hideLoading();
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Save theme preference
        this.saveToStorage(this.storageKeys.theme, newTheme);
    }

    loadTheme() {
        const savedTheme = this.loadFromStorage(this.storageKeys.theme);
        if (savedTheme) {
            document.documentElement.setAttribute('data-color-scheme', savedTheme);
            const themeIcon = document.querySelector('.theme-toggle i');
            if (themeIcon) {
                themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    handlePrivateAccess() {
        const passwordInput = document.getElementById('privatePassword');
        if (!passwordInput) return;
        
        const password = passwordInput.value;
        const correctPassword = 'galleria123'; // Demo password
        
        if (password === correctPassword) {
            const privateAccess = document.getElementById('privateAccess');
            const privateContent = document.getElementById('privateContent');
            
            if (privateAccess) privateAccess.classList.add('hidden');
            if (privateContent) privateContent.classList.remove('hidden');
            
            this.showSuccess('Access granted to private gallery!');
        } else {
            this.showError('Incorrect password. Try "galleria123"');
        }
    }

    showAlbumModal() {
        const modal = document.getElementById('albumModal');
        if (modal) modal.classList.add('modal--active');
    }

    hideAlbumModal() {
        const modal = document.getElementById('albumModal');
        if (modal) modal.classList.remove('modal--active');
        
        const nameInput = document.getElementById('albumNameInput');
        const descInput = document.getElementById('albumDescriptionInput');
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';
    }

    createAlbum() {
        const nameInput = document.getElementById('albumNameInput');
        if (!nameInput) return;
        
        const name = nameInput.value.trim();
        if (!name) {
            this.showError('Please enter an album name.');
            return;
        }

        const descInput = document.getElementById('albumDescriptionInput');
        const description = descInput ? descInput.value.trim() : '';
        
        const album = {
            id: Date.now().toString(),
            name,
            description,
            images: [],
            created: new Date().toISOString()
        };

        const albums = this.loadFromStorage(this.storageKeys.albums, []);
        albums.push(album);
        this.saveToStorage(this.storageKeys.albums, albums);
        
        this.hideAlbumModal();
        this.showSuccess('Album created successfully!');
        this.loadAlbums();
    }

    loadAlbums() {
        const albums = this.loadFromStorage(this.storageKeys.albums, []);
        const albumsGrid = document.getElementById('albumsGrid');
        if (!albumsGrid) return;
        
        if (albums.length === 0) {
            albumsGrid.innerHTML = '<p>No albums created yet. Create your first album!</p>';
            return;
        }

        albumsGrid.innerHTML = albums.map(album => `
            <div class="album-card">
                <div class="album-card__cover">
                    <i class="fas fa-images"></i>
                </div>
                <div class="album-card__info">
                    <div class="album-card__title">${album.name}</div>
                    <div class="album-card__description">${album.description}</div>
                    <div class="album-card__meta">
                        <span>${album.images.length} photos</span>
                        <span>${new Date(album.created).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    addToSearchHistory(query) {
        const history = this.loadFromStorage(this.storageKeys.searchHistory, []);
        const newEntry = {
            query,
            timestamp: new Date().toISOString()
        };
        
        // Remove duplicate and add to beginning
        const filteredHistory = history.filter(entry => entry.query !== query);
        filteredHistory.unshift(newEntry);
        
        // Keep only last 20 searches
        const trimmedHistory = filteredHistory.slice(0, 20);
        
        this.saveToStorage(this.storageKeys.searchHistory, trimmedHistory);
        this.updateUserStats('searches', 1);
    }

    loadSearchHistory() {
        const history = this.loadFromStorage(this.storageKeys.searchHistory, []);
        const historyList = document.getElementById('historyList');
        if (!historyList) return;
        
        if (history.length === 0) {
            historyList.innerHTML = '<p>No search history yet.</p>';
            return;
        }

        historyList.innerHTML = history.map(entry => `
            <div class="history-item">
                <div class="history-item__query">${entry.query}</div>
                <div class="history-item__time">${new Date(entry.timestamp).toLocaleString()}</div>
            </div>
        `).join('');
    }

    clearSearchHistory() {
        this.saveToStorage(this.storageKeys.searchHistory, []);
        this.loadSearchHistory();
        this.showSuccess('Search history cleared!');
    }

    updateUserStats(type, increment = 1) {
        const stats = this.loadFromStorage(this.storageKeys.userStats, {});
        stats[type] = (stats[type] || 0) + increment;
        this.saveToStorage(this.storageKeys.userStats, stats);
        
        const totalSearchesEl = document.getElementById('totalSearches');
        const totalDownloadsEl = document.getElementById('totalDownloads');
        
        if (totalSearchesEl || totalDownloadsEl) {
            this.loadUserStats();
        }
    }

    loadUserStats() {
        const stats = this.loadFromStorage(this.storageKeys.userStats, {});
        
        const totalSearchesEl = document.getElementById('totalSearches');
        const totalDownloadsEl = document.getElementById('totalDownloads');
        const favoriteCategoryEl = document.getElementById('favoriteCategory');
        
        if (totalSearchesEl) totalSearchesEl.textContent = stats.searches || 0;
        if (totalDownloadsEl) totalDownloadsEl.textContent = stats.downloads || 0;
        if (favoriteCategoryEl) favoriteCategoryEl.textContent = this.currentCategory || 'Nature';
    }

    loadSettings() {
        const settings = this.loadFromStorage(this.storageKeys.settings, {});
        
        const imagesPerPageEl = document.getElementById('imagesPerPage');
        const defaultViewEl = document.getElementById('defaultView');
        
        if (settings.imagesPerPage && imagesPerPageEl) imagesPerPageEl.value = settings.imagesPerPage;
        if (settings.defaultView && defaultViewEl) defaultViewEl.value = settings.defaultView;
    }

    updateSetting(key, value) {
        const settings = this.loadFromStorage(this.storageKeys.settings, {});
        settings[key] = value;
        this.saveToStorage(this.storageKeys.settings, settings);
        this.showSuccess('Setting updated!');
    }

    handleKeyboard(e) {
        // Escape key closes modals/lightbox
        if (e.key === 'Escape') {
            this.closeLightbox();
            this.hideAlbumModal();
        }
        
        // Arrow keys for lightbox navigation
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('lightbox--active')) {
            if (e.key === 'ArrowLeft') {
                this.navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                this.navigateLightbox(1);
            }
        }
    }

    handleOutsideClick(e) {
        // Close lightbox when clicking overlay
        if (e.target.classList.contains('lightbox__overlay')) {
            this.closeLightbox();
        }
        
        // Close modals when clicking overlay
        if (e.target.classList.contains('modal__overlay')) {
            this.hideAlbumModal();
        }
    }

    showLoading() {
        const loadingState = document.getElementById('loadingState');
        if (loadingState) loadingState.classList.remove('hidden');
    }

    hideLoading() {
        const loadingState = document.getElementById('loadingState');
        if (loadingState) loadingState.classList.add('hidden');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification__close">&times;</button>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-${type === 'error' ? 'error' : 'success'});
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Storage utilities with fallback for sandbox environment
    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Could not save ${key} to storage`);
        }
    }

    loadFromStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn(`Could not load ${key} from storage`);
            return defaultValue;
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Galleria...');
    window.galleria = new Galleria();
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);