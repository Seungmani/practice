    // 구조분해 //
    // 객체의 속성과 객체의 변수명이 같을 떄 사용
    // const body = document.body == const {body} = document

    // 배열 사용
    // const arr=[1,2,3,4,5];
    // const one = arr[0];
    // const two = arr[1]; 
    // const three = arr[2];
    // const four = arr[3];
    // const five = arr[4];
    // -> const [one, two, three, four, five] = arr;
    // -> const [one, , three, , five] = arr; // one, three, five만 만들어줌


    // 객체 사용법

    // const obj = {a:'hello', b : {c : 'hi', d :{ e: 'wow'},},};
    // a,c,e만 가져옴
    // const a = obj.a;
    // const c = obj.b.c;
    // const e = obj.b.d.e;
    // const {a, b :{c , d:{e}}} = obj;

    // a,b,e 가져옴
    // const {a,b} =obj;
    // const {d:{e}} = b;

    // const body = document.body;
    const { body } = document; // 위를 옆처럼 요약가능

    const $table = document.createElement('table');
    const $result = document.createElement('div');
    const rows = [];
    let turn = 'O';

    const check = (event) => {
        // event.stopPropagation(); // 이벤트 버블링 현상을 막아줌
        if (event.target.textContent) {
            alert("이미 채워진 칸 입니다.")
            return;
        }
        event.target.textContent = turn;
 
        // 승자 확인
        if(checkWin(event.target)){
            $result.textContent = `${turn}님의 승리`;
            $table.removeEventListener('click', check); // 결과가 나와도 계속 클릭되는 걸 막아줌
            return;
        }
        // 무승부 확인
        let draw = rows.flat().every((cell)=>cell.textContents); //cell은 매개변수
        /*   
        let draw=true;  
        rows.forEach((row) =>{
            row.forEach((cell)=>{
                if(!cell.textContent){
                    draw=false;
                }
            });
        });
        */

        // every 1차원 배열의 모든게 통과해야 true 하나라도 불통이면 false
        // some은 every의 반대 하나라고 통과면 true
        // flat()은 차원을 낮춰줌, 그냥 []를 하나씩 제거
        // [[1,2,3,],[4,5,6],[7,8,9]] => [1,2,3,4,5,6,7,8,9]
        // [1,2,3, [[4,5,6], [7,8,9]]] => [1,2,3,[4,5,6], [7,8,9]]
        if(draw){
            $result.textContent = '무승부';
            return;
        }
        turn = turn ==='X' ? 'O' : 'X';

        /*
        if (turn === 'O') {
            turn = 'X';
        } else if (turn === 'X') {
            turn = 'O';
        }
        */
    }

    // rows
    // [
    //  [td,td,td],
    //  [td,td,td],
    //  [td,td,td],
    // ]

    const checkWin = (target) =>{
        /*
        let rowI;   // rowindex는 tr이 가지고 있음
        let colI; // td.cellIndex하면 알아서 column index를 return
        rows.forEach((row, ri) =>{
            row.forEach((cell, ci)=>{
                if(cell === target){
                    rowI=ri;
                    colI=ci;
                }
            });
        });
        */
        const rowI = target.parentNode.rowIndex;
        const colI = target.cellIndex;

        // 확인
        let hasWin = false;
        // 가로
        if( rows[rowI][0].textContent === turn && rows[rowI][1].textContent === turn && rows[rowI][2].textContent === turn){
            hasWin=true;
        }
        // 세로
        if( rows[0][colI].textContent === turn && rows[1][colI].textContent === turn && rows[2][colI].textContent === turn){
            hasWin=true;
        }
        // 대각
        if( rows[0][0].textContent === turn && rows[1][1].textContent === turn && rows[2][2].textContent === turn){
            hasWin=true;
        }
        if( rows[0][2].textContent === turn && rows[1][1].textContent === turn && rows[2][0].textContent === turn){
            hasWin=true;
        }

        return hasWin;
    }

    for (let i = 0; i < 3; i++) {
        const $tr = document.createElement('tr');
        const cells = [];
        $table.append($tr);

        for (let j = 0; j < 3; j++) {
            const $td = document.createElement('td');
            cells.push($td);
            //$td.addEventListener('click',check);
            $tr.append($td);
        }
        rows.push(cells);
    }
    $table.addEventListener('click',check); 
    // 이벤트 버블링을 이용 table에 event를 걸어도 자식에있는 td를 클릭하면 event.target이 td이지만 부모인 tr, table에도  이벤트가 걸림
    // if table 그 자체에 이벤트를 걸고싶으면 event.target -> event. currntTarget
    body.append($table);
    body.append($result);

    // 이벤트 캡쳐링은 부모를 클릭하면 자식으로 이벤트가 전달
    // $table.addEventListener('click',check, ,true); // 3번째 인자에 true를 주면 이벤트 캡쳐링 
    // 주로 팝업창을 만들고 팝업이 아닌 부분을 클릭 시 팝업창이 닫힐 때 사용