// Question generators for Brain Trainer
// Each category has multiple question templates that generate random variations

const Questions = {
    // ==========================================
    // PROBABILITY & EXPECTED VALUE
    // ==========================================
    probability: [
        // Basic probability
        () => {
            const total = [6, 8, 10, 12, 20][Math.floor(Math.random() * 5)];
            const favorable = Math.floor(Math.random() * (total - 1)) + 1;
            const percent = Math.round((favorable / total) * 100);
            return {
                question: `A bag has ${total} balls. ${favorable} are red. What's the probability of drawing a red ball? (as %)`,
                answer: percent,
                tolerance: 1,
                explanation: `${favorable} out of ${total} = ${favorable}/${total} = ${percent}%`
            };
        },

        // Coin flip probability
        () => {
            const flips = [2, 3, 4][Math.floor(Math.random() * 3)];
            const outcomes = Math.pow(2, flips);
            const allHeads = 1;
            const percent = Math.round((allHeads / outcomes) * 100 * 10) / 10;
            return {
                question: `You flip a fair coin ${flips} times. What's the probability of getting ALL heads? (as %)`,
                answer: percent,
                tolerance: 0.5,
                explanation: `Each flip has 1/2 chance of heads. For ${flips} flips: (1/2)^${flips} = 1/${outcomes} = ${percent}%`
            };
        },

        // Expected value - simple bet
        () => {
            const winAmount = [100, 200, 500, 1000][Math.floor(Math.random() * 4)];
            const winProb = [10, 20, 25, 30][Math.floor(Math.random() * 4)];
            const cost = Math.round(winAmount * winProb / 100 * (0.7 + Math.random() * 0.6));
            const ev = Math.round(winAmount * winProb / 100 - cost);
            return {
                question: `A bet costs $${cost}. You have a ${winProb}% chance to win $${winAmount}, otherwise you get nothing. What's the expected value? (can be negative)`,
                answer: ev,
                tolerance: 1,
                explanation: `EV = (${winProb}% × $${winAmount}) - $${cost} = $${Math.round(winAmount * winProb / 100)} - $${cost} = $${ev}`
            };
        },

        // Dice probability
        () => {
            const target = Math.floor(Math.random() * 5) + 2; // 2-6
            const favorable = 7 - target; // numbers >= target on a d6
            const percent = Math.round((favorable / 6) * 100 * 10) / 10;
            return {
                question: `Rolling a fair 6-sided die, what's the probability of getting ${target} or higher? (as %)`,
                answer: percent,
                tolerance: 1,
                explanation: `Numbers ${target} or higher: ${7 - target} outcomes out of 6. So ${favorable}/6 = ${percent}%`
            };
        },

        // Poker - pair probability (simplified)
        () => {
            const scenarios = [
                { cards: "pocket pair", prob: 6, explanation: "6% chance of being dealt a pocket pair" },
                { cards: "suited cards", prob: 24, explanation: "About 24% (23.5%) of hands are suited" },
                { cards: "ace", prob: 15, explanation: "15% chance of being dealt at least one ace" }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            return {
                question: `In Texas Hold'em, approximately what percent of starting hands contain a ${s.cards}?`,
                answer: s.prob,
                tolerance: 2,
                explanation: s.explanation
            };
        },

        // Independent events
        () => {
            const prob1 = [50, 60, 70, 80][Math.floor(Math.random() * 4)];
            const prob2 = [50, 60, 70, 80][Math.floor(Math.random() * 4)];
            const both = Math.round(prob1 * prob2 / 100);
            return {
                question: `Event A has ${prob1}% probability. Event B has ${prob2}% probability. If independent, what's the probability BOTH occur? (as %)`,
                answer: both,
                tolerance: 1,
                explanation: `For independent events: P(A and B) = P(A) × P(B) = ${prob1}% × ${prob2}% = ${both}%`
            };
        },

        // Pot odds
        () => {
            const pot = [100, 200, 300, 400][Math.floor(Math.random() * 4)];
            const call = [25, 50, 75, 100][Math.floor(Math.random() * 4)];
            const odds = Math.round((call / (pot + call)) * 100);
            return {
                question: `The pot is $${pot}. You need to call $${call}. What pot odds are you getting? (as % you need to win)`,
                answer: odds,
                tolerance: 2,
                explanation: `You're risking $${call} to win $${pot + call} total. Need to win ${call}/${pot + call} = ${odds}% to break even.`
            };
        },

        // Simple Bayes
        () => {
            return {
                question: `A test is 90% accurate. If 1% of population has a disease, and you test positive, roughly what's the chance you have it? (as %)`,
                answer: 8,
                tolerance: 2,
                explanation: `True positives: 1% × 90% = 0.9%. False positives: 99% × 10% = 9.9%. So P(disease|positive) = 0.9/(0.9+9.9) ≈ 8%`,
                type: 'choice',
                choices: ['About 8%', 'About 50%', 'About 90%', 'About 1%'],
                correctIndex: 0
            };
        }
    ],

    // ==========================================
    // TIME VALUE OF MONEY
    // ==========================================
    tvm: [
        // Simple interest
        () => {
            const principal = [1000, 5000, 10000][Math.floor(Math.random() * 3)];
            const rate = [5, 6, 8, 10][Math.floor(Math.random() * 4)];
            const years = [2, 3, 5][Math.floor(Math.random() * 3)];
            const interest = principal * rate * years / 100;
            return {
                question: `$${principal.toLocaleString()} at ${rate}% simple interest for ${years} years. How much interest earned?`,
                answer: interest,
                tolerance: 1,
                explanation: `Simple interest = Principal × Rate × Time = $${principal.toLocaleString()} × ${rate}% × ${years} = $${interest.toLocaleString()}`
            };
        },

        // Future value
        () => {
            const principal = [1000, 5000, 10000][Math.floor(Math.random() * 3)];
            const rate = [5, 8, 10][Math.floor(Math.random() * 3)];
            const years = [2, 3, 5][Math.floor(Math.random() * 3)];
            const fv = Math.round(principal * Math.pow(1 + rate/100, years));
            return {
                question: `$${principal.toLocaleString()} invested at ${rate}% annual compound interest. What's it worth in ${years} years? (round to nearest dollar)`,
                answer: fv,
                tolerance: 10,
                explanation: `FV = PV × (1 + r)^n = $${principal.toLocaleString()} × (1.${rate.toString().padStart(2, '0')})^${years} = $${fv.toLocaleString()}`
            };
        },

        // Present value
        () => {
            const fv = [1000, 5000, 10000][Math.floor(Math.random() * 3)];
            const rate = [5, 8, 10][Math.floor(Math.random() * 3)];
            const years = [2, 3, 5][Math.floor(Math.random() * 3)];
            const pv = Math.round(fv / Math.pow(1 + rate/100, years));
            return {
                question: `You need $${fv.toLocaleString()} in ${years} years. At ${rate}% annual return, how much should you invest today?`,
                answer: pv,
                tolerance: 10,
                explanation: `PV = FV / (1 + r)^n = $${fv.toLocaleString()} / (1.${rate.toString().padStart(2, '0')})^${years} = $${pv.toLocaleString()}`
            };
        },

        // Rule of 72
        () => {
            const rate = [4, 6, 8, 9, 12][Math.floor(Math.random() * 5)];
            const years = Math.round(72 / rate);
            return {
                question: `Using the Rule of 72: At ${rate}% annual return, roughly how many years to double your money?`,
                answer: years,
                tolerance: 1,
                explanation: `Rule of 72: Years to double ≈ 72 / rate = 72 / ${rate} = ${years} years`
            };
        },

        // Discount rate finding
        () => {
            const scenarios = [
                { pv: 100, fv: 121, years: 2, rate: 10 },
                { pv: 100, fv: 125, years: 1, rate: 25 },
                { pv: 1000, fv: 1210, years: 2, rate: 10 },
                { pv: 100, fv: 200, years: 4, rate: 19 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            return {
                question: `An investment grows from $${s.pv} to $${s.fv} in ${s.years} year${s.years > 1 ? 's' : ''}. What's the annual return? (as %)`,
                answer: s.rate,
                tolerance: 2,
                explanation: `Return = (FV/PV)^(1/n) - 1 = ($${s.fv}/$${s.pv})^(1/${s.years}) - 1 ≈ ${s.rate}%`
            };
        },

        // NPV concept
        () => {
            const cf1 = [100, 200, 500][Math.floor(Math.random() * 3)];
            const rate = 10;
            const pv = Math.round(cf1 / 1.1);
            return {
                question: `A project pays $${cf1} in 1 year and nothing else. At 10% discount rate, what's the present value?`,
                answer: pv,
                tolerance: 1,
                explanation: `PV = $${cf1} / 1.10 = $${pv}`
            };
        },

        // Perpetuity
        () => {
            const payment = [100, 200, 500, 1000][Math.floor(Math.random() * 4)];
            const rate = [5, 8, 10][Math.floor(Math.random() * 3)];
            const pv = Math.round(payment / (rate / 100));
            return {
                question: `A perpetuity pays $${payment}/year forever. At ${rate}% discount rate, what's its present value?`,
                answer: pv,
                tolerance: 10,
                explanation: `PV of perpetuity = Payment / Rate = $${payment} / ${rate}% = $${pv.toLocaleString()}`
            };
        },

        // Real vs nominal
        () => {
            const nominal = [8, 10, 12][Math.floor(Math.random() * 3)];
            const inflation = [2, 3, 4][Math.floor(Math.random() * 3)];
            const real = nominal - inflation;
            return {
                question: `If nominal return is ${nominal}% and inflation is ${inflation}%, what's the approximate real return?`,
                answer: real,
                tolerance: 0.5,
                explanation: `Real return ≈ Nominal - Inflation = ${nominal}% - ${inflation}% = ${real}%`
            };
        }
    ],

    // ==========================================
    // GAME THEORY
    // ==========================================
    gametheory: [
        // Prisoner's dilemma
        () => {
            return {
                question: `In a one-shot Prisoner's Dilemma, what is the Nash equilibrium strategy?`,
                type: 'choice',
                choices: ['Both defect', 'Both cooperate', 'One defects, one cooperates', 'No equilibrium exists'],
                correctIndex: 0,
                explanation: `In a one-shot game, defecting is dominant for both players since it's better regardless of opponent's choice. Both defect is the only Nash equilibrium.`
            };
        },

        // Mixed strategy
        () => {
            return {
                question: `In Rock-Paper-Scissors, what's the Nash equilibrium probability for each choice?`,
                type: 'choice',
                choices: ['33% each', '50% Rock, 25% each other', 'Always Rock', 'Depends on opponent'],
                correctIndex: 0,
                explanation: `The unique Nash equilibrium is to play each option with equal probability (1/3 each), making you unexploitable.`
            };
        },

        // Bluffing frequency
        () => {
            const potSize = [100, 200][Math.floor(Math.random() * 2)];
            const betSize = potSize; // pot-sized bet
            // Optimal bluff frequency = bet/(bet+pot) for pot-sized = 50%
            return {
                question: `You make a pot-sized bet ($${betSize} into $${potSize}). To be unexploitable, roughly what % of your betting range should be bluffs?`,
                answer: 33,
                tolerance: 5,
                explanation: `With a pot-sized bet, you should bluff about 33% of the time (1 bluff per 2 value bets) to make opponent indifferent to calling.`
            };
        },

        // Minimum defense frequency
        () => {
            const pot = 100;
            const bet = [50, 75, 100][Math.floor(Math.random() * 3)];
            const mdf = Math.round((pot / (pot + bet)) * 100);
            return {
                question: `Pot is $${pot}. Opponent bets $${bet}. To prevent them from profiting with any bluff, what % of your range must you defend?`,
                answer: mdf,
                tolerance: 3,
                explanation: `MDF = Pot / (Pot + Bet) = $${pot} / $${pot + bet} = ${mdf}%`
            };
        },

        // Zero-sum concept
        () => {
            return {
                question: `In a zero-sum game between two players, if Player A gains $50, what happens to Player B?`,
                type: 'choice',
                choices: ['Loses $50', 'Gains $50', 'Unchanged', 'Loses $25'],
                correctIndex: 0,
                explanation: `Zero-sum means total gains equal total losses. If one player gains, the other loses exactly that amount.`
            };
        },

        // First mover advantage
        () => {
            return {
                question: `In Tic-Tac-Toe with optimal play, what is the outcome?`,
                type: 'choice',
                choices: ['Always a draw', 'First player wins', 'Second player wins', 'Random'],
                correctIndex: 0,
                explanation: `With perfect play from both sides, Tic-Tac-Toe always ends in a draw. Neither player can force a win.`
            };
        },

        // Auction strategy
        () => {
            const value = [100, 200, 500][Math.floor(Math.random() * 3)];
            return {
                question: `In a second-price sealed auction, an item is worth $${value} to you. What should you bid?`,
                answer: value,
                tolerance: 0,
                explanation: `In a second-price auction, bidding your true value is the dominant strategy. You pay the second-highest bid, so bidding truthfully maximizes expected profit.`
            };
        },

        // Kelly criterion simplified
        () => {
            const winProb = 60;
            const loseProb = 40;
            // Kelly = (bp - q) / b where b = 1 (even money), p = 0.6, q = 0.4
            const kelly = 20;
            return {
                question: `You have a 60% edge on an even-money bet. Using Kelly Criterion, what % of bankroll should you wager?`,
                answer: kelly,
                tolerance: 2,
                explanation: `Kelly % = (bp - q) / b = (1×0.6 - 0.4) / 1 = 20% of bankroll`
            };
        }
    ],

    // ==========================================
    // STATISTICAL REASONING
    // ==========================================
    stats: [
        // Mean calculation
        () => {
            const nums = Array.from({length: 5}, () => Math.floor(Math.random() * 20) + 1);
            const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
            return {
                question: `What's the mean of: ${nums.join(', ')}?`,
                answer: mean,
                tolerance: 0.1,
                explanation: `Mean = (${nums.join(' + ')}) / 5 = ${nums.reduce((a, b) => a + b, 0)} / 5 = ${mean}`
            };
        },

        // Median
        () => {
            const nums = Array.from({length: 5}, () => Math.floor(Math.random() * 30) + 1);
            const sorted = [...nums].sort((a, b) => a - b);
            const median = sorted[2];
            return {
                question: `What's the median of: ${nums.join(', ')}?`,
                answer: median,
                tolerance: 0,
                explanation: `Sorted: ${sorted.join(', ')}. Middle value (3rd of 5) = ${median}`
            };
        },

        // Standard deviation intuition
        () => {
            return {
                question: `In a normal distribution, roughly what % of data falls within 2 standard deviations of the mean?`,
                answer: 95,
                tolerance: 2,
                explanation: `The 68-95-99.7 rule: About 68% within 1 SD, 95% within 2 SD, 99.7% within 3 SD.`
            };
        },

        // Percentile
        () => {
            return {
                question: `If you score in the 85th percentile, what % of people scored lower than you?`,
                answer: 85,
                tolerance: 0,
                explanation: `The Nth percentile means N% of scores are at or below yours. 85th percentile = 85% scored lower.`
            };
        },

        // Sample size effect
        () => {
            return {
                question: `A coin is flipped 10 times and shows 7 heads. Is this strong evidence the coin is biased?`,
                type: 'choice',
                choices: ['No - sample too small', 'Yes - 70% is high', 'Need more info', 'Definitely biased'],
                correctIndex: 0,
                explanation: `With only 10 flips, getting 7 heads (70%) isn't unusual for a fair coin. We need larger samples to detect true bias.`
            };
        },

        // Correlation vs causation
        () => {
            return {
                question: `Ice cream sales and drowning deaths are correlated. Does ice cream cause drowning?`,
                type: 'choice',
                choices: ['No - confounding variable (summer)', 'Yes - direct causation', 'Maybe - need more data', 'Reverse causation'],
                correctIndex: 0,
                explanation: `Both are caused by a third variable (hot weather/summer). This is a classic example of confounding, not causation.`
            };
        },

        // Regression to mean
        () => {
            return {
                question: `A trader has an exceptional year. Next year, performance will most likely:`,
                type: 'choice',
                choices: ['Move toward average', 'Stay exceptional', 'Be even better', 'Crash completely'],
                correctIndex: 0,
                explanation: `Regression to the mean: Extreme performance tends to be followed by more average performance, as luck evens out.`
            };
        },

        // Base rate
        () => {
            const defectRate = 2;
            const testAccuracy = 90;
            return {
                question: `${defectRate}% of products are defective. A ${testAccuracy}% accurate test says "defective." Roughly what's the actual probability it's defective?`,
                answer: 17,
                tolerance: 5,
                explanation: `True defectives caught: ${defectRate}% × ${testAccuracy}% = ${defectRate * testAccuracy / 100}%. False alarms: ${100 - defectRate}% × ${100 - testAccuracy}% = ${(100-defectRate) * (100-testAccuracy) / 100}%. P(defective|alarm) ≈ 17%`
            };
        },

        // Weighted average
        () => {
            const grade1 = [85, 90, 80][Math.floor(Math.random() * 3)];
            const grade2 = [70, 75, 80][Math.floor(Math.random() * 3)];
            const weight1 = 60;
            const weight2 = 40;
            const weighted = (grade1 * weight1 + grade2 * weight2) / 100;
            return {
                question: `Exam 1: ${grade1} (worth ${weight1}%). Exam 2: ${grade2} (worth ${weight2}%). What's your weighted average?`,
                answer: weighted,
                tolerance: 0.5,
                explanation: `Weighted avg = (${grade1} × ${weight1}% + ${grade2} × ${weight2}%) = ${weighted}`
            };
        }
    ],

    // ==========================================
    // COMBINATORICS & COUNTING
    // ==========================================
    combinatorics: [
        // Basic factorial
        () => {
            const n = [4, 5, 6][Math.floor(Math.random() * 3)];
            const factorial = [24, 120, 720][n - 4];
            return {
                question: `What is ${n}! (${n} factorial)?`,
                answer: factorial,
                tolerance: 0,
                explanation: `${n}! = ${Array.from({length: n}, (_, i) => n - i).join(' × ')} = ${factorial}`
            };
        },

        // Permutation
        () => {
            const n = [5, 6, 7][Math.floor(Math.random() * 3)];
            const r = [2, 3][Math.floor(Math.random() * 2)];
            // P(n,r) = n! / (n-r)!
            const perm = {
                '5,2': 20, '5,3': 60,
                '6,2': 30, '6,3': 120,
                '7,2': 42, '7,3': 210
            }[`${n},${r}`];
            return {
                question: `How many ways to arrange ${r} items from ${n} distinct items? (order matters)`,
                answer: perm,
                tolerance: 0,
                explanation: `P(${n},${r}) = ${n}!/(${n}-${r})! = ${n}!/${n-r}! = ${perm}`
            };
        },

        // Combination
        () => {
            const scenarios = [
                { n: 5, r: 2, ans: 10 },
                { n: 6, r: 2, ans: 15 },
                { n: 6, r: 3, ans: 20 },
                { n: 10, r: 2, ans: 45 },
                { n: 52, r: 2, ans: 1326, label: "hole cards in poker" }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            return {
                question: s.label
                    ? `How many possible ${s.label}? (${s.n} choose ${s.r})`
                    : `How many ways to choose ${s.r} items from ${s.n}? (order doesn't matter)`,
                answer: s.ans,
                tolerance: 0,
                explanation: `C(${s.n},${s.r}) = ${s.n}! / (${s.r}! × ${s.n-s.r}!) = ${s.ans}`
            };
        },

        // Poker hands
        () => {
            return {
                question: `How many 5-card poker hands are possible from a 52-card deck?`,
                type: 'choice',
                choices: ['2,598,960', '311,875,200', '52,000', '3,744'],
                correctIndex: 0,
                explanation: `C(52,5) = 52!/(5! × 47!) = 2,598,960 unique hands`
            };
        },

        // Arrangements with repetition
        () => {
            const letters = ['BOOK', 'TEEN', 'NOON'][Math.floor(Math.random() * 3)];
            const answers = { 'BOOK': 12, 'TEEN': 12, 'NOON': 6 };
            return {
                question: `How many distinct arrangements of the letters in "${letters}"?`,
                answer: answers[letters],
                tolerance: 0,
                explanation: `Account for repeated letters: ${letters} has ${letters.length}! divided by factorial of each letter's count.`
            };
        },

        // Committee selection
        () => {
            const men = [4, 5, 6][Math.floor(Math.random() * 3)];
            const women = [3, 4][Math.floor(Math.random() * 2)];
            const selectMen = 2;
            const selectWomen = 2;
            const menWays = men === 4 ? 6 : men === 5 ? 10 : 15;
            const womenWays = women === 3 ? 3 : 6;
            const total = menWays * womenWays;
            return {
                question: `A committee needs ${selectMen} men from ${men} and ${selectWomen} women from ${women}. How many ways?`,
                answer: total,
                tolerance: 0,
                explanation: `C(${men},${selectMen}) × C(${women},${selectWomen}) = ${menWays} × ${womenWays} = ${total}`
            };
        },

        // Path counting
        () => {
            return {
                question: `How many shortest paths from corner to corner of a 3×3 grid? (only moving right or down)`,
                answer: 20,
                tolerance: 0,
                explanation: `Need 3 rights and 3 downs. C(6,3) = ways to place 3 rights in 6 moves = 20`
            };
        },

        // Digit counting
        () => {
            return {
                question: `How many 3-digit numbers have all different digits? (100-999)`,
                answer: 648,
                tolerance: 0,
                explanation: `First digit: 9 choices (1-9). Second: 9 choices (0-9 except first). Third: 8 choices. 9 × 9 × 8 = 648`
            };
        }
    ]
};

// Get a random question from a specific category or all
function getRandomQuestion(category = 'all') {
    let pool;
    if (category === 'all') {
        pool = Object.values(Questions).flat();
    } else {
        pool = Questions[category] || [];
    }

    if (pool.length === 0) return null;

    const generator = pool[Math.floor(Math.random() * pool.length)];
    const question = generator();

    // Add category if not present
    if (!question.category) {
        question.category = Object.entries(Questions).find(([cat, gens]) =>
            gens.includes(generator)
        )?.[0] || 'unknown';
    }

    return question;
}

// Export for use in app.js
window.Questions = Questions;
window.getRandomQuestion = getRandomQuestion;
