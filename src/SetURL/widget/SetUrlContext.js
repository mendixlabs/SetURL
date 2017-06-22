define([
    "dojo/_base/declare", "SetURL/widget/SetURL"
], function (declare, SetURL) {
    "use strict";

    // Declare widget"s prototype.
    return declare("SetURL.widget.SetURLContext", [SetURL]);

});

require(["SetURL/widget/SetURLContext"]);