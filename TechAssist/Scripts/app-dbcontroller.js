var DBController = (function () {

    var db, request;
    var dbName = "label-db";
    var objectStoreName = "labels";

    return {

        establishDB: function (callback) {
            var openRequest = indexedDB.open(dbName, 1);

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
            };
        },

        addToDB: function (item, id, callback) {

            request = db.transaction(objectStoreName, "readwrite").objectStore(objectStoreName).add(item, id);

            request.onsuccess = function () {
                callback(true, request.result);
            };

            request.onerror = function () {
                callback(false, request.error);
            };
        },

        getAllItems: function (callback) {

            request = db.transaction(objectStoreName, "readwrite").objectStore(objectStoreName).getAll();

            request.onsuccess = function () {
                callback(true, request.result);
            };

            request.onerror = function () {
                callback(false, request.error);
            };
        },

        removeItem: function (key, callback) {

            request = db.transaction(objectStoreName, "readwrite").objectStore(objectStoreName).delete(key);

            request.onsuccess = function () {
                callback(true);
            };

            request.onerror = function () {
                callback(false, request.error);
            };
        },

        updateItem: function (item, key, callback) {

            request = db.transaction(objectStoreName, "readwrite").objectStore(objectStoreName).put(item, key);

            request.onsuccess = function () {
                callback(true);
            };

            request.onerror = function () {
                callback(false, request.error);
            };
        },

        clearAllItems: function (callback) {

            request = db.transaction(objectStoreName, "readwrite").objectStore(objectStoreName).clear();

            request.onsuccess = function () {
                callback(true);
            };

            request.onerror = function () {
                callback(false, request.error);
            };
        }
    };
})();