$(function() {

    var $context = $('body'),
        $navItem = $('#main-nav-menu li'),
        $navUnderline = $('#nav-underline'),
        $activeItem = $('#main-nav-menu li.active'),
        animating = false;

    $('#timeofday').html(new Date());

    $navUnderline.css({
        left: $activeItem.position().left,
        width: $activeItem.width()
    });

    function registerEventListeners() {
        $navItem.hover(
            function() {
                $navUnderline.css({
                    left: $(this).position().left,
                    width: $(this).width()
                });
            },
            function() {
                $navUnderline.css({
                    left: $activeItem.position().left,
                    width: $activeItem.width()
                });
        });
    }

    registerEventListeners();
});