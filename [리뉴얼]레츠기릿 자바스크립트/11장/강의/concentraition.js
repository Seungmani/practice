const $wrapper = document.querySelector('#wrapper');

const total = parseInt(prompt('카드 개수를 짝수로 입력하세요(최대 20).'));
const colors = ['red', 'orange', 'yellow', 'green', 'white',
    'pink', 'cyan', 'violet', 'gray', 'black'];
const colorSlice = colors.slice(0, total / 2);
let colorCopy = colorSlice.concat(colorSlice); // colors 배열에 colors를 합침
// [1].concat(2) 와 [1].concat([2])의 결과는 [1,2]로 동일, 객체는 안됨
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;

function shuffle() {
    for (let i = 0; colorCopy.length > 0; i++) {
        const random = Math.floor(Math.random() * colorCopy.length);
        shuffled = shuffled.concat(colorCopy.splice(random, 1));
    }
}

function createCard(i) { // div.card > div.card-inner > (div.card-front + div.card-back)
    const card = document.createElement('div');
    card.className = 'card'; // <div class='card'><div/> 생성

    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back'

    cardBack.style.backgroundColor = shuffled[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    return card;
}

function onClickCard() {

    // 카드를 보여주는 경우, 이미 완성된 카드, 방금 클릭한 카드는 클릭 불가
    if (!clickable || completed.includes(this) || clicked[0] === this) {
        return;
    }

    this.classList.toggle('flipped');
    clicked.push(this);

    if (clicked.length !== 2) {
        return;
    }

    const first = clicked[0].querySelector('.card-back').style.backgroundColor;
    const second = clicked[1].querySelector('.card-back').style.backgroundColor;

    if (first === second) { // 카드가 같으면
        completed.push(clicked[0]);
        completed.push(clicked[1]);
        clicked = [];

        if (completed.length !== total) {
            return;
        }
        let endTime = new Date();
        setTimeout(() => {
            alert(`축하합니다! ${(endTime - startTime) / 1000}초 걸렸습니다.`);
            resetGame();
        }, 1300);
        return;
    }

    clickable = false;

    setTimeout(() => {
        clicked[0].classList.remove('flipped');
        clicked[1].classList.remove('flipped');
        clicked = [];
        clickable = true;
    }, 500);
}

function startGame() {

    clickable = false;
    shuffle();

    for (let i = 0; i < total; i++) {
        const card = createCard(i);
        card.addEventListener('click', onClickCard);
        $wrapper.appendChild(card);
    }

    // 카드보여주기
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });

    // 카드 감추기
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.remove('flipped');
        });
        clickable = true;
        startTime = new Date();
    }, 5000);
}

startGame();

function resetGame() {
    $wrapper.innerHTML = '';
    colorCopy = colors.concat(colors);
    shuffled = [];
    completed = [];
    startGame();
}

/*
setTimeOut이 정확하지 않은 경우는 주로 timeout 시간 전에 코드가 많은경우
왜냐 setTimeout은 태스크 큐에서 호출 스택으로 넘어 갈 때 정해진 시간이 아닌
앞의 일이 끝나고 큐->스택으로 넘어가고 하는 방식이라 중간에 시간이 더 걸린다.
*/