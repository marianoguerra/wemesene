/*global define*/
define(['underscore.string'], function (Str) {
    "use strict";

    function Contact(account, nick, status) {
        this._id = "contact-" + Str.slugify(account);
        this.account = account;
        this.nick = nick;
        this.status = status;
    }

    Contact.prototype.displayName = function () {
        return this.nick || this.account;
    };

    Contact.prototype.id = function () {
        return this._id;
    };

    return Contact;
});
