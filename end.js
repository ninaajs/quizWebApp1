const inputUserName = document.getElementById('userName')
const formUser = document.getElementById('formUser')
const btnScore = document.getElementById('btnScore')
const scoreContainer = document.getElementById('scoreContainer')
scoreContainer.innerText = localStorage.getItem('SCORE')
formUser.addEventListener('submit', function(e){
    e.preventDefault()
    localStorage.setItem('USERNAME', inputUserName.value)
    window.location.href = 'highscore.html'
})
inputUserName.addEventListener("keyup", function(e) {

  });
