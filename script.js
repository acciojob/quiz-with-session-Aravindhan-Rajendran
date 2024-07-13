// Question data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear any existing content

  // Retrieve saved progress
  const progress = JSON.parse(sessionStorage.getItem('progress')) || {};

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br"));

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (progress[`question-${i}`] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      choiceElement.addEventListener('change', () => saveProgress(`question-${i}`, choice));

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }
    questionsElement.appendChild(questionElement);
  }
}

// Save progress to session storage
function saveProgress(questionKey, selectedChoice) {
  const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
  progress[questionKey] = selectedChoice;
  sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Calculate and display the score
function calculateScore() {
  const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (progress[`question-${i}`] === questions[i].answer) {
      score++;
    }
  }

  localStorage.setItem('score', score);
  document.getElementById('score').textContent = `Your score is ${score} out of ${questions.length}.`;
}

// Set up event listener for the submit button
document.getElementById('submit').addEventListener('click', calculateScore);

// Render the quiz on page load
renderQuestions();