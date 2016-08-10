/**
 * LivingCukes Cucumber JSON Converter
 * 
 * @author Benjamin Nowack
 * @param {jQuery} $ - jQuery
 * @param {Object} utils - Utilities
 */
define([
    'jquery',
    'lcsrc/utils/utils',
    // css
    'css!lcsrc/json-converter/css/json-converter'
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
            this.namespace = app.namespace + '.json-converter';
        },
        
        /**
         * Converts a Cucumber JSON document
         * 
         * @param {jQuery} $section - Section element
         */
        convertSection: function ($section) {
            var self = this;
            var url = $section.data('url');
            $section.addClass('json');
            utils.load(url, function(json) {
                utils.trigger('converted.section.' + self.app.namespace, $section);
            });
        }
                
    };
    
    return lib;
    
});
