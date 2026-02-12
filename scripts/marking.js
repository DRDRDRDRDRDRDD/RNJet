// Аккордеон для часто задаваемых вопросов
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.item-header');
        
        header.addEventListener('click', function() {
            // Закрыть все другие открытые элементы
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключить текущий элемент
            item.classList.toggle('active');
        });
    });
});../scripts/