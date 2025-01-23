const wrapper = document.querySelector(".wrapper"),
  selectBtn = wrapper.querySelector(".select-btn"),
  searchInp = wrapper.querySelector("input"),
  options = wrapper.querySelector(".options");

// Fetch the country list from JSON file
let countries = [];
fetch("countries.json")
  .then((response) => response.json())
  .then((data) => {
    countries = data; // Assign countries array to a global variable
    addCountry(); // Populate the initial list
  });

// Function to populate the country list
function addCountry(selectedCountry = "") {
  options.innerHTML = ""; // Clear previous options
  countries.forEach((country) => {
    const isSelected = country === selectedCountry ? "selected" : "";
    const li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}

// Function to update the selected country
function updateName(selectedLi) {
  searchInp.value = ""; // Clear the search input
  addCountry(selectedLi.innerText); // Refresh the list with the selected country
  wrapper.classList.remove("active"); // Close the dropdown
  selectBtn.firstElementChild.innerText = selectedLi.innerText; // Update the button text
}

// Function to filter countries based on search input
function filterCountries() {
  const searchWord = searchInp.value.toLowerCase(); // Get the search term
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().startsWith(searchWord)
  ); // Filter countries based on the search term

  const listItems = filteredCountries
    .map((country) => `<li onclick="updateName(this)">${country}</li>`)
    .join(""); // Create HTML for the filtered countries
  options.innerHTML = listItems || `<p>Country not found</p>`; // Update the options list
}

// Event listener for the search input
searchInp.addEventListener("keyup", filterCountries);

// Event listener for the select button
selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
