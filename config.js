// Configuration - Brain Trainer
// API settings for AI features

(function() {
    'use strict';

    const CONFIG = {
        // API Key management
        getApiKey: function() {
            return localStorage.getItem('anthropic_api_key');
        },

        setApiKey: function(key) {
            if (key) {
                localStorage.setItem('anthropic_api_key', key);
            } else {
                localStorage.removeItem('anthropic_api_key');
            }
        },

        hasApiKey: function() {
            const key = this.getApiKey();
            return key && key.length > 0;
        },

        // API settings
        apiEndpoint: 'https://api.anthropic.com/v1/messages',
        model: 'claude-sonnet-4-20250514',
        maxTokens: 1024,

        // AI feature settings
        getAiSettings: function() {
            const defaults = {
                useAiFeatures: true,
                autoGenerateQuestions: true,
                llmGrading: true
            };

            try {
                const saved = localStorage.getItem('brainTrainerAiSettings');
                if (saved) {
                    return { ...defaults, ...JSON.parse(saved) };
                }
            } catch (e) {
                console.error('Error loading AI settings:', e);
            }

            return defaults;
        },

        setAiSettings: function(settings) {
            try {
                localStorage.setItem('brainTrainerAiSettings', JSON.stringify(settings));
            } catch (e) {
                console.error('Error saving AI settings:', e);
            }
        },

        // Check if AI features are enabled and available
        aiEnabled: function() {
            return this.hasApiKey() && this.getAiSettings().useAiFeatures;
        }
    };

    // Export
    window.CONFIG = CONFIG;

})();
