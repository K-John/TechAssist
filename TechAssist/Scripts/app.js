/*
 * ~ * ~ * ~   Label Controller   ~ * ~ * ~ *
 *  
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
    };
    /*
     * School Object
     */
    var School = function (schoolId, schoolName, schoolAcronym, schoolPhone, schoolPictureUrl) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.schoolAcronym = schoolAcronym;
        this.schoolPhone = schoolPhone;
        this.schoolPictureUrl = schoolPictureUrl;
    };

    /*
     * Array that stores all label data
     */
    var data = {
        labels: [],
        schools: []
    };

    return {
        /*
         * Adds label to the data array as a Label object
         */ 
        addItem: function (schoolId, firstName, lastName, barcode, labelSpot) {

            // Create a new label object with supplied details
            var newItem = new Label(schoolId, firstName, lastName, barcode, labelSpot);

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
        },

        addSchools: function (schools) {

            for (school of schools) {

                var newItem = new School(school["SchoolID"], school["SchoolName"], school["SchoolAcronym"], school["SchoolPhone"], school["SchoolPictureUrl"]);

                data.schools.push(newItem);
            }
        },

        getSchoolAcronym: function (schoolId) {

            for (var i = 0; i < data.schools.length; i++) {

                if (data.schools[i].schoolId == schoolId) {

                    return data.schools[i].schoolAcronym;
                }
            }
        },
        // TODO: May not need this function?
        getLabelCount: function () {
            return data.labels.length;
        }
    };
})();

/*
 * ~ * ~ * ~ Database Controller ~ * ~ * ~ *
 *  Establishes connection to IndexedDB
 *  Stores/retrieves/removes Label data
 */

var DBController = (function () {

    var db;
    var objectStoreName = "labels";

    return {

        establishDB: function (callback) {
            var openRequest = indexedDB.open('test-db0', 1);

            openRequest.onerror = function () {
                callback(false, openRequest.error);
            };

            openRequest.onsuccess = function () {
                db = openRequest.result;
                callback(true);
            };

            openRequest.onupgradeneeded = function () {
                db = openRequest.result;
                console.log("DB Upgrade Needed");
                db.createObjectStore(objectStoreName);
            }
        },

        addToDB: function (item, id, callback) {

            var transaction = db.transaction(objectStoreName, "readwrite");
            var labelStore = transaction.objectStore(objectStoreName);
            var request = labelStore.add(item, id);

            request.onsuccess = function () {
                callback(true, request.result);
            };

            request.onerror = function () {
                callback(false, request.error);
            };
        },

        testGetData: function () {

            var transaction = db.transaction(objectStoreName, "readwrite");
            var labelStore = transaction.objectStore(objectStoreName);
            var labels = labelStore.getAll();

            labels.onsuccess = function () {
                console.log(labels.result);
            };

            labels.onerror = function () {
                console.log("Error", labels.error);
            };
        }

    };
})();

/*
 * ~ * ~ * ~ User Interface Controller ~ * ~ * ~ *
 */

