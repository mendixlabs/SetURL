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
		urlpostfix: "",
		attr: "",
		
		startup: function () {
			
		},

		update: function (obj, callback) {
			callback();

			if (this.replaced)
				return;

			this.fixUrl(obj);
		},

		fixUrl: function (obj) {
			var attrval = "";
			if (obj !== null && this.attr !== "") {
				attrval = obj.get(this.attr);
			}
			this.origPath = location.pathname;
			var state = history.state;
			var prefix = (this.urlprefix.indexOf("/") === 0 ? "" : "/") + this.urlprefix;
			var url = prefix + attrval + this.urlpostfix;
			history.replaceState(state, this.title, url);
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
