if (typeof (Storage) !== "undefined") {
    // localStorage tersedia
    console.log("localStorage tersedia.");
} else {
    // localStorage tidak tersedia
    console.log("Maaf, localStorage tidak tersedia di browser ini.");
}

// Ambil formulir berdasarkan id
var form = document.getElementById('bookForm');

let DataList = [];

if (localStorage.getItem('data')) {
    DataList = DataList.concat(JSON.parse(localStorage.getItem('data')));
}

// Tambahkan event listener untuk saat formulir disubmit
form.addEventListener('submit', async function (event) {
    // Menghentikan perilaku bawaan formulir
    event.preventDefault();

    // Ambil nilai dari input judul, penulis, tahun, dan checkbox
    let title = document.getElementById('bookFormTitle').value;
    let author = document.getElementById('bookFormAuthor').value;
    let year = document.getElementById('bookFormYear').value;
    let isComplete = document.getElementById('bookFormIsComplete').checked;
    let id = new Date().getTime();

    // Misalkan Anda memiliki beberapa data yang ingin disimpan
    let data = {
        id: id,
        Judul: title,
        Penulis: author,
        Tahun: year,
        isComplete: isComplete
    };

    DataList = DataList.concat(data)

    console.log(DataList);

    // Menyimpan setiap data dengan kunci yang berbeda
    localStorage.setItem('data', JSON.stringify(DataList));

    // // Membersihkan nilai input setelah submit
    // document.getElementById('bookFormTitle').value = '';
    // document.getElementById('bookFormAuthor').value = '';
    // document.getElementById('bookFormYear').value = '0';
    // document.getElementById('bookFormIsComplete').checked = false;
});


// Untuk Ganti text, jika boxnya di checklist, maka akan ganti text
document.addEventListener('DOMContentLoaded', (event) => {
    const checkbox = document.getElementById('bookFormIsComplete');
    const spanElement = document.querySelector('#bookFormSubmit span');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            spanElement.textContent = 'selesai dibaca';
        } else {
            spanElement.textContent = 'Belum selesai dibaca';
        }
    });
});





const deleteBook = (idToDelete) => {
    // Filter DataList untuk membuat newList yang tidak termasuk objek dengan id yang ingin dihapus
    DataList = DataList.filter(item => !(item.id && item.id === idToDelete));

    console.log(`Berhasil menghapus buku dengan id ${idToDelete}`);
    console.log(DataList);

    // Menyimpan setiap data dengan kunci yang berbeda
    localStorage.setItem('data', JSON.stringify(DataList));

    window.location.reload();
}

const updatedData = (idToUpdate) => {
    // Cari item dalam DataList berdasarkan id
    DataList = DataList.map(item => {
        if (item.id === idToUpdate) {
            // Perbarui nilai isComplete
            item.isComplete = !item.isComplete;
            console.log(item.isComplete);
        }
        return item;
    });

    console.log(`Berhasil menghapus buku dengan id ${idToUpdate}`);
    console.log(DataList);

    // Menyimpan setiap data dengan kunci yang berbeda
    localStorage.setItem('data', JSON.stringify(DataList));

    window.location.reload();
}

const editData = () => {

}

const allData = () => {
    // Ambil elemen section dengan id unfinish
    var sectionElementUnfinish = document.querySelector('#unfinish');
    var sectionElementFinish = document.querySelector('#finish');

    console.log(DataList);

    // Definisikan variabel untuk menampung konten HTML
    var newHTMLUnfinish = '';
    var newHTMLFinish = '';

    // Loop melalui DataList dan tambahkan konten untuk setiap buku
    for (var i = 0; i < DataList.length; i++) {
        if (DataList[i].isComplete == 0) {
            newHTMLUnfinish += `
                <div class="mb-4">
                    <div id="incompleteBookList" data-testid="incompleteBookList" class="bg-gray-200 shadow-sm rounded-md p-4">
                        <h3 data-testid="bookItemTitle" class="text-lg font-semibold">${DataList[i].Judul}</h3>
                        <p data-testid="bookItemAuthor" class="text-sm text-gray-600">Penulis: ${DataList[i].Penulis}</p>
                        <p data-testid="bookItemYear" class="text-sm text-gray-600">Tahun: ${DataList[i].Tahun}</p>
                        <div class="mt-4 flex space-x-2">
                            <button data-testid="bookItemIsCompleteButton" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onclick="updatedData(${DataList[i].id})">Selesai dibaca</button>
                            <button data-testid="bookItemDeleteButton" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick="deleteBook(${DataList[i].id})">Hapus Buku</button>
                            <button data-testid="bookItemEditButton" class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Edit Buku</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            newHTMLFinish += `
                <div class="mb-4">
                    <div id="incompleteBookList" data-testid="incompleteBookList" class="bg-gray-200 shadow-sm rounded-md p-4">
                        <h3 data-testid="bookItemTitle" class="text-lg font-semibold">${DataList[i].Judul}</h3>
                        <p data-testid="bookItemAuthor" class="text-sm text-gray-600">Penulis: ${DataList[i].Penulis}</p>
                        <p data-testid="bookItemYear" class="text-sm text-gray-600">Tahun: ${DataList[i].Tahun}</p>
                        <div class="mt-4 flex space-x-2">
                            <button data-testid="bookItemIsCompleteButton" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onclick="updatedData(${DataList[i].id})">Belum Selesai dibaca</button>
                            <button data-testid="bookItemDeleteButton" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick="deleteBook(${DataList[i].id})">Hapus Buku</button>
                            <button data-testid="bookItemEditButton" class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Edit Buku</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Setel innerHTML dari sectionElement dengan konten HTML baru
    sectionElementUnfinish.innerHTML = newHTMLUnfinish;
    sectionElementFinish.innerHTML = newHTMLFinish;
}

// Starter
allData();
