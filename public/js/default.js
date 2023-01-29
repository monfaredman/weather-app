const emit = document.querySelector("form");
const paragraph = document.getElementById("p-1");
const errorMessage = document.getElementById("p-2");
const model = document.querySelector("input");
emit.addEventListener("submit", (e) => {
  e.preventDefault();
  paragraph.textContent = " 🔎 . . . ";
  errorMessage.textContent = " ";
  fetch(`http://localhost:3000/weather?address=${model.value}`).then((res) =>
    res.json().then((data) => {
      if (data.error || data.err) {
        errorMessage.textContent = data.error || data.err;
        paragraph.textContent = "";
      } else {
        paragraph.textContent = data.data;
      }
    })
  );
});
