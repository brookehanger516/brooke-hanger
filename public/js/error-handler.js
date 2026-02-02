// Centralized Error Handler & Logger
// Version: 1.0.0
// Purpose: Global error boundary and consistent logging system

(function () {
  'use strict';

  const config = {
    // Set to false in production to suppress non-error logs
    enableDebugLogs: false,
    // Module name prefixes for consistent logging
    modulePrefix: true,
    // Queue errors for potential reporting
    queueErrors: true,
    maxQueueSize: 50
  };

  const errorQueue = [];

  // ============================================================================
  // Logging System with Consistent Prefixes
  // ============================================================================

  function formatLogMessage(module, action, message) {
    return config.modulePrefix && module
      ? `[${module}${action ? ':' + action : ''}] ${message}`
      : message;
  }

  const logger = {
    // Standard logging
    log: (module, action, message) => {
      if (config.enableDebugLogs) {
        console.log(formatLogMessage(module, action, message));
      }
    },

    // Information logging
    info: (module, action, message) => {
      console.info(formatLogMessage(module, action, message));
    },

    // Warning logging
    warn: (module, action, message) => {
      console.warn(formatLogMessage(module, action, message));
    },

    // Error logging
    error: (module, action, message, error) => {
      const formattedMsg = formatLogMessage(module, action, message);
      console.error(formattedMsg, error || '');
      
      if (config.queueErrors) {
        queueError({
          module,
          action,
          message: formattedMsg,
          error: error ? error.toString() : null,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        });
      }
    },

    // Success logging (with emoji for visibility)
    success: (module, action, message) => {
      if (config.enableDebugLogs) {
        console.log(`✓ ${formatLogMessage(module, action, message)}`);
      }
    }
  };

  // ============================================================================
  // Error Queue Management
  // ============================================================================

  function queueError(errorData) {
    errorQueue.push(errorData);
    
    // Limit queue size
    if (errorQueue.length > config.maxQueueSize) {
      errorQueue.shift();
    }
  }

  function getErrorQueue() {
    return [...errorQueue];
  }

  function clearErrorQueue() {
    errorQueue.length = 0;
  }

  // ============================================================================
  // Global Error Handlers
  // ============================================================================

  // Catch uncaught errors
  window.onerror = function (message, source, lineno, colno, error) {
    logger.error('Global', 'UncaughtError', `${message} at ${source}:${lineno}:${colno}`, error);
    
    // Show user-friendly message for critical errors
    if (window.toast) {
      window.toast.error('An unexpected error occurred. Please refresh the page.', 5000);
    }
    
    // Return false to allow default error handling
    return false;
  };

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', function (event) {
    logger.error('Global', 'UnhandledPromise', `Unhandled rejection: ${event.reason}`, event.reason);
    
    // Prevent default handling
    event.preventDefault();
    
    // Show user-friendly message
    if (window.toast) {
      window.toast.error('Something went wrong. Please try again.', 4000);
    }
  });

  // ============================================================================
  // Graceful Degradation Helpers
  // ============================================================================

  function safeExecute(fn, fallback, context = null) {
    try {
      return fn.call(context);
    } catch (error) {
      logger.error('SafeExecute', 'Failed', 'Function execution failed', error);
      return fallback !== undefined ? fallback : null;
    }
  }

  function featureDetect(feature, featureName) {
    const supported = typeof feature !== 'undefined';
    if (!supported) {
      logger.warn('FeatureDetect', 'Unsupported', `${featureName} is not supported in this browser`);
    }
    return supported;
  }

  // ============================================================================
  // Feature Support Checks
  // ============================================================================

  function checkCriticalFeatures() {
    const features = {
      localStorage: featureDetect(window.localStorage, 'localStorage'),
      serviceWorker: featureDetect(navigator.serviceWorker, 'Service Workers'),
      intersectionObserver: featureDetect(window.IntersectionObserver, 'IntersectionObserver'),
      customElements: featureDetect(window.customElements, 'Custom Elements')
    };

    const unsupportedFeatures = Object.entries(features)
      .filter(([_, supported]) => !supported)
      .map(([name]) => name);

    if (unsupportedFeatures.length > 0) {
      logger.warn('Init', 'FeatureCheck', `Unsupported features: ${unsupportedFeatures.join(', ')}`);
    }

    return features;
  }

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    logger.info('ErrorHandler', 'Init', 'Global error handling initialized');
    
    // Check critical features
    const features = checkCriticalFeatures();
    
    // Expose feature support for other modules
    window.browserSupport = features;
  }

  // ============================================================================
  // Public API
  // ============================================================================

  window.errorHandler = {
    log: logger.log,
    info: logger.info,
    warn: logger.warn,
    error: logger.error,
    success: logger.success,
    safeExecute,
    featureDetect,
    getErrorQueue,
    clearErrorQueue,
    setDebugMode: (enabled) => {
      config.enableDebugLogs = enabled;
      logger.info('ErrorHandler', 'Config', `Debug logging ${enabled ? 'enabled' : 'disabled'}`);
    }
  };

  // Initialize immediately
  init();

})();
