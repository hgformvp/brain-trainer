# Brain Trainer - Project Guide

## Section 1: User Profile

**Who is Hunter?**
- Works in finance in a special situations investing role
- Enjoys poker and basketball
- Non-technical user - prefers "just make it work"
- Likes to click around and try things himself rather than read descriptions

**Goals for this project:**
- A brain exercise app to use during morning commute
- "Wakes up" the brain with exercises relevant to his actual work
- Personal use first, potential to expand to other finance professionals later

**How Hunter prefers to work:**
- Wants to see working demos he can interact with
- Daily progress check-ins
- No technical jargon - explain things simply

**Constraints:**
- Demo needed today that works on phone
- Must be simple - open and immediately start solving problems
- No paywalls or excessive clicking to get started

---

## Section 2: Communication Rules

- NEVER ask technical questions. Make the decision yourself as the expert.
- NEVER use jargon, technical terms, or code references when talking to Hunter.
- Explain everything the way you'd explain it to a smart friend who doesn't work in tech.
- If you must reference something technical, immediately translate it. (Example: "the database" → "where your information is stored")

---

## Section 3: Decision-Making Authority

You have full authority over all technical decisions:
- Languages, frameworks, architecture, libraries
- Hosting, file structure, everything

Guidelines:
- Choose boring, reliable, well-supported technologies over cutting-edge options
- Optimize for maintainability and simplicity
- Document technical decisions in TECHNICAL.md (for future developers, not for Hunter)

---

## Section 4: When to Involve Hunter

Only bring decisions to Hunter when they directly affect what he will see or experience.

**When you do ask, always:**
- Explain the tradeoff in plain language
- Tell him how each option affects his experience
- Give your recommendation and why
- Make it easy to just say "go with your recommendation"

**Examples of when to ASK Hunter:**
- "This can load instantly but will look simpler, or look richer but take 2 seconds to load. Which matters more?"
- "I can add a feature to track your scores over time, but it adds a step. Worth it?"

**Examples of when NOT to ask Hunter:**
- Anything about databases, APIs, frameworks, languages, or architecture
- Library choices, dependency decisions, file organization
- How to implement any feature technically

---

## Section 5: Engineering Standards

Apply these automatically without discussion:
- Write clean, well-organized, maintainable code
- Implement comprehensive automated testing
- Build in self-verification
- Handle errors gracefully with friendly, non-technical error messages
- Include input validation and security best practices
- Make it easy for a future developer to understand and modify
- Use version control properly with clear commit messages
- Set up development/production environment separation

---

## Section 6: Quality Assurance

- Test everything yourself before showing Hunter
- Never show him something broken
- If something isn't working, fix it - don't explain the technical problem
- When demonstrating progress, everything he sees should work
- Build in automated checks that run before any changes go live

---

## Section 7: Showing Progress

- Show working demos whenever possible - let Hunter click around and try things
- Use screenshots or screen recordings when demos aren't practical
- Describe changes in terms of what he'll experience, not what changed technically
- Celebrate milestones in terms he cares about ("You can now practice probability questions" not "Implemented question rendering component")

---

## Section 8: Project-Specific Details

### What We're Building
A brain exercise app designed to sharpen mental skills used in finance and poker. Opens fast, no friction, dark theme, immediate feedback.

### Core Problem Categories
All questions fall into these five areas:

1. **Probability & Expected Value** - odds calculations, EV, risk/reward scenarios
2. **Time Value of Money** - present value, future value, compounding, discounting, interest calculations
3. **Game Theory** - optimal decisions, opponent modeling, Nash equilibrium, strategic thinking
4. **Statistical Reasoning** - means, distributions, interpreting data, Bayesian thinking
5. **Combinatorics & Counting** - permutations, combinations, counting problems

### Must-Haves (Version 1)
- Quick math problems
- Probability questions
- Dark theme
- See the answer immediately after attempting
- Works on phone
- Minimal friction - open and start immediately

### Nice-to-Haves (Future)
- Progress tracking over time
- Different difficulty levels
- Different professional tracks (quant mode, credit/distressed mode, poker mode)
- Ability for other finance professionals to use

### Design Requirements
- Dark themed UI
- Not user-intensive (minimal clicks to start)
- Feedback/solutions shown after each question
- Simple to open and immediately begin
- Mobile-friendly

### What Hunter Dislikes in Similar Apps
- Too much clicking around before starting
- Paywalls after a few problems
- Generic problems not tailored to actual work needs

---

## Working Rhythm

- **Check-ins:** Daily
- **Demo style:** Working versions Hunter can click around in
- **Feedback style:** Hunter tries things and reacts
- **Timeline:** First demo today, usable on phone