var UIController = (function () {

    var UILabelCount = 0;
    var expandListCount = 1;
    var expandListThreshhold = 3;
    var expandListStatus = false;

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
        addListItem: function (obj, schoolAcronym) {

            var html, newHtml, container;

            container = "#" + DOMstrings.listContainer;

            // Initialize HTML for new table row
            html = '<tr class="hover-view" id="labelrow-%labelSpot%"><td id="schoolacronym">%schoolAcronym%</td><td id="firstname">%firstName%</td><td id="lastname">%lastName%</td><td id="barcode">%barcode%</td><td id="labelspot" style="text-align: center;">%labelSpot%</td><td style="text-align: center;"><span class="glyphicon glyphicon-pencil icon-hover" data-toggle="tooltip" data-placement="top" title="Edit Label" aria-hidden="true"></span><span class="glyphicon glyphicon-remove icon-hover" data-toggle="tooltip" data-placement="top" title="Remove Label" aria-hidden="true"></span></td></tr>';

            // Replace the "GET TERM HERE" for all required elements
            newHtml = html.replace(/%schoolId%/g, obj.schoolId);
            newHtml = newHtml.replace(/%schoolAcronym%/g, schoolAcronym)
            newHtml = newHtml.replace(/%firstName%/g, obj.firstName);
            newHtml = newHtml.replace(/%lastName%/g, obj.lastName);
            newHtml = newHtml.replace(/%barcode%/g, obj.barcode);
            newHtml = newHtml.replace(/%labelSpot%/g, obj.labelSpot);

            // Insert table row at the end of the list
            document.querySelector(container).insertAdjacentHTML('afterend', newHtml);
            UILabelCount++;
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
        },

        getUILabelCount: function () {
            return UILabelCount;
        },

        getExpandListCount: function () {
            return expandListCount;
        },

        getExpandListStatus: function () {
            return expandListStatus;
        },

        getExpandListThreshhold: function () {
            return expandListThreshhold;
        }
    };
})();

/*
 * ~ * ~ * ~ Application Controller ~ * ~ * ~ *
 *  Interfaces all connections between controllers
 */

var controller = (function (LabelCtrl, DBCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector("#" + DOM.inputSubmit).addEventListener('click', validateInput);

        document.addEventListener('keypress', function (event) {

            // Pressing enter key in AddLabel section
            if ((event.keyCode === 13 || event.which === 13) &&
                (document.activeElement === document.getElementById(DOM.inputSchoolId)
                    || document.activeElement === document.getElementById(DOM.inputFirstName)
                    || document.activeElement === document.getElementById(DOM.inputLastName)
                    || document.activeElement === document.getElementById(DOM.inputBarcode)
                    || document.activeElement === document.getElementById(DOM.inputLabelSpot)))
            {
                validateInput();
            }
        });
    };

    var getAPIInfo = function () {

        var xmlhttp = new XMLHttpRequest();
        var url = "label/schoolsinfo";
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var responseArr = JSON.parse(this.responseText);
                LabelCtrl.addSchools(responseArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    var validateInput = function () {

        // Get the input field data
        var input = UICtrl.getInput();

        // Add item to the label controller
        if (input.schoolId !== "" && input.firstName !== "" && input.lastName !== "" && input.barcode !== "" && input.labelSpot !== "") {

            handleAddLabel(LabelCtrl.addItem(input.schoolId, input.firstName, input.lastName, input.barcode, input.labelSpot));
        } else {
            return false;
        }
    };

    var handleAddLabel = function (newItem) {

        DBCtrl.addToDB(newItem, newItem.labelSpot, function (result, err) {
            if (!result) {
                console.log("Error adding label to DB: ", err);
            } else {
                console.log("Label added to DB: ", err);
            }
        });
        console.log("LabelCount: ", UICtrl.getUILabelCount());

        // Add item to the UI
        UICtrl.addListItem(newItem, LabelCtrl.getSchoolAcronym(newItem.schoolId));

        //Check if UILabelCount is greater than expandListCount * expandListThreshhold
        if (UICtrl.getUILabelCount() > (UICtrl.getExpandListCount() * UICtrl.getExpandListThreshhold())) {
            console.log("Threshhold breached!!");
            //Run a UI function to handle expanding list or maybe to remove the label, then 
            //Run a UI function to remove the label, then handle the expanding list

            //In that function 
        }

        // Clear and update input fields
        UICtrl.clearFields(LabelCtrl.getBiggestLabelId());
    };

    return {
        init: function () {

            setupEventListeners();
            getAPIInfo();

            DBCtrl.establishDB(function (result, err) {
                if (!result) {
                    console.log("Error connection to DB: ", err);
                } else {
                    console.log("DB Connection Established")
                }
            });
        }
    };
})(LabelController, DBController, UIController);

controller.init();