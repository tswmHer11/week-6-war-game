//Create 2 Players
class Player {
    constructor(name) {
        this.name = name;
        this.playerHand = [];
        this.score = 0;
       
    } 
    playerCard() { 
        return this.playerHand.shift()
    }
    incrementScore() {
        return this.score += 1;
    }

}

class Card{
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    describe() {
        return ` ${this.value} Of ${this.suit}`
    }
}

class Deck{ 
    constructor(cards = createDeck()) {
        this.cards = cards;
       
    }
    
    //Create a way to shuffle the deck. 
    shuffle() {
        for (let s = 0; s < this.cards.length; s++) {
            let tempCard = this.cards[s];
            let randomIndex = Math.floor(Math.random() * 52);
            this.cards[s] = this.cards[randomIndex];
            this.cards[randomIndex] = tempCard;
        }
    }
}
// card value map shows value of each card
const cardValueMap = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}


    
//Creates a new Deck
function createDeck() {
    const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    //Function that creates one array from suits and values arrays.
        return suits.flatMap( suit => { 
            return values.map( value => {
                return new Card(suit, value)
            })
        })
   
}

function getPlayer() {
    let p1 = new Player(prompt('Enter the name of Player1: '));
    let p2 = new Player(prompt('Enter the name of Player2: '));

        return [p1,p2];
}

const gameDeck = new Deck() // calls for new deck
const shuffleDeck = gameDeck.shuffle()

// when we start the game, the deck is shuffled and player1 gets the even cards and player2 gets odd cards. just like passing out cards
function playWar() {
    let [p1,p2] = getPlayer();
    gameDeck.shuffle();
    for (let c = 0; c < 52; c++) {
        if ( c % 2 == 0) {
            p1.playerHand.push(gameDeck.cards.shift());
        }
        else {
            p2.playerHand.push(gameDeck.cards.shift());
        }
    }
    
    playGame(p1,p2)    
}
function isRoundWinner(cardone,cardtwo) { // function helps to compare value of cards
    return cardValueMap[cardone.value] > cardValueMap[cardtwo.value]
}

function playGame(p1,p2) {
    console.log(p1.playerHand.length,p2.playerHand.length)
    // for (let i = 0; i < 26; i++) {
    // while (p1.playerHand.length == 0 || p2.playerHand.length == 0) {
    do{
        let p1Card = p1.playerCard(); // Player Cards are being drawn from their decks
        let p2Card = p2.playerCard();
        console.log(p1.playerHand.length,p2.playerHand.length)
            if(isRoundWinner(p1Card,p2Card)) { // Compare cards
                p1.incrementScore(); // player with higher value card gets a point
                // p1.playerHand.push(p2Card);
                // p1.playerHand.push(p1Card);
                console.log(`${p1.name} is the round Winner`)
            }
            else if (isRoundWinner(p2Card,p1Card)){ 
                p2.incrementScore();
                // p2.playerHand.push(p1Card);
                // p2.playerHand.push(p2Card);
                console.log(`${p2.name} is the round Winner`)
            }
            else  {  // if there is a draw the cards are returned to there respective player if (p1Card.value === p2Card.value)
                alert(`DRAW`);
                console.log(p1Card, p2Card);
            //     p1.playerHand.push(p1Card);
            //     p2.playerHand.push(p2Card);
            }
        
        console.log(p1.playerHand, p2.playerHand)    
        
        alert(`Player 1 card: ${p1Card.describe()}          ${p1.name} score:${p1.score}
PLayer 2 card: ${p2Card.describe()}         ${p2.name} score: ${p2.score}`);
    }
    while (p1.playerHand.length != 0 || p2.playerHand.length != 0) {
    // player with 0 cards loses.
        if (p1.score > p2.score) {
            alert(`Congratulations ${p1.name} is the WINNER with ${p1.score} points!`)
            console.log(`${p1.name}: ${p1.score}   ${p2.name}: ${p2.score}`)
        }
        else if (p2.score > p1.score){
            alert(`Congratulations ${p2.name} is the WINNER with ${p2.score} points!`)
            console.log(`${p1.name}: ${p1.score}   ${p2.name}: ${p2.score}`)
        }
        else {
            alert(`${p1.name}: ${p1.score}` + "WE HAVE A DRAW!" + `${p2.name}: ${p2.score}`);
            console.log("DRAW")
        }
    }
}

playWar()