import React, { useState, useReducer, useCallback, useEffect } from "react";
import Table from "./Table";

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER' // 액션의 이름은 상수로 빼자
export const CLICK_CELL = 'CLICK_CELL' 
export const CHANGE_TURN = 'CHANGE_TURN' 
export const RESET_GAME = 'RESET_GAME' 

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state, winner: action.winner, // state.winner = action.winner 같이 직접 변경 x
            };

        case CLICK_CELL: {
            const tableData = [...state.tableData]; // 불변성을 지키기위해 얕은 복사
            tableData[action.row] = [...tableData[action.row]]; // immer을 통해 가독성 해결
            tableData[action.row][action.cell] = state.turn; // immer을 통해 가독성 해결
            return {
                ...state, tableData, recentCell: [action.row, action.cell]
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    // const [winner, setWinner] = useState(''); // 승리한 사람
    // const [turn, setTurn] = useState('O'); // 순서
    // const [tableData, setTableDate] = useState([['','','']['','','']['','','']]); // 3x3 배열
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    useEffect(() => {
        const [row, cell] = recentCell;

        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }

        if (win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true; // all이 true면 무승부라는 뜻
            tableData.forEach((row) => { // 무승부 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: SET_WINNER, winner: null });
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);


    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;