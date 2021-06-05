/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
let container = null; // Контейнер в которой будет хранится структура DOM-элементов
let prevElement = null; // Предыдущий элемент(нужен для функции handler для отмены оформления)

let creatContainer = function() { // Функция для создания container
  /* Document конструктор создаёт новый Document объект, который является веб-страницей, загруженной в браузере  и служит точкой входа в содержание страницы. */
  let div = document.createElement('div'); // Создаем тэг "div"
  div.setAttribute('class', 'carousel'); // Добавляем атрибут class = "carousel"
  div.setAttribute('id', 'carousel'); // Добавляем идентификатор id = "carousel"

  document.querySelector('body').appendChild(div); // document.querySelector('body') - берем body и добавляем (appendChild(div)) туда созданный нами тэг "div"
  return container = document.querySelector('#carousel'); // Присваиваем переменной container тег с идентивикатором #carousel
};

let creatSlides = function(count) { // Функция для создания slides принимает значение count
  let slide = document.createElement('ul'); // Создаем тег "ul" и присваиваем его переменной slide
  slide.setAttribute('class', 'slides'); // Добавляем тэгу "ul" атрибут class = "slides"
  for (let i = 0; i < count; i++) { // Создаем цикл который итерирует тэги внутри ul до значения count
    let slideItem = document.createElement('li'); // Создаем тэг "li" и присваиваем его переменной slideItem
    let slideLink = document.createElement('a'); // Создаем тэг "a" и присваиваем его переменной slideLink
    slideItem.setAttribute('class', i === 0 ? 'slides__item active' : 'slides__item'); // первому тэгу "li" добавлем атрибут class = "slides__item active", остальным class = "slides__item"
    slideLink.setAttribute('href', '#'); // тэгу "a" добавлем атрибут href = #

    slideItem.appendChild(slideLink); // Добавляем тэги "a"(slideLink) в тэги "li"(slideItem)
    slide.appendChild(slideItem); // Добавляем тэги "li"(slideItem) в тэги "ul"(slide)
  };

  container.appendChild(slide); // Добавляем список в container
};

function creatIndicators(count) { // Функция для создания indicators принимает значение count
  let div = document.createElement('div'); // Создаем тэг div
  div.setAttribute('class', 'indicators'); // Добавляем ему атрибут class = "indicators"
  for (let i = 0; i < count; i++) { // Создаем цикл который итерирует тэги "span" внутри "div" до значения count
    let span = document.createElement('span'); // Создаем тег "span" и присваиваем его переменной span
    span.setAttribute('class', i === 0 ? 'indicators__item active' : 'indicators__item'); // первому тэгу "span" добавлем атрибут class = "indicators__item active", остальным class = "indicators__item"
    span.setAttribute('data-slide-to', i); // Добавляем еще один атрибут "data-slide-to" c значениями от 0 до count
    div.appendChild(span); // Добавляем тэг "span" в тег "div"
  };

  container.appendChild(div); // Добавляем тэг "div" в container
};

function creatControls() { // Функция для создания controls

  let div = document.createElement('div'); // Создаем тэг "div" и присваиваем его переменной div
  div.setAttribute('class', 'controls'); // Добавляем атрибут class = "controls"

  for (let i = 0; i < 3; i++) { // Создаем цикл который итерирует тэги "div" внутри "div.controls"
    let divControls = document.createElement('div'); // Добавляем тэг "div" и присваиваем его переменной divControls
    divControls.setAttribute('class', 'controls__item'); // Длбавляем атрибут clas = "controls__item"

    let icon = document.createElement('i'); // Добавляем тэг "i" и присваиваем переменной icon
    icon.setAttribute('class', 'fas'); // Добавляем атрибут class = "fas"
    switch (i) { // Создаем цикл при котором будет добавлятся дополнительный класс в тэги "div" и "i"
      case 0:
        divControls.classList.add('controls__prev'); // Первый тэг "div" получит класс "controls__prev"
        icon.classList.add('fa-chevron-left'); // Первый тэг "i" получит класс "fa-chevron-left"
        break;
      case 1:
        divControls.classList.add('controls__next'); // Второй тэг "div" получит класс "controls__next"
        icon.classList.add('fa-chevron-right'); // Второй тэг "i" получит класс "fa-chevron-left"
        break;
      default:
        divControls.classList.add('controls__pause'); // Третий тэг "div" получит класс "controls__ause"
        icon.classList.add('fa-play'); // Третий тэг "i" получит класс "fa-chevron-left"
    };
    divControls.appendChild(icon); // Добавляем тэг "i" в тэг "div.controls__item"
    div.appendChild(divControls); // Добавляем тэг "div.controls__item" в тэг "div.controls"
  };
  container.appendChild(div); // Добавляем тэг "div.controls" в container
};

function creatStyle() { // Создаем функцию для добавления стилей
  let styleContainer = document.createElement('style'); // Добавляем тэг "style" и присваиваем его переменной styleContainer
  /* Добавляем переменную styleCode куда записываем стили для созданной расметки */
  let styleCode = `
  .carousel {
  max-width: 1340px;
  margin-left: auto;
  margin-right: auto;
}
.controls,
.slides {
position: relative;
}
.indicators {
display: flex;
justify-content: center;
}
.indicators__item {
  display: block;
  width: 40px;
  height: 40px;
  background: blue;
  margin: 5px;
}
`;
  styleContainer.innerHTML = styleCode; // Добавляем в html разметку тэга "style" прописанные нами стили(styleCode)
  container.appendChild(styleContainer); // Добавляем тэг "style" в container
};

function handler(event) { // Создаем функцию, которая будет менять стиль и которая принимает параметр event(событие)
  let target = event.target; // Присваиваем переменной "target" элемент "event.target", который покажет на каком именно потомке произошло событие(span.indicators__item)
  // console.log(event);
  /* Обрабатываем событие */
  if (target.classList.contains('indicators__item')) { // "classList" - свойство которое содержит все классы элемента, "contains" - метод свойсва "classList", который проверяет, есть ли данный класс у элемента (вернет true или false).
    target.style.backgroundColor = 'red'; // если у элемента на котором произошло событие класс "indicators__item" тогда меняем у элемента стиль(style) на "backgroundColor = 'red'"
  };

  if (prevElement /* !== null */ ) { // если "prevElement" не null тогда выполняем условие
    prevElement.removeAttribute('style'); // удаляем у предыдущего элемента(prevElement) стиль(removeAttribute('style'))
  };
  prevElement = target; // Присваиваем предыдущему элементу(prevElement) с новым стилем элемент target
};

function eventIndicators() { // Функция события
  let indicators = document.querySelector('div.indicators'); // Берем элемент "div" с классом "indicators" и присваиваем переменой indicators

  indicators.addEventListener('click', handler); // Назначаем переменной indicators обработчик события "addEventListener" с именем - 'click', ссылка на функцию - "handler", которую надо поставить обработчиком
};

function createCarousel(slidesCount) { // Функция которая построит заданную структуру DOM-элементов
  // creatContainer();
  container = document.querySelector('#carousel');
  creatSlides(slidesCount); // Вызываем функцию creatSlides()
  creatIndicators(slidesCount); // Вызываем функцию creatIndicators()
  creatControls(); // Вызываем функцию creatControls()
  creatStyle(); // Вызываем функцию creatStyle()
  eventIndicators(); // Вызываем функцию eventIndicators()
};

createCarousel(5);