let quizzQuestions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners Lee",
        "answer_4": "Juatin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet HTML?",
        "answer_1": "Hyperlinks and Text Markup Language",
        "answer_2": "Home Tool Markup Language",
        "answer_3": "Hyper Text Markup Language",
        "answer_4": "Hyperlinking Text Marking Language",
        "right_answer": 2
    },
    {
        "question": "Wie ist die grundlegende Struktur eines HTML-Dokuments?",
        "answer_1": "html head body /body /head /html>",
        "answer_2": "html body head /head /body /html",
        "answer_3": "html header footer /footer /header /html>",
        "answer_4": " html head /head body /body /html>",
        "right_answer": 3
    },
    {
        "question": "Was ist der Zweck des !DOCTYPE html Deklaration?",
        "answer_1": "Es definiert den Titel des Dokuments.",
        "answer_2": "Es legt die Dokumententyp-Definition fest.",
        "answer_3": "Es verlinkt ein externes Stylesheet.",
        "answer_4": "Es fügt Metadaten zur Webseite hinzu.",
        "right_answer": 1
    },
    {
        "question": "Wie fügt man ein Bild in eine HTML-Seite ein?",
        "answer_1": "'image src='bild.jpg",
        "answer_2": "img href='bild.jpg'",
        "answer_3": "img src='bild.jpg'",
        "answer_4": "image href='bild.jpg'",
        "right_answer": 2
    },
    {
        "question": "Was sind Meta-Tags und wofür werden sie verwendet?",
        "answer_1": "Sie definieren den sichtbaren Inhalt der Seite.",
        "answer_2": "Sie verlinken externe Ressourcen.",
        "answer_3": "Sie enthalten Metadaten über das HTML-Dokument.",
        "answer_4": "Sie sind notwendig, um CSS zu verwenden.",
        "right_answer": 2
    },
    {
        "question": "Was ist der Unterschied zwischen div und span?",
        "answer_1": "<div> ist ein Inline-Element, <span> ist ein Block-Level-Element.",
        "answer_2": "<div> ist ein Block-Level-Element, <span> ist ein Inline-Element.",
        "answer_3": "<div> ist ein semantisches Element, <span> nicht.",
        "answer_4": "Es gibt keinen Unterschied.",
        "right_answer": 1
    },
    {
        "question": "Wie bindet man ein externes Stylesheet in eine HTML-Datei ein?",
        "answer_1": "style src='style.css'",
        "answer_2": "link rel='stylesheet' href='style.css'",
        "answer_3": "stylesheet>style.css</stylesheet",
        "answer_4": "css href='style.css'",
        "right_answer": 1
    },
];

let currentQuestion = 0;
let rightQuestions = 0;
let audio_sucsess = new Audio('audio/right.mp3');
let audio_fail = new Audio('audio/wrong.mp3');


function init() {
    showQuestion();
}

function showQuestion() {
    let question = quizzQuestions[currentQuestion];

    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let question = quizzQuestions[currentQuestion++];  // holt die erste Variabele aus dem Jason.
    console.log("Selection answer is " + selection); // selection ist die angelickte antwort
    let selectedQuestionNumber = selection.slice(-1); // holt den letzden Buchstaben wer aus dem text in HTML.
    // console.log('selectedQuestionNumber is ', selectedQuestionNumber); // hier wird der letzde Buchstabe angezeigt
    // console.log('Current question is', question['right_answer']); // zeigt an welche antwort richtig ist
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { // hier wird der angeklickte  letzde Buchstabe  verglichen mit dem string in jason
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');// ändert die farbe des buttons nachdem eine antwort angeklickt wurde.
        rightQuestions++;
        audio_sucsess.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger'); //Falsche Antwort anzeigen
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); //zeigt die richtige antwort an
        audio_fail.play();
    }
    document.getElementById('next-button').disabled = false;
    document.getElementById('remove-button').disabled = false;

}

function nextQuestion() {
    if (currentQuestion >= quizzQuestions.length) {
        showEndScreen();
    } else { // Show question
        percentBar();

        currentQuestion++;  // z.b von 0 auf 1
        document.getElementById('next-button').disabled = true;
        document.getElementById('remove-button').disabled = true;
        resetClassListAnswer();
        showQuestion();
    }
}

function percentBar() {
    let percent = (currentQuestion + 1) / quizzQuestions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progressBar').innerHTML = `${percent}%`;
    document.getElementById('progressBar').style = `width:${percent}%;`;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';

    document.getElementById('amaountOfQuestions').innerHTML = quizzQuestions.length;
    document.getElementById('rightQuestion').innerHTML = rightQuestions;
}

function removeQuestion() {
    currentQuestion--;
    showQuestion();
}

function resetClassListAnswer() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {

    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
    currentQuestion = 0;
    rightQuestions = 0;
    init();

}