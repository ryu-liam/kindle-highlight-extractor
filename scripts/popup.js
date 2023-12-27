"use strict";

import { ACTION_TYPES, BookInfo } from "./actionRequest.js";

// DOMの読み込みが完了したら実行
document.addEventListener("DOMContentLoaded", function () {
  onReady();
});

// ローカルストレージの変更を監視
chrome.storage.onChanged.addListener(function (changes, area) {
  if (area == "local") {
    onReady();
  }
});

function onReady() {
  BookInfo.getBookInfo().then((bookInfo) => {
    if (!Object.keys(bookInfo).length) return;
    renderBookInfo(bookInfo);
  });
}

function renderBook(bookInfo) {
  return `
    <div id="book-info">
      <div id="book-title">${bookInfo.bookTitle}</div>
      <div id="book-author">${bookInfo.bookAuthor}</div>
    </div>
  `;
}

function renderHighlights(highlights) {
  const highlightsList = highlights
    .map((highlight) => `<li>${highlight}</li>`)
    .join("");
  return `
  <div id="highlight-container">
  <span>この本のハイライト一覧</span>
  <ul>${highlightsList}</ul>
  </div>
  `;
}

function renderBookInfo(obj) {
  const bookInfoHtml = renderBook(obj.bookInfo);
  const highlightsHtml = renderHighlights(obj.highlights);
  const contents = bookInfoHtml + highlightsHtml;
  const bookContent = document.getElementById("book-content");
  bookContent.innerHTML = contents;
}
