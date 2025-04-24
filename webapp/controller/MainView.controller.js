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
                    },
                    {
                        numero: "AV003",
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
                    },
                    {
                        numero: "AV004",
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
                    },
                    {
                        numero: "AV005",
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
                    },
                    {
                        numero: "AV006",
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
                    },
                    {
                        numero: "AV007",
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
        },



        onShowEditForm: function (oEvent) {
            const oCtx = oEvent.getSource().getBindingContext("localAvis").getObject();
            const oFormModel = new JSONModel(oCtx);
            this.getView().setModel(oFormModel, "formModel");
            const oDialog = this.byId("editFormDialog");
            oDialog.open();
        },
        
        onCloseEditForm: function () {
            const oDialog = this.byId("editFormDialog");
            oDialog.close();
        },
        
        onSaveForm: function () {
            const oFormModel = this.getView().getModel("formModel");
            const oData = oFormModel.getData();
            MessageBox.information("Données enregistrées (simulation) : " + JSON.stringify(oData));
            this.byId("editFormDialog").close();
        },


        onDownloadRow: function (oEvent) {
            // Récupérer les données de la ligne cliquée
            const oCtx = oEvent.getSource().getBindingContext("localAvis").getObject();
        
            // Vérifier que les données existent
            if (!oCtx || !oCtx.numero) {
                MessageBox.error("Erreur : aucune donnée valide à télécharger.");
                return;
            }
        
            // Créer le contenu JSON
            const sJsonContent = JSON.stringify(oCtx, null, 2);
        
            // Créer un Blob pour le fichier JSON
            const oBlob = new Blob([sJsonContent], { type: "application/json;charset=utf-8;" });
        
            // Créer un lien de téléchargement
            const sUrl = URL.createObjectURL(oBlob);
            const oLink = document.createElement("a");
            oLink.setAttribute("href", sUrl);
            oLink.setAttribute("download", `avis_${oCtx.numero}.json`);
            document.body.appendChild(oLink);
        
            // Déclencher le téléchargement
            oLink.click();
        
            // Nettoyer
            document.body.removeChild(oLink);
            URL.revokeObjectURL(sUrl);
        
            // Message de confirmation
            MessageBox.information(`Fichier JSON pour l'avis ${oCtx.numero} téléchargé.`);
        },
        onToggleDashboard: function () {
            var oDashboard = this.byId("dashboardBox");
            var bVisible = oDashboard.getVisible();
            oDashboard.setVisible(!bVisible);
          }
    });
});
