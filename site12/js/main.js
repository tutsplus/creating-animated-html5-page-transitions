$(function() {

    var $context = $('body'),
        $navItem = $('#main-nav-menu li'),
        $navUnderline = $('#nav-underline'),
        $activeItem = $('#main-nav-menu li.active'),
        animating = false;

    //$('#timeofday').html(new Date());

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

        if (history) {
            $context.on('click', '.transition-link', function(e) {
                e.preventDefault();
                var newURL = $(this).attr('href');
                pageChange(newURL, false);
            });
    
            $(window).on('popstate', function() {
                var page = location.pathname.split('/').pop();
                pageChange(page, true);
            });
        }
    }

    function pageChange(newURL, usedBrowserBtn) {
        $activeItem = $('#main-nav-menu a[href="' + newURL + '"]').parents('li').addClass('active');
        $navUnderline.css({
            left: $activeItem.position().left,
            width: $activeItem.width()
        });

        $('body').addClass('animating');

        setTimeout(function() {
            loadNewPage(newURL, usedBrowserBtn);
        }, 1500);
    }

    function loadNewPage(newURL, usedBrowserBtn) {
        var container = $('<div id="loadingContainer"></div>');
        container.load(newURL, function() {
            console.log(container);
            $('#hero-image').html(container.find('#hero-image > *'));
            $('#main-content').html(container.find('#main-content > *'));

            var pageid = container.find('[id^="page-"]').attr('id');
            $('[id^="page-"]').attr('id', pageid);

            var newTitle = container.find('title')[0].text;
            $('title').html(newTitle);

            if (!usedBrowserBtn) window.history.pushState(null, newTitle, newURL);

            setTimeout(function() {
                $('body').removeClass('animating');
            }, 1);
        });
    }

    registerEventListeners();
});