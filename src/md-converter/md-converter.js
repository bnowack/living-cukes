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
        
        convertSection: function($section) {
            var url = $section.data('url');
            utils.load(url, function(markdown) {
                var html = (new MarkdownConverter()).makeHtml(markdown)
                    .replace(/h5>/g, 'h6>')
                    .replace(/h4>/g, 'h5>')
                    .replace(/h3>/g, 'h4>')
                    .replace(/h2>/g, 'h3>')
                    .replace(/h1>/g, 'h2>')
                ;
                $section.append(html);
                utils.trigger('converted.section.' + window.livingCukes.namespace, $section);
            });
        }
        
    };
    
    return lib;
    
});