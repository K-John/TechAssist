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

        document.querySelector("#" + DOM.expandList).addEventListener('click', expandList);

        document.addEventListener('click', function (event) {

            if (event.target.parentNode.id == DOM.closeAlert) {
                UICtrl.closeAlert(event.target);
            }
        });
    };

    var getAPIInfo = function () {

        var xmlhttp = new XMLHttpRequest();
        var url = "/label/schoolsinfo";
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

        // Create an array and push any new errors to it. At the end, if array is empty then input has been validated.
        // Otherwise, loop through errors into a string and push it as an alert.

        // "Error. There are the following issue(s) with the input: <br>
        // "<br>Not all inputs have been filled."
        // "<br>The barcode needs to be numbers only."

        //Any input is empty
        //Existing label in db
        //Valid barcode (numbers only, from 4 to 6, input.barcode.length, /^\d+$/.test(val))
        //Valid schoolId (run a labelcontroller function to check if school exists in array)

        // Add item to the label controller
        if (input.schoolId !== "" && input.firstName !== "" && input.lastName !== "" && input.barcode !== "" && input.labelSpot !== "") {

            ctrlAddLabel(LabelCtrl.newLabel(input.schoolId, input.firstName, input.lastName, input.barcode, input.labelSpot));
        } else {
            return false;
        }
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
        // Add item to label data
        LabelCtrl.addItem(newItem);
        // Add item to UI
        UICtrl.addListItem(newItem, LabelCtrl.getSchoolAcronym(newItem.schoolId), 0);
        // Update expanding list if necessary
        UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
        // Update label count on UI
        UICtrl.setLabelCount(LabelCtrl.getLabelCount());
        // Clear fields and prepare foor new label
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

    return {
        init: function () {

            setupEventListeners();
            getAPIInfo();

            DBCtrl.establishDB(function (result, err) {
                if (!result) {
                    console.log("Error connection to DB: ", err);
                    UICtrl.addAlert("<strong>Error.</strong> There was an issue connection to the database. This application will not work as intended.", false, true);
                } else {
                    console.log("DB Connection Established")
                    UICtrl.addAlert("<strong>Success!</strong> Database Connection Established.", true, true);
                }
            });
        }
    };
})(LabelController, DBController, UIController);

controller.init();