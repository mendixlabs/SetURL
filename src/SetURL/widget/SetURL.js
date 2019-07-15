define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "dojo/_base/lang",
    "dojo/aspect"
], function (declare, _WidgetBase, lang, aspect) {
    "use strict";

    return declare("SetURL.widget.SetURL", [_WidgetBase], {

        replaced: false,
        origPath: "",
        _onNavigateTo: null,
        _contextObj: null,
        urlpostfix: "",
        attr: "",
        attributeList: null,
        replaceattributes: null,
        getattributes: null,

        update: function (obj, callback) {
            callback();

            this._contextObj = obj;

            this.replaceattributes = [];
            this.getattributes = [];
            if (!obj || (!this.attrs || !this.getparams)) {
                this.fixUrl(this.url);
            } else {
                this._loadData(obj);
            }
        },

        _loadData: function (obj) {
            var funcArr = [];
            funcArr = funcArr.concat(this.attrs.map(function (attr) {
                return function (cb) {
                    this._contextObj.fetch(attr.attr, dojo.hitch(this, function (value) {
                        this.replaceattributes.push({
                            variable: attr.variablename,
                            replacespaces : attr.replacespaces,
                            value: value
                        });
                        cb();
                    }));
                };
            }));
            funcArr = funcArr.concat(this.getparams.map(function (attr) {
                return function (cb) {
                    this._contextObj.fetch(attr.attr, dojo.hitch(this, function (value) {
                        if (!!value || !attr.discardempty) {
                            this.getattributes.push([attr.variablename, value].join("="));
                        }
                        cb();
                    }));
                };
            }));

            this.collect(funcArr, dojo.hitch(this, this._buildString), this);
        },

        _buildString: function () {
            var settings = null,
                attr = null,
                url = this.url;

            for (attr in this.replaceattributes) {
                settings = this.replaceattributes[attr];

                if (settings.replacespaces)
                    settings.value = settings.value.toString().replace(/ /g, '-')
                
                url = url.split("${" + settings.variable + "}").join(settings.value);
            }
            if (this.getattributes.length > 0) {
                if (url.indexOf("?") >= 0) {
                    console.error("SetURL.js: URL already seems to contain get parameters. Skipping get params.");
                } else {
                    var getparams = this.getattributes.join("&");
                    url += "?" + getparams;
                }
            }
            this.fixUrl(url);
        },

        fixUrl: function (newUrl) {
            var url = (newUrl.indexOf("/") === 0 ? "" : "/") + newUrl;
            this.origPath = mx.homeUrl.replace(mx.appUrl, "/");
            var state = history.state;

            history.replaceState(state, "", url);
            this.replaced = true;
            this._onNavigateTo = aspect.before(this.mxform, "navigateTo", lang.hitch(this, this.removeUrl));
        },

        removeUrl: function () {
            if (this.replaced) {
                var state = history.state;
                var url = this.origPath;
                history.replaceState(state, this.title, url);
                this.replaced = false;
            }
        },

        uninitialize: function () {
            this._onNavigateTo.remove();
        }
    });
});

require(["SetURL/widget/SetURL"]);
