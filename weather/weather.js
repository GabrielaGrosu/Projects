var informatii = [];
var date = [];
console.log(informatii);
console.log(date);
function afiseazaVremea() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            informatii = JSON.parse(this.responseText);
            console.log(informatii);
            deseneazaTabel();
        }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${document.getElementById("oras").value}`, true);
    xhttp.send();
}
function deseneazaTabel() {
    document.getElementById("icon").src = `http://openweathermap.org/img/w/${informatii.weather[0].icon}.png`;
    document.getElementById("descriere").innerHTML = informatii.weather[0].description;
    document.getElementById("presiune").innerHTML = informatii.main.pressure;
    document.getElementById("umiditate").innerHTML = informatii.main.humidity;
    document.getElementById("temp").innerHTML = informatii.main.temp;
    document.getElementById("min").innerHTML = informatii.main.temp_min;
    document.getElementById("max").innerHTML = informatii.main.temp_max;
    document.getElementById("coordonateHarta").src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDNCgmnHqiOuRvdBGN8NapDtH3wZb-Xikk
                        &q=${informatii.coord.lat},${informatii.coord.lon}&zoom=12`;
}
function afiseazaPrognoza() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            date = JSON.parse(this.responseText);
            console.log(date);
            deseneazaTabel2();
        }
    };

    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${document.getElementById("oras").value}`, true);
    xhttp.send();
}
function deseneazaTabel2() {

    var contor = 0;
    var ziuaAnterioara = null;
    var str2 = "";
    var str = "";

    for (var i = 0; i <= date.list.length; i++) {

        if (ziuaAnterioara !== date.list[i].dt_txt.substring(0, 10)) {
            if (contor !== 0) {

                str = `<h3>Ziua: ${date.list[i].dt_txt.substring(8, 10)-1}/${date.list[i].dt_txt.substring(5, 7)}/${date.list[i].dt_txt.substring(0, 4)}</h3>
                               `;

                document.getElementById("ziua" + contor).innerHTML = str + str2;
                str2 = "";
            }

            contor++;

            ziuaAnterioara = date.list[i].dt_txt.substring(0, 10);
        }
        str2 += `<img id="icon" src="http://openweathermap.org/img/w/${date.list[i].weather[0].icon}.png"><br />  
                            Ora:<span id="ora">${date.list[i].dt_txt.substring(11, 16)}</span><br />
                            Temperatura:<span id="tempPrognoza"></span>${date.list[i].main.temp}<br />
                            Descriere:<span id="descrierePrognoza">${date.list[i].weather[0].description}</span><br />`;

    }

    document.getElementById("ziua" + contor).innerHTML = str + str2;
}