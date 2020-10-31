const source = document.getElementById("source");
const pipeline = document.getElementById("pipeline");
const project = document.getElementById("project");
const bucket = document.getElementById("bucket");
const storage = document.getElementById("storage");
const credentials = document.getElementById("credentials");
const run = document.getElementById("run");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  //This whole function validates all the three conditions. Changing the class names to show the error message.
  const formValidation = (input) => {
    var regex = /^[a-zA-Z0-9_+-]*$/;
    const li = input.parentElement;
    const mainParent = input.parentElement.parentElement;
    const div = mainParent.querySelector("div");
    const small = li.querySelector("small");

    if (regex.test(input.value) == false) {
      //This if block is used to validate the special character condtion using regex patterns
      errors.push("Should not contain speical characters");
      input.className = "error data";
      div.className = "error-line";
      small.innerText = "Should not contain speical characters";
      small.className = "visible";
    } else if (input.value.length < 5) {
      //This block validates the length of the strings
      errors.push("Length should be greater than 5");
      input.className = "error data";
      div.className = "error-line";
      small.innerText = "Length should be greater than 5";
      small.className = "visible";
    } else if (
      input.value[0] === "+" ||
      input.value[0] === "-" ||
      input.value[0] === "_"
    ) {
      // This block checks if the string is starting from +,_,- symbols
      errors.push("First character shouldn't be +,-,_");
      input.className = "error data";
      div.className = "error-line";
      small.innerText = "First character shouldn't be +,-,_";
      small.className = "visible";
    } else {
      //if everything passes then we are setting the class names to their default values
      //i.e no error messaged is displayed
      input.className = "data";
      small.className = "";
      div.className = "line";
    }
  };

  //To store all the erros. This is only used to check if the form can be submitted.
  //If this array lenght is zero then form is submitted.
  const errors = [];

  //Array to iterate over the input data to perform form validation (1.0)
  const data = [pipeline, project, bucket, storage, credentials];
  //the iteration of above array(1.0)
  data.map((data) => {
    formValidation(data);
  });

  //The formsubmission is prevented if there are erros.
  if (errors.length > 0) {
    e.preventDefault();
  }
});
