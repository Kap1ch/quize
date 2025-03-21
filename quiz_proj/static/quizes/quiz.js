console.log('hello quiz')

const url = window.location.href

const quizBox = document.getElementById('quiz-box')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')
const timerBox = document.getElementById('timer-box')


const activateTimer = (time) => {

	if (time.toString().length < 2) {
		timerBox.innerHTML = `<b>0${time}:00</b>`
	} else {
		timerBox.innerHTML = `<b>${time}:00</b>`
	}

	let minutes = time - 1
	let seconds = 60
	let displaySeconds
	let displayMitutes

	const timer = setInterval(()=>{
		seconds --
		if (seconds < 0){
			seconds = 59
			minutes --
		}
		if (minutes.toString().length < 2){
			displayMitutes = '0' + minutes
		} else {
			displayMitutes = minutes
		}
		if (seconds.toString().length < 2){
			displaySeconds = '0' + seconds
		} else  {
			displaySeconds = seconds
		}
		if (minutes === 0 && seconds === 0){
			timerBox.innerHTML = "<b>00:00</b>"
			setTimeout(()=>{
				clearInterval(timer)
				alert('Time over')
				sendData()
			}, 500)

		}


		timerBox.innerHTML = `<b>${displayMitutes}:${displaySeconds}</b>`
	}, 1000)
}


//$.ajax({
//    type: 'GET',
//    url: `${url}data`,
//    success: function(response) {
//        const data = response.data;
//        let htmlContent = '';  // Буфер для HTML-контента
//
//        data.forEach(el => {
//            for (const question in el) {
//                const answers = el[question];
//
//                // Добавляем вопрос в буфер
//                htmlContent += `
//                    <hr>
//                    <div class="mb-2">
//                        <b>${question}</b>
//                    </div>
//                `;
//
//                // Добавляем ответы в буфер
//                answers.forEach(answer => {
//                    htmlContent += `
//                        <div>
//                            <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
//                            <label for="${question}-${answer}">${answer}</label>
//                        </div>
//                    `;
//                });
//            }
//        });
//
//        quizBox.innerHTML = htmlContent;  // Устанавливаем весь HTML-контент за один раз
//        activateTimer(response.time);
//    },
//    error: function(error) {
//        console.log(error);
//    }
//});
//
//

//$.ajax({
//    type: 'GET',
//    url: `${url}data`,
//    success: function(response) {
//        const data = response.data;
////		console.log(data)
//        quizBox.innerHTML = '';  // Очищаем контейнер перед добавлением вопросов
//
//        data.forEach(el => {
////            for (const questionText in el) {
//                const answers = el['answers'];
//				console.log(answers)
//                // Вставляем вопрос
//                const questionContainer = document.createElement('div');
//                questionContainer.classList.add('question-container');
//
//                // Добавляем HTML для текста вопроса
//                questionContainer.innerHTML = `
//                    <div class="mb-2">
//                        <b>${el['question_text']}</b>
//                    </div>
//                    <hr>
//                `;
//
//                // Контейнер для ответов
//                const answersContainer = document.createElement('div');
//                answersContainer.classList.add('answers');
////                answersContainer.dataset.question = questionText;
//
//                // Добавляем каждый ответ
//                answers.forEach(answerObj => {
//                    const answerText = answerObj.text;
//                    const isCorrect = answerObj.correct;  // Предполагается, что в ответе есть флаг "correct"
//
//                    // Создаем HTML для каждого ответа
//                    const answerDiv = document.createElement('div');
//                    answerDiv.classList.add('answer');
//                    answerDiv.dataset.correct = isCorrect;  // Сохраняем правильность ответа в атрибуте
//                    answerDiv.textContent = answerText;
//
//                    // Добавляем обработчик для клика по ответу
//                    answerDiv.addEventListener('click', function() {
//                        // Убираем классы "correct" и "incorrect" у всех ответов текущего вопроса
//                        Array.from(answersContainer.children).forEach(ans => ans.classList.remove('correct', 'incorrect'));
//
//                        // Добавляем нужный класс в зависимости от правильности ответа
//                        if (answerDiv.dataset.correct === "true") {
//                            answerDiv.classList.add('correct');
//							cosole.log(scoreBox)
//                        } else {
//                            answerDiv.classList.add('incorrect');
//                            // Подсвечиваем правильный ответ, если выбрали неверный
//                            Array.from(answersContainer.children).forEach(ans => {
//                                if (ans.dataset.correct === "true") {
//                                    ans.classList.add('correct');
//                                }
//                            });
//                        }
//                    });
//
//                    // Добавляем ответ в контейнер ответов
//                    answersContainer.appendChild(answerDiv);
//                });
//
//                // Добавляем контейнер с вопросом и ответами в основное поле
//                questionContainer.appendChild(answersContainer);
//                quizBox.appendChild(questionContainer);
////            }
//        });
//
//        activateTimer(response.time);
//    },
//    error: function(error) {
//        console.log(error);
//    }
//});
//
///////////////////////////////////////////////////////////////
//const quizForm = document.getElementById('quiz-form')
//const csrf = document.getElementsByName('csrfmiddlewaretoken')
//
//const sendData = () => {
//	const elements = [...document.getElementsByClassName('ans')]
//	const data = {}
//	data['csrfmiddlewaretoken'] = csrf[0].value
//	elements.forEach(el =>{
//		if (el.checked) {
//			data[el.name]= el.value
//		} else{
//			if(!data[el.name]){
//				data[el.name] = null
//			}
//		}
//	})
//
//	$.ajax({
//		type:'POST',
//		url: `${url}save/`,
//		data: data,
//		success:function(response){
//			// console.log(response)
//			const results = response.results
////			console.log(results)
//			quizForm.classList.add('not-visible')
//
//			scoreBox.innerHTML = `${response.passed ? 'Congratulations! ' : 'Ups..:('}Your result is ${response.score.toFixed(2)}`
//
//
//			results.forEach(res=>{
//				const resDiv = document.createElement("div")
//				for (const [question, resp] of Object.entries(res)){
//					// console.log(question)
//					// console.log(resp)
//					// console.log('******')
//
//					resDiv.innerHTML += question
//					const cls = ['container', 'p-3', 'text-light', 'h6']
//					resDiv.classList.add(...cls)
//
//					if (resp=='not answered'){
//						resDiv.innerHTML += '- not answered'
//						resDiv.classList.add('bg-danger')
//					}
//					else{
//						const answer  = resp['answered']
//						const correct = resp['correct_answer']
//
//						if (answer == correct){
//							resDiv.classList.add('bg-success')
//							resDiv.innerHTML += ` answered: ${answer}`
//						} else {
//							resDiv.classList.add('bg-danger')
//							resDiv.innerHTML += ` | correct answer: ${correct}`
//							resDiv.innerHTML += ` | answered: ${answer}`
//						}
//
//					}
//
//				}
//				// const body = document.getElementsByTagName('BODY')[0]
//				resultBox.append(resDiv)
//			})
//		},
//		error: function(error){
//			console.log(error)
//		}
//
//	})
//}
//
//
//quizForm.addEventListener('submit', e=>{
//	e.preventDefault()
//
//	sendData()
//
//})


