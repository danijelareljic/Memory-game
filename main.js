//PROMENLJIVE
//Prvi div
let firstWindow = document.getElementById("openWindow");
let start = document.getElementById("start");
let help = document.getElementById("help");
//Drugi div
let container = document.getElementById("container");
let board = document.getElementById("board");
let time = document.getElementById("timer");
let brPoteza = document.getElementById("brPoteza");
//Modalni prozori
let modal1 = document.getElementById("helpModal");
let modal2 = document.getElementById("finishModal");
let span = document.getElementsByClassName("close");
let poruka = document.getElementById("poruka");
//Ikonice
let reload = document.getElementById("reload");
let backArrow = document.getElementById("back");
let pause = document.getElementById("pause");
//Brojači
let count = 0, pom = 0, openCards = 0;//promenljive koje broje otvorene karte
let sec = 0, min = 0; //vreme
let moves = 0; //broj poteza
let click = 0; //klik na dugme pauza
//Elementi koji se kreiraju
let front = document.getElementsByClassName("front");
let back = document.getElementsByClassName("back");
//Pomoćne promenljive
let wait = false; //čekanje da se karte zatvore
let isPaused = false;
//Deklaracije
let firstCard, secondCard; //prva i druga karta
let niz;
let interval;
//kreiranje niza sličica
let slicice = [];
for (let i = 1; i <= 60; i++) {
    slicice.push(i + ".png");
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
    //veličine kartica
    addClass() {
        return document.getElementById("type").value;
    }
}
//FUNKCIJE
//postavljanje kartica
function openBoard() {
    let type = document.getElementById("type").value; //dohvatanje selektovane vrednosti
    let tezina; //deklaracija promenljive koja će postati element clase Mode sa parametrima koji zavise od selektovane vrednosti
    if (type == "easy") {
        tezina = new Mode(5);
    } else if (type == "medium") {
        tezina = new Mode(10);
    } else {
        tezina = new Mode(20);
    }
    niz = tezina.createArray(); //izbor sličica
    shuffle(niz); //mešanje sličica
    for (let i = 0; i < niz.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("data-ime", niz[i]);
        div.classList.add(tezina.addClass());
        let img = document.createElement("img");
        img.setAttribute("src", "static/smile/" + niz[i]);
        img.classList.add("front");
        let poz = document.createElement("img");
        poz.setAttribute("src", "static/pozadina.jpg");
        poz.classList.add("back");
        div.appendChild(img);
        div.appendChild(poz);
        board.appendChild(div);
    }
}
//moderna verzija Fisher-Yates algoritma
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // nasumičan indeks od 0 do i
        [array[i], array[j]] = [array[j], array[i]]; // zamena elemenata
    }
}
// otvaranje kartice
function openCard() {
    if (wait) {
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
    if (pom == 1) { // pokreće se tajmer na prvi klik
        vreme();
    }
}
// provera parova
function checkForMatch() {
    // brojanje poteza
    moveNumber();
    // ukoliko su sličice iste
    if (firstCard.parentElement.dataset.ime === secondCard.parentElement.dataset.ime) {
        openCards += 2; // povećava se za dva
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
            count = 0
        }, 1000); // Nakon 1 sekunde karte se zatvaraju, čekanje završava i prvi broj otvorenih karata se vraća na nulu

    }
}
// pokretanje igrice
function startGame() {
    about.style.display = "flex"; // div #about postaje vidljiv
    time.innerHTML = "0:00";
    brPoteza.innerHTML = 0;
    openBoard(); // pokretanje f-je za postavljanje kartica
    for (let i = 0; i < niz.length; i++) {
        back[i].addEventListener("click", openCard);
    } // omogućavanje otvaranja karata klikom

}
// logika za kraj igre
function finishGame() {
    modal2.style.display = "block"; // prikazivanje modalnog prozora
    clearInterval(interval); // zaustavljanje vremena
    poruka.innerHTML = `Čestitamo! Pronašli ste sve parove za ${min} min ${sec} sec. Trebalo vam je ${moves} poteza.`;
    pom = 0;
    moves = 0;
    openCards = 0; // resetovanje brojača
}
// ponašanje sekundi i minuta
function period() {
    if (!isPaused) {
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        time.innerHTML = `${min}:${sec}`;
    }
}
// tajmer
function vreme() {
    sec = 0;
    min = 0;
    interval = setInterval("period()", 1000);
}
// brojač poteza
function moveNumber() {
    moves++;
    brPoteza.innerHTML = moves;
}
// pomoćna f-ja za zaustavljanje tajmera i vraćanje svih brojača na nulu
function reset() {
    board.innerHTML = "";
    clearInterval(interval);
    sec = 0;
    min = 0;
    pom = 0;
    moves = 0;
    openCards = 0;
}
//EVENTI
//otvaranje modalnog prozora klikom na dugme pravila
help.onclick = function () {
    modal1.style.display = "block";
}
//zatvaranje otvorenog prozora
span[0].onclick = function () {
    modal1.style.display = "none";
}
// zatvaranje drugog modalnog prozora
span[1].onclick = function () {
    modal2.style.display = "none"; // zatvaranje prozora
    container.style.display = "none"; // zatvaranje prozora sa igricom 
    firstWindow.style.display = "flex"; // prikazivanje prvog prozora
    board.innerHTML = ""; // sklanjanje sličica i kartica
}
// klikom na dugme start prikazuje se drugi prozor i poziva f-ja za pokretanje igrice
start.addEventListener("click", function () {
    firstWindow.style.display = "none";
    container.style.display = "flex";
    startGame();

});
// pokretanje igre iz početka
reload.onclick = function () {
    reset();
    startGame();
}
// vraćanje na početni ekran
backArrow.onclick = function () {
    container.style.display = "none";
    firstWindow.style.display = "flex";
    reset();
}
// pauziranje igre
pause.onclick = function () {
    click++;
    if (click % 2 != 0) {
        board.style.display = "none";
        isPaused = true;
    } else {
        board.style.display = "flex";
        isPaused = false;
    }
}