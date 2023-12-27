export const ACTION_TYPES = {
  SAVE_BOOK_INFO: "SAVE_BOOK_INFO",
};

const LOCAL_STORAGE_KEYS = {
  BOOK_INFO: "BOOK_INFO",
};

// create class to set and get local storage of book info
export class BookInfo {
  static setBookInfo(data) {
    console.log("setBookInfo", data);
    chrome.storage.local.set({
      [LOCAL_STORAGE_KEYS.BOOK_INFO]: data,
    });
  }

  static getBookInfo() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(
        [LOCAL_STORAGE_KEYS.BOOK_INFO],
        function (result) {
          if (result) {
            resolve(result[LOCAL_STORAGE_KEYS.BOOK_INFO]);
          } else {
            reject("No book info found");
          }
        }
      );
    });
  }
}
