const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
let timeoutID;
const records = []; // 기록의 집합

$screen.addEventListener('click', (event) => {
    if (event.target.classList.contains('waiting')) { // 파랑
        $screen.classList.remove('waiting');
        $screen.classList.add('ready');
        $screen.textContent = "초록색이 되면 클릭하세요";

        timeoutId = setTimeout(function () {
            $screen.classList.replace('ready', 'now');
            $screen.textContent = "클릭하세요!!";

            // 시간 측정 시작
            startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2000 ~ 3000, 2~3초

    } else if (event.target.classList.contains('ready')) { // 빨강

        clearTimeout(timeoutID);
        $screen.classList.remove('ready');
        $screen.classList.add('waiting');
        $screen.textContent = "너무 성급";

    } else if (event.target.classList.contains('now')) { // 초록
        // 시간 측정 끝
        endTime = new Date();

        const current = endTime - startTime;
        records.push(current);

        const average = records.reduce((a, c) => a + c) / records.length;
        $result.textContent = `${current}ms, 평균 : ${average}ms`;

        const ranks = records.sort((p, c) => p - c).slice(0, 5);
        ranks.forEach((top, index) => {
            $result.append(
                document.createElement('br'),
                `${index + 1}위 : ${top}ms`,
            );
        });

        startTime = null;
        endTime = null;

        $screen.classList.replace('now', 'waiting');
        $screen.textContent = "클릭해서 시작하세요";
    }
});