var AssetTagController = (function (LabelCtrl, DBCtrl, UICtrl) {

    var addAssetTag = function () {

        var input = UICtrl.getAssetTagInput();

        if (!validateInput(input)) { return; }

    };

    var validateInput = function (input) {

        var errArray = [];
        var err = "<strong>Error.</strong> There are issue(s) with the input:<br>";

        for (field in input) {
            document.getElementById(field + "_inputrow").classList.remove('has-error'); //Remove any existing errors from previous validation
        }

        if (!(/^(?!.{10,})(?=^[CL|LA]{2})(?=.*[0-9]{7}){9}.*$/.test(input.assetTag))) {

            errArray.push("<br>- <strong>" + UICtrl.addAlertError("assetTag") + "</strong> is not valid (Start with CL / LA followed by 7 numbers)");
        }

        if (!(/^\d+$/.test(input.labelSpot)) || LabelCtrl.labelExists(input.labelSpot)) {

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
        return true;
    };

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();
        // Submit in AssetTag
        //document.querySelector("#" + DOM.assetTagSubmit).addEventListener('click', addAssetTag);
        // Page Navigation button AssetTag
        //document.querySelector("#" + DOM.pageNavTitleAssetTag).addEventListener('click', function (event) { UICtrl.setActivePageNav(event.target) });
        // Update Label preview with active label
        //document.querySelector("#" + DOM.assetTagLabelSpot).addEventListener('input', function (event) { UICtrl.setActivePreview(event.target.value); });
    };

    return {
        init: function () {

            setupEventListeners();
        }
    }
})(LabelController, DBController, UIController);




var StudentLabelController = (function (LabelCtrl, DBCtrl, UICtrl) {

    var addLabel = function (event, duplicate) {

        var input = UICtrl.getInput();

        // Check if we're making duplicate labels
        if (duplicate == undefined) { if (!validateInput(input)) { return; } }
        var labelSpot = (duplicate != undefined && duplicate) ? (LabelCtrl.getBiggestLabelId() + 1).toString() : input.labelSpot;

        var newItem = LabelCtrl.newLabel(input.schoolId, UICtrl.capFirstLetter(input.firstName), UICtrl.capFirstLetter(input.lastName), input.barcode, labelSpot);

        DBCtrl.addToDB(newItem, newItem.labelSpot, function (result, err) {
            var content;
            if (!result) {
                content = "<strong>Error.</strong> There was an issue adding <i>" + newItem.firstName + " " + newItem.lastName + "</i> from <i>" + LabelCtrl.getSchoolAcronym(newItem.schoolId) + "</i>. <br><br><strong>Details:</strong> " + err;
                UICtrl.addAlert(content, false, false);
            } else {
                content = "<strong>Success!</strong> <i>" + newItem.firstName + " " + newItem.lastName + "</i> from <i>" + LabelCtrl.getSchoolAcronym(newItem.schoolId) + "</i> has been added.";
                UICtrl.addAlert(content, true, false);

                LabelCtrl.addLabel(newItem);
                UICtrl.addListItem(newItem, LabelCtrl.getSchoolAcronym(newItem.schoolId), 0);
                UICtrl.updateLabelPreview(newItem.labelSpot, true);
                UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
                UICtrl.setLabelCount(LabelCtrl.getLabelCount());

                if (input.duplicate && duplicate == undefined) {
                    addLabel(false, true);
                } else {
                    UICtrl.clearFields(LabelCtrl.getBiggestLabelId());
                    UICtrl.setActivePreview(LabelCtrl.getBiggestLabelId() + 1);
                }
            }
        });
    };

    var validateInput = function (input) {

        var errArray = [];
        var err = "<strong>Error.</strong> There are issue(s) with the input:<br>";

        for (field in input) {
            document.getElementById(field + "_inputrow").classList.remove('has-error'); //Remove any existing errors from previous validation

            if (input[field] == "" && field != "duplicate") {
                errArray.push("<br>- <strong>" + UICtrl.addAlertError(field) + "</strong> cannot be empty.");
            }
        }

        if (!(/^\d+$/.test(input.barcode)) || input.barcode.length < 4 || input.barcode.length > 6) {

            errArray.push("<br>- <strong>" + UICtrl.addAlertError("barcode") + "</strong> is not valid (Numeric value, 4 to 6 characters.)");
        }

        if (!LabelCtrl.schoolExists(input.schoolId)) {

            errArray.push("<br>- <strong>" + UICtrl.addAlertError("schoolId") + "</strong> is not a valid selection.");
        }

        if (!(/^\d+$/.test(input.labelSpot)) || LabelCtrl.labelExists(input.labelSpot)) {

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
        return true;
    };

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();

        // Submit in AddLabel
        document.querySelector("#" + DOM.inputSubmit).addEventListener('click', addLabel);
        // Page Navigation button AddLabel
        document.querySelector("#" + DOM.pageNavTitleAddLabel).addEventListener('click', function (event) { UICtrl.setActivePageNav(event.target); });
        // Change school in AddLabel
        document.querySelector("#" + DOM.inputSchoolId).addEventListener('change', function (event) { UICtrl.toggleInputVisibility(LabelCtrl.getSchoolAcronym(event.target.value)); });
        // Update Label preview with active label
        document.querySelector("#" + DOM.inputLabelSpot).addEventListener('input', function (event) { UICtrl.setActivePreview(event.target.value); });

        // Pressing Enter
        document.addEventListener('keypress', function (event) {
            // Enter Key in AddLabel
            if ((event.keyCode === 13 || event.which === 13) &&
                (document.activeElement === document.getElementById(DOM.inputSchoolId)
                    || document.activeElement === document.getElementById(DOM.inputFirstName)
                    || document.activeElement === document.getElementById(DOM.inputLastName)
                    || document.activeElement === document.getElementById(DOM.inputBarcode)
                    || document.activeElement === document.getElementById(DOM.inputLabelSpot)
                    || document.activeElement === document.getElementById(DOM.inputDuplicate))) {
                addLabel();
                return;
            }
        });
    }

    return {
        init: function () {

            setupEventListeners();
        }
    }
})(LabelController, DBController, UIController);




