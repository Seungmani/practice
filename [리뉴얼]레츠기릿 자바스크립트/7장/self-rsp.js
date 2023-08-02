const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $scissors = document.querySelector('#scissors');
const $rock = document.querySelector('#rock');
const $paper = document.querySelector('#paper');

const IMG_URL = './rsp.png';

$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = 'auto 200px';

// rsp.png에서 가위 바위 보 위치
const rspX = {
    scissors: '0', // 가위
    rock: '-220px', // 바위
    paper: '-440px', // 보
}

let computerChoice = 'rock';
const change = () => {
    if (computerChoice === 'scissors') {
        computerChoice = 'rock';
    } else if (computerChoice === 'rock') {
        computerChoice = 'paper';
    } else if (computerChoice === 'paper') {
        computerChoice = 'scissors';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = 'auto 200px';
}

let intervalID = setInterval(change, 50);
let clickable = true;
let score_com = 0;
let score_me = 0;

const scoreTable = {
    rock: 0,
    scissors: 1,
    paper: -1,
}


const clickBtn = () => {
    if (clickable) {
        clearInterval(intervalID);

        clickable = false;

        const mychoice = event.target.textContent === '바위'
            ? 'rock' : event.target.textContent === '가위'
                ? 'scissors' : 'paper';

        const myscore = scoreTable[mychoice];
        const computerScore = scoreTable[computerChoice];
        const diff = myscore - computerScore;

        let message;

        if ([2, -1].includes(diff)) {
            score_me += 1;
            message = '승리!';
        } else if ([-2, 1].includes(diff)) {
            score_com += 1;
            message = '패배!';
        } else {
            message = '무승부!';
        }

        if (score_me >= 3) {
            $score.textContent = `나의 승리 ${score_me} : ${score_com}`;
        } else if (score_com >= 3) {
            $score.textContent = `컴퓨터의 승리 ${score_com} : ${score_me}`;
        } else {
            $score.textContent = `${message} ${score_me} : ${score_com}`;
            setTimeout(() => {
                clickable = true;
                intervalID = setInterval(change, 50);
            }, 1000);
        }
    }
};

$paper.addEventListener('click', clickBtn);
$rock.addEventListener('click', clickBtn);
$scissors.addEventListener('click', clickBtn);

