/**
 * LivingCukes Utils
 * 
 * @author Benjamin Nowack
 * @param {jQuery} $ jQuery
 */

define([
    'jquery'
], 
function($) {
    
    var lib = {
        
        timeouts: {},

		/**
		 * Defines an event callback
		 * 
		 * @param {string} eventName - Event name, e.g. `window:resized`
		 * @param {function} callback - Callback function
		 * @param {Object} context - Callback context
		 * @returns {module:utils} Utils lib
		 */
        on: function(eventName, callback, context) {
			var self = this;
            $(window).on(eventName, function(event, data) {
				if (!callback) {
					throw 'callback not defined for event "' + eventName + '"';
				} else {
					callback.call(context || self, data.event || event, data);
				}
			});
			return this;
        },
        
		/**
		 * Triggers an event
		 * 
		 * @param {string} eventName - Event name, e.g. `window:resized`
		 * @param {Object} [data={}] - Event data
		 * @returns {module:utils} Utils lib
		 */
        trigger: function(eventName, data) {
            $(window).trigger(eventName, data || {});
			return this;
        },
        
        /**
         * Debounces or delays function execution
         * 
         * @param {number} delay - Delay in msec
         * @param {function} callback - Callback
         * @param {string|null} timeoutId - Thread/Timeout ID for debouncing an event
         * @returns {undefined}
         */
		debounce: function(delay, callback, timeoutId) {
			timeoutId = timeoutId || Math.random();
			if (this.timeouts[timeoutId]) {
				clearTimeout(this.timeouts[timeoutId]);
			}
			this.timeouts[timeoutId] = setTimeout(callback, delay || 1);
		},
        
        /**
         * Loads a file from the given url
         * 
         * @param {string} path - File URL
         * @param {function} callback - Callback after successful loading
         */
        load: function(path, callback) {
			$.ajax({
				url: path,
				mimeType: 'text/plain',// prevent "not well-formed" message
				dataType: 'text',
				success: callback,
                error: function(xhr, message, error) {
                    console.log('AJAX error:', path, error.message || message);
                }
            });
        }
                
    };
    
    return lib;
    
});
