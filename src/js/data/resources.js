require.context('./../../img', true, /\.(png|jpe?g|svg)$/);
require.context('./../../audio', true, /\.(wav|mp3)$/);
require.context('./../../fonts', true, /\.(ttf)$/);

export default class Resources {
    constructor() {
        this.background = {},
        this.robot = {},
        this.enemy = {
            dead: {
                head: [],
                body: [],
                legs: [],
                weapon: []                 
            },
            idle: {
                head: [],
                body: [],
                legs: [],
                weapon: []                
            },
            attack: {
                head: [],
                body: [],
                legs: [],
                weapon: []                 
            }
        },
        this.zombie = {
            dead: {
                head: null,
                body: null,
                legs: null
            },
            idle: {
                head: null,
                body: null,
                legs: null
            },
            attack: {
                head: null,
                body: null,
                legs: null
            }
        },        
        this.audio = {
            mainTheme: null,
            robot: {
                attack: null,
                shoot: null,
                dead: null
            },
            zombie: {
                attack: null,
                dead: null
            }
        },
        this.flags = [
            {
                country: "Australia",
                capital: "Canberra",
                img: null
            },
            {
                country: "Brazil",
                capital: "Brasilia",
                img: null
            },
            {
                country: "Canada",
                capital: "Ottawa",
                img: null
            },
            {
                country: "Germany",
                capital: "Berlin",
                img: null
            },
            {
                country: "Finland",
                capital: "Helsinki",
                img: null
            },
            {
                country: "Italy",
                capital: "Rome",
                img: null
            },
            {
                country: "Japan",
                capital: "Tokyo",
                img: null
            },
            {
                country: "Norway",
                capital: "Oslo",
                img: null
            },
            {
                country: "Sweden",
                capital: "Stockholm",
                img: null
            },
            {
                country: "Turkey",
                capital: "Ankara",
                img: null
            },
        ],
        this.hiddenWords = [
            {
                img: null,
                words: ['storm', 'showers', 'damp', 'clouds', 'wet', 'puddle']
            },
            {
                img: null,
                words: ['farm', 'dig', 'seed', 'garden', 'bloom', 'vine']
            },
            {
                img: null,
                words: ['boots', 'chill', 'mittens', 'snow', 'frost', 'ice']
            },
            {
                img: null,
                words: ['straw', 'mirror', 'tiles', 'couch', 'cat', 'cord']
            },
            {
                img: null,
                words: ['music', 'party', 'hungry', 'red', 'cheese', 'yummy']
            },
            {
                img: null,
                words: ['book', 'words', 'story', 'pages', 'read', 'novel']
            },
            {
                img: null,
                words: ['chill', 'sled', 'frost', 'cold', 'toboggan', 'ice']
            },
            {
                img: null,
                words: ['cut', 'man', 'snow', 'cool', 'tell', 'see']
            },
            {
                img: null,
                words: ['tree', 'fish', 'boy', 'hot', 'wave', 'nice']
            },
            {
                img: null,
                words: ['iowa', 'cow', 'guitar', 'orange', 'wow', 'laugh']
            }
        ],
        this.animals = [
            {
                animal: "bat",
                img: null
            },
            {
                animal: "bear",
                img: null
            },
            {
                animal: "beaver",
                img: null
            },
            {
                animal: "hedgehog",
                img: null
            },
            {
                animal: "monkey",
                img: null
            },
            {
                animal: "pig",
                img: null
            },
            {
                animal: "rhino",
                img: null
            },
            {
                animal: "squirrel",
                img: null
            },
            {
                animal: "tiger",
                img: null
            },
            {
                animal: "turtle",
                img: null
            }
        ]

    }

