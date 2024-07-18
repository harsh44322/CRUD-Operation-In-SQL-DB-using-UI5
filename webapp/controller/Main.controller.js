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
                // var oModel = new JSONModel();

                // this.getView().setModel(oModel);

                this.loadData();
            },
            loadData: function() {
                var oModel = new JSONModel();
      this.getView().setModel(oModel);

      // Fetch data from the server
    //   $.ajax({
    //     url: 'http://localhost:3000/data',
    //     method: 'GET',
    //     success: function (data) {
    //       oModel.setData({ items: data });
    //     },
    //     error: function (error) {
    //       console.error("Error fetching data", error);
    //     }
    //   });
                var aData = $.ajax({
                    url: "http://localhost:3000/data",
                    method: "GET",
                    success: function(result) {
                      console.log("Data received:", result);
                      var oModel = new sap.ui.model.json.JSONModel();
                      oModel.setData(result);
                      this.getView().setModel(oModel);
                    }.bind(this),
                    error: function(xhr, status, error) {
                      console.error("Failed to fetch data:", error);
                      alert("Failed to fetch data from server.");
                    }
                  });
              }
        });
    });
