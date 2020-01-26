var UIController = (function () {

    var UILabelCount = 0;
    var expandListCount = 1;
    var expandListThreshhold = 5;
    var expandListStatus = false;

    var DOMstrings = {
        inputSchoolId: 'SchoolId',
        inputFirstName: 'LabelModel_FirstName',
        inputLastName: 'LabelModel_LastName',
        inputBarcode: 'LabelModel_Barcode',
        inputLabelSpot: 'LabelModel_LabelPlacement',
        inputSubmit: 'submit',
        listSchoolAcronym: 'schoolacronym',
        listFirstName: 'firstname',
        listLastName: 'lastname',
        listBarcode: 'barcode',
        listLabelSpot: 'labelspot',
        listLabelDetails: 'labeldetails',
        listExport: 'export',
        listClear: 'clear',
        listContainer: 'listcontainer',
        listRow: 'labelrow',
        previewLabel: 'labelpreview',
        editLabel: 'editlabel',
        editSchoolId: 'editschoolid',
        editFirstName: 'editfirstname',
        editLastName: 'editlastname',
        editBarcode: 'editbarcode',
        editSave: 'editsave',
        editCancel: 'editcancel',
        removeLabel: 'removelabel',
        expandList: 'expandlist',
        labelCount: 'labelcount',
        alertContainer: 'alertcontainer',
        temporaryAlert: 'tempalert',
        permanentAlert: 'permalert',
        closeAlert: 'closealert',
        pageContainer: 'pagecontainer'
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
        getEditInput: function (element) {
            return {
                schoolId: element.querySelector("#" + DOMstrings.editSchoolId).value,
                firstName: element.querySelector("#" + DOMstrings.editFirstName).value,
                lastName: element.querySelector("#" + DOMstrings.editLastName).value,
                barcode: element.querySelector("#" + DOMstrings.editBarcode).value
            }
        },
        /*
         *  @param Label obj
         *  @param int position - Indicates whether record should be inserted at the top or bottom of the table
         */
        addListItem: function (obj, schoolAcronym, position) {

            var html, newHtml;

            var container = "#" + DOMstrings.listContainer;

            html = '<tr class="table-row" id="labelrow"><td id="schoolacronym">%schoolAcronym%</td><td id="firstname">%firstName%</td><td id="lastname">%lastName%</td><td id="barcode">%barcode%</td><td id="labelspot" style="text-align: center;">%labelSpot%</td><td style="text-align: center;" id="labeldetails"><span class="glyphicon glyphicon-pencil icon-hover" data-toggle="tooltip" data-placement="top" title="Edit Label" id= "editlabel" aria-hidden="true"></span><span class="glyphicon glyphicon-trash icon-hover hover-view" data-toggle="tooltip" data-placement="top" title="Remove Label" id="removelabel" aria-hidden="true"></span></td></tr>';
            newHtml = html.replace(/%schoolId%/g, obj.schoolId);
            newHtml = newHtml.replace(/%schoolAcronym%/g, schoolAcronym)
            newHtml = newHtml.replace(/%firstName%/g, obj.firstName);
            newHtml = newHtml.replace(/%lastName%/g, obj.lastName);
            newHtml = newHtml.replace(/%barcode%/g, obj.barcode);
            newHtml = newHtml.replace(/%labelSpot%/g, obj.labelSpot);

            if (position == 0) {
                document.querySelector(container).insertAdjacentHTML('afterend', newHtml);
            } else if (position == 1) {
                document.querySelector(container).parentElement.insertAdjacentHTML('beforeend', newHtml);
            }
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

            fieldsArray.forEach(function (current) {
                current.value = "";
            });

            // Set labelspot to largest labelSpot + 1
            document.querySelector("#" + DOMstrings.inputLabelSpot).value = parseInt(labelSpot) + 1;

            //Set focus to first name
            fieldsArray[0].focus();
        },

        handleExpandingList: function (labelCount) {

            //Remove End Label from UI
            if (UILabelCount > (expandListCount * expandListThreshhold)) {

                //TODO: Change it to one line of code to remove? No need to instantiate a new variable for this?
                var lastLabel = document.getElementById(DOMstrings.listContainer).parentElement.lastElementChild;
                lastLabel.remove();
                UILabelCount--;
            }

            //Toggle on "See More" button
            if (!expandListStatus && (labelCount > UILabelCount)) {

                document.getElementById(DOMstrings.expandList).textContent = "See More";
                expandListStatus = true;
            }

            //Toggle off "See More" button
            if (expandListStatus && (labelCount <= UILabelCount)) {

                document.getElementById(DOMstrings.expandList).textContent = "";
                expandListStatus = false;
            }
        },

        /*
         * @param boolean status    - if alert is an success/error for styling
         * @param boolean type      - if alert is permanent or temporary to be overwritten
         */ 
        addAlert: function (content, status, permanent) {

            var html, newHtml;
            var icon = (status) ? "glyphicon glyphicon-thumbs-up" : "glyphicon glyphicon-thumbs-down";
            var divClass = (status) ? "alert-success" : "alert-danger";
            var divId = (permanent) ? DOMstrings.permanentAlert : DOMstrings.temporaryAlert;

            html = '<div class="alert %divClass% alert-dismissible" id="%divId%"><button type="button" class="close" id="closealert"><span aria-hidden="true">&times;</span></button><span class="%icon% alert-icon"></span> %content%</div>';
            newHtml = html.replace(/%content%/g, content);
            newHtml = newHtml.replace(/%icon%/g, icon);
            newHtml = newHtml.replace(/%divClass%/g, divClass);
            newHtml = newHtml.replace(/%divId%/g, divId);

            if (!permanent && document.getElementById(divId)) {

                document.getElementById(divId).remove();
            }

            document.getElementById(DOMstrings.alertContainer).insertAdjacentHTML('afterbegin', newHtml);
        },

        startEditLabel: function (obj, element, schools) {

            var schoolOptions = '';

            schools.forEach(function (school) {
                schoolOptions = (school.schoolId == obj.schoolId) ? schoolOptions.concat('<option value="' + school.schoolId + '" selected>' + school.schoolAcronym + '</option>') : schoolOptions = schoolOptions.concat('<option value="' + school.schoolId + '">' + school.schoolAcronym + '</option>') ;
            });

            var fieldData = [
                [element.querySelector("#" + DOMstrings.listSchoolAcronym), '<select id="editschoolid" name="Edit School">' + schoolOptions + '</select>', true],
                [element.querySelector("#" + DOMstrings.listFirstName), '<input type="text" name="Edit First Name" id="editfirstname" value="' + obj.firstName + '" />', true],
                [element.querySelector("#" + DOMstrings.listLastName), '<input type="text" name="Edit Last Name" id="editlastname" value="' + obj.lastName + '" />', true],
                [element.querySelector("#" + DOMstrings.listBarcode), '<input type="number" name="Edit Barcode" id="editbarcode" value="' + obj.barcode + '" />', true],
                [element.querySelector("#" + DOMstrings.listLabelDetails), '<span class="glyphicon glyphicon-remove icon-hover" id="editcancel" title="Cancel Changes"></span>', false],
                [element.querySelector("#" + DOMstrings.listLabelDetails), '<span class="glyphicon glyphicon-ok icon-hover" id="editsave" title="Save Changes"></span>', false]
            ];

            fieldData.forEach(function (field) {
                if (field[2]) {
                    field[0].textContent = "";
                } else {
                    field[0].lastChild.remove();
                }
                field[0].insertAdjacentHTML('afterbegin', field[1]);
            });
        },

        updateLabel: function (obj, element, schoolAcronym) {

            var fieldData = [
                [element.querySelector("#" + DOMstrings.listSchoolAcronym), schoolAcronym],
                [element.querySelector("#" + DOMstrings.listFirstName), obj.firstName],
                [element.querySelector("#" + DOMstrings.listLastName), obj.lastName],
                [element.querySelector("#" + DOMstrings.listBarcode), obj.barcode],
                [element.querySelector("#" + DOMstrings.listLabelDetails), '<span class="glyphicon glyphicon-trash icon-hover hover-view" data-toggle="tooltip" data-placement="top" title="Remove Label" id="removelabel" aria-hidden="true"></span>'],
                [element.querySelector("#" + DOMstrings.listLabelDetails), '<span class="glyphicon glyphicon-pencil icon-hover" data-toggle="tooltip" data-placement="top" title="Edit Label" id= "editlabel" aria-hidden="true"></span>']
            ];

            fieldData.forEach(function (field) {
                field[0].lastChild.remove();
                field[0].insertAdjacentHTML('afterbegin', field[1]);
            });
        },

        closeAlert: function (element) {
            element.parentNode.parentNode.remove();
        },

        setLabelCount: function (count) {
            document.getElementById(DOMstrings.labelCount).textContent = count;
        },

        getUILabelCount: function () {
            return UILabelCount;
        },

        getExpandListThreshhold: function () {
            return expandListThreshhold;
        },

        addExpandingListCount: function () {
            expandListCount++;
        },

        // Get the input's title from the supplied element ID
        addAlertError: function (field) {
            document.getElementById(field).classList.add('has-error');

            return document.getElementById(field).childNodes[1].textContent;
        },

        capFirstLetter: function (string) {

            return string.replace(/^\w/, c => c.toUpperCase());
        },

        clearList: function () {
            var container = document.getElementById(DOMstrings.listContainer).parentNode;
            while (container.childNodes.length > 2) {
                container.lastChild.remove();
            }
        },

        removeLabel: function (label) {
            label.remove();
            UILabelCount--;
        }
    };
})();