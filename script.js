$(document).ready(function () {
    const questions = [
        {
            question: "Which is the largest animal in the world?",
            answers: [
                { text: "Shark", correct: false },
                { text: "Blue Whale", correct: true },
                { text: "Elephant", correct: false },
                { text: "Giraffe", correct: false },
            ],
            feedback: "The Blue Whale is the largest animal in the world."
        },
        {
            question: "Which is the smallest continent in the world?",
            answers: [
                { text: "Asia", correct: false },
                { text: "Africa", correct: true },
                { text: "Australia", correct: false },
                { text: "Arctic", correct: false },
            ],
            feedback: "Africa is the smallest continent in the world."
        },
        {
            question: "What is the capital of France?",
            answers: [
                { text: "London", correct: false },
                { text: "Berlin", correct: false },
                { text: "Paris", correct: true },
                { text: "Madrid", correct: false },
            ],
            feedback: "Paris is the capital of France."
        },
        {
            question: "Which planet is known as the 'Red Planet'?",
            answers: [
                { text: "Earth", correct: false },
                { text: "Mars", correct: true },
                { text: "Venus", correct: false },
                { text: "Jupiter", correct: false },
            ],
            feedback: "Mars is known as the 'Red Planet.'"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answers: [
                { text: "Charles Dickens", correct: false },
                { text: "Mark Twain", correct: false },
                { text: "William Shakespeare", correct: true },
                { text: "Jane Austen", correct: false },
            ],
            feedback: "William Shakespeare wrote 'Romeo and Juliet.'"
        }
    };

    let currentQuestionIndex = 0;
    let score = 0;
    let currentQuestion;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        $("#next-btn").html("Next");
        showQuestion();
    }

    function showQuestion() {
        resetState();
        currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        $("#question").html(questionNo + ". " + currentQuestion.question);

        currentQuestion.answers.forEach(answer => {
            const button = $("<button>").html(answer.text);
            button.addClass("btn");
            if (answer.correct) {
                button.data("correct", answer.correct);
            }
            button.click(selectAnswer);
            $("#answer-buttons").append(button);
        });
    }

    function resetState() {
        $("#next-btn").hide();
        $("#answer-buttons").empty();
    }

    function selectAnswer() {
        const selectedBtn = $(this);
        const isCorrect = selectedBtn.data("correct") === true;

        // Disable all answer buttons after selection
        $(".btn").prop("disabled", true);
        $(".btn[data-correct='true']").addClass("correct");

        if (isCorrect) {
            selectedBtn.addClass("correct");
            $("#feedback").html("Correct!");
            score++;
        } else {
            selectedBtn.addClass("incorrect");
            $("#feedback").html("Incorrect!");
        }

        // Display the feedback text if available
        if (currentQuestion.feedback) {
            $("#feedback").append("<br>" + currentQuestion.feedback);
        }

        $("#next-btn").show();
    }

    function showScore() {
        resetState();
        $("#question").html(`You scored ${score} out of ${questions.length}!`);
        $("#next-btn").html("Play Again").show();
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    $("#next-btn").click(function () {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

    startQuiz();
);