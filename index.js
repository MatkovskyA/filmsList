// форма
const form = document.querySelector("#form")
//данные инпута
const inputMovies = document.getElementById('input'); 
// кнопка добавления значения из инпута
const movieAddBtn = document.getElementById('button__add'); 
// список выводимых данных
const moviesList = document.getElementById('movies__list_item'); 

let movieArr = []


//проверяем значение input
// получаем и передаем название фильма в список
function getDataMovie() {
    let movieHTML = `
    <li id="movies__list_empty" class="movies__list_empty">
        <button type="button" data-action ="checked" class="movie__btn_checked"></button>
        <span data-action ="mark" class="movie__title">${inputMovies.value}</span>
        <button type="button" data-action ="delete" class="movie__btn_delete cross"></button>
    </li>
    `;
    return movieHTML

}

// добавляем фильм в конец списока
function renderList() {
    moviesList.insertAdjacentHTML('beforeend', getDataMovie() )
}

// отображаем список фильмов 
function getMovie(e) {
    // отмена отправки формы
    e.preventDefault();

    renderList();
    //обнуляем поле ввода
    inputMovies.value = "";
    //оставляем на нем фокус
    inputMovies.focus();
}

// удаление фильма
function deleteMovie(e) {
    if (e.target.dataset.action === 'delete') {
        const parentNode = e.target.closest('li');
        parentNode.remove()
    }
}

// зачеркивание фильма
function markMovie(e) {
    // проверяем, что клик пришелся по названию фильма
    if (e.target.dataset.action === 'checked') {
        const parentNode = e.target.closest('li');

        const movieBtnChecked = parentNode.querySelector('.movie__btn_checked')
        
        movieBtnChecked.classList.toggle('movie__btn_check')
        const movieTitle = parentNode.querySelector('.movie__title')
        movieTitle.classList.toggle('movie__title_mark');
        parentNode.classList.toggle('li_bg_color')
    }
    if (e.target.dataset.action === "mark") {
        const parentNode = e.target.closest('li');
        const movieTitle = parentNode.querySelector('.movie__title')
        movieTitle.classList.toggle('movie__title_mark');
    }
}


// обработчик для вывода фильма
form.addEventListener('submit', getMovie);
//обработчик для удаления фильма
moviesList.addEventListener('click', deleteMovie)
// обработчик для зачеркивания фильма
moviesList.addEventListener('click', markMovie)