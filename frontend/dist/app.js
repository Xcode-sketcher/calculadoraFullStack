var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resultInput = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
let operator = '';
let firstOperand = '';
const API_BASE_URL = 'http://localhost:5189';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (!isNaN(parseInt(value)) || value === '.') {
            currentInput += value;
            resultInput.value = currentInput;
        }
        else if (value === 'C') {
            currentInput = '';
            operator = '';
            firstOperand = '';
            resultInput.value = '';
        }
        else if (value === '=') {
            calculate();
        }
        else {
            operator = value;
            firstOperand = currentInput;
            currentInput = '';
        }
    });
});
function calculate() {
    return __awaiter(this, void 0, void 0, function* () {
        if (firstOperand === '' || currentInput === '' || operator === '')
            return;
        let endpoint = '';
        switch (operator) {
            case '+':
                endpoint = 'soma';
                break;
            case '-':
                endpoint = 'subtracao';
                break;
            case '*':
                endpoint = 'multiplicacao';
                break;
            case '/':
                endpoint = 'divisao';
                break;
        }
        const url = `${API_BASE_URL}/${endpoint}?a=${firstOperand}&b=${currentInput}`;
        try {
            const response = yield fetch(url);
            if (response.ok) {
                const result = yield response.json();
                resultInput.value = result;
                currentInput = result;
            }
            else {
                const error = yield response.text();
                resultInput.value = 'Erro';
                console.error(error);
            }
        }
        catch (error) {
            resultInput.value = 'Erro de conexão';
            console.error(error);
        }
    });
}
