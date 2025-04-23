sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("rapportavisqualite.controller.ViewAvis", {

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
                        age: "5 jours",

                        // Champs supplémentaires pour le rapport de vérification
                        delaiAQFeu: "2j",
                        delaiServiceFeu: "3j",
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
                        delaiAQFeu: "1j",
                        delaiServiceFeu: "2j",
                        verifReceptionFeu: "Non",
                        autreChamp: "Remarques sur le dossier"
                    }
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
        },
        onShowDetails: function (oEvent) {
            const oItem = oEvent.getSource().getBindingContext("localAvis").getObject();

            const sDetails = `
🕑 Délai AQ : ${oItem.delaiAQ}
🚦 Feu de circulation : ${oItem.delaiFeu}
🛠️ Délai Service Détecteur : ${oItem.delaiDetecteur}
📥 Date réception info. : ${oItem.dateReception}
`;

            MessageBox.information(sDetails, {
                title: "Détails complémentaires"
            });
        },

        onShowFullVerificationReport: function (oEvent) {
            const oCtx = oEvent.getSource().getBindingContext("localAvis").getObject();
            const dialog = this.byId("verifDialog");

            const rapport = `
🔸 Délai AQ Feu de circulation : ${oCtx.delaiAQFeu || "-"}
🔸 Délai Service Détecteur Feu : ${oCtx.delaiServiceFeu || "-"}
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
            // tu peux ajouter d'autres tables ici si nécessaire
        },
        
        onShowDelai: function () {
            this.byId("avisTable").setVisible(false); // reste affiché
            this.byId("delaiTable").setVisible(true); // le nouveau tableau avec les autres colonnes s'affiche aussi
        },
        
        onShowVerification: function () {
            this.byId("avisTable").setVisible(true); // peut être modifié selon si tu veux le garder ou pas
            this.byId("delaiTable").setVisible(false);
            // tu peux ajouter un autre tableau ici pour la vérification si tu veux
        }
        
    });
});
