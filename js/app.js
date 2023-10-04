// Get a reference to the HTML element with the ID "slider"
const slideDiv = document.getElementById("slider");

// Get references to the "next" and "prev" buttons by their IDs
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

// Initialize a counter variable to keep track of the current slide
let counter = 0;

// Initialize an empty array to store references to slide elements
const slides = [];

// Define an asynchronous function to fetch data from a JSON file
async function fetchData() {
  try {
    // Fetch data from the "./data.json" file
    const response = await fetch("./data.json");

    // Parse the JSON data
    const data = await response.json();

    // Loop through the data obtained from JSON
    data.forEach((dataGet) => {
      // Create a new div element for each image
      const createDiv = document.createElement("div");

      // Set the class attribute for the created div
      createDiv.setAttribute("class", "slide");
      createDiv.innerText += dataGet.title;

      // Set the background image of the div to the image URL from the data
      createDiv.style.background = `#ffffff url("${dataGet.image_URL}") no-repeat center center`;

      // Append the created div to the slider element
      slideDiv.appendChild(createDiv);

      // Push a reference to the created div into the slides array
      slides.push(createDiv);
    });

    // Set the initial positions of the slides in the slider
    slides.forEach((slide, index) => {
      slide.style.left = `${index * 100}%`;
    });

    // Initially, hide the "prev" button
    prevButton.style.display = "none";

    // Add click event listeners to the "next" and "prev" buttons
    nextButton.addEventListener("click", goNext);
    prevButton.addEventListener("click", goPrev);
  } catch (error) {
    // Handle errors if fetching or parsing data fails
    console.error("Error fetching data:", error);
  }
}

// Function to go to the next slide
function goNext() {
  if (counter < slides.length - 1) {
    counter++;
    slideImage();
    prevButton.style.display = "block"; // Show the "prev" button
  }
  if (counter === slides.length - 1) {
    nextButton.style.display = "none"; // Hide the "next" button
  }
}

// Function to go to the previous slide
function goPrev() {
  if (counter !== 0) {
    counter--;
    slideImage();
    nextButton.style.display = "block"; // Show the "next" button
  }
  if (counter === 0) {
    prevButton.style.display = "none"; // Hide the "prev" button
  }
}

// Function to update the position of slides based on the counter
function slideImage() {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

// Call the fetchData function to start loading data and setting up the slider
fetchData();
