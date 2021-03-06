﻿var UIController = (function () {

    var UILabelCount = 0;
    var expandListCount = 1;
    var expandListThreshhold = 10;
    var expandListStatus = false;

    var DOMstrings = {
        inputSchoolId: 'LabelModel_SchoolId',
        inputFirstName: 'LabelModel_FirstName',
        inputLastName: 'LabelModel_LastName',
        inputBarcode: 'LabelModel_Barcode',
        inputLabelSpot: 'LabelModel_LabelPlacement',
        inputSubmit: 'submit',
        inputDuplicate: 'duplicate',
        inputRow: '_inputrow',
        assetTagAsset: 'asset_assettag',
        assetTagLabelSpot: 'labelspot_assettag',
        assetTagSubmit: 'submit_assettag',
        importSchoolIdInput: 'schoolid_import',
        importFileInput: 'file_import',
        importSubmit: 'submit_import',
        importProgressStatus: 'progress_status_import',
        importProgressBar: 'progress_percent_import',
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
        pageContainer: 'pagecontainer',
        previewContainer: 'previewcontainer',
        previewLabel: 'previewlabel',
        previewActive: 'active-label',
        previewAdded: 'added-label',
        pageNavTitleActive: 'active-nav-title',
        pageNavTitleAddLabel: 'nav_title_addlabel',
        pageNavTitleLabelImport: 'nav_title_labelimport',
        pageNavTitleAssetTag: 'nav_title_assettag',
        pageNavContentActive: 'active-nav-content',
        pageNavContentAddLabel: 'nav_content_addlabel',
        pageNavContentLabelImport: 'nav_content_labelimport',
        pageNavContentAssetTag: 'nav_content_assettag',
        version: 'version'
    };

    var replaceAll = function (str, mapObj) {
        var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
        return str.replace(re, function (matched) {
            return mapObj[matched];
        });
    };

    return {

        getDOMstrings: function () {
            return DOMstrings;
        },

        getInput: function () {
            return {
                schoolId: document.querySelector("#" + DOMstrings.inputSchoolId).value,
                firstName: document.querySelector("#" + DOMstrings.inputFirstName).value,
                lastName: document.querySelector("#" + DOMstrings.inputLastName).value,
                barcode: document.querySelector("#" + DOMstrings.inputBarcode).value,
                labelSpot: document.querySelector("#" + DOMstrings.inputLabelSpot).value,
                duplicate: document.querySelector("#" + DOMstrings.inputDuplicate).checked
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
        getImportInput: function () {
            return {
                schoolId: document.querySelector("#" + DOMstrings.importSchoolIdInput).value,
                file: document.querySelector("#" + DOMstrings.importFileInput).files[0]
            }
        },
        getAssetTagInput: function () {
            return {
                assetTag: document.querySelector("#" + DOMstrings.assetTagAsset).value,
                labelSpot: document.querySelector("#" + DOMstrings.assetTagLabelSpot).value
            }
        },
        /*
         *  @param Label obj
         *  @param int position - Indicates whether record should be inserted at the top or bottom of the table
         */
        addListItem: function (obj, schoolAcronym, position) {

            var container = "#" + DOMstrings.listContainer;

            var htmlString = '<tr class="table-row" id="labelrow"><td id="schoolacronym">%schoolacronym%</td><td id="firstname">%firstName%</td><td id="lastname">%lastName%</td><td id="barcode">%barcode%</td><td id="labelspot" style="text-align: center;">%labelSpot%</td><td style="text-align: center;" id="labeldetails"><span class="glyphicon glyphicon-pencil icon-hover" data-toggle="tooltip" data-placement="top" title="Edit Label" id= "editlabel" aria-hidden="true"></span><span class="glyphicon glyphicon-trash icon-hover hover-view" data-toggle="tooltip" data-placement="top" title="Remove Label" id="removelabel" aria-hidden="true"></span></td></tr>';
            var mapObj = {
                "%schoolacronym%": schoolAcronym,
                "%firstName%": obj.firstName,
                "%lastName%": obj.lastName,
                "%barcode%": obj.barcode,
                "%labelSpot%": obj.labelSpot
            };
            var html = replaceAll(htmlString, mapObj);

            if (position == 0) {
                document.querySelector(container).insertAdjacentHTML('afterend', html);
            } else if (position == 1) {
                document.querySelector(container).parentElement.insertAdjacentHTML('beforeend', html);
            }
            UILabelCount++;
        },

        handleExpandingList: function (labelCount) {

            //Remove End Label from UI
            if (UILabelCount > (expandListCount * expandListThreshhold)) {

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

        addExpandingListCount: function () {
            expandListCount++;
        },

        startEditLabel: function (obj, element, schools) {

            var schoolOptions = '';

            schools.forEach(function (school) {
                schoolAcronym = (school.schoolAcronym != null) ? school.schoolAcronym : '';
                schoolOptions = (school.schoolId == obj.schoolId) ? schoolOptions.concat('<option value="' + school.schoolId + '" selected>' + schoolAcronym + '</option>') : schoolOptions = schoolOptions.concat('<option value="' + school.schoolId + '">' + schoolAcronym + '</option>');
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

        removeLabel: function (label) {
            label.remove();
            UILabelCount--;
        },

        clearList: function () {
            var container = document.getElementById(DOMstrings.listContainer).parentNode;
            while (container.childNodes.length > 2) {
                container.lastChild.remove();
            }
            var labels = document.querySelectorAll("." + DOMstrings.previewAdded);
            expandListCount = 1;
            UILabelCount = 0;

            [].forEach.call(labels, function (el) {
                el.classList.remove(DOMstrings.previewAdded);
            });
        },

        /*
         * @param boolean status    - if alert is an success/error for styling
         * @param boolean type      - if alert is permanent or temporary to be overwritten
         */
        addAlert: function (content, status, permanent) {

            var icon = (status) ? "glyphicon glyphicon-thumbs-up" : "glyphicon glyphicon-thumbs-down";
            var divClass = (status) ? "alert-success" : "alert-danger";
            var divId = (permanent) ? DOMstrings.permanentAlert : DOMstrings.temporaryAlert;

            var htmlString = '<div class="alert %divClass% alert-dismissible" id="%divId%"><button type="button" class="close" id="closealert"><span aria-hidden="true">&times;</span></button><span class="%icon% alert-icon"></span> %content%</div>';
            var mapObj = {
                "%content%": content,
                "%icon%": icon,
                "%divClass%": divClass,
                "%divId%": divId
            };
            var html = replaceAll(htmlString, mapObj);

            if (!permanent && document.getElementById(divId)) {
                document.getElementById(divId).remove();
            }

            document.getElementById(DOMstrings.alertContainer).insertAdjacentHTML('afterbegin', html);
        },

        addAlertError: function (field) {
            document.getElementById(field + DOMstrings.inputRow).classList.add('has-error');

            return document.getElementById(field + DOMstrings.inputRow).childNodes[1].textContent;
        },

        closeAlert: function (element) {
            element.parentNode.parentNode.remove();
        },

        clearAlerts: function () {
            var container = document.getElementById(DOMstrings.alertContainer);
            while (container.childNodes.length > 0) {
                container.lastChild.remove();
            }
        },

        setActiveLabel: function (element) {

            if (parseInt(labelSpot) > 30) { return; }

            if (element.classList.contains(DOMstrings.previewAdded)) { return; }

            var labelSpot = parseInt(element.textContent);

            document.getElementById(DOMstrings.inputLabelSpot).value = labelSpot;
            document.getElementById(DOMstrings.assetTagLabelSpot).value = labelSpot;
            document.getElementById(DOMstrings.inputFirstName).focus();

            [].forEach.call(document.querySelectorAll("." + DOMstrings.previewActive), function (el) {
                el.classList.remove(DOMstrings.previewActive);
            });

            element.classList.add(DOMstrings.previewActive);
        },

        setActivePreview: function (labelSpot) {

            var container = document.getElementById(DOMstrings.previewContainer);
            var labels = document.querySelectorAll("." + DOMstrings.previewActive);

            [].forEach.call(labels, function (el) {
                el.classList.remove(DOMstrings.previewActive);
            });

            if (labelSpot != undefined && parseInt(labelSpot) <= 30) {
                container.childNodes[parseInt(labelSpot) * 2 - 1].childNodes[1].classList.add(DOMstrings.previewActive);
            }
        },

        updateLabelPreview: function (labelSpot, status) {

            if (parseInt(labelSpot) > 30) { return; }

            var label = document.getElementById(DOMstrings.previewContainer).childNodes[parseInt(labelSpot) * 2 - 1].childNodes[1];

            if (status) {
                label.classList.add(DOMstrings.previewAdded);
            } else {
                label.classList.remove(DOMstrings.previewAdded);
            }
        },

        clearFields: function (labelSpot) {

            var fields, fieldsArray;

            fields = document.querySelectorAll("#" + DOMstrings.inputFirstName + ", #" + DOMstrings.inputLastName + ", #" + DOMstrings.inputBarcode);

            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function (current) {
                current.value = "";
            });

            document.querySelector("#" + DOMstrings.inputLabelSpot).value = parseInt(labelSpot) + 1;
            fieldsArray[0].focus();
        },

        toggleInputVisibility: function (schoolAcronym) {

            var element = document.getElementById(DOMstrings.inputDuplicate);

            if (schoolAcronym == null || (!schoolAcronym.includes("MS") && !schoolAcronym.includes("HS"))) {
                element.checked = false;
                element.parentNode.parentNode.style.display = "none";
                return;
            }

            element.parentNode.parentNode.style.display = "block";
        },

        setActivePageNav: function (element) {

            if (element.classList.contains(DOMstrings.pageNavTitleActive)) { return; }

            [].forEach.call(document.querySelectorAll("." + DOMstrings.pageNavTitleActive + ", ." + DOMstrings.pageNavContentActive), function (el) {
                el.classList.remove(DOMstrings.pageNavTitleActive);
                el.classList.remove(DOMstrings.pageNavContentActive);
            });

            if (element.id === DOMstrings.pageNavTitleAddLabel) {

                element.classList.add(DOMstrings.pageNavTitleActive);
                document.getElementById(DOMstrings.pageNavContentAddLabel).classList.add(DOMstrings.pageNavContentActive);
                return;
            }

            if (element.id === DOMstrings.pageNavTitleLabelImport) {

                element.classList.add(DOMstrings.pageNavTitleActive);
                document.getElementById(DOMstrings.pageNavContentLabelImport).classList.add(DOMstrings.pageNavContentActive);
                return;
            }

            if (element.id === DOMstrings.pageNavTitleAssetTag) {

                element.classList.add(DOMstrings.pageNavTitleActive);
                document.getElementById(DOMstrings.pageNavContentAssetTag).classList.add(DOMstrings.pageNavContentActive);
                return;
            }
        },

        setImportStatus: function (text) {
            document.getElementById(DOMstrings.importProgressStatus).textContent = text;
        },

        setImportProgress: function (percent) {
            var percentString = percent + "%";
            var progressBar = document.getElementById(DOMstrings.importProgressBar);

            progressBar.parentNode.style.display = "block";
            progressBar.style.width = percentString;
            progressBar.textContent = percentString;
        },

        resizeText: function () {

            var text = document.querySelectorAll("#resize");

            [].forEach.call(text, function (el) {
                if (el.scrollWidth > el.clientWidth) {
                    el.style.fontSize = "smaller";
                }
            });
        },

        getExpandListThreshhold: function () {
            return expandListThreshhold;
        },

        getUILabelCount: function () {
            return UILabelCount;
        },

        capFirstLetter: function (string) {

            return string.replace(/^\w/, c => c.toUpperCase());
        },

        setLabelCount: function (count) {
            document.getElementById(DOMstrings.labelCount).textContent = count;
        },

        setVersion: function (version) {
            document.getElementById(DOMstrings.version).textContent = " - v. " + version;
        }
    };
})();