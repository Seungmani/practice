let numOne = '';
let operator = '';
let numTwo = '';

const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

const onClickNumber = (event) => { // 함수가 함수를 return하고있다고 생각해야 함 === 고차함수(high order function)
    if (!operator) {
        numOne += event.target.textContent;
        $result.value = event.target.textContent;
        return;
    }
    if (!numTwo) {
        $result.value = ''; // 연산자 입력하면 result창 초기화
    }
    numTwo += event.target.textContent; // 클릭한 버튼의 값을 가져옴
    $result.value = event.target.textContent;
};

document.querySelector('#num-0').addEventListener('click', onClickNumber); //.addEventListener(행동, 함수); 
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);

const onClickOperator = (op) => () => {
    if (numTwo) {
        switch (operator) {
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                break;
            case '-':
                $result.value = numOne - numTwo;
                break;
            case '*':
                $result.value = numOne * numTwo;
                break;
            case '/':
                $result.value = numOne / numTwo;
                break;
            default:
                break;
        }
        numOne = $result.value;
        numTwo = '';
    }
    if (numOne) {
        operator = op;
        $operator.value = op;
    }
    else {
        alert('숫자를 먼저 입력하세요');
    }
};

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));

document.querySelector('#calculate').addEventListener('click', () => {
    if (numTwo) {
        switch (operator) {
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                break;
            case '-':
                $result.value = numOne - numTwo;
                break;
            case '*':
                $result.value = numOne * numTwo;
                break;
            case '/':
                $result.value = numOne / numTwo;
                break;
            default:
                break;
        }
        $operator.value = '';
        numOne = $result.value;
        operator = '';
        numTwo = '';
    } else {
        alert('숫자를 먼저 입력하세요.');
    }
});

document.querySelector('#clear').addEventListener('click', () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $operator.value = '';
    $result.value = '';
});