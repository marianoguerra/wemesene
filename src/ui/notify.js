/*global define, window*/
define(['jquery', 'noty', 'notytheme', 'notylayout'], function ($, Noty, _notytheme, _notylayout) {
    "use strict";
    var result, noty = window.noty;

    function error(msg) {
        noty({text: msg, type: "error"});
    }

    function alert(msg) {
        noty({text: msg, type: "alert"});
    }

    function info(msg) {
        noty({text: msg, type: "information"});
    }

    function success(msg) {
        noty({text: msg, type: "success"});
    }

    function warning(msg) {
        noty({text: msg, type: "warning"});
    }

    result = {
        error: error,
        alert: alert,
        info: info,
        warning: warning,
        success: success
    };

    return result;
});
