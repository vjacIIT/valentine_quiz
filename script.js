const questions = [
  { 
    q: "When did we have our first date?", 
    type: "mcq", 
    options: ["8th April", "9th April", "10th April", "11th April"], 
    answer: "9th April" 
  },
  { 
    q: "Where would you like to go on our honeymoon?", 
    type: "mixed", 
    options: ["Paris", "Japan", "Switzerland"], 
    answer: "any" // always gives +1
  },
  { 
    q: "Which song did I first sing for you?", 
    type: "mcq", 
    options: ["Jiya dhadak dhadak jaaye", "Yellow paper daisy", "Piyu bole", "Ram siya ram"], 
    answer: "Jiya dhadak dhadak jaaye" 
  },
  { 
    q: "What will make you most happy?", 
    type: "input", 
    answer: "14th Feb" 
  }
];

let current = 0;
let score = 0;
const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");

function showQuestion() {
  if (current < questions.length) {
    const q = questions[current];
    let html = `
      <div class="score">Current Score: ${score}</div>
      <h2>${q.q}</h2>
    `;

    if (q.type === "mcq") {
      q.options.forEach((opt, index) => {
        const id = `option-${current}-${index}`;
        html += `
          <div class="option">
            <input type="radio" id="${id}" name="answer" value="${opt}">
            <label for="${id}">${opt}</label>
          </div>`;
      });
      html += `<button onclick="checkAnswer()">Submit</button>`;
    } 
    else if (q.type === "mixed") {
      q.options.forEach((opt, index) => {
        const id = `option-${current}-${index}`;
        html += `
          <div class="option">
            <input type="radio" id="${id}" name="answer" value="${opt}">
            <label for="${id}">${opt}</label>
          </div>`;
      });
      html += `<input id="customAnswer" placeholder="Your destination"><br>`;
      html += `<button onclick="checkAnswer()">Submit</button>`;
    } 
    else if (q.type === "input") {
      html += `<input id="answer" placeholder="Your answer">`;
      html += `<button onclick="checkAnswer()">Submit</button>`;
    }

    quizDiv.innerHTML = html;
  } else {
    showValentineChoice();
  }
}

function checkAnswer() {
  const q = questions[current];
  let ans = "";

  if (q.type === "mcq") {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      showPopup("At least answer to karo na 🙂");
      return; // stop here until she answers
    }
    ans = selected.value;
    if (ans.toLowerCase() === q.answer.toLowerCase()) {
      score++;
      showCorrectAnimation(() => {
        current++;
        showQuestion();
      });
    } else {
      launchAngry();
      if (q.q.includes("first date")) {
        showPopup("Moti date bhul gayi 😡");
      } else if (q.q.includes("song")) {
        showPopup("Ab nahi gaunga tumhare liye 😡");
      }
      setTimeout(() => {
        current++;
        showQuestion();
      }, 3000); // wait before next question
    }
  } 
  else if (q.type === "mixed") {
    const selected = document.querySelector('input[name="answer"]:checked');
    const custom = document.getElementById("customAnswer").value;
    if (!selected && !custom) {
      showPopup("At least answer to karo na 🙂");
      return;
    }
    score++; // always +1
    showCorrectAnimation(() => {
      current++;
      showQuestion();
    });
  } 
  else if (q.type === "input") {
    ans = document.getElementById("answer").value;
    if (!ans) {
      showPopup("At least answer to karo na 🙂");
      return;
    }
    if (q.q.includes("most happy")) {
      score++; // always +1, no angry
      showCorrectAnimation(() => {
        current++;
        showQuestion();
      });
    } else {
      if (ans.toLowerCase() === q.answer.toLowerCase()) {
        score++;
        showCorrectAnimation(() => {
          current++;
          showQuestion();
        });
      } else {
        launchAngry();
        if (q.q.includes("song")) {
          showPopup("Ab nahi gaunga tumhare liye 😡");
        }
        setTimeout(() => {
          current++;
          showQuestion();
        }, 3000);
      }
    }
  }
}


function showCorrectAnimation(callback) {
  const container = document.getElementById("hearts-container");
  for (let i = 0; i < 40; i++) { // increased to 40 sparkles
    const sparkle = document.createElement("div");
    sparkle.className = "correct";
    sparkle.innerHTML = "✨"; // sparkle emoji
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration = (2 + Math.random() * 2) + "s";
    container.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 3000);
  }
  setTimeout(callback, 3000); // move on after animation
}


function launchAngry() {
  const container = document.getElementById("angry-container");
  for (let i = 0; i < 30; i++) { // doubled to 30 emojis
    const angry = document.createElement("div");
    angry.className = "angry";
    angry.innerHTML = "😡";
    angry.style.left = Math.random() * 100 + "vw";
    angry.style.animationDuration = (2 + Math.random() * 2) + "s";
    container.appendChild(angry);

    setTimeout(() => {
      angry.remove();
    }, 3000);
  }
}

function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000); // stays for 5 seconds
}

function showValentineChoice() {
  quizDiv.innerHTML = `
  <h2>Will you be my Valentine? 💘</h2>
  <p>Your final score: ${score}/${questions.length}</p>
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
      <button class="alt-yes" onclick="sayYes()">Yes (Nahi jaa sakti bach ke)</button>
    `;
  }
}

function sayYes() {
  resultDiv.innerHTML = `
    <h2>Yay! You’re my Valentine ❤️</h2>
    <img src="images/Valentines_Special.jpeg" alt="Us together" class="valentine-pic fade-in">
  `;
  launchHearts();
}

function launchHearts() {
  const container = document.getElementById("hearts-container");
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (2 + Math.random() * 3) + "s";
    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}

showQuestion();
