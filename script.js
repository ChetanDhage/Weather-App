// Select DOM elements
const searchForm = document.getElementById("searchForm");
const searchInput = document.querySelector(".search_area");
const tempElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");
const timeElement = document.getElementById("time");
const conditionElement = document.getElementById("condition");
const conditionIcon = document.getElementById("condition-icon");

// Function to fetch weather data
const fetchWeatherData = async (city) => {
  const apiKey = "3d0e726f393b4d778e0130849250701";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found. Please try again.`);
    }
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
};

// Function to update the UI with fetched data
const updateUI = (data) => {
  const { temp_c } = data.current; // Current temperature in Celsius
  const { name, localtime } = data.location; // City name and local time
  const { text, icon } = data.current.condition; // Weather condition text and icon

  tempElement.textContent = `${temp_c}°C`;
  locationElement.textContent = name;
  timeElement.textContent = localtime;
  conditionElement.textContent = text;
  conditionIcon.src = `https:${icon}`; // Set the weather icon dynamically
  conditionIcon.alt = text; // Add alt text for accessibility
};

// Event listener for form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = searchInput.value.trim();
  if (city) {
    fetchWeatherData(city);
    searchInput.value = ""; // Clear input field after search
  } else {
    alert("Please enter a city name.");
  }
});
