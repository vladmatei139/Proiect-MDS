window.onload = function()
{
	var buton1 = document.getElementById("div1");
	buton1.addEventListener("click", function() {dif=6; createGame(4);});
	var buton2 = document.getElementById("div2");
	buton2.addEventListener("click", function() {dif=9; createGame(6);});
	var buton3 = document.getElementById("div3");
	buton3.addEventListener("click", function(){dif=12; createGame(6);});
	
}

var count = 0;
var allphoto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var idphoto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var photo = [0,0];
var dif;
var timeS, timeN;
var Scor = 0;

function createGame(c)
{
	document.getElementById("scor").innerHTML = " Scor: 0 ";
	timeS = new Date();
	var buton1 = document.getElementById("div1");
	buton1.parentNode.removeChild(buton1);
	var buton2 = document.getElementById("div2");
	buton2.parentNode.removeChild(buton2);
	var buton3 = document.getElementById("div3");
	buton3.parentNode.removeChild(buton3);
	var i;
	var col = 0;
	var table = document.getElementById("t");
				row  = document.createElement("tr");
				table.appendChild(row);
	for( i=0; i<dif*2; i++)
	{
		var x = Math.floor(Math.random() * dif);
		if( allphoto[x] < 2 )
		{	
			var row;
			if(col % c == 0)
			{
				row  = document.createElement("tr");
				table.appendChild(row);
			}
			var data = document.createElement("td");
			var img = document.createElement("img");
			img.src = "img" + (x+1) + ".jpg";
			img.style.width = "100px";
			img.style.height = "100px";
			img.style.visibility = "hidden";
			data.appendChild(img);
			row.appendChild(data);
			let iid = col;
			img.id = iid;
			let cls = x;
			img.class = cls;
			data.addEventListener("click",function fname() {f(iid);	});
			col++;
			allphoto[x]++;
		}
		else
			if(i>10)
				i--;
	}
	for( i=0; i<dif; i++)
	{
		while( allphoto[i] < 2 )
		{	
			
			var row;
			if(col % c == 0)
			{
				row  = document.createElement("tr");
				table.appendChild(row);
			}
			var data = document.createElement("td");
			var img = document.createElement("img");
			img.src = "img" + (i+1) + ".jpg";
			img.style.height = "100px";
			img.style.width = "100px"
			img.style.visibility = "hidden";
			data.appendChild(img);
			row.appendChild(data);
			let iid = col;
			img.id = iid;
			let cls = i;
			img.class = cls;
			data.addEventListener("click",function fname() { f(iid);});
			col++;
			allphoto[i]++;
		}
	}
}

function f(id)
{
	
	if(idphoto[id] > -1)
	{
		if(count == 2)
			verifMatch();
		var elem = document.getElementById(id);
		elem.style.visibility = "visible";
		photo[count] = elem;
		count++;
	}
}

function verifMatch()
{
	if(photo[0].class == photo[1].class)
	{
		idphoto[photo[0].id] = -1;
		idphoto[photo[1].id] = -1;
		var scor = document.getElementById("scor");
		timeN = new Date();
		Scor = Scor + 100 - ((timeN - timeS) % 100);
		scor.innerHTML = "Scor: " + Scor;
		timeS = timeN;
	}
	else
	{
		photo[0].style.visibility = "hidden";
		photo[1].style.visibility = "hidden";
	}
	count = 0;
}