export default class Attacks {
    constructor(state, resultScreen, recordsTable, sounds, animation) {
        this.state = state;
        this.resultScreen = resultScreen;
        this.recordsTable = recordsTable;
        this.sounds = sounds;
        this.animation = animation;
    }

    robotMeleeAttack() {
        this.animation.frame = 1;
        this.state.robot.action = 'melee';
        this.animation.enemy.health.pop();
        this.sounds.playRobotAttack();
        if(this.state.enemy.health === 1) {
            this.state.canAttack = false;
            this.state.robot.score++;
            setTimeout(() => {
                this.sounds.playZombieDeath();
                this.state.enemy.action = 'dead';
                this.resultScreen.showWinScreen();
            }, 1200)         
        } else {
            this.state.enemy.health--;
            this.state.robot.score++;
        }         
    }

    robotShootAttack() {
        this.animation.frame = 1;
        this.state.robot.action = 'shoot';
        this.animation.enemy.health.pop();
        this.sounds.playRobotShoot();
        if(this.state.enemy.health === 1) {
            this.state.canAttack = false;
            this.state.robot.score++;
            setTimeout(() => {
                this.sounds.playZombieDeath();
                this.state.enemy.action = 'dead';
                this.resultScreen.showWinScreen();
            }, 1200)            
        } else {
            this.state.robot.score++;
            this.state.enemy.health--;
        }
    }

    enemyAttack() {
        this.animation.frame = 1;
        this.state.enemy.action = 'melee';
        this.animation.robot.health.pop();
        this.sounds.playZombieAttack();
        if(this.state.robot.health === 1) {
            this.state.canAttack = false;
            this.recordsTable.setRecords();
            setTimeout(() => {
                this.sounds.playRobotDeath();
                this.state.robot.action = 'dead';
                this.resultScreen.showLooseScreen();
            }, 1200)            
        } else {
            this.state.robot.health--;
        }
    }
}