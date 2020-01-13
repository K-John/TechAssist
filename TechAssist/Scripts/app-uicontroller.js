var UIController = (function () {

    var UILabelCount = 0;
    var expandListCount = 1;
    var expandListThreshhold = 2;
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
        previewLabel: 'labelpreview',
        expandList: 'expandlist',
        labelCount: 'labelcount',
        alertContainer: 'alertcontainer',
        temporaryAlert: 'tempalert',
        permanentAlert: 'permalert',
        closeAlert: 'closealert'
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
         *  @param Label obj
         *  @param int position - Indicates whether record should be inserted at the top or bottom of the table
         */
        addListItem: function (obj, schoolAcronym, position) {

            var html, newHtml;

            var container = "#" + DOMstrings.listContainer;

            html = '<tr class="hover-view" id="labelrow-%labelSpot%"><td id="schoolacronym">%schoolAcronym%</td><td id="firstname">%firstName%</td><td id="lastname">%lastName%</td><td id="barcode">%barcode%</td><td id="labelspot" style="text-align: center;">%labelSpot%</td><td style="text-align: center;"><span class="glyphicon glyphicon-pencil icon-hover" data-toggle="tooltip" data-placement="top" title="Edit Label" aria-hidden="true"></span><span class="glyphicon glyphicon-remove icon-hover" data-toggle="tooltip" data-placement="top" title="Remove Label" aria-hidden="true"></span></td></tr>';
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

            fieldsArray.forEach(function (current, index, array) {
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
                var lastLabelId = document.getElementById(DOMstrings.listContainer).parentElement.lastElementChild.id;
                document.getElementById(lastLabelId).remove();
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
        }
    };
})();