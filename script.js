// De API URL
const api = "http://api.exchangeratesapi.io/v1/latest?access_key=87dd94b742bd0afac2ba96d8cd3bce8b";
// Het vakje waar het bedrag in staat dat door de gebruiker is ingevoerd.
var geldhoeveelheid = document.querySelector(".geldhoeveelheid");
// De wissel knop.
var wissel = document.querySelector(".wissel");
// Select van de eerste valuta
var vanVLT = document.querySelector(".van");
// Select van de tweede valuta
var naarVLT = document.querySelector(".naar");
// De resultaat en dus het eindbedrag
var Omgerekend = document.querySelector(".Omgerekend");
var eindbedrag = document.getElementById("eindbedrag");

var resultaatVan;
var resultaatNaar;
var zoekwaarde;

// Functie om de eerste geselecteerde valuta te krijgen.
vanVLT.addEventListener('change', (event) => {
    resultaatVan = `${event.target.value}`;
});

// Functie om de tweede geselecteerde valuta te krijgen.
naarVLT.addEventListener('change', (event) => {
    resultaatNaar = `${event.target.value}`;
});

geldhoeveelheid.addEventListener('input', bedrag);
// Functie om het bedrag te krijgen dat door de gebruiker is ingevoerd.
function bedrag(e) {
    zoekwaarde = e.target.value;
}

// Als de wissel knop wordt ingedrukt, wordt de resultaten binnen gehaald.
wissel.addEventListener("click", krijgResultaat);

// Functie om de resultaat te krijgen
function krijgResultaat() {
    // Zoekt naar de API
    fetch(`${api}`)
        .then(valuta => {
            // Pakt de resultaten van de API.
            return valuta.json();
        // Voert de functie voor de berekening uit.
        }).then(resultaten);
}

// Functie voor het omrekenen van het bedrag en het eindbedrag op de website laten zien.
function resultaten(valuta) {
    // Pakt de 'eerste geslecteerde' valuta en de cijfers bij de JSON.
    let vanRate = valuta.rates[resultaatVan];
    // Pakt de 'twee geslecteerde' valuta en de cijfers bij de JSON.
    let naarRate = valuta.rates[resultaatNaar];
    // Doet de berekening om het eindbedrag te krijgen.
    Omgerekend.innerHTML =
       ((naarRate / vanRate) * zoekwaarde).toFixed(2);
       // Laat het eindbedrag om de website zien.
       eindbedrag.style.display = "block";
}


// Deze functie zorgt ervoor dat reset button werkt.
function resetKnop() {
    // De pagina wordt refresht.
    window.location.reload();
    // Zorgt ervoor dat omgerekend bedrag leeg is.
    document.getElementsByClassName("Omgerekend").innerHTML = "";
};
