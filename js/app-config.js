// js/app-config.js
// Global configuration for the application. This file can be used to set flags and constants that control the behavior of the app across different environments (development, staging, production).

window.APP_CONFIG = {
    IS_DEV: true, // global development environment toggle
    FAST_VERIFICATION: true, // skip cinematic delays
    TYPEWRITER_DEBUG: true, // log typewriter events
    EXPLORER_LIVE_MODE: true // control only two things: Explorer polling + Explorer reorder updates
};