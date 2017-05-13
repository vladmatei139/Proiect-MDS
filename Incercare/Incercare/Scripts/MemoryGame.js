window.onload = function () {
    var buton1 = document.getElementById("div1");
    buton1.addEventListener("click", function () { dif = 6; createGame(4); });
    var buton2 = document.getElementById("div2");
    buton2.addEventListener("click", function () { dif = 9; createGame(6); });
    var buton3 = document.getElementById("div3");
    buton3.addEventListener("click", function () { dif = 12; createGame(6); });
    var inst = document.getElementById("inst");
    inst.addEventListener("click", instr);
    var menu = document.getElementById("menu");
    menu.addEventListener("click", meniu);
    var restart = document.getElementById("restart");
    restart.addEventListener("click", rest);
}

function meniu() {
    window.location.reload();
}

function rest() {
    r = 1;
    var table = document.getElementById("t");
    table.parentNode.removeChild(table);
    var newt = document.createElement("table");
    newt.id = "t";
    document.getElementById("restart").parentNode.insertBefore(newt, document.getElementById("restart").nextSibling);
    for (var i = 0; i < 12; i++)
        allphoto[i] = 0;
    for (var i = 0; i < 24; i++)
        idphoto[i] = 0;
    count = 0;
    photo[0] = 0;
    photo[1] = 0;
    if (dif == 6)
        createGame(4);
    if (dif == 9)
        createGame(6);
    if (dif == 12)
        createGame(6);
}

function instr() {
    document.getElementById("p").innerHTML = "In this game you need to match pairs of tiles. Playing is very simple - you turn over one tile and then try to find a matching tile.";
}

var count = 0, r = 0;
var allphoto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var idphoto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var photo = [0, 0];
var dif;
var timeS, timeN;
var Scor = 0;

function createGame(c) {
    document.getElementById("scor").innerHTML = " SCORE: 0 ";
    document.getElementById("menu").innerHTML = "MENU";
    document.getElementById("restart").innerHTML = "RESTART";
    timeS = new Date();
    if (r == 0) {
        var buton1 = document.getElementById("div1");
        buton1.parentNode.removeChild(buton1);
        var buton2 = document.getElementById("div2");
        buton2.parentNode.removeChild(buton2);
        var buton3 = document.getElementById("div3");
        buton3.parentNode.removeChild(buton3);
        var inst = document.getElementById("inst");
        inst.parentNode.removeChild(inst);
        var p = document.getElementById("p");
        p.parentNode.removeChild(p);
    }
    var i;
    var col = 0;
    var table = document.getElementById("t");
    //var table = document.createElement("table");
    //buton1.parentNode.appendChild(table);
    row = document.createElement("tr");
    table.appendChild(row);
    for (i = 0; i < dif * 2; i++) {
        var x = Math.floor(Math.random() * dif);
        if (allphoto[x] < 2) {
            var row;
            if (col % c == 0) {
                row = document.createElement("tr");
                table.appendChild(row);
            }
            var data = document.createElement("td");
            var img = document.createElement("img");
            img.src = '/Content/Images/img' + (x + 1) + '.jpg';
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.visibility = "hidden";
            data.appendChild(img);
            row.appendChild(data);
            let iid = col;
            img.id = iid;
            let cls = x;
            img.class = cls;
            data.addEventListener("click", function fname() { f(iid); });
            col++;
            allphoto[x]++;
        }
        else
            if (i > 10)
                i--;
    }
    for (i = 0; i < dif; i++) {
        while (allphoto[i] < 2) {

            var row;
            if (col % c == 0) {
                row = document.createElement("tr");
                table.appendChild(row);
            }
            var data = document.createElement("td");
            var img = document.createElement("img");
            img.src = '/Content/Images/img' + (i + 1) + '.jpg';
            img.style.height = "100px";
            img.style.width = "100px";
            img.style.visibility = "hidden";
            data.appendChild(img);
            row.appendChild(data);
            let iid = col;
            img.id = iid;
            let cls = i;
            img.class = cls;
            data.addEventListener("click", function fname() { f(iid); });
            col++;
            allphoto[i]++;
        }
    }
}

function f(id) {

    if (idphoto[id] > -1) {
        if (count == 2)
            verifMatch();
        var elem = document.getElementById(id);
        elem.style.visibility = "visible";
        photo[count] = elem;
        count++;
    }
}

function verifMatch() {
    if (photo[0].class == photo[1].class) {
        idphoto[photo[0].id] = -1;
        idphoto[photo[1].id] = -1;
        var scor = document.getElementById("scor");
        timeN = new Date();
        Scor = Scor + 100 - ((timeN - timeS) % 100);
        scor.innerHTML = "Scor: " + Scor;
        timeS = timeN;
    }
    else {
        photo[0].style.visibility = "hidden";
        photo[1].style.visibility = "hidden";
    }
    count = 0;
}