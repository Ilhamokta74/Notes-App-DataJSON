if (typeof (Storage) !== "undefined") {
    console.log("localStorage tersedia.");
} else {
    console.log("Maaf, localStorage tidak tersedia di browser ini.");
}

let DataList = [];

if (localStorage.getItem('data')) {
    DataList = JSON.parse(localStorage.getItem('data'));
}

var form = document.getElementById('bookForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let title = document.getElementById('bookFormTitle').value;
    let author = document.getElementById('bookFormAuthor').value;
    let year = document.getElementById('bookFormYear').value;
    let isComplete = document.getElementById('bookFormIsComplete').checked;
    let id = new Date().getTime();

    let data = {
        id: id,
        Judul: title,
        Penulis: author,
        Tahun: year,
        isComplete: isComplete
    };

    DataList.push(data);
    localStorage.setItem('data', JSON.stringify(DataList));

    addBookToDOM(data);

    form.reset();
    document.querySelector('#bookFormSubmit span').textContent = 'Belum selesai dibaca';
});

document.addEventListener('DOMContentLoaded', (event) => {
    const checkbox = document.getElementById('bookFormIsComplete');
    const spanElement = document.querySelector('#bookFormSubmit span');

    checkbox.addEventListener('change', () => {
        spanElement.textContent = checkbox.checked ? 'Selesai dibaca' : 'Belum selesai dibaca';
    });
});

const deleteBook = (idToDelete, judul) => {
    const userConfirmed = confirm(`Apakah Anda yakin ingin menghapus buku dengan judul ${judul} ?`);

    if (userConfirmed) {
        DataList = DataList.filter(item => item.id !== idToDelete);
        localStorage.setItem('data', JSON.stringify(DataList));

        document.getElementById(`book-${idToDelete}`).remove();
    }
};

const editBook = (idToEdit) => {
    const bookToEdit = DataList.find(item => item.id === idToEdit);

    if (!bookToEdit) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Buku tidak ditemukan!',
        });
        return;
    }

    Swal.fire({
        title: 'Edit Buku',
        html:
            `<input id="swal-input1" class="swal2-input" value="${bookToEdit.Judul}">` +
            `<input id="swal-input2" class="swal2-input" value="${bookToEdit.Penulis}">` +
            `<input id="swal-input3" class="swal2-input" value="${bookToEdit.Tahun}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value
            ];
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const newTitle = result.value[0];
            const newAuthor = result.value[1];
            const newYear = result.value[2];

            bookToEdit.Judul = newTitle;
            bookToEdit.Penulis = newAuthor;
            bookToEdit.Tahun = newYear;

            localStorage.setItem('data', JSON.stringify(DataList));

            updateBookInDOM(bookToEdit);

            Swal.fire({
                title: 'Success!',
                text: 'Buku berhasil diperbarui.',
                icon: 'success'
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelled',
                text: 'Perubahan dibatalkan.',
                icon: 'info'
            });
        }
    });
};

const updatedBook = (idToUpdate) => {
    const bookToUpdate = DataList.find(item => item.id === idToUpdate);

    if (!bookToUpdate) {
        alert('Buku tidak ditemukan!');
        return;
    }

    bookToUpdate.isComplete = !bookToUpdate.isComplete;
    updateBookInDOM(bookToUpdate);

    localStorage.setItem('data', JSON.stringify(DataList));
};

const addBookToDOM = (book) => {
    const section = book.isComplete ? document.getElementById('finish') : document.getElementById('unfinish');
    const bookElement = document.createElement('div');
    bookElement.className = 'mb-4';
    bookElement.id = `book-${book.id}`;
    bookElement.innerHTML = `
        <div class="bg-gray-200 shadow-sm rounded-md p-4">
            <h3 class="text-lg font-semibold">${book.Judul}</h3>
            <p class="text-sm text-gray-600">Penulis: ${book.Penulis}</p>
            <p class="text-sm text-gray-600">Tahun: ${book.Tahun}</p>
            <div class="mt-4 flex space-x-2">
                <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onclick="updatedBook(${book.id})">${book.isComplete ? 'Belum Selesai dibaca' : 'Selesai dibaca'}</button>
                <button class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onclick="editBook(${book.id})">Edit Buku</button>
                <button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick="deleteBook(${book.id}, '${book.Judul}')">Hapus Buku</button>
            </div>
        </div>
    `;
    section.appendChild(bookElement);
};

const updateBookInDOM = (book) => {
    const bookElement = document.getElementById(`book-${book.id}`);
    const section = book.isComplete ? document.getElementById('finish') : document.getElementById('unfinish');
    bookElement.remove();
    addBookToDOM(book);
};

const allData = () => {
    DataList.forEach(book => {
        addBookToDOM(book);
    });
};

allData();

const searchForm = document.getElementById('searchBook');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    let searchResults = DataList.filter(book => book.Judul.toLowerCase().includes(searchTitle));

    if (searchTitle !== "") {
        var sectionElementUnfinish = document.querySelector('#unfinish');
        var sectionElementFinish = document.querySelector('#finish');

        // Clear the content of both elements
        sectionElementUnfinish.innerHTML = '';
        sectionElementFinish.innerHTML = '';

        searchResults.forEach(book => {
            addBookToDOM(book);
        });
    } else {
        window.location.reload();
    }
});
