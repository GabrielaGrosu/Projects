var indexEditare = -1;
var contacte = [];
function getContacte() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            contacte = JSON.parse(this.responseText);

            deseneazaFormular();
        }
    };
    xhttp.open("GET", "https://ajax-agenda.firebaseio.com/.json", true);
    xhttp.send();
}

function deseneazaFormular() {
    var str1 = "";
    var str2 = "";
    for (var i in contacte) {
        if (contacte[i] === null) {
            continue;
        }
        str1 = `<tr>
                    <td><strong>Nume</strong></td>
                    <td><strong>Telefon</strong></td>
                  </tr>`;
        str2 += `<tr id="container2">                        	 
                      <td>${contacte[i].nume}</td>
                      <td>${contacte[i].telefon}</td>
                      <td onclick="modifica('${i}')"><a>Modifica</a></td>
                      <td onclick="sterge('${i}')"><a>Sterge</a></td>
                  </tr>` ;
        if (contacte.length === 0) {
            document.querySelector(".container2").classList.remove("visible");
        } else {
            document.querySelector(".container2").classList.add("visible");
        }
    }
    console.log(str1, str2);
    document.querySelector("table").innerHTML = str1 + str2;

}
function adaugare(s, event) {
    event.preventDefault();
    var date = document.querySelector("#telefon").value;
    var contact = {};
    var inputs = s.querySelectorAll("input[name]");
    if (date.length < 10||date.length>10) {
        document.querySelector("#telefon").classList.add("invalid");
    } else {
        document.querySelector("#telefon").classList.remove("invalid");
        for (var i = 0; i < inputs.length; i++) {
            var b = inputs[i].getAttribute("name");
            var c = inputs[i].value;
            contact[b] = c;
        }
        if (indexEditare === -1) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    getContacte();
                }
            };
            xhttp.open("POST", "https://ajax-agenda.firebaseio.com/.json", true);
            xhttp.send(JSON.stringify(contact));
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    getContacte();
                }
            };
            xhttp.open("PUT", `https://ajax-agenda.firebaseio.com/${indexEditare}.json`, true);
            xhttp.send(JSON.stringify(contact));
            indexEditare = -1;
        }
        deseneazaFormular();
        s.reset();
    }
}
function sterge(id) {
    if (confirm("Do you want to delete?")) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getContacte();
            }
        };
        xhttp.open("DELETE", `https://ajax-agenda.firebaseio.com/${id}.json`, true);
        xhttp.send();
        contacte = Object.values(contacte);
        if (contacte.length === 1) {
            document.querySelector(".container2").classList.remove("visible");
        } else {
            deseneazaFormular();
        }
    }
}

function modifica(id) {
    var persoana = contacte[id];
    var inputs = document.querySelectorAll("#formAdaugare input[name]");
    for (var i = 0; i < inputs.length; i++) {
        var a = inputs[i].getAttribute("name");
        inputs[i].value = persoana[a];
    }
    console.log(id, persoana);
    indexEditare = id;
}
