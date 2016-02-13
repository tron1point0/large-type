$(document).ready(function() {
    /**
     * Minimum font size, in CSS pixels.
     */
    const MIN_SIZE = 10;

    var target = {
            container: $(".out"),
            text: undefined,
            h: undefined,
            w: undefined,
        },
        shadow = {
            container: target.container
                .clone()
                .addClass("shadow")
                .appendTo("body"),
            text: undefined,
        },
        size;

    target.text = target.container.children("span");
    shadow.text = shadow.container.children("span");
    setTarget();
    size = parseInt(target.text.css("font-size"));

    $(".in").on("keyup", function() {
        setText($(this).val());
    });

    $(window).on("resize", function() {
        setTarget();
    });

    function setText(value) {
        if (value === "") {
            size = MIN_SIZE;
            finished();
            return;
        }

        shadow.text.text(value);

        // ±1 offset is to prevent bouncing between sizes
        var minSize = isBounded() ? size - 1 : MIN_SIZE,
            maxSize = isBounded() ? target.h : size + 1;

        while (maxSize - minSize > 1) {
            size = Math.floor((minSize + maxSize)/2);
            setSize();
            if (isBounded()) {
                minSize = size;
            } else {
                maxSize = size;
            }
        }

        finished(size);

        function isBounded() {
            return shadow.text.outerWidth() < target.w &&
                shadow.text.outerHeight() < target.h;
        }

        function setSize() {
            shadow.text.css("font-size", size);
        }

        function finished() {
            target.text.css("font-size",size).text(value);
        }
    }

    function setTarget() {
        target.h = target.container.innerHeight();
        target.w = target.container.innerWidth();
    }
});
