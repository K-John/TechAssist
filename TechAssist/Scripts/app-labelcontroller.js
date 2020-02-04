var LabelController = (function () {

    var Label = function (schoolId, firstName, lastName, barcode, labelSpot) {
        this.schoolId = schoolId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.barcode = barcode;
        this.labelSpot = labelSpot;
    };

    var School = function (schoolId, schoolName, schoolAcronym, schoolPhone) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.schoolAcronym = schoolAcronym;
        this.schoolPhone = schoolPhone;
    };

    var data = {
        labels: [],
        schools: []
    };

    return {

        newLabel: function (schoolId, firstName, lastName, barcode, labelSpot) {

            return new Label(schoolId, firstName, lastName, barcode, labelSpot);
        },

        addLabel: function (newItem) {

            data.labels.push(newItem);
        },

        updateLabel: function (item) {

            data.labels[data.labels.findIndex(label => label.labelSpot == item.labelSpot)] = item;
        },

        removeLabel: function (labelId) {
            data.labels.splice(data.labels.findIndex(label => label.labelSpot == labelId), 1);
        },

        clearLabelData: function () {
            data.labels = [];
        },

        labelExists: function (labelSpot) {

            for (label of data.labels) {
                if (label.labelSpot == labelSpot) {
                    return true;
                }
            }
            return false;
        },

        getBiggestLabelId: function () {

            var largest = 0;

            for (var i = 0; i < data.labels.length; i++) {

                if (largest < parseInt(data.labels[i].labelSpot)) {

                    largest = data.labels[i].labelSpot;
                }
            }
            return parseInt(largest);
        },

        getLabelCount: function () {
            return data.labels.length;
        },

        getLabelByIndex: function (index) {
            return data.labels[index];
        },

        getLabelBySpot: function (labelSpot) {
            return data.labels[data.labels.findIndex(label => label.labelSpot == labelSpot)];
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

        addSchools: function (schools) {

            for (school of schools) {

                var newItem = new School(school["SchoolID"], school["SchoolName"], school["SchoolAcronym"], school["SchoolPhone"]);

                data.schools.push(newItem);
            }
        },

        schoolExists: function (schoolId) {

            for (school of data.schools) {
                if (school.schoolId == schoolId) {
                    return true;
                }
            }
            return false;
        },

        getSchools: function () {
            return data.schools;
        },

        getSchoolAcronym: function (schoolId) {

            return data.schools[data.schools.findIndex(school => school.schoolId == schoolId)].schoolAcronym;
        },

        getSchoolPhone: function (schoolId) {

            return data.schools[data.schools.findIndex(school => school.schoolId == schoolId)].schoolPhone;
        }
    };
})();