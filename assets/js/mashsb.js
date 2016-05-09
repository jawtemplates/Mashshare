(function ($) {

    'use strict';

    // namespace
    var mash = {
        //config: mashsb
    };

    mash.getWindowWidth = function () {
        if (typeof window.innerWidth !== 'undefined') {
            return window.innerWidth;
        }

        return $(window).width();
    };

    // expose to the world
    window.mash = mashsb;
})(jQuery);


/*!------------------------------------------------------
 * jQuery nearest v1.0.3
 * http://github.com/jjenzz/jQuery.nearest
 * ------------------------------------------------------
 * Copyright (c) 2012 J. Smith (@jjenzz)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($, d) {
    $.fn.nearest = function (selector) {
        var self, nearest, el, s, p,
                hasQsa = d.querySelectorAll;

        function update(el) {
            nearest = nearest ? nearest.add(el) : $(el);
        }

        this.each(function () {
            self = this;

            $.each(selector.split(','), function () {
                s = $.trim(this);

                if (!s.indexOf('#')) {
                    // selector starts with an ID
                    update((hasQsa ? d.querySelectorAll(s) : $(s)));
                } else {
                    // is a class or tag selector
                    // so need to traverse
                    p = self.parentNode;
                    while (p) {
                        el = hasQsa ? p.querySelectorAll(s) : $(p).find(s);
                        if (el.length) {
                            update(el);
                            break;
                        }
                        p = p.parentNode;
                    }
                }
            });

        });

        return nearest || $();
    };
}(jQuery, document));



jQuery(document).ready(function ($) {

    //'use strict';

    mash.shareContentElements();


    /* Opens a new minus buttonwhen plus sign is clicked */
    /* Toogle function for more services */
    $(".onoffswitch").click(function () {
        $('.onoffswitch').hide();
        $('.secondary-shares').show();
        $('.onoffswitch2').show();
        /*$( ".mashsb-buttons a" ).toggleClass( 'float-left');*/
    });
    $(".onoffswitch2").click(function () {
        $('.onoffswitch').show();
        $('.secondary-shares').hide();
    });

    /* Network sharer scripts */
    /* deactivate FB sharer when likeaftershare is enabled */
    if (typeof lashare_fb == "undefined" && typeof mashsb !== 'undefined') {
        $('.mashicon-facebook').click(function (mashfb) {

            winWidth = 520;
            winHeight = 550;
            var winTop = (screen.height / 2) - (winHeight / 2);
            var winLeft = (screen.width / 2) - (winWidth / 2);
            var url = $(this).attr('href');

            window.open(url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
            mashfb.preventDefault(mashfb);
            return false;
        });
    }

    if (typeof mashsb !== 'undefined') {
        $('.mashicon-twitter').click(function (e) {
            winWidth = 520;
            winHeight = 350;
            var winTop = (screen.height / 2) - (winHeight / 2);
            var winLeft = (screen.width / 2) - (winWidth / 2);
            var url = $(this).attr('href');

            // deprecated and removed because TW popup opens twice
            if (mashsb.twitter_popup === '1') {
                window.open(url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
            }
            e.preventDefault();
            return false;
        });
    }

    if (typeof mashsb !== 'undefined' && mashsb.subscribe === 'content') {
        /* Toogle container display:none */
        jQuery('.mashicon-subscribe').not('.trigger_active').nearest('.mashsb-toggle-container').hide();
        jQuery('.mashicon-subscribe').click(function () {
            var trig = jQuery(this);
            if (trig.hasClass('trigger_active')) {
                jQuery(trig).nearest('.mashsb-toggle-container').slideToggle('fast');
                trig.removeClass('trigger_active');
                //jQuery(".mashicon-subscribe").css({"padding-bottom":"10px"});
            } else {
                jQuery('.trigger_active').nearest('.mashsb-toggle-container').slideToggle('slow');
                jQuery('.trigger_active').removeClass('trigger_active');
                jQuery(trig).nearest('.mashsb-toggle-container').slideToggle('fast');
                trig.addClass('trigger_active');
                //jQuery(".mashicon-subscribe").css({"padding-bottom":"13px"});
            }
            ;
            return false;
        });
    }

    if (typeof mashsb !== 'undefined' && mashsb.subscribe === 'link') {
        $('.mashicon-subscribe').click(function () {
            var href = mashsb.subscribe_url;
            $(this).attr("href", href);
        });
    }
    ;


    /* Round the shares callback function
     * 
     * @param {type} value
     * @returns {String|@exp;value@call;toFixed}
     */
    function roundShares(value) {
        if (typeof mashsb !== "undefined" && mashsb.round_shares == 1) {
            if (value > 1000000) {
                shares = Math.round((value / 1000000) * 10) / 10 + 'M';
                return shares;

            }
            if (value > 1000) {
                shares = Math.round((value / 1000) * 10) / 10 + 'k';
                return shares;

            }
        }
        /* zero decimals */
        return value.toFixed(0);
    }

    /* Count up script jquery-countTo
     * by mhuggins
     * 
     * Source: https://github.com/mhuggins/jquery-countTo
     */
    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                        increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                        $self = $(this),
                        loopCount = 0,
                        value = settings.from,
                        data = $self.data('countTo') || {};

                $self.data('countTo', data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof (settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof (settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.text(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0, // the number the element should start at
            to: 0, // the number the element should end at
            speed: 1000, // how long it should take to count between the target numbers
            refreshInterval: 100, // how often the element should be updated
            decimals: 0, // the number of decimal places to show
            //formatter: formatter,  // handler for formatting the value before rendering
            formatter: roundShares,
            onUpdate: null, // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }


    }(jQuery));

    /* Start the counter
     * 
     */
    if (typeof mashsb !== 'undefined' && mashsb.animate_shares == 1 && $('.mashsbcount').length) {
        $('.mashsbcount').countTo({from: 0, to: mashsb.shares, speed: 1000, refreshInterval: 100});
    }


});

/**************************
 *
 * Share Content Elements
 * (images, video)
 *
 * @credit Bimber theme
 * @url http://themeforest.net/item/bimber-viral-buzz-wordpress-theme/14493994
 *
 **************************/

(function ($) {

    'use strict';

    mash.shareContentElements = function () {
        var $mashButtons = $('.mashsb-buttons', '#content').first();

        // Check if Mashsharer Buttons are in use.
        if ($mashButtons.length === 0) {
            return;
        }

        mash.microShareIncludeSelectors = [
            '.entry-content img.aligncenter',
            '.entry-content .aligncenter img',
            '.entry-content .wp-video',
            '.entry-content .mashsb-enable-share-links'
        ];

        mash.microShareExcludeSelectors = [
            '.entry-content img.mashsb-disable-share-links'
        ];

        $(mash.microShareIncludeSelectors.join(',')).not(mash.microShareExcludeSelectors.join(',')).each(function () {
            var $elem = $(this);

            // Get a copy of Mashsharer Buttons.
            // We need to change shares urls but we don't want to touch original buttons.
            var $microButtons = $mashButtons.clone(true);

            var $sharesWrapper = $('<div class="mashsb-micro">');
            $sharesWrapper.append($microButtons);

            // Add toggle link.
            var $microToggle = $('<div class="mashsb-micro-toggle"></div>');
            $sharesWrapper.prepend($microToggle);

            // Secondary shares wrapper contains small buttons, main wrapper containes large buttons.
            var $secondaryShares = $sharesWrapper.find('.secondary-shares');

            // We want all buttons to be small.
            $sharesWrapper.children('a').prependTo($secondaryShares);

            // Hide Toggle button, all buttons should be visible.
            $sharesWrapper.find('.onoffswitch').hide();

            // Hide view count.
            $sharesWrapper.find('.mashsb-count').hide();

            // Show small buttons and add them after content element.
            $secondaryShares.show();

            // Compose shares urls depends of their types.
            var $pinterestLink, pinterestShareUrl;

            $elem.wrap('<span class="mashsb-img-wrap"></span>');

            $elem.parent().addClass('mashsb-micro-wrapper');
            $elem.parent().append($sharesWrapper);

            // -----------------
            //     PINTEREST
            // -----------------

            $pinterestLink = $microButtons.find('a.mashicon-pinterest');

            // Pinterest active?
            if ($pinterestLink.length > 0) {
                pinterestShareUrl = $pinterestLink.attr('href');

                // Try to find image/video to share:

                // 1. from "src" attr (most images).
                var imgUrl = $elem.attr('src');

                // 2. from "data-img-src" attr (gifs replaced with SuperGif canvas).
                if (!imgUrl) {
                    imgUrl = $elem.attr('data-img-src');
                }

                // 3. from style background-image (mejs video player, if poster set).
                if (!imgUrl) {
                    // delay to wait until mejs player will be loaded
                    $(window).load(function () {
                        var $poster = $elem.find('.mejs-poster');

                        if ($poster.length > 0) {
                            var posterImg = $poster.css('background-image');

                            if (posterImg) {
                                // remove url(" from the beginning, and ") from the end
                                posterImg = posterImg.substring(5, posterImg.length - 2);

                                mash.replaceShareUrlWithImage($pinterestLink, pinterestShareUrl, posterImg);
                            }
                        }
                    });
                }

                // Replace default share image (post featured media) with current image (if found in replacement path).
                if (imgUrl) {
                    mash.replaceShareUrlWithImage($pinterestLink, pinterestShareUrl, imgUrl);
                }
            }
        });

        // On image hover show the share buttons
        $('.mashsb-micro-toggle').on('mouseover', function () {
            $(this).parents('.mashsb-micro-wrapper').addClass('mashsb-micro-wrapper-expanded');
        });
        $('.mashsb-micro-wrapper').on('mouseover', function () {
            $(this).addClass('mashsb-micro-wrapper-expanded');
        });
        $('.mashsb-micro-wrapper').on('mouseout', function () {
            $(this).removeClass('mashsb-micro-wrapper-expanded');
        });



        // On none touchable devices, shares visibility is handled via css :hover.
        // On touch devices there is no "hover", so we emulate hover via CSS class toggle on click.
        $('.mashsb-micro-toggle').on('click', function () {
            $(this).parents('.mashsb-micro-wrapper').addClass('mashsb-micro-wrapper-expanded');
        });

        // Hide shares on focus out.
        $('body').on('click touchstart', function (e) {
            var $activeMicroShares = $(e.target).parents('.mashsb-micro-wrapper-expanded');

            // Collapse all expanded micro shares except active one.
            $('.mashsb-micro-wrapper-expanded').not($activeMicroShares).removeClass('mashsb-micro-wrapper-expanded');
        });
    };

    mash.getImageAbsoluteUrl = function (url) {
        if (url.indexOf('http') === 0) {
            return url;
        }

        return location.protocol + '//' + location.hostname + url;
    };

    mash.replaceShareUrlWithImage = function ($pinterestLink, pinterestShareUrl, imgUrl) {
        imgUrl = mash.getImageAbsoluteUrl(imgUrl);

        pinterestShareUrl = pinterestShareUrl.replace(/&media=.*&description/, '&media=' + imgUrl + '&description');

        $pinterestLink.attr('href', pinterestShareUrl);
    };

})(jQuery);