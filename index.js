var addButton = document.querySelector('.add-button');
var counter = 1; // Счетчик для номера напитка

addButton.addEventListener('click', function() {
    var fieldset = document.querySelector('.beverage');
    var clonedFieldset = fieldset.cloneNode(true); // Клонируем fieldset

    // Обновляем номер напитка
    clonedFieldset.querySelector('.beverage-count').textContent = 'Напиток №' + (++counter);

    // Добавляем кнопку удаления
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        if (counter > 1) {
            clonedFieldset.remove();
            counter--; // Уменьшаем счетчик
            // Обновляем номера напитков
            document.querySelectorAll('.beverage').forEach(function(fs, index) {
                fs.querySelector('.beverage-count').textContent = 'Напиток №' + (index + 1);
            });
        }
    });
    clonedFieldset.appendChild(deleteButton);

    let fieldsets = document.querySelectorAll('.beverage');
    // Вставляем клонированный fieldset после последнего
    fieldset.parentNode.insertBefore(clonedFieldset, fieldsets[fieldsets.length - 1].nextSibling);
});


const submitButton = document.querySelector('.submit-button');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');

submitButton.addEventListener('click', event => {
    modal.style.display = 'block';
});

closeButton.addEventListener('click', event => {
    modal.style.display = 'none';
    location.reload();
});