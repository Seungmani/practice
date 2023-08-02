const $table = document.querySelector('#table');
const $score = document.querySelector('#score');
const $back = document.querySelector('#back');

let data = [];
const history=[]; // 데이터들을 저장;

// tebla > fragment > tr > td
function startGame() {
    const $fragment = document.createDocumentFragment(); // 성능이 좋다, 화면에 저장이 아닌 메모리에 저정 후 한번에 그려줌
    [1, 2, 3, 4].forEach(function () {
        const rowData = [];
        data.push(rowData);
        const $tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(() => {
            rowData.push(0);
            const $td = document.createElement('td');
            $tr.appendChild($td);
        })
        $fragment.appendChild($tr);
    });
    $table.appendChild($fragment);
    // [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    putRandom2();
    draw();
}

// 테이블은 그리고 랜덤한 위치에 2를 넣는다.
function putRandom2() {
    const emptyCell = [];
    data.forEach(function (rowData, i) {
        rowData.forEach(function (cellData, j) {
            if (!cellData) {
                emptyCell.push([i, j]);
            }
        });
    });

    const randomCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; // [i,j]
    data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
            const $target = $table.children[i].children[j];
            if (cellData > 0) {
                $target.textContent = cellData;
                $target.className = 'color-' + cellData;
            } else {
                $target.textContent = '';
                $target.className = '';
            }
        });
    });
}

startGame();

function moveCells(direction) {
    history.push({
     table : JSON.parse(JSON.stringify(data)), // 깊은복사로 완전히 다른 데이터로 인식 but 성능
     score : $score.textContent,
    });
    switch (direction) {
        case 'left': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if (cellData) {
                        const currentRow = newData[i];
                        const prevData = currentRow[currentRow.length - 1];
                        if (prevData === cellData) { // 이전 데이터와 현재 데이터가 같으면
                            const score = parseInt($score.textContent);
                            $score.textContent = score + currentRow[currentRow.length - 1] *2;
                            currentRow[currentRow.length - 1] *= -2;
                            // [2,2,4,8] 은 2,2=> 4,4=> 8,8, 16이 나와서 이를 해결하기 위해
                            // -2를 곱해 2,2 => -4로 만들어 4와 구분
                        } else {
                            newData[i].push(cellData);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach((rowData, i) => {
                [1, 2, 3, 4].forEach((cellData, j) => {
                    data[i][j] = Math.abs(newData[i][j]) || 0;
                });
            });
            break;
        }
        case 'right': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if (rowData[3 - j]) {
                        const currentRow = newData[i]
                        const prevData = currentRow[currentRow.length - 1];
                        if (prevData === rowData[3 - j]) {
                            const score = parseInt($score.textContent);
                            $score.textContent = score + currentRow[currentRow.length - 1] *2;
                            currentRow[currentRow.length - 1] *= -2;
                        } else {
                            newData[i].push(rowData[3 - j]);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach((rowData, i) => {
                [1, 2, 3, 4].forEach((cellData, j) => {
                    data[i][3 - j] = Math.abs(newData[i][j]) || 0;
                });
            });
            break;
        }
        case 'up': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if (cellData) {
                        const currentRow = newData[j];
                        const prevData = currentRow[currentRow.length - 1];
                        if (prevData === cellData) { // 이전 데이터와 현재 데이터가 같으면
                            const score = parseInt($score.textContent);
                            $score.textContent = score + currentRow[currentRow.length - 1] *2;
                            currentRow[currentRow.length - 1] *= -2;
                            // [2,2,4,8] 은 2,2=> 4,4=> 8,8, 16이 나와서 이를 해결하기 위해
                            // -2를 곱해 2,2 => -4로 만들어 4와 구분
                        } else {
                            newData[j].push(cellData);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach((rowData, i) => {
                [1, 2, 3, 4].forEach((cellData, j) => {
                    data[j][i] = Math.abs(newData[j][i]) || 0;
                });
            });
            break;
        }
        case 'down': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if (data[3 - i][j]) {
                        const currentRow = newData[j];
                        const prevData = currentRow[currentRow.length - 1];
                        if (prevData === data[3 - i][j]) {
                            const score = parseInt($score.textContent);
                            $score.textContent = score + currentRow[currentRow.length - 1] *2;
                            currentRow[currentRow.length - 1] *= -2;
                        } else {
                            newData[j].push(data[3 - i][j]);
                        }
                    }
                });
            });
            [1, 2, 3, 4].forEach((cellData, i) => {
                [1, 2, 3, 4].forEach((rowData, j) => {
                    data[3 - j][i] = Math.abs(newData[i][j]) || 0;
                });
            });
            break;
        }
    }
    if(data.flat().includes(2048)){
        draw();
        setTimeout(()=>{
            alert('축하합니다~ 2048을 만들었습니다');
        },100)
    }else if(!data.flat().includes(0)){ // 빈 칸이 없으면
        alert('패배...');
    } else{
        putRandom2();
        draw();
    }
}

