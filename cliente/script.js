hearts = [];
diamonds = [];
clubs = [];
spades = []
cards = []

function allowDrop(event) {
    event.preventDefault();
    const container = event.target.closest('.container');
    if (container) {
        container.classList.add('hovered');
    }
}


function removeCard(card){

    console.log("REMOVE: "+JSON.stringify(card));

    this.cards_model.forEach(function(currentValue, index, arr){
        if(this.cards_model[index].id == card.id){
            this.cards_model.splice(index, index);     
         }
        })
}
// Función para manejar la caída de la carta
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const card = document.getElementById(data);
    const container = event.target.closest('.container');

    // Comprobar que la carta se suelta en el contenedor correcto
    if (container && container.id === card.dataset.suit ) {
        console.log("REMOVE: "+JSON.stringify(card.dataset.values));
        container.appendChild(card);

        this.removeCard(card);

       // console.log("DROP: "+JSON.stringify(this.cards_model));
    }

    // Eliminar el resaltado
    container.classList.remove('hovered');
}
function guardarPosicion(card) {

}

// Función que maneja el inicio del arrastre de la carta
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    console.log()
}

function generateArray() {

    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var cards = [];
    for (j = 0; j < suits.length; j++) {
        for (i = 0; i < values.length; i++) {
            var aux = {
                id: suits[j] + "_" + values[i],
                suit: suits[j],
                value: values[i]
            }
            cards.push(aux);
        }

    }
    return cards;
}
// Crear las cartas y asignarlas al tablero
function createCards() {
    const board = document.getElementById("board");
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    console.log(JSON.stringify(this.generateArray()));


    this.cards_model = this.generateArray();

    var cards = [];
    for (i = 0; i < cards_model.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = cards_model[i].id;
        card.dataset.suit = cards_model[i].suit;

        // Crear el contenido de la carta
        card.innerHTML = `
                <div class="card-value">${cards_model[i].value}</div>
                <div class="card-icon">
                    <i class="fa ${getIconClass(cards_model[i].suit)}"></i>
                </div>
            `;

        card.draggable = true;
        card.ondragstart = drag;
        cards.push(card);

    }

    // Agregar las cartas al tablero
    board.append(...cards);
}

function getIconClass(suit) {
    switch (suit) {
        case "hearts":
            return "fa-heart";
        case "diamonds":
            return "fa-gem";
        case "clubs":
            return "fa-clover";
        case "spades":
            return "fa-user-astronaut";
        default:
            return "";
    }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    createCards();
});
