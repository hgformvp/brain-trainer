// API Client - Brain Trainer
// Claude API wrapper for AI features

(function() {
    'use strict';

    /**
     * Call Claude API with a system prompt and user message
     * @param {string} systemPrompt - The system prompt
     * @param {string} userMessage - The user message
     * @returns {Promise<string>} The response text
     */
    async function callClaude(systemPrompt, userMessage) {
        const apiKey = CONFIG.getApiKey();

        if (!apiKey) {
            throw new Error('API key not configured. Go to Settings to add your Anthropic API key.');
        }

        const response = await fetch(CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: CONFIG.model,
                max_tokens: CONFIG.maxTokens,
                system: systemPrompt,
                messages: [
                    { role: 'user', content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            let errorMessage = 'API request failed';
            try {
                const error = await response.json();
                errorMessage = error.error?.message || errorMessage;
            } catch (e) {
                // Couldn't parse error response
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    /**
     * Call Claude API and parse response as JSON
     * @param {string} systemPrompt - The system prompt
     * @param {string} userMessage - The user message
     * @returns {Promise<Object>} The parsed JSON response
     */
    async function callClaudeJSON(systemPrompt, userMessage) {
        const response = await callClaude(systemPrompt, userMessage);

        // Extract JSON from response (handle markdown code blocks)
        let jsonStr = response;
        const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1];
        }

        try {
            return JSON.parse(jsonStr.trim());
        } catch (e) {
            console.error('Failed to parse JSON response:', response);
            throw new Error('Invalid JSON response from API');
        }
    }

    /**
     * Test the API connection with a simple request
     * @returns {Promise<boolean>} True if connection successful
     */
    async function testConnection() {
        try {
            await callClaude(
                'You are a helpful assistant.',
                'Say "connected" and nothing else.'
            );
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            throw error;
        }
    }

    // Export
    window.ApiClient = {
        callClaude,
        callClaudeJSON,
        testConnection
    };

})();
