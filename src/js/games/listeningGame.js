import vocabulary from './../data/vocabulary.json';

export default class ListeningGame {
    constructor(state, attacks, animation, resultScreen) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.word = null;
        this.synth = window.speechSynthesis;
        this.listeningGame = document.getElementById('listening-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.answer = document.getElementById('listening-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.acceptAnswer = document.getElementById('accept-listening-game-answer');
        this.play = document.getElementById('play-listening-game');
        this.listeningGameButton = document.getElementById('listening-game-button');
        this.init();  
    }

    init() {
        this.play.addEventListener('click', () => {
            this.playWord();
        }) 
        this.listeningGameButton.addEventListener('click', () => {
            this.generateRandomWord();
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
    }

    showOrHideElement() {
        this.listeningGame.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomWord() {
        const wordNumber = Math.floor(Math.random() * vocabulary.length);
        this.word = vocabulary[wordNumber].word;      
    }

    generateElement() {        
        this.answer.value = '';
    }

    playWord() {        
        if (this.synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }        
        let utterThis = new SpeechSynthesisUtterance(this.word);       
        let voices = this.synth.getVoices();
        utterThis.voice = voices[4];      
        utterThis.pitch = 1;
        utterThis.rate = 0.8;
        this.synth.speak(utterThis);          
    }

    checkResult() {              
        if (this.answer.value.toLowerCase() === this.word) {
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