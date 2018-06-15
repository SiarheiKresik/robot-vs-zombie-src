export default class Sounds {
    constructor(resources) {
        this.resources = resources;
        this.playMusic = true;
        this.playSounds = true;
    }


    playMainTheme() {
        this.resources.audio.mainTheme.play();
    }

    playRobotAttack() {
        if (this.playSounds) {
            setTimeout(() => {
                this.resources.audio.robot.attack.play();
            }, 300) 
        }               
    }

    playRobotShoot() {
        if (this.playSounds) {
            this.resources.audio.robot.shoot.play(); 
        }               
    }

    playRobotDeath() {
        if (this.playSounds) {
            this.resources.audio.robot.dead.play();            
        }
    }

    playZombieAttack() {
        if (this.playSounds) {            
            this.resources.audio.zombie.attack.play();
        }
    }

    playZombieDeath() {
        if (this.playSounds) {
            this.resources.audio.zombie.dead.play(); 
        }
    }
    
    disableMusic() {
        if (this.playMusic) {
            this.playMusic = false;
            this.resources.audio.mainTheme.pause();
        } else {
            this.playMusic = true;
            this.resources.audio.mainTheme.play();
        }        
    }

    disableSounds() {
        if (this.playSounds) {
            this.playSounds = false;
        } else {
            this.playSounds = true;
        }
    }
}

