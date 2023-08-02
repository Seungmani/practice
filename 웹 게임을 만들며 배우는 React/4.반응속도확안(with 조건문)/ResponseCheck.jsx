const React = require('react');
const ReactDom = require('react-dom');

class ResponseCheck extends React.Component {
    state = {
        backColor: 'waiting', // 배경색
        message: '클릭해서 시작하세요',
        result: [], // 결과 모음
    };

    timeOut;
    startTime;
    endTime;

    onClickScreen = (e) => {
        const {backColor, message, result} = this.state;
        if(backColor === "waiting"){
            this.setState({
                backColor : "ready",
                message : "초록색이 되면 클릭하세요",
            });
            this.timeOut = setTimeout(()=>{
                this.setState({
                    backColor:'now',
                    message : "클릭하세요",
                });
                this.startTime = new Date();
            }, Math.floor(Math.random()*1000 + 2000)) // 2~3초 사이
        } else if(backColor === 'ready'){
            this.setState({
                backColor : 'waiting',
                message : "참을성을 가지세요!!!",
            })
            clearTimeout(this.timeOut);
        } else if(backColor === 'now'){
            this.endTime = new Date();
            this.setState( (prevState) => {
                return{
                    backColor : 'waiting',
                    message : "클릭해서 시작하세요",
                    result : [...prevState.result, this.endTime-this.startTime]
                }
            })
        }
    }

    onReset = ()=>{
        this.setState({
            result : []
        })
    }

    // 삼항연산자로 값이 없으면 평균시간을 안보여줌
    renderAverage = () => {
        const { result } = this.state;
        return this.state.result.length !== 0 && 
        <>
            <div>평균시간: {this.state.result.reduce((a, c) => a + c, 0) / this.state.result.length}ms</div>
            <button onClick={this.onReset}>초기화</button>
        </>
    }

    render() {
        const { backColor, message } = this.state;
        return (
            <>
                <div id="screen" className={backColor} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

module.exports = ResponseCheck;