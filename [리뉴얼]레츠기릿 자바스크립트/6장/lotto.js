// 비동기 코드? ==> 실제 코딩한 순서와 다르게 작동하는 코드
// ex) 이벤트 리스너, 타이머

// 1-45까지 배열
const candidate = Array(45).fill().map((v, i) => i + 1);
// 피셔 예이츠 셔플 = 전체를 섞어서 앞에서 가져옴
const shuffle = [];
while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1); // 값이 배열로 저장 [3]처럼
    const value = spliceArray[0]; // spliceArray 하면 배열이 45개들어가고 []을 하면 값이 들어감
    shuffle.push(value);
}

// 앞에서 6개 뽑고 크기순 정렬 5.4.7.2.1.3 => 1.2.3.4.5.7
const winball = shuffle.slice(0, 6).sort((a, b) => a - b); // 원본 배열은 변경 x
const bonus = shuffle[6];

const $result = document.querySelector('#result');

const drawball = (number, $parent) => {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    $parent.appendChild($ball);
};
// setTimeout (() => 함수, 시간)  시간은 1000이 1초임
// setTimeout은 기존에 하던 작업이 있다면 실행되지 않음
for (let i = 0; i < winball.length; i++) {
    setTimeout(() => {
        drawball(winball[i], $result);
    }, 1000 * (1 + i));
}

const $bonus = document.querySelector('#bonus');
setTimeout(() => {
    drawball(bonus, $bonus);
}, 7000);

/*
// 클로저? 함수와 함수 밖의 변수와의 관계, let을 쓰면 상관없다.

var은 함수 스코프를 가짐 // let, const는 블록 스코프 // 대부분의 언어들의 변수는 블록 스코프임
for if 같은 경우는 함수가 아니라 

if(true){
    var a=20;
    let b=30;
}
console.log(a); //20
console.log(b); // b is not defined
왜 let을 더 많이 쓰냐? var은 요즘 안씀
for (var i = 0; i < 6; i++) {
    setTimeout(() => {
        drawball(winball[i], $result);
    }, 1000 * (1 + i));
}
=> winball[i] => undefined로 인식 i값도 6이 출력, 스코프 때문임
setTimeout은 비동기 for은 동기임 즉, 실행하면 i값은 이미 6이 되어버림
따라서 i기 6이 출력

=> 해결방법 클로저 사용
// 함수와 함수 밖의 변수를 함수와 함수 안의 변수로 변경
for (var i = 0; i < 6; i++) {
    (function(j){
        setTimeout(() => {
            drawball(winball[j], $result);
        }, 1000 * (1 + j));
    })(i); // i값이 j로 넘어감
}
 
//태그.style.css; 하면 html에 css 적용 가능
$tag.style.backgroundColor = 'red';
*/
