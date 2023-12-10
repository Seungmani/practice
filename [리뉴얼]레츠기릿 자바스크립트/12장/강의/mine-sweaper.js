const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
const $timer = document.querySelector('#timer');
const $form = document.querySelector('#form');
let row;  // 줄
let cell; // 칸
let mine; // 지뢰 수

const CODE = {
    normal: -1, // 닫힌 칸, 지뢰 없음
    question: -2,
    flag: -3,
    question_mine: -4,
    flag_mine: -5,
    mine: -6,
    opened: 0, // 0 이상이면 다 열린 칸
}

let data;
let openCount;
let startTime;
let interval;
let firstClick = ture; // 첫 클릭이면 지뢰가 안나오게

function onSubmit(event) {
    event.preventDefault();
    row = parseInt(event.target.row.value); // event.target는 form임 .뒤에 id값을 적으면 form 내부의 id값에서 받아옴
    cell = parseInt(event.target.cell.value);
    mine = parseInt(event.target.mine.value);
    openCount = 0;
    $tbody.innerHTML = '';
    clearInterval(interval);
    drawTable();
    startTime = new Date();
    interval = setInterval(() => {
        const time = Math.floor((new Date() - startTime) / 1000);
        $timer.textContent = `${time}초`;
    }, 1000);
}

$form.addEventListener('submit', onSubmit);

function plantMine() {
    // 지뢰 번호 뽑기
    const candidate = Array(row * cell).fill().map((arr, i) => { return i });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    // 지뢰 없는 배열 만들기
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.normal);
        }
    }

    // 지뢰 넣기
    for (let k = 0; k < shuffle.length; k++) {
        let x = Math.floor(shuffle[k] / cell);
        let y = shuffle[k] % cell;
        data[x][y] = CODE.mine;
    }

    return data;
}

// 우클릭 이벤트
function onRightClick(event) {
    event.preventDefault();
    const target = event.target; // td
    const rowIndex = target.parentNode.rowIndex; // tr
    const cellIndex = target.cellIndex; // td
    const cellData = data[rowIndex][cellIndex];

    if (cellData === CODE.mine) { // 지뢰면
        data[rowIndex][cellIndex] = CODE.question_mine; // 물음표 지뢰로
        target.className = 'question';
        target.textContent = '?';
    } else if (cellData === CODE.question_mine) { // 물음표 지뢰면
        data[rowIndex][cellIndex] = CODE.flag_mine; // 깃발 지뢰로
        target.className = 'flag';
        target.textContent = '!';
    } else if (cellData === CODE.flag_mine) { // 깃발 지뢰면
        data[rowIndex][cellIndex] = CODE.mine; // 지뢰로
        target.className = '';
        // target.textContent = 'x';
    } else if (cellData === CODE.normal) { // 닫힌 칸이면
        data[rowIndex][cellIndex] = CODE.question; // 물음표로
        target.className = 'question';
        target.textContent = '?';
    } else if (cellData === CODE.question) { // 물음표면
        data[rowIndex][cellIndex] = CODE.flag; // 깃발로
        target.className = 'flag';
        target.textContent = '!';
    } else if (cellData === CODE.flag) { // 깃발이면
        data[rowIndex][cellIndex] = CODE.normal; // 닫힌 칸으로
        target.className = '';
        target.textContent = '';
    }
}

// 1 2 3
// 4 5 6
// 7 8 9

function countMine(rowIndex, cellIndex) {
    const mines = [CODE.mine, CODE.question_mine, CODE.flag_mine];
    let i = 0;
    mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++; // 1번칸, 앞의 조건이 맞으면 뒤를 실행
    mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++; // 2번칸
    mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++; // 3번칸
    mines.includes(data[rowIndex]?.[cellIndex - 1]) && i++; // 4번칸
    mines.includes(data[rowIndex]?.[cellIndex + 1]) && i++; //6번칸
    mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++; // 7번칸
    mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++; // 8번칸
    mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++; // 9번칸
    return i;
}

function open(rowIndex, cellIndex) {
    if (data[rowIndex]?.[cellIndex] >= CODE.opened) { return; } // 칸을 열면 주변 빈 칸의 수가 입력되어 0보다 크거나 같은 값임, 그런 경우는 넘겨라
    const target = $tbody.children[rowIndex]?.children[cellIndex];
    if (!target) {
        return;
    }
    const count = countMine(rowIndex, cellIndex);
    target.textContent = count || '';
    target.className = 'opened';
    data[rowIndex][cellIndex] = count;
    openCount++;

    if (openCount === row * cell - mine) {
        const time = (new Date() - startTime) / 1000;
        clearInterval(interval); // timer 멈추는 코드
        $tbody.removeEventListener('contextmenu', onRightClick);
        $tbody.removeEventListener('click', onLeftClick);
        setTimeout(() => { // setTimeout은 화면과 alert에 시간 차를 두기 위해 설정
            alert(`승리! ${time}초가 걸렸습니다.`)
        }, 100);
    }

    return count;
}

function openAround(rI, cI) {
    setTimeout(() => {
        const count = open(rI, cI);
        if (count === 0) {
            openAround(rI - 1, cI - 1);
            openAround(rI - 1, cI);
            openAround(rI - 1, cI + 1);
            openAround(rI, cI - 1);
            openAround(rI, cI + 1);
            openAround(rI + 1, cI - 1);
            openAround(rI + 1, cI);
            openAround(rI + 1, cI + 1);
        }
    }, 0);
}


