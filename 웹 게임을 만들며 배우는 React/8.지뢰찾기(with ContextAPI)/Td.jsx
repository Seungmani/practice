import React, { memo, useContext, useCallback, useMemo } from "react";
import { CODE, OPEN_CELL, CLICK_MINE, TableContext, QUESTION_CELL, FLAG_CELL, NORMALIZE_CELL } from "./MineSearch";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        default:
            return {
                background: 'white',
            };
    }
}
const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
}

const Td = memo(({ rowIndex, cellIndex }) => {

    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClick = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL: // 빈칸 -> 깃발
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex })
                return;
            case CODE.FLAG: // 깃발 -> 물음표
            case CODE.FLAG_CELL:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex })
                return;
            case CODE.QUESTION: // 깃발 -> 물음표
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex })
                return;

            default:
                return;

        }
    }, [tableData[rowIndex][cellIndex], halted])

    // useMemo를 통해 Td는 렌더링이 되어도 return을 렌더링이 안된다. 깜빡거려도 실제 렌더링은 한번만 일어난다.
    return useMemo(() => (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd} onContextMenu={onRightClick}
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    ), [tableData[rowIndex][cellIndex], halted]);
    //return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});

// useMemo를 안하면 컴포넌트를 분리
// const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
//     console.log('real td rendered');
//     return (
//         <td
//             style={getTdStyle(data)}
//             onClick={onClickTd}
//             onContextMenu={onRightClickTd}
//         >{getTdText(data)}</td>
//     )
// });

export default Td;