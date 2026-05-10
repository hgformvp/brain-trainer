// ECON 3229 - Money, Banking & Financial Markets
// Practice questions drawn from exams and lecture slides
// All questions are multiple choice with explanations

const EconQuestions = [

    // ==========================================
    // BOND MARKETS & INTEREST RATES
    // ==========================================

    () => ({
        question: "If the federal government decreases its spending and doesn't decrease taxes, the bond supply shifts to the",
        type: 'choice',
        choices: [
            'A) right and the equilibrium interest rate rises.',
            'B) right and the equilibrium interest rate falls.',
            'C) left and the equilibrium interest rate rises.',
            'D) left and the equilibrium interest rate falls.'
        ],
        correctIndex: 3,
        explanation: 'Less government spending = less borrowing needed = fewer bonds issued → supply shifts LEFT. Less supply raises bond prices, which means lower interest rates.',
        category: 'econ'
    }),

    () => ({
        question: "The default risk premium is",
        type: 'choice',
        choices: [
            'A) relevant only for securities issued by very small companies.',
            'B) zero for corporate bonds, but quite substantial for corporate stock.',
            'C) constant across the business cycle.',
            'D) the additional yield a saver requires for holding a bond with some default risk.'
        ],
        correctIndex: 3,
        explanation: 'Default risk premium = extra interest rate compensation investors demand for taking on the risk that a borrower might not repay. It rises during recessions when default risk increases.',
        category: 'econ'
    }),

    () => ({
        question: "If the expected gains on stocks rise, while the expected returns on bonds do not change, then",
        type: 'choice',
        choices: [
            'A) the demand curve for bonds will shift to the right.',
            'B) the equilibrium interest rate will rise.',
            'C) the supply curve for loanable funds will shift to the right.',
            'D) the equilibrium interest rate will fall.'
        ],
        correctIndex: 1,
        explanation: 'Higher expected stock returns make bonds relatively less attractive → investors shift out of bonds → bond demand falls → bond prices fall → interest rates RISE.',
        category: 'econ'
    }),

    () => ({
        question: "The bond supply curve slopes up because",
        type: 'choice',
        choices: [
            'A) the borrower is willing and able to offer more bonds when the price of the bond is high.',
            'B) the lender is willing and able to offer more bonds when the price of the bond is low.',
            'C) when bond prices are high, inflation is high.',
            'D) interest rates rise as bond prices rise.'
        ],
        correctIndex: 0,
        explanation: 'When bond prices are high (= low interest rates), it\'s cheap to borrow, so corporations and governments want to issue MORE bonds. Higher price → more quantity supplied → upward slope.',
        category: 'econ'
    }),

    () => ({
        question: "What is the return on a 5% coupon bond that initially sells for $1,000 and sells for $900 next year?",
        type: 'choice',
        choices: [
            'A) -5 percent',
            'B) 5 percent',
            'C) -10 percent',
            'D) 10 percent'
        ],
        correctIndex: 0,
        explanation: 'Return = (coupon + capital gain) / initial price = ($50 + ($900 - $1,000)) / $1,000 = ($50 - $100) / $1,000 = -$50 / $1,000 = -5%.',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following $1,000 face-value securities has the highest yield to maturity?",
        type: 'choice',
        choices: [
            'A) A 5% coupon bond selling for $1,000',
            'B) A 12% coupon bond selling for $1,000',
            'C) A 12% coupon bond selling for $1,100',
            'D) A 10% coupon bond selling for $1,000'
        ],
        correctIndex: 1,
        explanation: 'A 12% coupon at par means YTM = 12%. The 12% coupon at $1,100 has a YTM < 12% (premium bond). Options A and D have 5% and 10% YTMs. So 12% at par (B) is highest.',
        category: 'econ'
    }),

    () => ({
        question: "The ________ is below the coupon rate when the bond price is ________ its par value.",
        type: 'choice',
        choices: [
            'A) yield to maturity; above',
            'B) discount rate; below',
            'C) discount rate; above',
            'D) yield to maturity; below'
        ],
        correctIndex: 0,
        explanation: 'When a bond sells at a PREMIUM (price > par), the YTM is LOWER than the coupon rate. The investor is paying more than face value, so the effective return is diluted.',
        category: 'econ'
    }),

    () => ({
        question: "A consol paying $20 annually when the interest rate is 5% has a price of",
        type: 'choice',
        choices: [
            'A) $100',
            'B) $200',
            'C) $400',
            'D) $800'
        ],
        correctIndex: 2,
        explanation: 'Consol price = coupon / interest rate = $20 / 0.05 = $400. A consol pays forever, so its price is simply the annual payment divided by the current interest rate.',
        category: 'econ'
    }),

    () => ({
        question: "When the yield curve is downward-sloping,",
        type: 'choice',
        choices: [
            'A) short-term yields are higher than long-term yields.',
            'B) the inflation rate is expected to rise.',
            'C) the bond market is anticipating the U.S. Treasury may default.',
            'D) long-term yields are higher than short-term yields.'
        ],
        correctIndex: 0,
        explanation: 'A downward-sloping (inverted) yield curve means short-term interest rates are HIGHER than long-term rates. It typically signals an expected economic slowdown or falling future rates.',
        category: 'econ'
    }),

    () => ({
        question: "If the nominal interest rate is 2% and expected inflation is -10%, what is the real interest rate?",
        type: 'choice',
        choices: [
            'A) -8%',
            'B) -12%',
            'C) 8%',
            'D) 12%'
        ],
        correctIndex: 3,
        explanation: 'Fisher equation: real rate = nominal rate - expected inflation = 2% - (-10%) = 2% + 10% = 12%. When deflation is expected, the real rate is much higher than nominal.',
        category: 'econ'
    }),

    // ==========================================
    // TERM STRUCTURE & YIELD CURVES
    // ==========================================

    () => ({
        question: "According to the liquidity premium theory, what does a flat yield curve indicate?",
        type: 'choice',
        choices: [
            'A) Long-term interest rates are expected to fall.',
            'B) Short-term interest rates are expected to remain stable.',
            'C) Short-term interest rates are expected to fall.',
            'D) Short-term interest rates are expected to rise.'
        ],
        correctIndex: 2,
        explanation: 'Under liquidity premium theory, long-term rates include a positive term premium. For the curve to appear FLAT despite this upward push, short-term rates must be expected to FALL enough to offset it.',
        category: 'econ'
    }),

    () => ({
        question: "A one-year bond pays 5%, expected to pay 4.5% next year and 4% in year 3. The 2-year term premium is 0.2% and 3-year is 0.35%. What is the 2-year bond rate (liquidity premium theory)?",
        type: 'choice',
        choices: [
            'A) 4.975%',
            'B) 4.75%',
            'C) 4.95%',
            'D) 4.5%'
        ],
        correctIndex: 2,
        explanation: '2-yr rate = average of 1-yr rates + term premium = (5% + 4.5%) / 2 + 0.2% = 4.75% + 0.2% = 4.95%.',
        category: 'econ'
    }),

    () => ({
        question: "If the current rates on 1-yr, 2-yr, and 3-yr bonds are 1%, 1.5%, and 2.0%, what is the expected 1-yr rate two years from now? (Expectations Theory)",
        type: 'choice',
        choices: [
            'A) 1%',
            'B) 2%',
            'C) 3%',
            'D) 4%'
        ],
        correctIndex: 2,
        explanation: 'Under expectations theory: 3-yr rate = avg of three 1-yr rates. So 2% = (1% + 1-yr rate next year + 1-yr rate in year 3) / 3. We know 2% = (1% + expected 2-yr avg). Solving: the 1-yr rate 2 years from now = 3%.',
        category: 'econ'
    }),

    // ==========================================
    // FEDERAL RESERVE & MONETARY POLICY
    // ==========================================

    () => ({
        question: "What is the length of a term for the Chairman of the Board of Governors?",
        type: 'choice',
        choices: [
            'A) 14 years',
            'B) 28 years',
            'C) one year',
            'D) four years'
        ],
        correctIndex: 3,
        explanation: 'The Fed Chair serves a 4-year term (renewable). Board of Governors members serve full 14-year terms, but the Chair role within that is 4 years.',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following is a LIABILITY of the Fed?",
        type: 'choice',
        choices: [
            'A) discount loans to banks',
            'B) checkable deposits in commercial banks',
            'C) U.S. government securities',
            'D) currency in circulation'
        ],
        correctIndex: 3,
        explanation: 'Currency in circulation is a Fed LIABILITY (it\'s money the Fed owes). Discount loans and U.S. securities are Fed ASSETS. Checkable deposits at commercial banks are not on the Fed\'s balance sheet.',
        category: 'econ'
    }),

    () => ({
        question: "Members of the Board of Governors are",
        type: 'choice',
        choices: [
            'A) elected by the district bank presidents.',
            'B) appointed by the SEC, subject to congressional veto.',
            'C) appointed by the National Monetary Commission.',
            'D) appointed by the President, subject to confirmation by the Senate.'
        ],
        correctIndex: 3,
        explanation: 'Board of Governors members are appointed by the President of the United States and confirmed by the Senate. They serve 14-year nonrenewable terms.',
        category: 'econ'
    }),

    () => ({
        question: "The political business cycle theory predicts that",
        type: 'choice',
        choices: [
            'A) political factors over which the Fed has no control are most important.',
            'B) the Fed acts to promote the interests of the general public.',
            'C) the President\'s appointments will usually be politicians.',
            'D) the Fed acts to stimulate economic activity before an election.'
        ],
        correctIndex: 3,
        explanation: 'Political business cycle theory: the Fed may stimulate the economy (lower rates, expand money supply) before elections to help incumbent politicians, suggesting Fed policy can be politically influenced.',
        category: 'econ'
    }),

    () => ({
        question: "The main argument in favor of Fed independence is that",
        type: 'choice',
        choices: [
            'A) the Constitution requires it.',
            'B) congressional control was tried in the 1960s and failed.',
            'C) interest rates would be lower if Congress controlled the Fed.',
            'D) monetary policy is too important and technical to be determined in the political arena.'
        ],
        correctIndex: 3,
        explanation: 'The case for Fed independence: monetary policy requires technical expertise and long-term thinking, which is undermined if politicians can manipulate it for short-term electoral gain.',
        category: 'econ'
    }),

    () => ({
        question: "The beige book is prepared by",
        type: 'choice',
        choices: [
            'A) FOMC staff members.',
            'B) Board of Governors.',
            'C) district banks.',
            'D) commerce department.'
        ],
        correctIndex: 2,
        explanation: 'The Beige Book is prepared by the 12 district (regional) Federal Reserve banks and summarizes economic conditions in each district. The Green Book is the national forecast prepared by Board of Governors staff.',
        category: 'econ'
    }),

    () => ({
        question: "The national economic forecast prepared by the staff of the Board of Governors is published in the",
        type: 'choice',
        choices: [
            'A) Fed book.',
            'B) beige book.',
            'C) blue book.',
            'D) green book.'
        ],
        correctIndex: 3,
        explanation: 'Green Book = national economic forecast by Board of Governors staff. Beige Book = regional economic summary by district banks. Blue Book = monetary policy alternatives.',
        category: 'econ'
    }),

    () => ({
        question: "Members of Federal Reserve district bank boards of directors who are bankers are known as",
        type: 'choice',
        choices: [
            'A) Class A directors.',
            'B) Class B directors.',
            'C) Class C directors.',
            'D) Class D directors.'
        ],
        correctIndex: 0,
        explanation: 'Class A directors represent commercial banks (bankers). Class B directors represent the public (non-bankers, non-bank employees). Class C directors are appointed by the Board of Governors.',
        category: 'econ'
    }),

    // ==========================================
    // MONEY SUPPLY & BANKING MECHANICS
    // ==========================================

    () => ({
        question: "If banks hold no excess reserves, checkable deposits = $1.5B, currency = $400M, required reserve ratio = 10%, what is the monetary base?",
        type: 'choice',
        choices: [
            'A) $1.9 billion',
            'B) $550 million',
            'C) $1.54 billion',
            'D) $15 billion'
        ],
        correctIndex: 1,
        explanation: 'MB = Currency + Reserves. Required reserves = 10% × $1.5B = $150M. MB = $400M + $150M = $550M.',
        category: 'econ'
    }),

    () => ({
        question: "A bank has no excess reserves. It receives a $10,000 cash deposit. Required reserve ratio = 20%. Maximum amount it can lend out?",
        type: 'choice',
        choices: [
            'A) $8,000',
            'B) $50,000',
            'C) $2,000',
            'D) $10,000'
        ],
        correctIndex: 0,
        explanation: 'Required reserves = 20% × $10,000 = $2,000. The bank must keep $2,000 and can lend out $10,000 - $2,000 = $8,000.',
        category: 'econ'
    }),

    () => ({
        question: "If currency = $500M, checkable deposits = $2B, reserves = $200M, required reserve ratio = 0.10, the money multiplier equals",
        type: 'choice',
        choices: [
            'A) 3.57',
            'B) 4.35',
            'C) 5',
            'D) 1.14'
        ],
        correctIndex: 0,
        explanation: 'c = currency/deposits = 500/2000 = 0.25. e = excess reserves/deposits = (200 - 200)/2000 = 0 (since required = 10% × 2000 = 200). m = (1+c)/(rr+e+c) = 1.25 / (0.10 + 0 + 0.25) = 1.25/0.35 = 3.57.',
        category: 'econ'
    }),

    () => ({
        question: "Why didn't the 2008-2012 surge in monetary base lead to a similar surge in money supply?",
        type: 'choice',
        choices: [
            'A) Nonborrowed reserves declined, offsetting the increase.',
            'B) The excess reserve-deposit ratio rose significantly, shrinking the money multiplier.',
            'C) The currency-deposit ratio rose significantly, shrinking the multiplier.',
            'D) The Fed increased the required reserve ratio.'
        ],
        correctIndex: 1,
        explanation: 'Banks hoarded excess reserves (earning interest on them) instead of lending. The excess reserve ratio spiked dramatically, collapsing the money multiplier. More base money didn\'t flow into loans and deposits.',
        category: 'econ'
    }),

    () => ({
        question: "If the Fed purchases $1 million of securities and the required reserve ratio is 8%, by how much will deposits increase?",
        type: 'choice',
        choices: [
            'A) rise by $12.5 million',
            'B) rise by $8 million',
            'C) decline by $1 million',
            'D) rise by $1 million'
        ],
        correctIndex: 0,
        explanation: 'Simple deposit multiplier = 1/rr = 1/0.08 = 12.5. Fed injects $1M into reserves → deposits can expand by $1M × 12.5 = $12.5 million.',
        category: 'econ'
    }),

    () => ({
        question: "A bank has $200,000 checkable deposits, 20% reserve ratio, holds $80,000 in reserves. Maximum deposit outflow it can sustain without altering its balance sheet?",
        type: 'choice',
        choices: [
            'A) $50,000',
            'B) $40,000',
            'C) $30,000',
            'D) $25,000'
        ],
        correctIndex: 0,
        explanation: 'Excess reserves = actual reserves - required = $80,000 - (20% × $200,000) = $80,000 - $40,000 = $40,000. Max outflow = excess reserves / reserve ratio = $40,000 / 0.80 = $50,000.',
        category: 'econ'
    }),

    () => ({
        question: "The size of the money multiplier depends on all of the following EXCEPT",
        type: 'choice',
        choices: [
            'A) the discount rate.',
            'B) the required reserve ratio.',
            'C) the currency-deposit ratio.',
            'D) excess reserves relative to deposits.'
        ],
        correctIndex: 0,
        explanation: 'The money multiplier formula m = (1+c)/(rr+e+c) depends on rr (required reserve ratio), e (excess reserve ratio), and c (currency-deposit ratio). The discount rate is a policy tool but doesn\'t directly enter the multiplier formula.',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following is NOT included in M1?",
        type: 'choice',
        choices: [
            'A) savings account deposits',
            'B) currency',
            'C) traveler\'s checks',
            'D) checking account deposits'
        ],
        correctIndex: 0,
        explanation: 'M1 = currency + demand deposits (checking) + traveler\'s checks. Savings accounts are in M2 but NOT M1. M2 = M1 + savings + small time deposits + money market accounts.',
        category: 'econ'
    }),

    () => ({
        question: "If a bank has a capital-to-asset ratio of 0.1 and a return on assets of 1%, what is its return on equity?",
        type: 'choice',
        choices: [
            'A) 10%',
            'B) 20%',
            'C) 0.2%',
            'D) 2.1%'
        ],
        correctIndex: 0,
        explanation: 'ROE = ROA / (capital-to-asset ratio) = 1% / 0.10 = 10%. Leverage amplifies returns — a bank with only 10% equity is leveraged 10:1.',
        category: 'econ'
    }),

    // ==========================================
    // OPEN MARKET OPERATIONS & FED FUNDS RATE
    // ==========================================

    () => ({
        question: "In the market for reserves, when fed funds rate = 3%, lowering the discount rate from 5% to 4%",
        type: 'choice',
        choices: [
            'A) lowers the federal funds rate.',
            'B) raises the federal funds rate.',
            'C) has no effect on the federal funds rate.',
            'D) has an indeterminate effect.'
        ],
        correctIndex: 2,
        explanation: 'When the federal funds rate (3%) is BELOW the discount rate (4% after cut), banks still don\'t use the discount window — it\'s still more expensive. The discount rate only binds when the fed funds rate reaches it, so no effect here.',
        category: 'econ'
    }),

    () => ({
        question: "In the reserves market, increases in the discount rate affect the federal funds rate only",
        type: 'choice',
        choices: [
            'A) when the funds rate is below the discount rate.',
            'B) when demand intersects the vertical section of the supply curve.',
            'C) when the funds rate equals the discount rate.',
            'D) when the demand for federal funds equals zero.'
        ],
        correctIndex: 2,
        explanation: 'The discount rate creates a CEILING for the fed funds rate. It only affects the fed funds rate when the two are equal — at that point, raising the discount rate raises the ceiling and can raise the fed funds rate.',
        category: 'econ'
    }),

    () => ({
        question: "In the market for reserves, an open market SALE decreases supply, causing the federal funds rate to",
        type: 'choice',
        choices: [
            'A) decrease; decrease',
            'B) increases; decrease',
            'C) decreases; increase',
            'D) increases; increase'
        ],
        correctIndex: 2,
        explanation: 'Open market sale = Fed sells securities → banks pay with reserves → reserve supply DECREASES → with less supply, fed funds rate INCREASES (price of borrowing reserves goes up).',
        category: 'econ'
    }),

    () => ({
        question: "When the federal funds rate equals the discount rate",
        type: 'choice',
        choices: [
            'A) the demand curve for reserves is vertical.',
            'B) the supply curve of reserves is horizontal.',
            'C) the demand curve for reserves is horizontal.',
            'D) the supply curve of reserves is vertical.'
        ],
        correctIndex: 1,
        explanation: 'When fed funds rate = discount rate, banks can borrow unlimited reserves from the Fed at that rate → the reserve supply curve becomes perfectly HORIZONTAL at the discount rate (elastic supply).',
        category: 'econ'
    }),

    () => ({
        question: "Increasing interest rate paid on excess reserves from 1% to 2% when fed funds rate is 1%",
        type: 'choice',
        choices: [
            'A) lowers the federal funds rate.',
            'B) raises the federal funds rate.',
            'C) has no effect on the federal funds rate.',
            'D) has an indeterminate effect.'
        ],
        correctIndex: 1,
        explanation: 'The interest on excess reserves (IOER) sets a FLOOR for the fed funds rate. Raising it from 1% to 2% raises this floor, causing the federal funds rate to rise to the new floor level.',
        category: 'econ'
    }),

    () => ({
        question: "FOMC raises its federal funds rate target. The appropriate Fed action is a ________ open market ________",
        type: 'choice',
        choices: [
            'A) dynamic; sale',
            'B) defensive; purchase',
            'C) defensive; sale',
            'D) dynamic; purchase'
        ],
        correctIndex: 0,
        explanation: 'Dynamic OMOs are intended to CHANGE the level of reserves. To raise the fed funds rate, the Fed conducts a dynamic open market SALE (reducing reserves → higher borrowing cost).',
        category: 'econ'
    }),

    () => ({
        question: "The commitment by the Fed to keep the federal funds rate at zero for a long period is intended to",
        type: 'choice',
        choices: [
            'A) increase short-term interest rates.',
            'B) lower long-term interest rates.',
            'C) increase long-term interest rates.',
            'D) lower short-term interest rates.'
        ],
        correctIndex: 1,
        explanation: 'Under expectations theory, long-term rates = average of expected future short-term rates. By credibly committing to keep short-term rates at zero, the Fed lowers the average and thus LOWERS long-term rates.',
        category: 'econ'
    }),

    () => ({
        question: "An open market purchase increases the ________ of reserves, causing the federal funds rate to fall",
        type: 'choice',
        choices: [
            'A) increases; demand',
            'B) decreases; supply',
            'C) decreases; demand',
            'D) increases; supply'
        ],
        correctIndex: 3,
        explanation: 'Fed open market purchase = Fed buys securities, paying with new reserves → reserve SUPPLY increases → more supply at same demand → fed funds rate falls.',
        category: 'econ'
    }),

    // ==========================================
    // EXCHANGE RATES & INTERNATIONAL FINANCE
    // ==========================================

    () => ({
        question: "When a central bank buys foreign assets,",
        type: 'choice',
        choices: [
            'A) composition of liabilities changes, assets unaffected.',
            'B) composition of assets changes, liabilities unaffected.',
            'C) assets and liabilities rise by the same amount.',
            'D) assets and liabilities fall by the same amount.'
        ],
        correctIndex: 2,
        explanation: 'Buying foreign assets = central bank pays with domestic currency (newly created reserves). Foreign assets on the asset side rise; currency/reserves on the liability side also rise → BOTH sides increase equally.',
        category: 'econ'
    }),

    () => ({
        question: "The theory of purchasing power parity cannot fully explain exchange rates because",
        type: 'choice',
        choices: [
            'A) some goods are not traded between countries.',
            'B) all goods are identical even if produced in different countries.',
            'C) monetary policy differs across countries.',
            'D) fiscal policy differs across countries.'
        ],
        correctIndex: 0,
        explanation: 'PPP assumes all goods are tradable. But many goods (haircuts, real estate, local services) can\'t be easily traded across borders. Their price differences persist without triggering the arbitrage that PPP requires.',
        category: 'econ'
    }),

    () => ({
        question: "A decrease in the expected future domestic exchange rate causes demand for domestic assets to ________ and the domestic currency to ________",
        type: 'choice',
        choices: [
            'A) decrease; appreciate',
            'B) increase; appreciate',
            'C) increase; depreciate',
            'D) decrease; depreciate'
        ],
        correctIndex: 3,
        explanation: 'If people expect the domestic currency to weaken in the future, domestic assets become less attractive now → demand for domestic assets DECREASES → currency DEPRECIATES today.',
        category: 'econ'
    }),

    () => ({
        question: "Under fixed exchange rates, if domestic currency is undervalued (above par), the central bank must sell ________ and buy ________",
        type: 'choice',
        choices: [
            'A) domestic; foreign',
            'B) foreign; foreign',
            'C) foreign; domestic',
            'D) domestic; domestic'
        ],
        correctIndex: 0,
        explanation: 'If domestic currency is above par (overvalued), the central bank must SELL domestic currency (increase supply) to push the exchange rate back to par, accumulating foreign assets in the process.',
        category: 'econ'
    }),

    () => ({
        question: "If Canada's inflation = 4%, Mexico's inflation = 2%, PPP predicts the Canadian dollar vs. Mexican peso will",
        type: 'choice',
        choices: [
            'A) fall by 6%.',
            'B) rise by 6%.',
            'C) rise by 2%.',
            'D) fall by 2%.'
        ],
        correctIndex: 3,
        explanation: 'PPP: currency of higher-inflation country depreciates. Canada (4%) vs Mexico (2%) → Canada\'s dollar depreciates by the inflation differential = 4% - 2% = 2%. The Canadian dollar FALLS by 2%.',
        category: 'econ'
    }),

    () => ({
        question: "Under the ERM, when the British pound depreciated below its lower limit against the German mark, Bank of England was required to buy ________ and sell ________",
        type: 'choice',
        choices: [
            'A) pounds; marks; gaining reserves',
            'B) marks; pounds; gaining reserves',
            'C) marks; pounds; losing reserves',
            'D) pounds; marks; losing reserves'
        ],
        correctIndex: 3,
        explanation: 'When pound fell too far, Bank of England had to BUY pounds (support demand) by SELLING marks (spending reserves). This intervention results in LOSING international reserves.',
        category: 'econ'
    }),

    () => ({
        question: "If Fed enacts expansionary policy, this will cause demand for U.S. assets to ________ and the dollar to ________",
        type: 'choice',
        choices: [
            'A) decrease; depreciate',
            'B) increase; depreciate',
            'C) decrease; appreciate',
            'D) increase; appreciate'
        ],
        correctIndex: 0,
        explanation: 'Expansionary policy lowers U.S. interest rates → U.S. assets less attractive to investors → demand for U.S. assets DECREASES → dollar DEPRECIATES.',
        category: 'econ'
    }),

    () => ({
        question: "When a country's nominal exchange rate depreciates, the price of that country's goods abroad",
        type: 'choice',
        choices: [
            'A) decreases.',
            'B) increases.',
            'C) goods produced at home decreases.',
            'D) foreign goods sold there decreases.'
        ],
        correctIndex: 0,
        explanation: 'Currency depreciation makes domestic goods CHEAPER for foreign buyers. If the dollar weakens, U.S. goods cost less in foreign currencies → price of U.S. goods abroad DECREASES → exports become more competitive.',
        category: 'econ'
    }),

    () => ({
        question: "The Fed sells $1B of Bank of Japan securities and buys $1B of U.S. Treasury securities. This is",
        type: 'choice',
        choices: [
            'A) a sterilized foreign-exchange intervention.',
            'B) an unsterilized foreign-exchange intervention.',
            'C) monetary base declines $1B.',
            'D) monetary base rises $1B.'
        ],
        correctIndex: 0,
        explanation: 'STERILIZED intervention: the foreign exchange operation is offset by an opposite domestic open market operation (buying U.S. Treasuries). Net effect: monetary base unchanged. Sterilized = neutralized.',
        category: 'econ'
    }),

    () => ({
        question: "A sale of foreign assets by a central bank has the same effect on the monetary base as",
        type: 'choice',
        choices: [
            'A) an open market SALE of government bonds.',
            'B) a decrease in the discount rate.',
            'C) an open market PURCHASE of government bonds.',
            'D) a decrease in the required reserve ratio.'
        ],
        correctIndex: 0,
        explanation: 'Selling foreign assets = central bank receives foreign currency, takes domestic currency out of circulation → monetary base DECREASES. This is identical to an open market SALE of domestic bonds.',
        category: 'econ'
    }),

    () => ({
        question: "An unsterilized intervention where the central bank sells foreign assets to buy domestic currency results in",
        type: 'choice',
        choices: [
            'A) higher domestic interest rates.',
            'B) lower domestic interest rates and more money supply.',
            'C) an increase in money supply.',
            'D) lower domestic interest rates.'
        ],
        correctIndex: 0,
        explanation: 'Selling foreign assets = reduces monetary base = contracts money supply = RAISES domestic interest rates. Unsterilized = the monetary base actually changes (not offset).',
        category: 'econ'
    }),

    () => ({
        question: "If the Fed wants to REDUCE the value of the dollar, it will",
        type: 'choice',
        choices: [
            'A) sell foreign assets and buy dollars.',
            'B) buy foreign assets and also buy dollars.',
            'C) sell dollars and buy foreign assets.',
            'D) sell foreign assets and also sell dollars.'
        ],
        correctIndex: 2,
        explanation: 'To WEAKEN the dollar, the Fed must SELL dollars (increase dollar supply) and buy foreign assets. More dollars in circulation lowers their value, causing the dollar to depreciate.',
        category: 'econ'
    }),

    () => ({
        question: "PPP: Toyota Camry in Japan = ¥2,000,000; in U.S. = $20,000; exchange rate = 120 yen/$. The dollar is _______ and should _______ in the long run.",
        type: 'choice',
        choices: [
            'A) overvalued; depreciate',
            'B) overvalued; appreciate',
            'C) undervalued; depreciate',
            'D) undervalued; appreciate'
        ],
        correctIndex: 0,
        explanation: 'PPP price: $20,000 × 120 yen/$ = ¥2,400,000, but Japan price is only ¥2,000,000. The car costs more in dollar terms → dollar is OVERVALUED. PPP predicts dollar will DEPRECIATE until prices equalize.',
        category: 'econ'
    }),

    () => ({
        question: "If U.S. interest rates rise, investors ________ demand for dollars and the exchange rate ________",
        type: 'choice',
        choices: [
            'A) increase; appreciates',
            'B) increase; depreciates',
            'C) decrease; depreciates',
            'D) decrease; appreciates'
        ],
        correctIndex: 0,
        explanation: 'Higher U.S. interest rates → U.S. assets more attractive → foreign investors buy more dollars to invest → dollar demand INCREASES → dollar APPRECIATES.',
        category: 'econ'
    }),

    () => ({
        question: "Under a fixed exchange rate, if a country has an overvalued exchange rate, its central bank's attempt to prevent depreciation will result in a ________ of international reserves.",
        type: 'choice',
        choices: [
            'A) loss',
            'B) gain',
            'C) neither gain nor loss',
            'D) gain then loss'
        ],
        correctIndex: 0,
        explanation: 'Overvalued currency → market wants to sell domestic currency. Central bank must BUY domestic (to prop it up) by SPENDING foreign reserves. This causes a LOSS of international reserves.',
        category: 'econ'
    }),

    // ==========================================
    // FINANCIAL MARKETS & INSTITUTIONS
    // ==========================================

    () => ({
        question: "Which of the following is NOT a financial intermediary?",
        type: 'choice',
        choices: [
            'A) insurance company',
            'B) mutual fund',
            'C) stock exchange',
            'D) bank'
        ],
        correctIndex: 2,
        explanation: 'A stock exchange is a marketplace where securities are traded — it connects buyers and sellers but does NOT borrow from savers to lend to borrowers. Financial intermediaries actually channel funds between savers and borrowers.',
        category: 'econ'
    }),

    () => ({
        question: "Underwriting involves",
        type: 'choice',
        choices: [
            'A) selling stock more cheaply than conventional stockbrokers.',
            'B) issuing stock to buy bonds.',
            'C) insuring the life or health of individuals.',
            'D) guaranteeing a price for new capital to the issuing firm.'
        ],
        correctIndex: 3,
        explanation: 'Underwriting = investment bank GUARANTEES a minimum price for a new security issuance. The investment bank buys all the shares and resells them to the public, taking on the pricing risk.',
        category: 'econ'
    }),

    () => ({
        question: "If a bank grants you a mortgage, the mortgage is",
        type: 'choice',
        choices: [
            'A) a liability to you and a liability to the bank.',
            'B) an asset to you, but a liability to the bank.',
            'C) an asset to you and an asset to the bank.',
            'D) a liability to you, but an asset to the bank.'
        ],
        correctIndex: 3,
        explanation: 'You owe the mortgage → it\'s your LIABILITY. The bank is owed money → the mortgage is the bank\'s ASSET. Assets and liabilities are always mirror images across parties.',
        category: 'econ'
    }),

    () => ({
        question: "Funds flow from lenders to borrowers",
        type: 'choice',
        choices: [
            'A) directly through financial intermediaries.',
            'B) indirectly through financial intermediaries.',
            'C) primarily through government agencies.',
            'D) indirectly through financial markets.'
        ],
        correctIndex: 1,
        explanation: 'Through intermediaries like banks = INDIRECT finance (bank collects deposits, then makes loans). Through financial markets (bonds, stocks) = DIRECT finance (borrowers reach savers directly). This question asks about the intermediary path → indirect.',
        category: 'econ'
    }),

    () => ({
        question: "The result of the too-big-to-fail policy is that ________ banks will take on ________ risks",
        type: 'choice',
        choices: [
            'A) small; greater',
            'B) small; fewer',
            'C) big; fewer',
            'D) big; greater'
        ],
        correctIndex: 3,
        explanation: 'Too-big-to-fail creates MORAL HAZARD: large banks know they\'ll be bailed out → take on GREATER risks. The safety net removes the normal market discipline that would punish reckless behavior.',
        category: 'econ'
    }),

    () => ({
        question: "When secondary market buyers and sellers of securities meet in one central location, the market is called a(n)",
        type: 'choice',
        choices: [
            'A) over-the-counter market.',
            'B) barter market.',
            'C) exchange.',
            'D) common market.'
        ],
        correctIndex: 2,
        explanation: 'An EXCHANGE (like NYSE) is a centralized location where buyers and sellers meet to trade. An OTC market has dealers buying and selling from their own inventory at their own prices with no central location.',
        category: 'econ'
    }),

    () => ({
        question: "Which investment caused the Reserve Primary Fund to incur heavy losses?",
        type: 'choice',
        choices: [
            'A) mortgage-backed securities',
            'B) real estate investment trusts',
            'C) commercial paper issued by Lehman Brothers',
            'D) commercial paper issued by Bear Stearns'
        ],
        correctIndex: 2,
        explanation: 'The Reserve Primary Fund (a money market fund) held commercial paper issued by Lehman Brothers. When Lehman failed in 2008, this paper became worthless, causing the fund to "break the buck" — drop below $1/share.',
        category: 'econ'
    }),

    () => ({
        question: "The Glass-Steagall Act was designed to",
        type: 'choice',
        choices: [
            'A) promote the interests of community banks.',
            'B) promote mergers in the banking industry.',
            'C) legally separate investment banking from commercial banking.',
            'D) impose high capital ratios on investment banks.'
        ],
        correctIndex: 2,
        explanation: 'Glass-Steagall (1933) legally SEPARATED commercial banking from investment banking after the Great Depression. The idea: keep depositor-funded banks from gambling in securities markets.',
        category: 'econ'
    }),

    () => ({
        question: "The McFadden Act of 1927",
        type: 'choice',
        choices: [
            'A) separated commercial from investment banking.',
            'B) prohibited national banks from branching outside their home states.',
            'C) established the Federal Reserve System.',
            'D) taxed issuance of bank notes by state banks.'
        ],
        correctIndex: 1,
        explanation: 'McFadden Act (1927) prohibited national banks from operating branches across state lines, keeping banking fragmented. This was largely repealed by the Riegle-Neal Act of 1994.',
        category: 'econ'
    }),

    () => ({
        question: "Which assigns widely-followed bond ratings?",
        type: 'choice',
        choices: [
            'A) Securities and Exchange Commission',
            'B) IBM',
            'C) Federal Reserve',
            'D) Standard & Poor\'s Corporation'
        ],
        correctIndex: 3,
        explanation: 'Standard & Poor\'s (S&P), Moody\'s, and Fitch are the major credit rating agencies. They rate the default risk of bonds. Higher rating = lower default risk = lower yield required.',
        category: 'econ'
    }),

    () => ({
        question: "Dodd-Frank rules on the shadow banking system include all EXCEPT",
        type: 'choice',
        choices: [
            'A) securitized loans must now be insured.',
            'B) firms selling mortgage-backed securities must hold 5% of credit risk.',
            'C) large hedge funds must register with the SEC.',
            'D) some derivative trading must take place on exchanges.'
        ],
        correctIndex: 0,
        explanation: 'Dodd-Frank requires: 5% credit risk retention (skin in the game), hedge fund SEC registration, and exchange trading of derivatives. It does NOT require that securitized loans be insured.',
        category: 'econ'
    }),

    () => ({
        question: "A bank panic occurs when",
        type: 'choice',
        choices: [
            'A) a bank lacks sufficient funds to make loans.',
            'B) a bank worries its loans won\'t be repaid.',
            'C) an individual bank can\'t meet reserve requirements.',
            'D) many banks experience a bank run simultaneously.'
        ],
        correctIndex: 3,
        explanation: 'Bank panic = systemic event where MANY banks face runs at the same time. An individual bank run is one bank in trouble. A panic is the contagion spreading to many banks, threatening the whole financial system.',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following is considered default-risk-free?",
        type: 'choice',
        choices: [
            'A) a three-month Treasury bill',
            'B) a ten-year bond issued by Intel',
            'C) a share of stock issued by Google',
            'D) three-month commercial paper issued by GE'
        ],
        correctIndex: 0,
        explanation: 'U.S. Treasury securities are considered DEFAULT-RISK-FREE because the U.S. government can always print money or raise taxes to pay its obligations. Corporate bonds and commercial paper carry default risk.',
        category: 'econ'
    }),

    () => ({
        question: "Banks have a maturity mismatch since",
        type: 'choice',
        choices: [
            'A) some loans are short-term while others are long-term.',
            'B) they borrow long-term, but lend short-term.',
            'C) they borrow short-term, but lend long-term.',
            'D) some borrowings are short-term while others are long-term.'
        ],
        correctIndex: 2,
        explanation: 'Maturity mismatch: banks borrow SHORT-TERM (deposits that can be withdrawn anytime) but lend LONG-TERM (30-year mortgages). This creates vulnerability — if depositors all withdraw at once, the bank can\'t immediately liquidate long-term loans.',
        category: 'econ'
    }),

    // ==========================================
    // ASYMMETRIC INFORMATION & RISK
    // ==========================================

    () => ({
        question: "Which is an example of ADVERSE SELECTION?",
        type: 'choice',
        choices: [
            'A) Brother-in-law borrows $20K for a pizza parlor, spends it gambling instead.',
            'B) A man with a bad heart condition buys a large life insurance policy.',
            'C) A homeowner with fire insurance lets her house wiring deteriorate.',
            'D) A woman with life insurance takes up sky diving.'
        ],
        correctIndex: 1,
        explanation: 'Adverse selection happens BEFORE the transaction: high-risk people (sick man, bad heart) are most eager to buy insurance. The insurer can\'t distinguish them → ends up with riskier pool than expected. Options A, C, D are moral hazard (behavior changes AFTER getting coverage/loan).',
        category: 'econ'
    }),

    () => ({
        question: "The assumption of asymmetric information means that",
        type: 'choice',
        choices: [
            'A) lenders know more than borrowers.',
            'B) borrowers know more than lenders.',
            'C) both parties have perfect information.',
            'D) both parties have the same information.'
        ],
        correctIndex: 1,
        explanation: 'Asymmetric information: BORROWERS know more about their own creditworthiness and intentions than LENDERS do. This creates adverse selection (before) and moral hazard (after) problems.',
        category: 'econ'
    }),

    () => ({
        question: "The shadow banking system refers to",
        type: 'choice',
        choices: [
            'A) pawn shops and payday loan institutions.',
            'B) community banks.',
            'C) nonbank financial institutions such as investment banks and hedge funds.',
            'D) commercial banks.'
        ],
        correctIndex: 2,
        explanation: 'Shadow banking = financial institutions that perform bank-like functions (borrowing short, lending long, leveraging) but without bank regulation or deposit insurance. Includes investment banks, hedge funds, and money market funds.',
        category: 'econ'
    }),

    // ==========================================
    // MONEY & PAYMENTS SYSTEM
    // ==========================================

    () => ({
        question: "Fiat money",
        type: 'choice',
        choices: [
            'A) is illegal in most advanced industrial countries.',
            'B) will generally be accepted in trade for less than its face value.',
            'C) is usually some type of precious metal.',
            'D) is money that would have no value if it were not usable as money.'
        ],
        correctIndex: 3,
        explanation: 'Fiat money (our paper dollars) has NO INTRINSIC VALUE — it\'s not backed by gold or anything physical. It only has value because the government declares it legal tender and people accept it.',
        category: 'econ'
    }),

    () => ({
        question: "The problem of a double coincidence of wants refers to",
        type: 'choice',
        choices: [
            'A) the necessity in barter of each trading partner wanting what the other has.',
            'B) the insatiability of wants in a free market economy.',
            'C) poorly-managed companies producing what consumers want only by coincidence.',
            'D) the likelihood that needs will not be the same as wants.'
        ],
        correctIndex: 0,
        explanation: 'In barter, trade requires BOTH parties to want what the other offers simultaneously. This is very inefficient. Money eliminates this problem — you accept money even if the seller doesn\'t want your specific goods.',
        category: 'econ'
    }),

    () => ({
        question: "How many Federal Reserve districts are there?",
        type: 'choice',
        choices: [
            'A) 12',
            'B) 2',
            'C) 50',
            'D) 1'
        ],
        correctIndex: 0,
        explanation: 'There are 12 Federal Reserve districts (regional banks) across the U.S., including New York, Boston, Chicago, San Francisco, etc. New York Fed is the most powerful, conducting most OMOs.',
        category: 'econ'
    }),

    () => ({
        question: "The Fed sells $10 million of securities to a commercial bank. The Fed\'s balance sheet shows",
        type: 'choice',
        choices: [
            'A) decrease in securities of $10M and decrease in bank reserves of $10M.',
            'B) increase in securities of $10M and decrease in reserves of $10M.',
            'C) decrease in securities of $10M and increase in reserves of $10M.',
            'D) increase in securities of $10M and increase in reserves of $10M.'
        ],
        correctIndex: 0,
        explanation: 'Fed SELLS securities → loses the securities (asset down $10M) → receives payment from bank\'s reserves (bank\'s reserve account at Fed decreases by $10M, which is a liability of the Fed). Both sides down $10M.',
        category: 'econ'
    }),

    () => ({
        question: "Currently, a 3-yr Treasury note pays 4.75%. Your federal income tax rate is 20%. Minimum rate needed on a tax-free municipal bond to choose it instead?",
        type: 'choice',
        choices: [
            'A) 3.8%',
            'B) 15.25%',
            'C) 0.95%',
            'D) 5.7%'
        ],
        correctIndex: 0,
        explanation: 'After-tax T-bond yield = 4.75% × (1 - 0.20) = 4.75% × 0.80 = 3.8%. You\'d choose the muni only if it pays AT LEAST 3.8% (the after-tax equivalent).',
        category: 'econ'
    }),

    () => ({
        question: "Commodity money can best be described as",
        type: 'choice',
        choices: [
            'A) money used to purchase agricultural products.',
            'B) a good used as money that also has value independent of its use as money.',
            'C) the form of money used in a barter system.',
            'D) standardized goods like gold that trade in a financial market.'
        ],
        correctIndex: 1,
        explanation: 'Commodity money has INTRINSIC VALUE beyond its use as currency — gold, silver, and livestock have value for other purposes. This distinguishes it from fiat money (value only from government decree).',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following is NOT a bank liability?",
        type: 'choice',
        choices: [
            'A) borrowings from the Federal Reserve',
            'B) checkable deposits',
            'C) mortgage loans',
            'D) CDs'
        ],
        correctIndex: 2,
        explanation: 'MORTGAGE LOANS are a bank ASSET (the bank is owed money). Deposits (checkable, CDs) and Fed borrowings are bank LIABILITIES — the bank owes that money back.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 2 — BANK MANAGEMENT & CAPITAL
    // ==========================================

    () => ({
        question: "If a bank's capital-to-asset ratio is 0.1 and its return on assets is 2%, what is its return on equity?",
        type: 'choice',
        choices: [
            'A) 0.05%',
            'B) 20%',
            'C) 0.2%',
            'D) 21%'
        ],
        correctIndex: 1,
        explanation: 'Formula: ROE = ROA ÷ capital-to-asset ratio = 2% ÷ 0.10 = 20%. A bank with only 10 cents of equity per $1 of assets is leveraged 10-to-1, amplifying returns (and losses).',
        category: 'econ'
    }),

    () => ({
        question: "Lower the bank's asset-to-capital ratio,",
        type: 'choice',
        choices: [
            'A) safer the bank is.',
            'B) higher its leverage is.',
            'C) more exposed to insolvency it is.',
            'D) higher its ROE is for every dollar return on its assets.'
        ],
        correctIndex: 0,
        explanation: 'Asset-to-capital ratio = leverage ratio. LOWER leverage (fewer assets per dollar of equity) means the bank has more of its own money cushioning losses → SAFER. High leverage means small losses can wipe out equity.',
        category: 'econ'
    }),

    () => ({
        question: "Bank loans from the Federal Reserve are called ________ and represent a ________ for a bank",
        type: 'choice',
        choices: [
            'A) discount loans; assets',
            'B) fed funds; liability',
            'C) fed funds; assets',
            'D) discount loans; liability'
        ],
        correctIndex: 3,
        explanation: 'Discount loans = borrowings from the Fed\'s discount window. When a bank borrows from the Fed, it OWES that money back → it\'s a bank LIABILITY. (Fed funds are interbank loans, not Fed loans.)',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following involves banks borrowing funds using Treasury securities as collateral?",
        type: 'choice',
        choices: [
            'A) repurchase agreement',
            'B) counterparty lending',
            'C) federal funds',
            'D) money market account'
        ],
        correctIndex: 0,
        explanation: 'Repurchase agreement (repo): bank sells a Treasury security and agrees to buy it back later at a higher price — effectively a short-term collateralized loan. The Treasury security is the collateral.',
        category: 'econ'
    }),

    () => ({
        question: "Under the purchase-and-assumption method of dealing with a failed bank, the FDIC",
        type: 'choice',
        choices: [
            'A) sells the failed bank to the Federal Reserve.',
            'B) takes over day-to-day management of the bank.',
            'C) finds another bank to take over the insolvent bank.',
            'D) sells off the profitable loans in an open auction.'
        ],
        correctIndex: 2,
        explanation: 'Purchase-and-assumption: the FDIC arranges for a healthy bank to ACQUIRE the failed bank, taking on both its assets and its deposit liabilities. Depositors are protected and the bank continues operating under new ownership.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 2 — MONEY SUPPLY & MULTIPLIER
    // ==========================================

    () => ({
        question: "An increase in the excess reserves ratio causes the M1 money multiplier to ________ and the money supply to ________.",
        type: 'choice',
        choices: [
            'A) decrease; increase',
            'B) increase; decrease',
            'C) decrease; decrease',
            'D) increase; increase'
        ],
        correctIndex: 2,
        explanation: 'Formula: m = (1+c) ÷ (rr+e+c). A higher excess reserve ratio (e) increases the denominator → multiplier DECREASES. Smaller multiplier × same monetary base = SMALLER money supply.',
        category: 'econ'
    }),

    () => ({
        question: "If reserves increase by $200 billion, checkable deposits will increase by $2 trillion when the required reserve ratio is",
        type: 'choice',
        choices: [
            'A) 0.20',
            'B) 0.10',
            'C) 0.01',
            'D) 0.25'
        ],
        correctIndex: 1,
        explanation: 'Simple deposit multiplier = 1 ÷ rr. We need $200B × (1/rr) = $2,000B → 1/rr = 10 → rr = 0.10 (10%). Check: $200B ÷ 0.10 = $2,000B = $2 trillion. ✓',
        category: 'econ'
    }),

    () => ({
        question: "If required reserve ratio = 5%, currency = $200B, checkable deposits = $1,000B, excess reserves = $20B, what is the money multiplier?",
        type: 'choice',
        choices: [
            'A) 2.0',
            'B) 4.54',
            'C) 6',
            'D) 4.44'
        ],
        correctIndex: 3,
        explanation: 'Formula: m = (1+c) ÷ (rr+e+c). c = 200/1000 = 0.20. e = 20/1000 = 0.02. rr = 0.05. m = (1+0.20) ÷ (0.05+0.02+0.20) = 1.20 ÷ 0.27 = 4.44.',
        category: 'econ'
    }),

    () => ({
        question: "If required reserve ratio = 10%, currency = $4,000B, checkable deposits = $16,000B, the currency-deposit ratio is",
        type: 'choice',
        choices: [
            'A) 0.33',
            'B) 0.25',
            'C) 0.375',
            'D) 2.5'
        ],
        correctIndex: 1,
        explanation: 'Formula: c = currency ÷ checkable deposits = $4,000B ÷ $16,000B = 0.25. The currency-deposit ratio tells us how much cash people hold relative to their bank deposits.',
        category: 'econ'
    }),

    () => ({
        question: "If required reserve ratio = 0, currency = $600B, checkable deposits = $1,800B, reserve-to-deposit ratio = 0.5, what is the monetary base?",
        type: 'choice',
        choices: [
            'A) $1,500 billion',
            'B) $2,100 billion',
            'C) $1,200 billion',
            'D) $2,400 billion'
        ],
        correctIndex: 0,
        explanation: 'Formula: MB = currency + reserves. Reserves = reserve-to-deposit ratio × deposits = 0.5 × $1,800B = $900B. MB = $600B + $900B = $1,500B.',
        category: 'econ'
    }),

    () => ({
        question: "The money multiplier is",
        type: 'choice',
        choices: [
            'A) positively related to holdings of excess reserves.',
            'B) negatively related to high-powered money.',
            'C) negatively related to the required reserve ratio.',
            'D) positively related to the excess reserves ratio.'
        ],
        correctIndex: 2,
        explanation: 'Formula: m = (1+c) ÷ (rr+e+c). A higher required reserve ratio (rr) increases the denominator → multiplier FALLS. More reserves held per dollar of deposits = less lending = smaller money supply created.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 2 — FEDERAL RESERVE STRUCTURE
    // ==========================================

    () => ({
        question: "Which of the following is NOT considered part of the Federal Reserve System?",
        type: 'choice',
        choices: [
            'A) Federal Reserve banks',
            'B) Board of Governors',
            'C) Federal Deposit Insurance Corporation',
            'D) Federal Open Market Committee'
        ],
        correctIndex: 2,
        explanation: 'The FDIC is a SEPARATE government agency that insures bank deposits — it is NOT part of the Federal Reserve. The Fed consists of: 12 district banks, Board of Governors, and FOMC.',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following is NOT an activity carried out by Federal Reserve district banks?",
        type: 'choice',
        choices: [
            'A) examining member banks',
            'B) making discount loans',
            'C) setting discount rate',
            'D) issuing new Federal Reserve Notes'
        ],
        correctIndex: 2,
        explanation: 'District banks recommend the discount rate, but the Board of Governors officially SETS it. District banks do examine member banks, make discount loans, and issue currency.',
        category: 'econ'
    }),

    () => ({
        question: "The Dodd-Frank Act removed which group from decisions regarding the presidents of Federal Reserve Banks?",
        type: 'choice',
        choices: [
            'A) Class C directors',
            'B) Class B directors',
            'C) Board of Governors',
            'D) Class A directors'
        ],
        correctIndex: 3,
        explanation: 'Dodd-Frank removed CLASS A directors (the bankers) from voting on Fed bank president appointments to reduce banker influence over the Fed\'s leadership selection.',
        category: 'econ'
    }),

    () => ({
        question: "Under the European System of Central Banks, the Executive Board is similar in structure to the ________ of the Federal Reserve System.",
        type: 'choice',
        choices: [
            'A) Board of Governors',
            'B) Federal Advisory Council',
            'C) Federal Open Market Committee',
            'D) Federal Reserve Banks'
        ],
        correctIndex: 0,
        explanation: 'The ECB\'s Executive Board (sets and executes monetary policy for the eurozone) is structurally analogous to the Fed\'s Board of Governors — both are the central governing/policy-setting body.',
        category: 'econ'
    }),

    () => ({
        question: "The interest rate on interbank loans is called the",
        type: 'choice',
        choices: [
            'A) repo rate.',
            'B) prime rate.',
            'C) discount rate.',
            'D) federal funds rate.'
        ],
        correctIndex: 3,
        explanation: 'Federal funds rate = the rate banks charge each other for overnight loans of reserves. The discount rate is what the Fed charges banks. The prime rate is what banks charge their best corporate customers.',
        category: 'econ'
    }),

    () => ({
        question: "Loans by the Federal Reserve to banks are known as",
        type: 'choice',
        choices: [
            'A) discount loans.',
            'B) cash items in process of collection.',
            'C) repurchase agreements.',
            'D) federal funds.'
        ],
        correctIndex: 0,
        explanation: 'Discount loans = the Fed lending directly to banks through the discount window at the discount rate. Federal funds are bank-to-bank loans. These are two separate borrowing channels.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 2 — BANKING REGULATION & HISTORY
    // ==========================================

    () => ({
        question: "The legislation that overturned the prohibition on interstate banking is",
        type: 'choice',
        choices: [
            'A) the Gramm-Leach-Bliley Act of 1998.',
            'B) the McFadden Act of 1927.',
            'C) the Riegle-Neal Act of 1994.',
            'D) the Glass-Steagall Act of 1933.'
        ],
        correctIndex: 2,
        explanation: 'Riegle-Neal Act (1994) allowed banks to branch across state lines, effectively overturning the McFadden Act\'s restrictions. This led to massive consolidation in U.S. banking.',
        category: 'econ'
    }),

    () => ({
        question: "The legislation overturning the Glass-Steagall Act is",
        type: 'choice',
        choices: [
            'A) the Garn-St. Germain Act of 1982.',
            'B) the Riegle-Neal Act of 1994.',
            'C) the Gramm-Leach-Bliley Act of 1999.',
            'D) the McFadden Act of 1927.'
        ],
        correctIndex: 2,
        explanation: 'Gramm-Leach-Bliley Act (1999) repealed Glass-Steagall, allowing commercial banks, investment banks, and insurance companies to merge and compete freely. Many argue this contributed to the 2008 crisis.',
        category: 'econ'
    }),

    () => ({
        question: "The Glass-Steagall Act of 1933",
        type: 'choice',
        choices: [
            'A) prohibited interstate branching.',
            'B) prohibited commercial banks from engaging in investment banking.',
            'C) required federally chartered banks to meet state branching restrictions.',
            'D) eliminated the FDIC.'
        ],
        correctIndex: 1,
        explanation: 'Glass-Steagall (1933) built a firewall between commercial banking (taking deposits, making loans) and investment banking (underwriting securities). It was passed after the Great Depression to prevent risky speculation with depositor money.',
        category: 'econ'
    }),

    () => ({
        question: "The Glass-Steagall Act that required separation of commercial and investment banking was repealed in",
        type: 'choice',
        choices: [
            'A) the Monetary Control Act.',
            'B) the Federal Reserve Act.',
            'C) the Glass-Steagall Act.',
            'D) the Gramm-Leach-Bliley Act of 1999.'
        ],
        correctIndex: 3,
        explanation: 'Gramm-Leach-Bliley (1999) repealed the Glass-Steagall separation. This allowed financial holding companies to combine commercial banking, investment banking, and insurance under one roof.',
        category: 'econ'
    }),

    () => ({
        question: "The legislation that prohibited banks from branching across state lines and forced national banks to conform to state branching regulations is the",
        type: 'choice',
        choices: [
            'A) McFadden Act.',
            'B) National Bank Act.',
            'C) Garn-St. Germain Act.',
            'D) Glass-Steagall Act.'
        ],
        correctIndex: 0,
        explanation: 'McFadden Act (1927) prohibited national banks from branching outside their home state, keeping U.S. banking fragmented. This was reversed by the Riegle-Neal Act of 1994.',
        category: 'econ'
    }),

    () => ({
        question: "Which law banned most proprietary trading by commercial banks?",
        type: 'choice',
        choices: [
            'A) Regulation Q',
            'B) Consumer Financial Protection Bureau',
            'C) Greenspan rule',
            'D) Volcker rule'
        ],
        correctIndex: 3,
        explanation: 'Volcker Rule (part of Dodd-Frank, 2010) prohibits banks from proprietary trading — betting their own capital on securities markets. Named after former Fed Chair Paul Volcker, who championed it.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 2 — ASYMMETRIC INFORMATION & CRISIS
    // ==========================================

    () => ({
        question: "A problem for equity contracts is a particular type of ________ called the ________ problem.",
        type: 'choice',
        choices: [
            'A) moral hazard; principal-agent',
            'B) moral hazard; free-rider',
            'C) adverse selection; free-rider',
            'D) adverse selection; principal-agent'
        ],
        correctIndex: 0,
        explanation: 'Principal-agent problem: managers (agents) may pursue their own interests rather than shareholders\' (principals) interests AFTER the investment is made. This is moral hazard — behavior changes once the contract is signed.',
        category: 'econ'
    }),

    () => ({
        question: "Which is an example of MORAL HAZARD?",
        type: 'choice',
        choices: [
            'A) Amy buys health insurance when she notices chest pains (adverse selection).',
            'B) Depositors not checking their bank\'s financial health because of deposit insurance.',
            'C) Carol buys flood insurance after learning a hurricane is approaching.',
            'D) Tom adds comprehensive insurance before tornado season.'
        ],
        correctIndex: 1,
        explanation: 'Moral hazard = behavior changes AFTER getting coverage. Depositors stop monitoring banks once they know FDIC will cover them → banks can take more risk without depositors pulling funds. Options A, C, D are adverse selection (high-risk people buying insurance).',
        category: 'econ'
    }),

    () => ({
        question: "________ is a process of bundling together smaller loans into standard debt securities.",
        type: 'choice',
        choices: [
            'A) Debt deflation',
            'B) Origination',
            'C) Distribution',
            'D) Securitization'
        ],
        correctIndex: 3,
        explanation: 'Securitization: pool many individual loans (mortgages, car loans) → bundle them into a single tradable security (like a mortgage-backed security). Allows banks to sell off loans and free up capital for more lending.',
        category: 'econ'
    }),

    () => ({
        question: "When loan values drop, net worth of financial institutions falls causing them to cut back on lending in a process called",
        type: 'choice',
        choices: [
            'A) deleveraging.',
            'B) capitulation.',
            'C) deflation.',
            'D) releveraging.'
        ],
        correctIndex: 0,
        explanation: 'Deleveraging: falling asset values erode equity → to restore capital ratios, banks reduce their balance sheets by cutting lending → less credit in the economy → further economic slowdown. This is a dangerous feedback loop.',
        category: 'econ'
    }),

    () => ({
        question: "The growth of the subprime mortgage market led to",
        type: 'choice',
        choices: [
            'A) decreased home ownership as investors chose other assets.',
            'B) increased demand for houses and helped fuel the boom in housing prices.',
            'C) decreased demand as less credit-worthy borrowers couldn\'t get mortgages.',
            'D) a decline in the housing industry due to higher default risk.'
        ],
        correctIndex: 1,
        explanation: 'Subprime lending expanded the pool of homebuyers → more demand for housing → prices rose. This created the bubble. When subprime borrowers defaulted in large numbers, housing prices collapsed.',
        category: 'econ'
    }),

    () => ({
        question: "According to the WSJ article, what were structural causes of the failures of SVB and First Republic Bank in 2023?",
        type: 'choice',
        choices: [
            'A) Both held long-term securities that lost value when the Fed hiked rates.',
            'B) Neither bank was protected by FDIC insurance.',
            'C) Fears of recession triggered panicked depositors.',
            'D) Both made risky investments in real estate and Bitcoin.'
        ],
        correctIndex: 0,
        explanation: 'SVB and FRB held large portfolios of long-term bonds and mortgage-backed securities. When the Fed rapidly hiked rates in 2022-23, those bond values plummeted → unrealized losses → depositor panic → bank runs. Classic maturity mismatch problem.',
        category: 'econ'
    }),

    () => ({
        question: "Which investment bank was acquired by Bank of America during the 2007-09 financial crisis?",
        type: 'choice',
        choices: [
            'A) Merrill Lynch',
            'B) Bear Stearns',
            'C) Goldman Sachs',
            'D) Lehman Brothers'
        ],
        correctIndex: 0,
        explanation: 'Merrill Lynch was acquired by Bank of America in September 2008. Bear Stearns was taken over by JPMorgan Chase (also with Fed backing) in March 2008. Lehman Brothers filed for bankruptcy.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 2 — FINANCIAL MARKETS & STRUCTURE
    // ==========================================

    () => ({
        question: "Which of the following is the most important source of EXTERNAL financing for corporations?",
        type: 'choice',
        choices: [
            'A) mortgages',
            'B) stock market',
            'C) retained earnings',
            'D) bond market'
        ],
        correctIndex: 3,
        explanation: 'The bond (debt) market is the largest source of external financing for corporations — far larger than equity issuance. Note: retained earnings are INTERNAL financing, not external.',
        category: 'econ'
    }),

    () => ({
        question: "Why are corporations more likely to raise funds externally by debt instead of equity?",
        type: 'choice',
        choices: [
            'A) interest rates tend to be lower than dividend rates',
            'B) to avoid paying dividends',
            'C) transactions costs tend to be higher in the stock market',
            'D) moral hazard is less of a problem with debt contracts'
        ],
        correctIndex: 3,
        explanation: 'Debt contracts reduce moral hazard: bondholders get fixed payments regardless of what management does, and can trigger bankruptcy if unpaid. Equity gives managers more discretion (agency problem). Debt imposes discipline.',
        category: 'econ'
    }),

    () => ({
        question: "By bundling share purchases together, mutual funds can take advantage of economies of scale to lower",
        type: 'choice',
        choices: [
            'A) adverse selection.',
            'B) diversification.',
            'C) moral hazard.',
            'D) transactions costs.'
        ],
        correctIndex: 3,
        explanation: 'Economies of scale: a mutual fund pooling millions of investors can trade in large blocks, spreading brokerage commissions and fixed costs across many investors → lower transactions costs per investor.',
        category: 'econ'
    }),

    () => ({
        question: "Too much deposits in banks, without ability to convert them into loans, may",
        type: 'choice',
        choices: [
            'A) increase tax liability of the banks.',
            'B) reduce bank profitability.',
            'C) reduce amount of liquidity banks have available.',
            'D) exacerbate informational asymmetries banks face.'
        ],
        correctIndex: 1,
        explanation: 'Banks earn profits by lending out deposits at higher rates than they pay depositors. If deposits flood in but loan demand is weak (or regulations restrict lending), banks earn low returns on idle funds → REDUCED profitability.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — TERM STRUCTURE CALCULATIONS
    // ==========================================

    () => ({
        question: "1-yr, 2-yr, and 3-yr rates today are 3.6%, 3.7%, and 3.8%. What is the expected 1-yr rate two years from now? (Expectations Theory)",
        type: 'choice',
        choices: [
            'A) 4 percent.',
            'B) 2.4 percent.',
            'C) 3.75 percent.',
            'D) 3.7 percent.'
        ],
        correctIndex: 0,
        explanation: 'Step 1 — find expected 1-yr rate next year: 3.7% = (3.6% + i₂ᵉ) / 2 → i₂ᵉ = 3.8%. Step 2 — find rate two years from now: 3.8% = (3.6% + 3.8% + i₃ᵉ) / 3 → i₃ᵉ = 11.4% − 7.4% = 4.0%.',
        category: 'econ'
    }),

    () => ({
        question: "A one-year bond pays 3.0%, expected 3.1% next year, 3.15% year after. 2-yr term premium = 0.1%, 3-yr = 0.2%. What is the 3-yr bond rate? (Liquidity Premium Theory)",
        type: 'choice',
        choices: [
            'A) 3.5%',
            'B) 3.28%',
            'C) 3.38%',
            'D) 3.08%'
        ],
        correctIndex: 1,
        explanation: 'Formula: n-yr rate = avg of expected 1-yr rates + term premium. Avg = (3.0% + 3.1% + 3.15%) / 3 = 9.25% / 3 = 3.083%. 3-yr rate = 3.083% + 0.2% = 3.283% ≈ 3.28%.',
        category: 'econ'
    }),

    () => ({
        question: "1-yr and 2-yr bonds pay 4.7% and 4.9%. 2-yr term premium = 0.15%. What is the expected 1-yr rate next year? (Liquidity Premium Theory)",
        type: 'choice',
        choices: [
            'A) 3.15%',
            'B) 4.95%',
            'C) 4.5%',
            'D) 4.8%'
        ],
        correctIndex: 3,
        explanation: 'Formula: 4.9% = (4.7% + iᵉ) / 2 + 0.15%. Subtract premium: 4.75% = (4.7% + iᵉ) / 2. Multiply by 2: 9.5% = 4.7% + iᵉ. Solve: iᵉ = 4.8%.',
        category: 'econ'
    }),

    () => ({
        question: "1-yr and 2-yr rates are both 4%. Market expects 1-yr rate to fall by 0.6 percentage points next year. What is the 2-yr term premium? (Liquidity Premium Theory)",
        type: 'choice',
        choices: [
            'A) 3.5 percent.',
            'B) 0.3 percent.',
            'C) 2 percent.',
            'D) 1 percent.'
        ],
        correctIndex: 1,
        explanation: 'Expected 1-yr next year = 4% − 0.6% = 3.4%. Formula: 2-yr rate = (i₁ + i₂ᵉ) / 2 + lp₂. Plug in: 4% = (4% + 3.4%) / 2 + lp₂ = 3.7% + lp₂. Solve: lp₂ = 0.3%.',
        category: 'econ'
    }),

    () => ({
        question: "According to the liquidity premium theory, the yield curve normally has a positive slope because",
        type: 'choice',
        choices: [
            'A) long-term bonds are more liquid than short-term bonds.',
            'B) term premiums rise as the time to maturity increases.',
            'C) short-term interest rates are expected to rise.',
            'D) risk premiums rise over time.'
        ],
        correctIndex: 1,
        explanation: 'Investors prefer shorter maturities (more liquid, less price risk) → they demand a TERM PREMIUM to hold longer bonds. This premium grows with maturity, creating the typical upward slope even when rates are expected to stay flat.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — BOND PRICING CALCULATIONS
    // ==========================================

    () => ({
        question: "A $500 face-value discount bond maturing in one year sells for $400. What is its yield to maturity?",
        type: 'choice',
        choices: [
            'A) 8.7 percent.',
            'B) 20 percent.',
            'C) 6.7 percent.',
            'D) 25 percent.'
        ],
        correctIndex: 3,
        explanation: 'Formula: YTM = (Face value − Price) / Price = ($500 − $400) / $400 = $100 / $400 = 25%.',
        category: 'econ'
    }),

    () => ({
        question: "What is the price of a 1-year coupon bond with 6% coupon rate, $1,000 face value, and YTM of 2%?",
        type: 'choice',
        choices: [
            'A) $980',
            'B) $1,039.2',
            'C) $980.6',
            'D) $1,060'
        ],
        correctIndex: 1,
        explanation: 'Formula: P = (Coupon + Face value) / (1 + YTM) = ($60 + $1,000) / 1.02 = $1,060 / 1.02 = $1,039.22. Low YTM (2%) relative to coupon (6%) → bond trades at a premium.',
        category: 'econ'
    }),

    () => ({
        question: "What is the YTM of a $100 face-value, 6% coupon bond maturing in one year selling for $101?",
        type: 'choice',
        choices: [
            'A) 1.5%',
            'B) 5%',
            'C) 4.95%',
            'D) 6%'
        ],
        correctIndex: 2,
        explanation: 'Formula: YTM = (Coupon + Face − Price) / Price = ($6 + $100 − $101) / $101 = $5 / $101 = 4.95%. Price above par → YTM below coupon rate.',
        category: 'econ'
    }),

    () => ({
        question: "If a perpetuity (consol bond) has coupon payments of $30 and a price of $2,000, what is its yield?",
        type: 'choice',
        choices: [
            'A) 6%',
            'B) 450%',
            'C) 15%',
            'D) 1.5%'
        ],
        correctIndex: 3,
        explanation: 'Formula: Consol yield = Coupon / Price = $30 / $2,000 = 0.015 = 1.5%. The consol pays forever, so price is simply the annual coupon divided by the required yield.',
        category: 'econ'
    }),

    () => ({
        question: "You buy a 3-yr $1,000 FV 4.4% coupon bond for $960. Next year rates drop to 3%. What is the selling price and 1-yr rate of return?",
        type: 'choice',
        choices: [
            'A) $1,011; 9.5%',
            'B) $1,026.79; 11.5%',
            'C) $1,011; 9.9%',
            'D) $1,026.79; 11.08%'
        ],
        correctIndex: 1,
        explanation: 'After 1 year, 2 years remain. Price = $44/1.03 + $1,044/1.03² = $42.72 + $984.07 = $1,026.79. Rate of return = (coupon + capital gain) / initial price = ($44 + $66.79) / $960 = $110.79 / $960 ≈ 11.5%.',
        category: 'econ'
    }),

    () => ({
        question: "Which $1,000 face-value security has the highest YTM?",
        type: 'choice',
        choices: [
            'A) $100 FV, 4% coupon, price $90',
            'B) $1,000 FV, 3.5% coupon, price $1,000',
            'C) $1,000 FV, 2% coupon, price $1,020',
            'D) $2,000 FV, 3.5% coupon, price $2,080'
        ],
        correctIndex: 0,
        explanation: 'A: YTM ≈ (coupon + discount) / price = ($4 + $10) / $90 ≈ 15.6%. B: YTM = 3.5% (at par). C: premium bond → YTM < 2%. D: premium bond → YTM < 3.5%. Option A wins by far.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — TAX & RISK PREMIUM CALCULATIONS
    // ==========================================

    () => ({
        question: "2-yr Treasury pays 3.4%. Federal income tax = 35%, state income tax = 15%. Minimum rate needed on a tax-free municipal bond?",
        type: 'choice',
        choices: [
            'A) 2.72%',
            'B) 2.21%',
            'C) 1.7%',
            'D) 1.32%'
        ],
        correctIndex: 2,
        explanation: 'Combined tax rate = federal + state = 35% + 15% = 50%. Formula: muni minimum = taxable rate × (1 − total tax rate) = 3.4% × (1 − 0.50) = 3.4% × 0.50 = 1.7%.',
        category: 'econ'
    }),

    () => ({
        question: "Federal income tax rate = 42%. 10-yr Treasury yield = 4.2%, 10-yr muni yield = 3.4%. What is the tax-adjusted risk premium on the muni?",
        type: 'choice',
        choices: [
            'A) -0.8%.',
            'B) 0.8%.',
            'C) 0.912%.',
            'D) 0.964%.'
        ],
        correctIndex: 3,
        explanation: 'Formula: after-tax Treasury yield = 4.2% × (1 − 0.42) = 4.2% × 0.58 = 2.436%. Risk premium = muni yield − after-tax T-bond yield = 3.4% − 2.436% = 0.964%.',
        category: 'econ'
    }),

    () => ({
        question: "President Obama increased the top federal income tax rate. This predicts ________ yields on munis and ________ yields on T-bonds.",
        type: 'choice',
        choices: [
            'A) lower; higher',
            'B) higher; lower',
            'C) higher; higher',
            'D) lower; lower'
        ],
        correctIndex: 0,
        explanation: 'Higher tax rates increase the value of tax-exempt munis → muni demand rises → muni prices rise → muni yields FALL. Simultaneously, investors shift out of taxable T-bonds → T-bond prices fall → T-bond yields RISE.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — FISHER EFFECT & INFLATION
    // ==========================================

    () => ({
        question: "If the real interest rate is -0.5% and the nominal interest rate is 4.2%, what is the expected inflation rate?",
        type: 'choice',
        choices: [
            'A) 4.2%.',
            'B) 4.7%.',
            'C) -3.7%.',
            'D) 3.7%.'
        ],
        correctIndex: 1,
        explanation: 'Fisher equation: nominal = real + expected inflation. Rearranged: expected inflation = nominal − real = 4.2% − (−0.5%) = 4.7%.',
        category: 'econ'
    }),

    () => ({
        question: "Nominal interest rates are lower than real interest rates as long as",
        type: 'choice',
        choices: [
            'A) expected inflation is positive.',
            'B) the government taxes interest income.',
            'C) long-term rates are higher than short-term rates.',
            'D) expected inflation is negative.'
        ],
        correctIndex: 3,
        explanation: 'Fisher equation: nominal = real + expected inflation. If expected inflation is NEGATIVE (deflation expected), then nominal = real + (negative number) → nominal < real.',
        category: 'econ'
    }),

    () => ({
        question: "Assuming constant velocity, if real GDP growth = 2.2% and inflation = -0.4%, what must be the change in money supply? (Quantity Theory)",
        type: 'choice',
        choices: [
            'A) -2.5%',
            'B) -2.6%',
            'C) 1.8%',
            'D) 2.6%'
        ],
        correctIndex: 2,
        explanation: 'Quantity theory: ΔM + ΔV = π + ΔY. With constant velocity (ΔV = 0): ΔM = π + ΔY = −0.4% + 2.2% = 1.8%.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — BOND DEMAND & SUPPLY SHIFTS
    // ==========================================

    () => ({
        question: "If expected interest rates rise in the near future, demand for long-term bonds today ________ and yields ________.",
        type: 'choice',
        choices: [
            'A) decreases; increase',
            'B) increases; increase',
            'C) decreases; decrease',
            'D) increases; decrease'
        ],
        correctIndex: 0,
        explanation: 'Higher expected future rates → bond prices expected to FALL → capital loss expected → bonds less attractive today → demand DECREASES → bond prices fall → yields INCREASE.',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following would NOT cause the demand curve for bonds to shift?",
        type: 'choice',
        choices: [
            'A) a change in government borrowing needs',
            'B) a change in the liquidity of bonds',
            'C) a change in expected inflation',
            'D) a change in stock market volatility'
        ],
        correctIndex: 0,
        explanation: 'Government borrowing needs shift the SUPPLY curve (more bonds issued). Demand shifters are things that change how much investors WANT to hold bonds: liquidity, expected inflation, expected returns on alternatives, wealth, risk.',
        category: 'econ'
    }),

    () => ({
        question: "The demand curve for bonds would DECREASE if there is",
        type: 'choice',
        choices: [
            'A) a decrease in expected inflation.',
            'B) an increase in bond liquidity.',
            'C) an increase in expected future interest rates.',
            'D) a decrease in government borrowing needs.'
        ],
        correctIndex: 2,
        explanation: 'Higher expected future interest rates → expected bond prices will FALL → capital loss anticipated → investors want to hold fewer bonds today → demand DECREASES (curve shifts left).',
        category: 'econ'
    }),

    () => ({
        question: "If expected stock gains decrease, while expected returns on bonds do NOT change, then",
        type: 'choice',
        choices: [
            'A) equilibrium bond prices will decrease.',
            'B) demand for bonds will shift to the left.',
            'C) equilibrium bond yields will increase.',
            'D) equilibrium bond yields will fall.'
        ],
        correctIndex: 3,
        explanation: 'Lower expected stock returns make bonds relatively MORE attractive → investors shift INTO bonds → bond demand INCREASES → bond prices rise → yields FALL.',
        category: 'econ'
    }),

    () => ({
        question: "If a bond's rating improves, it should cause the bond's price to ________ and yield to ________.",
        type: 'choice',
        choices: [
            'A) decrease; decrease',
            'B) increase; decrease',
            'C) decrease; increase',
            'D) increase; increase'
        ],
        correctIndex: 1,
        explanation: 'Better rating = lower default risk → bond more attractive → demand increases → price RISES → since price and yield move in opposite directions, yield FALLS.',
        category: 'econ'
    }),

    () => ({
        question: "If government DECREASES spending AND collects MORE tax revenues, the bond supply curve will shift",
        type: 'choice',
        choices: [
            'A) right; interest rate rises.',
            'B) left; interest rate falls.',
            'C) right; interest rate falls.',
            'D) government borrowing increases.'
        ],
        correctIndex: 1,
        explanation: 'Less spending + more tax revenue = smaller deficit (or surplus) → government needs to borrow LESS → fewer bonds issued → supply shifts LEFT → bond prices rise → interest rates FALL.',
        category: 'econ'
    }),

    () => ({
        question: "During the financial crisis of 2007-09, the prices of U.S. Treasury securities",
        type: 'choice',
        choices: [
            'A) stayed in the same relative position to corporate bond prices.',
            'B) were frozen by order of the federal government.',
            'C) fell relative to corporate bond prices.',
            'D) rose, while corporate bond prices declined.'
        ],
        correctIndex: 3,
        explanation: 'Flight to quality: during the crisis, investors fled risky corporate bonds and flocked to safe T-bonds → T-bond demand surged → T-bond prices ROSE. Corporate bonds were sold off → corporate prices FELL. The yield spread widened dramatically.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — INTEREST RATE RISK
    // ==========================================

    () => ({
        question: "Which of these bonds is subject to the largest interest-rate risk?",
        type: 'choice',
        choices: [
            'A) A 10-year Treasury bond',
            'B) A 20-year corporate bond',
            'C) A 30-year Treasury bond',
            'D) A Treasury bill'
        ],
        correctIndex: 2,
        explanation: 'Interest-rate risk increases with maturity. A 30-year bond\'s price will change far more for a given rate move than shorter bonds. A 1% rate increase causes a much bigger price drop on a 30-year bond than a 10-year bond.',
        category: 'econ'
    }),

    () => ({
        question: "Which of the following is a short-term financial asset (money market instrument)?",
        type: 'choice',
        choices: [
            'A) a Treasury note with 4-year maturity',
            'B) a share of Walt Disney stock',
            'C) a residential mortgage',
            'D) Treasury bill'
        ],
        correctIndex: 3,
        explanation: 'Money market instruments mature in less than 1 year. Treasury bills (T-bills) are typically 4, 13, or 26 weeks. T-notes (1-10 years), mortgages (15-30 years), and stocks have no maturity.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — M1 / M2 & MONEY DEFINITIONS
    // ==========================================

    () => ({
        question: "If an individual moves money from a CD to a checking account, then",
        type: 'choice',
        choices: [
            'A) M1 increases and M2 stays the same.',
            'B) M1 decreases and M2 stays the same.',
            'C) M1 stays the same and M2 stays the same.',
            'D) M1 increases and M2 decreases.'
        ],
        correctIndex: 0,
        explanation: 'CDs are in M2 only. Checking accounts are in both M1 and M2. Moving money from CD to checking: M1 INCREASES (checking added). M2 STAYS THE SAME (the money was already in M2 either way).',
        category: 'econ'
    }),

    () => ({
        question: "Time deposits (CDs) are included in",
        type: 'choice',
        choices: [
            'A) M1 and M2.',
            'B) only M1.',
            'C) only M2.',
            'D) neither M1 nor M2.'
        ],
        correctIndex: 2,
        explanation: 'M1 = currency + demand deposits + traveler\'s checks. M2 = M1 + savings accounts + small-denomination time deposits (CDs) + money market accounts. CDs are in M2 ONLY — they\'re not liquid enough for M1.',
        category: 'econ'
    }),

    () => ({
        question: "When yield curves are flat",
        type: 'choice',
        choices: [
            'A) short-term rates are above long-term rates.',
            'B) long-term rates are above short-term rates.',
            'C) short-term rates are about the same as long-term rates.',
            'D) medium-term rates are above both short and long-term rates.'
        ],
        correctIndex: 2,
        explanation: 'A flat yield curve means bonds of all maturities offer approximately the SAME interest rate. Under liquidity premium theory, this signals that markets expect short-term rates to FALL (offsetting the built-in upward term premium).',
        category: 'econ'
    }),

    () => ({
        question: "Economists define money as",
        type: 'choice',
        choices: [
            'A) deposits in commercial banks.',
            'B) bonds issued by large corporations.',
            'C) anything accepted in payment for goods/services or to pay off debts.',
            'D) cash in circulation.'
        ],
        correctIndex: 2,
        explanation: 'The economic definition of money focuses on its FUNCTION — anything generally accepted as payment. This includes currency, demand deposits, and other highly liquid assets. It is NOT limited to just cash or bank deposits.',
        category: 'econ'
    }),

    () => ({
        question: "Bonds issued by state and local governments are called ________ bonds.",
        type: 'choice',
        choices: [
            'A) commercial',
            'B) corporate',
            'C) municipal',
            'D) Treasury'
        ],
        correctIndex: 2,
        explanation: 'Municipal bonds (munis) are issued by state and local governments. Key feature: interest income is exempt from federal income tax (and often state taxes), making them attractive to high-income investors.',
        category: 'econ'
    }),

    // ==========================================
    // MIDTERM 1 — BOND MARKET FUNDAMENTALS
    // ==========================================

    () => ({
        question: "If you purchase a Treasury bond, the Treasury bond is",
        type: 'choice',
        choices: [
            'A) an asset to you and an asset to the U.S. government.',
            'B) a liability to you, but an asset to the U.S. government.',
            'C) a liability to you and a liability to the U.S. government.',
            'D) an asset to you, but a liability to the U.S. government.'
        ],
        correctIndex: 3,
        explanation: 'You bought the bond → you are OWED money → it\'s your ASSET. The government sold the bond → it OWES you money → it\'s the government\'s LIABILITY. Every financial instrument is an asset to one party and a liability to the other.',
        category: 'econ'
    }),

    () => ({
        question: "In the bond market, the buyer is considered to be",
        type: 'choice',
        choices: [
            'A) the lender.',
            'B) the lender or borrower, depending on whether rates are rising or falling.',
            'C) the lender or borrower, depending on use of funds.',
            'D) the borrower.'
        ],
        correctIndex: 0,
        explanation: 'Buying a bond = lending money to the issuer. The bond buyer provides funds now in exchange for future payments. The bond seller (issuer) is the borrower — they receive the funds and promise to repay.',
        category: 'econ'
    }),

    () => ({
        question: "The risk premium on corporate bonds typically increases",
        type: 'choice',
        choices: [
            'A) when the average price of corporate bonds increases.',
            'B) when the risk premium on Treasury bonds increases.',
            'C) when interest rates on corporate bonds decrease.',
            'D) during a recession.'
        ],
        correctIndex: 3,
        explanation: 'During recessions, corporate default risk rises (companies struggle to make payments) → investors demand more compensation → risk premium WIDENS. This is why the spread between corporate and Treasury yields spikes in downturns.',
        category: 'econ'
    }),

    () => ({
        question: "According to the WSJ article, El Salvador issued bitcoin-backed dollar bonds. What specific risk did this expose the country to?",
        type: 'choice',
        choices: [
            'A) Interest rate risk of rising interest rates.',
            'B) Falling bitcoin value makes it harder to repay borrowed dollars.',
            'C) Risk of economic sanctions from IMF and World Bank.',
            'D) Political risk of alienating other countries.'
        ],
        correctIndex: 1,
        explanation: 'El Salvador\'s bonds were denominated in DOLLARS but backed by bitcoin. If bitcoin\'s value crashes, the collateral is worth less — but the dollar repayment obligation remains unchanged. This is currency/collateral mismatch risk.',
        category: 'econ'
    }),

    () => ({
        question: "According to the WSJ article, how do high interest rates complicate the federal government's ability to finance budget deficits?",
        type: 'choice',
        choices: [
            'A) High interest rates increase the government\'s borrowing costs.',
            'B) High interest rates are politically unpopular with voters.',
            'C) High rates stimulate inflation, increasing money the government needs to borrow.',
            'D) High rates make tariff policy less effective.'
        ],
        correctIndex: 0,
        explanation: 'When the government runs a deficit, it must borrow by issuing Treasury bonds. Higher interest rates mean higher coupon payments on new bonds → larger interest expense in the federal budget → deficits grow even faster.',
        category: 'econ'
    })

];

// Register econ questions into the main Questions object
if (typeof window !== 'undefined') {
    window.EconQuestions = EconQuestions;
}
