export default class MathGame {
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
        this.game = document.getElementById('math-game');
        this.gameField = document.getElementById('mini-game-field');
        this.answer = document.getElementById('math-game-answer');
        this.acceptAnswer = document.getElementById('accept-math-game-answer');
        this.firstOperandDiv = document.getElementById('first-operand');
        this.secondOperandDiv = document.getElementById('second-operand');
        this.operatorDiv = document.getElementById('operator');
        this.mathGameButton = document.getElementById('math-game-button');
        this.spellField = document.getElementById('spell-field');        
        this.attack = document.getElementById('attack');
        this.init();
    }

    init() {
        this.mathGameButton.addEventListener('click', () => {
            this.firstOperand = this.generateRandomInteger();
            this.secondOperand = this.generateRandomInteger();
            this.generateOperator();
            this.generateResult();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
        });
        this.acceptAnswer.addEventListener('click', () => {
            if (this.answer.checkValidity()) {
                this.checkResult();
            } else {
                this.answer.reportValidity();
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
        this.operatorDiv.textContent = this.operator;
        this.secondOperandDiv.textContent = this.secondOperand;
        this.answer.value = '';              
    }

    checkResult() { 
        if (this.answer.value == this.result) {
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