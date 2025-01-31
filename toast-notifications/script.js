const notifications = document.querySelector(".notifications");
const buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
  success: {
    icon: "fa-check-circle",
    text: "Success! Operation completed successfully.",
  },
  error: {
    icon: "fa-times-circle",
    text: "Error! Something went wrong.",
  },
  warning: {
    icon: "fa-exclamation-triangle",
    text: "Warning! Check the inputs.",
  },
  info: {
    icon: "fa-info-circle",
    text: "Info! This is an informational message.",
  },
};

const removeToast = (toast) => {
  toast.style.animation = "slideOut 0.5s ease forwards";
  toast.addEventListener("animationend", () => toast.remove());
};

const createToast = (type) => {
  const { icon, text } = toastDetails[type];
  const toast = document.createElement("li");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa ${icon}" aria-hidden="true"></i>
    <span>${text}</span>
    <button class="close-btn" aria-label="Close notification" onclick="removeToast(this.parentElement)">×</button>
  `;
  notifications.appendChild(toast);

  // Set a timeout to automatically remove the toast
  setTimeout(() => removeToast(toast), 5000);
};

buttons.forEach((btn) =>
  btn.addEventListener("click", () => createToast(btn.id))
);
