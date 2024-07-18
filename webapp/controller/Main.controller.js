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
                    method: "GET",
                    success: function(data) {
                      console.log("Data received:", data);
                      // Handle data in your SAPUI5 application
                      // Assuming you have a JSONModel initialized in your controller
                      var oModel = new sap.ui.model.json.JSONModel();
                      oModel.setData(data);
                      // Set the model to your view or control
                      this.getView().setModel(oModel);
                    }.bind(this),
                    error: function(xhr, status, error) {
                      console.error("Failed to fetch data:", error);
                      // Handle error in your SAPUI5 application
                      alert("Failed to fetch data from server.");
                    }
                  });
              }
        });
    });
