let addButton = document.querySelector('.add-button');
let counter = 1;

addButton.addEventListener('click', function() {
    let fieldset = document.querySelector('.beverage');
    let clonedFieldset = fieldset.cloneNode(true);
    clonedFieldset.querySelector('.delete-button').remove();
    
    for (let inp of clonedFieldset.querySelectorAll('radio')) {
        inp.setAttribute('name', `milk${counter}`)
    }
    for (let inp of clonedFieldset.querySelectorAll('checkbox')) {
        inp.setAttribute('name', `options${counter}`)
    }
    
    clonedFieldset.querySelector('.beverage-count').textContent = 'Напиток №' + (++counter);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        if (counter > 1) {
            clonedFieldset.remove();
            counter--; 
            document.querySelectorAll('.beverage').forEach(function(fs, index) {
                fs.querySelector('.beverage-count').textContent = 'Напиток №' + (index + 1);
            });

            let idx = 0;
            let blocki = document.querySelectorAll('.beverage');
            for (let block of blocki){
                for (let inp of block.querySelectorAll('radio')) {
                    inp.setAttribute('name', `milk${idx}`);
                }
                for (let inp of block.querySelectorAll('checkbox')) {
                    inp.setAttribute('name', `options${idx}`);
                }
                idx++;
            }

        }
    });
    clonedFieldset.appendChild(deleteButton);

    let fieldsets = document.querySelectorAll('.beverage');
    fieldset.parentNode.insertBefore(clonedFieldset, fieldsets[fieldsets.length - 1].nextSibling);
});

let fieldset = document.querySelector('.beverage');
let deleteButton = document.createElement('button');
deleteButton.textContent = 'X';
deleteButton.className = 'delete-button';
deleteButton.addEventListener('click', function() {
    if (counter > 1) {
        clonedFieldset.remove();
        counter--;
        document.querySelectorAll('.beverage').forEach(function(fs, index) {
            fs.querySelector('.beverage-count').textContent = 'Напиток №' + (index + 1);
        });
    }
});
fieldset.appendChild(deleteButton);

const submitButton = document.querySelector('.submit-button');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');

submitButton.addEventListener('click', event => {
    modal.style.display = 'block';

    const getCorrectEnding = (clickCount) => 
    ([2, 3, 4].includes(clickCount % 10) && ![12, 13, 14].includes(clickCount % 100))
    ? 'напитка'
    : (clickCount % 10 == 1 && clickCount % 100 != 11)
    ? 'напиток'
    : 'напитков';
    modal.querySelector('p').textContent = `Вы заказали ${counter} ${getCorrectEnding(counter)}`;

    let idx = 0;
    for (let form of document.querySelectorAll('.beverage')){
        const drinkSelect = form.querySelector('select');
        const milkRadios = form.querySelectorAll(`.beverage input[name="milk${idx}"]:checked`);
        const extrasCheckboxes = form.querySelectorAll(`.beverage input[name="options${idx}"]:checked`);
        const drink =drinkSelect.value;
        const milk = milkRadios.length > 0 ? milkRadios[0].value : '';
        const extras = Array.from(extrasCheckboxes).map(checkbox => checkbox.value);
        console.log(extras)
        addOrderToTable(drink, milk, extras);
        idx += 1;
    }
});

closeButton.addEventListener('click', event => {
    modal.style.display = 'none';
    location.reload();
});

function addOrderToTable(drink, milk, extras) {
    const orderTableBody = document.querySelector('#orderTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${drink}</td>
        <td>${milk}</td>
        <td>${extras.join(', ')}</td>
    `;
    console.log(row.innerHTML)
    orderTableBody.appendChild(row);
}
