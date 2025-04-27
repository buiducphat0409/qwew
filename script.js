// Dropdown menu toggle
const bookButton = document.getElementById("book");
if (bookButton) {
  bookButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    const dropdown = document.getElementById("productDropdown");
    if (dropdown) {
      dropdown.classList.toggle("show"); // Thay đổi trạng thái hiển thị
    }
  });
}

// Pagination logic
const itemsPerPage = 4 * 5; // 4 hàng x 5 cuốn sách
let currentPage = 1;

function createPagination(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Xóa các nút cũ

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.classList.add("page-btn");
    button.textContent = i;
    button.onclick = () => changePage(i);
    if (i === currentPage) button.classList.add("active");
    paginationContainer.appendChild(button);
  }

  // Thêm nút ">" để chuyển sang trang tiếp theo
  if (totalPages > 1) {
    const nextButton = document.createElement("button");
    nextButton.classList.add("page-btn");
    nextButton.textContent = ">";
    nextButton.onclick = () => changePage(currentPage + 1);
    paginationContainer.appendChild(nextButton);
  }
}

function changePage(page) {
  const bookList = document.querySelector("#book-list");
  if (!bookList) {
    console.error("Element with ID 'book-list' not found.");
    return;
  }

  const books = Array.from(bookList.children);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  if (page < 1 || page > totalPages) return;

  currentPage = page;

  // Hiển thị các sách thuộc trang hiện tại
  books.forEach((book, index) => {
    book.style.display =
      index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
        ? "block"
        : "none";
  });

  // Cuộn lên đầu trang
  window.scrollTo({
    top: 420,
    behavior: "smooth", // Cuộn mượt mà
  });

  // Cập nhật trạng thái nút
  createPagination(totalPages);
}

// Hiển thị trang đầu tiên khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.querySelector("#book-list");
  const books = Array.from(bookList.children);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  createPagination(totalPages);
  changePage(1);
});

// Tìm kiếm
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchHistoryList = document.getElementById("search-history");
  const searchHistoryBox = document.querySelector(".lichsutimkiem");

  function addToHistory(keyword) {
    if (!keyword) return;

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!history.includes(keyword)) {
      history.unshift(keyword);
      if (history.length > 10) history.pop(); // giữ tối đa 10 mục
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }

    renderHistory();
  }

  function renderHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistoryList.innerHTML = "";
    history.forEach((keyword) => {
      let li = document.createElement("li");
      li.textContent = keyword;
      li.classList.add("history-item");

      li.addEventListener("click", function () {
        searchInput.value = keyword;
      });

      searchHistoryList.appendChild(li);
    });
  }

  searchButton.addEventListener("click", function () {
    const keyword = searchInput.value.trim();
    if (!keyword) return;

    addToHistory(keyword);

    // Chuyển trang sang search.html và truyền từ khóa qua URL
    const searchURL = `search.html?query=${encodeURIComponent(keyword)}`;
    window.location.href = searchURL;
  });

  // Bấm Enter để tìm kiếm
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  // Hiện/ẩn lịch sử khi focus/blur
  searchInput.addEventListener("focus", function () {
    if (searchHistoryBox) {
      renderHistory(); // render lại lịch sử mỗi lần focus
      searchHistoryBox.style.display = "block";
    }
  });

  searchInput.addEventListener("blur", function () {
    setTimeout(() => {
      if (searchHistoryBox) {
        searchHistoryBox.style.display = "none";
      }
    }, 300);
  });

  renderHistory(); // Hiển thị lịch sử khi vào trang
});

// Vô hiệu hóa phân trang khi tìm kiếm
const paginationContainer = document.querySelector(".pagination");
if (paginationContainer) {
  paginationContainer.style.display = "none";
}
