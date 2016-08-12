/**
 * LivingCukes Markdown Converter
 * 
 * @author Benjamin Nowack
 * @param {Object} utils - Utilities lib
 * @param {function} MarkdownConverter - Pagedown
 */
define([
    'lcsrc/utils/utils',
    'mdconv'
], 
function(utils, MarkdownConverter) {
    
    var lib = {
        
        /**
         * Initializes the component
         * 
         * @param {Object} app - Application object
         */
        init: function (app) {
            this.app = app;
            this.namespace = app.namespace + '.md-converter';
        },
        
        /**
         * Converts a markdown document
         * 
         * @param {jQuery} $section - Section element
         */
        convertSection: function($section) {
            var self = this;
            $section.addClass('markdown');
            var url = $section.data('url');
            utils.load(url, function(markdown) {
                var html = (new MarkdownConverter()).makeHtml(markdown)
                    .replace(/h5>/g, 'h6>')
                    .replace(/h4>/g, 'h5>')
                    .replace(/h3>/g, 'h4>')
                    .replace(/h2>/g, 'h3>')
                    .replace(/h1>/g, 'h2>')
                ;
                var hasCustomHeading = !!$section.find('h2').length;
                $section.append(html);
                // remove first converted heading if a custom heading was already present in the section
                if (hasCustomHeading) {
                    $section.find('h2:nth-child(2)').remove();
                }
                utils.trigger('converted.section.' + self.app.namespace, $section);
            });
        }
        
    };
    
    return lib;
    
});
