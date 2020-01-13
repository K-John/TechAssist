var DBController = (function () {

    var db;
    var objectStoreName = "labels";

    return {

        establishDB: function (callback) {
            var openRequest = indexedDB.open('test-db0', 1);

            openRequest.onerror = function () {
                callback(false, openRequest.error);
            };

            openRequest.onsuccess = function () {
                db = openRequest.result;
                callback(true);
            };

            openRequest.onupgradeneeded = function () {
                db = openRequest.result;
                console.log("DB Upgrade Needed");
                db.createObjectStore(objectStoreName);
            }
        },

        addToDB: function (item, id, callback) {

            var transaction = db.transaction(objectStoreName, "readwrite");
            var labelStore = transaction.objectStore(objectStoreName);
            var request = labelStore.add(item, id);

            request.onsuccess = function () {
                callback(true, request.result);
            };

            request.onerror = function () {
                callback(false, request.error);
            };
        },

        testGetData: function () {

            var transaction = db.transaction(objectStoreName, "readwrite");
            var labelStore = transaction.objectStore(objectStoreName);
            var labels = labelStore.getAll();

            labels.onsuccess = function () {
                console.log(labels.result);
            };

            labels.onerror = function () {
                console.log("Error", labels.error);
            };
        }

    };
})();