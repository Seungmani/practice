import React, { Component } from 'react'

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

class RSP extends Component {

    state = {
        result: '',
        score: 0,
        imgCoord: rspCoords.바위,
    };

    interval;

    changeHand = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            })
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            })
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => () => {
        const {imgCoord} = this.state;
        clearInterval(this.interval); // 잠시 멈춤
        const myScore = scores[choice]; // 내선택
        const cpuScore = scores[computerChoice(imgCoord)]; // 컴퓨터 선택
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다.',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1,
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(()=>{
                    this.interval = setInterval(this.changeHand, 100);
        },2000)
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;