import React, { useState, useRef, useEffect } from 'react'

// 가위 바위 보
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

//점수
const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
};


const RSPHook = () =>{
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(changeHand,100); //componentDidMount
        return() => { // componentWillUnmount
            clearInterval(interval.current);
        }
    },[imgCoord]); // 배열에 바뀌는 state, 여기서는 imgCoord를 넣어줘야 여러번 실행

    const changeHand = () =>{
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current); // 잠시 멈춤
        const myScore = scores[choice]; // 내선택
        const cpuScore = scores[computerChoice(imgCoord)]; // 컴퓨터 선택
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다.');
            setScore((prev)=>{prev+1})
        } else {
            setResult('졌습니다.');
            setScore((prev)=>{prev-1})
        }
        setTimeout(()=>{
            interval.current = setInterval(changeHand, 100);
        },1000)
    };

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSPHook;