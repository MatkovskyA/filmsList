const inputMoviesNode = document.getElementById('input-text'); //данные инпута
const movieBtnAdd = document.getElementById('button-arrow'); // кнопка
const moviesListNode = document.getElementById('add__movies-list'); // список выводимых данных
const deleteMovieNode = document.getElementById('movie__cross_delete'); // кнопка удаления списка

const CHECKED_CLASS_NAME = 'checked-movie-item';
const CHECKED_CHECKBOX = 'checked-checkbox';

let movies = [];
// получение данных и проверка инпута
function getInputMovie() {
    let userFilm = inputMoviesNode.value;
    if (!inputMoviesNode.value.trim()) {
        alert("Введите корректное название фильма");
    };
    
    return userFilm;
}
// чистка инпута
const clearInput = () => {inputMoviesNode.value = ''};

const showMovieTitle = () => {
    getInputMovie();
    addMovieToList();
    clearInput();

}

function addMovieToList() {
    moviesListNode.innerHTML = getInputMovie();
}


movieBtnAdd.addEventListener('click', showMovieTitle)