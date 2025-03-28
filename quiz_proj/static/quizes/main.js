console.log('hello')

const modalBtns = [...document.getElementsByClassName('modal-button')]
const modalBody = document.getElementById('modal-body-confirm')
const startBtn = document.getElementById('start-button')

const url = window.location.href

modalBtns.forEach(modalBtn=> modalBtn.addEventListener('click', ()=>{
    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-quiz')
    const numQuestions = modalBtn.getAttribute('data-questions')
    const difficulty = modalBtn.getAttribute('data-difficulty')
    const scoreToPass = modalBtn.getAttribute('data-pass')
    const time = modalBtn.getAttribute('data-time')
//    console.log(pk)
    modalBody.innerHTML = `
        <div class="h5 mb-3">Ви впевнені що хочете почати тест " <b>${name}</b>?</div>
        <div class="text-muted">
            <ul>
                <li>Складність: <b>${difficulty}</b></li>
                <li>Кількість питань: <b>${numQuestions}</b></li>
                <li>Прохідний відсоток: <b>${scoreToPass}%</b></li>
                <li>Час: <b>${time} хв</b></li>
            </ul>
    `

    startBtn.addEventListener('click', ()=>{
        window.location.href = url + pk

    })

}))
