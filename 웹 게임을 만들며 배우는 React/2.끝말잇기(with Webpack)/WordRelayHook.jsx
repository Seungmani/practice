const React = require('react');
const { useState, useRef } = React;

const WordRelayHook = () => {
    const [word, setWord] = useState('리액트');
    // const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === e.target.children.word.value[0]) {
            setResult("통과");
            setWord(e.target.children.word.value);
            // setValue('');
            e.target.children.word.value='';
            inputRef.current.focus();
        } else {
            setResult("땡");
            //setValue('');
            e.target.children.word.value ='';
        }
    };

    // const onChangeInput = (e) => {
        // setValue(e.target.value)
    // }


    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                {/* <input ref={inputRef} value={value} onChange={onChangeInput} /> */}
                <input id="word" ref={inputRef} />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    )

}

module.exports = WordRelayHook;

// 컨트롤드 input
// value, onChange가 있는 input

// 언컨트롤드 input
// value, onChange가 없는 원시적인 input
// onSubmit에서만 동작하는 경우에 사용