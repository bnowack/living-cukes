/**
 * LivingCukes Header
 * 
 * @author Benjamin Nowack
 * @param {jQuery} $ - jQuery
 */
define([
    'jquery',
    // css
    'css!./css/header'
],
function($) {
    
    var lib = {
        
        init: function () {
           this.$header = $('#header');
           this.$header.find('h1').html(document.title);
        }
                
    };
    
    return lib;
    
});
