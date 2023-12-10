const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');
let count = 0;
let out = 0;
// 무작위로 숫자 뽑기 Math.random() -> 0 <=Math.random() < 1
// Math.floor(Math.random()) -> 소수점을 버림 3.30931->3

// 1~9까지 값
const number = [];
for (let i = 0; i < 9; i++) {
    number.push(i + 1);
}

// 맞춰야 하는 4개의 숫자
const answer = [];
for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * number.length);
    answer.push(number[index]);
    number.splice(index, 1); // 나온 숫자는 제거
}

console.log(answer);

const tries = []; // 내가 시도한 값

// 검사 하는 코드
function checkInput(input) {
    if (input.length !== 4) { // 4자리 인가?
        return alert('4자리 숫자를 입력하세요');
    }
    if (new Set(input).size !== 4) { // Set은 중복 제거해줌
        return alert('중복없이 4자리 숫자를 입력하세요');
    }
    if (tries.includes(input)) { // 이미 입력한 값인가? 확인
        return alert('이미 시도한 값입니다.');
    }
    return true;
}

function defeat() {
    $logs.appendChild(document.createTextNode(`패배! 정답은 ${answer.join('')}`));
};

$form.addEventListener('submit', (event) => {
    event.preventDefault(); // form 태그는 새로고침을 함 그걸 막아주는 코드
    const value = $input.value; //event.target[0].value; 도 동일
    $input.value = '';
    if (!checkInput(value)) {
        return;
    }
    if (answer.join('') === value) { // .join은 배열을 문자열로 바꿔줌 [3,1,4,6] ==> '3146' 
        $logs.textContent = '홈런!';
        return;
    }
    if (tries.length >= 9) { // 총 입력 횟수
        defeat();
        return;
    }
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i]);
        if (index > -1) {
            if (index === i) {
                strike++;
            }
            else {
                ball++;
            }
        }
    }
    if (strike === 0 && ball === 0) {
        out++;
        $logs.append(`${value} : ${out}아웃 `, document.createElement('br'));
    }
    else {
        $logs.append(`${value}: ${strike} strike ${ball} ball`, document.createElement('br'));
    }
    if (out === 3) {
        defeat();
        return;
    }
    count++;
    $logs.append(`시도횟수 : ${count}`, document.createElement('br'))
    tries.push(value);
});


/*
// 무작위로 숫자 뽑기 Math.random() -> 0 <=Math.random() < 1
// Math.floor(Math.random()) -> 소수점을 버림 3.30931->3

a 태그도 event.preventDefault();을 통해 새로고침 방지 가능
form
    input
    button /button
form
form 태그에서 event.target[0] => 하면 input태그 접근 가능
form 태그에서 event.target[1] => 하면 button태그 접근 가능
*/

// [3,1,4,6].join(':') => "3:1:4:6"
// [3,1,4,6].split() => ["3146"]
// [3,1,4,6].split('') => ["3", "1", "4", "6"]
// [3,1,4,6].split(1) => ["3", "46"]

// $logs.append(document.createElement('br')); br태그를 추가 === 줄바꿈

// append, textContent, innerHtml, createTextNode 아무거나 사용해라

// [1,2,3,5].indexof(5) ===3
// [1,2,3,5].indexof('5') ===-1 // 자료형이 동일해야 함
// .include === true false 로 결과

/*  
    const answer=[3,4,5,6]

    for(let i=0; i<anser.length; i++){
        console.log(answer[i],i)
    }

    // forEach
    answer.forEach((element, index) => { // (3,0) (4,1) (5,2) (6,3) 으로 인식
        console.log(element, index)
    })

    const result=[];
    for(let i=0; i<answer; i++){
        result.push(answer[i]*2);
    }

    // map
    answer.map((element, index) => {
        return element *2;
    })

    // map을 하면 기존 배열의 값은 변경 x answer하면 [3,4,5,6] 출력
    // 새로운 배열을 만들어 거기에 값을 저장

    // arr(9); === 길이가 9인 빈 배열
    // arr(9).fill(0); 길이가 9인데 0으로만 구성
    // arr(9).fill(0).map((el,index)=>{
        return index+1; // [1,2,3,4,5,6,7,8,9];
    })
*/