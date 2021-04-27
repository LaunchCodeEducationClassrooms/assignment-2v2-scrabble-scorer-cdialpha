// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

//ALGORITHM NUMBER ZERO 
let simpleScore = function(word) { 
  word = word.toUpperCase();
  let totalPoints = 0; 
  let letterPoints = ""
  for (let i=0; i<word.length; i++){
    totalPoints++;
    console.log(`Points for '${word[i]}':1`); 
  }
  console.log('Simple Scoring Method Produces: ' + totalPoints + ' points');
  return totalPoints;
}

//ALGORITHM NUMBER ONE 
let vowelBonusScore = function(word) {
  let vowels = ['A', 'E', 'I', 'O', 'U']
  let totalPoints = 0;
  word = word.toUpperCase();
    for (let i=0; i<word.length; i++){ 
        if (vowels.includes(word[i])){
          totalPoints += 3;
          console.log(`Points for '${word[i]}':3`);
          }
        else {
          totalPoints ++
          console.log(`Points for '${word[i]}':1`);
          }  
    }        
console.log('Vowel Bonus Scoring Method Procudes ' + totalPoints + ' points')
return totalPoints;
} 

//ALGORTHIM NUMBER TWO  

let oldScrabbleScore = function(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	let totalPoints = [];
  for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
      totalPoints.push(parseInt(pointValue));
      letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 	  }
	}
  totalPoints = totalPoints.reduce((x,y)=>x+y);
  console.log('Old Scrabble Scorer Value:\n'+ letterPoints);
  console.log('Scrabble Scoring Method Procudes ' + totalPoints + ' points for the word: ' + word);
  return totalPoints;
 }

// Transform turns the Old Point Structure into a more efficient "New" Point Structure. 
let transform = function(someobj) { 
  let newObject = {}; 
  let myentries = Object.entries(someobj);
for (let i = 0; i < myentries.length ; i++){ 
  for (let j of myentries[i][1]){
    newObject[j.toLowerCase()]=Number([myentries[i][0]]); 
}
}
return newObject
}

let newPointStructure = transform(oldPointStructure);

// this funtion scores a word using the New Point Structure
let scrabbleScore = function(word) { 
word = word.toLowerCase();
let letterPoints = 0;
for (let i=0; i<word.length; i++){
for (let x in newPointStructure){
  if (x == word[i]){
    console.log("Points for '" + x + "' : " + newPointStructure[x])
    letterPoints += newPointStructure[x];
  }
}
}
console.log('Scrabble "New!" Scoring Method Procudes: ' + letterPoints + ' points')
return letterPoints; 
}


// This Array stores the Various types of Scoring Algorithms that are used by the User Input Function. 
const scoringAlgorithms = [ 
  {name:'Simple Scorer',
  description:'Each letter is worth 1 point',  
  scoringFunction:simpleScore},

  {name:'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction:vowelBonusScore},

  {name:'Scrabble NEW!',
  description: 'The traditional scoring algorithm REVAMPED!',
  scoringFunction:scrabbleScore}
]

//This Function asks the User for a Word
let word = ""; 
function initialPrompt() {
  console.log("Let's play some scrabble!");
  word = input.question("Enter a word to score:");
  word = String(word);
  return word; 
};

//ASK THE USER WHAT ALGORITHM TO USE
function scorerPrompt() {
scoreType = input.question("Which scoring method would you like to employ? \n \n 0 -" + scoringAlgorithms[0].name + "\n 1 - " + scoringAlgorithms[1].name + "\n 2 - " + scoringAlgorithms[2].name + "\n \n Please chose an algorithm:");
if (scoreType <= 2) {   
  console.log("You chose: " + scoringAlgorithms[scoreType].name);
  let word = initialPrompt()
  if (scoreType == 0){
  scoringAlgorithms[0].scoringFunction(word);
  }
  else if (scoreType == 1) {
  scoringAlgorithms[1].scoringFunction(word);
  }
  else { 
  scoringAlgorithms[2].scoringFunction(word);
}
}
}
function runProgram() {
   scorerPrompt();   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

