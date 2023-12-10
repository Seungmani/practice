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
    if (numOne) {
        operator = op;
        $operator.value = op;
    } else {
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
                $result.value = parseInt(numOne) + parseInt(numTwo); // +는 문자로 인식
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
    } else {
        alert('숫자를 먼저 입력하세요.');
    }
});

document.querySelector('#clear').addEventListener('click', () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $operator = '';
    $result = '';
});
// alt+방향키 하면 방향기로 줄 전체 이동
// alt + shift +방향키아래 === 다음 줄에 복사
/*document.querySelector('#num-0').addEventListener('click', () => {
    if(operator){
        numTwo += '0';
    }
    else{
        numOne +='0';
    }
    $result.value +='0';
});
document.querySelector('#num-1').addEventListener('click', () => {
    if(operator){
        numTwo += '1';
    }
    else{
        numOne +='1';
    }
    $result.value +='1';
});
위와같이 함수의 중복은 안좋음 ==> 고차함수를 이용 중복 제거
*/
/*const onclickNumber = (number) => {
    // return undefined가 기본 값이라 onclickNumber('0')은 undefined로 인식
    // return에 실행할 함수를 만들어줘야함
    // 화살표 함수는 {return 생략가능}
    return () => {
        if (operator) {
            numTwo += number;
        }
        else {
            numOne += number;
        }
        $result.value = number;
    };
};
*/

/*
if(operator){
    if (!numTwo) {
        $result.value = ''; // 연산자 입력하면 result창 초기화
    }
    numTwo += event.target.textContent; // 클릭한 버튼의 값을 가져옴
} else{
    numOne += event.target.textContent;
}
$result.value = event.target.textContent;
if문 중첩 제거
1. if문 다음에 나오는 공통된 절차를 각 분기점에 넣는다.
-> $result.value = event.target.textContent;

2. 짧은 절차부터 실행되게 한다.
-> if와 else 교체

3. 짧은 절차가 끝나면 return(함수), break(for문)을 통해 중단
-> return;

4. else 제거
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
}
*/