var lista = [];
var cos = [];
var cosNou = [];
var indexEditare = -1;
var indexCos = -1;
var id = 0;
function getLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            lista = JSON.parse(this.responseText);
            deseneazaProduse();
        }
    };
    xhttp.open("GET", "https://proiect-final-scoala-it.firebaseio.com/produse.json", true);
    xhttp.send();
}
function getCos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cos = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "https://proiect-final-scoala-it.firebaseio.com/cos.json", true);
    xhttp.send();
}
function deseneazaProduse() {
    document.querySelector("#loading_image").classList.add("invisible");
    let str = "";
    for (var i in lista) {
        str += `
            <tr>
                <td><img width="70" clasa="imagine_mica" src="${lista[i].imagine}"/></td>
                <td onclick="modifica('${i}')">${lista[i].nume}</td>
                <td>${lista[i].pret}<span> lei</span></td>
                <td>${lista[i].stoc}</td>
                <td onclick="stergeProdus('${i}')">
                <button class="buton_continut">Remove</button>
                </td>
            </tr>`
    }
    document.querySelector("#continut_body").innerHTML = str;
}
function stergeProdus(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getLista();
        }
    };
    xhttp.open("DELETE", `https://proiect-final-scoala-it.firebaseio.com/produse/${id}.json`, true);
    xhttp.send();
}
function formAdaugare() {
    document.querySelector("#continut").classList.add("invisible");
    document.querySelector("#adaugare_produs").classList.add("visible");
    document.querySelector("#container2").classList.add("invisible");
    document.querySelector("#container_adaugare").classList.add("visible");
    document.querySelector("#buton_add").classList.add("visible");
}
function adaugare(s, event) {
    event.preventDefault();
    let produs = {};
    let inputs = s.querySelectorAll("input[name]");
    for (var i = 0; i < inputs.length; i++) {
        var b = inputs[i].getAttribute("name");
        var c = inputs[i].value;
        produs[b] = c;
        // produs.pret=parseInt(produs.pret);
        //produs.stoc=parseInt(produs.stoc);
    }
    /* produs.detalii = document.getElementById("detalii_adaugare").value;
    produs.imagine = document.getElementById("imagine_adaugare").url;
    produs.nume = document.getElementById("nume_adaugare").value;   
    produs.pret = parseInt(document.getElementById("pret_adaugare").value);
    produs.stoc = parseInt(document.getElementById("stoc_adaugare").value); */

    if (indexEditare === -1) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getLista();
            }
        };
        xhttp.open("POST", "https://proiect-final-scoala-it.firebaseio.com/produse.json", true);
        xhttp.send(JSON.stringify(produs));
    } else {
        cosNou = Object.values(cos);
        indexCos = cosNou.findIndex(function (m, indexCos) {
            return m.nume === lista[indexEditare].nume;
        })
        id = Object.keys(cos);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getLista();
            }
        };
        xhttp.open("PUT", `https://proiect-final-scoala-it.firebaseio.com/produse/${indexEditare}.json`, true);
        xhttp.send(JSON.stringify(produs));
        if (cos !== null) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    getLista();
                }
            };
            xhttp.open("PUT", `https://proiect-final-scoala-it.firebaseio.com/cos/${id[indexCos]}/pret.json`, true);
            xhttp.send(JSON.stringify(produs.pret));
            index = -1;
        }
    }
    document.querySelector("#continut").classList.remove("invisible");
    document.querySelector("#adaugare_produs").classList.remove("visible");
    document.querySelector("#container2").classList.remove("invisible");
    document.querySelector("#container_adaugare").classList.remove("visible");
    deseneazaProduse();
    s.reset();
}
function modifica(id) {
    document.querySelector("#nume_adaugare").value = lista[id].nume;
    document.querySelector("#nume_editare").innerHTML = lista[id].nume;
    document.querySelector("#imagine_adaugare").value = lista[id].imagine;
    document.querySelector("#pret_adaugare").value = lista[id].pret;
    document.querySelector("#stoc_adaugare").value = lista[id].stoc;
    document.querySelector("#detalii_adaugare").value = lista[id].detalii;
    document.querySelector("#continut").classList.add("invisible");
    document.querySelector("#adaugare_produs").classList.add("visible");
    document.querySelector("#container2").classList.add("invisible");
    document.querySelector("#container_editare").classList.add("visible");
    document.querySelector("#buton_editare").classList.add("visible");
    indexEditare = id;
}
function anulare() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location = "magazinOnline admin.html";
        }
    };
    xhttp.open("GET", `https://lista-alimente.firebaseio.com/.json`, true);
    xhttp.send();
}