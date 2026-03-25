// Performance Tracking Module - Brain Trainer
// Tracks accuracy, trends, and adaptive question weighting

(function() {
    'use strict';

    // ==========================================
    // CONSTANTS
    // ==========================================

    const STORAGE_KEY = 'brain_trainer_performance';
    const MAX_HISTORY_DAYS = 90;

    // Category display names
    const CATEGORY_NAMES = {
        mentalmath: 'Mental Math',
        probability: 'Probability',
        tvm: 'Time Value of Money',
        gametheory: 'Game Theory',
        poker_gto: 'Poker GTO',
        stats: 'Statistics',
        combinatorics: 'Combinatorics',
        distressedcredit: 'Distressed Credit'
    };

    // Subcategory display names
    const SUBCATEGORY_NAMES = {
        // Probability
        basic_probability: 'Basic Probability',
        expected_value: 'Expected Value',
        pot_odds: 'Pot Odds',
        bayes: 'Bayesian Reasoning',
        independent_events: 'Independent Events',
        poker_hands: 'Poker Hands',

        // TVM
        simple_interest: 'Simple Interest',
        future_value: 'Future Value',
        present_value: 'Present Value',
        rule_of_72: 'Rule of 72',
        npv: 'NPV',
        perpetuity: 'Perpetuity',
        real_vs_nominal: 'Real vs Nominal',

        // Game Theory
        nash_equilibrium: 'Nash Equilibrium',
        bluff_frequency: 'Bluff Frequency',
        mdf: 'Minimum Defense',
        kelly_criterion: 'Kelly Criterion',
        auction_strategy: 'Auction Strategy',
        zero_sum: 'Zero-Sum Games',

        // Stats
        mean_median: 'Mean & Median',
        standard_deviation: 'Standard Deviation',
        weighted_average: 'Weighted Average',
        weighted_return: 'Portfolio Returns',
        altman_zscore: 'Altman Z-Score',
        regression_mean: 'Regression to Mean',
        outs_equity: 'Outs to Equity',
        base_rate: 'Base Rate',

        // Distressed Credit
        dscr: 'DSCR',
        leverage_stress: 'Leverage Stress',
        interest_coverage: 'Interest Coverage',
        bond_yield: 'Bond Yield',
        cash_on_cash: 'Cash-on-Cash',
        lbo_moic: 'LBO MOIC',

        // Poker GTO
        preflop_position: 'Preflop Position',
        three_bet_decision: '3-Bet Decision',
        bluff_frequency_poker: 'Bluff Frequency',
        mdf_calculation: 'MDF Calculation',
        pot_odds_equity: 'Pot Odds & Equity',
        blocker_identification: 'Blocker ID',
        range_advantage: 'Range Advantage',
        bvb_strategy: 'BvB Strategy',
        thin_value: 'Thin Value',
        stack_depth: 'Stack Depth',
        small_bet_defense: 'Small Bet Defense',

        // Mental Math
        multiplication: 'Multiplication',
        division: 'Division',
        percentage: 'Percentages',
        basis_points: 'Basis Points',
        percentage_change: 'Percentage Change',
        multiples: 'Multiples',
        margin: 'Margin',
        dilution: 'Dilution',
        irr_approximation: 'IRR Approximation',

        // Combinatorics
        factorial: 'Factorial',
        combinations: 'Combinations',
        permutations: 'Permutations',
        counting: 'Counting'
    };

    // ==========================================
    // STATE
    // ==========================================

    let performanceData = null;
    let questionStartTime = null;
    let currentSessionDate = null;
    let shownMilestones = new Set();

    // ==========================================
    // INITIALIZATION
    // ==========================================

    function init() {
        loadPerformanceData();
        pruneOldData();
        loadShownMilestones();
    }

    function loadPerformanceData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                performanceData = JSON.parse(saved);
                // Ensure structure is valid
                if (!performanceData.sessions) {
                    performanceData = { sessions: [] };
                }
            } else {
                performanceData = { sessions: [] };
            }
        } catch (e) {
            console.error('Error loading performance data:', e);
            performanceData = { sessions: [] };
        }
    }

    function savePerformanceData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(performanceData));
        } catch (e) {
            console.error('Error saving performance data:', e);
        }
    }

    function loadShownMilestones() {
        try {
            const saved = localStorage.getItem('brain_trainer_milestones');
            if (saved) {
                shownMilestones = new Set(JSON.parse(saved));
            }
        } catch (e) {
            shownMilestones = new Set();
        }
    }

    function saveShownMilestones() {
        try {
            localStorage.setItem('brain_trainer_milestones', JSON.stringify([...shownMilestones]));
        } catch (e) {
            console.error('Error saving milestones:', e);
        }
    }

    function pruneOldData() {
        if (!performanceData.sessions) return;

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);
        const cutoffStr = cutoffDate.toISOString().split('T')[0];

        performanceData.sessions = performanceData.sessions.filter(s => s.date >= cutoffStr);
        savePerformanceData();
    }

    // ==========================================
    // QUESTION TRACKING
    // ==========================================

    function startQuestionTimer() {
        questionStartTime = Date.now();
    }

    function recordAnswer(category, subcategory, correct) {
        const timeSpent = questionStartTime ? Math.round((Date.now() - questionStartTime) / 1000) : 0;
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];

        // Find or create today's session
        let session = performanceData.sessions.find(s => s.date === dateStr);
        if (!session) {
            session = { date: dateStr, questions: [] };
            performanceData.sessions.push(session);
        }

        session.questions.push({
            category: category,
            subcategory: subcategory || 'general',
            correct: correct,
            timeSpentSeconds: timeSpent,
            timestamp: now.toISOString()
        });

        currentSessionDate = dateStr;
        savePerformanceData();

        // Check for milestones
        checkMilestones();

        return timeSpent;
    }

    // ==========================================
    // STATISTICS CALCULATIONS
    // ==========================================

    function getTotalQuestions() {
        let total = 0;
        for (const session of performanceData.sessions) {
            total += session.questions.length;
        }
        return total;
    }

    function getOverallAccuracy() {
        let correct = 0;
        let total = 0;
        for (const session of performanceData.sessions) {
            for (const q of session.questions) {
                total++;
                if (q.correct) correct++;
            }
        }
        return total === 0 ? null : Math.round((correct / total) * 100);
    }

    function getSessionStreak() {
        if (performanceData.sessions.length === 0) return 0;

        // Sort sessions by date descending
        const sorted = [...performanceData.sessions].sort((a, b) => b.date.localeCompare(a.date));

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // Check if most recent session is today or yesterday
        if (sorted[0].date !== today && sorted[0].date !== yesterday) {
            return 0; // Streak broken
        }

        let streak = 0;
        let expectedDate = new Date(sorted[0].date);

        for (const session of sorted) {
            const sessionDate = new Date(session.date);
            const diffDays = Math.round((expectedDate - sessionDate) / 86400000);

            if (diffDays === 0) {
                streak++;
                expectedDate.setDate(expectedDate.getDate() - 1);
            } else if (diffDays === 1) {
                // Gap of one day - continue checking
                expectedDate = new Date(session.date);
                streak++;
                expectedDate.setDate(expectedDate.getDate() - 1);
            } else {
                break; // Streak broken
            }
        }

        return streak;
    }

    function getCategoryStats(days = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const cutoffStr = cutoffDate.toISOString().split('T')[0];

        const stats = {};

        for (const session of performanceData.sessions) {
            if (session.date < cutoffStr) continue;

            for (const q of session.questions) {
                if (!stats[q.category]) {
                    stats[q.category] = {
                        correct: 0,
                        total: 0,
                        lastAttempt: session.date,
                        subcategories: {}
                    };
                }

                stats[q.category].total++;
                if (q.correct) stats[q.category].correct++;
                if (session.date > stats[q.category].lastAttempt) {
                    stats[q.category].lastAttempt = session.date;
                }

                // Track subcategory stats
                const sub = q.subcategory || 'general';
                if (!stats[q.category].subcategories[sub]) {
                    stats[q.category].subcategories[sub] = { correct: 0, total: 0 };
                }
                stats[q.category].subcategories[sub].total++;
                if (q.correct) stats[q.category].subcategories[sub].correct++;
            }
        }

        // Calculate accuracy percentages
        for (const cat in stats) {
            stats[cat].accuracy = stats[cat].total > 0
                ? Math.round((stats[cat].correct / stats[cat].total) * 100)
                : null;

            for (const sub in stats[cat].subcategories) {
                const subStats = stats[cat].subcategories[sub];
                subStats.accuracy = subStats.total > 0
                    ? Math.round((subStats.correct / subStats.total) * 100)
                    : null;
            }
        }

        return stats;
    }

    function getWeakestCategory(minAttempts = 5, days = 14) {
        const stats = getCategoryStats(days);
        let weakest = null;
        let weakestAccuracy = 101;

        for (const cat in stats) {
            if (stats[cat].total >= minAttempts && stats[cat].accuracy < weakestAccuracy) {
                weakest = cat;
                weakestAccuracy = stats[cat].accuracy;
            }
        }

        if (!weakest) return null;

        // Find weakest subcategory
        let weakestSub = null;
        let weakestSubAccuracy = 101;
        for (const sub in stats[weakest].subcategories) {
            const subStats = stats[weakest].subcategories[sub];
            if (subStats.total >= 2 && subStats.accuracy < weakestSubAccuracy) {
                weakestSub = sub;
                weakestSubAccuracy = subStats.accuracy;
            }
        }

        return {
            category: weakest,
            categoryName: CATEGORY_NAMES[weakest] || weakest,
            accuracy: stats[weakest].accuracy,
            subcategory: weakestSub,
            subcategoryName: SUBCATEGORY_NAMES[weakestSub] || weakestSub,
            subcategoryAccuracy: weakestSubAccuracy < 101 ? weakestSubAccuracy : null
        };
    }

    function getLast7DaysData() {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const session = performanceData.sessions.find(s => s.date === dateStr);

            if (session && session.questions.length > 0) {
                const correct = session.questions.filter(q => q.correct).length;
                const total = session.questions.length;
                const accuracy = Math.round((correct / total) * 100);

                data.push({
                    day: dayName,
                    date: dateStr,
                    count: total,
                    accuracy: accuracy
                });
            } else {
                data.push({
                    day: dayName,
                    date: dateStr,
                    count: 0,
                    accuracy: null
                });
            }
        }

        return data;
    }

    // ==========================================
    // ADAPTIVE WEIGHTING
    // ==========================================

    function getCategoryWeights() {
        const stats = getCategoryStats(30);
        const weights = {};
        const allCategories = Object.keys(CATEGORY_NAMES);

        // Check if category is "new" (added in last 30 days - approximate)
        const newCategories = ['distressedcredit', 'poker_gto'];

        for (const cat of allCategories) {
            if (!stats[cat]) {
                // No data yet
                if (newCategories.includes(cat)) {
                    weights[cat] = 2.0; // New categories get 2x
                } else {
                    weights[cat] = 1.5; // Unknown, slightly prioritized
                }
            } else {
                const accuracy = stats[cat].accuracy;
                if (accuracy === null) {
                    weights[cat] = 1.5;
                } else if (accuracy < 50) {
                    weights[cat] = 3.0;
                } else if (accuracy < 65) {
                    weights[cat] = 2.0;
                } else if (accuracy < 80) {
                    weights[cat] = 1.5;
                } else {
                    weights[cat] = 1.0;
                }
            }
        }

        return weights;
    }

    function getWeightedRandomCategory() {
        const weights = getCategoryWeights();
        const categories = Object.keys(weights);

        // Build weighted pool
        let totalWeight = 0;
        for (const cat of categories) {
            totalWeight += weights[cat];
        }

        let random = Math.random() * totalWeight;
        for (const cat of categories) {
            random -= weights[cat];
            if (random <= 0) {
                return cat;
            }
        }

        return categories[Math.floor(Math.random() * categories.length)];
    }

    // ==========================================
    // MILESTONES
    // ==========================================

    function checkMilestones() {
        const total = getTotalQuestions();
        const streak = getSessionStreak();
        const stats = getCategoryStats(30);

        // 50 questions milestone
        if (total >= 50 && !shownMilestones.has('50_questions')) {
            showMilestone('50 questions down. Just getting started.');
            shownMilestones.add('50_questions');
            saveShownMilestones();
        }

        // First category at 80%+ (with at least 10 questions)
        if (!shownMilestones.has('category_mastered')) {
            for (const cat in stats) {
                if (stats[cat].total >= 10 && stats[cat].accuracy >= 80) {
                    const catName = CATEGORY_NAMES[cat] || cat;
                    showMilestone(`${catName} mastered. On to the next.`);
                    shownMilestones.add('category_mastered');
                    saveShownMilestones();
                    break;
                }
            }
        }

        // 7-day streak
        if (streak >= 7 && !shownMilestones.has('7_day_streak')) {
            showMilestone('7 days straight. This is becoming a habit.');
            shownMilestones.add('7_day_streak');
            saveShownMilestones();
        }
    }

    function showMilestone(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'milestone-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // DASHBOARD RENDERING
    // ==========================================

    function renderDashboard() {
        const container = document.getElementById('stats-content');
        if (!container) return;

        const totalQuestions = getTotalQuestions();
        const overallAccuracy = getOverallAccuracy();
        const sessionStreak = getSessionStreak();
        const categoryStats = getCategoryStats(30);
        const weakest = getWeakestCategory(5, 14);
        const last7Days = getLast7DaysData();

        let html = '';

        // Section 1: Header Summary
        html += `
            <div class="stats-summary">
                <div class="stat-card">
                    <div class="stat-value">${totalQuestions}</div>
                    <div class="stat-label">Questions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${overallAccuracy !== null ? overallAccuracy + '%' : '--'}</div>
                    <div class="stat-label">Accuracy</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${sessionStreak > 0 ? sessionStreak + ' day' + (sessionStreak > 1 ? 's' : '') : '--'}</div>
                    <div class="stat-label">Streak</div>
                </div>
            </div>
        `;

        // Section 2: Category Accuracy Breakdown
        html += '<div class="stats-section"><h3>Category Breakdown</h3>';

        // Sort categories by accuracy (worst first), then by name if no data
        const sortedCategories = Object.keys(CATEGORY_NAMES).sort((a, b) => {
            const aStats = categoryStats[a];
            const bStats = categoryStats[b];

            if (!aStats && !bStats) return 0;
            if (!aStats) return 1;
            if (!bStats) return -1;

            return (aStats.accuracy || 0) - (bStats.accuracy || 0);
        });

        for (const cat of sortedCategories) {
            const stats = categoryStats[cat];
            const name = CATEGORY_NAMES[cat];

            let accuracy = null;
            let total = 0;
            let daysAgo = null;

            if (stats) {
                accuracy = stats.accuracy;
                total = stats.total;
                const lastDate = new Date(stats.lastAttempt);
                const today = new Date();
                daysAgo = Math.floor((today - lastDate) / 86400000);
            }

            const colorClass = accuracy === null ? 'no-data'
                : accuracy >= 80 ? 'excellent'
                : accuracy >= 60 ? 'good'
                : 'needs-work';

            html += `
                <div class="category-row">
                    <div class="category-info">
                        <div class="category-name">${name}</div>
                        <div class="category-meta">
                            ${total > 0 ? total + ' questions' : 'No attempts'}
                            ${daysAgo !== null ? ' · ' + (daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : daysAgo + ' days ago') : ''}
                        </div>
                    </div>
                    <div class="category-accuracy ${colorClass}">
                        ${accuracy !== null ? accuracy + '%' : 'No data'}
                    </div>
                </div>
                <div class="accuracy-bar">
                    <div class="accuracy-fill ${colorClass}" style="width: ${accuracy || 0}%"></div>
                </div>
            `;
        }

        html += '</div>';

        // Section 3: Weakness Spotlight
        html += '<div class="stats-section focus-section">';
        html += '<h3><span class="focus-icon">+</span> Focus Area</h3>';

        if (weakest) {
            html += `
                <div class="focus-card">
                    <div class="focus-category">${weakest.categoryName}</div>
                    ${weakest.subcategoryName ? `<div class="focus-subcategory">${weakest.subcategoryName} · ${weakest.subcategoryAccuracy}%</div>` : ''}
                    <div class="focus-accuracy">${weakest.accuracy}% accuracy</div>
                    <button class="drill-btn" onclick="Performance.drillCategory('${weakest.category}')">Drill This Now</button>
                </div>
            `;
        } else {
            html += `
                <div class="focus-empty">
                    Complete more sessions to unlock your personalized focus area.
                </div>
            `;
        }

        html += '</div>';

        // Section 4: 7-Day Trend
        html += '<div class="stats-section">';
        html += '<h3>Last 7 Days</h3>';
        html += '<div class="trend-chart">';

        const maxCount = Math.max(...last7Days.map(d => d.count), 1);

        for (const day of last7Days) {
            const height = day.count > 0 ? Math.max(15, (day.count / maxCount) * 100) : 0;
            const colorClass = day.accuracy === null ? 'empty'
                : day.accuracy >= 80 ? 'excellent'
                : day.accuracy >= 60 ? 'good'
                : 'needs-work';

            html += `
                <div class="trend-day">
                    <div class="trend-bar-container">
                        <div class="trend-bar ${colorClass}" style="height: ${height}%">
                            ${day.count > 0 ? `<span class="trend-count">${day.count}</span>` : ''}
                        </div>
                    </div>
                    <div class="trend-label">${day.day}</div>
                </div>
            `;
        }

        html += '</div></div>';

        container.innerHTML = html;
    }

    function drillCategory(category) {
        // Switch to Train mode
        const trainBtn = document.querySelector('[data-mode="train"]');
        if (trainBtn) trainBtn.click();

        // Set category filter
        setTimeout(() => {
            const pill = document.querySelector(`[data-category="${category}"]`);
            if (pill) pill.click();
        }, 100);
    }

    // ==========================================
    // PUBLIC API
    // ==========================================

    window.Performance = {
        init,
        startQuestionTimer,
        recordAnswer,
        getTotalQuestions,
        getOverallAccuracy,
        getSessionStreak,
        getCategoryStats,
        getWeakestCategory,
        getCategoryWeights,
        getWeightedRandomCategory,
        renderDashboard,
        drillCategory,
        SUBCATEGORY_NAMES
    };

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
