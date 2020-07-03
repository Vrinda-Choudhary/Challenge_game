//challenge 1: Your age in days
function ageInDays(){
    var birthyear= prompt("what year where you born?");
    var ageindays= (2020-birthyear)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode("you are "+ ageindays+ " days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
// alert(ageindays);

}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCat(){
    var image=document.createElement('img');
    image.src="https://media.giphy.com/media/SBIDrovnm0wOA/giphy.gif";
   
    var div=document.getElementById('flex-cat-gen');
    div.appendChild(image);

}

//challenge 3 rock paper scissors

function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice=yourChoice.id;
    botChoice= numberToChoice(randToRpsInt());
    results=decideWinner(humanChoice,botChoice);
    message=finalMessage(results); //{'messgae':'you won', 'color':'green'}
   // console.log(message);
   rpsFrontEnd(yourChoice.id,botChoice,message);
}


function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
    var rpsDatabase={
        'rock': {'scissors':1,'rock': 0.5, 'paper':0},
        'paper': {'scissors':0,'rock':1, 'paper':0.5},
        'scissors': {'scissors':0.5,'rock': 0, 'paper':1}
    }

    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];
    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if(yourScore===0){
        return {'message': 'You Lost', 'color':'red'};
    }
    else if(yourScore===0.5){
        return {'message': 'You tied', 'color':'yellow'};
    }
    else{
        return {'message': 'You Won', 'color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){

    var imagesDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    //remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='" + imagesDatabase[humanImageChoice]+ "' height=150 width=150 style='box-shadow: 0px 10px 50px blue'>";
    botDiv.innerHTML="<img src='"+ imagesDatabase[botImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px red'>";
    messageDiv.innerHTML="<h1 style='color:" + finalMessage['color']+"; font-size:60px; padding: 30px;'>"+finalMessage['message']+"</h1>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
   
}

//challenge 4: change the color of all buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if(buttonThingy.value==='red'){
        buttonRed();
    }
    else if(buttonThingy.value==='green'){
        buttonGreen();
    }
    else if(buttonThingy.value==='random'){
        randomColor();
    }
    else{
        buttonColorReset();
    }
}

function buttonRed(){
   for(let i=0;i<all_buttons.length;i++){
       all_buttons[i].classList.remove(all_buttons[i].classList[1]);
       all_buttons[i].classList.add('btn-danger');
   } 
}

function buttonGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);

    }

}

function randomColor(){
    var choices=['btn-primary','btn-danger','btn-success','btn-warning'];
    for(let i=0;i<all_buttons.length;i++){
        var randomnum=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomnum]);
    }
}


//Challenge 5: blackjack
let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins': 0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver': false,
};

const YOU =blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const HITSOUND= new Audio("C:/Users/vrinda/Desktop/practice/sounds/swish.m4a");
const WINSOUND= new Audio("C:/Users/vrinda/Desktop/practice/sounds/cash.mp3");
const lossSound= new Audio("C:/Users/vrinda/Desktop/practice/sounds/aww.mp3");


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

function blackjackHit(){

    if(blackjackGame['isStand']===false){
    let card=randomCard();
  //  console.log(card);
  showCard(card,YOU);
  updateScore(card,YOU);
  showScore(YOU);
}

}

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'] [randomIndex];
}


function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`C:/Users/vrinda/Desktop/practice/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    HITSOUND.play();
}
}


function blackjackDeal(){
    if(blackjackGame['turnsOver']===true){

    blackjackGame['isStand']=false;
    
  
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }

    for(let i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;
  //  document.querySelector(blackjackGame['you']['scoreSpan']).textContent=0;
  //  document.querySelector(blackjackGame['you']['scoreSpan']).style.color= "white";
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#your-blackjack-result').style.color='white';
    document.querySelector('#dealer-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').style.color='white';

    document.querySelector('#blackjack-result').textContent="Let's play";
    document.querySelector('#blackjack-result').style.color='black';

    blackjackGame['turnsOver']=true;
}
}



function updateScore(card,activePlayer){
    // if adding 11 keeps me below 21 add 11 else add 1;
   
    if(card==='A'){
    if((activePlayer['score'])+blackjackGame['cardsMap'][card][1] <= 21){
        activePlayer['score']+= blackjackGame['cardsMap'][card][1] ;
    }
    else{
        activePlayer['score']+= blackjackGame['cardsMap'][card][0];
    }
    }
    else
    activePlayer['score']+= blackjackGame['cardsMap'][card];

}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent= 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color= 'red';
    }
    else
    document.querySelector(activePlayer['scoreSpan']).textContent= activePlayer['score'];
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}



 async function dealerLogic(){


    blackjackGame['isStand']=true;

    while(DEALER['score']<16 && blackjackGame['isStand']===true){
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep(1000);
     }

    
        blackjackGame['turnsOver']=true;
        showResult(computeWinner());
    
    



}


// compute winner and return who just won
//update the wins loss and draws
function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        // condition: higher score than the dealer or when dealer busts but you're 21 or under
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
           blackjackGame['wins']++;
            winner=YOU;
          //  document.querySelector('#blackjack-result').textContent='YOU WIN!!!';
        }
        else if(YOU['score']<DEALER['score']){
            winner=DEALER;
            blackjackGame['losses']++;
           // document.querySelector('#blackjack-result').textContent='YOU LOST!!!';
        }
        else if(YOU['score']===DEALER['score']){
            blackjackGame['draws']++;
           // document.querySelector('#blackjack-result').textContent='YOU DREW!!!';
        }
        //condition: when user busts but dealer doesnt
    }
    else if(YOU['score']> 21 && DEALER['score']<=21) {
        winner=DEALER;
        blackjackGame['losses']++;
        //document.querySelector('#blackjack-result').textContent='YOU LOST!!!';
            //condition : when you and dealer bust
    }
    else if(YOU['score']>21 && DEALER['score']>21){
               blackjackGame['draws']++;
       // document.querySelector('#blackjack-result').textContent='YOU DREW!!!';
    }
    return winner;
}


function showResult(winner){

    if(blackjackGame['turnsOver']===true){

    
    let message, messageColor;
    if(winner=== YOU){
        document.querySelector('#wins').textContent=blackjackGame['wins'];
        message="You won!";
        messageColor='green';
        WINSOUND.play();
    }
    else if(winner === DEALER){
        document.querySelector('#losses').textContent=blackjackGame['losses'];
        message="You lost!";
        messageColor='red';
        lossSound.play();
    }
    else{
        document.querySelector('#draws').textContent=blackjackGame['draws'];
        message="You drew!";
        messageColor='black';
        
    }
    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color= messageColor;
}
}

