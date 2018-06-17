export default class Animation {
    constructor() {
        this.frame = 1;
        this.robot = {
            idle: [0, 567, 1134, 1701, 2268, 2835, 3402, 3969, 4536, 5103],
            melee: [0, 567, 1134, 1701, 2268, 2835, 3402, 3969, 4536, 5103],
            meleeRun:[500, 600, 700, 800, 800, 800, 800, 700, 600, 500],
            shoot: [0, 567, 1134, 1701, 2268, 2835, 3402, 3969, 4536, 5103],
            health: [100, 200, 300, 400, 500],
            dead: [0, 562, 1124, 1686, 2248, 2810, 3372, 3934, 4496, 5058]
        };
        this.bullet = {
            road: [0, 567, 1134, 1701, 2268, 2835, 3402, 3969, 4536, 5103],
            move: [522, 559, 596, 633, 670, 707, 744, 781, 818]
        };
        this.enemy = {
            idle: [0, 430, 860, 1290, 1720, 2150, 2580, 3010, 3440, 3870],
            melee: [0, 430, 860, 1290, 1720, 2150, 2580, 3010, 3440, 3870],
            meleeRun:[1000, 900, 800, 700, 600, 600, 600, 700, 800, 900],
            health: [1800, 1700, 1600, 1500, 1400],
            dead: [0, 629, 1258, 1887, 2516, 3145, 3774, 4403, 5032, 5661]
        };
        this.canvas = document.getElementById('game');
        this.canvas.width = 2000;
        this.canvas.height = 1143;
        this.ctx = this.canvas.getContext ('2d');
    }

    changeFrame(state) {
        setInterval(() => {
            if (this.frame === 9 && state.robot.action === 'dead') {
                state.enemy.action = 'idle';
                this.robot.dead = [5058, 5058, 5058, 5058, 5058, 5058, 5058, 5058, 5058, 5058];
                this.frame = 0;
            } else if (this.frame === 9 && state.enemy.action === 'dead') {
                state.robot.action = 'idle';
                this.enemy.dead = [5661, 5661, 5661, 5661, 5661, 5661, 5661, 5661, 5661, 5661];
                this.frame = 0;
            } 
            else if (this.frame === 9) {
                state.robot.action = 'idle';
                state.enemy.action = 'idle';
                this.frame = 0;
            } else {                
                this.frame += 1;
            };         
        }, 110);
    }

    render(resources, state) {
        this.changeFrame(state);
        setInterval(() => {
            this.drawEnvironment(resources, state);            
            this.drawRobotHealth(resources, state);
            this.drawEnemy(resources, state);
            this.drawEnemyHealth(resources, state);
            this.drawRobot(resources, state);            
        }, 1000/30);  
    }

    drawRobot(resources, state) {        
        if (state.robot.action === 'idle') {
            this.ctx.drawImage(resources.robot.idle, this.robot.idle[this.frame], 0, 567, 556, 400, 420, 567, 556);
        } else if (state.robot.action === 'melee'){
            this.ctx.drawImage(resources.robot.melee, this.robot.melee[this.frame], 0, 567, 556, this.robot.meleeRun[this.frame], 420, 567, 556);
        } else if (state.robot.action === 'shoot') {
            this.ctx.drawImage(resources.robot.shoot, this.robot.shoot[this.frame], 0, 567, 556, 400, 420, 567, 556);
            this.ctx.drawImage(resources.robot.bullet, this.bullet.road[this.frame], 0, 567, 556, this.bullet.move[this.frame], 420, 567, 556);
        } else if (state.robot.action === 'dead') {
            this.ctx.drawImage(resources.robot.dead, this.robot.dead[this.frame], 0, 567, 556, 540, 460, 567, 556);
        }
        this.ctx.fillStyle = "white";
        this.ctx.font = "50px Arial";
        this.ctx.fillText(state.robot.name, 100,100);
        this.ctx.fillText('Score: ', 840,88);
        this.ctx.fillText(state.robot.score, 1040,90);
    }

    drawRobotHealth(resources, state) {
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.strokeRect(100,200,500,80);
        this.ctx.fillStyle = "#FF0000";
        for (let i = 0; i < 5; i++) {
            this.ctx.fillRect(this.robot.health[i],200,100,80);
        }
    }

    drawEnemy(resources, state) {
        if (state.enemy.action === 'idle') {
            this.ctx.drawImage(resources.zombie.idle.legs, this.enemy.idle[this.frame],  0, 430, 519, 1000, 450, 430, 519);
            this.ctx.drawImage(resources.zombie.idle.body, this.enemy.idle[this.frame],  0, 430, 519, 1000, 450, 430, 519);
            this.ctx.drawImage(resources.zombie.idle.head, this.enemy.idle[this.frame],  0, 430, 519, 1000, 450, 430, 519);
            this.ctx.drawImage(resources.zombie.idle.weapon, this.enemy.idle[this.frame],  0, 430, 519, 1000, 450, 430, 519);
        } else if (state.enemy.action === 'melee'){
            this.ctx.drawImage(resources.zombie.attack.legs, this.enemy.melee[this.frame], 0, 430, 519, this.enemy.meleeRun[this.frame], 450, 430, 519);
            this.ctx.drawImage(resources.zombie.attack.body, this.enemy.melee[this.frame], 0, 430, 519, this.enemy.meleeRun[this.frame], 450, 430, 519);
            this.ctx.drawImage(resources.zombie.attack.head, this.enemy.melee[this.frame], 0, 430, 519, this.enemy.meleeRun[this.frame], 450, 430, 519);
            this.ctx.drawImage(resources.zombie.attack.weapon, this.enemy.melee[this.frame], 0, 430, 519, this.enemy.meleeRun[this.frame], 450, 430, 519);
        } else if (state.enemy.action === 'dead') {
            this.ctx.drawImage(resources.zombie.dead.legs, this.enemy.dead[this.frame], 0, 629, 529, 800, 450, 629, 526);
            this.ctx.drawImage(resources.zombie.dead.body, this.enemy.dead[this.frame], 0, 629, 529, 800, 450, 629, 526);
            this.ctx.drawImage(resources.zombie.dead.head, this.enemy.dead[this.frame], 0, 629, 529, 800, 450, 629, 526);
            this.ctx.drawImage(resources.zombie.dead.weapon, this.enemy.dead[this.frame], 0, 629, 529, 800, 450, 629, 526);
        }
        
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(state.enemy.name, 1400,100);
        this.ctx.fillText(state.enemy.lastName, 1400,160);
    }

    drawEnemyHealth(resources, state) {
        this.ctx.lineWidth=5
        this.ctx.strokeStyle="#FF0000";
        this.ctx.strokeRect(1400,200,500,80);
        this.ctx.fillStyle = "#FF0000";
        for (let i = 0; i < 5; i++) {
            this.ctx.fillRect(this.enemy.health[i],200,100,80);
        }
    }

    drawEnvironment(resources, state) {
        this.ctx.fillStyle = this.ctx.createPattern(resources.background, 'repeat');
        this.ctx.fillRect(0, 0, 2000, 1143); 
    }
}