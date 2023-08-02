// js data와 화면 일치 !!!! //
// 미완성

// 초기 화면, 주인공 이름 설정 변수
const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');

// 주인공 stat 변수
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');

// 몬스터 stat 변수
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');

// message 변수
const $message = document.querySelector('#message');

// 주인공 초기 stat
const hero = {
    name: '',
    lev: 1,
    maxHp: 100,
    hp: 100,
    xp: 0,
    att: 10,

    // 공격 메서드
    attack(monster) { // this는 화살표함수에서는 사용 불가, 화살표함수에서 this는 window 또는 browser
        monster.hp -= this.att;
        this.hp -= monster.att;
    },
    heal(monster) {
        this.hp += 20;
        this.hp -= monster.att;
    },
};

// 몬스터
let monster = null;

const monsterList = [
    { name: '슬라임', hp: 25, att: 10, xp: 10 },
    { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
    { name: '와이번', hp: 80, att: 23, xp: 35 },
    { name: '마왕', hp: 150, att: 35, xp: 50 },
];

// 주인공 이름 입력 및 화면 전환
$startScreen.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target['name-input'].value; // event.target === form
    //input의 value는 문자열, valueAsnumber 하면 숫자로 받음
    $startScreen.style.display = 'none';
    $gameMenu.style.display = 'block';
    $heroName.textContent = name;

    $heroLevel.textContent = `${hero.lev}Lev `;
    $heroHp.textContent = `Hp : ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `Xp : ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `Att : ${hero.att}`;
    hero.name = name;
});

// 모험, 휴식, 종료 선택
$gameMenu.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;

    if (input === '1') { // 모험
        $gameMenu.style.display = 'none';
        $battleMenu.style.display = 'block';

        // 깊은 복사
        monster = JSON.parse(
            JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
        );

        monster.maxHp = monster.hp;
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `Hp : ${monster.hp}/${monster.maxHp}`;
        $monsterAtt.textContent = `Att : ${monster.att}`;
    } else if (input === '2') { // 휴식

    } else if (input === '3') { // 종료

    }
});

// battle page
$battleMenu.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;

    if (input === '1') { // 공격
        hero.attack(monster);
        monster.attack(hero);
        $heroHp.textContent = `Hp : ${hero.hp}/${hero.maxHp}`;
        $monsterHp.textContent = `Hp : ${monster.hp}/${monster.maxHp}`;
        $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`
    } else if (input === '2') { // 회복

    } else if (input === '3') { // 도망

    }


});

/*
 const a=[];
    const b='hello';
    const c={};

    cosnt arr=[a,b,c]; 
    
    // 얕은복사
    const arr1 = [...arr]; // 껍데기만 참조가 끊긴다? a,b,c는 참조 arr자체는 복사로 받음
    // arr.slice()도 얕은 복사 방법임
    arr1[1]= 'ddd'; console.log(arr); // 기존 배열 값 변경 x

    arr1[0].push(1); console.log(arr[0]); // 배열 값 변경, 배열 내부의 원소라 변경 가능
    arr1.push(2); // 이건 값 변경 x

    // 참조
    const arr2 = arr;
    arr2[1] = 'ddd'; console.log(arr); // 기존 배열 값 변경

    // 깊은 복사, 객체안에 객체가 있는 경우 사용
    const arr3=JSON.parse(JSON.stringify(arr)); // 모든 참조관계가 끝김
    arr3[0].push(2); console.log(arr[0]); // 값 변경 x
    console.log(arr3[0]); // 값 변경

    // 기타
    깊은 복사는 여러 방법이 있다.
    주로 lodash 라이브러리를 사용
    JSON.parse(JSON.stringify(arr))은 간단하지만 Math, Date 같은 객체는 복사 불가
*/