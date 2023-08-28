// форма
const form = document.querySelector("#form")
//данные инпута
const inputMovies = document.getElementById('input'); 
// кнопка добавления значения из инпута
const movieAddBtn = document.getElementById('button__add'); 
// список выводимых данных
const moviesList = document.querySelector('.movies__list_item'); 

let movieArr = []
// получаем данные из LS если они там есть
if (localStorage.getItem('movieArr')) {

    movieArr = JSON.parse(localStorage.getItem('movieArr'));
}

movieArr.forEach(function (newMovie)  {
    renderMovieList(newMovie)
});

// отображаем список фильмов 
function getMovie() {
    const movieName = inputMovies.value;

        //проверка значение inputa
        if (!inputMovies.value.trim()) {
            alert("Введите корректное название фильма")
            return
        }
        
    // отмена отправки формы
    // e.preventDefault();

    //получаем новый фильм как объект с id и названием
    const newMovie = {
        id: Date.now(),
        text: movieName,
        // done: false,
    };
    // добавляем новый фильм в массив фильмов
    movieArr.push(newMovie);

    ////добавление на страницу и запись фильма
    renderMovieList(newMovie)

    //обнуляем поле ввода
    inputMovies.value = "";
    //оставляем на нем фокус
    inputMovies.focus();

    saveToLocalStorage()
}

// удаление фильма
function deleteMovie(e) {
    if (e.target.dataset.action === 'delete') {
        const parentNode = e.target.closest('li');
        // определяем id фильма
        const idMovie = Number(parentNode.id);
        //находим индекс нужного фильма в массиве  movieArr
        const indexMovie = movieArr.findIndex( function (movie) { 
            if (movie.id === idMovie) {
                return true
            }
        });

        // удаляем из массива фильм
        movieArr.splice(indexMovie, 1)

        saveToLocalStorage()

        //удаляем задачу из разметки html
        parentNode.remove()
    }
}

//добавление на страницу и запись фильма
function renderMovieList(movie) {
            //  разметка для новой задачи
            const movieHTML = `
            <li id="${movie.id}" class="movies__list_empty">
                <button type="button" data-action ="checked" class="movie__btn_checked"></button>
                <span data-action ="mark" class="movie__title">${movie.text}</span>
                <button type="button" data-action ="delete" class="movie__btn_delete cross"></button>
            </li>
            `;
        
            // добавляем фильм в конец списока
            moviesList.insertAdjacentHTML('beforeend', movieHTML);
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

    saveToLocalStorage()
}

function saveToLocalStorage() {
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
}


// обработчик для вывода фильма
form.addEventListener('submit', getMovie);
//обработчик для удаления фильма
moviesList.addEventListener('click', deleteMovie)
// обработчик для зачеркивания фильма
moviesList.addEventListener('click', markMovie)