    init() {
        return Promise.all([
            this.loadBackground(),
            this.loadRobotBullet(),
            this.loadRobotShoot(),
            this.loadRobotIdle(),
            this.loadRobotMelee(),            
            this.loadRobotDead(),
            this.loadEnemyAttackFemaleBody(),
            this.loadEnemyAttackFemaleHead(),
            this.loadEnemyAttackFemaleLegs(),
            this.loadEnemyDeadFemaleBody(),
            this.loadEnemyDeadFemaleHead(),
            this.loadEnemyDeadFemaleLegs(),
            this.loadEnemyIdleFemaleBody(),
            this.loadEnemyIdleFemaleHead(),
            this.loadEnemyIdleFemaleLegs(),
            this.loadEnemyAttackMaleBody(),
            this.loadEnemyAttackMaleHead(),
            this.loadEnemyAttackMaleLegs(),
            this.loadEnemyDeadMaleBody(),
            this.loadEnemyDeadMaleHead(),
            this.loadEnemyDeadMaleLegs(),
            this.loadEnemyIdleMaleBody(),
            this.loadEnemyIdleMaleHead(),
            this.loadEnemyIdleMaleLegs(),
            this.loadMainThemeSound(),
            this.loadRobotAttackSound(),
            this.loadRobotShootSound(),
            this.loadZombieAttackSound(),
            this.loadRobotDeathSound(),
            this.loadZombieDeathSound(),
            this.loadIdleAxe(),
            this.loadIdleClub(),
            this.loadDeadAxe(),
            this.loadDeadClub(),
            this.loadAttackAxe(),
            this.loadAttackClub(),
            this.loadAustraliaFlag(),
            this.loadBrazilFlag(),
            this.loadCanadaFlag(),
            this.loadEnglandFlag(),
            this.loadFinlandFlag(),
            this.loadItalyFlag(),
            this.loadJapanFlag(),
            this.loadNorwayFlag(),
            this.loadSwedenFlag(),
            this.loadTurkeyFlag(),
            this.loadHiddenWordImg0(),
            this.loadHiddenWordImg1(),
            this.loadHiddenWordImg2(),
            this.loadHiddenWordImg3(),
            this.loadHiddenWordImg4(),
            this.loadHiddenWordImg5(),
            this.loadHiddenWordImg6(),
            this.loadHiddenWordImg7(),
            this.loadHiddenWordImg8(),
            this.loadHiddenWordImg9(),
            this.loadAnimal0(),
            this.loadAnimal1(),
            this.loadAnimal2(),
            this.loadAnimal3(),
            this.loadAnimal4(),
            this.loadAnimal5(),
            this.loadAnimal6(),
            this.loadAnimal7(),
            this.loadAnimal8(),
            this.loadAnimal9()        
        ]);
    }

    generateRandomZombie() {
        let head = Math.round(0 + Math.random() * (1 - 0));
        let body = Math.round(0 + Math.random() * (1 - 0));
        let legs = Math.round(0 + Math.random() * (1 - 0));
        let weapon = Math.round(0 + Math.random() * (1 - 0));
        this.zombie = {
                        dead: {
                            head: this.enemy.dead.head[head],
                            body: this.enemy.dead.body[body],
                            legs: this.enemy.dead.legs[legs],
                            weapon: this.enemy.dead.weapon[weapon]
                        },
                        idle: {
                            head: this.enemy.idle.head[head],
                            body: this.enemy.idle.body[body],
                            legs: this.enemy.idle.legs[legs],
                            weapon: this.enemy.idle.weapon[weapon]
                        },
                        attack: {
                            head: this.enemy.attack.head[head],
                            body: this.enemy.attack.body[body],
                            legs: this.enemy.attack.legs[legs],
                            weapon: this.enemy.attack.weapon[weapon]
                        }
                    }
    }

    loadBackground() {
        return new Promise((resolve, reject) => {            
            let sprite = new Image();
            sprite.src = 'img/canvas_img/background.png';            
            sprite.onload = () => {
                this.background = sprite;
                resolve();             
            };         
        })        
    }

    loadRobotIdle() {
        return new Promise((resolve, reject) => {
            let sprite  = new Image();
            sprite.src = `img/canvas_img/idle_robot.png`;
            sprite.onload = () => {
                this.robot.idle = sprite;
                resolve();
            }           
        }) 
                
    }
    
