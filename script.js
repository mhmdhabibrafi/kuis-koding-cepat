document.addEventListener('DOMContentLoaded', () => {
    const questionTextElement = document.getElementById('question-text');
    const answersContainerElement = document.getElementById('answers-container');
    const scoreDisplayElement = document.getElementById('score-display');
    const progressTextElement = document.getElementById('progress-text');
    const gameContainerElement = document.getElementById('game-container');
    const loaderElement = document.getElementById('loader');
    const quizContentElement = document.getElementById('quiz-content');

    let score = 0;
    let currentQuestionIndex = 0;
    let shuffledQuestions = [];

    const questions = [
        { question: "Hook di React yang digunakan untuk menangani state adalah...", answers: ["useState", "useEffect", "useContext", "useReducer"], correctAnswer: "useState" },
        { question: "Apa kepanjangan dari 'DOM'?", answers: ["Document Object Model", "Data Object Model", "Document Oriented Middleware", "Dynamic Object Manipulation"], correctAnswer: "Document Object Model" },
        { question: "Metode array JavaScript untuk menambahkan elemen di akhir array adalah...", answers: [".push()", ".pop()", ".shift()", ".unshift()"], correctAnswer: ".push()" },
        { question: "Perintah Git untuk membuat branch baru dan langsung pindah adalah...", answers: ["git checkout -b", "git new branch", "git create", "git branch new"], correctAnswer: "git checkout -b" },
        { question: "Manakah dari berikut ini yang merupakan preprocessor CSS?", answers: ["SASS", "TypeScript", "React", "jQuery"], correctAnswer: "SASS" },
        { question: "Tipe data boolean merepresentasikan nilai...", answers: ["Benar atau Salah", "Angka", "Teks", "Objek"], correctAnswer: "Benar atau Salah" },
        { question: "Dalam HTML, tag `<p>` digunakan untuk...", answers: ["Paragraf", "Gambar", "Link", "Judul"], correctAnswer: "Paragraf" },
        { question: "Properti CSS untuk mengubah warna latar belakang elemen adalah...", answers: ["background-color", "color", "font-size", "border"], correctAnswer: "background-color" },
        { question: "Siapa penemu bahasa pemrograman JavaScript?", answers: ["Brendan Eich", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"], correctAnswer: "Brendan Eich" },
        { question: "HTTP status code 404 berarti...", answers: ["Not Found", "OK", "Internal Server Error", "Forbidden"], correctAnswer: "Not Found" }
    ];

    function startGame() {
        score = 0;
        currentQuestionIndex = 0;
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        
        const existingRestartButton = document.querySelector('.restart-btn');
        if (existingRestartButton) {
            existingRestartButton.remove();
        }

        quizContentElement.classList.remove('hidden');
        showNextQuestion();
    }

    function showNextQuestion() {
        resetState();
        if (currentQuestionIndex >= shuffledQuestions.length) {
            return endGame();
        }

        updateProgress();
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;
        
        const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

        shuffledAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(button, answer, currentQuestion.correctAnswer));
            answersContainerElement.appendChild(button);
        });
    }

    function selectAnswer(clickedButton, selectedAnswer, correctAnswer) {
        Array.from(answersContainerElement.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });

        if (selectedAnswer === correctAnswer) {
            score += 10;
            clickedButton.classList.add('correct');
        } else {
            clickedButton.classList.add('incorrect');
        }
        
        scoreDisplayElement.textContent = `Skor: ${score}`;

        setTimeout(() => {
            currentQuestionIndex++;
            showNextQuestion();
        }, 1500);
    }

    function endGame() {
        questionTextElement.textContent = `Game Selesai! Skor Akhir Anda: ${score}`;
        answersContainerElement.innerHTML = '';
        progressTextElement.textContent = `Anda menyelesaikan ${questions.length} pertanyaan!`;

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Mulai Lagi';
        restartButton.classList.add('btn', 'restart-btn');
        restartButton.addEventListener('click', startGame);
        gameContainerElement.appendChild(restartButton);
    }

    function resetState() {
        answersContainerElement.innerHTML = '';
    }

    function updateProgress() {
        progressTextElement.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${questions.length}`;
        scoreDisplayElement.textContent = `Skor: ${score}`;
    }

    setTimeout(() => {
        loaderElement.style.display = 'none';
        quizContentElement.classList.remove('hidden');
        startGame();
    }, 1000);
});