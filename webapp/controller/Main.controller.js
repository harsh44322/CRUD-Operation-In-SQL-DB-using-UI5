sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
     "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("postgresql.controller.Main", {
            onInit: function () {

                this.loadData();
                var oModel = new JSONModel({
                    rows: []
                });
                this.getView().setModel(oModel);

            },
            loadData: function() {
                var oModel = new JSONModel();
                this.getView().setModel(oModel);
                $.ajax({
                    url: "http://localhost:3000/data",
                    method: "GET",
                    success: function(result, lastId) {
                      oModel.setData({data: result});
                      this.getView().setModel(oModel);
                    }.bind(this),
                    error: function(xhr, status, error) {
                      console.error("Failed to fetch data:", error);
                      alert("Failed to fetch data from server.");
                    }
                });
            },
            onCreate: function () {
                var oModel = this.getView().getModel();
                var aData = oModel.getProperty("/data");
    
                aData.unshift({
                    id: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    hire_date: "",
                    salary: "",
                    isNew: true
                });
                oModel.setProperty("/rows", aData);
            },
            onInputChange: function (oEvent) {
                var oModel = this.getView().getModel();
                var oContext = oEvent.getSource().getBindingContext();
                var sPath = oContext.getPath();
                var oEditedRow = oModel.getProperty(sPath);
                oModel.setProperty("/editedRow", oEditedRow);
            },
            onSave: function(){
                var oModel = this.getView().getModel();
                var oEditedRow = oModel.getProperty("/editedRow");
                if (!oEditedRow) {
                    MessageToast.show("No edited row to save");
                    return;
                }
                oEditedRow.id = Math.floor(parseInt(oEditedRow.id));
    
                $.ajax({
                    url: "http://localhost:3000/save",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(oEditedRow),
                    success: function (response) {
                        MessageToast.show("Row saved successfully");
                    },
                    error: function (error) {
                        MessageToast.show("Error saving row");
                    }
                });
            }
        });
    });
