const candidate = Array(45).fill().map((v, i) => i + 1);

const shuffle = [];
while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value);
}

const winball = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];

const $result = document.querySelector('#result');

function colorize(number, $tag) {
    if (number < 10) {
        $tag.style.backgroundColor = 'red';
        $tag.style.color = 'white';
    } else if (number < 20) {
        $tag.style.backgroundColor = 'orange';
    } else if (number < 30) {
        $tag.style.backgroundColor = 'yellow';
    } else if (number < 40) {
        $tag.style.backgroundColor = 'blue';
        $tag.style.color = 'white';
    } else {
        $tag.style.backgroundColor = 'green';
        $tag.style.color = 'white';
    }
}

const drawball = (number, $parent) => {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    colorize(number, $ball);
    $parent.appendChild($ball);
};

for (let i = 0; i < winball.length; i++) {
    setTimeout(() => {
        drawball(winball[i], $result);
    }, 1000 * (1 + i));
}

const $bonus = document.querySelector('#bonus');
setTimeout(() => {
    drawball(bonus, $bonus);
}, 7000);
