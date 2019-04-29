let modal1 = document.getElementById('helpModal');
let help = document.getElementById('help');
//otvaranje prozora klikom na dugme pravila
help.onclick = function () {
    modal1.style.display = "block";
}
//zatvaranje otvorenog prozora
var span = document.getElementsByClassName("close");
span[0].onclick = function () {
    modal1.style.display = "none";
}
//kreiranje niza sličica
let niz = [];
for (let i = 1; i <= 60; i++) {
    niz.push(i + '.png');
}
console.log(niz);
//Određivanje težine
class Mode {
    constructor(cards) {
        this.cards = cards; //broj parova
    }
    //izbor neophodnih sličica
    createArray() {
        let array = [];
        while (array.length < this.cards) {
            let k = Math.floor(Math.random() * niz.length);//nasumičan indeks
            if (!(array.includes(niz[k]))) {
                array.push(niz[k]); //ubacuje sličicu sa indeksom k u novi niz ukoliko se već ne nalazi u nizu
            }
        }
        array = array.concat(array); //dupliranje sličica
        return array;
    }
    addClass() {
        return document.getElementById('type').value;
    }
}
//postavljanje kartica
function openBoard() {
    let type = document.getElementById('type').value; //dohvatanje selektovane vrednosti
    let tezina; //deklaracija promenljive koja će postati element clase Mode sa parametrima koji zavise od selektovane vrednosti
    if (type == 'easy') {
        tezina = new Mode(5);
    } else if (type == 'medium') {
        tezina = new Mode(10);
    } else {
        tezina = new Mode(20);
    }
    niz = tezina.createArray(); //izbor sličica
    shuffle(niz); //mešanje sličica
    for (let i = 0; i < niz.length; i++) {
        let div = document.createElement('div');
        div.setAttribute('data-ime', niz[i]);
        div.classList.add(tezina.addClass());
        let img = document.createElement('img');
        img.setAttribute('src', 'static/smile/' + niz[i]);
        img.setAttribute('class', 'front');
        let poz = document.createElement('img');
        poz.setAttribute('src', 'static/pozadina.jpg');
        poz.setAttribute('class', 'back');
        div.appendChild(img);
        div.appendChild(poz);
        document.getElementById('board').appendChild(div);
    }
}
//moderna verzija Fisher-Yates algoritma
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // nasumičan indeks od 0 do i
        [array[i], array[j]] = [array[j], array[i]]; // zamena elemenata
    }
}
// pokretanje igrice
function startGame() {
    about.style.display = 'flex'; // div #about postaje vidljiv
    openBoard(); // pokretanje f-je za postavljanje kartica


}

let firstWindow = document.getElementById('openWindow');
let start = document.getElementById('start');

// klikom na dugme start prikazuje se drugi prozor i poziva f-ja za pokretanje igrice
start.addEventListener('click', function () {
    firstWindow.style.display = 'none';
    document.getElementById('container').style.display = 'flex';
    startGame();

});