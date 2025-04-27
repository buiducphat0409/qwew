const input = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const historyBox = document.querySelector(".lichsutimkiem");
const historyList = document.getElementById("search-history");
const allBooks = document.querySelectorAll(".book-item");

// Hiển thị tiêu đề và đếm kết quả
function updateSearchResult(keyword) {
  let count = 0;
  const lowerKeyword = keyword.toLowerCase();

  allBooks.forEach((book) => {
    const title = book.dataset.title.toLowerCase();
    if (title.includes(lowerKeyword)) {
      book.style.display = "block";
      count++;
    } else {
      book.style.display = "none";
    }
  });

  document.getElementById(
    "search-title"
  ).textContent = `Kết quả tìm kiếm: "${keyword}"`;
  document.getElementById("search-count").textContent = `(${count} kết quả)`;
}

// Lấy query từ URL khi trang mới vào
const params = new URLSearchParams(window.location.search);
const initialQuery = params.get("query")?.trim() || "";
input.value = initialQuery;
updateSearchResult(initialQuery);
addToHistory(initialQuery);

// Tìm kiếm trong trang
searchBtn.addEventListener("click", () => {
  const keyword = input.value.trim();
  if (keyword) {
    updateSearchResult(keyword);
    addToHistory(keyword);
    input.value = ""; // Reset input nếu muốn
  }
});

// Thêm vào localStorage
function addToHistory(keyword) {
  if (!keyword) return;
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.includes(keyword)) {
    history.unshift(keyword);
    if (history.length > 10) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
  renderHistory();
}

// Hiển thị danh sách lịch sử
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  historyList.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      input.value = item;
      updateSearchResult(item);
      addToHistory(item);
    });
    historyList.appendChild(li);
  });
}

// Hiện lịch sử khi focus
input.addEventListener("focus", () => {
  historyBox.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (!document.querySelector(".search-bar").contains(e.target)) {
    historyBox.style.display = "none";
  }
});

renderHistory();
