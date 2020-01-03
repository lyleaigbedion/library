function book(title, author, numOfPages, read){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    if(read){
        this.read = "read already";
    }else{
        this.read = "not read yet";
    }
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.read}`;
    }
}