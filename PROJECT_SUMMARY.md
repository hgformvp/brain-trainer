# Brain Trainer - Codebase Summary

## Overview
A mobile-first web app for mental exercises targeting finance professionals. Pure HTML/CSS/JS with no frameworks or build step. Dark theme, opens instantly, immediate feedback after each question.

## File Structure
```
brain-trainer/
├── index.html      # Main HTML structure
├── styles.css      # Dark theme CSS, mobile-optimized
├── questions.js    # Question generators (all categories)
├── app.js          # App logic, state management, UI interactions
├── CLAUDE.md       # Project instructions
└── TECHNICAL.md    # Developer documentation
```

## How It Works

### Question System
- Questions are generated dynamically by generator functions in `questions.js`
- Each generator returns an object with: `question`, `answer`, `tolerance`, `explanation`
- Multiple choice questions add: `type: 'choice'`, `choices[]`, `correctIndex`
- Random values are inserted each time for variety
- Categories: `mentalmath`, `probability`, `tvm`, `gametheory`, `stats`, `combinatorics`

### Question Object Format
```javascript
{
    question: "15 × 12 = ?",           // Display text
    answer: 180,                        // Correct numeric answer
    tolerance: 0,                       // Acceptable margin of error
    explanation: "15 × 12 = 180",       // Shown after answering

    // For multiple choice only:
    type: 'choice',
    choices: ['A', 'B', 'C', 'D'],
    correctIndex: 0
}
```

### App State (in app.js)
- `currentQuestion` - the active question object
- `currentCategory` - filter ('all' or category name)
- `stats` - { correct, total, streak, maxStreak } persisted to localStorage

### UI Flow
1. App loads → `loadNewQuestion()` picks random question from selected category
2. User types answer or selects choice
3. `submitAnswer()` or `submitChoice()` checks correctness
4. `showResult()` displays feedback with explanation
5. User taps "Next" → repeats

## Current Categories & Question Counts

| Category | Key | Questions | Topics |
|----------|-----|-----------|--------|
| Mental Math | `mentalmath` | 25 | Multiplication, division, percentages, basis points, multiples, margins, IRR |
| Probability | `probability` | 8 | Odds, expected value, pot odds, Bayes, poker |
| Time Value of Money | `tvm` | 8 | PV, FV, Rule of 72, NPV, perpetuities |
| Game Theory | `gametheory` | 8 | Nash equilibrium, bluffing frequency, Kelly criterion |
| Statistics | `stats` | 9 | Mean, median, standard deviation, base rate, regression |
| Combinatorics | `combinatorics` | 8 | Factorials, permutations, combinations, poker hands |

## Key Functions

### questions.js
- `getRandomQuestion(category)` - returns a random question object from specified category or all

### app.js
- `loadNewQuestion()` - gets new question, updates UI
- `submitAnswer()` - validates text input against answer ± tolerance
- `submitChoice(index)` - validates multiple choice selection
- `showResult(isCorrect)` - displays result, updates stats
- `saveStats()` / `loadStats()` - localStorage persistence

## Styling System (styles.css)

### CSS Variables
```css
--bg-primary: #0a0a0f      /* Main background */
--bg-card: #1a1a24         /* Question card */
--accent: #6366f1          /* Primary purple */
--success: #22c55e         /* Correct answer */
--error: #ef4444           /* Wrong answer */
```

### Category Colors
- Mental Math: cyan (#38bdf8)
- Probability: purple (#818cf8)
- TVM: green (#4ade80)
- Game Theory: yellow (#fbbf24)
- Stats: violet (#c084fc)
- Combinatorics: pink (#f472b6)

## Adding New Questions

Add generator function to appropriate array in `questions.js`:
```javascript
() => {
    const a = [values][Math.floor(Math.random() * length)];
    return {
        question: `Your question with ${a}?`,
        answer: calculated_answer,
        tolerance: 0,
        explanation: `How to solve it`
    };
}
```

## Adding New Category

1. Add question array to `Questions` object in `questions.js`
2. Add pill button in `index.html` category-pills div
3. Add display name in `categoryNames` object in `app.js`
4. Add badge color in `styles.css`

## Current Features
- 6 question categories with 66+ question templates
- Random value generation for infinite variations
- Text input and multiple choice support
- Tolerance-based answer checking
- Immediate feedback with explanations
- Streak counter
- Score tracking (correct/total)
- Category filtering
- Stats persist across sessions (localStorage)
- Mobile-optimized, dark theme
- Skip button

## Not Yet Built
- Difficulty levels
- Timed mode
- Spaced repetition
- Performance analytics/history
- Professional tracks (quant mode, poker mode, credit mode)
- PWA/offline support