let normalCellFound = false;
function transferMine(rI, cI) {
    if (normalCellFound) return; // 빈칸을 찾으면 종료
    if (rI < 0 || cI >= row || cI < 0 || cI >= cell) return;
    if (searched[rI][cI]) return;
    if (data[rI][cI]===CODE.normal) { // 빈칸인 겨우
        normalCellFound = true;
        data[rI][cI] = CODE.mine;
    } else {
        searched[rI][cI] = true;
        transferMine(rI - 1, cI - 1);
        transferMine(rI - 1, cI);
        transferMine(rI - 1, cI + 1);
        transferMine(rI, cI - 1);
        transferMine(rI, cI + 1);
        transferMine(rI + 1, cI - 1);
        transferMine(rI + 1, cI);
        transferMine(rI + 1, cI + 1);
    }
}

function showMines(){
    const mines=[CODE.mine, CODE.question_mine, CODE.flag_mine];
    data.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) =>{
            if(mines.includes(cell)){
                $tbody.children[rowIndex].children[cellIndex].textContent = 'X';
            }
        });
    });
}

function onLeftClick(event) {
    const target = event.target; // td 태그겠죠?
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];

    if (firstClick) {
        firstClick = false;
        searched = Array(row).fill().map(() => []);
        if (cellData === CODE.mine) { // 첫 클릭이 지뢰면
            transferMine(rowIndex, cellIndex); // 지뢰 이동
            data[rowIndex][cellIndex] = CODE.normal; // 클릭 칸을 빈칸으로 변경
            cellData = CODE.normal;
        }
    }

    if (cellData === CODE.normal) { // 닫힌 칸이면
        openAround(rowIndex, cellIndex);
    } else if (cellData === CODE.mine) { // 지뢰 칸이면
        showMines();
        target.textContent = '펑';
        target.className = 'opened';
        clearInterval(interval);
        $tbody.removeEventListener('contextmenu', onRightClick);
        $tbody.removeEventListener('click', onLeftClick);
    } // 나머지는 무시
}


function drawTable() {
    data = plantMine();
    data.forEach((row) => {
        const $tr = document.createElement('tr');
        row.forEach((cell) => {
            const $td = document.createElement('td');
            if (cell === CODE.mine) {
                // $td.textContent = 'X'; // 개발 편의를 위해 지뢰 위치 보여줌 
            }
            $tr.append($td);
        });
        $tbody.append($tr);
        $tbody.addEventListener('contextmenu', onRightClick);
        $tbody.addEventListener('click', onLeftClick);
    });
}

// optional chaining
// ?.
// arr[0][0]일 경우 arr[-1][-1]은 error인데 이유는 arr[-1]이 undefined라 undefined[-1]이 되어 error다.
// if(arr[-1]) { arr[-1][-1]} 로 해결가능
// 위 코드를 줄이면 arr[-1]?.[-1] // 즉, arr[-1]이 있으면 뒤를 실행
// 객체는 ?만, 배열은 ?.

// ||
// target.textContent = count || ''; // count있으면 count 없으면 '', 즉 count가 0이면 ''

// ?? nullish coalescing
// js에서 0은 false로 인식, ??(nullish coalescing)을 사용하면 null과 undefined만 false로인식
// target.textContent = count ?? ''; // 0도 인식해서 입력

// 논리연산자
// && 는 앞의 값이 true면 뒤의 결과를 따르고 앞의 값이 false면 앞의 값을 따른다
// (5>3) && (3<1) => false
// (5>3) && (3>1) => true
// (5<3) && (3>1) => false
// (5<3) && (3>1) => false
// 0 ?? '' => 0
// null ?? '' => ''
// || 는 앞의 값이 true면 앞의 결과를 따르고 앞의 값이 false면 뒤의 값을 따른다
// (5>3) && (3<1) => true
// (5>3) && (3>1) => true
// (5<3) && (3>1) => frue
// (5<3) && (3>1) => false
// 0 || '' => ''
// 3 || '' => 3


// function openAround(rI, cI){
//     const count = open(rI, cI);
//     if(count===0){
//         openAround(rI-1, cI-1);
//         openAround(rI-1, cI);
//         openAround(rI-1, cI+1);
//         openAround(rI, cI-1);
//         openAround(rI, cI+1);
//         openAround(rI+1, cI-1);
//         openAround(rI+1, cI);
//         openAround(rI+1, cI+1);
//     }
// }
// Maximum call stack size exceeded 문제 발생, 재귀의 단점임
// 호출스택의 크기가 벗어난 경우임
// 이 코드에서는 5번을 눌러서 주변이 열림 다시 6으로가면 6주변이 열리는 데 이때 이미 열린 5번이 또 열림 -> 반복 그래서 호출스택이 터짐 그리고 느림
// 1 2 3
// 4 5 6
// 7 8 9


// 호출 스택(call stack)의 크기 확인 방법
// let i=0;
// function recurse(){
//     i++;
//     recurse();
// }
// try {
//     recurse();
// } catch(ex){
//     alert(`최대 크기기는 ` + i + `\nerror : ` + ex);
// }

// 호출 스택을 백그라운드, 태스크 큐로 분산하여 해결, setTimeout 사용
// 속도 해결 => 이미 연칸은 안 열면 된다.