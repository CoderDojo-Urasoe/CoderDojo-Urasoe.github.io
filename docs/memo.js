let memoList = [];

// メモを追加する関数
function addMemo() {
  const memoInput = document.getElementById("memoInput");
  const memo = memoInput.value.trim();

  if (memo === "") {
    alert("メモを入力してください。");
    return;
  }

  const imageInput = document.getElementById("imageInput");
  const image = imageInput.files[0];

  if (image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      const imageDataURL = reader.result;
      memoList.push({ memo: memo, image: imageDataURL });
      saveMemoList(memoList);
      displayMemoList();
    };
  } else {
    memoList.push({ memo: memo, image: null });
    saveMemoList(memoList);
    displayMemoList();
  }

  memoInput.value = "";
  imageInput.value = "";
}

// メモリストをローカルストレージに保存する関数
function saveMemoList(memoList) {
  localStorage.setItem("memoList", JSON.stringify(memoList));
}

// メモリストを取得する関数
function getMemoList() {
  return JSON.parse(localStorage.getItem("memoList")) || [];
}

// メモリストを表示する関数
function displayMemoList() {
  const memoListElement = document.getElementById("memoList");
  memoListElement.innerHTML = "";

  memoList.forEach((memoObj, index) => {
    const li = document.createElement("li");
    li.textContent = memoObj.memo;

    if (memoObj.image) {
      const img = document.createElement("img");
      img.src = memoObj.image;
      img.style.maxWidth = "100px";
      img.style.maxHeight = "100px";
      li.appendChild(img);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.onclick = function () {
      deleteMemo(index);
    };
    li.appendChild(deleteButton);

    memoListElement.appendChild(li);
  });
}

// メモを削除する関数
function deleteMemo(index) {
  memoList.splice(index, 1);
  saveMemoList(memoList);
  displayMemoList();
}

// メモを検索する関数
function searchMemo() {
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput.value.trim().toLowerCase();

  if (keyword === "") {
    alert("検索キーワードを入力してください。");
    return;
  }

  memoList = getMemoList().filter((memoObj) =>
    memoObj.memo.toLowerCase().includes(keyword)
  );
  displayMemoList();
}

// 検索結果をリセットする関数
function resetSearch() {
  memoList = getMemoList();
  displayMemoList();
}

// ページロード時にメモリストを表示
memoList = getMemoList();
displayMemoList();