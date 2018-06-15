export default class HiddenWordsGame {
    constructor(state, attacks, animation, resultScreen, resources) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.resources = resources;
        this.words = null;
        this.puzzle = null;
        this.game = document.getElementById('hidden-words-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-hidden-words-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.gameButton = document.getElementById('hidden-game-button');       
        this.attack = document.getElementById('attack');
        this.puzzleDiv = document.getElementById('hidden-words-img');
        this.answer1 = document.getElementById('hidden-game-answer1');
        this.answer2 = document.getElementById('hidden-game-answer2'); 
        this.answer3 = document.getElementById('hidden-game-answer3'); 
        this.answer4 = document.getElementById('hidden-game-answer4'); 
        this.answer5 = document.getElementById('hidden-game-answer5'); 
        this.answer6 = document.getElementById('hidden-game-answer6');                
        this.init();
    }

    init() {
        this.gameButton.addEventListener('click', () => {
            this.generateRandomPuzzle();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
        })

        this.acceptAnswer.addEventListener('click', () => {
            if (this.answer1.checkValidity() && this.answer2.checkValidity() && this.answer3.checkValidity()
                && this.answer4.checkValidity() && this.answer5.checkValidity() && this.answer6.checkValidity()) {
                this.checkResult();
            } else if (!this.answer1.checkValidity()){
                this.answer1.reportValidity();
            } else if (!this.answer2.checkValidity()){
                this.answer2.reportValidity();
            } else if (!this.answer3.checkValidity()){
                this.answer3.reportValidity();
            } else if (!this.answer4.checkValidity()){
                this.answer4.reportValidity();
            } else if (!this.answer5.checkValidity()){
                this.answer5.reportValidity();
            } else if (!this.answer6.checkValidity()){
                this.answer6.reportValidity();
            }                        
        });
    }

    showOrHideElement() {
        this.game.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomPuzzle() {
        const puzzleNumber = Math.floor(Math.random() * this.resources.hiddenWords.length);
        this.puzzle = this.resources.hiddenWords[puzzleNumber];
        this.words = this.puzzle.words;
    }    

    generateElement() {
        this.puzzleDiv.innerHTML = '';
        this.puzzleDiv.appendChild(this.puzzle.img);
        this.answer1.value = '';
        this.answer2.value = '';
        this.answer3.value = '';
        this.answer4.value = '';
        this.answer5.value = '';
        this.answer6.value = '';
    }

    checkArrays() {
        let answers = [this.answer1.value.toLowerCase(), this.answer2.value.toLowerCase(), this.answer3.value.toLowerCase(),
            this.answer4.value.toLowerCase(), this.answer5.value.toLowerCase(), this.answer6.value.toLowerCase()];
        answers.sort();
        this.words.sort();
        for (let i = 0; i < 6; i++) {
            if (this.words[i] !== answers[i]) {
                return false
            }
        }
        return true
    }

    checkResult() {        
        if (this.checkArrays()) {
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