import vocabulary from './../data/irregularVerbs.json';

export default class IrregularVerbsGame {
    constructor(state, attacks, animation, resultScreen) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.verb = null;
        this.position = null;
        this.form = null;
        this.vocabulary = vocabulary;
        this.game = document.getElementById('irr-verbs-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-irr-verbs-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.gameButton = document.getElementById('irr-verbs-game-button');       
        this.attack = document.getElementById('attack');        
        this.verbsDiv = document.getElementById("verbs-div");
        this.answer = null;
        this.init();
    }

    init() {
        this.gameButton.addEventListener('click', () => {
            this.generateRandomVerb();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
        })

        this.acceptAnswer.addEventListener('click', () => {
            this.answer = document.getElementById('irr-verbs-game-answer');         
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

    generateRandomVerb() {
        const randomVerb = Math.floor(Math.random() * (this.vocabulary.length));
        this.position = Math.floor(Math.random() * 2);       
        this.verb = this.vocabulary[randomVerb];
        this.form = this.verb[this.position];
    }    

    generateElement() {
        this.verbsDiv.innerHTML = '';
        this.verb.forEach((element, index) => {
            if (this.position === index) {
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('id', 'irr-verbs-game-answer');
                input.setAttribute('required', null);
                this.verbsDiv.appendChild(input);
            } else {
                const div = document.createElement('div');
                div.textContent = this.verb[index];
                this.verbsDiv.appendChild(div);
            }
        });
    }

    checkResult() {
        if (this.answer.value.toLowerCase() === this.form) {
            this.resultScreen.showCorrectScreen().then(() => {
                this.attacks.robotShootAttack(this.animation);
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