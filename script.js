// Sample question data
let questions = [
  {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4"
  },
  {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Rome", "Madrid"],
      correct: "Paris"
  }
];

// DOM elements
const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const addForm = document.getElementById("add-question-form");
const deleteBtn = document.getElementById("delete-question-btn");

let currentQuestionIndex = 0;
let userScore = 0;

// Load question
function loadQuestion() {
  quizContainer.innerHTML = "";

  const questionObj = questions[currentQuestionIndex];
  const questionElem = document.createElement("h3");
  questionElem.textContent = questionObj.question;
  quizContainer.appendChild(questionElem);

  questionObj.options.forEach((option, index) => {
      const optionElem = document.createElement("div");
      optionElem.innerHTML = `
          <input type="radio" name="option" id="option${index}" value="${option}">
          <label for="option${index}">${option}</label>
      `;
      quizContainer.appendChild(optionElem);
  });
}

// Add new question
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newQuestion = {
      question: document.getElementById("question").value,
      options: [
          document.getElementById("option1").value,
          document.getElementById("option2").value,
          document.getElementById("option3").value,
          document.getElementById("option4").value
      ],
      correct: document.getElementById("correct").value
  };
  questions.push(newQuestion);
  alert("Question added successfully!");
  addForm.reset();
});

// Delete all questions
deleteBtn.addEventListener("click", () => {
  questions = [];
  alert("All questions deleted!");
});

// Handle Next button
nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
      if (selectedOption.value === questions[currentQuestionIndex].correct) {
          userScore++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          loadQuestion();
      } else {
          alert(`Quiz finished! Your score: ${userScore}/${questions.length}`);
          currentQuestionIndex = 0;
          userScore = 0;
          loadQuestion();
      }
  } else {
      alert("Please select an option.");
  }
});

// Load initial question
loadQuestion();
