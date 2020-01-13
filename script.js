// adding storage, will change some things...
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    alert("Local Storage will be used");
  }
  else {
    // Too bad, no localStorage for us
    alert("Local Storage is not available on this browser.");
  }
//parses array into json format and back when called.
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

let myLibrary;

if(!localStorage){
    myLibrary = [{title:"Harry Potter and the Prisoner Askaban",
    author: "J.K. Rowling",
    numOfPages: 374,
    read: "Read" },
    {title:"Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
    numOfPages: 304,
    read: "Read" },{title:"Harry Potter 1",
    author: "J.K. Rowling",
    numOfPages: 204,
    read: "Unread" },]; 
}else{
myLibrary = localStorage.getObj("library");
}

function Book(title, author, numOfPages, read){//construtor
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    
    if(read){
        this.read = "Read";
    }else{
        this.read = "Unread";
    }
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.read}`;
    }
}
const table = document.getElementById("library_catalog");
const secondTable = document.getElementById("lib_content");

function addBookToLibrary(){
    
    let title = document.getElementById("Title").value;
    let author = document.getElementById("Author").value;
    if(title === "" || author === "" || !pages){
        alert('Please fill out the entire form');
        return;
    }
    
    let numOfPages = document.getElementById("pages").value;
    if(isNaN(Number(numOfPages))){
        alert('Please use numbers only');
        return;
    }else{
        numOfPages = Number(numOfPages);
        console.log(typeof numOfPages);
    }
    let read = document.getElementById("read?").checked;
    myLibrary.push(new Book(title,author,numOfPages,read));
    secondTable.innerHTML="";
    render();
    
}

function render(){ 
    
    secondTable.innerHTML="";
    for(let i = myLibrary.length-1; i >= 0; i--){
        let row = secondTable.insertRow(0);
        row.setAttribute("data-index", `${i}`);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML = myLibrary[i].title;
        cell2.innerHTML = myLibrary[i].author;
        cell3.innerHTML = myLibrary[i].numOfPages;
        cell4.innerHTML = `<button class="button">${myLibrary[i].read}</button>`;
        cell4.id = "toggle"; //to toggle read and unread.
        cell5.innerHTML = i + 1;
        cell6.id = "remove";//add remove id to select it if you want to remove the book.
        //table.appendChild( row );
        cell6.innerHTML = `<button class="button">Delete</button>`;
    }

    /*myLibrary.forEach((el,index)=>{
        let row = secondTable.insertRow(0);
        row.setAttribute("data-index", `${index}`);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML = el.title;
        cell2.innerHTML = el.author;
        cell3.innerHTML = el.numOfPages;
        cell4.innerHTML = `<button class="button">${el.read}</button>`;
        cell4.id = "toggle"; //to toggle read and unread.
        cell5.innerHTML = index + 1;
        cell6.id = "remove";//add remove id to select it if you want to remove the book.
        //table.appendChild( row );
        cell6.innerHTML = `<button class="button">Delete</button>`;
    });*/

    let allremoveButton  = document.querySelectorAll("#remove");
    for (const button of allremoveButton) {
        button.addEventListener('click', remove);
    }
    let allToggle = document.querySelectorAll("#toggle");
    for( const toggles of allToggle){
        toggles.addEventListener('click', toggle)
    }
    localStorage.setObj("library", myLibrary);
    console.log(localStorage);
}

function remove(){
    //console.log(this.parentNode.dataset.index);
    myLibrary.splice(Number(this.parentNode.dataset.index),1);
    render();
}

function toggle(){
    
    if(myLibrary[this.parentNode.dataset.index].read === "Read"){
        myLibrary[this.parentNode.dataset.index].read = "Unread"; 
    }else if(myLibrary[this.parentNode.dataset.index].read === "Unread"){
        myLibrary[this.parentNode.dataset.index].read = "Read";
    }
    render();
}
render();

let submit = document.querySelector("button");

submit.addEventListener("click",addBookToLibrary);