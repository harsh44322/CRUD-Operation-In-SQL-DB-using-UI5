sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("postgresql.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel();

                this.getView().setModel(oModel);

                this.loadData();
            },
            loadData: function() {
                var that = this;
                
                $.ajax({
                  url: "http://localhost:3000/data",
                  success: function(data) {
                    that.getView().getModel().setData(data);
                    console.log(data);
                  },
                  error: function() {
                    alert("Failed to fetch data from server.");
                  }
                });
              }
        });
    });