    loadRobotMelee() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_robot.png`;
            sprite.onload = () => {
                this.robot.melee = sprite;
                resolve();
            }           
        }) 
    }

    loadRobotShoot() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = 'img/canvas_img/shoot_robot.png';            
            sprite.onload = () => {
                this.robot.shoot = sprite;
                resolve();             
            };            
        }) 
    }

    loadRobotBullet() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = 'img/canvas_img/bullet_robot.png';         
            sprite.onload = () => {
                this.robot.bullet = sprite;
                resolve();             
            };            
        }) 
    }

    loadRobotDead() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = 'img/canvas_img/dead_robot.png';         
            sprite.onload = () => {
                this.robot.dead = sprite;
                resolve();             
            };            
        }) 
    }

    loadEnemyIdleMaleHead() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_male_head.png`;
            sprite.onload = () => {
                this.enemy.idle.head[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyIdleMaleBody() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_male_body.png`;
            sprite.onload = () => {
                this.enemy.idle.body[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyIdleMaleLegs() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_male_legs.png`;
            sprite.onload = () => {
                this.enemy.idle.legs[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyAttackMaleHead() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_male_head.png`;
            sprite.onload = () => {
                this.enemy.attack.head[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyAttackMaleBody() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_male_body.png`;
            sprite.onload = () => {
                this.enemy.attack.body[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyAttackMaleLegs() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_male_legs.png`;
            sprite.onload = () => {
                this.enemy.attack.legs[0]= sprite;
                resolve();
            }           
        })        
    }

    loadEnemyDeadMaleHead() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_male_head.png`;
            sprite.onload = () => {
                this.enemy.dead.head[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyDeadMaleBody() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_male_body.png`;
            sprite.onload = () => {
                this.enemy.dead.body[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyDeadMaleLegs() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_male_legs.png`;
            sprite.onload = () => {
                this.enemy.dead.legs[0] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyIdleFemaleHead() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_female_head.png`;
            sprite.onload = () => {
                this.enemy.idle.head[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyIdleFemaleBody() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_female_body.png`;
            sprite.onload = () => {
                this.enemy.idle.body[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyIdleFemaleLegs() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_female_legs.png`;
            sprite.onload = () => {
                this.enemy.idle.legs[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyAttackFemaleHead() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_female_head.png`;
            sprite.onload = () => {
                this.enemy.attack.head[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyAttackFemaleBody() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_female_body.png`;
            sprite.onload = () => {
                this.enemy.attack.body[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyAttackFemaleLegs() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_female_legs.png`;
            sprite.onload = () => {
                this.enemy.attack.legs[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyDeadFemaleHead() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_female_head.png`;
            sprite.onload = () => {
                this.enemy.dead.head[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyDeadFemaleBody() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_female_body.png`;
            sprite.onload = () => {
                this.enemy.dead.body[1] = sprite;
                resolve();
            }           
        })        
    }

    loadEnemyDeadFemaleLegs() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_female_legs.png`;
            sprite.onload = () => {
                this.enemy.dead.legs[1] = sprite;
                resolve();
            }           
        })        
    }

    loadIdleAxe() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_axe.png`;
            sprite.onload = () => {
                this.enemy.idle.weapon[0] = sprite;
                resolve();
            }           
        })
    }

    loadIdleClub() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/idle_club.png`;
            sprite.onload = () => {
                this.enemy.idle.weapon[1] = sprite;
                resolve();
            }    
        })
    }

    loadDeadAxe() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_axe.png`;
            sprite.onload = () => {
                this.enemy.dead.weapon[0] = sprite;
                resolve();
            }           
        })
    }

    loadDeadClub() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/dead_club.png`;
            sprite.onload = () => {
                this.enemy.dead.weapon[1] = sprite;
                resolve();
            }    
        })
    }

    loadAttackAxe() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_axe.png`;
            sprite.onload = () => {
                this.enemy.attack.weapon[0] = sprite;
                resolve();
            }           
        })
    }

    loadAttackClub() {
        return new Promise((resolve, reject) => {
            let sprite = new Image();
            sprite.src = `img/canvas_img/attack_club.png`;
            sprite.onload = () => {
                this.enemy.attack.weapon[1] = sprite;
                resolve();
            }    
        })
    }

    loadMainThemeSound() {
        return new Promise((resolve, reject) => {
            let sound = new Audio('audio/mainTheme.mp3');
            sound.volume = 0.2;
            sound.loop = true;
            sound.oncanplay = () => {
                this.audio.mainTheme = sound;
                resolve();
            }          
        })        
    }

    loadRobotAttackSound() {
        return new Promise((resolve, reject) => {
            let sound= new Audio('audio/robotAttack.wav');
            sound.volume = 0.4;
            sound.oncanplay = () => {
                this.audio.robot.attack = sound;
                resolve();
            }          
        })        
    }

    loadRobotShootSound() {
        return new Promise((resolve, reject) => {
            let sound= new Audio('audio/robotShoot.wav');
            sound.volume = 0.4;
            sound.oncanplay = () => {
                this.audio.robot.shoot = sound;
                resolve();
            }          
        })        
    }

    loadZombieAttackSound() {
        return new Promise((resolve, reject) => {
            let sound= new Audio('audio/zombieAttack.wav');
            sound.volume = 0.4;
            sound.oncanplay = () => {
                this.audio.zombie.attack = sound;
                resolve();
            }          
        })        
    }

    loadRobotDeathSound() {
        return new Promise((resolve, reject) => {
            let sound= new Audio('audio/robotDeath.mp3');
            sound.volume = 0.4;
            sound.oncanplay = () => {
                this.audio.robot.dead = sound;
                resolve();
            }          
        })        
    }

    loadZombieDeathSound() {
        return new Promise((resolve, reject) => {
            let sound= new Audio('audio/zombieDeath.wav');
            sound.volume = 0.4;
            sound.oncanplay = () => {
                this.audio.zombie.dead = sound;
                resolve();
            }          
        })        
    }

    loadAustraliaFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Australia.png`;
            img.onload = () => {
                this.flags[0].img = img;
                resolve();
            }    
        })
    }

    loadBrazilFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Brazil.png`;
            img.onload = () => {
                this.flags[1].img = img;
                resolve();
            }    
        })
    }

    loadCanadaFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Canada.png`;
            img.onload = () => {
                this.flags[2].img = img;
                resolve();
            }    
        })
    }

    loadEnglandFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Germany.png`;
            img.onload = () => {
                this.flags[3].img = img;
                resolve();
            }    
        })
    }

    loadFinlandFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Finland.png`;
            img.onload = () => {
                this.flags[4].img = img;
                resolve();
            }    
        })
    }

    loadItalyFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Italy.png`;
            img.onload = () => {
                this.flags[5].img = img;
                resolve();
            }    
        })
    }

    loadJapanFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Japan.png`;
            img.onload = () => {
                this.flags[6].img = img;
                resolve();
            }    
        })
    }

    loadNorwayFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Norway.png`;
            img.onload = () => {
                this.flags[7].img = img;
                resolve();
            }    
        })
    }

    loadSwedenFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Sweden.png`;
            img.onload = () => {
                this.flags[8].img = img;
                resolve();
            }    
        })
    }

    loadTurkeyFlag() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/countries/Turkey.png`;
            img.onload = () => {
                this.flags[9].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg0() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img0.png`;
            img.onload = () => {
                this.hiddenWords[0].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg1() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img1.png`;
            img.onload = () => {
                this.hiddenWords[1].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg2() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img2.png`;
            img.onload = () => {
                this.hiddenWords[2].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg3() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img3.png`;
            img.onload = () => {
                this.hiddenWords[3].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg4() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img4.png`;
            img.onload = () => {
                this.hiddenWords[4].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg5() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img5.png`;
            img.onload = () => {
                this.hiddenWords[5].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg6() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img6.png`;
            img.onload = () => {
                this.hiddenWords[6].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg7() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img7.png`;
            img.onload = () => {
                this.hiddenWords[7].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg8() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img8.png`;
            img.onload = () => {
                this.hiddenWords[8].img = img;
                resolve();
            }    
        })
    }

    loadHiddenWordImg9() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/find_words/img9.png`;
            img.onload = () => {
                this.hiddenWords[9].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal0() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/bat.png`;
            img.onload = () => {
                this.animals[0].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal1() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/bear.png`;
            img.onload = () => {
                this.animals[1].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal2() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/beaver.png`;
            img.onload = () => {
                this.animals[2].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal3() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/hedgehog.png`;
            img.onload = () => {
                this.animals[3].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal4() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/monkey.png`;
            img.onload = () => {
                this.animals[4].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal5() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/pig.png`;
            img.onload = () => {
                this.animals[5].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal6() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/rhino.png`;
            img.onload = () => {
                this.animals[6].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal7() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/squirrel.png`;
            img.onload = () => {
                this.animals[7].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal8() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/tiger.png`;
            img.onload = () => {
                this.animals[8].img = img;
                resolve();
            }    
        })
    }
    
    loadAnimal9() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = `img/games_img/animals/turtle.png`;
            img.onload = () => {
                this.animals[9].img = img;
                resolve();
            }    
        })
    }
}
