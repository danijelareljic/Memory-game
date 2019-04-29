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
let slicice = [];
for (let i = 1; i <= 60; i++) {
    slicice.push(i + '.png');
}
console.log(slicice);
//Određivanje težine
class Mode {
    constructor(cards) {
        this.cards = cards; //broj parova
    }
    //izbor neophodnih sličica
    createArray() {
        let array = [];
        while (array.length < this.cards) {
            let k = Math.floor(Math.random() * slicice.length);//nasumičan indeks
            if (!(array.includes(slicice[k]))) {
                array.push(slicice[k]); //ubacuje sličicu sa indeksom k u novi niz ukoliko se već ne nalazi u nizu
            }
        }
        array = array.concat(array); //dupliranje sličica
        return array;
    }
    addClass() {
        return document.getElementById('type').value;
    }
}
let board = document.getElementById('board');
let niz;
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
        img.classList.add('front');
        let poz = document.createElement('img');
        poz.setAttribute('src', 'static/pozadina.jpg');
        poz.classList.add('back');
        div.appendChild(img);
        div.appendChild(poz);
        board.appendChild(div);
    }
}
let front = document.getElementsByClassName('front');
let back = document.getElementsByClassName('back');
//moderna verzija Fisher-Yates algoritma
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // nasumičan indeks od 0 do i
        [array[i], array[j]] = [array[j], array[i]]; // zamena elemenata
    }
}
let count = 0, pom = 0, openCards=0;//promenljive koje broje otvorene karte
let wait = false; //čekanje da se karte zatvore
let firstCard, secondCard; //prva i druga karta

// otvaranje kartice
function openCard() {
    if(wait) {
        return; // karte nisu zatvorene 
    }
    count++; // povećava se broj otvorenih karti
    pom++;
    $(this).slideUp(); // podiže se karta
    $(this).prev().show(); // prikazuje sličicu
    if (count == 1) {
        firstCard = this; // postavlja se prva karta na prvi klik
    } else {
        secondCard = this; // postavlja se druga karta
        checkForMatch(); // provera parova
    }
    if(pom == 1) { // pokreće se tajmer na prvi klik
        vreme();
    }
}
// provera parova
function checkForMatch() {
    // brojanje poteza
    moveNumber();
    // ukoliko su sličice iste
    if (firstCard.parentElement.dataset.ime === secondCard.parentElement.dataset.ime) {
        openCards +=2; // povećava se za dva
        
        count = 0; // kada dođe do 2 vraća se na nulu
        if (openCards === niz.length) { // ukoliko su sve karte otvorene
            finishGame(); // kraj


        }
    } else { // ukoliko sličice nisu iste
        wait = true; // čeka se da se karte zatvore
        setTimeout(function () {
            $(firstCard).slideDown();
            $(secondCard).slideDown();
            wait = false;
            count = 0 }, 1000); // Nakon 1 sekunde karte se zatvaraju, čekanje završava i prvi broj otvorenih karata se vraća na nulu

    }
}
// pokretanje igrice
function startGame() {
    about.style.display = 'flex'; // div #about postaje vidljiv
    time.innerHTML = '0 min 0 sec';
    brPoteza.innerHTML = 0;
    openBoard(); // pokretanje f-je za postavljanje kartica
    for (let i = 0; i < niz.length; i++) {
        back[i].addEventListener('click', openCard);
    } // omogućavanje otvaranja karata klikom

}
let modal2 = document.getElementById('finishModal');
let poruka = document.getElementById('poruka');
// logika za kraj igre
function finishGame() {
    modal2.style.display = 'block'; // prikazivanje modalnog prozora
    clearInterval(interval); // zaustavljanje vremena
    poruka.innerHTML = `Pronašli ste sve parove za ${min} min ${sec} sec u ${moves} poteza`;
    pom = 0; 
    moves =  0; 
    openCards = 0; // resetovanje brojača
}
// zatvaranje drugog modalnog prozora
span[1].onclick = function () {
    modal2.style.display = "none"; // zatvaranje prozora
    document.getElementById('container').style.display = 'none'; // zatvaranje prozora sa igricom 
    firstWindow.style.display = 'flex'; // prikazivanje prvog prozora
    board.innerHTML = ''; // sklanjanje sličica i kartica
}
let sec = 0, min = 0;
let time = document.getElementById('timer');
function period() {
    sec++;
    if (sec == 60) {
        min++;
        sec = 0;
    }
    if(sec<10) {
        sec = '0'+sec;
    }
    time.innerHTML = min + ' min ' + sec + ' sec';
}
    let interval;
    function vreme() {
        sec = 0;
        min = 0;
        interval = setInterval("period()", 1000);
       
    }
    let moves = 0;
    let brPoteza = document.getElementById('brPoteza');
    function moveNumber() {
        moves++;
        brPoteza.innerHTML = moves;
    
    }
let firstWindow = document.getElementById('openWindow');
let start = document.getElementById('start');

// klikom na dugme start prikazuje se drugi prozor i poziva f-ja za pokretanje igrice
start.addEventListener('click', function () {
    firstWindow.style.display = 'none';
    document.getElementById('container').style.display = 'flex';
    startGame();

});