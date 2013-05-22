/*global define*/
define(['jquery', 'dust!../../tpl/contact-list.html', 'dust!../../tpl/contact.html'],
       function ($, contactListTpl, contactTpl) {
    "use strict";

    function ContactList(bus) {
        this.bus = bus;
        this.$contactList = null;
        this.$contacts = null;
        this.$search = null;

        this.bus.contact.connected._.subscribe(this.onContactConnected
                                               .bind(this));
        this.bus.contact.disconnected._.subscribe(this.onContactDisconnected
                                               .bind(this));
    }

    ContactList.prototype.render = function (parent) {
        var clist = this;
        contactListTpl({}, function (err, html) {
            clist.$contactList = $(html);
            parent.html(clist.$contactList);
            clist.$contactList.height(parent.height());

            clist.$contacts = clist.$contactList.find(".contact-list-body");
            clist.$search = clist.$contactList.find(".contact-list-search");
        });
    };

    ContactList.prototype.onContactConnected = function (contact) {
        var that = this;
        contactTpl({
            id: contact.id(),
            displayName: contact.displayName(),
            message: contact.message
        }, function (err, html) {
            var $contact = $(html);
            $contact.data("contact", contact);
            that.$contacts.append($contact);
        });
    };

    ContactList.prototype.onContactDisconnected = function (contact) {
        this.$contactList.children("#" + contact.id());
    };

    return ContactList;
});
