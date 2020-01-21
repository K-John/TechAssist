var LabelController = (function () {

    var Label = function (schoolId, firstName, lastName, barcode, labelSpot) {
        this.schoolId = schoolId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.barcode = barcode;
        this.labelSpot = labelSpot;
    };

    var School = function (schoolId, schoolName, schoolAcronym, schoolPhone, schoolPictureUrl) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.schoolAcronym = schoolAcronym;
        this.schoolPhone = schoolPhone;
        this.schoolPictureUrl = schoolPictureUrl;
    };

    var data = {
        labels: [],
        schools: []
    };

    return {

        newLabel: function (schoolId, firstName, lastName, barcode, labelSpot) {

            return new Label(schoolId, firstName, lastName, barcode, labelSpot);
        },

        addItem: function (newItem) {

            data.labels.push(newItem);
        },

        getBiggestLabelId: function () {

            var largest = 0;

            for (var i = 0; i < data.labels.length; i++) {

                if (largest < parseInt(data.labels[i].labelSpot)) {

                    largest = data.labels[i].labelSpot;
                }
            }
            return largest;
        },

        insertionSort: function (arr) {

            for (var i = 1; i < arr.length; i++) {
                if (parseInt(arr[i].labelSpot) < parseInt(arr[0].labelSpot)) {
                    //move current element to the first position
                    arr.unshift(arr.splice(i, 1)[0]);
                }
                else if (parseInt(arr[i].labelSpot) > parseInt(arr[i - 1].labelSpot)) {
                    //leave current element where it is
                    continue;
                }
                else {
                    //find where element should go
                    for (var j = 1; j < i; j++) {
                        if (parseInt(arr[i].labelSpot) > parseInt(arr[j - 1].labelSpot) && parseInt(arr[i].labelSpot) < parseInt(arr[j].labelSpot)) {
                            //move element
                            arr.splice(j, 0, arr.splice(i, 1)[0]);
                        }
                    }
                }
            }
            return arr;
        },

        testGetData: function () {
            return data;
        },

        addSchools: function (schools) {

            for (school of schools) {

                var newItem = new School(school["SchoolID"], school["SchoolName"], school["SchoolAcronym"], school["SchoolPhone"], school["SchoolPictureUrl"]);

                data.schools.push(newItem);
            }
        },

        // TODO: Convert to array index instead of raw loop?
        getSchoolAcronym: function (schoolId) {

            for (var i = 0; i < data.schools.length; i++) {

                if (data.schools[i].schoolId == schoolId) {

                    return data.schools[i].schoolAcronym;
                }
            }
        },

        // TODO: Convert to array index instead of raw loop?
        getSchoolPhone: function (schoolId) {

            for (var i = 0; i < data.schools.length; i++) {
                if (data.schools[i].schoolId == schoolId) {
                    return data.schools[i].schoolPhone;
                }
            }
        },

        getLabelCount: function () {
            return data.labels.length;
        },

        getLabel: function (i) {
            return data.labels[i];
        },

        labelExists: function (i) {

            for (label of data.labels) {
                if (label.labelSpot == i) {
                    return true;
                }
            }
            return false;
        },

        schoolExists: function (i) {

            for (school of data.schools) {
                if (school.schoolId == i) {
                    return true;
                }
            }
            return false;
        },

        clearLabelData: function () {
            data.labels = [];
        },

        removeLabel: function (labelId) {
            data.labels.splice(data.labels.findIndex(label => label.labelSpot == labelId), 1);
        }
    };
})();