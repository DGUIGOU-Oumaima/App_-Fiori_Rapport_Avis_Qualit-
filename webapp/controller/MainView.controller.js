sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], function(Controller, JSONModel, Filter, FilterOperator, MessageBox) {
    "use strict";

    return Controller.extend("rapportavisqualite.controller.ViewAvis", {
        onInit: function () {
            // Sample data for avis
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
                        age: "5 jours",
                        tempsCycle: "3j",
                        feu: "Vert",
                        delaiAQ: "2j",
                        delaiAQFeu: "Vert",
                        delaiDetecteur: "1j",
                        delaiDetecteurFeu: "Vert",
                        verifReceptionFeu: "Oui",
                        autreChamp: "Analyse approfondie en attente"
                    },
                    {
                        numero: "AV002",
                        type: "Qualité",
                        statut: "Fermé",
                        date: "2025-03-25",
                        creePar: "Bob",
                        article: "Art002",
                        description: "Contrôle qualité effectué",
                        age: "12 jours",
                        tempsCycle: "5j",
                        feu: "Rouge",
                        delaiAQ: "4j",
                        delaiAQFeu: "Rouge",
                        delaiDetecteur: "3j",
                        delaiDetecteurFeu: "Jaune",
                        verifReceptionFeu: "Non",
                        autreChamp: "Remarques sur le dossier"
                    }
                ]
            };

            // Dashboard data
            const oDashboardData = {
                stats: {
                    erreurs: 12,
                    warnings: 5,
                    success: 83,
                    tauxSucces: 83
                },
                chartData: [
                    { categorie: "Erreurs", valeur: 12 },
                    { categorie: "Warnings", valeur: 5 },
                    { categorie: "Succès", valeur: 83 }
                ]
            };

            // Set models
            const oAvisModel = new JSONModel(oData);
            this.getView().setModel(oAvisModel, "localAvis");

            // Use the component-level dashboard model
            const oComponent = this.getOwnerComponent();
            const oDashboardModel = oComponent.getModel("dashboard");
            oDashboardModel.setData(oDashboardData);

            // Debug: Log the model data
            console.log("Dashboard model data:", oDashboardModel.getData());

            // Ensure chart is updated after model is set
            oDashboardModel.attachRequestCompleted(function () {
                const oChart = this.byId("statusChart");
                if (oChart) {
                    oChart.rerender();
                }
            }.bind(this));
        },

        onTilePress: function (oEvent) {
            const sHeader = oEvent.getSource().getHeader();
            MessageBox.information(`Vous avez cliqué sur le tile: ${sHeader}`);
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
        },

        onShowFullVerificationReport: function (oEvent) {
            const oCtx = oEvent.getSource().getBindingContext("localAvis").getObject();
            const dialog = this.byId("verifDialog");

            const rapport = `
🔸 Délai AQ Feu de circulation : ${oCtx.delaiAQFeu || "-"}
🔸 Délai Service Détecteur Feu : ${oCtx.delaiDetecteurFeu || "-"}
🔸 Vérification Réception Info. Feu : ${oCtx.verifReceptionFeu || "-"}
🔸 Autres remarques : ${oCtx.autreChamp || "-"}
            `;

            this.byId("verifRapportText").setText(rapport.trim());
            dialog.open();
        },

        onCloseVerifDialog: function () {
            this.byId("verifDialog").close();
        },

        onShowGeneral: function () {
            this.byId("avisTable").setVisible(true);
            this.byId("delaiTable").setVisible(false);
        },

        onShowDelai: function () {
            this.byId("avisTable").setVisible(false);
            this.byId("delaiTable").setVisible(true);
        },

        onShowVerification: function () {
            this.byId("avisTable").setVisible(true);
            this.byId("delaiTable").setVisible(false);
        }
    });
});
