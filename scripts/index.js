// Бургер-меню
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu');
    const burgerMenu = document.getElementById('burger-menu');
    const searchInput = document.querySelector('.searchInput');
    const searchButton = document.querySelector('.searchButton');

    // Создаем контейнер для выпадающего списка товаров
    const searchDropdown = document.createElement('div');
    searchDropdown.className = 'search-dropdown';
    searchDropdown.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    max-height: 400px;
    width: 300px;
    overflow-y: auto;
    display: none;
    z-index: 9999; 
    margin-top: 5px;
`;

    // Добавляем dropdown после поискового контейнера
    const searchContainer = document.querySelector('.searchContainer');
    if (searchContainer) {
        searchContainer.style.position = 'relative';
        searchContainer.style.zIndex = '10000'; 
        searchContainer.appendChild(searchDropdown);
    }

    // Переключатель бургер-меню
    menuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        if (burgerMenu.style.display === 'none' || burgerMenu.style.display === '') {
            burgerMenu.style.display = 'flex';
        } else {
            burgerMenu.style.display = 'none';
        }
    });

    // Закрывашка при клике вне бургер-меню
    document.addEventListener('click', function (e) {
        if (!burgerMenu.contains(e.target) && e.target !== menuButton) {
            burgerMenu.style.display = 'none';
        }
    });

    // Закрывашка при клике на ссылку внутри бургер-меню
    burgerMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            burgerMenu.style.display = 'none';
        });
    });

    // Данные о товарах для поиска
    const productsData = [
        {
            name: 'RNJet 100+',
            category: 'Принтеры с системой пакетной печати',
            description: 'Промышленный принтер высокого разрешения для печати мелких символов',
            page: './pages/RNJet100+.html'
        },
        {
            name: 'RNJet 200+',
            category: 'Принтеры с системой пакетной печати',
            description: 'Промышленный кодировщик с двумя головками, высоким разрешением',
            page: './pages/RNJet200+.html'
        },
        {
            name: 'RNJet 100',
            category: 'Принтеры с картриджной системой',
            description: 'Промышленный принтер высокого разрешения для нанесения мелкого шрифта',
            page: './pages/RNJet100.html'
        },
        {
            name: 'RNJet 200',
            category: 'Принтеры с картриджной системой',
            description: 'Двухголовочный промышленный принтер с высоким разрешением',
            page: './pages/RNJet200.html'
        },
        {
            name: 'RNJet EP-6H+',
            category: 'Принтеры с картриджной системой',
            description: 'Доступный по цене, высокоскоростной принтер для печати на яйцах',
            page: './pages/RNJetEP-6H+.html'
        },
        {
            name: 'RNJet 100 XL',
            category: 'Принтеры с картриджной системой',
            description: 'Высокоскоростной принтер для нанесения даты мелкими символами',
            page: './pages/RNJet100XL.html'
        },
        {
            name: 'RNJet 200 XL',
            category: 'Принтеры с картриджной системой',
            description: 'Двухголовочный высокоточный промышленный термопринтер',
            page: './pages/RNJet200XL.html'
        },
        {
            name: 'RNJet H1+',
            category: 'Принтеры с картриджной системой',
            description: 'Высокоскоростной принтер для нанесения дат мелким шрифтом',
            page: './pages/RNJetH1+.html'
        },
        {
            name: 'RNJet H2+',
            category: 'Принтеры с картриджной системой',
            description: 'Двухголовочный высокоточный термопринтер',
            page: './pages/RNJetH2+.html'
        },
        {
            name: 'RNJet H2 ST',
            category: 'Принтеры с картриджной системой',
            description: 'Высокоскоростной кодировщик даты с двойной шовной головкой',
            page: './pages/RNJetH2ST.html'
        },
        {
            name: 'RNJet H4 ST',
            category: 'Принтеры с картриджной системой',
            description: 'Двухголовочный высокоточный термопринтер',
            page: './pages/RNJetH4ST.html'
        },
        {
            name: 'RNJet T1',
            category: 'Принтеры с картриджной системой',
            description: 'Высокоскоростной струйный кодировщик',
            page: './pages/RNJetT1.html'
        },
        {
            name: 'RNJet T2 ST',
            category: 'Принтеры с картриджной системой',
            description: 'Двухголовочный промышленный термопринтер',
            page: './pages/RNJetT2ST.html'
        },
        {
            name: 'RNJetE1-72+',
            category: 'Принтеры с системой пакетной печати',
            description: 'Промышленный струйный принтер для печати крупных символов',
            page: './pages/RNJetE1-72+.html'
        },
        {
            name: 'RNJet E1-140+',
            category: 'Принтеры с системой пакетной печати',
            description: 'Промышленный кодировщик с двумя печатающими головками',
            page: './pages/RNJetE1-140+.html'
        },
        {
            name: 'RNJet 72',
            category: 'Принтеры с картриджной системой',
            description: 'Принтер для печати на картонных коробках',
            page: './pages/RNJet72.html'
        },
        {
            name: 'RNJet 140',
            category: 'Принтеры с картриджной системой',
            description: 'Принтер с двумя печатающими головками и крупными символами',
            page: './pages/RNJet140.html'
        },
        {
            name: 'RNJet 72 XL',
            category: 'Принтеры с картриджной системой',
            description: 'Принтер с картриджами 430 мл для печати на коробках',
            page: './pages/RNJet72XL.html'
        },
        {
            name: 'RNJet 140 XL',
            category: 'Принтеры с картриджной системой',
            description: 'Принтер с двумя головками для печати крупных символов',
            page: './pages/RNJet140XL.html'
        },
        {
            name: 'RNJet 288 XL',
            category: 'Принтеры с картриджной системой',
            description: 'Принтер с картриджами 430 мл, высота печати до 288 мм',
            page: './pages/RNJet288XL.html'
        },
        {
            name: 'RNJet 140 BC',
            category: 'Принтеры с картриджной системой',
            description: 'Двухцветный принтер с четырьмя печатающими головками',
            page: './pages/RNJet140BC.html'
        }
    ];

    // Функция для отображения результатов поиска
    function showSearchResults(searchTerm) {
        searchDropdown.innerHTML = '';

        if (!searchTerm || searchTerm.trim() === '') {
            searchDropdown.style.display = 'none';
            return;
        }

        const term = searchTerm.toLowerCase().trim();

        // Ищем товары по названию и описанию
        const results = productsData.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        ).slice(0, 5); // Ограничиваем до 5 результатов

        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.textContent = 'Товары не найдены';
            noResults.style.cssText = `
                padding: 12px 16px;
                color: #666;
                text-align: center;
                font-style: italic;
            `;
            searchDropdown.appendChild(noResults);
            searchDropdown.style.display = 'block';
            return;
        }

        // Добавляем каждый результат в выпадающий список
        results.forEach(product => {
            const item = document.createElement('a');
            item.href = product.page;
            item.style.cssText = `
                display: flex;
                align-items: center;
                padding: 10px 16px;
                text-decoration: none;
                color: #333;
                border-bottom: 1px solid #eee;
                transition: background-color 0.2s;
                cursor: pointer;
            `;
 
            // Контейнер с информацией о товаре
            const infoContainer = document.createElement('div');
            infoContainer.style.cssText = `
                flex: 1;
            `;

            const name = document.createElement('div');
            name.style.cssText = `
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 4px;
                color: #333;
            `;
            name.textContent = product.name;

            const category = document.createElement('div');
            category.style.cssText = `
                font-size: 12px;
                color: #e31e24;
                margin-bottom: 2px;
            `;
            category.textContent = product.category;

            const description = document.createElement('div');
            description.style.cssText = `
                font-size: 11px;
                color: #666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 250px;
            `;
            description.textContent = product.description;

            infoContainer.appendChild(name);
            infoContainer.appendChild(category);
            infoContainer.appendChild(description);

            item.appendChild(infoContainer);

            // Добавляем ховер-эффект
            item.addEventListener('mouseenter', function () {
                this.style.backgroundColor = '#f5f5f5';
            });
            item.addEventListener('mouseleave', function () {
                this.style.backgroundColor = 'white';
            });

            searchDropdown.appendChild(item);
        });

        searchDropdown.style.display = 'block';
    }

    // Обработчик ввода в поле поиска
    searchInput.addEventListener('input', function (e) {
        showSearchResults(e.target.value);
    });

    // Закрываем выпадающий список при клике вне его
    document.addEventListener('click', function (e) {
        if (!searchContainer.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });

    // Предотвращаем закрытие при клике внутри dropdown
    searchDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Обработка поиска при нажатии Enter
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = this.value.trim();
            if (searchTerm) {
                // Проверяем, есть ли точное совпадение
                const exactMatch = productsData.find(product =>
                    product.name.toLowerCase() === searchTerm.toLowerCase()
                );

                if (exactMatch) {
                    window.location.href = exactMatch.page;
                } else {
                    // Если нет точного совпадения, показываем результаты
                    showSearchResults(searchTerm);
                }
            }
        }
    });

    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Проверяем, есть ли точное совпадение
            const exactMatch = productsData.find(product =>
                product.name.toLowerCase() === searchTerm.toLowerCase()
            );

            if (exactMatch) {
                window.location.href = exactMatch.page;
            } else {
                // Если нет точного совпадения, показываем результаты
                showSearchResults(searchTerm);
            }
        } else {
            alert('Введите поисковый запрос');
            searchInput.focus();
        }
    });

    // ВЫПАДАЮЩЕЕ МЕНЮ (остальная часть кода без изменений)
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