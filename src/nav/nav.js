/**
 * LivingCukes Navigation
 * 
 * @author Benjamin Nowack
 * @param {jQuery} $ - jQuery
 * @param {string} template - Module template
 */
define([
    'jquery',
    'lcsrc/utils/utils',
    // template
    'text!./nav.html',
    // css
    'css!./css/nav'
],
function($, utils, template) {
    
    var lib = {
        
        init: function () {
            $('#nav').append($(template).html());
            utils.on('converted.section.' + window.livingCukes.namespace, this.onSectionConverted, this);
            $(window).on('scroll resize', this.onScroll);
        },
        
        onSectionConverted: function(event, section) {
            var $section = $(section);
            var $nav = $('#nav ul');
            $section.find('h2, h3, h4, h5').each(function(index) {
                var $heading = $(this);
                //$heading.attr('id', 'heading-' + $section.attr('data-index') + '-' + index);
                var tagName = $heading.prop('tagName').toLowerCase();
                var label = $heading.text();
                $('<li/>')
                    .addClass(tagName)
                    .attr('data-section', ($section.data('index') + 1) + '.' + (index + 1))
                    .attr('data-index', $section.data('index'))
                    .append($('<a/>').html(label))
                    .data('ref', $heading)
                    .appendTo($nav)
                ;
            });

            // update flags
            $(window).trigger('scroll');
        },
        
        /**
         * ScrollSpy
         */
        onScroll: function() {
            utils.debounce(250, function() {
                var $win = $(window);
                var viewport = {
                    top: $win.scrollTop() + $('#header').outerHeight(),
                    bottom: $win.scrollTop() + $win.height()
                };
                var selected = false;
                $('#nav li').each(function(index) {
                    var item = $(this);
                    item.removeClass('active');
                    if (!selected) {
                        var $heading = item.data('ref');
                        var pos = $heading.offset();
                        if (pos.top > viewport.top && pos.top < viewport.bottom - $heading.outerHeight()) {
                            item.addClass('active');
                            selected = true;
                        }
                    }
                });
            }, 'nav.onScroll.' + window.livingCukes.namespace);
        }
                
    };
    
    return lib;
    
});
