export default class ChemistryGame {
    constructor(state, attacks, animation, resultScreen, resources) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.resources = resources;
        this.country = null;
        this.checked = null;
        this.game = document.getElementById('flags-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-flags-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.gameButton = document.getElementById('flags-game-button');       
        this.attack = document.getElementById('attack');
        this.countryDiv = document.getElementById('flag-name');
        this.flagsDiv = document.getElementById('flags');
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
            if (this.checked) {
                this.checkResult();
            };                        
        });

        this.flagsDiv.addEventListener('click', (e) => {
            if(e.target.parentNode.parentNode.matches('#flags')) {
                if(this.checked) {
                    this.checked.classList.remove('checked-flag');
                }
                e.target.parentNode.classList.add('checked-flag');
                this.checked = e.target.parentNode;
            }
        })
    }

    showOrHideElement() {
        this.game.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomFlag() {
        const flagNumber = Math.floor(Math.random() * this.resources.flags.length);
        this.country = this.resources.flags[flagNumber].country; 
    }    

    generateElement() {
        this.flagsDiv.innerHTML = '';
        this.countryDiv.textContent = this.country;
        this.resources.flags.sort((a, b) => {
            return Math.random() - 0.5
        })
        
        this.resources.flags.forEach(element => {            
            const div = document.createElement('div');
            div.setAttribute('id', element.country);
            div.appendChild(element.img);
            this.flagsDiv.appendChild(div);
        });
        
    }

    checkResult() {
        if (this.checked.id === this.country) {
            this.resultScreen.showCorrectScreen().then(() => {
                this.attacks.robotShootAttack(this.animation);
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