import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

const socket = io()

const form = document.querySelector(".inner-form")
const input = form.querySelector("input[name='content']")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  if(input.value){
    socket.emit("CLIENT_SEND_MESSAGE", input.value)
    input.value = ""
    socket.emit("CLIEND_SEND_TYPING", "hidden")
  }
})

socket.on("SERVER_RETURN_MESSAGE", (msg) => {
  const myId = document.querySelector(".chat").getAttribute("my-id")
  const chatBody = document.querySelector(".inner-body")
  const div = document.createElement("div")

  if(myId === msg.id){
    div.classList.add("inner-outgoing")
    div.innerHTML = `
      <div class="inner-content">${msg.content}</div>
    `
  }else{
    div.classList.add("inner-incoming")
    div.innerHTML = `
      <div class="inner-name">${msg.name}</div>
      <div class="inner-content">${msg.content}</div>
    `
  }

  chatBody.appendChild(div)
  if(myId === msg.id){
    chatBody.scrollTop = chatBody.scrollHeight
  }
})

// Always scroll to the newest message when vist page
const chatBody = document.querySelector(".inner-body")
if(chatBody){
  chatBody.scrollTop = chatBody.scrollHeight
}

// Show Icon Chat
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker) {
  const inputChat = document.querySelector(".chat .inner-form input[name='content']");

  emojiPicker.addEventListener('emoji-click', (event) => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
// End Show Icon Chat

// Show Popup Icon
const buttonIcon = document.querySelector("[button-icon]");

if(buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.addEventListener("click", () => {
    tooltip.classList.toggle('shown');
  });

  document.addEventListener("click", (event) => {
    if (!tooltip.contains(event.target) && !buttonIcon.contains(event.target)) {
      tooltip.classList.remove("shown");
    }
  });
}
// End Show Popup Icon

// Typing
const inputChat = document.querySelector("input[name='content']")
var timeout
if(inputChat){
  inputChat.addEventListener("keypress", () => {
    socket.emit("CLIENT_SEND_TYPING", "show")
    clearTimeout(timeout)

    timeOut = setTimeout(() => {
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
  })
}
// End Typing