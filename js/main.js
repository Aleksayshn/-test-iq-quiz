const burger = document.querySelector('#burger')
const menu = document.querySelector('#menu')
const header = document.querySelector('#header')
const menuLink = document.querySelectorAll('.menu__link')
const btnsStartTesting = document.querySelectorAll('.start-test')
const main = document.querySelector('.main')
const mainWrapper = document.querySelector('.main__wrapper')
const footer = document.querySelector('.footer')
const headerImg = document.querySelector('.header__img')
const headerText = document.querySelector('.header__text')
const btnHome = document.querySelector('#btnHome')

// menu
burger.addEventListener('click', () => {
  header.classList.toggle('active')
})

menu.addEventListener('click', () => {
  header.classList.toggle('active')
  mainWrapper.style.display = 'block'
  footer.style.display = 'block'
})

btnHome.addEventListener('click', () => {
  mainWrapper.style.display = 'block'
  footer.style.display = 'block'
})


// Отрисовка страницы, после клика на Далее
btnsStartTesting.forEach (btn => {
  btn.addEventListener('click', () => {
    mainWrapper.style.display = 'none'
    footer.style.display = 'none'
    headerImg.style.display = 'block'
    headerText.style.display = 'block'

    createTestingWrapper()
    createTestingPage()
    clickTestingBtn()
    chekStatusTestingBtn()
  })
})

// Создание обертки для вопросов
const createTestingWrapper = () => {
  const testingWrapper = document.createElement('div')
  testingWrapper.className = 'testing container'
  main.appendChild(testingWrapper)
  testingWrapper.innerHTML = `
  <div class="progressbar">
    <div class="progressbar__line"></div>
  </div>
  <div class="testing__info">
    <h2 class="testing__title"></h2>
    <form id="questions" action="#"></form>
  </div>
  <button class="testing__btn btn" type="button" disabled>next</button>
  `
}

// Создание вопросов
const createTestingPage = (index = 0, width) => {
  const progressbarLine = document.querySelector('.progressbar__line')
  const testingIinfo = document.querySelector('.testing__info')
  const questionsItems = document.querySelector('#questions')
  const testingTitle = document.querySelector('.testing__title')
  const testingBtn = document.querySelector('.testing__btn')

  if(index < questions.length) {
    progressbarLine.style.width = `${width}%`
    const answers = questions[index].answers
    const type = questions[index].type
    testingTitle.innerHTML = questions[index].title
    questionsItems.innerHTML = ''
    
    // Создание вопросов, если текстовые
    if(type === 'text') {
      questionsItems.classList = 'questions questions-text'
      answers.forEach(item => {
        const newQuestion = document.createElement('div')
        newQuestion.classList = 'questions__item'
        newQuestion.innerHTML = `
        <input class="testing__input" type="radio" placeholder="${item.text}" id="${item.id}" name="radio">
        <label class="testing__label" for="${item.id}">${item.text}</label>
        `
        questionsItems.appendChild(newQuestion)
        if(item.text.length > 20) {
          const questionsItem = document.querySelectorAll('.questions__item')
          questionsItem.forEach(item => {
            item.style.height = '78px'
          })
        }
      })

    }
    
    // Создание вопросов, если выбор цвета
     else if(type === 'color') {
      questionsItems.classList = 'questions questions-color'

      answers.forEach(item => {
      const newQuestion = document.createElement('div')
      newQuestion.classList = 'questions__item'
      newQuestion.innerHTML = `
      <input class="testing__input" type="radio" placeholder="" id="${item.id}" name="radio">
      <label class="testing__label" for="${item.id}" style="background-color: #${item.text};"></label>
      `
      questionsItems.appendChild(newQuestion)
      })
      
    }

    // Создание вопросов, если картинка с номерами
    else if(type === 'imageNumber') {
      questionsItems.classList = 'questions questions-image questions-image-number'
      const imgQuestion = document.createElement('img')
      const url = questions[index].url
      imgQuestion.classList = 'questions__img'
      imgQuestion.src = `images/${url}`
      const newQuestionWrapper = document.createElement('div')
      newQuestionWrapper.classList = 'questions__wrapper'
      questionsItems.appendChild(imgQuestion)
      questionsItems.appendChild(newQuestionWrapper)
      answers.forEach(item => {
      const newQuestion = document.createElement('div')
      newQuestion.classList = 'questions__item'
      newQuestion.innerHTML = `
      <input class="testing__input" type="radio" placeholder="" id="${item.id}" name="radio">
      <label class="testing__label" for="${item.id}">${item.text}</label>
      `
      newQuestionWrapper.appendChild(newQuestion)
      })
    }

    // Создание вопросов, если картинка с текстом
    else if(type === 'imagetext') {
      questionsItems.classList = 'questions questions-image questions-image-text'
      const imgQuestion = document.createElement('img')
      const url = questions[index].url
      imgQuestion.classList = 'questions__img'
      imgQuestion.src = `images/${url}`
      const newQuestionWrapper = document.createElement('div')
      newQuestionWrapper.classList = 'questions__wrapper'
      questionsItems.appendChild(imgQuestion)
      questionsItems.appendChild(newQuestionWrapper)
      answers.forEach(item => {
      const newQuestion = document.createElement('div')
      newQuestion.classList = 'questions__item'
      newQuestion.innerHTML = `
      <input class="testing__input" type="radio" placeholder="" id="${item.id}" name="radio">
      <label class="testing__label" for="${item.id}">${item.text}</label>
      `
      newQuestionWrapper.appendChild(newQuestion)
      })
      
    }
  } else {
    testingBtn.style.display = 'none'
    testingTitle.innerHTML = 'processing results'
    testingTitle.className = 'testingTitle'
    progressbarLine.style.width = `100%`
    questionsItems.classList = 'end'
    questionsItems.innerHTML = `<img class="end__img" src="images/load.svg" alt="Loading...">
    <p class="end__text">Determination of thinking style...........
      .......................................................</p>`

    function endTest () {
      const testingWrapper = document.querySelector('.testing')
      testingIinfo.style.flex = '0 0 auto'
      headerText.innerHTML = 'Done'
      headerText.style.fontSize = '20px'
      headerText.style.paddingLeft = '10px'
      testingWrapper.classList.add('end-page')
      testingWrapper.innerHTML = `
      <h2 class="end-page__tltle">Your result is ready:</h2> 
      <p class="end-page__subtltle"> 
      <span>You are among the 3%</span> of respondents whose intelligence level differs from the average by more than 15 points in either direction! </p> 
      <h3 class="end-page__motivation">Get your result now!</h3> 
      <p class="end-page__info"> In order to protect personal data, the test results, their detailed interpretation and recommendations are available as a voice message by calling from your mobile phone </p> <p class="end-page__call"> Call now, the recording is only available for </p> 
      <div class="end-page__time"> <span class="end-page__minutes">10</span>:<span class="end-page__seconds">00</span> minutes </div> <a class="end-page__link" href="tel:+79119999999">Call and listen to your result</a>`

      const declaration = document.createElement('div')
      declaration.classList = 'declaration'
      declaration.innerHTML = 'TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA LUI DECLARATI CA AVETI 18 ANI IMPLINITI, Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, repellendus accusamus minima iure fugiat quos ea laborum quam tenetur dicta possimus assumenda ut! Ut, voluptate soluta minima nesciunt aspernatur magni!'

      main.insertAdjacentElement('beforeend', declaration)
      runTimer()
      test()
    }
    setTimeout(endTest, 2500)
  }
}

