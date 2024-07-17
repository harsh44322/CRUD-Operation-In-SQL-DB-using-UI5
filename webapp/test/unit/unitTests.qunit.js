/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"postgresql/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
