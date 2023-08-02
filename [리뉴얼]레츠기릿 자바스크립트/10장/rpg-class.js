// js data와 화면 일치 !!!! //

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

// class 함수
class Game {
    constructor(name) {
        this.monster = null;
        this.hero = null;
        this.monsterList = [
            { name: '슬라임', hp: 25, att: 10, xp: 10 },
            { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
            { name: '와이번', hp: 80, att: 23, xp: 35 },
            { name: '마왕', hp: 150, att: 35, xp: 50 },
        ];
        this.start(name);
    }

    start(name) {
        // console.log(this); ...1
        $gameMenu.addEventListener('submit', this.onGameMenuInput); // 화살표 함수라 1번 this의 값을 사용, this가 Game임 // 화살표 함수가 아닌 일반 함수면 $gameMnu tag인 form임
        $battleMenu.addEventListener('submit', this.onBattleMenuInput);
        this.chageScreen('game');
        this.hero = new Hero(this, name);
        this.updateHeroStat();
    }

    chageScreen(screen) {
        if (screen === 'start') {
            $startScreen.style.display = 'block';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
        } else if (screen === 'game') {
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'block';
            $battleMenu.style.display = 'none';
        } else if (screen === 'battle') {
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'block';
        }
    }

    // 일반
    onGameMenuInput = (event) => { // 화살표함수
        event.preventDefault();
        const input = event.target['menu-input'].value;

         
    }

    // 배틀
    onBattleMenuInput = (event) => {
        event.preventDefault();
        const input = event.target['battle-input'].value;

        if (input === '1') { // 공격
            const { hero, monster } = this;
            hero.attack(monster);
            monster.attack(hero);

            if (hero.hp <= 0) {
                this.showMessage(`${hero.lev} 레벨에서 죽음. 새로운 주인공을 생성하세요.`);
                this.quit();
            } else if (monster.hp <= 0) {
                this.showMessage(`${monster.name}을 잡아 ${monster.xp}의 경험치를 얻었다.`);
                hero.getXp(monster.xp);
                this.monster = null;
                this.chageScreen('game');
            } else { // 전투 중
                this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
            }
            this.updateHeroStat();
            this.updateMonsterStat();

        } else if (input === '2') { // 회복
            const {hero, monster}=this;
            hero.hp = Math.min(hero.maxHp, hero.hp+20);
            monster.attack(hero);
            this.showMessage('체력을 회복했다.');
            this.updateHeroStat();

        } else if (input === '3') { // 도망
            this.chageScreen('game');
            this.showMessage('도망쳤다.');
            this.monster = null;
            this.updateMonsterStat();
        }
    }

    updateHeroStat() {
        const { hero } = this;
        if (hero === null) {
            $heroName.textContent = '';
            $heroLevel.textContent = '';
            $heroHp.textContent = '';
            $heroXp.textContent = '';
            $heroAtt.textContent = '';
            return;
        }
        $heroName.textContent = hero.name;
        $heroLevel.textContent = `${hero.lev}Lev `;
        $heroHp.textContent = `Hp : ${hero.hp}/${hero.maxHp}`;
        $heroXp.textContent = `Xp : ${hero.xp}/${15 * hero.lev}`;
        $heroAtt.textContent = `Att : ${hero.att}`;
    }

    updateMonsterStat() {
        const { monster } = this;
        if (monster === null) {
            $monsterName.textContent = '';
            $monsterHp.textContent = '';
            $monsterAtt.textContent = '';
            return;
        }
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `Hp : ${monster.hp}/${monster.maxHp}`;
        $monsterAtt.textContent = `Att : ${monster.att}`;
    }

    showMessage(text) {
        $message.textContent = text;
    }

    quit() {
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        $gameMenu.removeEventListener('submit', this.onGameMenuInput);
        $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
        this.chageScreen('start');
        game = null;
    };
}

// 부모클래스
class Unit{
    constructor(game, name, hp, att, xp) {
        this.game = game;
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.xp = xp;
        this.att = att;
    }

    attack(target){
        target.hp -= this.att;
    }
}

// 자식 클래스 (상속)
class Hero extends Unit{
    constructor(game, name) {
        super(game, name, 100, 10 , 0); // 부모클래스의 생성자 호출
        this.lev = 1;
    }

    // attack 메소드는 아예 안적던가 추가 사항이 있으면 밑처럼 사용
    //attack(target){
        // super.attack(target);
        // 추가 코드...
    //}

    heal(monster) {
        this.hp += 20;
        this.hp -= monster.att;
    }

    getXp(xp) {
        this.xp += xp;
        if(this.xp >= this.lev*15){
            this.xp -= this.lev *15;
            this.lev += 1;
            this.maxHp += 5;
            this. hp = this.maxHp;
            this.game.showMessage(`Level Up! level ${this.lev}`);
        }
    }
}

class Monster extends Unit {
    constructor(game, name, hp, att, xp) {
        super(game, name, hp, att, xp);
    }
}

let game = null;

$startScreen.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target['name-input'].value;
    game = new Game(name);
});

/*
this는 함수 funtion을 이용 할 경우 자기 자신을 this에 저장
but
화살표 함수를 이용하면 바로 바깥의 this 값을 사용한다.

function a(){
    console.log(this); // wihdow;
}

a.bind(document)(); // document로 this를 변경
*/
