const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");
const strengthBar = document.querySelectorAll(".strength-bar span");
const copyBtn = document.querySelector(".copy-btn");

const requirements = [
  { regex: /.{8,}/, index: 0 },
  { regex: /[0-9]/, index: 1 },
  { regex: /[a-z]/, index: 2 },
  { regex: /[^A-Za-z0-9]/, index: 3 },
  { regex: /[A-Z]/, index: 4 },
];

passwordInput.addEventListener("keyup", (e) => {
  const value = e.target.value;
  let strength = 0;

  requirements.forEach((item) => {
    const isValid = item.regex.test(value);
    const listItem = requirementList[item.index];

    listItem.classList.toggle("valid", isValid);
    listItem.firstElementChild.className = isValid ? "fa-solid fa-check" : "fa-solid fa-circle";

    if (isValid) strength++;
  });

  strengthBar.forEach((bar, index) => {
    bar.classList.toggle("active", index < strength);
  });
});

eyeIcon.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy Password"), 2000);
});
