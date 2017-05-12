var cuv;
var ghicite = 0;
var hang = 0;
var scor = 0;
function dictionar() {

    document.getElementById("scor").innerHTML = "SCOR: " + scor;
    var dictionary = new Array("CAT", "DOG", "MONKEY", "DOLPHIN", "SNAKE", "COOL", "HOT", "COLD", "DAY", "NIGHT", "MATH", "ROCK", "HORSE", "KID", "HOUSE", "DOOR", "APPLE", "RED", "GREEN");
    var i = Math.floor(Math.random() * dictionary.length);
    cuv = dictionary[i];
    var but = document.getElementById("b");
    but.disabled = true;



    var i;
    var litera = document.createElement("h2");
    litera.id = "h0";
    var nod = document.createTextNode(cuv[0]);
    litera.appendChild(nod);
    var p = document.getElementById("p1");
    p1.appendChild(litera);

    for (i = 1; i < cuv.length; i++) {
        var litera = document.createElement("h2");
        litera.id = "h" + i;
        var nod = document.createTextNode("\u00A0\u00A0_");
        litera.appendChild(nod);
        var p = document.getElementById("p1");
        p1.appendChild(litera);
    }


}

function dictionar1() {
    document.getElementById("scor").innerHTML = "SCOR: " + scor;
    var dictionary = new Array("WINDOW", "BLANKET", "GLASSES", "SCRISSORS", "WOMAN", "KILOMETER", "COLLEGE", "UNIVERSITY", "CURTAINS", "REFRIGERATOR", "SOCKS", "SHIRT", "SKIRT");
    var i = Math.floor(Math.random() * dictionary.length);
    cuv = dictionary[i];

    var but1 = document.getElementById("b1");


    but1.disabled = true;
    var litera = document.createElement("h2");
    litera.id = "h0";
    var nod = document.createTextNode(cuv[0]);
    litera.appendChild(nod);
    var p = document.getElementById("p1");
    p1.appendChild(litera);


    var i;
    for (i = 1; i < cuv.length; i++) {
        var litera = document.createElement("h2");
        litera.id = "h" + i;
        var nod = document.createTextNode("\u00A0\u00A0_");
        litera.appendChild(nod);
        var p = document.getElementById("p1");
        p1.appendChild(litera);
    }


}

function dictionar2() {
    document.getElementById("scor").innerHTML = "SCOR: " + scor;
    var dictionary = new Array("MATHEMATICS", "INFORMATICS", "COMPUTER", "SUITCASE", "MYSTERIOUS", "RELATIONSHIP", "REMARKABLE", "SATELITES", "ARRANGEMENT", "CONSTANTLY");
    var i = Math.floor(Math.random() * dictionary.length);
    cuv = dictionary[i];

    var but2 = document.getElementById("b2");

    but2.disabled = true;
    var litera = document.createElement("h2");
    litera.id = "h0";
    var nod = document.createTextNode(cuv[0]);
    litera.appendChild(nod);
    var p = document.getElementById("p1");
    p1.appendChild(litera);

    var i;
    for (i = 1; i < cuv.length; i++) {
        var litera = document.createElement("h2");
        litera.id = "h" + i;
        var nod = document.createTextNode("\u00A0\u00A0_");
        litera.appendChild(nod);
        var p = document.getElementById("p1");
        p1.appendChild(litera);
    }


}



function check() {
    var i;
 
    document.getElementById("scor").innerHTML = "SCOR: " + scor ;
   
    for (i = 1; i < 27; i++) {
        var x = document.getElementById("a" + i);
        if (x.checked == true) i = 27;
    }
    var z = 0;
    for (i = 1; i < cuv.length; i++) {

        if (x.value == cuv[i]) {
            z = 1;
            ghicite++;
            scor++;
            scor++;
            document.getElementById("scor").innerHTML = "SCOR: " + scor ;
            y = document.getElementById("h" + i).innerHTML = "\u00A0\u00A0" + cuv[i];
            x.disabled = true;

        }

    }
    if (z == 0) {
        hang++;
        x.disabled = true;
        t = document.getElementById("poza");
        t.src = '/Content/Images/poza'+hang+'.jpg';
        t.style.visibility = "visible";
 
    }
    if (ghicite < cuv.length && hang == 5) {
        alert("u lost");
        scor = 0;
        document.getElementById("scor").innerHTML = "SCOR: " + scor;
        document.getElementById("buton").disabled = true;
        for (i = 0; i < cuv.length; i++) {
            document.getElementById("h" + i).innerHTML = "\u00A0\u00A0" + cuv[i];
        }
    }
    if (ghicite == cuv.length - 1 && hang < 5) {
        alert("u won");
        
        document.getElementById("scor").innerHTML = "SCOR: " + scor ;
        document.getElementById("buton").disabled = true;
    }
}


function reset() {
    location.reload();
}

function instr() {

    document.getElementById("s").innerHTML += "A word will be generate and you will have to guess it letter by letter.If the letter isn't in the word then a body part will be added to the gallows (head, body,arms etc.). You will continue guessing letters until you can either solve the word (or phrase) or all body parts are on the gallows. You win if you guess the word before the person is hung.Otherwise you lose";
    document.getElementById("instr").disabled = true;
}
/*function get_letter(){
	//get letter from options
	var letter;
	return letter;
	
}

function check(){
	
	 var litera= get_letter();
	 var cuvant;
	 if(cuvant.indexOf(litera)>=0) //afiseaza litera;
	 else //deseneaza capul
	//check if its in the word 
	//if its then delete it from the word
	//if its not hangman
	// cap-corp-mana-mana-picior-picior-depinde de dificultate	
}

*/