function displayCountry(elem, event) {
    var eachCountry = document.querySelector(".countryColor.visible");
    if (eachCountry !== null) {
        eachCountry.classList.remove("visible");
    }
    var attr = elem.getAttribute("for-tab");
    document.querySelector(".countryColor[tab='" + attr + "']").classList.add("visible");

}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}