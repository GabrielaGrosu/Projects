
        var cos = [];
        var cosNou = [];
        var lista = {};
        var detalii = location.search.substring(4);
        var index = -1;
        var id = 0;
        console.log(lista);
        function getLista() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    lista = JSON.parse(this.responseText);
                    document.querySelector("#loading").classList.add("invisible");
                    document.querySelector(".spatiere").classList.add("visible");
                    deseneazaTabel();
                }
            };
            xhttp.open("GET", `https://proiect-final-scoala-it.firebaseio.com/produse/${detalii}.json`, true);
            xhttp.send();
        }
        function deseneazaTabel() {
            document.getElementById("poza").src = lista.imagine;
            document.getElementById("nume").innerHTML = lista.nume;
            document.getElementById("detalii").innerHTML = lista.detalii;
            document.getElementById("pret").innerHTML = lista.pret;
            document.getElementById("stoc").innerHTML = lista.stoc;

        }
        function deseneazaSnackbar() {
            document.getElementById("numeSnackbar").innerHTML = lista.nume;
            document.getElementById("snackbar").classList.add("visible");
            setTimeout(function () { document.getElementById("snackbar").classList.remove("visible");; }, 2400);
        }
        function getCos() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    cos = JSON.parse(this.responseText);
                }
            };
            xhttp.open("GET", "https://proiect-final-scoala-it.firebaseio.com/cos/.json", true);
            xhttp.send();
        }
        function adaugareCos(s, event) {
            event.preventDefault();
            var produsCos = {};


            /*for(var i in cos){
                    if(cos.length!==null){
                m +=cos[i].nume;
            }
        }*/
            /*let cosNou=[];
                cosNou=Object.values(cos);
                for(var i=0; i<cosNou.length; i++){
                    m= m+cosNou[i].nume;
                    }*/

            //if(lista.nume=produsCos.nume){}else{
            produsCos.cantitate = parseInt(document.getElementById("cantitate").value);
            produsCos.imagine = document.getElementById("poza").src;
            produsCos.nume = document.getElementById("nume").innerHTML;
            produsCos.detalii = document.getElementById("detalii").innerHTML;
            produsCos.pret = parseInt(document.getElementById("pret").innerHTML);
            produsCos.stoc = parseInt(document.getElementById("stoc").innerHTML);
            //}

            if (cos === null) {
                cosNou = cos;
            } else {
                cosNou = Object.values(cos);
                index = cosNou.findIndex(function (m, index) {
                    return m.nume === lista.nume;
                })
                id = Object.keys(cos);
            }
            if (index !== -1) {
                produsCos.cantitate = produsCos.cantitate + cosNou[index].cantitate;
            }

            if (produsCos.cantitate <= produsCos.stoc) {
                document.getElementById("stocInsuficient").classList.add("invisible");
                if (index === -1) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            deseneazaSnackbar();
                        }
                    };
                    xhttp.open("POST", "https://proiect-final-scoala-it.firebaseio.com/cos/.json", true);
                    xhttp.send(JSON.stringify(produsCos));

                } else {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            deseneazaSnackbar();
                        }
                    };
                    xhttp.open("PUT", `https://proiect-final-scoala-it.firebaseio.com/cos/${id[index]}/cantitate.json`, true);
                    xhttp.send(JSON.stringify(produsCos.cantitate));
                    index = -1;
                }
            }

            else {
                document.getElementById("stocInsuficient").innerHTML = "Stoc insuficent, va rugam introduceti o cantitate mai mica";
            }
        }
 