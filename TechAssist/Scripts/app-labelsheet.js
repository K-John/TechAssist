var labelSheetController = (function (LabelCtrl, UICtrl, DBCtrl) {

    var DOM = UICtrl.getDOMstrings();

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

    // TODO: Create a callback function
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

    var loadLabels = function (labels) {
        console.log(labels);
        var progress = 0;
        var end = parseInt(labels[labels.length - 1].labelSpot);
        var html, newhtml, schoolAcronym;

        //TODO: Account for page breaks at i % 30 ?
        for (i = 1; end >= i; i++) {

            if (parseInt(labels[progress].labelSpot) == i) {
                console.log(LabelCtrl.getSchoolAcronym(10));
                schoolAcronym = LabelCtrl.getSchoolAcronym(labels[progress].schoolId);
                html = '<div class="label"><img class="image" src="/content/img/%schoolAcronym%.png"><div class="student"><div id="resize">%firstName%</div><div id="resize">%lastName%</div><svg class="barcode"jsbarcode-value="*%barcode%*"jsbarcode-displayvalue="false"jsbarcode-width="1"jsbarcode-height="20"jsbarcode-margin="5"></svg></div><div class="school"><span>IF FOUND, CALL %schoolAcronym%: 931-387-3201</span></div></div>';
                newhtml = html.replace(/%schoolAcronym%/g, schoolAcronym);
                newhtml = newhtml.replace(/%firstName%/g, labels[progress].firstName);
                newhtml = newhtml.replace(/%lastName%/g, labels[progress].lastName);
                newhtml = newhtml.replace(/%barcode%/g, labels[progress].barcode);
                document.getElementById(DOM.pageContainer).insertAdjacentHTML('beforeend', newhtml);
                progress++;

            } else {
                html = '<div class="label"></div>';
                document.getElementById(DOM.pageContainer).insertAdjacentHTML('beforeend', html);
            }
        }
    };

    return {
        init: function () {
            getAPIInfo();
            DBCtrl.establishDB(function (result, err) {
                if (!result) {
                    alert("There was an error connecting to the database, please refresh the page.");
                } else {
                    getDBItems();
                }
            });
            // TODO: Main loop, start at lowest label count and go up to max label count
            //      Make sure to account for any empty label spaces within that

            // Find the starting label, if it's over 1, loop creating empty labels
            
        }
    }
})(LabelController, UIController, DBController);

labelSheetController.init();