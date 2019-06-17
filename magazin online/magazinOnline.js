     var lista = [];
        function getLista() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    lista = JSON.parse(this.responseText);
                    deseneazaProduse();
                }
            };
            xhttp.open("GET", "https://proiect-final-scoala-it.firebaseio.com/.json", true);
            xhttp.send();
        }
        function deseneazaProduse() {
            var str = "";
            for (var i in lista.produse) {
                str += `
                    <div  class="item ">
                        <div class="spatiere">
                            <img width="250" class="imagine_produse col-sm-12 col-md-3 col-lg-6" src="${lista.produse[i].imagine}"/><br/>
                            <span>
                                ${lista.produse[i].nume}
                            </span>
                            <br/>
                            <span class="pret">
                                ${lista.produse[i].pret} lei
                            </span>
                            <button class="detalii">
                                <a href="magazinOnline detalii.html?id=${i}" class="detaliere">Detalii</a>
                            </button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    `
            }
            document.querySelector(".continut").innerHTML = str;
        }