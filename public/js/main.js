import {messageDelete, threadDelete} from "./event_listener.js";

const threadLink = document.getElementById("thread-delete");
const messageLinks = document.getElementsByClassName("message-delete");

if (threadLink != null) {
    threadLink.addEventListener("click", threadDelete);
}

if (messageLinks.length !== 0) {
    [...messageLinks].map(element => {
        element.addEventListener("click", messageDelete);
    });
}