var controller = (function (LabelCtrl, DBCtrl, UICtrl, ImportCtrl, AssetTagCtrl, StudentLabelCtrl) {

    var version = "1.3.5";

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

    var getDBItems = function () {

        DBCtrl.getAllItems(function (success, result) {

            if (!success) {
                UICtrl.addAlert("<strong>Error.</strong> There was an issue getting your data from the database. Please refresh the page to try again.", false, true);
            } else {
                var sortedResult = LabelCtrl.insertionSort(result);
                sortedResult.forEach(function (newItem) {
                    LabelCtrl.addLabel(newItem);
                    UICtrl.addListItem(newItem, LabelCtrl.getSchoolAcronym(newItem.schoolId), 0);
                    UICtrl.updateLabelPreview(newItem.labelSpot, true);
                    UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
                    UICtrl.setLabelCount(LabelCtrl.getLabelCount());
                    UICtrl.clearFields(LabelCtrl.getBiggestLabelId());
                    UICtrl.setActivePreview(LabelCtrl.getBiggestLabelId() + 1);
                });
            }
        });
    };

    var startEditLabel = function (labelElement) {

        UICtrl.startEditLabel(LabelCtrl.getLabelBySpot(labelElement.childNodes[4].textContent), labelElement, LabelCtrl.getSchools());
    };

    var finishEditLabel = function (labelElement) {

        var input = UICtrl.getEditInput(labelElement);
        var labelSpot = labelElement.childNodes[4].textContent;

        if (!validateEdit(input)) { return; }

        var updatedItem = LabelCtrl.newLabel(input.schoolId, input.firstName, input.lastName, input.barcode, labelSpot);

        DBCtrl.updateItem(updatedItem, labelSpot, function (result, err) {
            var content;
            if (!result) {
                content = "<strong>Error.</strong> There was an issue updating <i>" + updatedItem.firstName + " " + updatedItem.lastName + "</i> from <i>" + LabelCtrl.getSchoolAcronym(updatedItem.schoolId) + "</i>. <br><br><strong>Details:</strong> " + err;
                UICtrl.addAlert(content, false, false);
            } else {
                content = "<strong>Success!</strong> <i>" + updatedItem.firstName + " " + updatedItem.lastName + "</i> from <i>" + LabelCtrl.getSchoolAcronym(updatedItem.schoolId) + "</i> has been updated.";
                UICtrl.addAlert(content, true, false);
                LabelCtrl.updateLabel(updatedItem);
                UICtrl.updateLabel(updatedItem, labelElement, LabelCtrl.getSchoolAcronym(updatedItem.schoolId));
            }
        });
    };

    var validateEdit = function (input) {

        var errArray = [];
        var err = "<strong>Error.</strong> There are issue(s) with the edit:<br>";

        if (input.firstName == "" || input.lastName == "" || input.barcode == "") {

            errArray.push("<br>- <strong>Input</strong> cannot be empty.");
        }

        if (!(/^\d+$/.test(input.barcode)) || input.barcode.length < 4 || input.barcode.length > 6) {

            errArray.push("<br>- <strong>Barcode</strong> is not valid (Numeric value, 4 to 6 characters.)");
        }

        if (!LabelCtrl.schoolExists(input.schoolId)) {

            errArray.push("<br>- <strong>School</strong> is not a valid selection.");
        }

        // If Error Array is not empty, display the errors and do not proceed with label edit
        if (errArray != undefined && errArray.length > 0) {

            errArray.forEach(function (item) {
                err = err.concat(item);
            });
            UICtrl.addAlert(err, false, false);
            return false;
        }
        return true;
    };

    var cancelEditLabel = function (labelElement) {

        var originalLabel = LabelCtrl.getLabelBySpot(labelElement.childNodes[4].textContent);

        UICtrl.updateLabel(LabelCtrl.getLabelBySpot(labelElement.childNodes[4].textContent), labelElement, LabelCtrl.getSchoolAcronym(originalLabel.schoolId));
    };

    var removeLabel = function (label) {

        var labelSpot = label.childNodes[4].textContent;

        DBCtrl.removeItem(labelSpot, function (result, err) {
            if (!result) {
                content = "<strong>Error.</strong> There was an error removing the label. Please refresh the page and try again.<br><br><strong>Details: </strong>" + err;
                UICtrl.addAlert(content, false, false);
            } else {
                LabelCtrl.removeLabel(labelSpot);
                UICtrl.removeLabel(label);
                UICtrl.updateLabelPreview(labelSpot, false);
                UICtrl.handleExpandingList();
                UICtrl.setLabelCount(LabelCtrl.getLabelCount());

                content = "<strong>Success!</strong> The label has been deleted."
                UICtrl.addAlert(content, true, false);
            }
        });
    };

    var clearDB = function () {
        var content;
        DBCtrl.clearAllItems(function (result, err) {
            if (!result) {
                content = "<strong>Error.</strong> There was an error clearing the list. Please refresh the page and try again.<br><br><strong>Details: </strong>" + err;
                UICtrl.addAlert(content, false, false);
            } else {
                UICtrl.clearList();
                LabelCtrl.clearLabelData();
                UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
                UICtrl.setLabelCount(LabelCtrl.getLabelCount());
                UICtrl.clearFields(LabelCtrl.getBiggestLabelId());
                UICtrl.setActivePreview(LabelCtrl.getBiggestLabelId() + 1);

                content = "<strong>Success!</strong> The database list has been cleared.";
                UICtrl.addAlert(content, true, false);
            }
        });
    };

    var expandList = function () {

        var threshhold = UICtrl.getExpandListThreshhold();
        var labelCount = LabelCtrl.getLabelCount();

        var start = labelCount - UICtrl.getUILabelCount();
        var end = (start - threshhold <= 0) ? 1 : (start - threshhold);

        for (i = start; i >= end; i--) {
            var label = LabelCtrl.getLabelByIndex(i - 1);
            UICtrl.addListItem(label, LabelCtrl.getSchoolAcronym(label.schoolId), 1);
        }
        UICtrl.addExpandingListCount();
        UICtrl.handleExpandingList(labelCount);
    };

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();
        // Start Import in LabelImport
        document.querySelector("#" + DOM.importSubmit).addEventListener('click', ImportCtrl.importLabel);
        // Clear button in LabelList
        document.querySelector("#" + DOM.listClear).addEventListener('click', clearDB);
        // See More button in LabelList
        document.querySelector("#" + DOM.expandList).addEventListener('click', expandList);
        // Page Navigation button LabelImport
        document.querySelector("#" + DOM.pageNavTitleLabelImport).addEventListener('click', function (event) { UICtrl.setActivePageNav(event.target); });

        // Pressing Enter
        document.addEventListener('keypress', function (event) {
            if ((event.keyCode === 13 || event.which === 13) &&
                (document.activeElement === document.getElementById(DOM.editSchoolId)
                    || document.activeElement === document.getElementById(DOM.editFirstName)
                    || document.activeElement === document.getElementById(DOM.editLastName)
                    || document.activeElement === document.getElementById(DOM.editBarcode))) {
                finishEditLabel(event.target.parentNode.parentNode);
                return;
            }
        });
        // Clicking something with a parent node
        document.addEventListener('click', function (event) {
            // Close button on alert
            if (event.target.parentNode.id == DOM.closeAlert) {
                UICtrl.closeAlert(event.target);
                return;
            }
            // Remove button on label in LabelList
            if (event.target.parentNode.parentNode.id == DOM.listRow && DOM.removeLabel != undefined && event.target.id == DOM.removeLabel) {
                removeLabel(event.target.parentNode.parentNode);
                return;
            }
            // Edit button on label in LabelList
            if (event.target.parentNode.parentNode.id == DOM.listRow && DOM.editLabel != undefined && event.target.id == DOM.editLabel) {
                startEditLabel(event.target.parentNode.parentNode);
                return;
            }
            // Save Edit button on label in LabelList
            if (event.target.parentNode.parentNode.id == DOM.listRow && event.target.id == DOM.editSave) {
                finishEditLabel(event.target.parentNode.parentNode);
                return;
            }
            // Cancel Edit button on label in LabelList
            if (event.target.parentNode.parentNode.id == DOM.listRow && event.target.id == DOM.editCancel) {
                cancelEditLabel(event.target.parentNode.parentNode);
                return;
            }
            // Clicking Label on LabelPreview
            if (event.target.parentNode.parentNode.id == DOM.previewContainer && event.target.id == DOM.previewLabel) {
                UICtrl.setActiveLabel(event.target);
                return;
            }
        });
    };

    return {
        init: function () {
            UICtrl.setVersion(version);
            setupEventListeners();
            AssetTagCtrl.init();
            StudentLabelCtrl.init();
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
})(LabelController, DBController, UIController, ImportController, AssetTagController, StudentLabelController);

controller.init();