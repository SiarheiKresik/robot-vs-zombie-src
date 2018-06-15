import zombieNames from './../data/zombieNames.json';

export default class State {
    constructor() {
        this.canAttack = true; 
        this.robot = {
            action: 'idle',
            name: 'Vasya',
            health: 5,
            score: 0
        };
        this.enemy = {
            action: 'idle',
            name: null,
            lastName: null,
            health: 5
        };
    }

    generateZombie() {
        this.enemy.health = 5;
        let firstNameIndex = Math.round(0 + Math.random() * (zombieNames.firstName.length - 1));
        let secondNameIndex = Math.round(0 + Math.random() * (zombieNames.secondName.length - 1));
        let lastNameIndex = Math.round(0 + Math.random() * (zombieNames.lastName.length - 1));
        this.enemy.name = zombieNames.firstName[firstNameIndex] + ' ' + zombieNames.secondName[secondNameIndex];
        this.enemy.lastName = zombieNames.lastName[lastNameIndex];
    }
}