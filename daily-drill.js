// Daily Drill - Brain Trainer
// Spaced repetition session management

(function() {
    'use strict';

    // ==========================================
    // STATE
    // ==========================================

    const STORAGE_KEY = 'brainTrainerDailyDrill';
    const QUESTIONS_KEY = 'brainTrainerDrillQuestions';

    let drillData = {
        contentTracking: {},
        readingQueue: [],
        queueMode: 'manual',
        stats: {
            currentStreak: 0,
            longestStreak: 0,
            totalSessions: 0,
            itemsMastered: 0,
            lastSessionDate: null
        },
        settings: {
            sessionMinutes: 12,
            maxReviewsPerSession: 10,
            focusMode: false,
            focusFolder: null
        }
    };

    let questions = {}; // documentId -> question[]

    let currentSession = null;
    let sessionState = {
        currentIndex: 0,
        results: [],
        startTime: null,
        currentQuestion: null,
        userAnswer: '',
        confidence: 'somewhat',
        showingResult: false,
        showingComparison: false
    };

    let currentReadingDoc = null;
    let pendingQuestions = [];

    // ==========================================
    // INITIALIZATION
    // ==========================================

    function init() {
        loadData();
        setupDrillEventListeners();
    }

    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                drillData = { ...drillData, ...JSON.parse(saved) };
            }
            const savedQuestions = localStorage.getItem(QUESTIONS_KEY);
            if (savedQuestions) {
                questions = JSON.parse(savedQuestions);
            }
        } catch (e) {
            console.error('Error loading drill data:', e);
        }
    }

    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(drillData));
            localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
        } catch (e) {
            console.error('Error saving drill data:', e);
        }
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    function setupDrillEventListeners() {
        // These will be set up when elements exist
        document.addEventListener('click', handleDrillClick);
        document.addEventListener('change', handleDrillChange);
        document.addEventListener('input', handleDrillInput);
        document.addEventListener('keypress', handleDrillKeypress);
    }

    function handleDrillClick(e) {
        const target = e.target;

        // Daily Drill button from Library
        if (target.id === 'daily-drill-btn' || target.closest('#daily-drill-btn')) {
            showDrillHome();
            return;
        }

        // Session length option buttons
        if (target.classList.contains('session-length-option')) {
            document.querySelectorAll('.session-length-option').forEach(o => o.classList.remove('selected'));
            target.classList.add('selected');
            return;
        }

        // Back to Library
        if (target.id === 'drill-back-btn' || target.closest('#drill-back-btn')) {
            hideDrill();
            return;
        }

        // Start session
        if (target.id === 'start-session-btn') {
            startSession();
            return;
        }

        // Confidence buttons
        if (target.classList.contains('confidence-btn')) {
            document.querySelectorAll('.confidence-btn').forEach(b => b.classList.remove('selected'));
            target.classList.add('selected');
            sessionState.confidence = target.dataset.confidence;
            return;
        }

        // Submit answer
        if (target.id === 'drill-submit-btn') {
            submitAnswer();
            return;
        }

        // Show model answer (self-grade)
        if (target.id === 'drill-show-answer-btn') {
            showComparison();
            return;
        }

        // Self-grade buttons
        if (target.classList.contains('self-grade-btn')) {
            const grade = target.dataset.grade;
            handleSelfGrade(grade);
            return;
        }

        // Next question
        if (target.id === 'drill-next-btn') {
            nextQuestion();
            return;
        }

        // Skip question
        if (target.id === 'drill-skip-btn') {
            skipQuestion();
            return;
        }

        // Mark as read
        if (target.id === 'drill-mark-read-btn') {
            markCurrentAsRead();
            return;
        }

        // Add question button
        if (target.id === 'add-question-btn') {
            addQuestionForm();
            return;
        }

        // Remove question form
        if (target.classList.contains('question-form-remove')) {
            target.closest('.question-form').remove();
            return;
        }

        // Save questions
        if (target.id === 'save-questions-btn') {
            saveNewQuestions();
            return;
        }

        // Skip adding questions
        if (target.id === 'skip-questions-btn' || target.id === 'skip-questions-choice-btn') {
            finishReading();
            return;
        }

        // Auto-generate questions
        if (target.id === 'auto-generate-btn') {
            autoGenerateQuestions();
            return;
        }

        // Manual questions
        if (target.id === 'manual-questions-btn') {
            showAddQuestionsScreen();
            return;
        }

        // Retry auto-generation
        if (target.id === 'retry-generate-btn') {
            autoGenerateQuestions();
            return;
        }

        // Save generated questions
        if (target.id === 'save-generated-btn') {
            saveGeneratedQuestions();
            return;
        }

        // Add custom question to generated list
        if (target.id === 'add-custom-question-btn') {
            showAddQuestionsScreen();
            return;
        }

        // Remove generated question
        if (target.classList.contains('remove-generated-btn')) {
            const index = parseInt(target.dataset.index);
            removeGeneratedQuestion(index);
            return;
        }

        // Session complete actions
        if (target.id === 'drill-done-btn') {
            showDrillHome();
            return;
        }

        if (target.id === 'drill-continue-btn') {
            continueSession();
            return;
        }

        // Settings
        if (target.id === 'drill-settings-btn') {
            showDrillSettings();
            return;
        }

        if (target.id === 'save-drill-settings-btn') {
            saveDrillSettings();
            return;
        }

        if (target.id === 'close-drill-settings') {
            closeDrillSettings();
            return;
        }

        // Test API connection
        if (target.id === 'test-api-btn') {
            testApiConnection();
            return;
        }

        // Queue management
        if (target.id === 'drill-queue-btn') {
            showQueueManager();
            return;
        }

        if (target.id === 'close-queue-modal') {
            closeQueueManager();
            return;
        }

        if (target.classList.contains('queue-item-remove')) {
            const docId = target.closest('.queue-item').dataset.docId;
            removeFromQueue(docId);
            return;
        }

        if (target.id === 'add-to-queue-btn') {
            showAddToQueueModal();
            return;
        }

        // Multiple choice selection
        if (target.classList.contains('drill-choice-btn')) {
            document.querySelectorAll('.drill-choice-btn').forEach(b => b.classList.remove('selected'));
            target.classList.add('selected');
            sessionState.userAnswer = target.dataset.index;
            return;
        }

        // Read something new from caught-up state
        if (target.id === 'read-new-btn') {
            startReadingFromQueue();
            return;
        }
    }

    function handleDrillChange(e) {
        const target = e.target;

        // Settings changes
        if (target.classList.contains('drill-setting-option')) {
            const group = target.closest('.drill-setting-options');
            group.querySelectorAll('.drill-setting-option').forEach(o => o.classList.remove('selected'));
            target.classList.add('selected');
        }
    }

    function handleDrillInput(e) {
        const target = e.target;

        if (target.id === 'drill-answer-input' || target.id === 'drill-answer-textarea') {
            sessionState.userAnswer = target.value;
        }

        if (target.id === 'max-reviews-slider') {
            document.getElementById('max-reviews-value').textContent = target.value;
        }
    }

    function handleDrillKeypress(e) {
        const target = e.target;

        // Submit on Enter for numeric input
        if (target.id === 'drill-answer-input' && e.key === 'Enter') {
            e.preventDefault();
            submitAnswer();
        }
    }

    // ==========================================
    // DRILL HOME / ENTRY
    // ==========================================

    function showDrillHome() {
        const libraryHome = document.getElementById('library-home');
        const folderView = document.getElementById('folder-view');
        const readingView = document.getElementById('reading-view');
        const drillView = document.getElementById('drill-view');

        if (libraryHome) libraryHome.classList.add('hidden');
        if (folderView) folderView.classList.add('hidden');
        if (readingView) readingView.classList.add('hidden');
        if (drillView) drillView.classList.remove('hidden');

        cleanupOrphanedData();
        renderDrillHome();
    }

    function hideDrill() {
        const drillView = document.getElementById('drill-view');
        const libraryHome = document.getElementById('library-home');

        if (drillView) drillView.classList.add('hidden');
        if (libraryHome) libraryHome.classList.remove('hidden');
    }

    function renderDrillHome() {
        const container = document.getElementById('drill-content');
        if (!container) return;

        const session = buildSession();
        currentSession = session;

        let html = `
            <div class="drill-entry">
                <div class="drill-hero">🎯</div>
                <h2 class="drill-title">Daily Drill</h2>
        `;

        // Check for empty library
        const library = getLibraryData();
        if (!library || library.folders.length === 0) {
            html += `
                <div class="drill-empty-state">
                    <div class="drill-empty-icon">📚</div>
                    <div class="drill-empty-title">No Content Yet</div>
                    <div class="drill-empty-text">Add content to your Library first, then come back to drill on it.</div>
                    <button class="primary-btn" onclick="window.DailyDrill.hideDrill()">Go to Library</button>
                </div>
            `;
            container.innerHTML = html + '</div>';
            return;
        }

        if (session.allCaughtUp) {
            // All caught up state
            const queueCount = drillData.readingQueue.length;
            const nextReview = getNextReviewDate();

            html += `
                <div class="caught-up">
                    <div class="caught-up-icon">✨</div>
                    <div class="caught-up-title">All Caught Up!</div>
                    <div class="caught-up-text">Nothing due for review today.</div>

                    <div class="caught-up-stats">
                        <div class="caught-up-stat">📖 ${queueCount} unread items in your queue</div>
                        <div class="caught-up-stat">📝 Next review: ${nextReview || 'None scheduled'}</div>
                    </div>

                    <div class="caught-up-actions">
                        ${queueCount > 0 ? '<button id="read-new-btn" class="primary-btn">Read Something New</button>' : ''}
                        <button class="secondary-btn" onclick="window.DailyDrill.hideDrill()">Back to Library</button>
                    </div>
                </div>
            `;
        } else if (session.recoveryMode) {
            // Recovery mode
            const daysToRecover = Math.ceil(session.totalOverdue / drillData.settings.maxReviewsPerSession);

            html += `
                <div class="recovery-banner">
                    <div class="recovery-icon">⚠️</div>
                    <div class="recovery-title">Recovery Mode</div>
                    <div class="recovery-text">
                        You have ${session.totalOverdue} overdue reviews.<br>
                        No worries - we'll do ${drillData.settings.maxReviewsPerSession} today.<br>
                        At this pace, you'll be caught up in ~${daysToRecover} days.
                    </div>
                </div>

                <button id="start-session-btn" class="start-session-btn">Start Recovery Session</button>
            `;
        } else {
            // Normal session
            html += `
                <div class="session-preview">
                    <div class="session-preview-title">Today's Session</div>
                    <div class="session-stats">
                        <div class="session-stat">
                            <span class="session-stat-icon">📝</span>
                            <span>${session.reviews.length} review${session.reviews.length !== 1 ? 's' : ''} due</span>
                        </div>
                        ${session.newReading ? `
                        <div class="session-stat">
                            <span class="session-stat-icon">📖</span>
                            <span>1 new reading</span>
                        </div>
                        ` : ''}
                        <div class="session-stat">
                            <span class="session-stat-icon">⏱️</span>
                            <span>~${Math.round(session.totalEstimatedMinutes)} minutes</span>
                        </div>
                    </div>
                    <button id="start-session-btn" class="start-session-btn" ${session.reviews.length === 0 && !session.newReading ? 'disabled' : ''}>
                        Start Session
                    </button>
                </div>
            `;
        }

        // Streak display
        if (drillData.stats.currentStreak > 0) {
            html += `<div class="streak-display">🔥 ${drillData.stats.currentStreak} day streak</div>`;
        }

        // Action buttons
        html += `
            <div class="drill-actions">
                <button id="drill-settings-btn" class="drill-action-btn">⚙️ Settings</button>
                <button id="drill-queue-btn" class="drill-action-btn">📋 Queue</button>
            </div>
        </div>
        `;

        container.innerHTML = html;
    }

    // ==========================================
    // SESSION BUILDER
    // ==========================================

    function buildSession() {
        const session = {
            reviews: [],
            newReading: null,
            totalEstimatedMinutes: 0,
            overdueCount: 0,
            recoveryMode: false,
            allCaughtUp: false
        };

        const library = getLibraryData();
        if (!library) return session;

        // Step 1: Gather all overdue items
        let overdueItems = [];

        for (const [docId, item] of Object.entries(drillData.contentTracking)) {
            if (item.status === 'reviewing' && SpacedRepetition.isOverdue(item)) {
                // Check if document exists and has questions
                const doc = findDocument(docId, library);
                const docQuestions = questions[docId];

                if (doc && docQuestions && docQuestions.length > 0) {
                    overdueItems.push({
                        documentId: docId,
                        item: item,
                        daysOverdue: SpacedRepetition.getDaysOverdue(item),
                        folder: getDocumentFolder(docId, library),
                        document: doc
                    });
                }
            }
        }

        // Sort by most overdue first
        overdueItems.sort((a, b) => b.daysOverdue - a.daysOverdue);
        session.overdueCount = overdueItems.length;

        // Step 2: Apply focus mode filter
        if (drillData.settings.focusMode && drillData.settings.focusFolder) {
            overdueItems = overdueItems.filter(item => item.folder === drillData.settings.focusFolder);
        }

        // Step 3: Cap reviews
        session.reviews = overdueItems.slice(0, drillData.settings.maxReviewsPerSession);
        session.totalEstimatedMinutes += session.reviews.length * 1.5;

        // Step 4: Add new reading if room
        const timeRemaining = drillData.settings.sessionMinutes - session.totalEstimatedMinutes;
        const notOverloaded = overdueItems.length <= drillData.settings.maxReviewsPerSession;

        if (timeRemaining >= 5 && notOverloaded && drillData.readingQueue.length > 0) {
            const nextDocId = drillData.readingQueue[0];
            const nextDoc = findDocument(nextDocId, library);
            if (nextDoc) {
                session.newReading = {
                    documentId: nextDocId,
                    document: nextDoc,
                    folder: getDocumentFolder(nextDocId, library)
                };
                session.totalEstimatedMinutes += 7;
            }
        }

        // Step 5: Recovery mode check
        if (overdueItems.length > drillData.settings.maxReviewsPerSession * 2) {
            session.recoveryMode = true;
            session.totalOverdue = overdueItems.length;
        }

        // Step 6: All caught up check
        if (session.reviews.length === 0 && !session.newReading) {
            session.allCaughtUp = true;
        }

        return session;
    }

    // ==========================================
    // SESSION FLOW
    // ==========================================

    function startSession() {
        if (!currentSession) return;

        sessionState = {
            currentIndex: 0,
            results: [],
            startTime: Date.now(),
            currentQuestion: null,
            userAnswer: '',
            confidence: 'somewhat',
            showingResult: false,
            showingComparison: false
        };

        // Update streak
        drillData.stats = SpacedRepetition.updateStreak(drillData.stats);
        saveData();

        showNextItem();
    }

    function showNextItem() {
        // Check if we're done with reviews
        if (sessionState.currentIndex >= currentSession.reviews.length) {
            // Check for new reading
            if (currentSession.newReading && !currentReadingDoc) {
                showReading(currentSession.newReading);
            } else {
                showSessionComplete();
            }
            return;
        }

        const reviewItem = currentSession.reviews[sessionState.currentIndex];
        const docQuestions = questions[reviewItem.documentId];

        if (!docQuestions || docQuestions.length === 0) {
            sessionState.currentIndex++;
            showNextItem();
            return;
        }

        // Pick a question based on difficulty level
        const item = reviewItem.item;
        const level = item.difficultyLevel || 1;

        // Try to find a question at current level, or closest
        let question = docQuestions.find(q => q.level === level);
        if (!question) {
            question = docQuestions[Math.floor(Math.random() * docQuestions.length)];
        }

        sessionState.currentQuestion = question;
        sessionState.userAnswer = '';
        sessionState.confidence = 'somewhat';
        sessionState.showingResult = false;
        sessionState.showingComparison = false;

        renderQuestion(reviewItem, question);
    }

    function renderQuestion(reviewItem, question) {
        const container = document.getElementById('drill-content');
        if (!container) return;

        const progress = `Review ${sessionState.currentIndex + 1} of ${currentSession.reviews.length}`;

        let answerHtml = '';

        if (question.type === 'multiple_choice' && question.choices) {
            answerHtml = `
                <div class="drill-choices">
                    ${question.choices.map((choice, i) => `
                        <button class="drill-choice-btn" data-index="${i}">${choice}</button>
                    `).join('')}
                </div>
            `;
        } else if (question.type === 'self_grade') {
            answerHtml = `
                <textarea id="drill-answer-textarea" class="drill-answer-textarea" placeholder="Type your answer..."></textarea>
            `;
        } else {
            answerHtml = `
                <input type="text" id="drill-answer-input" class="drill-answer-input" placeholder="Your answer..." inputmode="decimal" autocomplete="off">
            `;
        }

        const submitText = question.type === 'self_grade' ? 'Show Model Answer' : 'Submit';
        const submitId = question.type === 'self_grade' ? 'drill-show-answer-btn' : 'drill-submit-btn';

        container.innerHTML = `
            <div class="drill-question-screen">
                <div class="drill-question-header">
                    <span class="drill-progress">${progress}</span>
                    <span class="drill-folder-badge">📁 ${reviewItem.folder || 'Unknown'}</span>
                </div>

                <div class="drill-question-card">
                    <div class="drill-question-text">${escapeHtml(question.question)}</div>

                    ${answerHtml}

                    <div class="confidence-section">
                        <div class="confidence-label">How confident are you?</div>
                        <div class="confidence-buttons">
                            <button class="confidence-btn" data-confidence="guessing">Guessing</button>
                            <button class="confidence-btn selected" data-confidence="somewhat">Somewhat</button>
                            <button class="confidence-btn" data-confidence="confident">Confident</button>
                        </div>
                    </div>

                    <div class="drill-actions-row">
                        <button id="${submitId}" class="drill-submit-btn">${submitText}</button>
                        <button id="drill-skip-btn" class="drill-skip-btn">Skip</button>
                    </div>
                </div>
            </div>
        `;

        // Focus input
        const input = document.getElementById('drill-answer-input') || document.getElementById('drill-answer-textarea');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    async function submitAnswer() {
        const question = sessionState.currentQuestion;
        if (!question) return;

        // Check if this is an LLM validation type
        const isLLMValidation = question.validation?.method === 'llm' && QuestionValidator.isLLMGradingAvailable();

        if (isLLMValidation) {
            // Show loading state
            showGradingLoadingState();

            try {
                const result = await QuestionValidator.validateWithLLM(question, sessionState.userAnswer);

                if (result === null) {
                    // LLM failed, fall back to self-grade
                    showComparison();
                } else {
                    showLLMResult(result);
                }
            } catch (error) {
                console.error('LLM grading error:', error);
                // Fall back to self-grade
                showComparison();
            }
        } else {
            // Non-LLM validation (numeric, multiple choice, or self-grade)
            const result = QuestionValidator.validateAnswer(question, sessionState.userAnswer);

            if (result === null) {
                // Self-grade - should use show answer button
                return;
            }

            showResult(result);
        }
    }

    function showGradingLoadingState() {
        const container = document.getElementById('drill-content');
        if (!container) return;

        container.innerHTML = `
            <div class="ai-loading-screen grading">
                <div class="ai-loading-spinner"></div>
                <h2>Checking your answer...</h2>
            </div>
        `;
    }

    function showLLMResult(result) {
        sessionState.showingResult = true;

        // Update tracking
        const reviewItem = currentSession.reviews[sessionState.currentIndex];
        if (reviewItem) {
            const item = drillData.contentTracking[reviewItem.documentId];
            if (item) {
                SpacedRepetition.updateAfterQuiz(item, result.correct, result.partial, sessionState.confidence);
                saveData();
            }
        }

        // Record result
        sessionState.results.push({
            correct: result.correct,
            partial: result.partial
        });

        const container = document.getElementById('drill-content');
        if (!container) return;

        const resultClass = result.correct ? 'correct' : result.partial ? 'partial' : 'incorrect';
        const resultIcon = result.correct ? '✓' : result.partial ? '◐' : '✗';
        const resultTitle = result.correct ? 'Correct!' : result.partial ? 'Partially Correct' : 'Not Quite';

        // Build covered points display
        let pointsHtml = '';
        if (result.coveredPoints || result.missing) {
            pointsHtml = '<div class="llm-points-breakdown">';

            if (result.coveredPoints && result.coveredPoints.length > 0) {
                pointsHtml += result.coveredPoints.map(p =>
                    `<div class="llm-point covered">✓ ${escapeHtml(p)}</div>`
                ).join('');
            }

            if (result.missing && result.missing.length > 0) {
                pointsHtml += result.missing.map(p =>
                    `<div class="llm-point missing">✗ ${escapeHtml(p)}</div>`
                ).join('');
            }

            pointsHtml += '</div>';
        }

        // Get next review info
        let nextReviewText = '';
        if (reviewItem) {
            const item = drillData.contentTracking[reviewItem.documentId];
            if (item) {
                const daysUntil = SpacedRepetition.getDaysUntilReview(item);
                if (daysUntil === 0) {
                    nextReviewText = "You'll see this again tomorrow.";
                } else if (daysUntil === 1) {
                    nextReviewText = 'Next review: tomorrow';
                } else {
                    nextReviewText = `Next review: ${daysUntil} days`;
                }
            }
        }

        container.innerHTML = `
            <div class="drill-result">
                <div class="drill-result-icon ${resultClass}">${resultIcon}</div>
                <div class="drill-result-title ${resultClass}">${resultTitle}</div>

                ${pointsHtml}

                <div class="drill-result-explanation">"${escapeHtml(result.feedback)}"</div>

                <div class="drill-result-meta">${nextReviewText}</div>

                <button id="drill-next-btn" class="drill-next-btn">Next Question</button>
            </div>
        `;
    }

    function showComparison() {
        const question = sessionState.currentQuestion;
        if (!question || question.type !== 'self_grade') return;

        sessionState.showingComparison = true;

        const container = document.getElementById('drill-content');
        if (!container) return;

        const progress = `Review ${sessionState.currentIndex + 1} of ${currentSession.reviews.length}`;

        container.innerHTML = `
            <div class="drill-question-screen">
                <div class="drill-question-header">
                    <span class="drill-progress">${progress}</span>
                </div>

                <div class="drill-question-card">
                    <div class="comparison-section">
                        <div class="comparison-label">Your Answer</div>
                        <div class="comparison-box user-answer">${escapeHtml(sessionState.userAnswer) || '(No answer provided)'}</div>
                    </div>

                    <div class="comparison-section">
                        <div class="comparison-label">Model Answer</div>
                        <div class="comparison-box model-answer">${escapeHtml(question.validation.modelAnswer)}</div>
                    </div>

                    <div class="confidence-section">
                        <div class="confidence-label">How did you do?</div>
                        <div class="self-grade-buttons">
                            <button class="self-grade-btn got-it" data-grade="correct">Got It</button>
                            <button class="self-grade-btn partial" data-grade="partial">Partially</button>
                            <button class="self-grade-btn missed" data-grade="wrong">Missed It</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function handleSelfGrade(grade) {
        const result = {
            correct: grade === 'correct',
            partial: grade === 'partial',
            feedback: grade === 'correct' ? 'Great job!' : grade === 'partial' ? 'Getting there!' : 'Keep studying!'
        };

        showResult(result);
    }

    function showResult(result) {
        sessionState.showingResult = true;

        // Update tracking
        const reviewItem = currentSession.reviews[sessionState.currentIndex];
        if (reviewItem) {
            const item = drillData.contentTracking[reviewItem.documentId];
            if (item) {
                SpacedRepetition.updateAfterQuiz(item, result.correct, result.partial, sessionState.confidence);
                saveData();
            }
        }

        // Record result
        sessionState.results.push({
            documentId: reviewItem?.documentId,
            correct: result.correct,
            partial: result.partial
        });

        // Render result
        const container = document.getElementById('drill-content');
        if (!container) return;

        const question = sessionState.currentQuestion;
        const item = reviewItem ? drillData.contentTracking[reviewItem.documentId] : null;

        let iconClass, titleClass, icon, title;
        if (result.correct && !result.partial) {
            iconClass = 'correct';
            titleClass = 'correct';
            icon = '✓';
            title = 'Correct!';
        } else if (result.partial) {
            iconClass = 'partial';
            titleClass = 'partial';
            icon = '◐';
            title = 'Partially Correct';
        } else {
            iconClass = 'incorrect';
            titleClass = 'incorrect';
            icon = '✗';
            title = 'Not Quite';
        }

        let answerDisplay = '';
        if (question.validation?.method === 'numeric') {
            answerDisplay = `<div class="drill-result-answer">${question.validation.expected}</div>`;
        }

        let metaText = '';
        if (item) {
            if (result.correct && !result.partial) {
                metaText = `Next review: ${item.intervalDays} day${item.intervalDays !== 1 ? 's' : ''}`;
            } else {
                metaText = "You'll see this again tomorrow.";
            }
        }

        container.innerHTML = `
            <div class="drill-question-card">
                <div class="drill-result">
                    <div class="drill-result-icon ${iconClass}">${icon}</div>
                    <div class="drill-result-title ${titleClass}">${title}</div>
                    ${answerDisplay}

                    ${result.feedback ? `<div class="drill-result-explanation">${escapeHtml(result.feedback)}</div>` : ''}

                    ${metaText ? `<div class="drill-result-meta">${metaText}</div>` : ''}

                    <button id="drill-next-btn" class="drill-next-btn">Next Question →</button>
                </div>
            </div>
        `;
    }

    function nextQuestion() {
        sessionState.currentIndex++;
        showNextItem();
    }

    function skipQuestion() {
        sessionState.results.push({
            documentId: currentSession.reviews[sessionState.currentIndex]?.documentId,
            correct: false,
            skipped: true
        });
        sessionState.currentIndex++;
        showNextItem();
    }

    // ==========================================
    // READING FLOW
    // ==========================================

    function showReading(readingItem) {
        currentReadingDoc = readingItem;

        const container = document.getElementById('drill-content');
        if (!container) return;

        const doc = readingItem.document;

        container.innerHTML = `
            <div class="drill-reading-screen">
                <div class="drill-reading-header">
                    <span class="drill-reading-badge">📖 New Reading</span>
                    <span class="drill-folder-badge">📁 ${readingItem.folder || 'Unknown'}</span>
                </div>

                <div class="drill-reading-content">
                    <h1 class="drill-reading-title">${escapeHtml(doc.title)}</h1>
                    <div class="drill-reading-body">${escapeHtml(doc.content)}</div>
                </div>

                <button id="drill-mark-read-btn" class="drill-mark-read-btn">
                    ✓ Mark as Read & Continue
                </button>
            </div>
        `;
    }

    function markCurrentAsRead() {
        if (!currentReadingDoc) return;

        const docId = currentReadingDoc.documentId;

        // Initialize tracking if needed
        if (!drillData.contentTracking[docId]) {
            drillData.contentTracking[docId] = SpacedRepetition.initializeTracking(docId);
        }

        // Mark as read
        SpacedRepetition.markAsRead(drillData.contentTracking[docId]);

        // Remove from queue
        drillData.readingQueue = drillData.readingQueue.filter(id => id !== docId);

        saveData();

        // Show question creation choice (auto-generate or manual)
        showQuestionCreationChoice();
    }

    function startReadingFromQueue() {
        if (drillData.readingQueue.length === 0) return;

        const library = getLibraryData();
        const docId = drillData.readingQueue[0];
        const doc = findDocument(docId, library);

        if (doc) {
            currentReadingDoc = {
                documentId: docId,
                document: doc,
                folder: getDocumentFolder(docId, library)
            };
            showReading(currentReadingDoc);
        }
    }

    // ==========================================
    // ADD QUESTIONS
    // ==========================================

    function showQuestionCreationChoice() {
        // If AI is not available, go directly to manual creation
        if (!QuestionGenerator || !QuestionGenerator.isAvailable()) {
            showAddQuestionsScreen();
            return;
        }

        const container = document.getElementById('drill-content');
        if (!container) return;

        const docTitle = currentReadingDoc?.document?.title || 'this content';

        container.innerHTML = `
            <div class="question-choice-screen">
                <h2 style="margin-bottom: 8px;">Generate Review Questions</h2>
                <p class="add-questions-intro">
                    How would you like to create questions for "${escapeHtml(docTitle)}"?
                </p>

                <div class="question-choice-options">
                    <button id="auto-generate-btn" class="question-choice-btn">
                        <span class="choice-icon">🤖</span>
                        <span class="choice-title">Auto-Generate</span>
                        <span class="choice-desc">AI creates 5 questions based on the content</span>
                    </button>

                    <button id="manual-questions-btn" class="question-choice-btn">
                        <span class="choice-icon">✍️</span>
                        <span class="choice-title">Write My Own</span>
                        <span class="choice-desc">Create custom questions</span>
                    </button>

                    <button id="skip-questions-choice-btn" class="question-choice-btn secondary">
                        <span class="choice-icon">⏭️</span>
                        <span class="choice-title">Skip for Now</span>
                        <span class="choice-desc">Add questions later</span>
                    </button>
                </div>
            </div>
        `;
    }

    async function autoGenerateQuestions() {
        if (!currentReadingDoc || !currentReadingDoc.document) {
            showAddQuestionsScreen();
            return;
        }

        const container = document.getElementById('drill-content');
        if (!container) return;

        // Show loading state
        container.innerHTML = `
            <div class="ai-loading-screen">
                <div class="ai-loading-spinner"></div>
                <h2>Generating Questions...</h2>
                <p>Analyzing content and creating personalized review questions...</p>
            </div>
        `;

        try {
            const doc = currentReadingDoc.document;
            const generatedQuestions = await QuestionGenerator.generateQuestions(
                doc.id,
                doc.title,
                doc.content
            );

            showReviewGeneratedQuestions(generatedQuestions);
        } catch (error) {
            console.error('Auto-generation failed:', error);
            // Show error and offer to try again or manual
            container.innerHTML = `
                <div class="ai-error-screen">
                    <div class="ai-error-icon">⚠️</div>
                    <h2>Couldn't Generate Questions</h2>
                    <p>${escapeHtml(error.message || 'There was a problem connecting to the AI service.')}</p>
                    <div class="ai-error-actions">
                        <button id="retry-generate-btn" class="secondary-btn">Try Again</button>
                        <button id="manual-questions-btn" class="primary-btn">Write My Own</button>
                    </div>
                </div>
            `;
        }
    }

    function showReviewGeneratedQuestions(questions) {
        pendingQuestions = questions;

        const container = document.getElementById('drill-content');
        if (!container) return;

        container.innerHTML = `
            <div class="review-generated-screen">
                <h2 style="margin-bottom: 8px;">Review Generated Questions</h2>
                <p class="add-questions-intro">
                    ${questions.length} questions created. Edit or remove any that don't look right.
                </p>

                <div id="generated-questions-list" class="generated-questions-list">
                    ${questions.map((q, i) => renderGeneratedQuestion(q, i)).join('')}
                </div>

                <button id="add-custom-question-btn" class="add-question-btn">+ Add Custom Question</button>

                <div class="add-questions-actions">
                    <button id="skip-questions-btn" class="secondary-btn">Cancel</button>
                    <button id="save-generated-btn" class="primary-btn">Save All Questions</button>
                </div>
            </div>
        `;
    }

    function renderGeneratedQuestion(question, index) {
        const typeLabel = question.type === 'numeric' ? 'Numeric' : 'Conceptual';
        const levelLabel = `Level ${question.level || 1}`;

        let answerInfo = '';
        if (question.type === 'numeric' && question.validation) {
            answerInfo = `<div class="generated-q-answer">Answer: ${question.validation.expected}${question.validation.tolerance > 0 ? ` (±${question.validation.tolerance})` : ''}</div>`;
        }

        return `
            <div class="generated-question-card" data-index="${index}">
                <div class="generated-q-header">
                    <span class="generated-q-badge">${levelLabel} - ${typeLabel}</span>
                    <div class="generated-q-actions">
                        <button class="edit-generated-btn" data-index="${index}">✎</button>
                        <button class="remove-generated-btn" data-index="${index}">×</button>
                    </div>
                </div>
                <div class="generated-q-text">${escapeHtml(question.question)}</div>
                ${answerInfo}
            </div>
        `;
    }

    function removeGeneratedQuestion(index) {
        pendingQuestions.splice(index, 1);

        if (pendingQuestions.length === 0) {
            showQuestionCreationChoice();
        } else {
            showReviewGeneratedQuestions(pendingQuestions);
        }
    }

    function saveGeneratedQuestions() {
        if (pendingQuestions.length === 0) {
            finishReading();
            return;
        }

        // Save to drillQuestions
        const docId = currentReadingDoc?.document?.id;
        if (docId) {
            if (!drillQuestions[docId]) {
                drillQuestions[docId] = [];
            }
            drillQuestions[docId].push(...pendingQuestions);
            saveQuestions();
        }

        pendingQuestions = [];
        finishReading();
    }

    function showAddQuestionsScreen() {
        pendingQuestions = [];

        const container = document.getElementById('drill-content');
        if (!container) return;

        const docTitle = currentReadingDoc?.document?.title || 'this content';

        container.innerHTML = `
            <div class="add-questions-screen">
                <h2 style="margin-bottom: 8px;">Add Review Questions</h2>
                <p class="add-questions-intro">
                    Create questions to test yourself on "${escapeHtml(docTitle)}" later.
                </p>

                <div id="question-forms-container">
                    ${renderQuestionForm(0)}
                </div>

                <button id="add-question-btn" class="add-question-btn">+ Add Another Question</button>

                <div class="add-questions-actions">
                    <button id="skip-questions-btn" class="secondary-btn">Skip for Now</button>
                    <button id="save-questions-btn" class="primary-btn">Save & Continue</button>
                </div>
            </div>
        `;

        // Set up type handlers for initial form
        setupQuestionTypeHandlers();
    }

    function renderQuestionForm(index) {
        return `
            <div class="question-form" data-index="${index}">
                <div class="question-form-header">
                    <span class="question-form-title">Question ${index + 1}</span>
                    ${index > 0 ? '<button class="question-form-remove">×</button>' : ''}
                </div>

                <div class="question-form-field">
                    <textarea class="textarea-field question-text" placeholder="Enter your question..." rows="2"></textarea>
                </div>

                <div class="question-form-field">
                    <label class="question-form-label">Type</label>
                    <select class="question-type-select">
                        <option value="self_grade">Self-Grade</option>
                        <option value="numeric">Numeric</option>
                        <option value="multiple_choice">Multiple Choice</option>
                    </select>
                </div>

                <div class="question-form-field self-grade-fields">
                    <label class="question-form-label">Model Answer</label>
                    <textarea class="textarea-field model-answer" placeholder="The answer you'll compare against..." rows="3"></textarea>
                </div>

                <div class="question-form-field numeric-fields hidden">
                    <div class="question-form-row">
                        <div class="question-form-field">
                            <label class="question-form-label">Expected Answer</label>
                            <input type="number" class="input-field expected-answer" placeholder="e.g., 42">
                        </div>
                        <div class="question-form-field">
                            <label class="question-form-label">Tolerance (±)</label>
                            <input type="number" class="input-field tolerance" placeholder="0" value="0">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function addQuestionForm() {
        const container = document.getElementById('question-forms-container');
        if (!container) return;

        const forms = container.querySelectorAll('.question-form');
        const newIndex = forms.length;

        container.insertAdjacentHTML('beforeend', renderQuestionForm(newIndex));

        // Add type change handler
        setupQuestionTypeHandlers();
    }

    function setupQuestionTypeHandlers() {
        document.querySelectorAll('.question-type-select').forEach(select => {
            select.addEventListener('change', function() {
                const form = this.closest('.question-form');
                const selfGradeFields = form.querySelector('.self-grade-fields');
                const numericFields = form.querySelector('.numeric-fields');

                if (this.value === 'self_grade') {
                    selfGradeFields.classList.remove('hidden');
                    numericFields.classList.add('hidden');
                } else if (this.value === 'numeric') {
                    selfGradeFields.classList.add('hidden');
                    numericFields.classList.remove('hidden');
                } else {
                    selfGradeFields.classList.add('hidden');
                    numericFields.classList.add('hidden');
                }
            });
        });
    }

    function saveNewQuestions() {
        if (!currentReadingDoc) {
            finishReading();
            return;
        }

        const docId = currentReadingDoc.documentId;
        const forms = document.querySelectorAll('.question-form');
        const newQuestions = [];

        forms.forEach((form, index) => {
            const questionText = form.querySelector('.question-text')?.value?.trim();
            const type = form.querySelector('.question-type-select')?.value;

            if (!questionText) return;

            let question;

            if (type === 'numeric') {
                const expected = parseFloat(form.querySelector('.expected-answer')?.value);
                const tolerance = parseFloat(form.querySelector('.tolerance')?.value) || 0;

                if (!isNaN(expected)) {
                    question = QuestionValidator.createNumericQuestion(questionText, expected, tolerance, index + 1);
                }
            } else if (type === 'self_grade') {
                const modelAnswer = form.querySelector('.model-answer')?.value?.trim();
                question = QuestionValidator.createSelfGradeQuestion(questionText, modelAnswer || '', index + 1);
            }

            if (question) {
                newQuestions.push(question);
            }
        });

        // Save questions
        if (!questions[docId]) {
            questions[docId] = [];
        }
        questions[docId] = questions[docId].concat(newQuestions);

        saveData();
        finishReading();
    }

    function finishReading() {
        currentReadingDoc = null;
        showSessionComplete();
    }

    // ==========================================
    // SESSION COMPLETE
    // ==========================================

    function showSessionComplete() {
        const container = document.getElementById('drill-content');
        if (!container) return;

        const correctCount = sessionState.results.filter(r => r.correct).length;
        const totalCount = sessionState.results.length;
        const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
        const timeMinutes = Math.round((Date.now() - sessionState.startTime) / 60000);

        // Update mastery count
        drillData.stats.itemsMastered = SpacedRepetition.countMastered(drillData.contentTracking);
        saveData();

        // Get tomorrow's preview
        const nextSession = buildSession();
        const nextReviewCount = nextSession.overdueCount || 0;
        const nextReading = drillData.readingQueue.length > 0 ? findDocument(drillData.readingQueue[0], getLibraryData())?.title : null;

        container.innerHTML = `
            <div class="session-complete">
                <div class="session-complete-icon">🎯</div>
                <h2 class="session-complete-title">Session Complete!</h2>

                <div class="session-summary">
                    <div class="session-summary-row">
                        <span class="session-summary-label">Reviewed</span>
                        <span class="session-summary-value">${totalCount} items</span>
                    </div>
                    <div class="session-summary-row">
                        <span class="session-summary-label">Accuracy</span>
                        <span class="session-summary-value">${accuracy}% (${correctCount}/${totalCount})</span>
                    </div>
                    ${currentSession.newReading ? `
                    <div class="session-summary-row">
                        <span class="session-summary-label">New reading</span>
                        <span class="session-summary-value">1 section</span>
                    </div>
                    ` : ''}
                    <div class="session-summary-row">
                        <span class="session-summary-label">Time</span>
                        <span class="session-summary-value">${timeMinutes} min</span>
                    </div>
                </div>

                <div class="session-streak">🔥 ${drillData.stats.currentStreak} day streak!</div>

                <div class="session-tomorrow">
                    <div class="session-tomorrow-title">Tomorrow</div>
                    <div class="session-tomorrow-item">📝 ${nextReviewCount} reviews due</div>
                    ${nextReading ? `<div class="session-tomorrow-item">📖 Next: "${escapeHtml(nextReading.substring(0, 30))}..."</div>` : ''}
                </div>

                <div class="session-complete-actions">
                    <button id="drill-done-btn" class="primary-btn">Done</button>
                    <button id="drill-continue-btn" class="secondary-btn">Keep Practicing</button>
                </div>
            </div>
        `;
    }

    function continueSession() {
        // Build a new session for extra practice
        currentSession = buildSession();

        if (currentSession.reviews.length === 0 && !currentSession.newReading) {
            // Nothing to practice
            showDrillHome();
        } else {
            sessionState = {
                currentIndex: 0,
                results: [],
                startTime: Date.now(),
                currentQuestion: null,
                userAnswer: '',
                confidence: 'somewhat',
                showingResult: false,
                showingComparison: false
            };
            showNextItem();
        }
    }

    // ==========================================
    // SETTINGS
    // ==========================================

    function showDrillSettings() {
        const modal = document.getElementById('drill-settings-modal');
        if (!modal) return;

        // Populate current values
        document.querySelectorAll('.session-length-option').forEach(opt => {
            opt.classList.toggle('selected', parseInt(opt.dataset.value) === drillData.settings.sessionMinutes);
        });

        const slider = document.getElementById('max-reviews-slider');
        const sliderValue = document.getElementById('max-reviews-value');
        if (slider) slider.value = drillData.settings.maxReviewsPerSession;
        if (sliderValue) sliderValue.textContent = drillData.settings.maxReviewsPerSession;

        const focusCheckbox = document.getElementById('focus-mode-checkbox');
        if (focusCheckbox) focusCheckbox.checked = drillData.settings.focusMode;

        const queueModeManual = document.getElementById('queue-mode-manual');
        const queueModeAuto = document.getElementById('queue-mode-auto');
        if (queueModeManual) queueModeManual.checked = drillData.queueMode === 'manual';
        if (queueModeAuto) queueModeAuto.checked = drillData.queueMode === 'auto';

        // Load AI settings
        loadAiSettingsIntoUI();

        // Clear any previous API status
        const statusEl = document.getElementById('api-status');
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'api-status';
        }

        modal.classList.remove('hidden');
    }

    function closeDrillSettings() {
        const modal = document.getElementById('drill-settings-modal');
        if (modal) modal.classList.add('hidden');
    }

    function saveDrillSettings() {
        const selectedLength = document.querySelector('.session-length-option.selected');
        if (selectedLength) {
            drillData.settings.sessionMinutes = parseInt(selectedLength.dataset.value);
        }

        const slider = document.getElementById('max-reviews-slider');
        if (slider) {
            drillData.settings.maxReviewsPerSession = parseInt(slider.value);
        }

        const focusCheckbox = document.getElementById('focus-mode-checkbox');
        if (focusCheckbox) {
            drillData.settings.focusMode = focusCheckbox.checked;
        }

        const queueModeManual = document.getElementById('queue-mode-manual');
        if (queueModeManual) {
            drillData.queueMode = queueModeManual.checked ? 'manual' : 'auto';
        }

        // Save API key if changed
        const apiKeyInput = document.getElementById('api-key-input');
        if (apiKeyInput && apiKeyInput.value.trim()) {
            CONFIG.setApiKey(apiKeyInput.value.trim());
        }

        // Save AI feature settings
        const aiAutoGenerate = document.getElementById('ai-auto-generate');
        const aiSmartGrading = document.getElementById('ai-smart-grading');

        if (aiAutoGenerate && aiSmartGrading) {
            CONFIG.setAiSettings({
                useAiFeatures: true,
                autoGenerateQuestions: aiAutoGenerate.checked,
                llmGrading: aiSmartGrading.checked
            });
        }

        saveData();
        closeDrillSettings();
        renderDrillHome();
    }

    function loadAiSettingsIntoUI() {
        // Load API key (masked)
        const apiKeyInput = document.getElementById('api-key-input');
        if (apiKeyInput && CONFIG.hasApiKey()) {
            apiKeyInput.value = CONFIG.getApiKey();
        }

        // Load AI feature toggles
        const aiSettings = CONFIG.getAiSettings();
        const aiAutoGenerate = document.getElementById('ai-auto-generate');
        const aiSmartGrading = document.getElementById('ai-smart-grading');

        if (aiAutoGenerate) {
            aiAutoGenerate.checked = aiSettings.autoGenerateQuestions;
        }
        if (aiSmartGrading) {
            aiSmartGrading.checked = aiSettings.llmGrading;
        }
    }

    async function testApiConnection() {
        const statusEl = document.getElementById('api-status');
        const testBtn = document.getElementById('test-api-btn');
        const apiKeyInput = document.getElementById('api-key-input');

        if (!statusEl || !testBtn || !apiKeyInput) return;

        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            statusEl.textContent = 'Enter an API key first';
            statusEl.className = 'api-status error';
            return;
        }

        // Temporarily save the key to test
        const oldKey = CONFIG.getApiKey();
        CONFIG.setApiKey(apiKey);

        testBtn.disabled = true;
        testBtn.textContent = 'Testing...';
        statusEl.textContent = '';
        statusEl.className = 'api-status';

        try {
            await ApiClient.testConnection();
            statusEl.textContent = 'Connected!';
            statusEl.className = 'api-status success';
        } catch (error) {
            statusEl.textContent = error.message || 'Connection failed';
            statusEl.className = 'api-status error';
            // Restore old key on failure
            if (oldKey) {
                CONFIG.setApiKey(oldKey);
            } else {
                CONFIG.setApiKey(null);
            }
        } finally {
            testBtn.disabled = false;
            testBtn.textContent = 'Test Connection';
        }
    }

    // ==========================================
    // QUEUE MANAGEMENT
    // ==========================================

    function showQueueManager() {
        const modal = document.getElementById('queue-modal');
        if (!modal) return;

        renderQueueList();
        modal.classList.remove('hidden');
    }

    function closeQueueManager() {
        const modal = document.getElementById('queue-modal');
        if (modal) modal.classList.add('hidden');
    }

    function renderQueueList() {
        const container = document.getElementById('queue-list');
        if (!container) return;

        const library = getLibraryData();

        if (drillData.readingQueue.length === 0) {
            container.innerHTML = '<div class="queue-empty">No items in queue</div>';
            return;
        }

        let html = '';
        drillData.readingQueue.forEach(docId => {
            const doc = findDocument(docId, library);
            const folder = getDocumentFolder(docId, library);

            if (doc) {
                html += `
                    <div class="queue-item" data-doc-id="${docId}">
                        <span class="queue-item-drag">≡</span>
                        <div class="queue-item-content">
                            <div class="queue-item-title">${escapeHtml(doc.title.substring(0, 40))}...</div>
                            <div class="queue-item-folder">📁 ${folder || 'Unknown'}</div>
                        </div>
                        <button class="queue-item-remove">×</button>
                    </div>
                `;
            }
        });

        container.innerHTML = html;
    }

    function removeFromQueue(docId) {
        drillData.readingQueue = drillData.readingQueue.filter(id => id !== docId);
        saveData();
        renderQueueList();
    }

    function addToQueue(docId) {
        if (!drillData.readingQueue.includes(docId)) {
            drillData.readingQueue.push(docId);
            saveData();
        }
    }

    function showAddToQueueModal() {
        const library = getLibraryData();
        if (!library) return;

        // Get all content not already in queue
        const available = [];
        for (const folder of library.folders) {
            for (const item of (folder.items || [])) {
                if (!drillData.readingQueue.includes(item.id)) {
                    available.push({
                        id: item.id,
                        title: item.title,
                        folder: folder.name
                    });
                }
            }
        }

        if (available.length === 0) {
            alert('All library items are already in your queue!');
            return;
        }

        // Build modal content
        const modal = document.getElementById('queue-modal');
        const queueList = document.getElementById('queue-list');

        if (!queueList) return;

        queueList.innerHTML = `
            <div class="add-to-queue-list">
                <div class="add-queue-header">Select items to add:</div>
                ${available.map(item => `
                    <div class="add-queue-item" data-doc-id="${item.id}">
                        <div class="add-queue-item-content">
                            <div class="add-queue-item-title">${escapeHtml(item.title.substring(0, 40))}${item.title.length > 40 ? '...' : ''}</div>
                            <div class="add-queue-item-folder">📁 ${escapeHtml(item.folder)}</div>
                        </div>
                        <button class="add-queue-item-btn">+ Add</button>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click handlers
        queueList.querySelectorAll('.add-queue-item-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemEl = btn.closest('.add-queue-item');
                const docId = itemEl.dataset.docId;
                addToQueue(docId);
                itemEl.remove();

                // If no more items, show message
                const remaining = queueList.querySelectorAll('.add-queue-item');
                if (remaining.length === 0) {
                    queueList.innerHTML = '<div class="queue-empty">All items added!</div>';
                    setTimeout(() => {
                        closeQueueManager();
                        showQueueManager();
                    }, 500);
                }
            });
        });
    }

    // ==========================================
    // HELPERS
    // ==========================================

    function getLibraryData() {
        try {
            const saved = localStorage.getItem('brainTrainerLibrary');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    }

    function findDocument(docId, library) {
        if (!library || !library.folders) return null;

        for (const folder of library.folders) {
            const item = folder.items?.find(i => i.id === docId);
            if (item) return item;
        }
        return null;
    }

    function getDocumentFolder(docId, library) {
        if (!library || !library.folders) return null;

        for (const folder of library.folders) {
            const item = folder.items?.find(i => i.id === docId);
            if (item) return folder.name;
        }
        return null;
    }

    function cleanupOrphanedData() {
        const library = getLibraryData();
        if (!library) return;

        // Remove tracking for deleted documents
        const validIds = new Set();
        library.folders.forEach(folder => {
            folder.items?.forEach(item => validIds.add(item.id));
        });

        let changed = false;

        // Clean contentTracking
        for (const docId of Object.keys(drillData.contentTracking)) {
            if (!validIds.has(docId)) {
                delete drillData.contentTracking[docId];
                changed = true;
            }
        }

        // Clean questions
        for (const docId of Object.keys(questions)) {
            if (!validIds.has(docId)) {
                delete questions[docId];
                changed = true;
            }
        }

        // Clean queue
        const originalLength = drillData.readingQueue.length;
        drillData.readingQueue = drillData.readingQueue.filter(id => validIds.has(id));
        if (drillData.readingQueue.length !== originalLength) {
            changed = true;
        }

        if (changed) {
            saveData();
        }
    }

    function getNextReviewDate() {
        let earliest = null;

        for (const item of Object.values(drillData.contentTracking)) {
            if (item.nextReviewDue && item.status === 'reviewing') {
                const date = new Date(item.nextReviewDue);
                if (!earliest || date < earliest) {
                    earliest = date;
                }
            }
        }

        if (!earliest) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const reviewDate = new Date(earliest);
        reviewDate.setHours(0, 0, 0, 0);

        const diffDays = Math.ceil((reviewDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        return `In ${diffDays} days`;
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==========================================
    // EXTERNAL API
    // ==========================================

    // Called from Library when content is added
    function onContentAdded(docId) {
        // Add to reading queue if not already tracked
        if (!drillData.contentTracking[docId]) {
            drillData.contentTracking[docId] = SpacedRepetition.initializeTracking(docId);
        }

        if (drillData.contentTracking[docId].status === 'unread' && !drillData.readingQueue.includes(docId)) {
            drillData.readingQueue.push(docId);
        }

        saveData();
    }

    // Check if document has questions
    function hasQuestions(docId) {
        return questions[docId] && questions[docId].length > 0;
    }

    // Get tracking status
    function getTrackingStatus(docId) {
        return drillData.contentTracking[docId]?.status || 'unread';
    }

    // ==========================================
    // INIT
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export
    window.DailyDrill = {
        showDrillHome,
        hideDrill,
        onContentAdded,
        addToQueue,
        hasQuestions,
        getTrackingStatus
    };

})();
