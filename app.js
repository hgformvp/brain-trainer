// Brain Trainer App Logic

(function() {
    'use strict';

    // State
    let currentQuestion = null;
    let currentCategory = 'all';
    let stats = {
        correct: 0,
        total: 0,
        streak: 0,
        maxStreak: 0
    };

    // DOM Elements
    const elements = {
        questionText: document.getElementById('question-text'),
        categoryBadge: document.getElementById('category-badge'),
        answerSection: document.getElementById('answer-section'),
        answerInput: document.getElementById('answer-input'),
        submitBtn: document.getElementById('submit-btn'),
        choicesSection: document.getElementById('choices-section'),
        choiceBtns: document.querySelectorAll('.choice-btn'),
        resultSection: document.getElementById('result-section'),
        resultIcon: document.getElementById('result-icon'),
        resultText: document.getElementById('result-text'),
        explanation: document.getElementById('explanation'),
        nextBtn: document.getElementById('next-btn'),
        skipBtn: document.getElementById('skip-btn'),
        streakCount: document.getElementById('streak-count'),
        correctCount: document.getElementById('correct-count'),
        totalCount: document.getElementById('total-count'),
        pills: document.querySelectorAll('.pill')
    };

    // Category display names
    const categoryNames = {
        mentalmath: 'Mental Math',
        probability: 'Probability',
        tvm: 'Time Value',
        gametheory: 'Game Theory',
        stats: 'Statistics',
        combinatorics: 'Combinatorics'
    };

    // Initialize
    function init() {
        loadStats();
        setupEventListeners();
        loadNewQuestion();
    }

    // Event listeners
    function setupEventListeners() {
        // Submit answer
        elements.submitBtn.addEventListener('click', submitAnswer);
        elements.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitAnswer();
        });

        // Multiple choice
        elements.choiceBtns.forEach(btn => {
            btn.addEventListener('click', () => submitChoice(parseInt(btn.dataset.choice)));
        });

        // Next question
        elements.nextBtn.addEventListener('click', loadNewQuestion);

        // Skip
        elements.skipBtn.addEventListener('click', skipQuestion);

        // Category pills
        elements.pills.forEach(pill => {
            pill.addEventListener('click', () => {
                elements.pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentCategory = pill.dataset.category;
                loadNewQuestion();
            });
        });

        // Keyboard shortcut for next (spacebar when showing result)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !elements.resultSection.classList.contains('hidden')) {
                e.preventDefault();
                loadNewQuestion();
            }
        });
    }

    // Load a new question
    function loadNewQuestion() {
        currentQuestion = getRandomQuestion(currentCategory);

        if (!currentQuestion) {
            elements.questionText.textContent = 'No questions available for this category.';
            return;
        }

        // Reset UI
        elements.resultSection.classList.add('hidden');
        elements.answerInput.value = '';
        elements.answerInput.classList.remove('correct', 'incorrect');
        elements.choiceBtns.forEach(btn => {
            btn.classList.remove('selected', 'correct', 'incorrect');
        });

        // Set question
        elements.questionText.textContent = currentQuestion.question;

        // Set category badge
        const category = currentQuestion.category;
        elements.categoryBadge.textContent = categoryNames[category] || category;
        elements.categoryBadge.className = 'category-badge ' + category;

        // Show appropriate input type
        if (currentQuestion.type === 'choice') {
            elements.answerSection.classList.add('hidden');
            elements.choicesSection.classList.remove('hidden');

            // Populate choices
            currentQuestion.choices.forEach((choice, i) => {
                elements.choiceBtns[i].textContent = choice;
            });
        } else {
            elements.answerSection.classList.remove('hidden');
            elements.choicesSection.classList.add('hidden');
            elements.answerInput.focus();
        }

        // Show skip button
        elements.skipBtn.classList.remove('hidden');
    }

    // Submit text answer
    function submitAnswer() {
        const userAnswer = parseFloat(elements.answerInput.value.replace(/[,$%]/g, ''));

        if (isNaN(userAnswer)) {
            elements.answerInput.focus();
            return;
        }

        const correct = currentQuestion.answer;
        const tolerance = currentQuestion.tolerance || 0;
        const isCorrect = Math.abs(userAnswer - correct) <= tolerance;

        showResult(isCorrect);
    }

    // Submit multiple choice
    function submitChoice(choiceIndex) {
        const isCorrect = choiceIndex === currentQuestion.correctIndex;

        // Highlight choices
        elements.choiceBtns.forEach((btn, i) => {
            if (i === currentQuestion.correctIndex) {
                btn.classList.add('correct');
            } else if (i === choiceIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true;
        });

        showResult(isCorrect);
    }

    // Show result
    function showResult(isCorrect) {
        // Update stats
        stats.total++;
        if (isCorrect) {
            stats.correct++;
            stats.streak++;
            stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
        } else {
            stats.streak = 0;
        }

        updateStatsDisplay();
        saveStats();

        // Show result
        elements.resultIcon.textContent = isCorrect ? '✓' : '✗';
        elements.resultIcon.className = 'result-icon ' + (isCorrect ? 'correct' : 'incorrect');
        elements.resultText.textContent = isCorrect ? 'Correct!' : `Answer: ${formatAnswer(currentQuestion.answer)}`;
        elements.resultText.className = 'result-text ' + (isCorrect ? 'correct' : 'incorrect');
        elements.explanation.textContent = currentQuestion.explanation;

        elements.resultSection.classList.remove('hidden');
        elements.skipBtn.classList.add('hidden');

        // Re-enable choice buttons
        elements.choiceBtns.forEach(btn => btn.disabled = false);
    }

    // Format answer for display
    function formatAnswer(answer) {
        if (typeof answer === 'number') {
            if (Number.isInteger(answer)) {
                return answer.toLocaleString();
            }
            return answer.toFixed(1);
        }
        return answer;
    }

    // Skip question
    function skipQuestion() {
        stats.streak = 0;
        updateStatsDisplay();
        loadNewQuestion();
    }

    // Update stats display
    function updateStatsDisplay() {
        elements.streakCount.textContent = stats.streak;
        elements.correctCount.textContent = stats.correct;
        elements.totalCount.textContent = stats.total;
    }

    // Save stats to localStorage
    function saveStats() {
        try {
            localStorage.setItem('brainTrainerStats', JSON.stringify(stats));
        } catch (e) {
            // localStorage not available
        }
    }

    // Load stats from localStorage
    function loadStats() {
        try {
            const saved = localStorage.getItem('brainTrainerStats');
            if (saved) {
                const parsed = JSON.parse(saved);
                stats = { ...stats, ...parsed };
                updateStatsDisplay();
            }
        } catch (e) {
            // localStorage not available
        }
    }

    // Start the app
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
