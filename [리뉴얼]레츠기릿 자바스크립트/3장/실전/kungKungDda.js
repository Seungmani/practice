const $user = document.querySelector("#user");
const $textInput = document.querySelector("#textInput");
const $word = document.querySelector("#word");
const $checkButton = document.querySelector("#checkButton");

const setting = {
	LENGTH: 3,	
}

let inputTextArr = []; // 입력 한 값 보관

const setParticipant = () => {
	let member = Number(prompt("참가 인원 수를 적어주세요"));
	const memberList = Array(member).fill(0).map((member, index) => index + 1);
	return memberList;
}

const participantList = setParticipant();

const settingInput = () => {
	$textInput.value = '';
	$textInput.focus();
}

// 유저 변경
const changeUser = () => {
	const nowUser = Number($user.textContent);
	const nowIndex = participantList.indexOf(nowUser);

	console.log("nowUser",nowUser, "nowIndex",nowIndex, "Xx", participantList);

	if (nowIndex+1 < participantList.length) {
		$user.textContent = participantList[nowIndex + 1];
		settingInput();
		return;
	}
	
	$user.textContent = participantList[0];
	settingInput();
	return;
}

// 유저 탈락 기능
const checkFailUser = (nowUser) => {
	participantList.splice(participantList.indexOf(Number(nowUser)), 1);
}

// 유저 탈락 알림
const alertFailUser = (nowUser) => {
	alert(`${nowUser}번 탈락...`);
}

// 단어 추가
const addText = (inputText) => {
	$word.textContent = inputText;
	inputTextArr.push(inputText);
}

// 우승자 확인
const checkWInner = () => {
	if (participantList.length === 1) {
		alert(`${participantList[0]} 우승~~`);
	}
}

// 입력 값 검증
const validateInputTextAndPushText = (inputText) => {
	const isLength = validateLength(inputText);
	const isFirstString = validateFirstString(inputText);
	const isDuplicateString = validateDuplicateString(inputText);
	return isLength && isFirstString && isDuplicateString;
}

const validateLength = (inputText) => {
	if (setting.LENGTH !== inputText.length) {
		alert("3글자로 입력해 주세요");
		return false;
	}
	return true;
}

const validateFirstString = (inputText) => {
	if (inputTextArr?.length) {
		const previousText = inputTextArr[inputTextArr.length - 1].split('');
		const inputTextSplit = inputText.split('');
		if (previousText[2] !== inputTextSplit[0]) {
			alert("첫 글자가 직전 값의 마지막 글자와 다릅니다.");
			return false;
		}
	}
	return true;
}

const validateDuplicateString = (inputText) => {
	if (inputTextArr.includes(inputText)) {
		alert("이미 입력한 값입니다.");
		return false;
	}
	return true;
}

// 입력 기능
const inputText = () => {
	const userInputText = $textInput.value.trim(); // 값 입력
	const user = $user.textContent; // 현재 순서

	const textValidateResult = validateInputTextAndPushText(userInputText); // 값 검증

	// false면 유저 탈락
	if (!textValidateResult) {
		changeUser();
		checkFailUser(user);
		alertFailUser(user);
		checkWInner();
		inputTextArr=[];
		$word.textContent = '';
		return;
	}

	addText(userInputText);
	changeUser();
}

$checkButton.addEventListener('click', inputText);
