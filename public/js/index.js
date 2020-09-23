const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageContainer = document.querySelector(".message-container");

function createMessage(messageText) {
  const message = document.createElement("p");
  message.textContent = messageText;
  messageContainer.append(message);
}

async function getForecast(location) {
  const response = await fetch(
    `http://localhost:3000/weather?address=${location}`
  );
  const data = await response.json();
  if (data.error) {
    messageContainer.innerHTML = "";
    createMessage(data.error);
  } else {
    messageContainer.innerHTML = "";
    createMessage(data.location);
    createMessage(data.weather);
  }
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getForecast(searchInput.value);
  console.log("submitted");
});
