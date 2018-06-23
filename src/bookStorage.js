var STORAGE_KEY = "books-assesment-bc-gov";
const bookStorage = {
    fetch: function() {
        var books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return books;
    },
    save: function(books) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
};

export default bookStorage;
