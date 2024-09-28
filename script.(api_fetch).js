const apiURL = 'https://sejong-library-api.example.com/new-books'; // API 엔드포인트

let books = []; // 도서 데이터를 저장할 배열
let currentPage = 1;
const itemsPerPage = 15; // 한 페이지에 보여줄 도서 수

// API에서 최신 도서 목록을 불러오는 함수
async function fetchNewBooks() {
    try {
        const response = await fetch(`${apiURL}?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        books = data.books; // 응답에서 도서 목록을 가져옴
        displayBooks();
        setupPagination(data.totalPages);
    } catch (error) {
        console.error('도서 데이터를 불러오는 중 오류 발생:', error);
    }
}

// 도서를 화면에 표시하는 함수
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // 기존 목록 초기화

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        bookItem.innerHTML = `
            <img src="${book.coverImage}" alt="${book.title}" onerror="this.src='images/placeholder.png'">
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <button onclick="viewBookDetails(${book.id})">자세히 보기</button>
        `;

        bookList.appendChild(bookItem);
    });
}

// 페이지네이션 설정 함수
function setupPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            fetchNewBooks();
        };

        if (i === currentPage) {
            button.style.fontWeight = 'bold';
        }

        pagination.appendChild(button);
    }
}

// 도서 상세정보 페이지로 이동하는 함수
function viewBookDetails(bookId) {
    window.location.href = `book-details.html?id=${bookId}`;
}

// 초기화 - 페이지 로드 시 최신 도서 목록 불러오기
document.addEventListener('DOMContentLoaded', fetchNewBooks);
