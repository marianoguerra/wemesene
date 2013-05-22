/*global define*/
define(function () {
    "use strict";
    var mod = {}, priv = {};

    priv.joinPath = function (path, name) {
        if (path === undefined || path === "") {
            return name;
        } else {
            return path + "." + name;
        }
    };

    priv.handleStringChild = function (node, tree, valueSetter, root, level, path) {
        tree.split(" ").forEach(function (child) {
            var
                items = child.split("."),
                currentName = items[0],
                childs = items.slice(1).join(".");

            node[currentName] = mod.create(childs, valueSetter, root,
                                           level + 1, currentName,
                                           priv.joinPath(path, currentName));
        });
    };

    mod.create = function (tree, valueSetter, root, level, currentName, path) {
        var
            newRoot,
            isLeaf = false,
            node = {
                "_": null,
                "$": {}
            };

        if (root === undefined) {
            root = null;
            newRoot = node;
            newRoot.$.isRoot = true;
        } else {
            newRoot = root;
        }

        if (path === undefined) {
            path = "";
        }

        if (level === undefined) {
            level = 0;
        }

        if (currentName === undefined) {
            currentName = null;
        }

        if (Array.isArray(tree) && tree.length !== 0) {
            tree.forEach(function (item, i) {
                priv.handleStringChild(node, item, valueSetter, newRoot, level, path);
            });
        } else if (typeof tree === "string" && tree !== "") {
            priv.handleStringChild(node, tree, valueSetter, newRoot, level, path);
        } else if (tree instanceof Object) {
            Object.keys(tree).forEach(function (key) {
                var value = tree[key];

                node[key] = mod.create(value, valueSetter, newRoot, level + 1,
                                       key, priv.joinPath(path, key));
            });
        } else {
            isLeaf = true;
        }

        if (valueSetter) {
            node._ = valueSetter(root, node, path, currentName, level, isLeaf);
        }

        node.$.extend = function (extendTree, extendValueSetter) {
            var
                subTree = mod.create(extendTree, extendValueSetter || valueSetter,
                                    root, level, currentName, path);

            Object.keys(subTree).forEach(function (key) {
                if (key !== "_" && key !== "$") {
                    node[key] = subTree[key];
                }
            });
        };

        return node;
    };

    mod._priv = priv;
    return mod;
});