const test = () => {
  const endPageLink = document.querySelector('.end-page__link')
  const endPage = document.querySelector('.end-page')

  const test2 = (name, height, weight, eyes, color) => {
    const createData = document.createElement('div')
    createData.classList = 'data'
    createData.innerHTML = `
    <h3 class="data__title">Congratulations! You are as smart as: ${name}</h3> 
    <p>You can compare your parameters with theirs:</p> 
    <ul class="data__list">
    <li class="data__item data__item--height">Height: ${height}</li> 
    <li class="data__item data__item--weight">Weight: ${weight}</li> 
    <li class="data__item data__item--eyes">Eyes: ${eyes}</li> 
    <li class="data__item data__item--color">Hair color: ${color}</li> 
    </ul> 
    <button class="result__btn btn" type="button">Take the test again</button>
    `
    endPage.append(createData)
    const restartBtn = document.querySelector('.result__btn')
    restartBtn.addEventListener('click', () => {
      location.reload()
    })
  }
  
  
  endPageLink.addEventListener('click', async (e) => {
    e.preventDefault()
    const URL_PEOPLE = 'https://swapi.dev/api/people/1'
    try {
      const response = await fetch(URL_PEOPLE)
      if (!response.ok) {
        throw new Error('Ошибка в запросе')
      }
      const people = await response.json()
      test2(people.name, people.height, people.mass, people.eye_color, people.hair_color)
      endPage.style.height = '100%'
    } catch (error) {
      console.log(error)
    }
  })
}
  const runTimer = () => {
    const minutesItem = document.querySelector('.end-page__minutes')
    const secondsItem = document.querySelector('.end-page__seconds')
    const newTime = Date.now() + 600000
    function timer() {
      const nowTime = Date.now()
      let time = newTime - nowTime
      const minutes = Math.floor(time / 1000 / 60 % 60)
      const seconds = Math.floor(time / 1000 % 60)

      if (seconds >= 10) {
        secondsItem.innerHTML = seconds
      } else {
        secondsItem.innerHTML = `0${seconds}`
      }
      if (minutes >= 10) {
        minutesItem.innerHTML = minutes
      } else {
        minutesItem.innerHTML = `0${minutes}`
      }
    }
    timer()
    setInterval(timer, 1000)
  }


  // счетчики при клике на кнопку Далее
  const clickTestingBtn = () => {
    const testingBtn = document.querySelector('.testing__btn')
  
    let i = 0
    let progressbarLineWidth = 5
    testingBtn.addEventListener('click', () => {
      i++
      const changePercent = 100 / (questions.length + 1)
      progressbarLineWidth += changePercent
      createTestingPage(i, progressbarLineWidth)
    })
  }

  // Проверка на checked
  const chekStatusTestingBtn = () => {
    const testingBtn = document.querySelector('.testing__btn')
    const testingQuestions = document.querySelector('.questions')
    const testingInputs = document.querySelectorAll('.testing__input')
    const questionsImg = document.querySelectorAll('.questions__img')
  
    testingQuestions.addEventListener('click', (e) => {
      const isImg = e.target === questionsImg[0]
      if (!isImg) {
        testingInputs.forEach(item => {
          if (item.checked) {
            testingBtn.removeAttribute("disabled");
          }
        })
      }
    })
  }

