let myLibrary = [{title:"Harry Potter and the Prisoner Askaban",
author: "J.K. Rowling",
pageNum: 374,
read: "Yes" },
{title:"Harry Potter and the Deathly Hallows",
author: "J.K. Rowling",
pageNum: 304,
read: "Yes" },{title:"Harry Potter 1",
author: "J.K. Rowling",
pageNum: 204,
read: "No" },];

function Book(title, author, numOfPages, read){//construtor
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    if(read){
        this.read = "read";
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
    let numOfPages = document.getElementById("pages").value;
    let read = document.getElementById("read?").checked;

    myLibrary.push(new Book(title,author,numOfPages,read));
    secondTable.innerHTML="";
    render();
    console.log(secondTable.rowIndex);
}

function render(){
    
    

    myLibrary.forEach((el,index)=>{
        let row = secondTable.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.innerHTML = el.title;
        cell2.innerHTML = el.author;
        cell3.innerHTML = el.pageNum;
        cell4.innerHTML = el.read;
        cell4.id = "toggle"; //to toggle read and unread.
        cell5.innerHTML = index + 1;
        cell5.id = "remove";//add remove id to select it if you want to remove the book.
        //table.appendChild( row );
    });

}
render();

let submit = document.querySelector("button");

submit.addEventListener("click",addBookToLibrary);

