const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img");

let preValue;

// Function to download the QR Code
function downloadQRCode() {
  const downloadLink = document.createElement("a");
  downloadLink.href = qrImg.src;
  downloadLink.download = "qr-code.png"; // File name for the QR code
  downloadLink.click();
}

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Generating...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
    // Add download button dynamically
    if (!document.querySelector(".download-btn")) {
      const downloadBtn = document.createElement("button");
      downloadBtn.innerText = "Download QR Code";
      downloadBtn.className = "download-btn";
      downloadBtn.addEventListener("click", downloadQRCode);
      wrapper.appendChild(downloadBtn);
    }
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    const downloadBtn = document.querySelector(".download-btn");
    if (downloadBtn) downloadBtn.remove(); // Remove the download button if no QR code is generated
  }
});
