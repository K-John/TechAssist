/*
 * ~ * ~ * ~   Label Controller   ~ * ~ * ~ *
 *  
 *  
 * ~ * ~ * ~                      ~ * ~ * ~ *
 */

var LabelController = (function () {

    /*
     * Label Object
     */ 
    var Label = function (schoolId, firstName, lastName, barcode, labelSpot) {
        this.schoolId = schoolId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.barcode = barcode;
        this.labelSpot = labelSpot;
    }
    /*
     * Array that stores all label data
     */
    var data = {
        labels: []
    };

    return {
        /*
         * Adds label to the data array as a Label object
         */ 
        addItem: function (schoolId, firstName, lastName, barcode, labelSpot) {

            var newItem;

            // Create a new label object with supplied details
            newItem = new Label(schoolId, firstName, lastName, barcode, labelSpot);

            // Add the item to the data array
            data.labels.push(newItem);

            return newItem;
        },
        /*
         * Gets the biggest labelspot in the data array
         */ 
        getBiggestLabelId: function () {

            var largest = 0;

            // Loop through the data array
            for (var i = 0; i < data.labels.length; i++) {

                if (largest < data.labels[i].labelSpot) {

                    // If the labelspot in the data array is larger than what we've checked so far, update it
                    largest = data.labels[i].labelSpot;
                }
            }
            return largest;
        },

        testGetData: function () {
            return data;
        }
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
        inputSchoolId: 'SchoolId',
        inputFirstName: 'LabelModel_FirstName',
        inputLastName: 'LabelModel_LastName',
        inputBarcode: 'LabelModel_Barcode',
        inputLabelSpot: 'LabelModel_LabelPlacement',
        inputSubmit: 'submit',
        listFirstName: 'firstname',
        listLastName: 'lastname',
        listBarcode: 'barcode',
        listLabelSpot: 'labelspot',
        listExport: 'export',
        listClear: 'clear',
        listContainer: 'listcontainer',
        listRow: 'labelrow',
        previewLabel: 'labelpreview'
    };

    return {
        /*
         * Return list of DOM strings referencing IDs in the application
         */ 
        getDOMstrings: function () {
            return DOMstrings;
        },
        /*
         * Get data from Input fields
         */ 
        getInput: function () {
            return {
                schoolId: document.querySelector("#" + DOMstrings.inputSchoolId).value,
                firstName: document.querySelector("#" + DOMstrings.inputFirstName).value,
                lastName: document.querySelector("#" + DOMstrings.inputLastName).value,
                barcode: document.querySelector("#" + DOMstrings.inputBarcode).value,
                labelSpot: document.querySelector("#" + DOMstrings.inputLabelSpot).value
            }
        },
        /*
         *  Handle creating new HTML list element in the UI
         */ 
        addListItem: function (obj) {

            var html, newHtml, container;

            container = "#" + DOMstrings.listContainer;

            // Initialize HTML for new table row
            html = '<tr class="hover-view" id="labelrow-%labelSpot%"><td id="schoolacronym">%schoolId%</td><td id="firstname">%firstName%</td><td id="lastname">%lastName%</td><td id="barcode">%barcode%</td><td id="labelspot" style="text-align: center;">%labelSpot%</td><td style="text-align: center;"><span class="glyphicon glyphicon-pencil icon-hover" data-toggle="tooltip" data-placement="top" title="Edit Label" aria-hidden="true"></span><span class="glyphicon glyphicon-remove icon-hover" data-toggle="tooltip" data-placement="top" title="Remove Label" aria-hidden="true"></span></td></tr>';

            // Replace the "GET TERM HERE" for all required elements
            newHtml = html.replace(/%schoolId%/g, obj.schoolId);
            newHtml = newHtml.replace(/%firstName%/g, obj.firstName);
            newHtml = newHtml.replace(/%lastName%/g, obj.lastName);
            newHtml = newHtml.replace(/%barcode%/g, obj.barcode);
            newHtml = newHtml.replace(/%labelSpot%/g, obj.labelSpot);

            // Insert table row at the end of the list
            document.querySelector(container).insertAdjacentHTML('beforeend', newHtml);
        },
        /*
         * Clear Input Fields and set Input form up for new label
         */
        clearFields: function (labelSpot) {

            var fields, fieldsArray;

            // Create queryselector with list of fields that need to be reset (first name, last name, barcode)
            fields = document.querySelectorAll("#" + DOMstrings.inputFirstName + ", #" + DOMstrings.inputLastName + ", #" + DOMstrings.inputBarcode);

            // Separate 
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, array) {
                current.value = "";
            });

            // Set labelspot to largest labelSpot + 1
            document.querySelector("#" + DOMstrings.inputLabelSpot).value = parseInt(labelSpot) + 1;

            //Set focus to first name
            fieldsArray[0].focus();
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

        document.querySelector("#" + DOM.inputSubmit).addEventListener('click', ctrlAddLabel);

        document.addEventListener('keypress', function (event) {

            // Pressing enter key in AddLabel section
            if ((event.keyCode === 13 || event.which === 13) &&
                (document.activeElement === document.getElementById(DOM.inputSchoolId)
                    || document.activeElement === document.getElementById(DOM.inputFirstName)
                    || document.activeElement === document.getElementById(DOM.inputLastName)
                    || document.activeElement === document.getElementById(DOM.inputBarcode)
                    || document.activeElement === document.getElementById(DOM.inputLabelSpot)))
            {
                ctrlAddLabel();
            }
        });
    };

    var ctrlAddLabel = function () {

        var input, newItem;

        // Get the input field data
        input = UICtrl.getInput();

        // Add item to the label controller
        if (input.schoolId !== "" && input.firstName !== "" && input.lastName !== "" && input.barcode !== "" && input.labelSpot !== "") {

            newItem = LabelCtrl.addItem(input.schoolId, input.firstName, input.lastName, input.barcode, input.labelSpot);
        }

        // Update the database

        // Add item to the UI
        UICtrl.addListItem(newItem);

        // Clear and update input fields
        UICtrl.clearFields(LabelCtrl.getBiggestLabelId());

        //
    }

    return {
        init: function () {
            console.log("The application has started.");
            DBCtrl.establishDB();
            // 1. Grab all existing data from DB and populate list and label preview
            setupEventListeners();
        }
    };
})(LabelController, DBController, UIController);

controller.init();