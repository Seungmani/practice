const $operator = document.querySelector("#operator");
const $result = document.querySelector("#result");
const $num0 = document.querySelector("#num-0");
const $num1 = document.querySelector("#num-1");
const $num2 = document.querySelector("#num-2");
const $num3 = document.querySelector("#num-3");
const $num4 = document.querySelector("#num-4");
const $num5 = document.querySelector("#num-5");
const $num6 = document.querySelector("#num-6");
const $num7 = document.querySelector("#num-7");
const $num8 = document.querySelector("#num-8");
const $num9 = document.querySelector("#num-9");

const $clear = document.querySelector("#clear");
const $calculate = document.querySelector("#calculate");
const $multiply = document.querySelector("#multiply");
const $divide = document.querySelector("#divide");
const $minus = document.querySelector("#minus");
const $plus = document.querySelector("#plus");

let operator = "";
let firstNumber = 0;
let secondNumber = 0;

// 입력 값 받기
const setNumber = (event) => {
  const clickNumber = event.target.textContent;

  if (operator !== "") {
    // 부호가 선 입력이면
    if (operator === "-" && !firstNumber) {
      firstNumber = -clickNumber;
			$result.value = firstNumber;
      return;
    }
    secondNumber = clickNumber;
    return;
  }

  firstNumber = clickNumber;
	$result.value = firstNumber;
  return;
};

// 연산자 입력
const setOperator = (event) => {
  const clickOperator = event.target.textContent;

  if (!firstNumber) {
		if (clickOperator !== "-") {
			alert("숫자를 먼저 입력해주세요");
			return;
		}	
		operator = clickOperator;
		return;
	}

  $operator.value = clickOperator;
  operator = clickOperator;
};

// 초기화
const reset = () => {
  operator = "";
  firstNumber = 0;
  secondNumber = 0;
	$result.value = '';
	$operator.value = '';
};

// 계산하기
const calculate = () => {
	console.log(firstNumber, secondNumber);
  switch (operator) {
    case "+":
			$result.value = Number(firstNumber) + Number(secondNumber);
			firstNumber = Number(firstNumber) + Number(secondNumber);
      break;
    case "-":
			$result.value = Number(firstNumber) - Number(secondNumber);
			firstNumber = Number(firstNumber) - Number(secondNumber);
      break;
    case "/":
			$result.value = parseInt(Number(firstNumber) / Number(secondNumber));
			firstNumber = parseInt(Number(firstNumber) / Number(secondNumber));
      break;
    case "*":
			$result.value = Number(firstNumber) * Number(secondNumber);
			firstNumber = Number(firstNumber) * Number(secondNumber);
      break;
  }
};

$num0.addEventListener("click", setNumber);
$num1.addEventListener("click", setNumber);
$num2.addEventListener("click", setNumber);
$num3.addEventListener("click", setNumber);
$num4.addEventListener("click", setNumber);
$num5.addEventListener("click", setNumber);
$num6.addEventListener("click", setNumber);
$num7.addEventListener("click", setNumber);
$num8.addEventListener("click", setNumber);
$num9.addEventListener("click", setNumber);

$minus.addEventListener("click", setOperator);
$multiply.addEventListener("click", setOperator);
$plus.addEventListener("click", setOperator);
$divide.addEventListener("click", setOperator);
$calculate.addEventListener("click", calculate);

$clear.addEventListener("click", reset);
