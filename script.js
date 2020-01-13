let myLibrary = [{title:"Harry Potter and the Prisoner Askaban",
author: "J.K. Rowling",
numOfPages: 374,
read: "Yes" },
{title:"Harry Potter and the Deathly Hallows",
author: "J.K. Rowling",
numOfPages: 304,
read: "Yes" },{title:"Harry Potter 1",
author: "J.K. Rowling",
numOfPages: 204,
read: "No" },];

function Book(title, author, numOfPages, read){//construtor
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    
    if(read){
        this.read = "Yes";
    }else{
        this.read = "No";
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
    myLibrary.forEach((el,index)=>{
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
    });

    allremoveButton  = document.querySelectorAll("#remove");
    for (const button of allremoveButton) {
        button.addEventListener('click', remove);
    }
    let allToggle = document.querySelectorAll("#toggle");
    for( const toggles of allToggle){
        toggles.addEventListener('click', toggle)
    }
}

let allremoveButton;

function remove(){
    //console.log(this.parentNode.dataset.index);
    myLibrary.splice(Number(this.parentNode.dataset.index),1);
    render();
}

function toggle(){
    
    if(myLibrary[this.parentNode.dataset.index].read === "Yes"){
        myLibrary[this.parentNode.dataset.index].read = "No"; 
    }else if(myLibrary[this.parentNode.dataset.index].read === "No"){
        myLibrary[this.parentNode.dataset.index].read = "Yes";
    }
    render();
}
render();

let submit = document.querySelector("button");

submit.addEventListener("click",addBookToLibrary);