window.addEventListener('keyup', (event) => {
    if (event.key === "ArrowUp") {
        moveCells('up');
    } else if (event.key === "ArrowDown") {
        moveCells('down');
    } else if (event.key === "ArrowLeft") {
        moveCells('left');
    } else if (event.key === "ArrowRight") {
        moveCells('right');
    }
});

function mousecells(direction) { }

let startCoord;
window.addEventListener('mousedown', (event) => {
    // 마우스를 클릭했을때 좌표
    startCoord = [event.clientX, event.clientY];
})
window.addEventListener('mouseup', (event) => {
    const endCoord = [event.clientX, event.clientY];
    const diffX = endCoord[0] - startCoord[0];
    const diffY = endCoord[1] - startCoord[1];

    if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
        // 좌로 이동
        mousecells('left');
    } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
        // 우로 이동
        mousecells('right');
    } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
        // dnl로 이동
        mousecells('up');
    } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
        // dnl로 이동
        mousecells('down');
    }
})

// 되돌리기
$back.addEventListener('click', () =>{
    const prevData = history.pop();
    if(!prevData){
        return;
    } 
    $score.textContent = prevData.score;
    data=prevData.table;
    draw();
})


// // 마우스 키보드 이벤트
// window.addEventListener('keydown', (event) => {
//     // 키보드를 누를 때
//     console.log('keydown', event);
// })
// window.addEventListener('keyup', (event) => {
//     // 키보드를 땔 때
//     console.log('keyup', event);
// })
// window.addEventListener('mousedown', (event) => {
//     // 마우스를 클릭할 때
//     console.log('mousedown', event);
// })
// window.addEventListener('mousemove', (event) => {
//     // 마우스를 이동할 때
//     console.log('mousemove', event);
// })

// lientX, clientY는 현재 브라우저 페이지 내에서의 x, y좌표를 가리킵니다(픽셀 단위).
// pageX와 pageY도 브라우저 페이지 내에서의 x, y좌표를 가리키지만, 스크롤이 있으면 스크롤한 픽셀 값까지 포함한다는 점이 clientX, clientY와 다릅니다.

// offsetX와 offsetY는 이벤트를 연결한 대상을 기준으로 마우스의 x, y좌표를 가져옵니다.
// 지금은 window에 이벤트를 걸어서 clientX, clientY와 동일하지만, 페이지 내의 다른 태그에 마우스 이벤트를 걸면 해당 태그의 왼쪽 모서리 좌표가 0이 됩니다. screenX와 screenY는 모니터를 기준으로 잡아서 모니터의 왼쪽 모서리가 0이 됩니다.

// movementX와 movementY는 지난 mousemove 이벤트와 비교해 얼마나 마우스를 움직였는지 표시합니다. 따라서 mousemove 이벤트인 경우에만 실제 값이 잡힙니다.

// window.addEventListener('mouseup', (event) => {
//     // 마우스를 클릭하고 땔 때
//     console.log('mouseup', event);
// })

