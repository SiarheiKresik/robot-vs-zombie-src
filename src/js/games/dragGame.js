import vocabulary from './../data/vocabulary.json';

export default class DragGame {
    constructor(state, attacks, animation, resultScreen) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.word = null;
        this.mixedWord = [];      
        this.dragGame = document.getElementById('drag-game');
        this.dragged = null;
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-drag-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.dragGameButton = document.getElementById('drag-game-button');       
        this.attack = document.getElementById('attack');
        this.answer = document.getElementById('drag-game-answer');
        this.mixedWordDiv = document.getElementById('mixed-word');
        this.correctWordDiv = document.getElementById('correct-word');
        this.init();
    }

    init() {
        this.dragGameButton.addEventListener('click', () => {
            this.generateRandomWord();
            this.addEvents();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
        })

        this.acceptAnswer.addEventListener('click', () => {
            this.checkResult();           
        });
        
    }

    showOrHideElement() {
        this.dragGame.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomWord() {
        const wordNumber = Math.floor(Math.random() * vocabulary.length);
        this.word = vocabulary[wordNumber].word;
        this.mixedWord = this.word.split('');
        this.mixedWord.sort(() => {
            return 0.5 - Math.random();          
        });
        if (this.mixedWord.join('') === vocabulary[wordNumber].word) {
            this.generateRandomWord();
        }    
    }

    generateElement() {
        this.mixedWordDiv.innerHTML = '';
        this.correctWordDiv.innerHTML = '';        
        for (let i = 0; i < this.mixedWord.length; i++) {            
            const topDropZone = document.createElement('div');
            topDropZone.classList.add('dropzone');
            const bottomDropZone = document.createElement('div');
            bottomDropZone.classList.add('dropzone');            
            const letter = document.createElement('div');
            letter.setAttribute('draggable', 'true');
            letter.textContent = this.mixedWord[i];
            topDropZone.appendChild(letter);
            this.mixedWordDiv.appendChild(topDropZone);
            this.correctWordDiv.appendChild(bottomDropZone);
        }
    }

    addEvents() {
        document.addEventListener('dragstart', (e) => {
            this.dragged = e.target;
        });      
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });      
        document.addEventListener('dragenter', (e) => {
            if (e.target.matches('.dropzone')) {
                e.target.style.background = 'lightgrey';
            }      
        });
        document.addEventListener('dragleave', (e) => {
            if (e.target.matches('.dropzone')) {
                e.target.style.background = '';
            }
        });      
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.matches('.dropzone') && (e.target.childElementCount === 0)) {
                e.target.style.background = '';
                this.dragged.parentNode.removeChild(this.dragged);
                e.target.appendChild(this.dragged);
            }
        });       
    }    

    checkResult() {
        let answer = '';
        let answerNodeCollection= document.querySelectorAll('.correct-word .dropzone div')
        answerNodeCollection.forEach((item) => {
            answer += item.textContent;
        })
        if (answer === this.word) {
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