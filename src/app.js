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

require(['jquery', 'util/console', 'ui/notify', 'bus', 'ui/main',
         'model/contact'],
        function ($, Console, Notify, Bus, UiMain, Contact) {
    "use strict";
    var i, contact, app = new UiMain(Bus);
    app.render($("body"));

    for (i = 0; i < 10; i += 1) {
        contact = new Contact("account" + i, "Account " + i, 1);
        Bus.contact.connected._.publish(contact);
    }
    Bus.session.started._.subscribe(function (session) {
        Notify.success("fake bus signal received " + session.username);
        Console.log("hi", session.username);
    });

    Bus.session.started._.publish({username: "mariano"});
});
