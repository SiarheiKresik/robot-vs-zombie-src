import vocabulary from './../data/vocabulary.json';

export default class LinguaGame {
    constructor(state, attacks, animation, resultScreen) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.word = null;
        this.translate = null;
        this.vocabulary = vocabulary;
        this.linguaGame = document.getElementById('lingua-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-lingua-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.linguaGameButton = document.getElementById('lingua-game-button');       
        this.attack = document.getElementById('attack');
        this.linguaGameWord = document.getElementById('lingua-game-word');
        this.answer = document.getElementById('lingua-game-answer');
        this.init();
    }

    init() {
        this.linguaGameButton.addEventListener('click', () => {
            this.generateRandomWord();
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
        this.linguaGame.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomWord() {
        const wordNumber = Math.floor(Math.random() * (this.vocabulary.length));
        this.word = this.vocabulary[wordNumber].word;
        this.translate = this.vocabulary[wordNumber].translate;          
    }    

    generateElement() {
        this.linguaGameWord.textContent = this.word;
        this.answer.value = '';
    }

    checkResult() {
        for (let i = 0; i < this.translate.length; i++) {
            if (this.answer.value.toLowerCase() == this.translate[i]) {
                this.resultScreen.showCorrectScreen().then(() => {
                    this.attacks.robotMeleeAttack(this.animation);
                });
                this.showOrHideElement();
                return;
            } 
        }
        this.resultScreen.showWrongScreen().then(() => {
            this.attacks.enemyAttack(this.animation);
        });
        this.showOrHideElement();
    }
}