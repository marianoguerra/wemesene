/*global define, console*/
define([], function () {
    "use strict";
    function Console() {
    }

    function noop() {
    }

    Console.prototype = {
        error: noop,
        warn: noop,
        log: noop,
        info: noop,
        trace: noop,
        debug: noop
    };

    if (typeof console !== "undefined") {
        return console;
    } else {
        return new Console();
    }
});
