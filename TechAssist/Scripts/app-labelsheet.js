var labelSheetController = (function (LabelCtrl, UICtrl, DBCtrl) {

    var DOM = UICtrl.getDOMstrings();

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
                alert("There was an error loading your labels. Please reload the page.");
            } else if (result < 1) {
                alert("There are no labels in queue. This could be caused by an empty label list or an unsupported browser. Please go back to the main website and refresh the page to ensure labels are still in the list.");
            } else {
                var labels = LabelCtrl.insertionSort(result);
                loadLabels(labels);
            }
        });
    };

    var loadLabels = function (labels) {
        var progress = 0;
        var end = parseInt(labels[labels.length - 1].labelSpot);
        var html, newhtml;

        for (i = 1; end >= i; i++) {

            if (parseInt(labels[progress].labelSpot) == i) {

                html = '<div class="label"><img class="image" src="/content/img/' + LabelCtrl.getSchoolAcronym(labels[progress].schoolId) + '.jpg"><div class="student"><div id="resize">' + labels[progress].firstName + '</div><div id="resize">' + labels[progress].lastName + '</div><svg class="barcode"jsbarcode-value="' + labels[progress].barcode + '"jsbarcode-displayvalue="false"jsbarcode-width="1"jsbarcode-height="20"jsbarcode-margin="5"></svg></div><div class="school"><span>IF FOUND, CALL ' + LabelCtrl.getSchoolAcronym(labels[progress].schoolId) + ': ' + LabelCtrl.getSchoolPhone(labels[progress].schoolId) + '</span></div></div>';
                document.getElementById(DOM.pageContainer).insertAdjacentHTML('beforeend', html);
                progress++;

            } else { // There is no label for this spot, put a blank label

                html = '<div class="label"></div>';
                document.getElementById(DOM.pageContainer).insertAdjacentHTML('beforeend', html);
            }

            if (i % 30 == 0) { // End current page and start a new one

                html = '</div><div class="page" id="pagecontainer">';
                var oldContainer = document.getElementById(DOM.pageContainer);
                oldContainer.removeAttribute("id");
                oldContainer.insertAdjacentHTML('afterend', html);
            }
        }

        JsBarcode(".barcode").init();
        UICtrl.resizeText();
    };

    return {
        init: function () {
            DBCtrl.establishDB(function (result, err) {
                if (!result) {
                    alert("There was an error connecting to the database, please refresh the page.");
                } else {
                    getAPIInfo(getDBItems);
                }
            });
        }
    }
})(LabelController, UIController, DBController);

labelSheetController.init();