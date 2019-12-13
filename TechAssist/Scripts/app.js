/*
 * ~ * ~ * ~   Label Controller   ~ * ~ * ~ *
 *  
 *  
 * ~ * ~ * ~                      ~ * ~ * ~ *
 */

var LabelController = (function () {

    return {

    };
})();

/*
 * ~ * ~ * ~ Database Controller ~ * ~ * ~ *
 *  Establishes connection to IndexedDB
 *  Stores/retrieves/removes Label data
 * ~ * ~ * ~                     ~ * ~ * ~ *
 */

var DBController = (function () {

    var db;

    return {

        establishDB: function () {
            var openRequest = indexedDB.open('test-db1', 1);

            openRequest.onerror = function () {
                // Open UIController Alert method and throw error:
                // "IndexedDB is not supported by your browser, this application may not work correctly."
                console.log("Error:" + openRequest.error);
                return;
            }

            openRequest.onsuccess = function () {
                db = openRequest.result;
                console.log("DB Connection established.");
                return true;
            }
        }
    };
})();

/*
 * ~ * ~ * ~ User Interface Controller ~ * ~ * ~ *
 *  
 *  
 * ~ * ~ * ~                           ~ * ~ * ~ *
 */

var UIController = (function () {

    var DOMstrings = {
        inputSchoolId: '#SchoolId',
        inputFirstName: '#LabelModel_FirstName',
        inputLastName: '#LabelModel_LastName',
        inputBarcode: '#LabelModel_Barcode',
        inputLabelSpot: '#LabelModel_LabelPlacement',
        inputSubmit: '#submit',
        listFirstName: '#firstname',
        listLastName: '#lastname',
        listBarcode: '#barcode',
        listLabelSpot: '#labelspot',
        listExport: '#export',
        listClear: '#clear',
        previewLabel: '#labelpreview'
    };

    return {
        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

/*
 * ~ * ~ * ~ Application Controller ~ * ~ * ~ *
 *  
 *  Interfaces all connections between controllers
 *  
 * ~ * ~ * ~                        ~ * ~ * ~ *
 */

var controller = (function (LabelCtrl, DBCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputSubmit).addEventListener('click', ctrlAddLabel);
    };

    var ctrlAddLabel = function () {

        // Get the input field data

        // Add item to the label controller

        // Update the database

        // Add item to the UI

        // Clear and update input fields

        //
    }

    return {
        init: function () {
            console.log("The application has started.");
            DBCtrl.establishDB();
        }
    };
})(LabelController, DBController, UIController);

controller.init();