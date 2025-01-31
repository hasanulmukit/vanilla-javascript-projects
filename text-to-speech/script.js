const textarea = document.querySelector("textarea");
const convertBtn = document.querySelector("#convert");
const clearBtn = document.querySelector("#clear");
let isSpeaking = true;

const textToSpeech = () => {
  const synth = window.speechSynthesis;
  const text = textarea.value.trim();

  if (!text) {
    alert("Please enter some text to convert to speech.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  if (!synth.speaking && text) {
    synth.speak(utterance);
    convertBtn.innerText = "Pause Speech";
  }

  if (text.length > 50) {
    if (synth.speaking && isSpeaking) {
      synth.pause();
      isSpeaking = false;
      convertBtn.innerText = "Resume Speech";
    } else {
      synth.resume();
      isSpeaking = true;
      convertBtn.innerText = "Pause Speech";
    }
  }

  utterance.onend = () => {
    convertBtn.innerText = "Convert to Speech";
  };
};

convertBtn.addEventListener("click", textToSpeech);

clearBtn.addEventListener("click", () => {
  textarea.value = "";
  window.speechSynthesis.cancel(); // Stop any ongoing speech
  convertBtn.innerText = "Convert to Speech";
});
