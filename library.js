// Library Module - Brain Trainer
// Personal knowledge base functionality

(function() {
    'use strict';

    // ==========================================
    // STATE
    // ==========================================

    let library = {
        folders: []
    };

    let currentFolderId = null;
    let currentContentId = null;
    let editingFolderId = null;
    let pendingDeleteType = null; // 'folder' or 'content'
    let pendingDeleteId = null;
    let pendingFileContent = null;
    let pendingUrlContent = null;

    // ==========================================
    // DOM ELEMENTS
    // ==========================================

    const els = {
        // Mode toggle
        modeBtns: document.querySelectorAll('.mode-btn'),
        trainSection: document.getElementById('train-section'),
        librarySection: document.getElementById('library-section'),

        // Library views
        libraryHome: document.getElementById('library-home'),
        folderView: document.getElementById('folder-view'),
        readingView: document.getElementById('reading-view'),

        // Folders
        foldersContainer: document.getElementById('folders-container'),
        emptyLibrary: document.getElementById('empty-library'),
        newFolderBtn: document.getElementById('new-folder-btn'),
        createFirstFolder: document.getElementById('create-first-folder'),

        // Folder view
        folderTitle: document.getElementById('folder-title'),
        folderBackBtn: document.getElementById('folder-back-btn'),
        folderMenuBtn: document.getElementById('folder-menu-btn'),
        folderMenu: document.getElementById('folder-menu'),
        renameFolderBtn: document.getElementById('rename-folder-btn'),
        deleteFolderBtn: document.getElementById('delete-folder-btn'),
        folderContents: document.getElementById('folder-contents'),
        emptyFolder: document.getElementById('empty-folder'),
        addContentBtn: document.getElementById('add-content-btn'),

        // New folder modal
        newFolderModal: document.getElementById('new-folder-modal'),
        folderModalTitle: document.getElementById('folder-modal-title'),
        folderNameInput: document.getElementById('folder-name-input'),
        saveFolderBtn: document.getElementById('save-folder-btn'),
        closeFolderModal: document.getElementById('close-folder-modal'),

        // Add content modal
        addContentModal: document.getElementById('add-content-modal'),
        closeAddModal: document.getElementById('close-add-modal'),
        typeTabs: document.querySelectorAll('.type-tab'),
        textInputSection: document.getElementById('text-input-section'),
        fileInputSection: document.getElementById('file-input-section'),
        urlInputSection: document.getElementById('url-input-section'),
        contentTitle: document.getElementById('content-title'),
        contentText: document.getElementById('content-text'),
        fileDropZone: document.getElementById('file-drop-zone'),
        fileInput: document.getElementById('file-input'),
        filePreview: document.getElementById('file-preview'),
        fileName: document.getElementById('file-name'),
        clearFile: document.getElementById('clear-file'),
        fileProcessing: document.getElementById('file-processing'),
        contentUrl: document.getElementById('content-url'),
        urlProcessing: document.getElementById('url-processing'),
        urlPreview: document.getElementById('url-preview'),
        urlPreviewTitle: document.getElementById('url-preview-title'),
        urlPreviewExcerpt: document.getElementById('url-preview-excerpt'),
        saveContentBtn: document.getElementById('save-content-btn'),

        // Reading view
        readingBackBtn: document.getElementById('reading-back-btn'),
        readingSource: document.getElementById('reading-source'),
        readingDate: document.getElementById('reading-date'),
        readingTitle: document.getElementById('reading-title'),
        readingBody: document.getElementById('reading-body'),
        deleteContentBtn: document.getElementById('delete-content-btn'),

        // Confirm modal
        confirmModal: document.getElementById('confirm-modal'),
        confirmMessage: document.getElementById('confirm-message'),
        confirmCancel: document.getElementById('confirm-cancel'),
        confirmDelete: document.getElementById('confirm-delete')
    };

    // ==========================================
    // INITIALIZATION
    // ==========================================

    function init() {
        loadLibrary();
        setupEventListeners();
        renderFolders();
    }

    function setupEventListeners() {
        // Mode toggle
        els.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => switchMode(btn.dataset.mode));
        });

        // New folder
        els.newFolderBtn.addEventListener('click', openNewFolderModal);
        els.createFirstFolder.addEventListener('click', openNewFolderModal);
        els.closeFolderModal.addEventListener('click', closeFolderModal);
        els.saveFolderBtn.addEventListener('click', saveFolder);
        els.folderNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveFolder();
        });

        // Folder view
        els.folderBackBtn.addEventListener('click', () => showView('home'));
        els.folderMenuBtn.addEventListener('click', toggleFolderMenu);
        els.renameFolderBtn.addEventListener('click', openRenameFolderModal);
        els.deleteFolderBtn.addEventListener('click', confirmDeleteFolder);

        // Add content
        els.addContentBtn.addEventListener('click', openAddContentModal);
        els.closeAddModal.addEventListener('click', closeAddContentModal);
        els.typeTabs.forEach(tab => {
            tab.addEventListener('click', () => switchContentType(tab.dataset.type));
        });
        els.saveContentBtn.addEventListener('click', saveContent);

        // File upload
        els.fileDropZone.addEventListener('click', () => els.fileInput.click());
        els.fileInput.addEventListener('change', handleFileSelect);
        els.clearFile.addEventListener('click', clearFileSelection);
        els.fileDropZone.addEventListener('dragover', handleDragOver);
        els.fileDropZone.addEventListener('dragleave', handleDragLeave);
        els.fileDropZone.addEventListener('drop', handleFileDrop);

        // URL fetch
        els.contentUrl.addEventListener('blur', fetchUrlContent);
        els.contentUrl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') fetchUrlContent();
        });

        // Reading view
        els.readingBackBtn.addEventListener('click', () => showView('folder'));
        els.deleteContentBtn.addEventListener('click', confirmDeleteContent);

        // Add to drill queue
        const addToDrillBtn = document.getElementById('add-to-drill-btn');
        if (addToDrillBtn) {
            addToDrillBtn.addEventListener('click', addCurrentToDrillQueue);
        }

        // Confirm modal
        els.confirmCancel.addEventListener('click', closeConfirmModal);
        els.confirmDelete.addEventListener('click', executeDelete);

        // Close menus on outside click
        document.addEventListener('click', (e) => {
            if (!els.folderMenuBtn.contains(e.target) && !els.folderMenu.contains(e.target)) {
                els.folderMenu.classList.add('hidden');
            }
        });

        // Close modals on backdrop click
        [els.newFolderModal, els.addContentModal, els.confirmModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    resetModalState();
                }
            });
        });
    }

    // ==========================================
    // MODE SWITCHING
    // ==========================================

    function switchMode(mode) {
        els.modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        const statsSection = document.getElementById('stats-section');

        if (mode === 'train') {
            els.trainSection.classList.remove('hidden');
            els.librarySection.classList.add('hidden');
            if (statsSection) statsSection.classList.add('hidden');
        } else if (mode === 'library') {
            els.trainSection.classList.add('hidden');
            els.librarySection.classList.remove('hidden');
            if (statsSection) statsSection.classList.add('hidden');
            showView('home');
        } else if (mode === 'stats') {
            els.trainSection.classList.add('hidden');
            els.librarySection.classList.add('hidden');
            if (statsSection) statsSection.classList.remove('hidden');
            // Render dashboard when stats tab is opened
            if (window.Performance && typeof window.Performance.renderDashboard === 'function') {
                window.Performance.renderDashboard();
            }
        }
    }

    // ==========================================
    // VIEW MANAGEMENT
    // ==========================================

    function showView(view) {
        els.libraryHome.classList.add('hidden');
        els.folderView.classList.add('hidden');
        els.readingView.classList.add('hidden');
        els.folderMenu.classList.add('hidden');

        switch (view) {
            case 'home':
                els.libraryHome.classList.remove('hidden');
                renderFolders();
                currentFolderId = null;
                break;
            case 'folder':
                els.folderView.classList.remove('hidden');
                renderFolderContents();
                break;
            case 'reading':
                els.readingView.classList.remove('hidden');
                renderReadingView();
                break;
        }
    }

    // ==========================================
    // FOLDER MANAGEMENT
    // ==========================================

    function renderFolders() {
        const folders = library.folders;

        if (folders.length === 0) {
            els.foldersContainer.innerHTML = '';
            els.emptyLibrary.classList.remove('hidden');
            return;
        }

        els.emptyLibrary.classList.add('hidden');

        els.foldersContainer.innerHTML = folders.map(folder => `
            <div class="folder-card" data-folder-id="${folder.id}">
                <div class="folder-icon">📁</div>
                <div class="folder-name">${escapeHtml(folder.name)}</div>
                <div class="folder-count">${folder.items.length} item${folder.items.length !== 1 ? 's' : ''}</div>
            </div>
        `).join('');

        // Add click handlers
        els.foldersContainer.querySelectorAll('.folder-card').forEach(card => {
            card.addEventListener('click', () => {
                currentFolderId = card.dataset.folderId;
                showView('folder');
            });
        });
    }

    function openNewFolderModal() {
        editingFolderId = null;
        els.folderModalTitle.textContent = 'New Folder';
        els.saveFolderBtn.textContent = 'Create Folder';
        els.folderNameInput.value = '';
        els.newFolderModal.classList.remove('hidden');
        setTimeout(() => els.folderNameInput.focus(), 100);
    }

    function openRenameFolderModal() {
        els.folderMenu.classList.add('hidden');
        const folder = getFolder(currentFolderId);
        if (!folder) return;

        editingFolderId = currentFolderId;
        els.folderModalTitle.textContent = 'Rename Folder';
        els.saveFolderBtn.textContent = 'Save';
        els.folderNameInput.value = folder.name;
        els.newFolderModal.classList.remove('hidden');
        setTimeout(() => {
            els.folderNameInput.focus();
            els.folderNameInput.select();
        }, 100);
    }

    function closeFolderModal() {
        els.newFolderModal.classList.add('hidden');
        editingFolderId = null;
    }

    function saveFolder() {
        const name = els.folderNameInput.value.trim();
        if (!name) return;

        if (editingFolderId) {
            // Rename existing folder
            const folder = getFolder(editingFolderId);
            if (folder) {
                folder.name = name;
                els.folderTitle.textContent = name;
            }
        } else {
            // Create new folder
            const folder = {
                id: generateId(),
                name: name,
                items: [],
                createdAt: Date.now()
            };
            library.folders.push(folder);
        }

        saveLibrary();
        closeFolderModal();
        renderFolders();
    }

    function toggleFolderMenu() {
        els.folderMenu.classList.toggle('hidden');
    }

    function confirmDeleteFolder() {
        els.folderMenu.classList.add('hidden');
        const folder = getFolder(currentFolderId);
        if (!folder) return;

        pendingDeleteType = 'folder';
        pendingDeleteId = currentFolderId;
        els.confirmMessage.textContent = `Delete "${folder.name}" and all its contents?`;
        els.confirmModal.classList.remove('hidden');
    }

    // ==========================================
    // FOLDER CONTENTS
    // ==========================================

    function renderFolderContents() {
        const folder = getFolder(currentFolderId);
        if (!folder) {
            showView('home');
            return;
        }

        els.folderTitle.textContent = folder.name;

        if (folder.items.length === 0) {
            els.folderContents.innerHTML = '';
            els.emptyFolder.classList.remove('hidden');
            return;
        }

        els.emptyFolder.classList.add('hidden');

        // Sort by date, newest first
        const sortedItems = [...folder.items].sort((a, b) => b.createdAt - a.createdAt);

        els.folderContents.innerHTML = sortedItems.map(item => {
            // Get drill status if available
            let drillBadge = '';
            if (window.DailyDrill) {
                const status = window.DailyDrill.getTrackingStatus(item.id);
                const hasQuestions = window.DailyDrill.hasQuestions(item.id);

                if (status === 'mastered') {
                    drillBadge = '<span class="drill-status-badge mastered">✓ Mastered</span>';
                } else if (status === 'reviewing') {
                    drillBadge = '<span class="drill-status-badge reviewing">📝 Reviewing</span>';
                } else if (hasQuestions) {
                    drillBadge = '<span class="drill-status-badge has-questions">📋 Has Questions</span>';
                }
            }

            return `
                <div class="content-item" data-content-id="${item.id}">
                    <div class="content-item-header">
                        <div class="content-item-title">${escapeHtml(item.title)}</div>
                        <span class="source-badge ${item.sourceType}">${item.sourceType.toUpperCase()}</span>
                    </div>
                    <div class="content-item-excerpt">${escapeHtml(getExcerpt(item.content, 100))}</div>
                    <div class="content-item-footer">
                        <span class="content-item-date">${formatDate(item.createdAt)}</span>
                        ${drillBadge}
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers
        els.folderContents.querySelectorAll('.content-item').forEach(item => {
            item.addEventListener('click', () => {
                currentContentId = item.dataset.contentId;
                showView('reading');
            });
        });
    }

    // ==========================================
    // ADD CONTENT
    // ==========================================

    function openAddContentModal() {
        resetModalState();
        els.addContentModal.classList.remove('hidden');
        switchContentType('text');
        setTimeout(() => els.contentTitle.focus(), 100);
    }

    function closeAddContentModal() {
        els.addContentModal.classList.add('hidden');
        resetModalState();
    }

    function resetModalState() {
        els.contentTitle.value = '';
        els.contentText.value = '';
        els.contentUrl.value = '';
        els.fileInput.value = '';
        els.filePreview.classList.add('hidden');
        els.fileProcessing.classList.add('hidden');
        els.urlProcessing.classList.add('hidden');
        els.urlPreview.classList.add('hidden');
        pendingFileContent = null;
        pendingUrlContent = null;
    }

    function switchContentType(type) {
        els.typeTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.type === type);
        });

        els.textInputSection.classList.add('hidden');
        els.fileInputSection.classList.add('hidden');
        els.urlInputSection.classList.add('hidden');

        switch (type) {
            case 'text':
                els.textInputSection.classList.remove('hidden');
                break;
            case 'file':
                els.fileInputSection.classList.remove('hidden');
                break;
            case 'url':
                els.urlInputSection.classList.remove('hidden');
                break;
        }
    }

    function getActiveContentType() {
        const activeTab = document.querySelector('.type-tab.active');
        return activeTab ? activeTab.dataset.type : 'text';
    }

    function saveContent() {
        const type = getActiveContentType();
        let title, content, sourceType, sourceUrl;

        switch (type) {
            case 'text':
                content = els.contentText.value.trim();
                if (!content) {
                    alert('Please enter some text');
                    return;
                }
                title = els.contentTitle.value.trim() || getFirstLine(content);
                sourceType = 'text';
                break;

            case 'file':
                if (!pendingFileContent) {
                    alert('Please upload a file');
                    return;
                }
                content = pendingFileContent.content;
                title = els.contentTitle.value.trim() || pendingFileContent.name;
                sourceType = 'file';
                break;

            case 'url':
                if (!pendingUrlContent) {
                    alert('Please enter a URL and wait for it to load');
                    return;
                }
                content = pendingUrlContent.content;
                title = els.contentTitle.value.trim() || pendingUrlContent.title;
                sourceType = 'url';
                sourceUrl = els.contentUrl.value.trim();
                break;
        }

        const item = {
            id: generateId(),
            title: title,
            content: content,
            sourceType: sourceType,
            sourceUrl: sourceUrl || null,
            createdAt: Date.now()
        };

        const folder = getFolder(currentFolderId);
        if (folder) {
            folder.items.push(item);
            saveLibrary();

            // Notify Daily Drill about new content
            if (window.DailyDrill && typeof window.DailyDrill.onContentAdded === 'function') {
                window.DailyDrill.onContentAdded(item.id);
            }

            closeAddContentModal();
            renderFolderContents();
        }
    }

    // ==========================================
    // FILE HANDLING
    // ==========================================

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) processFile(file);
    }

    function handleDragOver(e) {
        e.preventDefault();
        els.fileDropZone.classList.add('dragover');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        els.fileDropZone.classList.remove('dragover');
    }

    function handleFileDrop(e) {
        e.preventDefault();
        els.fileDropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    }

    async function processFile(file) {
        const validTypes = ['application/pdf', 'text/plain', 'text/markdown'];
        const validExtensions = ['.pdf', '.txt', '.md', '.text', '.markdown'];

        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!validExtensions.includes(ext)) {
            alert('Please upload a PDF, TXT, or MD file');
            return;
        }

        els.fileDropZone.classList.add('hidden');
        els.fileProcessing.classList.remove('hidden');

        try {
            let content;

            if (ext === '.pdf') {
                content = await extractPdfText(file);
            } else {
                content = await file.text();
            }

            pendingFileContent = {
                name: file.name,
                content: content
            };

            els.fileProcessing.classList.add('hidden');
            els.filePreview.classList.remove('hidden');
            els.fileName.textContent = file.name;

        } catch (error) {
            console.error('File processing error:', error);
            alert('Error processing file. Please try again.');
            els.fileProcessing.classList.add('hidden');
            els.fileDropZone.classList.remove('hidden');
        }
    }

    async function extractPdfText(file) {
        // Simple PDF text extraction
        // For a production app, you'd use pdf.js or similar
        // This is a basic implementation that reads the raw text
        try {
            const arrayBuffer = await file.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);
            let text = '';

            // Try to extract readable text from PDF
            // This is a simplified approach - real PDF parsing is complex
            const decoder = new TextDecoder('utf-8', { fatal: false });
            const rawText = decoder.decode(bytes);

            // Extract text between stream markers (simplified)
            const streamMatches = rawText.match(/stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g);
            if (streamMatches) {
                for (const match of streamMatches) {
                    const content = match.replace(/stream[\r\n]+/, '').replace(/[\r\n]+endstream/, '');
                    // Filter for readable ASCII text
                    const readable = content.replace(/[^\x20-\x7E\r\n]/g, ' ').trim();
                    if (readable.length > 20) {
                        text += readable + '\n\n';
                    }
                }
            }

            // If we couldn't extract much, return a message
            if (text.trim().length < 100) {
                return `[PDF content from: ${file.name}]\n\nNote: PDF text extraction is limited. The file has been saved but the text may not display correctly. Consider copying text manually from the original PDF.`;
            }

            return text.trim();
        } catch (e) {
            return `[PDF content from: ${file.name}]\n\nNote: Could not extract text from this PDF. The file reference has been saved.`;
        }
    }

    function clearFileSelection() {
        els.fileInput.value = '';
        els.filePreview.classList.add('hidden');
        els.fileDropZone.classList.remove('hidden');
        pendingFileContent = null;
    }

    // ==========================================
    // URL HANDLING
    // ==========================================

    async function fetchUrlContent() {
        const url = els.contentUrl.value.trim();
        if (!url || pendingUrlContent?.url === url) return;

        // Basic URL validation
        try {
            new URL(url);
        } catch {
            return;
        }

        els.urlPreview.classList.add('hidden');
        els.urlProcessing.classList.remove('hidden');

        try {
            // Use a CORS proxy for fetching external content
            // In production, you'd have your own backend for this
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error('Failed to fetch');

            const html = await response.text();
            const parsed = parseHtmlContent(html, url);

            pendingUrlContent = {
                url: url,
                title: parsed.title,
                content: parsed.content
            };

            els.urlProcessing.classList.add('hidden');
            els.urlPreview.classList.remove('hidden');
            els.urlPreviewTitle.textContent = parsed.title;
            els.urlPreviewExcerpt.textContent = getExcerpt(parsed.content, 150);

        } catch (error) {
            console.error('URL fetch error:', error);
            els.urlProcessing.classList.add('hidden');

            // Fallback - save URL reference
            pendingUrlContent = {
                url: url,
                title: 'Link: ' + url,
                content: `[Content from: ${url}]\n\nNote: Could not fetch content from this URL. The link has been saved for reference.`
            };

            els.urlPreview.classList.remove('hidden');
            els.urlPreviewTitle.textContent = 'Link saved';
            els.urlPreviewExcerpt.textContent = url;
        }
    }

    function parseHtmlContent(html, url) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Get title
        let title = doc.querySelector('title')?.textContent?.trim() ||
                    doc.querySelector('h1')?.textContent?.trim() ||
                    doc.querySelector('meta[property="og:title"]')?.content ||
                    url;

        // Remove unwanted elements
        const removeSelectors = ['script', 'style', 'nav', 'header', 'footer', 'aside', 'iframe', 'noscript', '.ad', '.advertisement', '.sidebar', '.comments'];
        removeSelectors.forEach(selector => {
            doc.querySelectorAll(selector).forEach(el => el.remove());
        });

        // Try to find main content
        const mainContent = doc.querySelector('article') ||
                           doc.querySelector('main') ||
                           doc.querySelector('.post-content') ||
                           doc.querySelector('.article-content') ||
                           doc.querySelector('.entry-content') ||
                           doc.querySelector('.content') ||
                           doc.body;

        // Get text content
        let content = mainContent?.textContent || '';

        // Clean up whitespace
        content = content
            .replace(/\s+/g, ' ')
            .replace(/\n\s*\n/g, '\n\n')
            .trim();

        return { title, content };
    }

    // ==========================================
    // READING VIEW
    // ==========================================

    function renderReadingView() {
        const folder = getFolder(currentFolderId);
        const item = folder?.items.find(i => i.id === currentContentId);

        if (!item) {
            showView('folder');
            return;
        }

        els.readingSource.textContent = item.sourceType.toUpperCase();
        els.readingSource.className = 'source-badge ' + item.sourceType;
        els.readingDate.textContent = formatDate(item.createdAt);
        els.readingTitle.textContent = item.title;
        els.readingBody.textContent = item.content;
    }

    function confirmDeleteContent() {
        const folder = getFolder(currentFolderId);
        const item = folder?.items.find(i => i.id === currentContentId);
        if (!item) return;

        pendingDeleteType = 'content';
        pendingDeleteId = currentContentId;
        els.confirmMessage.textContent = `Delete "${item.title}"?`;
        els.confirmModal.classList.remove('hidden');
    }

    function addCurrentToDrillQueue() {
        if (!currentContentId) return;

        if (window.DailyDrill && typeof window.DailyDrill.addToQueue === 'function') {
            window.DailyDrill.addToQueue(currentContentId);

            // Visual feedback
            const btn = document.getElementById('add-to-drill-btn');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = '✓';
                btn.style.color = 'var(--success)';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.color = '';
                }, 1500);
            }
        }
    }

    // ==========================================
    // DELETE CONFIRMATION
    // ==========================================

    function closeConfirmModal() {
        els.confirmModal.classList.add('hidden');
        pendingDeleteType = null;
        pendingDeleteId = null;
    }

    function executeDelete() {
        if (pendingDeleteType === 'folder') {
            library.folders = library.folders.filter(f => f.id !== pendingDeleteId);
            saveLibrary();
            closeConfirmModal();
            showView('home');
        } else if (pendingDeleteType === 'content') {
            const folder = getFolder(currentFolderId);
            if (folder) {
                folder.items = folder.items.filter(i => i.id !== pendingDeleteId);
                saveLibrary();
                closeConfirmModal();
                showView('folder');
            }
        }
    }

    // ==========================================
    // STORAGE
    // ==========================================

    function saveLibrary() {
        try {
            localStorage.setItem('brainTrainerLibrary', JSON.stringify(library));
        } catch (e) {
            console.error('Error saving library:', e);
            // Handle quota exceeded
            if (e.name === 'QuotaExceededError') {
                alert('Storage limit reached. Please delete some content to continue.');
            }
        }
    }

    function loadLibrary() {
        try {
            const saved = localStorage.getItem('brainTrainerLibrary');
            if (saved) {
                library = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading library:', e);
            library = { folders: [] };
        }

        // Ensure default Poker GTO folders exist
        ensureDefaultFolders();
    }

    function ensureDefaultFolders() {
        const defaultFolders = [
            { name: 'GTO Foundations', noteTitle: 'GTO Foundations — Study Notes' },
            { name: 'Preflop Ranges by Position', noteTitle: 'Preflop Ranges by Position — Study Notes' },
            { name: 'Bet Sizing & Pot Odds', noteTitle: 'Bet Sizing & Pot Odds — Study Notes' },
            { name: 'Range Construction & Blockers', noteTitle: 'Range Construction & Blockers — Study Notes' },
            { name: 'Postflop Concepts', noteTitle: 'Postflop Concepts — Study Notes' },
            { name: 'Exploitative Deviations', noteTitle: 'Exploitative Deviations — Study Notes' },
            { name: 'Blind vs. Blind Strategy', noteTitle: 'Blind vs. Blind Strategy — Study Notes' },
            { name: 'Scenario Quiz Bank', noteTitle: 'Scenario Quiz Bank — Study Notes' }
        ];

        const placeholderContent = 'Add your notes here. Paste articles, solver outputs, or hand histories to build your reference library.';

        let foldersAdded = false;

        for (const folderDef of defaultFolders) {
            // Check if folder already exists (by name)
            const exists = library.folders.some(f => f.name === folderDef.name);
            if (!exists) {
                const folder = {
                    id: generateId(),
                    name: folderDef.name,
                    items: [{
                        id: generateId(),
                        title: folderDef.noteTitle,
                        content: placeholderContent,
                        sourceType: 'text',
                        sourceUrl: null,
                        createdAt: Date.now()
                    }],
                    createdAt: Date.now()
                };
                library.folders.push(folder);
                foldersAdded = true;
            }
        }

        if (foldersAdded) {
            saveLibrary();
        }
    }

    // ==========================================
    // UTILITIES
    // ==========================================

    function getFolder(id) {
        return library.folders.find(f => f.id === id);
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getExcerpt(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    function getFirstLine(text) {
        const firstLine = text.split('\n')[0].trim();
        return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }

    // ==========================================
    // INIT
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
