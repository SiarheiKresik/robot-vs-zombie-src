import vocabulary from './../data/chemistryVocabulary.json';

export default class ChemistryGame {
    constructor(state, attacks, animation, resultScreen) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.compound = null;
        this.inner = null;
        this.vocabulary = vocabulary;
        this.checked = null;
        this.game = document.getElementById('chem-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-chem-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.gameButton = document.getElementById('chem-game-button');       
        this.attack = document.getElementById('attack');
        this.compoundDiv = document.getElementById('chem-compound');
        this.formulasDiv = document.getElementById('chem-formulas');
        this.init();
    }

    init() {
        this.gameButton.addEventListener('click', () => {
            this.generateRandomCompound();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
        })

        this.acceptAnswer.addEventListener('click', () => {
            if (this.checked) {
                this.checkResult();
            };                        
        });

        this.formulasDiv.addEventListener('click', (e) => {
            if(e.target.parentNode.matches('#chem-formulas')) {
                if(this.checked) {
                    this.checked.classList.remove('checked-formula');
                }
                e.target.classList.add('checked-formula');
                this.checked = e.target;
            }
        })
    }

    showOrHideElement() {
        this.game.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomCompound() {
        const compoundNumber = Math.floor(Math.random() * this.vocabulary.length);
        this.compound = this.vocabulary[compoundNumber].compound;
        this.inner = this.vocabulary[compoundNumber].inner;          
    }    

    generateElement() {
        this.compoundDiv.textContent = this.compound;
        this.vocabulary.sort((a, b) => {
            return Math.random() - 0.5
        })
        let inner = '';
        this.vocabulary.forEach(element => {
            inner += element.innerDiv;
        });
        this.formulasDiv.innerHTML = inner;
    }

    checkResult() {
        if (this.checked.innerHTML === this.inner) {
            this.resultScreen.showCorrectScreen().then(() => {
                this.attacks.robotMeleeAttack(this.animation);
            });
            this.showOrHideElement();
            this.checked = null;
        } else {           
            this.resultScreen.showWrongScreen().then(() => {
                this.attacks.enemyAttack(this.animation);
            });
            this.showOrHideElement();
            this.checked = null;
        }
    }
}