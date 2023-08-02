import React, {Component} from 'react';
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

class Lotto extends Component{
    state= {
        answer : getNumber(), // 정답 번호
        win : [], // 정답 번호에서 앞 6개
        bonus : null, // 보너스
        redo : false // 재실행
    };

    timeouts=[];

    runTimeouts = () =>{
        const {answer} = this.state;
        for(let i=0; i<answer.length-1; i++){
            this.timeouts[i] = setTimeout(() =>{
                this.setState((prev) =>{
                    return {
                        win : [...prev.win, answer[i]],
                        }
                });
            }, (i+1)*1000) // 1,2,3,4,5,6 초
        }
        this.timeouts[6] =setTimeout(() =>{
            this.setState({
                bonus : answer[6],
                redo : true,
            })
        },  7000);
    }

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.win.length===0){ // redo 후 state 값들고 넣어도 된다. win이 빈 배열이 되어서 win으로 함
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) =>{
            clearTimeout(v);
        })
    }


    onClickRedo = () =>{
        this.setState({
            answer : getNumber(), // 정답 번호
            win : [], // 정답 번호에서 앞 6개
            bonus : null, // 보너스
            redo : false // 재실행
        });
        this.timeouts=[];

        // didUpdate를 써볼거임, didMount 부분을 복붙해도 상관없음
    }

    render(){
        const {win, bonus, redo} = this.state;
        return(
            <>
                <div>당첨 번호!</div>
                <div id='결과창'>
                    {win.map((v)=> <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        )
    }
}

export default Lotto;