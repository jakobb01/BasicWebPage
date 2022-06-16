let numPoints = 0;
let vrstice = 3;
let stolpci = 6;
let cas = 60;
let prejsna = undefined;
const listKartic = new Map();



function initTable(vrstice, stolpci) {
    let pri = 0;
    let zapis = undefined;
    document.getElementById("tabla").innerHTML = "";
    for (let j = 0; j < vrstice; j++) {
        document.getElementById("tabla").innerHTML += ("<br>");
        for (let i = 0; i < stolpci; i++) {
            pri += 1;
            zapis = karticaRnd();
            listKartic.set("primerjava" + pri, 0);
            document.getElementById("tabla").innerHTML += (`
                    <div id="karta">
                        <div class="container">
                            <img id="${"back" + pri}"src="slike/backcard.jpg" >
                            <div id="${"karta" + pri}" class="overlay">
                                <div class="container"><img id="${"primerjava" + pri}" onclick="pari(${pri})" src=${zapis}  ></div>
                            </div>
                        </div>
                    </div>`);
        };
    };
};
initTable(3, 6);



setInterval(function timer() {
    let timerOutput = document.getElementById("count");
    cas -= 1;
    if (cas === -1) {
        location.reload();
        alert("Čas potekel, zbrali ste " + numPoints + " točk; igra resetirana!");
    }
    timerOutput.innerHTML = cas;
}, 1000);

function setPoints(bol) {
    if (bol) {
        numPoints += 20;
    } else {
        numPoints -= 10;
    }
    zapisTock();
};

function zapisTock() {
    document.getElementById("point").innerHTML = numPoints;
}

function karticaRnd() {
    let kartica = "slike/fish.jpg";
    let ida = Math.floor(Math.random() * 8) + 1;
    switch (true) {
        case ida === 1:
            kartica = "slike/ant.jpg";
            break;
        case ida === 2:
            kartica = "slike/birds.jpg";
            break;
        case ida === 3:
            kartica = "slike/fish.jpg";
            break;
        case ida === 4:
            kartica = "slike/mammals.jpg";
            break;
        case ida === 5:
            kartica = "slike/plants.jpg";
            break;
        case ida === 6:
            kartica = "slike/weather.jpg";
            break;
        case ida === 7:
            kartica = "slike/reptiles.jpg";
            break;
        case ida === 8:
            kartica = "slike/machines.jpg";
            break;
        default:
            kartica;
    };
    return kartica;
};

function pari(st) {
    if (listKartic.get("primerjava" + st) === 0 && values1(listKartic) < 2) {
        listKartic.set("primerjava" + st, 1);
        odprtaKarta("karta" + st);
        if (values1(listKartic) === 1) {
            prejsna = st
        };
        if (values1(listKartic) === 2) {
            enaki(prejsna, st);
            listKartic.set("primerjava" + prejsna, 0);
            zaprtaKarta("karta" + prejsna);
            listKartic.set("primerjava" + st, 0);
            zaprtaKarta("karta" + st);
        };
    };
    console.log(listKartic);
};

function odprtaKarta(id) {
    document.getElementById(id).style.opacity = "1";
};

function zaprtaKarta(id) {
    document.getElementById(id).style.opacity = "";
};

function konecKarta(id) {
    document.getElementById(id).style.opacity = "0";
};



function values1(list) {
    let total = 0;
    for (const x of list.values()) {
        total += x;
    };
    return total;
};

function enaki(prejsna, trenutna) {
    let x = document.getElementById("primerjava" + prejsna);
    let y = document.getElementById("primerjava" + trenutna);
    if (x.src === y.src) {
        setPoints(true);
        konecKarta("back" + prejsna);
        konecKarta("back" + trenutna);
        konecKarta("primerjava" + prejsna);
        konecKarta("primerjava" + trenutna);
        x.onclick = null;
        y.onclick = null;

    } else {
        setPoints(false);
    };
};

function zacniZnova() {
    //Igralec začne znova, z drugacno postavitvijo, a premešanimi kartami.
    reset1();
    initTable(vrstice, stolpci);
    alert(`Igra resetirana!`);
}

function setupPolja() {
    vrstice = prompt("Stevilo vrstic (max 3):", "3");
    stolpci = prompt("Stevilo stolpcev (max 11):", "6");
    // Preveri ali smo slucajno podali stevilko vecjo od max in jih "popravi"
    if (vrstice > 3) {
        vrstice=3;
    }
    if (stolpci > 11) {
        stolpci=11;
    }

    //Ustvari novo polje kart
    reset1();
    initTable(vrstice, stolpci);
    
};

function reset1() {
    // Resetira stevilo tock, čas in list(map) 
    numPoints = 0;
    zapisTock();
    cas = 61;
    listKartic.clear();
}

function zakljucek() {
    //zakljuci trenutno igro in igralca popelje v naslednjo igro.
    alert("Igra zaključena, dosegli ste " + numPoints + " točk, preostalo pa vam je " + cas + " sekund!");
    setupPolja();
}