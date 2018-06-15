export default class Menu {
    constructor(resources, state, animation, recordsTable, sounds) {
        this.resources = resources;
        this.state = state;
        this.animation = animation;
        this.recordsTable = recordsTable;
        this.sounds = sounds;
        this.playerName = document.getElementById('player-name');
        this.playButton = document.getElementById('play-button');
        this.mainMenu = document.getElementById('main-menu');
        this.menuButtom = document.getElementById('menu-button');
        this.gameField = document.getElementById('game-field');
        this.loadingScreen = document.getElementById('loading-screen');
        this.musicButton = document.getElementById('music-button');
        this.soundButton = document.getElementById('sound-button');
        this.animationStart = true;
        this.init();
    }

    init() {
        this.playButton.addEventListener('click', () => {
            if(this.playerName.checkValidity()) {
                this.startGame();
                this.sounds.playMainTheme();
                this.state.canAttack = true;
            } else {
                this.playerName.reportValidity();
            }           
        })
        this.menuButtom.addEventListener('click', () => {
            this.showMenu();
        })

        this.musicButton.addEventListener('click', () => {
            this.musicButton.classList.toggle('disabled-music-button')
            this.sounds.disableMusic();
        })

        this.soundButton.addEventListener('click', () => {
            this.soundButton.classList.toggle('disabled-sound-button')
            this.sounds.disableSounds();
        })
    }

    hideLoadingScreen() {
        this.loadingScreen.classList.add('hidden');
    }

    startGame() {   
        this.state.robot.name = this.playerName.value;
        this.state.robot.health = 5;
        this.state.robot.action = 'idle';
        this.state.robot.score = 0;
        this.state.generateZombie();     
        this.resources.generateRandomZombie();
        this.animation.robot.health = [100, 200, 300, 400, 500];
        if (this.animationStart) {
            this.animation.render(this.resources, this.state);
            this.animationStart = false;
        }              
        this.mainMenu.classList.add('hidden');
        this.gameField.classList.remove('hidden');
        this.playerName.value = '';
    }

    showMenu() {
        this.animation.enemy.health = [1800, 1700, 1600, 1500, 1400];
        this.gameField.classList.add('hidden');
        this.mainMenu.classList.remove('hidden');
        this.recordsTable.setRecords();
    }
}