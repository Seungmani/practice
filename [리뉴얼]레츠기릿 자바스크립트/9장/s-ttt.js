const { body } = document; // 위를 옆처럼 요약가능

const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

const checkWin = (target) => {

    const rowI = target.parentNode.rowIndex;
    const colI = target.cellIndex;

    // 확인
    let hasWin = false;
    // 가로
    if (rows[rowI][0].textContent === turn && rows[rowI][1].textContent === turn && rows[rowI][2].textContent === turn) {
        hasWin = true;
    }
    // 세로
    if (rows[0][colI].textContent === turn && rows[1][colI].textContent === turn && rows[2][colI].textContent === turn) {
        hasWin = true;
    }
    // 대각
    if (rows[0][0].textContent === turn && rows[1][1].textContent === turn && rows[2][2].textContent === turn) {
        hasWin = true;
    }
    if (rows[0][2].textContent === turn && rows[1][1].textContent === turn && rows[2][0].textContent === turn) {
        hasWin = true;
    }

    return hasWin;
};

const checkwin_draw = (target) => {
    if (checkWin(target)) {
        $result.textContent = `${turn}님의 승리`;
        $table.removeEventListener('click', check); // 결과가 나와도 계속 클릭되는 걸 막아줌
        return;
    }
    // 무승부 확인
    let draw = rows.flat().every((cell) => cell.textContents); //cell은 매개변수

    if (draw) {
        $result.textContent = '무승부';
        return;
    }
    turn = turn === 'X' ? 'O' : 'X';
};

let clickable = true;
const check = (event) => {

    if (!clickable) {
        return;
    }

    if (event.target.textContent) {
        alert("이미 채워진 칸 입니다.")
        return;
    }
    event.target.textContent = turn;

    // 결과 확인
    checkwin_draw(event.target);

    // 컴퓨터가 자동으로 빈칸에 적용
    if (turn === 'X') {
        const emptycell = rows.flat().filter((v) => !v.textContent);
        const randomcell = emptycell[Math.floor(Math.random() * emptycell.length)];
        clickable = false;
        setTimeout(() => {
            randomcell.textContent = 'X';
            checkwin_draw(randomcell);
            clickable = true;
        }, 1000);
    }
};

for (let i = 0; i < 3; i++) {
    const $tr = document.createElement('tr');
    const cells = [];
    $table.append($tr);

    for (let j = 0; j < 3; j++) {
        const $td = document.createElement('td');
        cells.push($td);
        $tr.append($td);
    }
    rows.push(cells);
}
$table.addEventListener('click', check);
body.append($table);
body.append($result);