/////////////

let correctAnswersCount = 0; // Количество правильных ответов
let totalQuestionsCount = 0;  // Общее количество вопросов
console.log('hello quiz')

$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function(response) {
        const data = response.data;
        console.log('hello quiz')
        console.log(response)

        quizBox.innerHTML = '';  // Очищаем контейнер перед добавлением вопросов

        totalQuestionsCount = data.length; // Обновляем общее количество вопросов

        data.forEach(el => {
            const answers = el['answers'];
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('question-container');

            questionContainer.innerHTML = `
                <div class="mb-2">
                    <b>${el['question_text']}</b>
                </div>
                <hr>
            `;

            const answersContainer = document.createElement('div');
            answersContainer.classList.add('answers');

            answers.forEach(answerObj => {
                const answerText = answerObj.text;
                const isCorrect = answerObj.correct;

                const answerDiv = document.createElement('div');
                answerDiv.classList.add('answer');
                answerDiv.dataset.correct = isCorrect;
                answerDiv.textContent = answerText;

                answerDiv.addEventListener('click', function() {
                    // Если уже был выбран ответ, не делаем ничего
                    if (answersContainer.querySelector('.selected')) return;

                    // Удаляем классы 'correct' и 'incorrect' у всех ответов
                    Array.from(answersContainer.children).forEach(ans => ans.classList.remove('correct', 'incorrect'));

                    // Отмечаем выбранный ответ
                    answerDiv.classList.add('selected');

                    if (answerDiv.dataset.correct === "true") {
                        answerDiv.classList.add('correct');
                        correctAnswersCount++; // Увеличиваем счетчик правильных ответов
                    } else {
                        answerDiv.classList.add('incorrect');
                        // Показываем правильный ответ
                        Array.from(answersContainer.children).forEach(ans => {
                            if (ans.dataset.correct === "true") {
                                ans.classList.add('correct');
                            }
                        });
                    }
                });

                answersContainer.appendChild(answerDiv);
            });

            questionContainer.appendChild(answersContainer);
            quizBox.appendChild(questionContainer);
        });

        activateTimer(response.time);
    },
    error: function(error) {
        console.log(error);
    }
});

// Обработка отправки формы
document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем обычное поведение отправки формы

    const percentage = (correctAnswersCount / totalQuestionsCount) * 100; // Подсчет процента правильных ответов

    // Обновление содержимого score-box и result-box
    document.getElementById('score-box').textContent = `Кількість правильних відповідей: ${correctAnswersCount} з ${totalQuestionsCount}`;
    document.getElementById('result-box').innerHTML = `
        <p>Відсоток правильних відповідей: ${percentage.toFixed(2)}% correct!</p>
        <a href="${document.getElementById('back-button').getAttribute('data-url')}" class="btn btn-danger">Назад</a>
    `;
    // Здесь вы можете добавить логику для отправки результатов на сервер, если необходимо
});

