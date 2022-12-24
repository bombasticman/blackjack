//generate cards
suits = ["heart", "spades", "diamonds", "clubs"]
values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
const deck = new Map()

for (suit of suits) {
    for (value of values) {
        //value for J,Q,K
        if (value == "J" || value == "Q" || value == "K") {
            deck.set(`${value} of ${suit}`, 10)
        }
        //value for Ace
        else if (value == "A") {
            deck.set(`${value} of ${suit}`, 1)
        }
        //face-up values
        else {
            deck.set(`${value} of ${suit}`, value)
        }
    }
}

//deal cards to dealer and player

const deckArray = Array.from(deck)
const player = new Map()
const dealer = new Map()

let previousRandomIndexes = []
for (i = 0; i < 2; i++) {
    dealCardsDealer()
    dealCardsPlayer()
}



console.log("----STARTING HANDS----")
console.log("----PLAYER----")
console.log(player)
console.log("----DEALER----")
console.log(dealer)


//needed values
const playerValues = player.values()
const dealerValues = dealer.values()

//sum of the card's values in dealer's and player's hands
console.log("----TOTAL VALUE OF CARDS----")
console.log("----PLAYER----")
let playerSum = sumHandPlayer()
console.log("----DEALER----")
let dealerSum = sumHandDealer()

//game plays out
gameLogic()

// functions
function dealCardsPlayer() {
    let playerRandomIndex = Math.floor(Math.random() * deckArray.length)
    while (previousRandomIndexes.includes(playerRandomIndex) === true) {
        playerRandomIndex = Math.floor(Math.random() * deckArray.length)
    }
    previousRandomIndexes.push(playerRandomIndex)
    player.set(deckArray[playerRandomIndex][0], deckArray[playerRandomIndex][1])
}

function dealCardsDealer() {
    let dealerRandomIndex = Math.floor(Math.random() * deckArray.length)
    while (previousRandomIndexes.includes(dealerRandomIndex) === true) {
        dealerRandomIndex = Math.floor(Math.random() * deckArray.length)
    }
    previousRandomIndexes.push(dealerRandomIndex)
    dealer.set(deckArray[dealerRandomIndex][0], deckArray[dealerRandomIndex][1])
}

function sumHandPlayer() {
    let playerSum = 0
    for (let value of player.values()) {
        playerSum += value
    }
    console.log(playerSum)
    return playerSum
}

function sumHandDealer() {
    let dealerSum = 0
    for (let value of dealer.values()) {
        dealerSum += value
    }
    console.log(dealerSum)
    return dealerSum
}

function gameLogic() {
    //draw conditions
    if (playerSum === 21 && dealerSum === 21 || playerSum > 21 && dealerSum > 21) {
        console.log("----DRAW----")
    }
    //lose conditions
    else if (playerSum > 21 || dealerSum > 21) {
        if (playerSum > 21) {
            console.log("----DEALER WINS----")
        }
        else if (dealerSum > 21) {
            console.log("----PLAYER WINS----")
        }
    }
    //continue conditions
    else {
        console.log("----NO 21 CONTINUE----")
        dealCardsPlayer()
        console.log("----PLAYER GETS A CARD----")
        console.log(player)
        console.log("----PLAYER HAND VALUE----")
        playerSum = sumHandPlayer()
        if (playerSum === 21) {
            return console.log("----PLAYER WINS----")
        }
        else if (playerSum > 21) {
            return console.log("----DEALER WINS----")
        }
        else {
            console.log("----DEALER GETS A CARD----")
            dealCardsDealer()
            console.log("----DEALER HAND----")
            console.log(dealer)
            console.log("----DEALER HAND VALUE----")
            dealerSum = sumHandDealer()
            gameLogic()
        }
    }
}