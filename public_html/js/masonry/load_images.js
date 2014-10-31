var container = document.querySelector('#container');
var msnry;
alert("load_images");
// initialize Masonry after all images have loaded
imagesLoaded(container, function() {
    msnry = new Masonry(container, {
        itemSelector: '.item',
        columnWidth: 100,
        isAnimated: true,
        transitionDuration: '2.0s'
    });
});
