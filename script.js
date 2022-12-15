$(document).on('keyup focus resize.force', '.fill-text', (event) => {
    const MIN_SIZE = 10;

    let $target = $(event.target),
        $shadow = $target.clone()
                         .addClass('shadow')
                         .wrapInner('<span>')
                         .appendTo('body'),
        span = $shadow.get(0).firstChild,
        // TODO: Support padding sizes that are relative to the font size.
        //       (Padding that's specified in `em`s or `%`.)
        width = $target.innerWidth()
                - parseInt($target.css('padding-left'))
                - parseInt($target.css('padding-right')),
        height = $target.innerHeight()
                - parseInt($target.css('padding-top'))
                - parseInt($target.css('padding-bottom')),
        low = MIN_SIZE,
        high = height,
        mid = (high + low) >> 1;

    while (low <= high) {
        $shadow.css('font-size', mid);

        if (span.scrollHeight > height || span.scrollWidth > width) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
        mid = (high + low) >> 1;
    }

    $target.css('font-size', mid);
    $shadow.remove();
});

$('#style').on('change', (event) => {
    $('.fill-text').parent().attr("style", $(event.target).val())
                   .end().trigger('resize.force');
});

$(window).on('resize', () => {
    $('.fill-text').trigger('resize.force');
});

$(document).ready(() => {
    $('#style').trigger('change');
    $('.fill-text').trigger('resize.force').focus();
});

