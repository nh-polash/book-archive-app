// load data form json
const loadBooks = () => {
    // get the user input
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear input
    searchField.value = '';

    // error message for empty input
    const errorMessage = document.getElementById('error');
    if(searchText === '') {
        errorMessage.innerText = 'Please write any books name about programming to find best results';
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.fontWeight = '600';
        // clear books results
        document.getElementById('books-area').textContent = '';
        document.getElementById('books-found').innerText = '0';

    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
        errorMessage.innerText = '';
    }
}

// num of books found function
const foundBooks = (foundBooks) => {
    document.getElementById('books-found').innerText = foundBooks;
}

// display search results
const displayBooks = data => {
    // num of books
    const booksFound = data.numFound
    foundBooks(booksFound);
    // error for no results found
    const booksconatiner = document.getElementById('books-area');
    const errorMessage = document.getElementById('error');
    if(booksFound === 0) {
        errorMessage.innerText = 'No results found';
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.fontWeight = '600';
        booksconatiner.textContent = '';
    }
    else {
        // display search result
        booksconatiner.textContent = '';
        const books = data.docs
        books.forEach(book => {
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.innerHTML = `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i? book.cover_i : '10909258'}-M.jpg" class="img-fluid" alt="...">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="book-title">${book.title}</h5>
                                <p class="author">Author : ${book.author_name? book.author_name : 'NA'}</p>
                                <p class="author">Publisher : ${book.publisher? book.publisher : 'NA'}</p>
                                <p><small class="text-primary">First published in : ${book.first_publish_year}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            booksconatiner.appendChild(div);
        })
        errorMessage.innerText = '';
    }
}