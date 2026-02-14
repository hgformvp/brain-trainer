# Technical Documentation - Brain Trainer

## Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework, no build step)
- **Hosting**: Static files - can be hosted anywhere (GitHub Pages, Netlify, Vercel, etc.)
- **Storage**: localStorage for stats persistence

## File Structure
```
brain-trainer/
├── index.html      # Main app HTML
├── styles.css      # Dark theme CSS
├── questions.js    # Question generators for all 5 categories
├── app.js          # App logic and state management
├── CLAUDE.md       # Project instructions
└── TECHNICAL.md    # This file
```

## Question Categories
1. **Probability & Expected Value** (`probability`)
   - Basic probability calculations
   - Expected value problems
   - Poker odds and pot odds
   - Bayesian reasoning

2. **Time Value of Money** (`tvm`)
   - Present/Future value
   - Rule of 72
   - Simple/compound interest
   - NPV concepts

3. **Game Theory** (`gametheory`)
   - Nash equilibrium
   - Bluffing frequencies
   - Minimum defense frequency
   - Zero-sum games

4. **Statistical Reasoning** (`stats`)
   - Mean, median calculations
   - Standard deviation concepts
   - Base rate fallacy
   - Regression to mean

5. **Combinatorics** (`combinatorics`)
   - Permutations & combinations
   - Factorial problems
   - Path counting
   - Poker hand counting

## Adding New Questions

Each question is a generator function that returns an object:

```javascript
() => {
    return {
        question: "Question text here",
        answer: 42,                    // Numeric answer (for input questions)
        tolerance: 2,                  // Acceptable margin of error
        explanation: "How to solve it",

        // For multiple choice:
        type: 'choice',
        choices: ['A', 'B', 'C', 'D'],
        correctIndex: 0
    };
}
```

Add new generators to the appropriate array in `questions.js`.

## Local Development

Option 1 - Python:
```bash
python -m http.server 8000
```

Option 2 - Node.js:
```bash
npx serve
```

Then open http://localhost:8000

## Deployment

**GitHub Pages:**
1. Push to GitHub
2. Go to Settings > Pages
3. Set source to main branch
4. Site will be at username.github.io/brain-trainer

**Netlify:**
1. Connect to GitHub repo
2. Deploy (no build command needed)

## Future Enhancements
- [ ] Difficulty levels
- [ ] Spaced repetition
- [ ] Performance analytics
- [ ] Professional track modes (quant, credit, poker)
- [ ] PWA with offline support
