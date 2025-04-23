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
                        delaiAQ: "2j",
                        delaiService: "3j",
                        verifReception: "OK"
                    }
                    // ...
                ]
            };
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "localAvis");
        
            // Initial segment selection
            this._updateColumnVisibility("general");
        },
        
        onSegmentChange: function (oEvent) {
            const sKey = oEvent.getParameter("key");
            this._updateColumnVisibility(sKey);
        },
        
        _updateColumnVisibility: function (groupKey) {
            const view = this.getView();
        
            const oCols = {
                general: ["colNumero", "colType", "colStatut", "colDate"],
                delais: ["colDelaiAQ", "colDelaiService"],
                verifications: ["colVerifReception"]
            };
        
            // Masquer toutes les colonnes sauf celle du bouton détail
            const allColumns = [
                "colNumero", "colType", "colStatut", "colDate",
                "colDelaiAQ", "colDelaiService",
                "colVerifReception"
            ];
        
            allColumns.forEach(colId => {
                const col = view.byId(colId);
                if (col) col.setVisible(false);
            });
        
            // Afficher les colonnes du groupe sélectionné
            const visibleCols = oCols[groupKey] || [];
            visibleCols.forEach(colId => {
                const col = view.byId(colId);
                if (col) col.setVisible(true);
            });
        
            // Toujours visible : bouton détails
            const colDetails = view.byId("colDetails");
            if (colDetails) colDetails.setVisible(true);
        },
        
        onShowDetails: function (oEvent) {
            const oButton = oEvent.getSource();
            const oCtx = oButton.getBindingContext("localAvis").getObject();
            const oPopover = this.byId("detailsPopover");
        
            let detailString = `
                • Créé par: ${oCtx.creePar}
                • Article: ${oCtx.article}
                • Description: ${oCtx.description}
                • Âge: ${oCtx.age}
                • Délai AQ: ${oCtx.delaiAQ}
                • Délai Service: ${oCtx.delaiService}
                • Vérification: ${oCtx.verifReception}
            `;
        
            this.byId("detailsText").setText(detailString.trim());
            oPopover.openBy(oButton);
        }
        
        
        
    });
});
