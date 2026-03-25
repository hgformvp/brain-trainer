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
        },

        // Portfolio Weighted Return
        () => {
            // Generate 3 weights that sum to 100
            const w1 = [30, 35, 40, 45, 50][Math.floor(Math.random() * 5)];
            const w2 = [25, 30, 35][Math.floor(Math.random() * 3)];
            const w3 = 100 - w1 - w2;

            // Generate returns between -10% and +20%
            const r1 = Math.floor(Math.random() * 31) - 10;
            const r2 = Math.floor(Math.random() * 31) - 10;
            const r3 = Math.floor(Math.random() * 31) - 10;

            const weightedReturn = Math.round(((w1 * r1 + w2 * r2 + w3 * r3) / 100) * 10) / 10;

            const r1Str = r1 >= 0 ? `+${r1}` : `${r1}`;
            const r2Str = r2 >= 0 ? `+${r2}` : `${r2}`;
            const r3Str = r3 >= 0 ? `+${r3}` : `${r3}`;

            return {
                question: `You hold 3 positions: ${w1}% in Asset A returning ${r1Str}%, ${w2}% in Asset B returning ${r2Str}%, ${w3}% in Asset C returning ${r3Str}%. What is your portfolio's weighted return? (as %)`,
                answer: weightedReturn,
                tolerance: 0.5,
                explanation: `(${w1}% × ${r1}) + (${w2}% × ${r2}) + (${w3}% × ${r3}) = ${(w1*r1/100).toFixed(2)} + ${(w2*r2/100).toFixed(2)} + ${(w3*r3/100).toFixed(2)} = ${weightedReturn}%`
            };
        },

        // Altman Z-Score Component
        () => {
            const components = [
                { name: 'Working Capital / Total Assets', weight: 1.2 },
                { name: 'Retained Earnings / Total Assets', weight: 1.4 },
                { name: 'EBIT / Total Assets', weight: 3.3 },
                { name: 'Market Cap / Total Liabilities', weight: 0.6 },
                { name: 'Sales / Total Assets', weight: 1.0 }
            ];

            const comp = components[Math.floor(Math.random() * components.length)];
            // Ratio values from 0.05 to 0.50 in increments of 0.05
            const ratioValue = (Math.floor(Math.random() * 10) + 1) * 0.05;
            const contribution = Math.round(ratioValue * comp.weight * 100) / 100;

            return {
                question: `In the Altman Z-Score, ${comp.name} = ${ratioValue.toFixed(2)}, weighted at ${comp.weight}x. What is this component's contribution to the Z-Score?`,
                answer: contribution,
                tolerance: 0.02,
                explanation: `${ratioValue.toFixed(2)} × ${comp.weight} = ${contribution.toFixed(2)}. Z-Score zones: Below 1.81 = distress, 1.81–2.99 = grey zone, above 2.99 = safe zone.`
            };
        },

        // Regression to the Mean - Margin Forecasting
        () => {
            const industryAvg = [15, 18, 20, 22, 25][Math.floor(Math.random() * 5)];
            const stdDev = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
            const numSDs = [1, 2][Math.floor(Math.random() * 2)];
            const reversionPct = [25, 50, 75][Math.floor(Math.random() * 3)];

            const currentMargin = industryAvg + (numSDs * stdDev);
            const deviation = currentMargin - industryAvg;
            const pullback = deviation * (reversionPct / 100);
            const modeledMargin = currentMargin - pullback;

            return {
                question: `Industry avg EBITDA margin = ${industryAvg}%, std dev = ${stdDev}%. A company is currently at ${currentMargin}% (${numSDs} SD${numSDs > 1 ? 's' : ''} above average). Assuming ${reversionPct}% mean reversion, what margin do you model for next year?`,
                answer: modeledMargin,
                tolerance: 0.5,
                explanation: `Current deviation = ${deviation}%. ${reversionPct}% reversion = ${pullback}% pullback. Modeled margin = ${currentMargin}% - ${pullback}% = ${modeledMargin}%`
            };
        },

        // Poker Outs to Equity (Rule of 2 and 4)
        () => {
            const draws = [
                { name: 'flush draw', outs: 9 },
                { name: 'open-ended straight draw', outs: 8 },
                { name: 'gutshot straight draw', outs: 4 },
                { name: 'two overcards', outs: 6 },
                { name: 'flush draw + gutshot', outs: 12 },
                { name: 'set trying to fill up vs a flush draw', outs: 7 }
            ];

            const draw = draws[Math.floor(Math.random() * draws.length)];
            const isFlop = Math.random() > 0.5;
            const multiplier = isFlop ? 4 : 2;
            const cardsTocome = isFlop ? '2 cards to come' : '1 card to come';
            const street = isFlop ? 'flop' : 'turn';
            const equity = draw.outs * multiplier;

            return {
                question: `You have a ${draw.name} (${draw.outs} outs) on the ${street} with ${cardsTocome}. Using the rule of ${multiplier}, your approximate equity is _____%`,
                answer: equity,
                tolerance: 2,
                explanation: `Rule of ${multiplier}: ${draw.outs} outs × ${multiplier} = ${equity}% equity`
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
    ],

    // ==========================================
    // MENTAL MATH - Quick Finance Calculations
    // ==========================================
    mentalmath: [
        // Quick multiplication - deal sizes
        () => {
            const multipliers = [
                { a: 15, b: 12, ans: 180 },
                { a: 25, b: 16, ans: 400 },
                { a: 18, b: 15, ans: 270 },
                { a: 24, b: 25, ans: 600 },
                { a: 35, b: 14, ans: 490 },
                { a: 45, b: 12, ans: 540 },
                { a: 16, b: 25, ans: 400 },
                { a: 32, b: 15, ans: 480 },
                { a: 75, b: 8, ans: 600 },
                { a: 125, b: 8, ans: 1000 }
            ];
            const m = multipliers[Math.floor(Math.random() * multipliers.length)];
            return {
                question: `${m.a} × ${m.b} = ?`,
                answer: m.ans,
                tolerance: 0,
                explanation: `${m.a} × ${m.b} = ${m.ans}`
            };
        },

        // Larger multiplication - millions
        () => {
            const a = [2, 3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 7)];
            const b = [15, 25, 35, 45, 75][Math.floor(Math.random() * 5)];
            const ans = a * b;
            return {
                question: `$${a}M × ${b} = $___M`,
                answer: ans,
                tolerance: 0,
                explanation: `${a} × ${b} = ${ans}`
            };
        },

        // Per share calculation
        () => {
            const total = [240, 360, 480, 720, 840, 960][Math.floor(Math.random() * 6)];
            const shares = [12, 15, 16, 18, 20, 24][Math.floor(Math.random() * 6)];
            const perShare = total / shares;
            return {
                question: `$${total}M ÷ ${shares}M shares = $___/share`,
                answer: perShare,
                tolerance: 0.1,
                explanation: `${total} ÷ ${shares} = $${perShare}`
            };
        },

        // Quick division
        () => {
            const divisions = [
                { a: 144, b: 12, ans: 12 },
                { a: 225, b: 15, ans: 15 },
                { a: 196, b: 14, ans: 14 },
                { a: 324, b: 18, ans: 18 },
                { a: 256, b: 16, ans: 16 },
                { a: 168, b: 14, ans: 12 },
                { a: 195, b: 15, ans: 13 },
                { a: 288, b: 16, ans: 18 },
                { a: 252, b: 12, ans: 21 },
                { a: 375, b: 25, ans: 15 }
            ];
            const d = divisions[Math.floor(Math.random() * divisions.length)];
            return {
                question: `${d.a} ÷ ${d.b} = ?`,
                answer: d.ans,
                tolerance: 0,
                explanation: `${d.a} ÷ ${d.b} = ${d.ans}`
            };
        },

        // Percentage of amount
        () => {
            const amounts = [200, 400, 500, 800, 1200, 1500, 2000, 2500];
            const percents = [5, 10, 15, 20, 25, 30, 40];
            const amount = amounts[Math.floor(Math.random() * amounts.length)];
            const pct = percents[Math.floor(Math.random() * percents.length)];
            const ans = amount * pct / 100;
            return {
                question: `${pct}% of $${amount.toLocaleString()} = ?`,
                answer: ans,
                tolerance: 0,
                explanation: `${pct}% × ${amount} = ${ans}`
            };
        },

        // Price after percentage change
        () => {
            const prices = [50, 80, 100, 120, 150, 200, 250];
            const changes = [10, 15, 20, 25];
            const price = prices[Math.floor(Math.random() * prices.length)];
            const change = changes[Math.floor(Math.random() * changes.length)];
            const isUp = Math.random() > 0.5;
            const newPrice = isUp ? price * (1 + change/100) : price * (1 - change/100);
            return {
                question: `$${price} ${isUp ? '↑' : '↓'} ${change}% = ?`,
                answer: newPrice,
                tolerance: 0.5,
                explanation: `$${price} × ${isUp ? (1 + change/100) : (1 - change/100)} = $${newPrice}`
            };
        },

        // Percentage change calculation
        () => {
            const scenarios = [
                { from: 100, to: 120, ans: 20 },
                { from: 100, to: 80, ans: -20 },
                { from: 50, to: 75, ans: 50 },
                { from: 80, to: 100, ans: 25 },
                { from: 200, to: 250, ans: 25 },
                { from: 150, to: 120, ans: -20 },
                { from: 40, to: 50, ans: 25 },
                { from: 125, to: 100, ans: -20 },
                { from: 80, to: 120, ans: 50 },
                { from: 60, to: 45, ans: -25 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            return {
                question: `$${s.from} → $${s.to}. % change?`,
                answer: s.ans,
                tolerance: 1,
                explanation: `(${s.to} - ${s.from}) / ${s.from} × 100 = ${s.ans}%`
            };
        },

        // Basis points to percentage
        () => {
            const bps = [25, 50, 75, 100, 125, 150, 200, 250, 300, 350][Math.floor(Math.random() * 10)];
            const pct = bps / 100;
            return {
                question: `${bps} bps = ____%`,
                answer: pct,
                tolerance: 0,
                explanation: `${bps} basis points ÷ 100 = ${pct}%`
            };
        },

        // Percentage to basis points
        () => {
            const pct = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3][Math.floor(Math.random() * 9)];
            const bps = pct * 100;
            return {
                question: `${pct}% = ____ bps`,
                answer: bps,
                tolerance: 0,
                explanation: `${pct}% × 100 = ${bps} basis points`
            };
        },

        // Quick squares
        () => {
            const n = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25][Math.floor(Math.random() * 14)];
            const ans = n * n;
            return {
                question: `${n}² = ?`,
                answer: ans,
                tolerance: 0,
                explanation: `${n} × ${n} = ${ans}`
            };
        },

        // Enterprise value quick calc
        () => {
            const price = [25, 40, 50, 75, 100][Math.floor(Math.random() * 5)];
            const shares = [10, 20, 40, 50, 100][Math.floor(Math.random() * 5)];
            const marketCap = price * shares;
            return {
                question: `$${price}/share × ${shares}M shares = $___M market cap`,
                answer: marketCap,
                tolerance: 0,
                explanation: `${price} × ${shares} = ${marketCap}`
            };
        },

        // Multiple on revenue
        () => {
            const revenue = [50, 100, 150, 200, 250][Math.floor(Math.random() * 5)];
            const multiple = [2, 3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 7)];
            const ev = revenue * multiple;
            return {
                question: `$${revenue}M revenue × ${multiple}x = $___M`,
                answer: ev,
                tolerance: 0,
                explanation: `${revenue} × ${multiple} = ${ev}`
            };
        },

        // Reverse multiple calculation
        () => {
            const ev = [300, 400, 500, 600, 800, 1000][Math.floor(Math.random() * 6)];
            const revenue = [50, 100, 150, 200][Math.floor(Math.random() * 4)];
            const multiple = ev / revenue;
            return {
                question: `$${ev}M EV ÷ $${revenue}M revenue = ___x multiple`,
                answer: multiple,
                tolerance: 0.1,
                explanation: `${ev} ÷ ${revenue} = ${multiple}x`
            };
        },

        // Quick addition (3 numbers)
        () => {
            const a = Math.floor(Math.random() * 90) + 10;
            const b = Math.floor(Math.random() * 90) + 10;
            const c = Math.floor(Math.random() * 90) + 10;
            return {
                question: `${a} + ${b} + ${c} = ?`,
                answer: a + b + c,
                tolerance: 0,
                explanation: `${a} + ${b} + ${c} = ${a + b + c}`
            };
        },

        // Debt/equity splits
        () => {
            const total = [100, 200, 500, 1000][Math.floor(Math.random() * 4)];
            const debtPct = [30, 40, 50, 60, 70][Math.floor(Math.random() * 5)];
            const debt = total * debtPct / 100;
            return {
                question: `$${total}M deal, ${debtPct}% debt. Debt = $___M`,
                answer: debt,
                tolerance: 0,
                explanation: `${total} × ${debtPct}% = ${debt}`
            };
        },

        // Margin calculation
        () => {
            const revenue = [100, 200, 250, 400, 500][Math.floor(Math.random() * 5)];
            const margin = [10, 15, 20, 25, 30, 40][Math.floor(Math.random() * 6)];
            const profit = revenue * margin / 100;
            return {
                question: `$${revenue}M revenue, ${margin}% margin = $___M profit`,
                answer: profit,
                tolerance: 0,
                explanation: `${revenue} × ${margin}% = ${profit}`
            };
        },

        // Implied margin
        () => {
            const scenarios = [
                { rev: 100, profit: 20, margin: 20 },
                { rev: 200, profit: 50, margin: 25 },
                { rev: 80, profit: 24, margin: 30 },
                { rev: 150, profit: 30, margin: 20 },
                { rev: 250, profit: 50, margin: 20 },
                { rev: 120, profit: 18, margin: 15 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            return {
                question: `$${s.profit}M profit ÷ $${s.rev}M revenue = ___% margin`,
                answer: s.margin,
                tolerance: 1,
                explanation: `${s.profit} ÷ ${s.rev} × 100 = ${s.margin}%`
            };
        },

        // LTV calculation
        () => {
            const arpu = [50, 100, 150, 200][Math.floor(Math.random() * 4)];
            const months = [12, 24, 36, 48][Math.floor(Math.random() * 4)];
            const ltv = arpu * months;
            return {
                question: `$${arpu}/month × ${months} months = $____ LTV`,
                answer: ltv,
                tolerance: 0,
                explanation: `${arpu} × ${months} = ${ltv}`
            };
        },

        // CAC payback
        () => {
            const cac = [500, 600, 800, 1000, 1200][Math.floor(Math.random() * 5)];
            const monthly = [50, 100, 150, 200][Math.floor(Math.random() * 4)];
            const months = cac / monthly;
            return {
                question: `$${cac} CAC ÷ $${monthly}/month = ___ month payback`,
                answer: months,
                tolerance: 0.5,
                explanation: `${cac} ÷ ${monthly} = ${months} months`
            };
        },

        // Dilution calculation
        () => {
            const existingShares = [80, 100, 200][Math.floor(Math.random() * 3)];
            const newShares = [20, 25, 50][Math.floor(Math.random() * 3)];
            const totalShares = existingShares + newShares;
            const dilution = Math.round((newShares / totalShares) * 100);
            return {
                question: `${existingShares}M existing + ${newShares}M new shares = ___% dilution`,
                answer: dilution,
                tolerance: 1,
                explanation: `${newShares} ÷ ${totalShares} = ${dilution}%`
            };
        },

        // Ownership percentage
        () => {
            const yourShares = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
            const totalShares = [100, 200][Math.floor(Math.random() * 2)];
            const ownership = (yourShares / totalShares) * 100;
            return {
                question: `${yourShares}M shares of ${totalShares}M total = ___% ownership`,
                answer: ownership,
                tolerance: 0.5,
                explanation: `${yourShares} ÷ ${totalShares} × 100 = ${ownership}%`
            };
        },

        // IRR approximation (doubling)
        () => {
            const years = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
            // Rule of 72 backwards
            const irr = Math.round(72 / years);
            return {
                question: `2x return in ${years} years ≈ ___% IRR`,
                answer: irr,
                tolerance: 3,
                explanation: `Rule of 72: 72 ÷ ${years} ≈ ${irr}% IRR`
            };
        },

        // MOIC to IRR rough (3x)
        () => {
            const scenarios = [
                { moic: 3, years: 3, irr: 44 },
                { moic: 3, years: 4, irr: 32 },
                { moic: 3, years: 5, irr: 25 },
                { moic: 2, years: 3, irr: 26 },
                { moic: 2, years: 5, irr: 15 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            return {
                question: `${s.moic}x MOIC in ${s.years} years ≈ ___% IRR`,
                answer: s.irr,
                tolerance: 5,
                explanation: `(${s.moic})^(1/${s.years}) - 1 ≈ ${s.irr}%`
            };
        },

        // Gross to net
        () => {
            const gross = [100, 150, 200, 250, 300][Math.floor(Math.random() * 5)];
            const fee = [1, 1.5, 2, 2.5][Math.floor(Math.random() * 4)];
            const net = gross - fee;
            return {
                question: `${gross}% gross - ${fee}% fee = ___% net`,
                answer: net,
                tolerance: 0,
                explanation: `${gross} - ${fee} = ${net}%`
            };
        },

        // Split calculation
        () => {
            const total = [60, 80, 100, 120][Math.floor(Math.random() * 4)];
            const split = [60, 70, 75, 80][Math.floor(Math.random() * 4)];
            const yourPart = total * split / 100;
            return {
                question: `$${total}M with ${split}/${100-split} split. Your ${split}% = $___M`,
                answer: yourPart,
                tolerance: 0,
                explanation: `${total} × ${split}% = ${yourPart}`
            };
        }
    ],

    // ==========================================
    // DISTRESSED CREDIT
    // ==========================================
    distressedcredit: [
        // Question 1: Debt Service Coverage Ratio (DSCR)
        () => {
            const ebitda = [60, 70, 80, 85, 90, 100, 120][Math.floor(Math.random() * 7)];
            const debtServiceOptions = [50, 55, 60, 65, 70, 75].filter(ds => ds < ebitda);
            const debtService = debtServiceOptions[Math.floor(Math.random() * debtServiceOptions.length)];
            const covenant = [1.10, 1.15, 1.20, 1.25][Math.floor(Math.random() * 4)];

            const dscr = Math.round((ebitda / debtService) * 100) / 100;
            const passesCovenant = dscr >= covenant;
            const headroom = Math.round(((dscr / covenant) - 1) * 100);

            return {
                question: `A company has $${ebitda}M EBITDA and $${debtService}M in annual debt service. What is the DSCR? (round to 2 decimal places)`,
                answer: dscr,
                tolerance: 0.02,
                explanation: `DSCR = EBITDA / Debt Service = $${ebitda}M / $${debtService}M = ${dscr.toFixed(2)}x. ${passesCovenant ? `At ${dscr.toFixed(2)}x, this passes the ${covenant.toFixed(2)}x covenant with ${headroom}% headroom before breach.` : `At ${dscr.toFixed(2)}x, this FAILS the ${covenant.toFixed(2)}x covenant requirement.`}`
            };
        },

        // Question 2: Leverage Multiple + Stress Test
        () => {
            const debt = [300, 400, 500, 600, 750, 800][Math.floor(Math.random() * 6)];
            const ebitdaOptions = [60, 70, 80, 90, 100, 120].filter(e => {
                const lev = debt / e;
                return lev >= 3 && lev <= 9;
            });
            const ebitda = ebitdaOptions[Math.floor(Math.random() * ebitdaOptions.length)] || 80;
            const stress = [15, 20, 25, 30][Math.floor(Math.random() * 4)];

            const currentLeverage = Math.round((debt / ebitda) * 100) / 100;
            const stressedEbitda = ebitda * (1 - stress / 100);
            const stressedLeverage = Math.round((debt / stressedEbitda) * 100) / 100;

            return {
                question: `A company has $${debt}M total debt and $${ebitda}M EBITDA (current leverage = ${currentLeverage.toFixed(1)}x). If EBITDA drops ${stress}%, what is the stressed leverage? (round to 1 decimal)`,
                answer: stressedLeverage,
                tolerance: 0.1,
                explanation: `Current leverage = $${debt}M / $${ebitda}M = ${currentLeverage.toFixed(2)}x. Stressed EBITDA = $${ebitda}M × (1 - ${stress}%) = $${stressedEbitda.toFixed(1)}M. Stressed leverage = $${debt}M / $${stressedEbitda.toFixed(1)}M = ${stressedLeverage.toFixed(2)}x`
            };
        },

        // Question 3: Interest Coverage Ratio
        () => {
            const ebit = [30, 40, 50, 60, 75, 80][Math.floor(Math.random() * 6)];
            const interestOptions = [20, 25, 30, 35, 40].filter(i => i < ebit);
            const interest = interestOptions[Math.floor(Math.random() * interestOptions.length)];

            const coverage = Math.round((ebit / interest) * 10) / 10;
            const cushion = ebit - interest;

            return {
                question: `A company has $${ebit}M EBIT and $${interest}M in annual interest expense. What is the interest coverage ratio? (round to 1 decimal place)`,
                answer: coverage,
                tolerance: 0.1,
                explanation: `Interest Coverage = EBIT / Interest = $${ebit}M / $${interest}M = ${coverage.toFixed(1)}x. This company's EBIT would need to fall $${cushion}M (to exactly $${interest}M) before it can no longer cover interest.`
            };
        },

        // Question 4: Distressed Bond Yield (Approximate YTM)
        () => {
            const scenarios = [
                { price: 650, coupon: 8, years: 3, ytm: 18.3 },
                { price: 700, coupon: 9, years: 4, ytm: 17.1 },
                { price: 550, coupon: 10, years: 5, ytm: 21.5 },
                { price: 600, coupon: 7, years: 3, ytm: 20.9 },
                { price: 750, coupon: 8, years: 5, ytm: 14.2 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const face = 1000;
            const annualCoupon = face * s.coupon / 100;
            const capitalGain = (face - s.price) / s.years;
            const avgPrice = (face + s.price) / 2;

            return {
                question: `A bond with $1,000 face value is trading at $${s.price}. Coupon rate = ${s.coupon}%, ${s.years} years to maturity. What is the approximate yield to maturity? (as %, round to 1 decimal)`,
                answer: s.ytm,
                tolerance: 1.0,
                explanation: `YTM ≈ (Annual Coupon + (Face - Price) / Years) / ((Face + Price) / 2)\n= ($${annualCoupon} + ($${face} - $${s.price}) / ${s.years}) / (($${face} + $${s.price}) / 2)\n= ($${annualCoupon} + $${capitalGain.toFixed(0)}) / $${avgPrice}\n= $${(annualCoupon + capitalGain).toFixed(0)} / $${avgPrice} ≈ ${s.ytm}%`
            };
        },

        // Question 5: Cash-on-Cash Return
        () => {
            const noi = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0][Math.floor(Math.random() * 6)];
            const debtServiceOptions = [0.8, 1.0, 1.2, 1.4, 1.6, 1.8].filter(ds => ds < noi);
            const debtService = debtServiceOptions[Math.floor(Math.random() * debtServiceOptions.length)];
            const equity = [4, 5, 6, 8, 10][Math.floor(Math.random() * 5)];

            const cashFlow = noi - debtService;
            const cashOnCash = Math.round((cashFlow / equity) * 1000) / 10;

            return {
                question: `An investment property has NOI of $${noi}M and annual debt service of $${debtService}M. Equity invested = $${equity}M. What is the cash-on-cash return? (as %, round to 1 decimal)`,
                answer: cashOnCash,
                tolerance: 0.2,
                explanation: `Cash flow to equity = NOI - Debt Service = $${noi}M - $${debtService}M = $${cashFlow.toFixed(1)}M. Cash-on-cash return = $${cashFlow.toFixed(1)}M / $${equity}M = ${cashOnCash.toFixed(1)}%`
            };
        },

        // Question 6: LBO Returns (MOIC + IRR Approximation)
        () => {
            const scenarios = [
                { entryMult: 5, entryEbitda: 50, equityPct: 30, exitMult: 7, exitEbitda: 70, years: 4, moic: 4.2 },
                { entryMult: 6, entryEbitda: 40, equityPct: 35, exitMult: 7, exitEbitda: 55, years: 5, moic: 2.7 },
                { entryMult: 5, entryEbitda: 60, equityPct: 40, exitMult: 6, exitEbitda: 80, years: 4, moic: 2.5 },
                { entryMult: 4, entryEbitda: 50, equityPct: 30, exitMult: 5, exitEbitda: 65, years: 3, moic: 3.1 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];

            const entryEV = s.entryMult * s.entryEbitda;
            const equityCheck = entryEV * s.equityPct / 100;
            const debtAtEntry = entryEV - equityCheck;
            const exitEV = s.exitMult * s.exitEbitda;
            const equityAtExit = exitEV - debtAtEntry;

            // Approximate IRR using simplified formula
            const approxIRR = Math.round(Math.pow(s.moic, 1/s.years) * 100 - 100);

            return {
                question: `LBO: Buy at ${s.entryMult}x on $${s.entryEbitda}M EBITDA. Equity check = $${equityCheck}M (${s.equityPct}% of purchase price). Sell at ${s.exitMult}x on $${s.exitEbitda}M EBITDA in ${s.years} years. Assume debt stays constant. What is the MOIC? (round to 1 decimal)`,
                answer: s.moic,
                tolerance: 0.2,
                explanation: `Entry EV = ${s.entryMult}x × $${s.entryEbitda}M = $${entryEV}M. Debt at entry = $${entryEV}M - $${equityCheck}M = $${debtAtEntry}M. Exit EV = ${s.exitMult}x × $${s.exitEbitda}M = $${exitEV}M. Equity at exit = $${exitEV}M - $${debtAtEntry}M = $${equityAtExit}M. MOIC = $${equityAtExit}M / $${equityCheck}M = ${s.moic}x. A ${s.moic}x return in ${s.years} years ≈ ${approxIRR}% IRR.`
            };
        }
    ],

    // ==========================================
    // POKER GTO
    // ==========================================
    poker_gto: [
        // Q1: Preflop Position Decision
        () => {
            const scenarios = [
                { position: 'BTN', hand: 'K♠J♦', action: 'Raise', rfiPct: 48, reason: 'KJo is in the BTN RFI range (~48% of hands)' },
                { position: 'UTG', hand: 'T♠8♠', action: 'Fold', rfiPct: 15, reason: 'T8s is outside UTG RFI range (~15% of hands)' },
                { position: 'CO', hand: 'A♦7♦', action: 'Raise', rfiPct: 27, reason: 'A7s is in CO range — suited aces play well' },
                { position: 'SB', hand: 'Q♣6♦', action: 'Raise', rfiPct: 52, reason: 'SB opens wide (~52%) and Q6o qualifies' },
                { position: 'BTN', hand: '7♠2♦', action: 'Fold', rfiPct: 48, reason: '72o is not in any standard BTN range' },
                { position: 'UTG', hand: 'A♥Q♦', action: 'Raise', rfiPct: 15, reason: 'AQo is a premium hand, always in UTG range' },
                { position: 'HJ', hand: 'J♦T♣', action: 'Raise', rfiPct: 20, reason: 'JTo is in HJ range (~20%) — connected broadways' },
                { position: 'BTN', hand: 'A♣2♣', action: 'Raise', rfiPct: 48, reason: 'All suited aces are in BTN RFI range' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const correctIndex = s.action === 'Raise' ? 0 : 1;

            return {
                question: `[Preflop Decision] 100BB deep. Action folds to you in ${s.position}. You have ${s.hand}. What is the GTO action?`,
                type: 'choice',
                choices: ['Raise', 'Fold'],
                correctIndex: correctIndex,
                explanation: `${s.action}. ${s.reason}. ${s.position} RFI range is approximately ${s.rfiPct}% of hands.`
            };
        },

        // Q2: 3-Bet or Call or Fold
        () => {
            const scenarios = [
                { heroPos: 'CO', villainPos: 'BTN', hand: 'A♠T♠', action: 'Call', reason: 'ATs has good playability in position vs 3-bet. Calling keeps dominated hands in villain\'s range.' },
                { heroPos: 'BTN', villainPos: 'SB', hand: 'K♦Q♣', action: 'Call', reason: 'KQo is borderline but playable in position. 4-betting risks getting it in dominated.' },
                { heroPos: 'UTG', villainPos: 'BB', hand: '7♠7♦', action: 'Call', reason: 'Set mining with 77. Good implied odds at 100BB. We realize equity postflop.' },
                { heroPos: 'BTN', villainPos: 'SB', hand: 'A♥A♣', action: '4-Bet', reason: 'AA is always a 4-bet for value. We want to build the pot and get stacks in.' },
                { heroPos: 'CO', villainPos: 'BB', hand: 'A♦4♦', action: '4-Bet', reason: 'A4s is a 4-bet bluff — ace blocker reduces villain\'s AA/AK combos, suited for playability if called.' },
                { heroPos: 'BTN', villainPos: 'BB', hand: 'T♥9♥', action: 'Call', reason: 'T9s has excellent playability and implied odds in position. Too strong to fold, wrong hand to 4-bet.' },
                { heroPos: 'UTG', villainPos: 'BTN', hand: 'Q♠Q♣', action: '4-Bet', reason: 'QQ is strong enough to 4-bet for value vs a BTN 3-bet. We want action from worse hands.' },
                { heroPos: 'CO', villainPos: 'SB', hand: '5♣5♦', action: 'Call', reason: '55 has set mining value. At 100BB, implied odds favor calling over 4-betting or folding.' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const actionToIndex = { '4-Bet': 0, 'Call': 1, 'Fold': 2 };

            return {
                question: `[3-Bet Response] You open ${s.heroPos}, ${s.villainPos} 3-bets. You have ${s.hand}. 100BB effective. What do you do?`,
                type: 'choice',
                choices: ['4-Bet', 'Call', 'Fold'],
                correctIndex: actionToIndex[s.action],
                explanation: `${s.action}. ${s.reason}`
            };
        },

        // Q3: Bluff Frequency Calculation
        () => {
            const scenarios = [
                { betPct: 50, pot: 100, bluffPct: 33 },
                { betPct: 100, pot: 100, bluffPct: 50 },
                { betPct: 33, pot: 100, bluffPct: 25 },
                { betPct: 75, pot: 100, bluffPct: 43 },
                { betPct: 125, pot: 100, bluffPct: 56 },
                { betPct: 25, pot: 100, bluffPct: 20 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const bet = s.pot * s.betPct / 100;
            const bluffFreq = Math.round((bet / (bet + s.pot)) * 100);

            return {
                question: `[Bluff Frequency] You bet $${bet} into a $${s.pot} pot on the river. To remain unexploitable, what % of your betting range should be bluffs? (round to nearest whole %)`,
                answer: bluffFreq,
                tolerance: 2,
                explanation: `Bluff % = Bet / (Bet + Pot) = $${bet} / ($${bet} + $${s.pot}) = $${bet} / $${bet + s.pot} = ${bluffFreq}%. This makes opponent indifferent between calling and folding with their bluff-catchers.`
            };
        },

        // Q4: Minimum Defense Frequency (MDF)
        () => {
            const scenarios = [
                { pot: 100, bet: 50 },
                { pot: 100, bet: 100 },
                { pot: 120, bet: 80 },
                { pot: 200, bet: 100 },
                { pot: 150, bet: 150 },
                { pot: 100, bet: 33 },
                { pot: 200, bet: 150 }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const mdf = Math.round((s.pot / (s.pot + s.bet)) * 100);

            return {
                question: `[MDF Calculation] Pot is $${s.pot}. Opponent bets $${s.bet}. What % of your range must you defend to prevent opponent from profiting with any bluff? (as %)`,
                answer: mdf,
                tolerance: 2,
                explanation: `MDF = Pot / (Pot + Bet) = $${s.pot} / ($${s.pot} + $${s.bet}) = $${s.pot} / $${s.pot + s.bet} = ${mdf}%. If you fold more than ${100 - mdf}%, opponent profits by bluffing any two cards.`
            };
        },

        // Q5: Pot Odds + Required Equity
        () => {
            const scenarios = [
                { pot: 200, bet: 100, draw: 'flush draw', outs: 9, cards: 1, profitable: false },
                { pot: 100, bet: 25, draw: 'flush draw', outs: 9, cards: 1, profitable: false },
                { pot: 100, bet: 50, draw: 'open-ended straight draw', outs: 8, cards: 1, profitable: false },
                { pot: 200, bet: 50, draw: 'flush draw', outs: 9, cards: 2, profitable: true },
                { pot: 100, bet: 100, draw: 'set draw', outs: 2, cards: 1, profitable: false }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const equityNeeded = Math.round((s.bet / (s.pot + s.bet)) * 100);
            const equityHave = s.outs * (s.cards === 2 ? 4 : 2);
            const callResult = s.profitable ? 'Yes' : 'No';

            return {
                question: `[Pot Odds] Pot is $${s.pot}. Opponent bets $${s.bet}. You have a ${s.draw} (${s.outs} outs) with ${s.cards} card${s.cards > 1 ? 's' : ''} to come. What equity do you need to call? (as %)`,
                answer: equityNeeded,
                tolerance: 1,
                explanation: `Equity needed = Bet / (Pot + Bet) = $${s.bet} / $${s.pot + s.bet} = ${equityNeeded}%. Your equity = ${s.outs} outs × ${s.cards === 2 ? 4 : 2} = ${equityHave}%. ${equityHave >= equityNeeded ? 'Profitable call — you have enough equity.' : 'Not profitable without implied odds — you need ' + equityNeeded + '% but only have ' + equityHave + '%.'}`
            };
        },

        // Q6: Blocker Identification
        () => {
            const scenarios = [
                { board: 'A♥K♥Q♥J♥2♦', hand: 'T♥8♣', answer: 'Favors bluffing', reason: 'T♥ blocks the royal flush and many nut flush combos. Villain less likely to have the nuts.' },
                { board: 'K♠Q♦J♣2♥7♦', hand: 'A♠T♦', answer: 'Favors bluffing', reason: 'AT blocks the nut straight (AK-QJ-T). Villain has fewer nut combos to call with.' },
                { board: '9♣8♣7♦2♥K♠', hand: '6♣5♣', answer: 'Neutral impact', reason: '6 blocks some straights but you also block flush draws. Mixed blocker effect.' },
                { board: 'A♠A♦K♥Q♣J♠', hand: 'A♣9♦', answer: 'Favors hero calling', reason: 'Holding an Ace blocks quads and most full houses. Villain\'s value range is reduced.' },
                { board: 'J♠T♠9♠2♦4♣', hand: 'Q♠8♦', answer: 'Favors bluffing', reason: 'Q♠ blocks nut flush, Q blocks top straight (KQ). Great bluff candidate.' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const answerToIndex = { 'Favors bluffing': 0, 'Favors hero calling': 1, 'Neutral impact': 2 };

            return {
                question: `[Blocker Analysis] Board: ${s.board}. You have ${s.hand}. How do your blockers affect the decision?`,
                type: 'choice',
                choices: ['Favors bluffing', 'Favors hero calling', 'Neutral impact'],
                correctIndex: answerToIndex[s.answer],
                explanation: `${s.answer}. ${s.reason}`
            };
        },

        // Q7: Range Advantage Identification
        () => {
            const scenarios = [
                { setup: 'BTN opens, BB calls', flop: 'K♠7♦2♣', advantage: 'Opener', reason: 'BTN has more Kx combos, overpairs (AA, KK, QQ). Dry board favors preflop aggressor.' },
                { setup: 'UTG opens, BTN calls', flop: 'A♥J♣T♦', advantage: 'Opener', reason: 'UTG has more AJ, AT, AA, AK in range. BTN flatting range is capped.' },
                { setup: 'BTN opens, BB calls', flop: '6♠5♣4♦', advantage: 'Caller', reason: 'BB defends many suited connectors like 76s, 54s, 87s. Low connected boards favor BB.' },
                { setup: 'CO opens, BB calls', flop: 'Q♦9♣3♠', advantage: 'Opener', reason: 'CO has more QQ, AQ, KQ in range. BB\'s range is weighted toward speculative hands.' },
                { setup: 'BTN opens, BB calls', flop: 'J♥T♣9♦', advantage: 'Caller', reason: 'BB defends many suited connectors and one-gappers (QT, 87, T8). Coordinated board.' },
                { setup: 'SB opens, BB calls', flop: 'A♦A♠5♣', advantage: 'Opener', reason: 'SB opens wider and has more Ax. Paired ace boards favor the aggressor.' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const answerToIndex = { 'Opener': 0, 'Caller': 1, 'Neither (roughly equal)': 2 };

            return {
                question: `[Range Advantage] ${s.setup}. Flop: ${s.flop}. Who has range advantage?`,
                type: 'choice',
                choices: ['Opener', 'Caller', 'Neither (roughly equal)'],
                correctIndex: answerToIndex[s.advantage],
                explanation: `${s.advantage} has range advantage. ${s.reason}`
            };
        },

        // Q8: BvB 3-Bet Range Assessment
        () => {
            const scenarios = [
                { hand: 'Q♠Q♦', action: '3-Bet', reason: 'QQ is top of the value 3-bet range vs SB open. Build the pot with a premium.' },
                { hand: 'A♣5♣', action: '3-Bet', reason: 'A5s is a standard 3-bet bluff — blocks strong aces, can make straights and flushes.' },
                { hand: 'K♦J♣', action: 'Call', reason: 'KJo is in the calling region — too strong to fold, but not strong enough to 3-bet for value.' },
                { hand: '7♥7♣', action: 'Call', reason: '77 is a call — set mining value, middling strength in the three-tier structure.' },
                { hand: 'A♦3♣', action: '3-Bet', reason: 'A3o is a polarized 3-bet bluff. Ace blocker, fold to 4-bet. Part of ~19% 3-bet range.' },
                { hand: 'A♠K♣', action: '3-Bet', reason: 'AKo is always 3-bet for value BvB. Top of range, want to build pot.' },
                { hand: 'T♦8♦', action: 'Call', reason: 'T8s is a playable suited connector in the flat calling range. Good postflop playability.' },
                { hand: 'K♣7♦', action: '3-Bet', reason: 'K7o is a polarized 3-bet bluff with a king blocker. Fold to 4-bet.' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const actionToIndex = { '3-Bet': 0, 'Call': 1, 'Fold': 2 };

            return {
                question: `[BvB Strategy] SB opens, you're in BB with ${s.hand}. 100BB effective. What is the GTO action?`,
                type: 'choice',
                choices: ['3-Bet', 'Call', 'Fold'],
                correctIndex: actionToIndex[s.action],
                explanation: `${s.action}. ${s.reason} BB 3-bet range vs SB is approximately 19% — split between value hands and polarized bluffs.`
            };
        },

        // Q9: Thin Value Betting Decision
        () => {
            const scenarios = [
                { hand: '9♠9♦', board: '7♠5♦4♣ → Q♦', action: 'Mostly bet', sizing: '75%', reason: '99 is still ahead of BB\'s check-call range. BB has few Qx combos — bet for value and protection.' },
                { hand: 'K♥8♦', board: 'K♣J♦6♥ → Q♦', action: 'Mostly check', sizing: '25-33%', reason: 'K8 is devalued on the Q turn. Many Qx now beat us. Consider small blocking bet or check.' },
                { hand: 'A♠J♦', board: 'A♥T♣3♦ → 7♠', action: 'Mostly bet', sizing: '66%', reason: 'TPTK is still strong. Bet for value against Tx, draws, and worse aces. Deny equity.' },
                { hand: 'Q♥Q♣', board: 'K♠9♦4♣ → 2♥', action: 'Mostly check', sizing: 'N/A', reason: 'QQ has become a bluff-catcher on K-high board. BB\'s continue range has many Kx. Check and evaluate river.' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const actionToIndex = { 'Always check': 0, 'Mostly check': 1, 'Mostly bet': 2, 'Always bet': 3 };

            return {
                question: `[Thin Value] BTN opens ${s.hand}, BB calls. Board: ${s.board}. BB checks. What is the best turn action?`,
                type: 'choice',
                choices: ['Always check', 'Mostly check', 'Mostly bet', 'Always bet'],
                correctIndex: actionToIndex[s.action],
                explanation: `${s.action}${s.sizing !== 'N/A' ? ' (~' + s.sizing + ' pot)' : ''}. ${s.reason}`
            };
        },

        // Q10: Stack Depth Preflop Adjustment
        () => {
            const scenarios = [
                { depth: '100BB', position: 'BB', villain: 'HJ', hand: 'A♠K♣', action: '3-Bet', reason: 'At 100BB, AKo is a standard 3-bet for value. We want to build the pot with a premium.' },
                { depth: '300BB', position: 'BB', villain: 'HJ', hand: 'A♠K♣', action: 'Call', reason: 'At 300BB, AKo has reverse implied odds — TPTK can lose big pots. Flatting keeps dominated hands in.' },
                { depth: '100BB', position: 'BTN', villain: 'CO', hand: 'J♥T♥', action: 'Call', reason: 'JTs has good implied odds at 100BB. Calling in position, looking to make big hands postflop.' },
                { depth: '200BB', position: 'BTN', villain: 'CO', hand: 'J♥T♥', action: 'Call', reason: 'JTs implied odds increase deep. Suited connectors love deep stacks — call.' },
                { depth: '100BB', position: 'BB', villain: 'BTN', hand: '9♦9♣', action: '3-Bet', reason: 'At 100BB, 99 is a mix of 3-bet and call. 3-betting is standard vs BTN.' },
                { depth: '300BB', position: 'BB', villain: 'BTN', hand: '9♦9♣', action: 'Call', reason: 'At 300BB, set mining EV increases. Avoid bloated pots — call and play postflop.' },
                { depth: '100BB', position: 'SB', villain: 'BTN', hand: 'K♠Q♠', action: '3-Bet', reason: 'KQs is a 3-bet at 100BB for value/protection. Standard squeeze spot.' },
                { depth: '300BB', position: 'SB', villain: 'BTN', hand: 'K♠Q♠', action: 'Call', reason: 'At 300BB, KQs has reverse implied odds with TPTK. Stack-to-pot ratio favors speculative play.' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];
            const actionToIndex = { '3-Bet': 0, 'Call': 1, 'Fold': 2 };

            return {
                question: `[Stack Depth] ${s.depth} effective. ${s.villain} opens, you're in ${s.position} with ${s.hand}. What is the optimal action?`,
                type: 'choice',
                choices: ['3-Bet', 'Call', 'Fold'],
                correctIndex: actionToIndex[s.action],
                explanation: `${s.action}. ${s.reason}`
            };
        },

        // Q11: Backdoor Draw Math
        () => {
            const scenarios = [
                { pot: 100, bet: 25, betPct: 25, hand: '5♦5♣', draw: 'backdoor flush draw', equityNeeded: 20, equityHave: 22, action: 'Call' },
                { pot: 100, bet: 33, betPct: 33, hand: '7♥7♦', draw: 'no backdoors', equityNeeded: 25, equityHave: 17, action: 'Fold' },
                { pot: 100, bet: 25, betPct: 25, hand: '8♦8♣', draw: 'backdoor flush draw', equityNeeded: 20, equityHave: 21, action: 'Call' },
                { pot: 100, bet: 33, betPct: 33, hand: '6♠6♣', draw: 'no backdoors', equityNeeded: 25, equityHave: 14, action: 'Fold' }
            ];
            const s = scenarios[Math.floor(Math.random() * scenarios.length)];

            return {
                question: `[Backdoor Math] Pot is $${s.pot}. Opponent c-bets $${s.bet} (${s.betPct}% pot). You have ${s.hand} with ${s.draw}. What equity do you need to continue? (as %)`,
                answer: s.equityNeeded,
                tolerance: 1,
                explanation: `Equity needed = $${s.bet} / $${s.pot + s.bet} = ${s.equityNeeded}%. Your equity breakdown: set draw (~8.5%), ${s.draw === 'no backdoors' ? 'no backdoor boost' : 'backdoor flush (~3-4%)'}, some showdown value. Total ≈ ${s.equityHave}%. ${s.equityHave >= s.equityNeeded ? 'Call — barely profitable with backdoor potential.' : 'Fold — insufficient equity without backdoors.'}`
            };
        }
    ]
};

// Subcategory mappings by category and question index
const SUBCATEGORY_MAP = {
    probability: ['basic_probability', 'basic_probability', 'expected_value', 'basic_probability', 'poker_hands', 'independent_events', 'pot_odds', 'bayes'],
    tvm: ['simple_interest', 'future_value', 'present_value', 'rule_of_72', 'npv', 'npv', 'perpetuity', 'real_vs_nominal'],
    gametheory: ['nash_equilibrium', 'nash_equilibrium', 'bluff_frequency', 'mdf', 'zero_sum', 'nash_equilibrium', 'auction_strategy', 'kelly_criterion'],
    stats: ['mean_median', 'mean_median', 'standard_deviation', 'standard_deviation', 'base_rate', 'base_rate', 'regression_mean', 'base_rate', 'weighted_average', 'weighted_return', 'altman_zscore', 'regression_mean', 'outs_equity'],
    combinatorics: ['factorial', 'permutations', 'combinations', 'combinations', 'counting', 'combinations', 'counting', 'counting'],
    mentalmath: ['multiplication', 'multiplication', 'division', 'division', 'percentage', 'percentage', 'percentage_change', 'basis_points', 'basis_points', 'multiplication', 'multiples', 'multiples', 'multiples', 'multiplication', 'percentage', 'margin', 'margin', 'margin', 'margin', 'dilution', 'dilution', 'irr_approximation', 'irr_approximation', 'percentage', 'percentage'],
    distressedcredit: ['dscr', 'leverage_stress', 'interest_coverage', 'bond_yield', 'cash_on_cash', 'lbo_moic'],
    poker_gto: ['preflop_position', 'three_bet_decision', 'bluff_frequency_poker', 'mdf_calculation', 'pot_odds_equity', 'blocker_identification', 'range_advantage', 'bvb_strategy', 'thin_value', 'stack_depth', 'small_bet_defense']
};

// Get a random question from a specific category or all
function getRandomQuestion(category = 'all') {
    let pool;
    let categoryKey = category;

    if (category === 'all') {
        pool = Object.values(Questions).flat();
    } else {
        pool = Questions[category] || [];
    }

    if (pool.length === 0) return null;

    const generatorIndex = Math.floor(Math.random() * pool.length);
    const generator = pool[generatorIndex];
    const question = generator();

    // Add category if not present
    if (!question.category) {
        const catEntry = Object.entries(Questions).find(([cat, gens]) =>
            gens.includes(generator)
        );
        if (catEntry) {
            question.category = catEntry[0];
            // Find generator index within that category
            const catIndex = catEntry[1].indexOf(generator);
            // Assign subcategory based on mapping
            const subcats = SUBCATEGORY_MAP[catEntry[0]];
            if (subcats && catIndex < subcats.length) {
                question.subcategory = subcats[catIndex];
            }
        } else {
            question.category = 'unknown';
        }
    }

    // If subcategory not set but we know the category, try to assign
    if (!question.subcategory && question.category && SUBCATEGORY_MAP[question.category]) {
        // For category-specific selection, use the generator index
        if (category !== 'all') {
            const subcats = SUBCATEGORY_MAP[question.category];
            if (subcats && generatorIndex < subcats.length) {
                question.subcategory = subcats[generatorIndex];
            }
        }
    }

    return question;
}

// Export for use in app.js
window.Questions = Questions;
window.getRandomQuestion = getRandomQuestion;
