console.log("Hello ! This is app.js file..");
fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();


  const search = document.querySelector("input");
  const location = search.value;
  const messageOne = document.querySelector("#message-1");
  const messageTwo = document.querySelector("#message-2");
  messageOne.textContent = "Loading... ";
  messageTwo.textContent = "";
  console.log(location);

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
