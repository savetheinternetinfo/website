import * as Masonry from 'masonry-layout';
import debounce from './debounce';
 
const gallery = new Masonry('.gallery-grid', {
    itemSelector: '.gallery',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 25,
});

gallery.layout();

const refreshLayout = debounce(function() {
    gallery.layout();
    console.debug('Layout!')
}, 100);
refreshLayout();

const imgs = document.querySelectorAll('.gallery-img')
for (let i = 0; i < imgs.length; i++) {
    imgs.item(i).addEventListener('load', refreshLayout)
}