const React = require('react');
const { useState, useRef } = React;
const ReactDom = require('react-dom');

const ResponseCheckHook = () => {

    const [backColor, setBackColor] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeOut = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    onClickScreen = (e) => {
        if (backColor === "waiting") {
            setBackColor('ready');
            setMessage('초록색이 되면 클릭하세요')

            timeOut.current = setTimeout(() => {
                setBackColor('now');
                setMessage('클릭하세요');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000 + 2000))

        } else if (backColor === 'ready') {
            clearTimeout(timeOut.current);
            setBackColor('now');
            setMessage("참을성을 가지세요!!!")
        } else if (backColor === 'now') {
            endTime.current = new Date();
            setBackColor('waiting');
            setMessage("클릭해서 시작하세요");
            setResult((prev) => { 
                return [...prev, , endTime.current - startTime.current]
            });
        }
    }

    const onReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    };


    return (
        <>
            <div id="screen" className={backColor} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

module.exports = ResponseCheckHook;