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
        } else {
            alert('Введите поисковый запрос');
            searchInput.focus();
        }
    }

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        performSearch();
    });

    // ВЫПАДАЮЩЕЕ МЕНЮ
    const navItems = document.querySelectorAll('.nav-menu .menu-list');

    // Создаем контейнер для выпадающего меню
    const clickDropdown = document.createElement('div');
    clickDropdown.className = 'click-dropdown';
    clickDropdown.style.display = 'none';
    document.querySelector('header .container').appendChild(clickDropdown);

    // Данные для выпадающих меню с подкатегориями
    const dropdownData = {
        'Продукты': [
            { text: 'Продукты', submenu: [] },
            {
                text: 'Термоструйные принтеры',
                submenu: [
                    {
                        text: 'RNJet T Series',
                        submenu: [
                            'Датокодер RNJet T1 (промышленный принтер, не требующий 100% технического обслуживания)',
                            'Термоструйный принтер – RNJet T2 ST',
                            'Широкоформатный струйный принтер TIJ – RNJet T4 ST'
                        ]
                    },
                    {
                        text: 'RNJet H Series',
                        submenu: [
                            'RNJet H1 Малосимвольный быстросохнущий маркировщик даты',
                            'RNJet H2 Малосимвольный принтер с двумя печатающими головками'
                        ]
                    }
                ]
            },
            { text: 'Пьезопринтеры для пакетной печати', submenu: ['RNJet 100+ маленьких персонажей, одна голова, система массового производства', 'RNJet 200+ Малый персонаж, двухголовочная система, компактная конструкция', 'RNJet E1-72+ Крупный символ, единственная голова, система блоков', 'RNJet E1-140+ Крупноформатный самолет, двухголовочный, модульная система'] },
            { text: 'Пьезопринтеры на основе картриджей', submenu: ['RNJet 100 – Автономный принтер для печати символов малого размера', 'Промышленный струйный принтер RNJet 100 XL для печати мелких символов и высокого разрешения.', 'RNJet 200 – Автономный принтер для печати мелких символов, с двумя печатающими головками.', 'Двухголовочный промышленный струйный принтер высокого разрешения – RNJet 200 XL', 'RNJet 72 – Крупный персонаж, самостоятельный персонаж', 'RNJet 140 – Двухголовочный самолет', 'RNJet 72 XL (система на основе картриджа объемом 430 мл)', 'RNJet 140 XL Двухголовочный кодировщик', 'RNJet 140 BC – Двухцветная машина для маркировки картонных коробок (принтер для картонных коробок)', 'RNJet 288 XL – Машина для маркировки картонных коробок (производство Канада)'] },
            { text: 'Принтер для яиц RNJet EP-6H+', submenu: [] },
            { text: 'Принтеры для кодирования заказов', submenu: [] },
            { text: 'RN Soft', submenu: [] },
            { text: 'Уборщики', submenu: [] },
            { text: 'Чернила для промышленных струйных принтеров', submenu: [] }
        ],
        'Поддержка': [
            { text: 'Техническая поддержка', submenu: [] },
            { text: 'Часто задаваемые вопросы', submenu: [] },
            { text: 'Брошюры', submenu: [] }
        ],
        'Компания': [
            { text: 'O RN Mark', submenu: [] },
            { text: 'Блог', submenu: [] },
            { text: 'Дистрибьюторы', submenu: [] },
            { text: 'Новости и пресс-релизы', submenu: [] },
            { text: 'Ведение бизнеса с нами', submenu: [] },
            { text: 'События', submenu: [] },
            { text: 'Политика возврата и обмена товаров', submenu: [] },
            { text: 'Политика использования файлов cookie', submenu: [] },
            { text: 'Контакт', submenu: [] }
        ]
    };

    // Переменная для хранения открытого меню
    let activeDropdown = null;

    // Функция для создания подменю (рекурсивная)
    function createSubmenu(items, level = 0) {
        if (!items || items.length === 0) return null;

        const submenu = document.createElement('div');
        submenu.className = 'dropdown-submenu';
        submenu.style.marginLeft = (level) * 15 + 'px';

        items.forEach(item => {
            if (typeof item === 'string') {
                // Это конечный пункт (строка)
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = item;
                link.style.fontSize = '13px';
                link.style.padding = '5px 15px';
                link.style.display = 'block';
                submenu.appendChild(link);
            } else {
                // Это объект с подменю
                const itemContainer = document.createElement('div');
                itemContainer.className = 'dropdown-item-container';

                const mainLink = document.createElement('a');
                mainLink.href = '#';
                mainLink.textContent = item.text;
                mainLink.className = 'dropdown-main-link';
                mainLink.style.fontSize = '13px';

                if (item.submenu && item.submenu.length > 0) {
                    const arrowSpan = document.createElement('span');
                    arrowSpan.className = 'submenu-arrow';
                    arrowSpan.innerHTML = '▶';
                    mainLink.appendChild(arrowSpan);

                    const childSubmenu = createSubmenu(item.submenu, level + 1);
                    if (childSubmenu) {
                        childSubmenu.style.display = 'none';

                        mainLink.addEventListener('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            const isVisible = childSubmenu.style.display === 'block';
                            childSubmenu.style.display = isVisible ? 'none' : 'block';

                            const arrow = this.querySelector('.submenu-arrow');
                            if (arrow) {
                                arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
                            }
                        });

                        itemContainer.appendChild(mainLink);
                        itemContainer.appendChild(childSubmenu);
                    }
                } else {
                    itemContainer.appendChild(mainLink);
                }

                submenu.appendChild(itemContainer);
            }
        });

        return submenu;
    }
    // Функция для заполнения меню
    function populateDropdown(menuType) {
        clickDropdown.innerHTML = '';

        if (!dropdownData[menuType]) return;

        dropdownData[menuType].forEach(item => {
            // Контейнер для пункта меню
            const itemContainer = document.createElement('div');
            itemContainer.className = 'dropdown-item-container';

            // Основная ссылка
            const mainLink = document.createElement('a');
            mainLink.href = '#';
            mainLink.textContent = item.text;
            mainLink.className = 'dropdown-main-link';

            itemContainer.appendChild(mainLink);

            // Если есть подменю, добавляем стрелку и подменю
            if (item.submenu && item.submenu.length > 0) {
                const arrowSpan = document.createElement('span');
                arrowSpan.className = 'submenu-arrow';
                arrowSpan.innerHTML = '▶';

                mainLink.appendChild(arrowSpan);

                // Создаем подменю
                const submenu = createSubmenu(item.submenu, 1);
                if (submenu) {
                    submenu.style.display = 'none';
                    itemContainer.appendChild(submenu);

                    // Клик по пункту с подменю
                    mainLink.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        const isVisible = submenu.style.display === 'block';

                        // Закрываем все другие подменю
                        itemContainer.parentElement.querySelectorAll('.dropdown-submenu').forEach(sm => {
                            if (sm !== submenu) sm.style.display = 'none';
                        });

                        // Переключаем текущее
                        submenu.style.display = isVisible ? 'none' : 'block';

                        // Поворачиваем стрелку
                        const arrow = this.querySelector('.submenu-arrow');
                        if (arrow) {
                            arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
                        }
                    });
                }
            }

            clickDropdown.appendChild(itemContainer);
        });
    }

    // Добавляем обработчики клика для каждого пункта меню
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const linkText = link.textContent.trim().replace('↓', '').trim();

        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Если это тот же пункт, закрываем меню
            if (activeDropdown === linkText) {
                clickDropdown.style.display = 'none';
                activeDropdown = null;
                return;
            }

            // Позиционируем меню
            const rect = item.getBoundingClientRect();
            const headerRect = document.querySelector('header').getBoundingClientRect();

            clickDropdown.style.display = 'block';
            clickDropdown.style.position = 'absolute';
            clickDropdown.style.left = rect.left + 'px';
            clickDropdown.style.top = '100px';

            // Заполняем контент
            populateDropdown(linkText);

            activeDropdown = linkText;
        });
    });

    // Закрываем меню при клике вне
    document.addEventListener('click', function (e) {
        if (!clickDropdown.contains(e.target) && !e.target.closest('.nav-menu')) {
            clickDropdown.style.display = 'none';
            activeDropdown = null;
        }
    });

    // Предотвращаем закрытие при клике внутри меню
    clickDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});