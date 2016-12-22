
;(function () {
    'use strict';

    var $items = $('#J_ulist .item');
    $items.on('click', function () {
        $items.removeClass('cur');
        $(this).addClass('cur');
    })
})();
