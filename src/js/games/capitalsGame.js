export default class CapitalsGame {
    constructor(state, attacks, animation, resultScreen, resources) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.resources = resources;
        this.flag = null;
        this.game = document.getElementById('capitals-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-capitals-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.gameButton = document.getElementById('capitals-game-button');       
        this.attack = document.getElementById('attack');
        this.countryDiv = document.getElementById('capitals-country');
        this.flagDiv = document.getElementById('capitals-flag');
        this.answer = document.getElementById('capitals-game-answer');
        this.init();
    }

    init() {
        this.gameButton.addEventListener('click', () => {
            this.generateRandomFlag();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
        })

        this.acceptAnswer.addEventListener('click', () => {
            if (this.answer.checkValidity()) {
                this.checkResult();
            } else {
                this.answer.reportValidity();
            }                        
        });
    }

    showOrHideElement() {
        this.game.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomFlag() {
        const flagNumber = Math.floor(Math.random() * this.resources.flags.length);
        this.flag = this.resources.flags[flagNumber];
    }    

    generateElement() {
        this.flagDiv.innerHTML = '';
        this.flagDiv.appendChild(this.flag.img);
        this.countryDiv.textContent = this.flag.country;
        this.answer.value = ''; 
    }

    checkResult() {
        if (this.answer.value.toLowerCase() === this.flag.capital.toLowerCase()) {
            this.resultScreen.showCorrectScreen().then(() => {
                this.attacks.robotMeleeAttack(this.animation);
            });
            this.showOrHideElement();
        } else {           
            this.resultScreen.showWrongScreen().then(() => {
                this.attacks.enemyAttack(this.animation);
            });
            this.showOrHideElement();
        }
    }
}