/**
 * LivingCukes HTML Converter
 * 
 * @author Benjamin Nowack
 * @param {jQuery} $ - jQuery
 * @param {Object} utils - Utilities
 */
define([
    'jquery',
    'lcsrc/utils/utils',
    // css
    'css!lcsrc/html-converter/css/html-converter'
], 
function($, utils) {
    
    var lib = {

        /**
         * Initializes the component
         * 
         * @param {Object} app - Application object
         */
        init: function (app) {
            this.app = app;
            this.namespace = app.namespace + '.html-converter';
        },
        
        /**
         * Converts an HTML doc
         * 
         * @param {jQuery} $section - HTML section
         */
        convertSection: function ($section) {
            var url = $section.data('url');
            $section.addClass('html');
            utils.trigger('converted.section.' + this.app.namespace, $section);
        }
                
    };
    
    return lib;
    
});
