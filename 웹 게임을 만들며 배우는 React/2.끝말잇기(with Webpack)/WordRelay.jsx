const React = require('react');
const ReactDom = require('react-dom');

class WordRelay extends React.Component{
    state={
        word: "리액트",
        value: '',
        result : '',
    }

    onSubmitForm =(e) =>{
        e.preventDefault();
        if(this.state.word[this.state.word.length -1] === this.state.value[0]){
            this.setState({
                result: '통과',
                word: this.state.value,
                value : '',
            })
            this.input.focus();
        } else{
            this.setState({
                result: '땡',
                value : '',
            })
        }
    };

    onChangeInput= (e)=>{
        this.setState({value: e.target.value})
    };

    input;
    onRefInput= (c)=>{
        this.input=c;
    }

    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WordRelay;
