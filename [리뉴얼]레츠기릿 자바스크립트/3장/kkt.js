// 참가인원
let member = Number(prompt("몇 명이 참가하나요?"));
if (number) { // 참가를 안 할때 -> null이라 false취급 , true면 코드를 실행
    alert("단어는 3글자여야 합니다. \n그 외의 규칙은 긑말잇기와 같습니다.")
    const start = confirm("시작하겠습니다.");

    // 태그들 변수로
    const $order = document.querySelector('#order');
    const $input = document.querySelector('input');
    const $button = document.querySelector('button');
    const $word = document.querySelector('#last-word');

    // 변수
    let l_word; // 마지막 입력 값
    let word; // 입력한 단어

    // 함수 시작
    $input.focus(); // 시작하면 바로 input에 입력 가능하게

    const onclick = () => {

        if (!l_word) {
            if (word.length === 3) {
                l_word = word;
                $word.textContent = l_word;
                const number = parseInt($order.textContent);
                if (number + 1 > member) {
                    $order.textContent = 1;
                }
                else {
                    $order.textContent = number + 1;
                }
            }
            else {
                alert("3글자가 아닙니다.");
                $input.value = '';// input 값을 초기화
                $input.focus();
            }
        }
        else {
            if (l_word[l_word.length - 1] === word[0] && word.length === 3) {
                l_word = word;
                $word.textContent = l_word;
                const number = parseInt($order.textContent);
                if (number + 1 > member) {
                    $order.textContent = 1;
                }
                else {
                    $order.textContent = number + 1;
                }
                $input.value = '';
                $input.focus();
            }
            else if (l_word[l_word.length - 1] === word[0] && word.length !== 3) {
                alert("3글자가 아닙니다. 탈락!");
                member = member - 1;
                const number = parseInt($order.textContent);
                if (number + 1 > member) {
                    $order.textContent = 1;
                }
                else {
                    $order.textContent = number + 1;
                }
                $input.value = '';
                $input.focus();
            }
            else if (l_word[l_word.length - 1] !== word[0] && word.length === 3) {
                alert("틀렸습니다. 탈락!");
                member = member - 1;
                const number = parseInt($order.textContent);
                if (number + 1 > member) {
                    $order.textContent = 1;
                }
                else {
                    $order.textContent = number + 1;
                }
                $input.value = '';
                $input.focus();
            }
            else {
                alert("틀렸습니다. 탈락!");
                member = member - 1;
                const number = parseInt($order.textContent);
                if (number + 1 > member) {
                    $order.textContent = 1;
                }
                else {
                    $order.textContent = number + 1;
                }
                $input.value = '';
                $input.focus();
            }
        }
        $input.value = '';// input 값을 초기화
        $input.focus();

        if (member === 1) {
            alert("축하드립니다. 이기셨습니다.");
        }
    };

    const onInput = (event) => {
        word = event.target.value;
        // console.log(word.length);
    };
    $button.addEventListener('click', onclick);
    $input.addEventListener('input', onInput);
}