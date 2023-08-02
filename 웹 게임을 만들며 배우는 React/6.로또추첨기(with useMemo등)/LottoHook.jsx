import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getNumber(){
    const Numbers = Array(45).fill(0).map( (v,i) => i+1);
    const shuffle = [];
    
    while(Numbers.length>0){
        shuffle.push(Numbers.splice(Math.floor(Math.random() * Numbers.length),1)[0]);
    }

    const bonus = shuffle[shuffle.length-1];
    const win = shuffle.slice(0,6).sort((a,b) => a-b);
    return[...win, bonus];
}

const LottoHook = () =>{

    // useMemo를 통해 lotto번호 값을 기억하자
    const lottoNumbers = useMemo(() => getNumber(), []);

    const [answer , setAnswer] = useState(lottoNumbers);
    const [win, setWin] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeoutRef = useRef([]);

    useEffect(() =>{
        console.log('useEffect')
        // componentDidMount
        for(let i=0; i<answer.length-1; i++){
            timeoutRef.current[i] = setTimeout(() =>{
                setWin((prev) =>[...prev, answer[i]]);
            }, (i+1)*1000) // 1,2,3,4,5,6 초
        }
        timeoutRef.current[6] = setTimeout(() =>{
            setBonus(answer[6]);
            setRedo(true);
        },  7000);

        // componentWillUnmount
        return () =>{
            timeoutRef.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeoutRef.current]) // 조건이 맞으면 mount, update 수행
    // 배열에 요소가 있으면 componentDidMount, componentDidUpdate 둘 다 수행
    // win.length === 0을 하면 처음에서 length가 0이라 중복 실행이 발생

    const onClickRedo = useCallback(() =>{
        setAnswer(getNumber());
        setBonus(null);
        setRedo(false);
        setWin([]);
        timeoutRef.current=[];
    }, [answer]);
    // useCallback으로 감싸면 함수 컴포넌트는 항상 전체가 rendering되는데 이때 render를 막아줌
    // answer이 변경되면 실행


    return(
        <>
            <div>당첨 번호!</div>
            <div id='결과창'>
                {win.map((v)=> <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} onClick={onClickRedo}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
}

export default LottoHook;