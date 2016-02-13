$(document).ready(function() {
    /**
     * Minimum font size, in CSS pixels.
     */
    const MIN_SIZE = 10;

    var target = {
            el: $(".out"),
            text: undefined,
            h: undefined,
            w: undefined,
        },
        shadow = {
            el: target.el
                .clone()
                .addClass("shadow")
                .appendTo("body"),
        },
        size;

    target.text = target.el.children("span");
    shadow.text = shadow.el.children("span");
    setTarget();
    size = parseInt(target.el.css("font-size"));

    $(".out").on("keyup", function(event) {
        setText($(this).text());
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

        finished();
    }

    function setSize() {
        shadow.text.css("font-size", size);
    }

    function finished() {
        target.text.css("font-size",size);
    }

    function isBounded() {
        return shadow.text.outerWidth() < target.w &&
            shadow.text.outerHeight() < target.h;
    }

    function setTarget() {
        target.h = target.el.innerHeight();
        target.w = target.el.innerWidth();
    }
});
