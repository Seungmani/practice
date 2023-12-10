const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $life = document.querySelector('#life');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');

const holes = new Array(9).fill(0);
let started = false;
let score = 0;
let time = 60;
let life = 3;
let timerId
let tickId

$start.addEventListener('click', () => {
    if (started) {
        return
    };
    started = true;
    console.log("시작");
    timerId = setInterval(() => {
        time = (time * 10 - 1) / 10;
        $timer.textContent = time;
        if (time === 0) {
            setTimeout(() => {
                clearInterval(timerId);
                clearInterval(tickId);
                alert(`게임 끝! 점수는 ${score}점`);
            }, 50);
        }
    }, 100);
    tickId = setInterval(tick, 1000); // 밑의 tick 실행 후 1초마다 tick이 실행
    tick();
})
// 이벤트루프에 걸려서 안됨 => 우리는 올라가는데 1초 내려가는데 1초 총 2초인데 setInterval이 1초로 설정이라 오류
// if(hole)을 이용 멈춰줌, timer return은 무조건 0보다 큼 === holes[index] 값이 0보다 컸다가 커짐 => setTimeout이 2초마다 실행됨

let gopherPercent = 0.3; // 두더지 확률
let bompPercent = 0.5; // 폭탄 확률

function tick() {
    holes.forEach((hole, index) => {
        if (hole) {
            return;
        }
        const ramdomValue = Math.random();
        if (ramdomValue < gopherPercent) {
            const $gopher = $$cells[index].querySelector('.gopher');
            holes[index] = setTimeout(() => {
                $gopher.classList.add('hidden');
                holes[index] = 0;
            }, 1000);
            $gopher.classList.remove('hidden');
        } else if (ramdomValue < bompPercent) {
            const $bomb = $$cells[index].querySelector('.bomb');
            holes[index] = setTimeout(() => {
                $bomb.classList.add('hidden');
                holes[index] = 0;
            }, 1000);
            $bomb.classList.remove('hidden');
        }
    });
}
// setTimeout은 비동기라서 이벤트 루프로 들어가 $gopher.classList.remove('hidden');이 먼저 실행 후 setTimeout 실행

$$cells.forEach(($cell, index) => {
    $cell.querySelector('.gopher').addEventListener('click', (event) => {
        if (!event.target.classList.contains('dead')) { // 죽은 두더지는 클릭해도 점수를 안준다.
            score += 1;
            $score.textContent = score;
        }
        event.target.classList.add('dead');
        event.target.classList.add('hidden');
        clearTimeout(holes[index]);
        setTimeout(() => {
            holes[index] = 0;
            event.target.classList.remove('dead');
        }, 1000);
    });
    $cell.querySelector('.bomb').addEventListener('click', (event) => {
        event.target.classList.add('boom');
        event.target.classList.add('hidden');
        clearTimeout(holes[index]);
        setTimeout(() => {
            holes[index] = 0;
            event.target.classList.remove('boom');
        }, 1000);
        life--;
        $life.textContent = life;
        if (life === 0) {
            clearInterval(timerId);
            clearInterval(tickId);
            setTimeout(() => {
                alert(`게임 오버! 점수는 ${score}`);
            }, 50);
        }
    });
})