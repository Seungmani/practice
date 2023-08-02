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
    // backgroud 랑 backgoundSize는 항상 세트로 적어야함, size의 초기화를 막기위해
    // rsp.computerChoice === rxp["computerChoice"], .은 문자열 computerChoice가 입력된 것
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = 'auto 200px';
}

let intervalID = setInterval(change, 50); //0.05초 마다 변경
let clickable = true;
let score = 0;
const scoreTable = {
    rock: 0,
    scissors: 1,
    paper: -1,
}

const clickBtn = () => {
    if (clickable) {// 3.
        // intervalID 의 setIntervel 삭제 === 잠시 멈춰서 결과 확인
        clearInterval(intervalID);
        // 2. $paper.removeEventListener('click', clickBtn);
        // 2. $rock.removeEventListener('click', clickBtn);
        // 2. $scissors.removeEventListener('click', clickBtn);
        clickable = false; //3. 

        const mychoice = event.target.textContent === '바위'
            ? 'rock' : event.target.textContent === '가위'
                ? 'scissors' : 'paper';

        const myscore = scoreTable[mychoice];
        const computerScore = scoreTable[computerChoice];
        const diff = myscore - computerScore;

        let message;

        if ([2, -1].includes(diff)) { // diff === 2 || diff === -1
            score += 1;
            message = '승리!';
        } else if ([-2, 1].includes(diff)) { // diff === -2 || diff ===1
            score += -1;
            message = '패배!';
        } else {
            message = '무승부!';
        }

        $score.textContent = `${message} 총 : ${score}점`;

        setTimeout(() => {
            // 1. clearInterval(intervalID); // 추가
            // 2. $paper.addEventListener('click', clickBtn);
            // 2. $rock.addEventListener('click', clickBtn);
            // 2. $scissors.addEventListener('click', clickBtn);
            clickable = true; //3.
            intervalID = setInterval(change, 50); // 1초뒤 다시 가위바위보 돌아가게
        }, 1000);
    } //3. 
};

$paper.addEventListener('click', clickBtn);
$rock.addEventListener('click', clickBtn);
$scissors.addEventListener('click', clickBtn);

    // 버튼을 빠르게 여러번 클릭하면 안멈추는 버그가 있다. 속도도 더 빨라짐
    // 버튼을 클릭하면 setTimeout이 여러번 호출되어서임
    // 버튼을 3번 클릭하염 인터벌 1번, 2번, 3번이 호출되는데 오버로딩을 해서 3번만 intervalID에 저장
    // 그래서 3번만 취소되고 1,2번은 계속 0.05초마다 실행
    // 1.clearInterval(intervalID);을 추가
    // 2.removeEventListener 사용
    // 3. flag 변수 사용
