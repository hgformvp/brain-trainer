// Question Validator - Brain Trainer Daily Drill
// Handles answer validation for different question types

(function() {
    'use strict';

    /**
     * Validate an answer based on question type
     * @param {Object} question - The question object
     * @param {string|number} userAnswer - User's answer
     * @returns {Object|null|Promise} Validation result, null for self-grade, or Promise for LLM
     */
    function validateAnswer(question, userAnswer) {
        if (!question.validation) return null;

        switch (question.validation.method) {
            case 'numeric':
                return validateNumeric(
                    userAnswer,
                    question.validation.expected,
                    question.validation.tolerance || 0
                );

            case 'multiple_choice':
                return validateChoice(
                    userAnswer,
                    question.validation.correctIndex
                );

            case 'llm':
                // LLM validation - returns a Promise
                if (CONFIG && CONFIG.aiEnabled() && CONFIG.getAiSettings().llmGrading) {
                    return validateWithLLM(question, userAnswer);
                }
                // Fall back to self-grade if AI not available
                return null;

            case 'self_grade':
                // Returns null - UI will handle self-grading flow
                return null;

            default:
                return null;
        }
    }

    /**
     * Validate answer using LLM
     * @param {Object} question - The question object
     * @param {string} userAnswer - User's answer
     * @returns {Promise<Object|null>} Validation result or null on failure
     */
    async function validateWithLLM(question, userAnswer) {
        const systemPrompt = `You are grading quiz responses for a finance professional.
Be lenient on exact wording but strict on conceptual accuracy.
A correct answer demonstrates understanding of the core concept.
Always respond with valid JSON only.`;

        const keyPoints = question.validation.keyPoints || [];
        const minForCorrect = question.validation.minPointsForCorrect || Math.ceil(keyPoints.length * 0.7);
        const minForPartial = question.validation.minPointsForPartial || Math.ceil(keyPoints.length * 0.4);

        const userMessage = `
QUESTION: ${question.question}

KEY POINTS A CORRECT ANSWER SHOULD COVER:
${keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

USER'S ANSWER:
${userAnswer}

Evaluate the answer. Respond with this exact JSON:
{
  "pointsCovered": <number of key points adequately addressed>,
  "totalPoints": ${keyPoints.length},
  "correct": <true if pointsCovered >= ${minForCorrect}>,
  "partial": <true if not correct but pointsCovered >= ${minForPartial}>,
  "feedback": "<1-2 sentence explanation of what was good/missing>",
  "coveredPoints": ["<points they got right>"],
  "missing": ["<any important points they missed>"]
}
`;

        try {
            const result = await ApiClient.callClaudeJSON(systemPrompt, userMessage);

            // Ensure correct/partial flags are set properly
            result.correct = result.pointsCovered >= minForCorrect;
            result.partial = !result.correct && result.pointsCovered >= minForPartial;

            return result;
        } catch (error) {
            console.error('LLM grading failed, falling back to self-grade:', error);
            // Return null to trigger self-grade UI
            return null;
        }
    }

    /**
     * Check if LLM grading is available
     * @returns {boolean} True if available
     */
    function isLLMGradingAvailable() {
        return CONFIG && CONFIG.aiEnabled() && CONFIG.getAiSettings().llmGrading;
    }

    /**
     * Validate numeric answer
     */
    function validateNumeric(userAnswer, expected, tolerance) {
        // Handle string input
        let answerStr = String(userAnswer).trim();

        // Strip everything except numbers, decimals, minus signs, percent
        const cleaned = answerStr.replace(/[^0-9.\-]/g, '');
        const parsed = parseFloat(cleaned);

        if (isNaN(parsed)) {
            return {
                correct: false,
                partial: false,
                feedback: "Couldn't parse a number from your answer. Try entering just the number."
            };
        }

        const isCorrect = Math.abs(parsed - expected) <= tolerance;

        return {
            correct: isCorrect,
            partial: false,
            userAnswer: parsed,
            expectedAnswer: expected,
            feedback: isCorrect
                ? 'Correct!'
                : `Not quite. The answer is ${expected}${tolerance > 0 ? ` (±${tolerance})` : ''}.`
        };
    }

    /**
     * Validate multiple choice answer
     */
    function validateChoice(userAnswerIndex, correctIndex) {
        const isCorrect = parseInt(userAnswerIndex) === parseInt(correctIndex);

        return {
            correct: isCorrect,
            partial: false,
            feedback: isCorrect ? 'Correct!' : 'Not quite.'
        };
    }

    /**
     * Generate a unique question ID
     */
    function generateQuestionId() {
        return 'q_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Create a numeric question object
     */
    function createNumericQuestion(questionText, expected, tolerance = 0, level = 1) {
        return {
            id: generateQuestionId(),
            level: level,
            type: 'numeric',
            question: questionText,
            validation: {
                method: 'numeric',
                expected: expected,
                tolerance: tolerance
            }
        };
    }

    /**
     * Create a multiple choice question object
     */
    function createMultipleChoiceQuestion(questionText, choices, correctIndex, level = 1) {
        return {
            id: generateQuestionId(),
            level: level,
            type: 'multiple_choice',
            question: questionText,
            choices: choices,
            validation: {
                method: 'multiple_choice',
                correctIndex: correctIndex
            }
        };
    }

    /**
     * Create a self-grade question object
     */
    function createSelfGradeQuestion(questionText, modelAnswer, level = 1) {
        return {
            id: generateQuestionId(),
            level: level,
            type: 'self_grade',
            question: questionText,
            validation: {
                method: 'self_grade',
                modelAnswer: modelAnswer
            }
        };
    }

    // Export
    window.QuestionValidator = {
        validateAnswer,
        validateNumeric,
        validateChoice,
        validateWithLLM,
        isLLMGradingAvailable,
        generateQuestionId,
        createNumericQuestion,
        createMultipleChoiceQuestion,
        createSelfGradeQuestion
    };

})();
