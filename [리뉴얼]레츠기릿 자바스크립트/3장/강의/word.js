// 실제 코드
const number = Number(prompt("몇 명이 참가하나요?"), 10);
const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');

let word; // 제시어, 전 사람이 입력한 단어
let n_word; // 새로 입력한 단어
$input.focus(); // input에 바로 값을 입력 가능
const onClickButton = () => {
    if (!word) { // 비어있다 === 첫번째 사람이 입력
        word = n_word;
        $word.textContent = word; // .textContent를 통해 id=word에 입력값을 넣음
        const order = parseInt($order.textContent); // 현재순서
        if (order + 1 > number) {
            $order.textContent = 1;
        }
        else {
            $order.textContent = order + 1;
        }
        $input.value = ''; // input같은 경우는 값을 .value로 불러옴, input을 빈칸으로
        $input.focus(); // input에 바로 값을 입력 가능
    }
    else {
        if (word[word.length - 1] === n_word[0]) {
            word = n_word;
            $word.textContent = word; // .textContent를 통해 id=word에 입력값을 넣음
            const order = parseInt($order.textContent); // 현재순서
            if (order + 1 > number) {
                $order.textContent = 1;
            }
            else {
                $order.textContent = order + 1;
            }
            $input.value = ''; // input같은 경우는 값을 .value로 불러옴, input을 빈칸으로
            $input.focus(); // input에 바로 값을 입력 가능
        }
        else { // 틀렸을 때
            alert("틀림");
            $input.value = ''; // input같은 경우는 값을 .value로 불러옴, input을 빈칸으로
            $input.focus(); // input에 바로 값을 입력 가능
        }
    }
};

const onInput = (event) => {
    n_word = event.target.value;
};

$button.addEventListener('click', onClickButton);
$input.addEventListener('input', onInput);

/*
    const number = parseInt(prompt('몇 명이 참가하나요?'),10); // 10은 10진법을 의미 default=10임 또는 Number(prompt()) 사용
    // prompt는 사용자로부터 값을 입력받음
    alert(number); // 알림을 띄어줌
    const yesOrNo = confirm('맞나요?'); // 예, 아니요를 입력 받음
    // document.querySelector('선택') //단일선택
    // document.querySelectorAll('선택') //다중선택
    // document.querySelectorAll('#아이디')
    // document.querySelectorAll('.클래스')
    // document.querySelectorAll('선택1 선택2') // 선택1의 자손 선택 2를 가져옴

    // 콜백함수 , 리스너 함수
    document.querySelector('input').addEventListener('input', function(event) {
        console.log('글 입력', event.target.value);
    });
    
    const onClick = function(){
        console.log('2');
    }
     // 만약 function 자리에 onClick() = x
    document.querySelector('button').addEventListener('click', onClick);

    // value => input, select, textarea
    // textContent => button, div, span 
*/