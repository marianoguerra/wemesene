/*global define*/
define(["postal", "treeify"], function (Bus, Tree) {
    "use strict";
    var global;

    function setValue(root, node, path, currentName, level, isLeaf) {
        return {
            publish: function (data) {
                root.publish(path, data);
            },
            subscribe: function (callback) {
                root.subscribe(path, callback);
            }
        };
    }

    function getNewInstance() {
        return Tree.create({
            "contact": {
                "connected": null,
                "disconnected": null,
                "status": "changed",
                "attribute": "changed"
            },
            "session": "started error finished",
            "user": {
                "status": "changed",
                "attribute": "changed"
            },
            "conversation": "started finished requested"
        }, setValue, Bus.channel());
    }

    global = getNewInstance();
    global.getNewInstance = getNewInstance;

    return global;
});
