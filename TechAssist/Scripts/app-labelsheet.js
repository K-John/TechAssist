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

                html = '<div class="label"><img class="image" src="/content/img/%schoolAcronym%.jpg"><div class="student"><div id="resize">%firstName%</div><div id="resize">%lastName%</div><svg class="barcode"jsbarcode-value="*%barcode%*"jsbarcode-displayvalue="false"jsbarcode-width="1"jsbarcode-height="20"jsbarcode-margin="5"></svg></div><div class="school"><span>IF FOUND, CALL %schoolAcronym%: %schoolPhone%</span></div></div>';
                newhtml = html.replace(/%schoolAcronym%/g, LabelCtrl.getSchoolAcronym(labels[progress].schoolId));
                newhtml = newhtml.replace(/%firstName%/g, labels[progress].firstName);
                newhtml = newhtml.replace(/%lastName%/g, labels[progress].lastName);
                newhtml = newhtml.replace(/%barcode%/g, labels[progress].barcode);
                newhtml = newhtml.replace(/%schoolPhone%/g, LabelCtrl.getSchoolPhone(labels[progress].schoolId));
                document.getElementById(DOM.pageContainer).insertAdjacentHTML('beforeend', newhtml);
                progress++;

            } else {
                html = '<div class="label"></div>';
                document.getElementById(DOM.pageContainer).insertAdjacentHTML('beforeend', html);
            }

            if (i % 30 == 0) {

                html = '</div><div class="page" id="pagecontainer">';
                // End current page and start a new one
                var oldContainer = document.getElementById(DOM.pageContainer);
                oldContainer.removeAttribute("id");
                oldContainer.insertAdjacentHTML('afterend', html);
            }
        }

        JsBarcode(".barcode").init();
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