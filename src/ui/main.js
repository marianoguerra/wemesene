/*global define*/
define(['ui/contact-list', 'jquery', 'dust!../../tpl/main.html'],
       function (ContactList, $, mainTpl) {
    "use strict";

    function Main(bus) {
        this.bus = bus;
        this.contacts = new ContactList(bus);
        this.$container = null;
        this.$contactsContainer = null;
        this.$conversationsContainer = null;
    }

    Main.prototype.render = function (parent) {
        var that = this;
        mainTpl({}, function (err, html) {
            that.$container = $(html);
            parent.html(that.$container);
            that.$container.height(parent.height());

            that.$contactsContainer = that.$container
                .find(".contact-list-container");
            that.$contactsContainer.height(that.$container.height());
            that.$conversationsContainer = that.$container
                .find(".conversations-container");

            that.contacts.render(that.$contactsContainer);
        });
    };

    return Main;
});
