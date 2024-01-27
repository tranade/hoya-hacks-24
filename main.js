// Constants
const ENDPOINT_COMPLETIONS = "https://api.openai.com/v1/chat/completions";
const ENDPOINT_IMAGES = "https://api.openai.com/v1/images/generations";

// Global variables
let API_KEY;

// helper functions to get blurb from the chat completions api endpoint
async function getBlurb(i1, i2) {

  console.log("entered get blurb")

  // defines the prompt to send to the api based on title and theme
  const prompt = `Give me easy recipes using (${i1}) and (${i2}).`;

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

  console.log("finished fetch")

  // extracts the data from the response
  const data = await response.json();

  // returns the blurb by extracting it from the json object
  return data.choices[0].message.content;
}

// helper function to get the generated image's url given the blurb
async function getCoverImage(blurb) {

  // gets response from images endpoint with defined parameters
  const response = await fetch(ENDPOINT_IMAGES, {
    method: "POST",
    body: JSON.stringify({
      prompt: blurb,
      n: 1,
      size: "1024x1024"
    }),
    headers: {
      'Content-type': "application/json",
      Authorization: `Bearer ${API_KEY}`
    }
  })

  // extracts json object
  const image = await response.json();

  // returns url from json object
  return image.data[0].url;
}

// Event handlers
async function handleFormSubmission(e) {

  console.log("button")

  // prevents the default function of submitting the button
  e.preventDefault();

  // // gets the title and theme elements
  // const title = document.getElementById("mangaTitle");
  // const theme = document.getElementById("mangaTheme");

  // // disables text inputs from the user
  // title.disabled = true;
  // theme.disabled = true;

  // // gets the values that the user inputted
  // const titleText = title.value;
  // const themeText = theme.value;

  // // checks if a title was inputted, otherwise gives a warning
  // if (!titleText) {
  //   alert(
  //     "Please specify a title.",
  //   );
  //   return;
  // }

  // // checks if a theme was inputted, otherwise gives a warning
  // if (!themeText) {
  //   alert(
  //     "Please specify a theme.",
  //   );
  //   return;
  // }
  
  // grabs relevant elements for updating the DOM
  const spinner = document.getElementById("loader");
  // const generate = document.getElementById("generateButton")
  // const blurb = document.getElementById("generatedBlurb");
  // const image = document.getElementById("coverImage");

  // hides and shows certain elements
  spinner.style.display = "block";
  // generate.classList.add("hidden");
  // blurb.classList.add("hidden");
  // image.classList.add("hidden");

  // try-catch block to handle api errors
  try {
  
    console.log("hi")
    // gets blurb by calling helper function
    // const blurbText = await getBlurb(titleText, themeText);
    const blurbText = await getBlurb("tomato", "olive");

    console.log(blurbText)

    // // updates DOM to show blurb
    // blurb.classList.remove("hidden");
    // blurb.textContent = blurbText;
    
    // // gets image url by calling helper function
    // const imageURL = await getCoverImage(blurbText);
    
    // // updated DOM to show image
    // image.classList.remove("hidden");
    // image.src = imageURL;
  } catch (error) {

    // prints to console and displays alert if error occurs
    console.log("An error occurred.");
    alert(
      "An error occurred.",
    );

    // resets the DOM
    // reset();

    // returns from function
    return;
  }

  // updates DOM to prepare for new imputs
  spinner.style.display = "none";
  // spinner.classList.add("hidden");
  // generate.classList.remove("hidden");
  // title.disabled = false;
  // theme.disabled = false;
}

// helper function to set display to original display (when you reload page)
function reset() {

  // grabs relecant elements
  const spinner = document.getElementById("loader");
  const generate = document.getElementById("generateButton")
  const blurb = document.getElementById("generatedBlurb");
  const image = document.getElementById("coverImage");
  const title = document.getElementById("mangaTitle");
  const theme = document.getElementById("mangaTheme");
  
  // updates DOM to reset it
  spinner.classList.add("hidden");
  generate.classList.remove("hidden");
  blurb.classList.add("hidden");
  image.classList.add("hidden");
  title.disabled = false;
  theme.disabled = false;
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
  const mangaInputForm = document.getElementById("recipe-button");

  // adds submit event listener to button which calls helper function
  mangaInputForm.addEventListener("click", handleFormSubmission);
});

// function printhi() {
//   console.log("hi")
// }
