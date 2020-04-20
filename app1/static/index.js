window.onload = initAll;

var saveBookButton;
var ShowBooks;
function initAll(){
    saveBookButton = document.getElementById('save_book');
    saveBookButton.onclick = saveBook;
}

function showAllBooks(){
    var req = new XMLHttpRequest();
    var url = '/getAllBooks'
    req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = eval(req.responseText)
        var div = document.getElementById('profile');
        div.innerHTML = '';

        var table = document.createElement('TABLE');
        var row = table.insertRow(0);
        var name = row.insertCell(0);
        var price = row.insertCell(1);
        var pages = row.insertCell(2);

        name.innerHTML = 'Book Name';
        price.innerHTML = 'Book Price';
        pages.innerHTML = 'Number of Pages';
        for (var i = 0; i < data.length; i ++){
            var row = table.insertRow(i+1);
            var name = row.insertCell(0);
            var price = row.insertCell(1);
            var pages = row.insertCell(2);

            name.innerHTML = data[i].name;
            price.innerHTML = data[i].price;
            pages.innerHTML = data[i].pages;
        }
        table.className = 'table text-center'
        div.appendChild(table);
    }
    };
    req.open("GET", url, true);
    req.send();
}

function saveBook(){
    var name = document.getElementById('book_name').value;
    var price = document.getElementById('book_price').value;
    var pages = document.getElementById('book_pages').value;

    var url = '/save_book?name='+name+'&price='+price+'&pages='+pages;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if (req.responseText == 'true'){
            var name = document.getElementById('book_name').value = '';
            var price = document.getElementById('book_price').value = '';
            var pages = document.getElementById('book_pages').value = '';
        };
    }
    };
    req.open("GET", url, true);
    req.send();

}