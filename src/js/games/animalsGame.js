export default class AnimalsGame {
    constructor(state, attacks, animation, resultScreen, resources) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.resources = resources;
        this.animal = null;
        this.checked = null;
        this.game = document.getElementById('animals-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-animals-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.gameButton = document.getElementById('animals-game-button');       
        this.attack = document.getElementById('attack');
        this.animalDiv = document.getElementById('animal-div');
        this.answer = document.getElementById('animals-game-answer');
        this.init();
    }

    init() {
        this.gameButton.addEventListener('click', () => {
            this.generateRandomAnimal();
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

    generateRandomAnimal() {
        const animalNumber = Math.floor(Math.random() * this.resources.animals.length);
        this.animal = this.resources.animals[animalNumber];
    }    

    generateElement() {
        this.animalDiv.innerHTML = '';
        this.animalDiv.appendChild(this.animal.img);
        this.answer.value = ''; 
    }

    checkResult() {
        if (this.answer.value.toLowerCase() === this.animal.animal.toLowerCase()) {
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