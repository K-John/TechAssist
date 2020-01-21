var controller = (function (LabelCtrl, DBCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();
        // Submit in AddLabel
        document.querySelector("#" + DOM.inputSubmit).addEventListener('click', validateInput);

        document.addEventListener('keypress', function (event) {
            // Enter Key in AddLabel
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
        // Clear button in LabelList
        document.querySelector("#" + DOM.listClear).addEventListener('click', clearDB);
        // See More button in LabelList
        document.querySelector("#" + DOM.expandList).addEventListener('click', expandList);

        document.addEventListener('click', function (event) {
            // Close button on alert
            if (event.target.parentNode.id == DOM.closeAlert) {
                UICtrl.closeAlert(event.target);
            }
            // Remove button on label in LabelList
            if (event.target.parentNode.parentNode.id == DOM.listRow) {
                removeLabel(event.target.parentNode.parentNode);
            }
        });
    };

    var getAPIInfo = function (callback) {

        var xmlhttp = new XMLHttpRequest();
        var url = "/label/schoolsinfo";
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var responseArr = JSON.parse(this.responseText);
                LabelCtrl.addSchools(responseArr);
                callback();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    var validateInput = function () {

        var input = UICtrl.getInput();
        var errArray = [];
        var err = "<strong>Error.</strong> There are issue(s) with the input:<br>";

        for (field in input) {
            document.getElementById(field).classList.remove('has-error'); //Remove any existing errors from previous validation

            if (input[field] == "") {
                errArray.push("<br>- <strong>" + UICtrl.addAlertError(field) + "</strong> cannot be empty.");
            }
        }

        if (!(/^\d+$/.test(input.barcode)) || input.barcode.length < 4 || input.barcode.length > 6) {

            errArray.push("<br>- <strong>" + UICtrl.addAlertError("barcode") + "</strong> is not valid (Numeric value, 4 to 6 characters.)");
        }

        if (!LabelCtrl.schoolExists(input.schoolId) || input.schoolId == 0) {

            errArray.push("<br>- <strong>" + UICtrl.addAlertError("schoolId") + "</strong> is not a valid selection.");
        }

        if (LabelCtrl.labelExists(input.labelSpot)) {

            errArray.push("<br>- <strong>" + UICtrl.addAlertError("labelSpot") + "</strong> #<strong>" + input.labelSpot + " </strong>already exists.");
        }

        // If Error Array is not empty, display the errors and do not proceed with label creation
        if (errArray != undefined && errArray.length > 0) {

            errArray.forEach(function (item) {
                err = err.concat(item);
            });
            UICtrl.addAlert(err, false, false);
            return false;
        }

        // No errors were found with the input, proceed with creating the label
        ctrlAddLabel(LabelCtrl.newLabel(input.schoolId, UICtrl.capFirstLetter(input.firstName), UICtrl.capFirstLetter(input.lastName), input.barcode, input.labelSpot));
    };

    var ctrlAddLabel = function (newItem) {

        DBCtrl.addToDB(newItem, newItem.labelSpot, function (result, err) {
            var content;
            if (!result) {
                content = "<strong>Error.</strong> There was an issue adding <i>" + newItem.firstName + " " + newItem.lastName + "</i> from <i>" + LabelCtrl.getSchoolAcronym(newItem.schoolId) + "</i>. <br><br><strong>Details:</strong> " + err;
                UICtrl.addAlert(content, false, false);
            } else {
                content = "<strong>Success!</strong> <i>" + newItem.firstName + " " + newItem.lastName + "</i> from <i>" + LabelCtrl.getSchoolAcronym(newItem.schoolId) + "</i> has been added.";
                UICtrl.addAlert(content, true, false);
            }
        });
        LabelCtrl.addItem(newItem);
        UICtrl.addListItem(newItem, LabelCtrl.getSchoolAcronym(newItem.schoolId), 0);
        UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
        UICtrl.setLabelCount(LabelCtrl.getLabelCount());
        UICtrl.clearFields(LabelCtrl.getBiggestLabelId());
    };

    var expandList = function () {

        var threshhold = UICtrl.getExpandListThreshhold();
        var labelCount = LabelCtrl.getLabelCount();

        var start = labelCount - UICtrl.getUILabelCount();
        var end = (start - threshhold <= 0) ? 1 : (start - threshhold);

        for (i = start; i >= end; i--) {
            var label = LabelCtrl.getLabel(i - 1);
            UICtrl.addListItem(label, LabelCtrl.getSchoolAcronym(label.schoolId), 1);
        }
        UICtrl.addExpandingListCount();
        UICtrl.handleExpandingList(labelCount);
    };

    var getDBItems = function () {

        DBCtrl.getAllItems(function (success, result) {

            if (!success) {
                UICtrl.addAlert("<strong>Error.</strong> There was an issue getting your data from the database. Please refresh the page to try again.", false, true);
            } else {
                var sortedResult = LabelCtrl.insertionSort(result);
                sortedResult.forEach(function (newItem) {
                    LabelCtrl.addItem(newItem);
                    UICtrl.addListItem(newItem, LabelCtrl.getSchoolAcronym(newItem.schoolId), 0);
                    UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
                    UICtrl.setLabelCount(LabelCtrl.getLabelCount());
                    UICtrl.clearFields(LabelCtrl.getBiggestLabelId());
                });
            }
        });
    };

    var clearDB = function () {
        var content;
        DBCtrl.clearAllItems(function (result, err) {
            if (!result) {
                content = "<strong>Error.</strong> There was an error clearing the list. Please refresh the page and try again.<br><br><strong>Details: </strong>" + err;
                UICtrl.addAlert(content,false,false);
            } else {
                UICtrl.clearList();
                LabelCtrl.clearLabelData();
                UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
                UICtrl.setLabelCount(LabelCtrl.getLabelCount());
                UICtrl.clearFields(LabelCtrl.getBiggestLabelId());

                content = "<strong>Success!</strong> The database list has been cleared.";
                UICtrl.addAlert(content, true, false);
            }
        });
    };

    var removeLabel = function (label) {

        var labelSpot = label.childNodes[4].textContent;

        DBCtrl.removeItem(labelSpot, function (result, err) {
            if (!result) {
                content = "<strong>Error.</strong> There was an error removing the label. Please refresh the page and try again.<br><br><strong>Details: </strong>" + err;
                UICtrl.addAlert(content, false, false);
            } else {
                // Handle expanding list to see if we need to load labels once reached under view limit after deleting
                LabelCtrl.removeLabel(labelSpot);
                UICtrl.removeLabel(label);
                UICtrl.handleExpandingList();
                UICtrl.setLabelCount(LabelCtrl.getLabelCount());

                content = "<strong>Success!</strong> The label has been deleted."
                UICtrl.addAlert(content, true, false);
            }
        });
    };

    return {
        init: function () {

            setupEventListeners();
            DBCtrl.establishDB(function (result, err) {
                if (!result) {
                    console.log("Error connection to DB: ", err);
                    UICtrl.addAlert("<strong>Error.</strong> There was an issue connection to the database. This application will not work as intended.", false, true);
                } else {
                    getAPIInfo(getDBItems);
                }
            });
        }
    };
})(LabelController, DBController, UIController);

controller.init();