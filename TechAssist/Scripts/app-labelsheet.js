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

    var loadLabels = function (labels) {
        console.log(labels);
        var start = parseInt(labels[0].labelSpot);
        var end = parseInt(labels[labels.length - 1].labelSpot);

        console.log(start + " " + end);

        if (start > 1) {
            for (i = 1; start > i; i++) {
                console.log("Creating empty labels: " + i + "Up to: " + start);
                var html ='<div class="label"></div>';
                document.getElementById(DOM.pageContainer).insertAdjacentHTML('beforeend', html);
            }
        }

        //TODO: NONE OF THIS WORKS. LOGIC IS NOT CORRECT!!
        for (i = 1; end > i; i++) {

            for (j = 0; labels.length > j; j++) {
                if (parseInt(labels[j].labelSpot) > i) {
                    console.log("Skipping #: " + i + "Label: " + labels[j].labelSpot);
                } else {

                }
            }

            if (parseInt(labels[i - 1].labelSpot) != i) {
                console.log("Skipping #: " + i + "Label: " + parseInt(labels[i].labelSpot));
            } else {
                console.log("All good: ", i);
            }
        }
    };

    return {
        init: function () {
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