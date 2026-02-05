console.log("hello")
class Book {
    constructor(title, author, noOfPages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.noOfPages} pages, `;
    }
    toggleRead() {
    this.read = !this.read;
}

}

const library = [];

function addBookToLibrary(title,author,noOfPages,read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title,author,noOfPages,read);
  console.log(newBook)
  library.push(newBook);
  render(newBook)
}

function render(newBook) {

    const bookToAdd = document.createElement("div");
    bookToAdd.dataset.id = newBook.id;

    bookToAdd.innerHTML = newBook.info();
    bookToAdd.style.cssText = "font-size:48px; display:flex; gap:20px";

    const read = document.createElement('button');
    read.dataset.id = newBook.id;
    read.className = "read";
    updateRead(newBook,read);
    bookToAdd.appendChild(read);


    const btn = document.createElement('button');
    btn.innerHTML = "Remove";
    btn.className = "remove";
    btn.style.cssText = "margin:5px";

    bookToAdd.appendChild(btn);
    document.querySelector('.books').appendChild(bookToAdd);
}

function updateRead(newBook,read){
    if(newBook.read){
        read.innerHTML = "Not Read"
         read.style.cssText = "margin:5px ;background-color: red";
    }
    else{
         read.innerHTML = "Read"
          read.style.cssText = "margin:5px ;background-color: green";
    }
}

const form = document.querySelector('form');

form.addEventListener('submit',function (e){
        e.preventDefault();
        const formData = new FormData(form);
        console.log(formData.get('title'));
        addBookToLibrary(formData.get('title'),formData.get('author'),formData.get('noOfPages'),false)
})

document.addEventListener('click', function (event) {

    if (event.target.classList.contains('remove')) {
        const parent = event.target.parentElement;
        const id = parent.dataset.id;

        const index =library.findIndex((book) => book.id == id);
        library.splice(index,1);

        parent.remove();
    }
   else if(event.target.classList.contains('read')){
       const read = event.target;
       const id = read.dataset.id;

       const index = library.findIndex((book) => book.id == id);
       library[index].toggleRead();
       updateRead(library[index],event.target);

    }

});




