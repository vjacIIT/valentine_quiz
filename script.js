const questions = [
  { q: "What’s my favorite color?", a: "Red" },
  { q: "Where did we first meet?", a: "College" },
  { q: "What’s my favorite food?", a: "Pizza" },
  { q: "Which movie do I love most?", a: "Inception" },
  { q: "What’s our special date?", a: "14th Feb" }
];

let current = 0;
let score = 0;
const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");

function showQuestion() {
  if (current < questions.length) {
    quizDiv.innerHTML = `
      <h2>${questions[current].q}</h2>
      <input id="answer" placeholder="Your answer">
      <button onclick="checkAnswer()">Submit</button>
    `;
  } else {
    showValentineChoice();
  }
}

function checkAnswer() {
  const ans = document.getElementById("answer").value;
  if (ans.toLowerCase() === questions[current].a.toLowerCase()) {
    score++;
  } else {
    quizDiv.innerHTML += `<div class="angry">😡 Angry Man Appears!</div>`;
  }
  current++;
  showQuestion();
}

function showValentineChoice() {
  quizDiv.innerHTML = `
    <h2>Will you be my Valentine? 💘</h2>
    <button class="yes" onclick="sayYes()">Yes</button>
    <button onclick="sayNo()">No</button>
  `;
}

let noCount = 0;
function sayNo() {
  noCount++;
  if (noCount < 10) {
    resultDiv.innerHTML = `Think again... (${noCount})`;
  } else {
    quizDiv.innerHTML = `
      <h2>Will you be my Valentine? 💘</h2>
      <button class="yes" onclick="sayYes()">Yes</button>
      <button class="alt-yes" onclick="sayYes()">Yes (Different Color)</button>
    `;
  }
}

function sayYes() {
  resultDiv.innerHTML = `<h2>Yay! You’re my Valentine ❤️</h2>`;
}

showQuestion();
