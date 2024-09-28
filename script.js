let books = []; // 전체 도서 목록을 저장하는 배열
const itemsPerPage = 15; // 페이지당 표시할 도서 수
let currentPage = 1; // 현재 페이지 번호

// book.json 파일에서 도서 데이터를 불러오는 함수
async function loadBooks() {
    const response = await fetch('book.json'); // 도서 데이터를 가져옴
    books = await response.json(); // JSON 형식으로 변환 후 books 배열에 저장
    displayBooks(); // 도서를 화면에 표시
}

// 도서를 화면에 표시하는 함수, 기본적으로 모든 도서를 표시하되 필터링된 도서 목록도 처리 가능
function displayBooks(filteredBooks = books) {
    const bookList = document.getElementById('bookList'); // 도서 목록을 표시할 요소 가져오기
    bookList.innerHTML = ''; // 도서 목록 초기화

    // 현재 페이지에 표시할 도서의 시작 인덱스와 끝 인덱스를 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex); // 해당 페이지에 표시할 도서만 추출

    // 각 도서를 화면에 추가
    booksToShow.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item'; // 도서 항목의 스타일 지정
        bookItem.innerHTML = `
            <a href="detail.html?id=${book.id}">
                <img src="${book.coverImage}" alt="${book.title}" onerror="this.src='images/placeholder.png'">
            </a>
            <h3 class="title">${book.title}</h3>
            <p class="author">${book.author}</p>
            <button onclick="showBookDetails(${book.id})">상세정보</button>
        `;
        bookList.appendChild(bookItem); // 도서 항목을 목록에 추가
    });

    displayPagination(filteredBooks.length); // 페이지네이션 버튼 표시
}

// 페이지네이션 버튼을 생성하는 함수
function displayPagination(totalItems) {
    const paginationElement = document.getElementById('pagination'); // 페이지네이션 요소 가져오기
    const pageCount = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수 계산
    
    let paginationHTML = '';
    // 각 페이지 번호에 해당하는 버튼을 생성
    for (let i = 1; i <= pageCount; i++) {
        paginationHTML += `<button onclick="changePage(${i})">${i}</button>`;
    }
    
    paginationElement.innerHTML = paginationHTML; // 페이지네이션 버튼을 화면에 표시
}

// 페이지 변경 시 호출되는 함수
function changePage(page) {
    currentPage = page; // 현재 페이지를 변경
    displayBooks(); // 새로운 페이지의 도서 목록을 표시
}

// 검색어에 따라 도서를 필터링하는 함수
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // 검색어를 소문자로 변환
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || // 도서 제목이 검색어를 포함하는지 확인
        book.author.toLowerCase().includes(searchTerm) // 저자가 검색어를 포함하는지 확인
    );
    currentPage = 1; // 검색 결과의 첫 페이지로 이동
    displayBooks(filteredBooks); // 필터링된 도서 목록을 화면에 표시
}

// 도서의 상세 정보를 보여주는 함수
function showBookDetails(bookId) {
    window.location.href = `detail.html?id=${bookId}`; // 도서 상세 페이지로 이동
}

// 엔터 키로 검색 실행
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchBooks(); // 엔터 키를 누르면 검색 함수 호출
    }
});

// 페이지가 로드될 때 도서 목록을 불러옴
loadBooks();
