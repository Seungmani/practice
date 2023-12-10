let turn = 'O';
const data = [];
for (let i = 0; i < 3; i++) {
    data.push([]); // 3*3 2차원 배열 만들기
}

const $table = document.createElement('table');
for (let i = 0; i < 3; i++) {
    const $tr = document.createElement('tr');
    $table.append($tr);
    for (let j = 0; j < 3; j++) {
        const $td = document.createElement('td');

        $td.addEventListener('click', (event) => {
            // 칸에 글자 중복 방지
            if (event.target.textContent) {
                return; // 함수 종료
            }

            // 칸에 O, X 찍기
            event.target.textContent = turn;
            if (turn === 'O') {
                turn = 'X';
            } else if (turn === 'X') {
                turn = 'O';
            }
        })

        $tr.append($td);
    }
}
document.body.append($table);