var ImportController = (function (LabelCtrl, DBCtrl, UICtrl) {

    var labels;
    var loopCount = 0;

    var validateImport = function (input) {

        var errArray = [];
        var err = "<strong>Error.</strong> There are issue(s) with the import:<br>";

        if (!LabelCtrl.schoolExists(input.schoolId) || input.schoolId == 0) {

            errArray.push("<br>- <strong>School</strong> is not a valid selection.");
        }

        if (input.file === undefined) {

            errArray.push("<br>- <strong>File</strong> is missing.");
        }

        // If Error Array is not empty, display the errors and do not proceed with label import
        if (errArray != undefined && errArray.length > 0) {

            errArray.forEach(function (item) {
                err = err.concat(item);
            });
            UICtrl.addAlert(err, false, false);
            return false;
        }
        return true;
    };

    var readCSV = function (file, callback) {

        UICtrl.setImportStatus("Reading File...");

        var reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.addEventListener('load', function (e) {
            var csvdata = e.target.result;
            callback(csvdata);
        });
    };

    var parseCSV = function (data, schoolId) {

        UICtrl.setImportStatus("Parsing Data...");

        var headerData = {
            firstName: ['firstname', 'first_name', 'first name', 'first'],
            lastName: ['lastname', 'last_name', 'last name', 'last'],
            barcode: ['dcid', 'barcode', 'bar code']
        };
        var headers = {};
        var labels = [];

        var dataArray = data.split("\n");

        var headerArray = CSVtoArray(dataArray[0].toLowerCase());

        for (var i = 0; headerArray.length > i; i++) {
            for (header in headerData) {
                for (var j = 0; headerData[header].length > j; j++) {
                    if (headerArray[i] === headerData[header][j]) {
                        headers[header] = i;
                    }
                }
            }
        }
        if (Object.keys(headers).length != 3) { return false; } // If we didn't find all necessary headers, we cannot parse the data correctly

        for (var i = 1; dataArray.length > i; i++) {
            var field = CSVtoArray(dataArray[i]);
            var newLabel = LabelCtrl.newLabel(schoolId, field[headers.firstName], field[headers.lastName], field[headers.barcode], (LabelCtrl.getBiggestLabelId() + i).toString());
            labels.push(newLabel);
        }
        return labels;
    };

    var CSVtoArray = function (text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        if (!re_valid.test(text)) {
            content = "<strong>Error.</strong> There was an error with your CSV file. Please take a look at your file and try again.";
            UICtrl.addAlert(content, false, false);
            return null;
        }
        UICtrl.clearAlerts();
        var a = [];
        text.replace(re_value,
            function (m0, m1, m2, m3) {
                if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                else if (m3 !== undefined) a.push(m3);
                return '';
            });
        if (/,\s*$/.test(text)) a.push('');
        return a;
    };

    var addLabels = function () {

        UICtrl.setImportStatus("Adding Labels...");

        DBCtrl.addToDB(labels[loopCount], labels[loopCount].labelSpot, function (result, err) {
            if (!result) {
                console.log(err);
            } else {
                var percentComplete = ((loopCount / (labels.length - 1)) * 100).toFixed(0);
                UICtrl.setImportProgress(percentComplete);
                LabelCtrl.addItem(labels[loopCount]);
                UICtrl.addListItem(labels[loopCount], LabelCtrl.getSchoolAcronym(labels[loopCount].schoolId), 0);
                UICtrl.updateLabelPreview(labels[loopCount].labelSpot, true);
                UICtrl.handleExpandingList(LabelCtrl.getLabelCount());
                UICtrl.setLabelCount(LabelCtrl.getLabelCount());

                if (loopCount < labels.length - 1) {
                    loopCount++;
                    addLabels();
                } else {
                    UICtrl.setImportStatus("Done.");
                    content = "<strong>Success!</strong> Label import has completed.";
                    UICtrl.addAlert(content, true, false);
                    UICtrl.clearFields(LabelCtrl.getBiggestLabelId());
                    UICtrl.setActivePreview(parseInt(LabelCtrl.getBiggestLabelId()) + 1);
                }
            }
        });
    };

    return {
        importLabel: function () {
            var input = UICtrl.getImportInput();
            var content;

            if (!validateImport(input)) { return; }

            readCSV(input.file, function (csvdata) {

                labels = parseCSV(csvdata, input.schoolId);
                if (!labels) {
                    content = "<strong>Error.</strong> There was an error with your CSV file. Please take a look at your file and try again.";
                    UICtrl.addAlert(content, false, false);
                } else {
                    addLabels();
                }
            });
        }
    }
})(LabelController, DBController, UIController);