//generate cards
suits = ["heart", "spades", "diamonds", "clubs"]
values = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"]
const deck = new Map()

for(suit of suits){
    for(value of values){
        //value for J,Q,K
        if(value == "J" || value == "Q" || value == "K"){
            deck.set(`${value} of ${suit}`, 10)
        }
        //value for Ace
        else if(value == "A"){
            deck.set(`${value} of ${suit}`, 1)
        }
        //face-up values
        else{
            deck.set(`${value} of ${suit}`, value)
        }
    }
}

//deal cards to dealer and player

const deckArray = Array.from(deck)

const player = new Map()
const dealer = new Map()

for(i=0; i < 2; i++){

    let playerRandomIndex = Math.floor(Math.random() * deckArray.length)
    let dealerRandomIndex = Math.floor(Math.random() * deckArray.length)
    
    player.set(deckArray[playerRandomIndex][0], deckArray[playerRandomIndex][1])
    dealer.set(deckArray[dealerRandomIndex][0], deckArray[dealerRandomIndex][1])
}

console.log("----STARTING HANDS----")
console.log(player)
console.log(dealer)

//game logic

//