var cos = [];
var lista = [];
var cosNou=[];
console.log(lista);

function getCos() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			cos = JSON.parse(this.responseText);
			document.querySelector("#loading").classList.add("invisible");
			document.querySelector(".continut").classList.add("visible");
			deseneazaCos();
		}
	};
	xhttp.open("GET", "https://proiect-final-scoala-it.firebaseio.com/cos/.json", true);
	xhttp.send();
}
function getLista() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			lista = JSON.parse(this.responseText);
			deseneazaCos();
		}
	};
	xhttp.open("GET", "https://proiect-final-scoala-it.firebaseio.com/produse/.json", true);
	xhttp.send();
}
function deseneazaCos() {
	let str1 = "";
	let str2 = "";
	let s = 0;
	var index = -1;	
	for (var i in cos) {
		/*if (cos[i] = null) {
			continue;
		}*/

		if (cos.hasOwnProperty()) {
			continue;
		}
		listaNoua = Object.values(lista);
		index = listaNoua.findIndex(function (m, index) {
			return m.nume === cos[i].nume;
		})
		str1 += `<tr>
								<td class="nume_rand"><a href="magazinOnline detalii.html?id=${index}" class="detaliere">${cos[i].nume}</a></td>
								<td>${cos[i].pret}</td>
								<td class="coloana_cantitate">
									<button class="add_cantitate buton_continut" onclick="add('${i}',-1)">-</button>
									<span class="cantitate" > ${cos[i].cantitate} </span>
									<button class="substract_cantitate buton_continut_add" onclick="add('${i}',1)">+</button>
								</td>
								<td>${cos[i].pret * cos[i].cantitate}</td>
								<td onclick="stergeProdus('${i}')">
								<button class="buton_continut ">Remove</button>
								</td>
							</tr>`
		index = -1;
		s += cos[i].pret * cos[i].cantitate;	
	}
	if(cos!==null){
		cosNou = Object.values(cos);
		str2 = cosNou.length;
	}
	else{
		str2="";
	}
	
	if (str2 === "") {
		document.querySelector(".continut").classList.remove("visible");
		document.querySelector(".coloana_total").classList.add("invisible");
	}
	else {
		document.querySelector(".continut").classList.add("visible");
		document.querySelector(".coloana_total").classList.remove("invisible");
		document.querySelector(".tbody_tabel").innerHTML = str1;
		document.querySelector(".suma").innerHTML = s;
		document.querySelector("#cosNou_length").innerHTML = str2;
	}
}
function stergeProdus(id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			getCos();
		}
	};
	xhttp.open("DELETE", `https://proiect-final-scoala-it.firebaseio.com/cos/${id}.json`, true);
	xhttp.send();
}

function add(id, nr) {
	let str = 0;
	cos[id].cantitate += nr;
	if (cos[id].cantitate < 0) {
		cos[id].cantitate = 0;
	}
	if (cos[id].cantitate > cos[id].stoc) {
		cos[id].cantitate = cos[id].stoc;
	} else {
		modifica(id);
	}

}
/* function substract(id){
let str = 0;
if (cos[id].cantitate>0){
cos[id].cantitate--;
modifica(id);
}
}*/
function modifica(id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			deseneazaCos();
		}
	};
	xhttp.open("PUT", `https://proiect-final-scoala-it.firebaseio.com/cos/${id}/cantitate.json`, true);
	xhttp.send(cos[id].cantitate);
}