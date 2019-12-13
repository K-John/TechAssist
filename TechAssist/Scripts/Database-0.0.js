class Database {

    constructor(name) {
        this.name = name;
        var request = indexedDB.open(name);

        request.onsuccess = function(e) {
            document.getElementById("alert").innerHTML = "Database Open";
        }
    }

}