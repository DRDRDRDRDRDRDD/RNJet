// Бургер-меню
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu');
    const burgerMenu = document.getElementById('burger-menu');
    const searchInput = document.querySelector('.searchInput');
    const searchButton = document.querySelector('.searchButton');

    // Переключатель
    menuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        if (burgerMenu.style.display === 'none' || burgerMenu.style.display === '') {
            burgerMenu.style.display = 'flex';
        } else {
            burgerMenu.style.display = 'none';
        }
    });

    // Закрывашка при клике вне его
    document.addEventListener('click', function (e) {
        if (!burgerMenu.contains(e.target) && e.target !== menuButton) {
            burgerMenu.style.display = 'none';
        }
    });

    // Закрывашка при клике на ссылку внутри него
    burgerMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            burgerMenu.style.display = 'none';
        });
    });

    // Поиск
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Ищем: "${searchTerm}"\nВ реальном приложении здесь будет отправка запроса на сервер.`);
            // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        } else {
            alert('Введите поисковый запрос');
            searchInput.focus();
        }
    }

    // Рабочий Enter 
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Рабочая кнопка лупы
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        performSearch();
    });
});