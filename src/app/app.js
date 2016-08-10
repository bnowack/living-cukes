/**
 * Living Cukes
 * 
 * @author Benjamin Nowack
 * 
 * @param {jQuery} $ - jQuery
 * @param {Object} layout - App layout library
 * @param {Object} mdConverter - Converter: from MD
 */
require([
    // dependencies
    'jquery',
    // app
    'lcsrc/layout/layout',
    'lcsrc/md-converter/md-converter',
    // css
    'css!bower_components/normalize-css/normalize',
    'css!lcsrc/app/css/app'
], 
function($, layout, mdConverter) {
    
    var app = {
        
        namespace: 'LivingCukes',
        
        /**
         * Initialises the library
         */ 
        init: function() {
            this.convertSections();
            layout.init(this);
        },
        
        /**
         * Converts all section references to living documentation
         */
        convertSections: function() {
			$('section').each(function(index) {
                app.convertSection($(this), index);
			});
        },
        
        /**
         * Converts a prepared section to living documentation
         * 
         * @param {HTMLElement} $section - Section to be converted
         * @param {number} index - Section position in the page
         */
        convertSection: function($section, index) {
            var url = $section.text();
            var format = app.getSectionFormat(url);
            var title = $section.attr('title') || '';
            $section
                .addClass('doc')
                .data('index', index)
                .attr('data-index', index)
                .data('url', url)
                .html(title ? '<h2>' + title + '</h2>' : '')
                .appendTo('#content')
            ;
            switch (format) {
                case 'markdown': return mdConverter.convertSection($section);
            }
        },
        
        /**
         * Detects a doc's format
         * 
         * @param {String} url - Source document path or URL
         * @returns {String} Document type
         */
        getSectionFormat: function(url) {
            if (url.match(/\.(mark|markdown|md|mdml|mdown|text|mdtext|mdtxt|mdwn|mkd|mkdn)(\.|\#|\?|$)/i)) {
                return 'markdown';
            }
            if (url.match(/\.(json)(\.|\#|\?|$)/i)) {
                return 'json';
            }
            return 'html';
        }
        
    };
    
    // make app available globally
    window.livingCukes = app;
    
    // init the app
    app.init();
    
});
