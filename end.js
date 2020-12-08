const inputUserName = document.getElementById('userName')
const formUser = document.getElementById('formUser')
const btnScore = document.getElementById('btnScore')
const templateHighscores = document.getElementById('templateHighscores').content
const highscoresContainer = document.getElementById('highscoresContainer')

const scoreContainer = document.getElementById('scoreContainer')
scoreContainer.innerText = localStorage.getItem('SCORE')

const currentScore = localStorage.getItem('SCORE')
const highscores = JSON.parse(localStorage.getItem('HIGHSCORES')) || []
formUser.addEventListener('submit', function(e){
    e.preventDefault()
    if (!inputUserName.value) {
        alert('Ingresa un nombre válido :)')
        return
    }
    const user = {
        name: inputUserName.value,
        score: currentScore
    }
    highscores.push(user)
    highscores.sort((a,b) => b.score - a.score)
    highscores.splice(5)
    btnScore.disabled = true
    localStorage.setItem('HIGHSCORES', JSON.stringify(highscores))
    showHighscores()
    
})
const showHighscores = function(){
  highscoresContainer.innerHTML = ''
  highscores.forEach((highscore)=>{
      const clone = templateHighscores.cloneNode(true)
      const li = clone.querySelector('.list-item')
      li.textContent = `${highscore.name} - ${highscore.score}`
      highscoresContainer.appendChild(clone)
  })
}
