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
        notylayout: "../lib/noty/layouts/top",
        postal: "../lib/postal",
        treeify: "util/treeify"
    },
    shim: {
        underscore:   { exports: "_" },
        dustjs:       { exports: 'dust' },
        noty:         { exports: "$.noty", deps: ['jquery'] },
        notytheme:    { exports: "$.noty.themes.defaultTheme", deps: ['noty'] },
        notylayout:   { exports: "$.noty.layouts.top", deps: ['noty'] }
    }
});

require(['util/console', 'ui/notify', 'bus'],
        function (Console, Notify, Bus) {
    "use strict";
    Bus.session.started._.subscribe(function (session) {
        Notify.success("fake bus signal received " + session.username);
        Console.log("hi", session.username);
    });

    Bus.session.started._.publish({username: "mariano"});
});
