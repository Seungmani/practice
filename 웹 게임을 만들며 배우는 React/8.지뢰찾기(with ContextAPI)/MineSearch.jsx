import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => { },
}); // 기본 값 설정

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });// 칸

    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    } // 칸을 섞어서 지뢰가 들어갈 칸을 입력

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    } // 2차원 배열

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    } // 지뢰 심기

    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: // 시작 버튼 글릭
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
            };
        case OPEN_CELL: { // 칸 열기
            const tableData = [...state.tableData]; // 불변성을 지키기위해 얕은 복사
            tableData.forEach((row, i) => {
                tableData[i] = [...row]; // 모든 칸을 새로운 객체로 생성
            });
            const checked = [];
            // 이미 검사한 칸을 기억
            // 만약 검사한 칸을 기억하지 않으면 콜스택이 터짐
            // [1][2] 1번에서 검사를 해서 2번으로 넘어갔는데 2번이 또 1번이 빈칸이라 1번으로 검사를 넘기면 무한 반복

            let openedCount = 0; // 종료확인을 위한 열린 칸 확인

            // 내 기준 주변 칸을 검사하는 함수, 빈 칸일 경우에만 실행
            const checkAround = (row, cell) => {

                // 상하좌우 없는칸은 안 열기
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                }

                // 닫힌 칸만 열기
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }

                // 한 번 연칸은 무시하기, Maximum call Stack 방지
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }

                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];
                // 주변 검색 후 지뢰 수 알려주기
                // 양 옆 2칸 넣고 시작, js 특성상 row가 없으면 error가 발생, cell이 없으면 값이 undefined가 되는데 filter가 undefined를 걸러줌

                // 윗 줄이 존재하면 3개를 합침
                if (tableData[row - 1]) {
                    around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
                }

                // 아래 줄이 존재하면 3개를 합침
                if (tableData[row + 1]) {
                    around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;

                // 재귀로 빈칸을 다 열어주기
                if (count === 0) { // 주변칸 오픈
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]); // 다시 주변의 주변을 확인
                            }
                        })
                    }
                }
                if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };
            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';

            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE: { // 폭탄 클릭
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true, // 게임을 멈춤
            };
        }

        // 빈칸 -> 깃발
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }

        // 깃발 -> 물음표
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }

        // 물음표 -> 빈칸
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;