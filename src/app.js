/*global require*/
require.config({
    paths: {
        "underscore.string": "../lib/underscore.string",
        underscore: "../lib/underscore",
        jquery: "../lib/jquery",
        dustjs: "../lib/dust",
        text: "../lib/text",
        noty: "../lib/noty/jquery.noty",
        notytheme: "../lib/noty/themes/default",
        notylayout: "../lib/noty/layouts/top"
    },
    shim: {
        underscore:   { exports: "_" },
        dustjs:       { exports: 'dust' },
        noty:         { exports: "$.noty", deps: ['jquery'] },
        notytheme:    { exports: "$.noty.themes.defaultTheme", deps: ['noty'] },
        notylayout:   { exports: "$.noty.layouts.top", deps: ['noty'] }
    }
});

require(['util/console', 'ui/notify', 'jquery'],
        function (Console, Notify, $) {
    "use strict";
    Notify.success("hello world");
    Console.log("hi", $);
});
