import Resources from './data/resources.js';
import State from './engine/state.js';
import Animation from './engine/animation.js';
import MathGame from './games/mathGame.js';
import LinguaGame from './games/linguaGame.js';
import DragGame from './games/dragGame.js';
import ListeningGame from './games/listeningGame.js';
import ChemistryGame from './games/chemistryGame.js';
import FlagsGame from './games/flagsGame.js';
import IrregularVerbsGame from './games/irregularVerbsGame.js';
import CapitalsGame from './games/capitalsGame.js';
import HiddenWordsGame from './games/hiddenWordsGame.js';
import CountriesGame from './games/countriesGame.js';
import AnimalsGame from './games/animalsGame.js';
import ReverseMathGame from './games/reverseMathGame.js';
import Menu from './scenes/menu.js';
import ResultScreen from './scenes/resultScreen.js';
import RecordsTable from './scenes/recordsTable.js';
import Attacks from './engine/attacks.js';
import Sounds from './engine/sounds.js';
import reset from '../css/reset.css';
import fonts from '../css/fonts.css';
import style from '../css/style.css';


const animation = new Animation();
const resources = new Resources();
const state = new State();
const sounds = new Sounds(resources);
const recordsTable = new RecordsTable(state);
const menu = new Menu(resources, state, animation, recordsTable, sounds);
const resultScreen = new ResultScreen(resources, state, animation, menu);
const attacks = new Attacks(state, resultScreen, recordsTable, sounds, animation);
const mathGame = new MathGame(state, attacks, animation, resultScreen);
const linguaGame = new LinguaGame(state, attacks, animation, resultScreen);
const listeningGame = new ListeningGame(state, attacks, animation, resultScreen);
const dragGame = new DragGame(state, attacks, animation, resultScreen);
const chemistryGame = new ChemistryGame(state, attacks, animation, resultScreen);
const irregularVerbsGame = new IrregularVerbsGame(state, attacks, animation, resultScreen);
const flagsGame = new FlagsGame(state, attacks, animation, resultScreen, resources);
const capitalsGame = new CapitalsGame(state, attacks, animation, resultScreen, resources);
const hiddenWordsGame = new HiddenWordsGame(state, attacks, animation, resultScreen, resources);
const countriesGame = new CountriesGame(state, attacks, animation, resultScreen);
const animalsGame = new AnimalsGame(state, attacks, animation, resultScreen, resources);
const reverseMathGame = new ReverseMathGame(state, attacks, animation, resultScreen);

resources.init().then( () => {
    menu.hideLoadingScreen();
});

// -----------TEST BUTTOS--------------------

// const btn2 = document.getElementById('enemy-test-kill');
// const btn3 = document.getElementById('robot-test-kill');
// const spellField = document.getElementById('spell-field');

// btn2.addEventListener('click', () => {
//     state.robotMeleeAttack(animation);
//     spellField.classList.add('hidden');    
// })

// btn3.addEventListener('click', () => {
//     state.enemyAttack(animation);
//     spellField.classList.add('hidden');
// })




