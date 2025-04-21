sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("frontendapp.controller.MainView", {

        onInit: function () {
            const oData = {
                avis: [
                    {
                        numero: "AV001",
                        type: "Technique",
                        statut: "Ouvert",
                        date: "2025-04-01",
                        creePar: "Alice",
                        article: "Art001",
                        description: "Problème technique détecté",
                        age: "5 jours"
                    },
                    {
                        numero: "AV002",
                        type: "Qualité",
                        statut: "Fermé",
                        date: "2025-03-25",
                        creePar: "Bob",
                        article: "Art002",
                        description: "Contrôle qualité effectué",
                        age: "12 jours"
                    }
                    // Tu peux ajouter d’autres objets ici
                ]
            };

            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "localAvis");
        },

        onFilter: function () {
            const oView = this.getView();
            const numeroValue = oView.byId("numeroAvisInput").getValue();
            const typeValue = oView.byId("typeAvisInput").getValue();
            const statutValue = oView.byId("statutAvisInput").getValue();

            const aFilters = [];

            if (numeroValue) {
                aFilters.push(new Filter("numero", FilterOperator.Contains, numeroValue));
            }
            if (typeValue) {
                aFilters.push(new Filter("type", FilterOperator.Contains, typeValue));
            }
            if (statutValue) {
                aFilters.push(new Filter("statut", FilterOperator.Contains, statutValue));
            }

            const oTable = oView.byId("avisTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }
    });
});
