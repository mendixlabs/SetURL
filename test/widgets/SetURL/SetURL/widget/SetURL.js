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
		useBackButton: false,

        update: function (obj, callback) {
            callback();

            this._contextObj = obj;

            this.replaceattributes = [];
            if (!obj || !this.attrs) {
                this.fixUrl(this.url);
            } else {
                this._loadData(obj);
            }
        },

        _loadData: function (obj) {
            var funcArr = this.attrs.map(function (attr) {
                return function (cb) {
                    this._contextObj.fetch(attr.attr, dojo.hitch(this, function (value) {
                        this.replaceattributes.push({
                            variable: attr.variablename,
                            value: value
                        });
                        cb();
                    }));
                };
            });

            this.collect(funcArr, dojo.hitch(this, this._buildString), this);
        },

        _buildString: function () {
            var settings = null,
                attr = null,
                url = this.url;

            for (attr in this.replaceattributes) {
                settings = this.replaceattributes[attr];
                url = url.split("${" + settings.variable + "}").join(settings.value);
            }
            this.fixUrl(url);
        },

        fixUrl: function (newUrl) {
            var url = (newUrl.indexOf("/") === 0 ? "" : "/") + newUrl;
            this.origPath = mx.homeUrl.replace(mx.appUrl, "/");
            var state = history.state;
			
			if (useBackButton){
				this.addUrl(url);
			}
		},

            history.replaceState(state, "", url);
            this.replaced = true;
            this._onNavigateTo = aspect.before(this.mxform, "navigateTo", lang.hitch(this, this.removeUrl));
        },
		//when navigating to other app and you want to use the backbutton
		addUrl: function (newUrl) {
			var url = (newUrl.indexOf("/") === 0 ? "" : "/") + newUrl;
			this.origPath = mx.homeUrl.replace(mx.appUrl, "/");
			var state = history.state;
			
			history.pushState(state, "", url);
			//this.replaced = true;
			//this._onNavigateTo = aspect.before(this.mxform, "navigateTo", lang.hitch(this, this.removeUrl));
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
