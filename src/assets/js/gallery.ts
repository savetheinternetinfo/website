/// <reference path="./typings.d.ts" />

import * as Masonry from 'masonry-layout';
import debounce from './debounce';
import * as jQuery from 'jquery';
window.jQuery = jQuery;
window.$ = jQuery
import 'simplelightbox';

jQuery(() => {
    const gallery = new Masonry('.gallery-grid', {
        itemSelector: '.gallery',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 25,
    });
    
    gallery.layout();
    
    const refreshLayout = debounce(function() {
        gallery.layout();
    }, 100);
    refreshLayout();
    
    jQuery('.gallery img').on('load', refreshLayout);
    
    jQuery('.gallery a').simpleLightbox();
})