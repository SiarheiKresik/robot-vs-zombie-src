import vocabulary from './../data/countries.json';

export default class CountriesGame {
    constructor(state, attacks, animation, resultScreen) {
        this.state = state;
        this.attacks = attacks;
        this.animation = animation;
        this.resultScreen = resultScreen;
        this.country = null;   
        this.checked = null;
        this.mixedCountries = [];  
        this.countriesGame = document.getElementById('countries-game');
        this.miniGameField = document.getElementById('mini-game-field');
        this.acceptAnswer = document.getElementById('accept-countries-game-answer');
        this.spellField = document.getElementById('spell-field');
        this.dragGameButton = document.getElementById('countries-game-button');       
        this.attack = document.getElementById('attack');
        this.countriesDiv = document.getElementById('countries-game-div');
        this.init();
    }

    init() {
        this.dragGameButton.addEventListener('click', () => {
            this.generateRandomCountries();
            this.generateElement();
            this.showOrHideElement();
            this.spellField.classList.add('hidden');
            this.checked = null;
        })

        this.acceptAnswer.addEventListener('click', () => {
            if (this.checked) {
                this.checkResult();
            };                        
        });

        this.countriesDiv.addEventListener('click', (e) => {
            if(e.target.parentNode.matches('#countries-game-div')) {
                if(this.checked) {
                    this.checked.classList.remove('checked-country');
                }
                e.target.classList.add('checked-country');
                this.checked = e.target;
            }
        })
        
    }

    showOrHideElement() {
        this.countriesGame.classList.toggle('hidden');
        this.miniGameField.classList.toggle('hidden');
    }

    generateRandomCountries() {
        this.mixedCountries = [];
        vocabulary.sort((a, b) => {
            return Math.random() - 0.5
        });
        vocabulary[0].sort((a, b) => {
            return Math.random() - 0.5
        });
        vocabulary[1].sort((a, b) => {
            return Math.random() - 0.5
        });
        this.country = vocabulary[1][0];
        for (let i = 0; i < 5; i++) {
            this.mixedCountries.push(vocabulary[0][i]);
        }
        this.mixedCountries.push(this.country);
        this.mixedCountries.sort((a, b) => {
            return Math.random() - 0.5
        });
    }

    generateElement() {
        this.countriesDiv.innerHTML = '';
        this.mixedCountries.forEach((element, index) => {
            const div = document.createElement('div');
            div.textContent = element;
            this.countriesDiv.appendChild(div);
        })
    }

    checkResult() {
        if (this.checked.textContent === this.country) {
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