const body = document.querySelector("body");
const column = document.querySelector(".matrix-column");
const letter = document.querySelector(".matrix-element");

const randomLetters = [];
for (let i = 32; i < 127; i++) randomLetters.push(String.fromCharCode(i));

const mainColor = "#020202";
const codeColor = "#16db65";

// Возвращает максимальную вместимость колонок на данный момент
function getColumnCapacity() {
  const columnWidth = window.getComputedStyle(column).getPropertyValue("width");
  const screenWidth = window.innerWidth;
  return Math.floor(screenWidth / parseInt(columnWidth));
}

// Возвращает максимальную вместимость символов на данный момент
function getLetterCapacity() {
  const letterHeight = window.getComputedStyle(letter).getPropertyValue("height");
  const screenHeight = window.innerHeight;
  return Math.floor(screenHeight / parseInt(letterHeight));
}

// Возвращает true если есть место для колонок
function notEnoughColumns() {
  return getColumnCapacity() > body.children.length;
}

// Возвращает true если колонок слишком много
function tooMuchColumns() {
  return getColumnCapacity() < body.children.length;
}

// Рендеринг колонок
function renderColumns() {
  while (notEnoughColumns()) {
    const newColumn = document.createElement("div");
    newColumn.classList.add("matrix-column");
    // body.appendChild(newColumn);
    body.insertBefore(newColumn, body.lastElementChild);
  }
  while (tooMuchColumns()) {
    body.removeChild(body.lastElementChild.previousElementSibling);
  }
}

// Возвращает true если есть место для символов
function notEnoughLetters(column) {
  return getLetterCapacity() > column.children.length;
}

// Возвращает true если символов слишком много
function tooMuchLetters(column) {
  return getLetterCapacity() < column.children.length;
}

// Рендеринг символов
function renderLetters() {
  for (const column of body.children) {
    while (notEnoughLetters(column)) {
      const newLetter = document.createElement("p");
      newLetter.classList.add("matrix-element");
      const randomIndex = Math.round(Math.random() * (randomLetters.length - 1));
      newLetter.innerText = randomLetters[randomIndex];
      column.appendChild(newLetter);
    }
    while (tooMuchLetters(column)) {
      column.removeChild(column.lastElementChild);
    }
  }
}

function animateColumn(column) {
  const standart = 50;
  let addition = 0;
  for (const letter of column.children) {
    setTimeout(() => {
      letter.style.color = codeColor;
    }, standart + addition);
    setTimeout(() => {
      letter.style.color = mainColor;
    }, (standart * 5) + addition);
    addition += 50;
  }
}

function animate() {
  const columns = body.children;
  const randomIndex = Math.round(Math.random() * +String(columns.length - 2));
  animateColumn(columns[randomIndex]);
}

// Функция рендеринга
function render(event, timerId) {
  renderColumns();
  renderLetters();
  clearInterval(timerId);
  return setInterval(animate, 50);
}


// Первоначальный рендер
let timerId = render();
window.addEventListener("resize", () => timerId = render(null, timerId));