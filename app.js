let questions = [
    {
        id: 1607227675486,
        question: 'Cuánto es 1 + 1',
        options: ['2', '4','8'],
        answer: '1'
    },
    {
        id:1607227694378,
        question: 'Cuánto es 3 * 2',
        options: ['2', '6','3'],
        answer: '2'
    },
    {
        id:1607227708277,
        question: 'Mi lenguaje favorito es..',
        options: ['Javascript', '<3','IDK'],
        answer: '1'
    }
]
const homeContainer =document.getElementById('homeContainer')

const btnStart = document.getElementById('btnStart')
const quizContainer = document.getElementById('quiz')
const quizQuestion = document.getElementById('quizQuestion')
const quizOptions = document.getElementById('quizOptions')
const counterContainer = document.getElementById('counterContainer')
const scoreContainer = document.getElementById('scoreContainer')
const progressBar = document.getElementById('progressBar')
const templateOption = document.getElementById('templateOption').content
const templateFeedback = document.getElementById('templateFeedback').content
let score = 0
let questionCounter = 0
const questionsLength = questions.length
let avalibleQuestions = []
let currentQuestion = {}
let isAvalibleQuestion = false
btnStart.addEventListener('click', ()=>{
    hideHome()
    startGame()
})
const startGame = function(){
    avalibleQuestions = [...questions]
    getQuestion()
}
const getQuestion = function(){
    if (avalibleQuestions.length === 0) {
        localStorage.setItem('SCORE', score)
        window.location.href = 'end.html'
    }
    questionCounter++
    counterContainer.textContent = `${questionCounter}/${questionsLength}`  
    progressBar.style.width =  `${(questionCounter / questionsLength * 100)}%` 
    quizOptions.innerHTML = ''
    const randomIndexQuestion = Math.floor(Math.random() * avalibleQuestions.length)
    currentQuestion = avalibleQuestions[randomIndexQuestion]

    quizQuestion.textContent = currentQuestion.question
    currentQuestion.options.forEach((option, i) => {
        i++ 
        const number = i
        const clone = templateOption.cloneNode(true)
        const input = clone.querySelector('input')
        const label = clone.querySelector('label')
        input.id = `option${currentQuestion.id}${number}`
        input.name = `question${currentQuestion.id}` 
        input.value = number
        input.addEventListener('change', selectAnswer)

        label.textContent = option
        label.setAttribute('for', `option${currentQuestion.id}${number}`)
        quizOptions.appendChild(clone)
    });
    avalibleQuestions.splice(randomIndexQuestion, 1)
    isAvalibleQuestion = true
}
const selectAnswer = function(e){
    if (!isAvalibleQuestion) {
        return
    }
    isAvalibleQuestion = false
    const selected = e.target
    const correct = currentQuestion.answer

    const currentQuestionId = 'question'+ currentQuestion.id
    const allCurrentOptions = document.querySelectorAll(`input[name=${currentQuestionId}]`)
    allCurrentOptions.forEach(radio => radio.disabled = true)

    const node = templateFeedback.cloneNode(true)
    const feedbackTextContainer = node.querySelector('p')

    const feedback = selected.value === correct ? 'correct' : 'incorrect'
    if (feedback === 'correct') {
        incrementScore()

    }
    node.querySelector('.quiz__feedback-answers').classList.add(feedback)
    feedbackTextContainer.textContent = feedback + '!'
    quizContainer.appendChild(node)
    
    setTimeout(()=>{
        document.getElementById('feedbackContainer').remove()
        getQuestion()
    }, 1000)
    
}
const incrementScore = function(){
     score += 100
     scoreContainer.textContent = score
}
const hideHome = function(){
    homeContainer.classList.add('hide')
    quizContainer.classList.remove('hide')
}
function createPlayerForm(){
    const form = document.createElement('form')
    form.setAttribute('id', 'formPlayer')
    const input = document.createElement('input')
    input.classList.add('input')
    input.setAttribute('name', 'playerName')
    input.setAttribute('placeholder', 'Ingresa tu nombre')
    
    form.appendChild(input)
    const h1 = document.createElement('h1')
    h1.textContent = '¿Cuál es tu nombre?'
    quizContainer.appendChild(h1)
    quizContainer.appendChild(form)
}
function clean(){
    appContainer.innerHTML = ''
}