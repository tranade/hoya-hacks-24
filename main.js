// Constants
const ENDPOINT_COMPLETIONS = "https://api.openai.com/v1/chat/completions";

// Global variables
let API_KEY;

// helper functions to get blurb from the chat completions api endpoint
async function getBlurb(i1, i2) {

  // defines the prompt to send to the api based on title and theme
  const prompt = `Generate 5 easy recipes using ${i1} and ${i2}. Use bullet points for steps and add <br><br> between different recipes.`;

  // gets the response from api with defined parameters for fetch command
  const response = await fetch(ENDPOINT_COMPLETIONS, {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}]
    }),
    headers: {
      'Content-type': "application/json",
      Authorization: `Bearer ${API_KEY}`
    }
  })

  // extracts the data from the response
  const data = await response.json();

  // returns the blurb by extracting it from the json object
  return data.choices[0].message.content;
}

// Event handlers
async function handleFormSubmission(e) {

  // prevents the default function of submitting the button
  e.preventDefault();
  
  // grabs relevant elements for updating the DOM
  const spinner = document.getElementById("loader");
  const blurb = document.getElementById("generatedBlurb");

  // hides and shows certain elements
  spinner.style.display = "block";

  // try-catch block to handle api errors
  try {

    // gets blurb by calling helper function
    let blurbText = await getBlurb("tomatoes", "broccoli");
    blurbText = blurbText.replaceAll("-", "<br>-");
    blurbText = blurbText.replaceAll("Recipe", "<br><br>Recipe");

    blurb.innerHTML = blurbText;

  } catch (error) {

    // prints to console and displays alert if error occurs
    console.log("An error occurred.");

    alert(
      "An error occurred.",
    );
    // returns from function
    return;
  }

  // updates DOM to prepare for new imputs
  spinner.style.display = "none";
}

// called every time page is reloaded
document.addEventListener("DOMContentLoaded", () => {

  // gets api key from local storage
  API_KEY = localStorage.getItem("openai_api_key");

  // displays alert if api key is not presentt
  if (!API_KEY) {
    alert(
      "Please store your API key in local storage with the key 'openai_api_key'.",
    );
    return;
  }

  // gets button element from document
  const recipeForm = document.getElementById("recipe-button");

  // adds submit event listener to button which calls helper function
  recipeForm.addEventListener("click", handleFormSubmission);
});