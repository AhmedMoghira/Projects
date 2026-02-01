// ? rock paper scissor
let userScore = 0;
let computerScore = 0;
let choices = ['rock', 'paper', 'scissor'];

function playGame(){
  function getComputerChoice(){
  let choice = Math.floor(Math.random() * 3);

  return choices[choice];
  }

  function getUserChoice(){
    return prompt("choose 'r' 'p' 's'");
  }

  function playRound(userChoice, computerChoice){
    userChoice = userChoice.toLowerCase();
    console.log(userChoice, computerChoice);
    if(userChoice == 'r'){
      
      if(computerChoice == 'rock') console.log("Tie");
      else if(computerChoice == 'paper') {
        console.log("You lose");
        computerScore++;
      }
      else if(computerChoice == 'scissor') {
        console.log("You win!");
        userScore++;
      }
    }
    if(userChoice == 'p'){
      if(computerChoice == 'paper') console.log("Tie");
      else if(computerChoice == 'scissor') {
        console.log("You lose"); 
        computerScore++;
      }
      else if(computerChoice == 'rock') {
        console.log("You win!");
        userScore++;
      }
    }
    if(userChoice == 's'){
      if(computerChoice == 'scissor') console.log("Tie");
      else if(computerChoice == 'rock') {
        console.log("You lose");
        computerScore++;
      }
      else if(computerChoice == 'paper') {
        console.log("You win!");
        userScore++;
      }
    }
    console.log(`Computer Score is : ${computerScore}`);
    console.log(`User Score is : ${userScore}`);
    console.log("--------------------------");
  }
  playRound(getUserChoice(), getComputerChoice());
}
for (let i = 0; i < 5; i++){
  playGame();
}