// custom hook
// const interval = useRef();

// useEffect(() => {
//     interval.current = setInterval(changeHand,100); //componentDidMount
//     return() => { // componentWillUnmount
//         clearInterval(interval.current);
//     }
// },[imgCoord]); // 배열에 바뀌는 state, 여기서는 imgCoord를 넣어줘야 여러번 실행

// 위 코드를 변경

// useInterval(() => {},1000) 으로 사용가능

import {useRef, useEffect} from 'react';

function useInterval (callback, delay){
    const savedCallback = useRef();

    useEffect(() =>{
        savedCallback.current = callback;
    })

    useEffect(() =>{
        function tick(){
            savedCallback.current();
        }

        if(delay !== null){
            let id =setInterval(tick, delay);
            return () => clearInterval(id); // null이면 실행
        }
    }, [delay]);

    return savedCallback.current;
}

export default useInterval;
