// Spaced Repetition Algorithm - Brain Trainer Daily Drill
// Based on SM-2 algorithm with confidence adjustments

(function() {
    'use strict';

    /**
     * Update item tracking after a quiz attempt
     * @param {Object} item - Content tracking item
     * @param {boolean} wasCorrect - Whether answer was correct
     * @param {boolean} wasPartial - Whether answer was partially correct
     * @param {string} confidence - 'guessing' | 'somewhat' | 'confident'
     * @returns {Object} Updated item
     */
    function updateAfterQuiz(item, wasCorrect, wasPartial, confidence) {
        // Initialize if needed
        if (!item.quizHistory) item.quizHistory = [];
        if (!item.intervalDays) item.intervalDays = 1;
        if (!item.easeFactor) item.easeFactor = 2.0;
        if (!item.difficultyLevel) item.difficultyLevel = 1;

        // Record in history
        item.quizHistory.push({
            date: new Date().toISOString(),
            correct: wasCorrect,
            partial: wasPartial || false,
            confidence: confidence
        });

        if (wasCorrect && !wasPartial) {
            // Full correct - grow interval
            item.intervalDays = Math.round(item.intervalDays * item.easeFactor);

            // Adjust ease based on confidence
            if (confidence === 'confident') {
                item.easeFactor = Math.min(2.5, item.easeFactor + 0.1);
            } else if (confidence === 'guessing') {
                // Lucky guess - smaller boost
                item.easeFactor = Math.min(2.5, item.easeFactor + 0.05);
            }

            // Progress difficulty level
            item.difficultyLevel = Math.min(5, item.difficultyLevel + 1);

        } else if (wasCorrect && wasPartial) {
            // Partial - don't grow interval, small ease adjustment
            item.easeFactor = Math.max(1.3, item.easeFactor - 0.05);

        } else {
            // Wrong - reset interval
            item.intervalDays = 1;
            item.easeFactor = Math.max(1.3, item.easeFactor - 0.2);

            // Extra penalty if overconfident
            if (confidence === 'confident') {
                item.easeFactor = Math.max(1.3, item.easeFactor - 0.1);
            }
        }

        // Calculate next review date
        item.nextReviewDue = addDays(new Date(), item.intervalDays).toISOString();
        item.lastQuizzed = new Date().toISOString();

        // Check for mastery (60+ day interval with good ease)
        if (item.intervalDays >= 60 && item.easeFactor >= 2.0) {
            item.status = 'mastered';
        }

        // Check for needs re-reading (3 consecutive failures)
        const lastThree = item.quizHistory.slice(-3);
        if (lastThree.length === 3 && lastThree.every(q => !q.correct)) {
            item.status = 'unread';
            item.difficultyLevel = 1;
            item.intervalDays = 1;
            item.easeFactor = 2.0;
            item.needsReread = true;
        }

        return item;
    }

    /**
     * Add days to a date
     */
    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    /**
     * Check if item is overdue for review
     */
    function isOverdue(item) {
        if (!item.nextReviewDue) return false;
        return new Date(item.nextReviewDue) <= new Date();
    }

    /**
     * Get number of days overdue
     */
    function getDaysOverdue(item) {
        if (!item.nextReviewDue) return 0;
        const diff = new Date() - new Date(item.nextReviewDue);
        return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    }

    /**
     * Get days until next review
     */
    function getDaysUntilReview(item) {
        if (!item.nextReviewDue) return null;
        const diff = new Date(item.nextReviewDue) - new Date();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    /**
     * Initialize tracking for a new document
     */
    function initializeTracking(documentId) {
        return {
            status: 'unread',
            dateRead: null,
            lastQuizzed: null,
            nextReviewDue: null,
            intervalDays: 1,
            easeFactor: 2.0,
            difficultyLevel: 1,
            quizHistory: []
        };
    }

    /**
     * Mark document as read and start review cycle
     */
    function markAsRead(item) {
        item.status = 'reviewing';
        item.dateRead = new Date().toISOString();
        item.nextReviewDue = addDays(new Date(), 1).toISOString(); // First review tomorrow
        item.intervalDays = 1;
        return item;
    }

    /**
     * Update streak stats after completing a session
     */
    function updateStreak(stats) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let lastSession = null;
        if (stats.lastSessionDate) {
            lastSession = new Date(stats.lastSessionDate);
            lastSession.setHours(0, 0, 0, 0);
        }

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (!lastSession) {
            // First session ever
            stats.currentStreak = 1;
        } else if (lastSession.getTime() === today.getTime()) {
            // Already did session today - no change
            return stats;
        } else if (lastSession.getTime() === yesterday.getTime()) {
            // Consecutive day - increment
            stats.currentStreak += 1;
        } else {
            // Missed a day - reset
            stats.currentStreak = 1;
        }

        stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
        stats.lastSessionDate = new Date().toISOString();
        stats.totalSessions += 1;

        return stats;
    }

    /**
     * Count mastered items
     */
    function countMastered(contentTracking) {
        return Object.values(contentTracking).filter(item => item.status === 'mastered').length;
    }

    // Export
    window.SpacedRepetition = {
        updateAfterQuiz,
        addDays,
        isOverdue,
        getDaysOverdue,
        getDaysUntilReview,
        initializeTracking,
        markAsRead,
        updateStreak,
        countMastered
    };

})();
