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
const adminPanel = document.getElementById("admin-panel");

// New Buttons
const viewQuestionsBtn = document.createElement("button");
viewQuestionsBtn.textContent = "View All Questions";
adminPanel.appendChild(viewQuestionsBtn);

let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = [];

// Load a question
function loadQuestion() {
  quizContainer.innerHTML = "";
  const questionObj = questions[currentQuestionIndex];

  // Question
  const questionElem = document.createElement("h3");
  questionElem.textContent = `Q${currentQuestionIndex + 1}: ${questionObj.question}`;
  quizContainer.appendChild(questionElem);

  // Options
  questionObj.options.forEach((option, index) => {
      const optionElem = document.createElement("div");
      optionElem.innerHTML = `
          <input type="radio" name="option" id="option${index}" value="${option}">
          <label for="option${index}">${option}</label>
      `;
      quizContainer.appendChild(optionElem);
  });
}

// Show all questions
viewQuestionsBtn.addEventListener("click", () => {
  quizContainer.innerHTML = "<h3>All Questions</h3>";
  questions.forEach((q, index) => {
      const questionElem = document.createElement("div");
      questionElem.innerHTML = `
          <strong>Q${index + 1}:</strong> ${q.question}<br>
          <em>Options:</em> ${q.options.join(", ")}<br>
          <em>Correct Answer:</em> ${q.correct}<br><br>
      `;
      quizContainer.appendChild(questionElem);
  });
});

// Add a new question
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
  if (confirm("Are you sure you want to delete all questions?")) {
      questions = [];
      alert("All questions deleted!");
      quizContainer.innerHTML = "";
  }
});

// Handle next button
nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
      userAnswers.push(selectedOption.value);

      if (selectedOption.value === questions[currentQuestionIndex].correct) {
          userScore++;
      }

      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          loadQuestion();
      } else {
          showResults();
      }
  } else {
      alert("Please select an option.");
  }
});

// Show results
function showResults() {
  quizContainer.innerHTML = "<h2>Quiz Results</h2>";
  questions.forEach((q, index) => {
      const resultElem = document.createElement("div");
      resultElem.innerHTML = `
          <strong>Q${index + 1}:</strong> ${q.question}<br>
          <em>Your Answer:</em> ${userAnswers[index] || "Not Answered"}<br>
          <em>Correct Answer:</em> ${q.correct}<br>
          <hr>
      `;
      quizContainer.appendChild(resultElem);
  });

  const scoreElem = document.createElement("h3");
  scoreElem.textContent = `Your Score: ${userScore} / ${questions.length}`;
  quizContainer.appendChild(scoreElem);

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.addEventListener("click", restartQuiz);
  quizContainer.appendChild(restartBtn);
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  userAnswers = [];
  loadQuestion();
}

// Load the first question
loadQuestion();
