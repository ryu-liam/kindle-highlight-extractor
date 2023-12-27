function onElementRendered() {
  try {
    const bookInfo = parseBookInfo();
    const highlights = parseHighlightsAndMemos();
    // send message to background.js
    chrome.runtime.sendMessage({
      type: "SAVE_BOOK_INFO",
      payload: {
        bookInfo: bookInfo,
        highlights: highlights,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

function parseBookInfo() {
  const element = document.querySelector(
    "h3.a-spacing-top-small.a-color-base.kp-notebook-selectable.kp-notebook-metadata"
  );
  if (!element) {
    alert("本のタイトルが見つかりませんでした");
    return;
  }
  const bookTitle = element.innerHTML;
  const bookAuthor = element.nextElementSibling.innerHTML;
  return {
    bookTitle: bookTitle,
    bookAuthor: bookAuthor,
  };
}

function parseHighlightsAndMemos() {
  const elements = document.querySelectorAll("span#highlight");
  if (!elements.length) return [];
  // get innerHTML from elements
  return [...elements].map((element) => {
    if (element instanceof HTMLElement) {
      return element.innerHTML;
    }
  });
}

// ミューテーションオブザーバーのコンフィグ
const config = { childList: true, subtree: true };

// ミューテーションオブザーバーのコールバック
const callback = function (mutationsList) {
  for (const mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      document.querySelector(
        "h3.a-spacing-top-small.a-color-base.kp-notebook-selectable.kp-notebook-metadata"
      )
    ) {
      onElementRendered();
      break;
    }
  }
};

// オブザーバーのインスタンス作成
const observer = new MutationObserver(callback);

// DOMの変更を監視開始
observer.observe(document.body, config);
