export default class ResultScreen {
    constructor(resources, state, animation, menu) {
        this.resources = resources;
        this.state = state;
        this.animation = animation;
        this.menu = menu;
        this.correct = document.getElementById('correct-answer');
        this.wrong = document.getElementById('wrong-answer');
        this.loose = document.getElementById('loose-screen');
        this.win = document.getElementById('win-screen');
        this.currentScore = document.getElementById('current-score');
        this.finalScore = document.getElementById('final-score');
        this.newGame = document.getElementById('new-game');
        this.init();
    }

    init() {
        this.newGame.addEventListener('click', () => {
            this.loose.classList.add('hidden');
            this.menu.showMenu();
        })
    }

    showCorrectScreen() {        
        return new Promise((resolve, reject) => {
            this.correct.classList.remove('hidden');
            setTimeout(() => {
                this.correct.classList.add('hidden');
                resolve();
            }, 1400);
        });
    }

    showWrongScreen() {
        return new Promise((resolve, reject) => {  
            this.wrong.classList.remove('hidden');          
            setTimeout(() => {
                this.wrong.classList.add('hidden');
                resolve();
            }, 1400);
        });
    }

    showLooseScreen() {
        this.finalScore.innerHTML = `Your score: ${this.state.robot.score}`
        setTimeout(() => {
            this.loose.classList.remove('hidden');
        }, 2000);         
    }
    

    showWinScreen() {       
        setTimeout(() => {
            this.win.classList.remove('hidden');
        }, 2000);
        setTimeout(() => {
            this.resources.generateRandomZombie();
            this.state.generateZombie();
            this.state.canAttack = true;
            this.state.enemy.action = 'idle';
            this.animation.enemy.health = [1800, 1700, 1600, 1500, 1400];
            this.win.classList.add('hidden');
        }, 6000);
    }
}