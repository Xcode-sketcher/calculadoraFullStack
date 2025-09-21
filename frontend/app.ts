const resultInput = document.getElementById('result') as HTMLInputElement;
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = '';
let firstOperand = '';

const API_BASE_URL = 'http://localhost:5189';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent!;

        if (!isNaN(parseInt(value)) || value === '.') {
            currentInput += value;
            resultInput.value = currentInput;
        } else if (value === 'C') {
            currentInput = '';
            operator = '';
            firstOperand = '';
            resultInput.value = '';
        } else if (value === '=') {
            calculate();
        } else {
            operator = value;
            firstOperand = currentInput;
            currentInput = '';
        }
    });
});

async function calculate() {
    if (firstOperand === '' || currentInput === '' || operator === '') return;

    let endpoint = '';
    switch (operator) {
        case '+': endpoint = 'soma'; break;
        case '-': endpoint = 'subtracao'; break;
        case '*': endpoint = 'multiplicacao'; break;
        case '/': endpoint = 'divisao'; break;
    }

    const url = `${API_BASE_URL}/${endpoint}?a=${firstOperand}&b=${currentInput}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            resultInput.value = result;
            currentInput = result;
        } else {
            const error = await response.text();
            resultInput.value = 'Erro';
            console.error(error);
        }
    } catch (error) {
        resultInput.value = 'Erro de conexão';
        console.error(error);
    }
}