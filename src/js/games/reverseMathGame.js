export default class ReverseMathGame {
    constructor(state, attacks, animation, resultScreen) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.min = 1;
        this.max = 200;
        this.operators = ['-', '+', '*', '/'];
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = null;
        this.result = null;
        this.game = document.getElementById('reverse-math-game');
        this.gameField = document.getElementById('mini-game-field');
        this.answer = document.getElementById('reverse-math-game-answer');
        this.acceptAnswer = document.getElementById('accept-reverse-math-game-answer');
        this.firstOperandDiv = document.getElementById('reverse-first-operand');
        this.secondOperandDiv = document.getElementById('reverse-second-operand');
        this.operatorInput = document.getElementById('reverse-operator');
        this.reverseMathGameButton = document.getElementById('reverse-math-game-button');
        this.spellField = document.getElementById('spell-field');        
        this.attack = document.getElementById('attack');
        this.init();
    }

    init() {
        this.reverseMathGameButton.addEventListener('click', () => {
            this.firstOperand = this.generateRandomInteger();
            this.secondOperand = this.generateRandomInteger();
            this.generateOperator();
            this.generateResult();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
        });
        this.acceptAnswer.addEventListener('click', () => {
            if (this.operatorInput.checkValidity()) {
                this.checkResult();
            } else {
                this.operatorInput.reportValidity();
            }    
        });
        this.attack.addEventListener('click', () => {
            if (this.state.canAttack) {
                this.spellField.classList.remove('hidden');
            }            
        })
    }

    showOrHideElement() {
        this.game.classList.toggle('hidden');
        this.gameField.classList.toggle('hidden');
    }

    generateRandomInteger() {
        return Math.floor(this.min + Math.random() * (this.max - this.min + 1));
    }

    generateOperator() {
        let rand = Math.floor(Math.random() * 4);
        this.operator = this.operators[rand];
        if (this.operator === '/') {
            if (this.firstOperand < this.secondOperand) {
                [this.firstOperand, this.secondOperand] = [this.secondOperand, this.firstOperand];      
            }
            let temp = Math.floor(this.firstOperand/this.secondOperand);
            this.firstOperand = temp * this.secondOperand;
        }        
    }

    generateResult() {
        switch(this.operator) {
            case '-':
                this.result = this.firstOperand - this.secondOperand;
                break;
            case '+':
                this.result = this.firstOperand + this.secondOperand;
                break;
            case '*':
                this.result = this.firstOperand * this.secondOperand;
                break;
            case '/':
                this.result = this.firstOperand / this.secondOperand;
                break;
        }
    }

    generateElement() {      
        this.firstOperandDiv.textContent = this.firstOperand;
        this.operatorInput.value = '';
        this.secondOperandDiv.textContent = this.secondOperand;
        this.answer.textContent = this.result;              
    }

    checkResult() {
        if (this.firstOperand === this.secondOperand) {
            if (this.operatorInput.value === '/' || '*') {
                this.resultScreen.showCorrectScreen().then(() => {
                    this.attacks.robotMeleeAttack(this.animation);
                });
                this.showOrHideElement();
            }
        } else if (this.operatorInput.value == this.operator) {
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