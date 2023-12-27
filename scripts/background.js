"use strict";

import { ACTION_TYPES, BookInfo } from "./actionRequest.js";

chrome.runtime.onMessage.addListener((request) => {
  if (request.type) {
    handleActions(request);
  }
});

function handleActions(request) {
  switch (request.type) {
    case ACTION_TYPES.SAVE_BOOK_INFO: {
      BookInfo.setBookInfo(request.payload);
      break;
    }
    default:
      console.error(`Unknown action type: ${request.type}`);
  }
}

// function sendMessageToContentScript(message) {
//   chrome.tabs.query({ currentWindow: true }, (tabs) => {
//     if (chrome.runtime.lastError) {
//       console.error(`Error querying tabs: ${chrome.runtime.lastError.message}`);
//       return;
//     }

//     if (!tabs.length) {
//       console.error("タブが見つかりませんでした");
//       return;
//     }

//     const id = tabs[0].id;
//     chrome.tabs.sendMessage(id, { message: message }, (response) => {
//       console.log(response);
//       if (chrome.runtime.lastError) {
//         console.error(
//           `Error sending message: ${chrome.runtime.lastError.message}`
//         );
//       }
//     });
//   });
// }
