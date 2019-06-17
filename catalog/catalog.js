var elevi = [];
	var elevIdx = -1;
	class Elev {
		constructor(fullName) {
			this.nume = fullName;
			this.note = [];
		}
		get medie() {
			var sum = 0;
			for (var i = 0; i < this.note.length; i++) {
				sum += parseInt(this.note[i], 10);
			}
			var avg = sum / this.note.length;
			if (isNaN(avg)) {
				return "";
			}
			return avg.toFixed(1);
		}
	}
	function vizibil(id) {
		const e = elevi[id];
		elevIdx = id;
		document.getElementById("nume_elev").innerHTML = e.nume;
		document.querySelector("#note_elev_wrapper").classList.add("visible");
		document.querySelector(".input_form").classList.add("update");
		document.querySelector(".tabel_border").classList.add("update");
		document.querySelector(".adaugare").classList.remove("spatiere");
		document.querySelector(".adaugare").classList.add("centrare_elevi");
		document.getElementById("note_elev_wrapper").style.height = "730px";
		let str = "";
		let strHead = "";
		strHead = `<tr>
						<td>
							<strong>Nota</strong>
						</td>
					</tr>`
		for (let i = 0; i < e.note.length; i++) {
			str += `<tr>
						<td>${e.note[i]}<td>
					</tr>`
			if (e.note.length === 0) {
				document.querySelector(".catalog").classList.remove("visible");
			} else {
				document.querySelector(".catalog").classList.add("visible");
				document.querySelector(".catalog_gol").classList.add("invisible");
			}
		}
		document.querySelector(".catalog").innerHTML = strHead + str;

	};
	function invizibil() {
		document.querySelector("#note_elev_wrapper").classList.remove("visible");
		document.querySelector(".input_form").classList.remove("update");
		document.querySelector(".tabel_border").classList.remove("update");
		document.querySelector(".adaugare").classList.add("spatiere");
	}
	function deseneazaTabel() {
		let str = "";
		let strHead = "";
		strHead = `<tr>
						<td>
							<strong>Nume</strong>
						</td>
						<td>
						    <strong>Medie note</strong>
						</td>
						<td></td>
					</tr>`;
		for (var i = 0; i < elevi.length; i++) {
			str += `
					<tr>
						<td >${elevi[i].nume}</td>
						<td >${elevi[i].medie}</td>
						<td>
							<button onclick="vizibil(${i})">Vezi notele</button>
						</td>
					</tr>`
			if (elevi.length === 0) {
				document.querySelector(".tabel_elevi").classList.remove("visible");
			} else {
				document.querySelector(".tabel_elevi").classList.add("visible");
				document.querySelector(".tabel_gol").classList.add("invisible");
			}
		}
		document.querySelector(".tabel_elevi").innerHTML = strHead + str;

	}
	function adauga(m, event) {
		event.preventDefault();
		let elev = new Elev(m.querySelector("input[name]").value);

		elevi.push(elev);
		deseneazaTabel();
	}
	function adaugaNota(s, event) {
		event.preventDefault();

		let input = document.querySelector("#form_elev input[name]");
		const e = elevi[elevIdx];
		e.note.push(input.value)
		vizibil(elevIdx);
		deseneazaTabel()
	}
	function sortareAsc(coloana, event) {
		for (var i = 0; i < elevi.length; i++) {
			elevi.sort(function (a, b) {
				if (a[coloana] > b[coloana]) {
					return 1;
				}
				if (a[coloana] < b[coloana]) {
					return -1;
				}
				return 0;
			});
			console.log(elevi);
			deseneazaTabel();
		}
	}
	function sortareDesc(coloana, event) {
		for (var i = 0; i < elevi.length; i++) {
			elevi.sort(function (a, b) {
				if (a[coloana] > b[coloana]) {
					return -1;
				}
				if (a[coloana] < b[coloana]) {
					return 1;
				}
				return 0;
			});
			console.log(elevi);
			deseneazaTabel();
		}
	}
	function sortareAscNote(n, event) {
		const e = elevi[elevIdx];
		for (var i = 0; i < e.note.length; i++) {
			e.note.sort(function (a, b) {
				if (a > b) {
					return 1;
				}
				if (a < b) {
					return -1;
				}
				return 0;
			});
			console.log(e.note);
			vizibil(elevIdx);
		}
	}
	function sortareDescNote(n, event) {
		const e = elevi[elevIdx];
		for (var i = 0; i < e.note.length; i++) {
			e.note.sort(function (a, b) {
				if (a > b) {
					return -1;
				}
				if (a < b) {
					return 1;
				}
				return 0;
			});
			console.log(e.note);
			vizibil(elevIdx);
		}
	}