const inputMoviesNode = document.getElementById('input-text'); //данные инпута
const movieBtnAdd = document.getElementById('button-arrow'); // кнопка
const moviesListNode = document.getElementById('movies__lists'); // список выводимых данных


//получаем данные из input + проверка
function addMovie() {
    if (!inputMoviesNode.value.trim()) {
        alert("Введите корректное название фильма");
    }
    if (inputMoviesNode.value.trim()) {
        createMovieList();
    }
    if (inputMoviesNode.value.length > '100') {
        alert('Слишком большое название фильма, ты не ошибся?');
        
    }
    inputMoviesNode.value = '';
    saveData();
}

// создаем список с иконкой закрытия
function createMovieList() {
    let movieList = document.createElement('li');
    movieList.innerHTML = inputMoviesNode.value;
    moviesListNode.appendChild(movieList);
    let cross__delete = document.createElement('span');
    cross__delete.innerHTML = '+';
    movieList.appendChild(cross__delete);
}

// 
function checkedMovie(el) {
    if (el.target.tagName === 'LI') {
        el.target.classList.toggle('checked');
        saveData()
    }
    if (el.target.tagName === "SPAN") {
        el.target.parentElement.remove()
        saveData()
    }
    return
}
// сохранение в  LS
function saveData() {
    localStorage.setItem('data', moviesListNode.innerHTML);
}
// Отображение сохраненных данных
showMovie()
function showMovie() {
    moviesListNode.innerHTML = localStorage.getItem('data')
}
// Зачеркивание / удаление фильма через клик
moviesListNode.addEventListener('click', checkedMovie)
// добаление в список фильма 
movieBtnAdd.addEventListener('click', addMovie)