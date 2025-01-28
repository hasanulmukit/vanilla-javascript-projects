const popup = document.getElementById("popup");
const icon = document.getElementById("icon").querySelector("i");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const reconnectBtn = document.getElementById("reconnect");

let isOnline = true;
let timer = 10;
let intervalId;

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.ok;
  } catch (error) {
    isOnline = false;
  }
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  clearInterval(intervalId);

  if (status) {
    icon.className = "uil uil-wifi";
    title.textContent = "Connection Restored";
    desc.textContent = "You are back online!";
    popup.className = "popup online show";
    reconnectBtn.disabled = true;

    setTimeout(() => {
      popup.className = "popup";
    }, 2000);
  } else {
    icon.className = "uil uil-wifi-slash";
    title.textContent = "No Internet Connection";
    desc.innerHTML = `We will try to reconnect in <b>${timer}</b> seconds.`;
    popup.className = "popup offline show";
    reconnectBtn.disabled = false;

    intervalId = setInterval(() => {
      timer--;
      desc.innerHTML = `We will try to reconnect in <b>${timer}</b> seconds.`;

      if (timer === 0) {
        timer = 10;
        checkConnection();
      }
    }, 1000);
  }
};

reconnectBtn.addEventListener("click", () => {
  timer = 10;
  checkConnection();
});

setInterval(() => {
  checkConnection();
}, 5000);

checkConnection();
