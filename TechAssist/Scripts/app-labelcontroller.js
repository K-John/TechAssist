var LabelController = (function () {

    /*
     * Label Object
     */
    var Label = function (schoolId, firstName, lastName, barcode, labelSpot) {
        this.schoolId = schoolId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.barcode = barcode;
        this.labelSpot = labelSpot;
    };
    /*
     * School Object
     */
    var School = function (schoolId, schoolName, schoolAcronym, schoolPhone, schoolPictureUrl) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.schoolAcronym = schoolAcronym;
        this.schoolPhone = schoolPhone;
        this.schoolPictureUrl = schoolPictureUrl;
    };

    /*
     * Array that stores all label data
     */
    var data = {
        labels: [],
        schools: []
    };

    return {
        newLabel: function (schoolId, firstName, lastName, barcode, labelSpot) {

            return new Label(schoolId, firstName, lastName, barcode, labelSpot);
        },
        /*
         * Adds label to the data array as a Label object
         */
        addItem: function (newItem) {

            data.labels.push(newItem);
        },
        /*
         * Gets the biggest labelspot in the data array
         */
        getBiggestLabelId: function () {

            var largest = 0;

            // Loop through the data array
            for (var i = 0; i < data.labels.length; i++) {

                if (largest < data.labels[i].labelSpot) {

                    // If the labelspot in the data array is larger than what we've checked so far, update it
                    largest = data.labels[i].labelSpot;
                }
            }
            return largest;
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

        getSchoolAcronym: function (schoolId) {

            for (var i = 0; i < data.schools.length; i++) {

                if (data.schools[i].schoolId == schoolId) {

                    return data.schools[i].schoolAcronym;
                }
            }
        },
        // TODO: May not need this function?
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
        }
    };
})();