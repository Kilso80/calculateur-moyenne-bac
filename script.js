
/* SI VOUS TENEZ À VOTRE SANTE MENTALE, NE LISEZ PAS CE CODE, IL EST AFFREUX
 *	TRIGGERS : franglais, horreurs algorithmiques, code non propre
 */

function create_bloc (i) {
	let name = matieres[i].name;
	let year = matieres[i].year;
	let box = document.querySelector("#" + year);
	let id = year[0] + name;
	id = (id.split(" ")).join("_");
	var new_bloc = '<div class="note"><input required autocomplete="off" onchange="getMark(\'' + id + '\')" incremental id="' + id + '"><span>' + name + '</span> </div>';
	box.innerHTML += new_bloc;

	let values = [matieres[i].name, matieres[i].coef, matieres[i].year, "_", "_"];
	let htmlToAdd = '<tr class="table-row">';
	for (let j = 0; j < values.length; j++) {
		htmlToAdd += '<td id="table_' + i.toString() + "_" + j.toString() + '"> <p>' + values[j] + "</p></td>";
	}
	document.querySelector("table").innerHTML += htmlToAdd + "</tr>";
}


function create_bloc_option (i) {
	let name = options[i].name;
	let year = options[i].year;
	let box = document.querySelector("#" + year);
	let id = year[0] + name;
	id = (id.split(" ")).join("_");
	var new_bloc = '<div class="note hidden ' + (name.split(" ")).join("_") + '"><input required autocomplete="off" onchange="getMark(\'' + id + '\')" incremental id="' + id + '"><span>' + name + '</span> </div>';
	box.innerHTML += new_bloc;

	let values = [options[i].name, options[i].coef, options[i].year, "_", "_"];
	let htmlToAdd = '<tr class="table-row hidden ' + (name.split(" ")).join("_") + '">';
	for (let j = 0; j < values.length; j++) {
		htmlToAdd += '<td id="tableOption_' + i.toString() + "_" + j.toString() + '"> <p>' + values[j] + "</p></td>";
	}
	document.querySelector("table").innerHTML += htmlToAdd + "</tr>";
}


// function BlocRattrapage (hideOrShow) {	/* true: show, false: hide */
// //	document.querySelector("#blocRattrapage").classList = hideOrShow? "": "hidden"
// }


function enable(option) {
	let inputs = document.querySelectorAll(".note." + option);
	inputs.forEach(input => {
		input.classList = "note " + option + (document.querySelector("#" + option).checked? " ": " hidden");
	});
	inputs = document.querySelectorAll("tr." + option);
	inputs.forEach(input => {
		input.classList = "table-row " + option + (document.querySelector("#" + option).checked? " ": " hidden");
	});
	updateMoyenne("__NONE__", 0)
	
}


function updateMoyenne(id, value) { 	/* Ce niveau d'anglais incroyable... */
	id = (id.split("_")).join(" ");
	let isPossible = true;
	let isValueSaved = false;
	let sumOfTheMarks = 0;  			/* Ces noms de variables à raccourcir ... */
	let sumOfTheCoefs = 0; 		 		/* Toujours ce franglais ... ET LA PROPRETE DU CODE ! PAS DE COMMENTAIRES À L'INTERIEUR DES FONCTIONS ! */
	for (let i = 0; ((i < matieres.length) && (isPossible || !isValueSaved)); i++) {
		if (matieres[i].year[0] == id[0] && matieres[i].name == id.substring(1)) {
			matieres[i].mark = parseInt(value);
			document.querySelector("#table_" + i.toString() + "_3 p").innerText = isNaN(value)? "_": value.toString();
			document.querySelector("#table_" + i.toString() + "_4 p").innerText = isNaN(value)? "_": (value * matieres[i].coef).toString();
		}
		if (isNaN(matieres[i].mark)) {
			isPossible = false;
		} else {
			sumOfTheMarks += matieres[i].mark * matieres[i].coef;
			sumOfTheCoefs += matieres[i].coef;
		}
	}

	for (let i = 0; ((i < options.length) && (isPossible || !isValueSaved)); i++) {
		if (document.querySelector("#" + options[i].name.split(" ").join("_")).checked) {
			if (options[i].year[0] == id[0] && options[i].name == id.substring(1)) {
				options[i].mark = parseInt(value);
				document.querySelector("#tableOption_" + i.toString() + "_3 p").innerText = isNaN(value)? "_": value.toString();
				document.querySelector("#tableOption_" + i.toString() + "_4 p").innerText = isNaN(value)? "_": (value * options[i].coef).toString();
			}
			if (isNaN(options[i].mark)) {
				isPossible = false;
			} else {
				sumOfTheMarks += options[i].mark * options[i].coef;
				sumOfTheCoefs += options[i].coef;
			}
		}
	}
	let resultBox = document.querySelector("#resultBox");
	let moyenne = 0;
	let msgResult = "";
	let color = "";
	if (isPossible) {
		moyenne = Math.ceil((sumOfTheMarks / sumOfTheCoefs) * 100) / 100;
		msgResult = " Votre moyenne au bac est de " + moyenne.toString() + ". <br>";
		color = "#86C232";
		document.querySelector("#resultPoints").innerText = sumOfTheMarks.toString() + " points";
		document.querySelector("#resultMoy").innerText = "Soit une moyenne de " + moyenne.toString();
		if (moyenne >= 18) {
//			BlocRattrapage(false);
			msgResult += "Vous obtenez la mention très bien avec félicitaions du jury, bravo !";
		} else if (moyenne >= 16) {
//			BlocRattrapage(false);
			msgResult += " Vous obtenez la mention très bien, bravo !";
		} else if (moyenne >= 14) {
//			BlocRattrapage(false);
			msgResult += " Vous obtenez la mention bien, bravo !";
		} else if (moyenne >= 12) {
//			BlocRattrapage(false);
			msgResult += " Vous obtenez la mention assez bien, bravo !";
		} else if (moyenne >= 10) {
//			BlocRattrapage(false);
			msgResult += " Vous avez le bac, bravo !";
		} else if (moyenne >= 8) {
			color = "#61892F";
			msgResult += "Vous devez aller au rattrapage, pour essayer de rattraper " + (1000 - sumOfTheMarks).toString() + " points. Bonne chance !" ;
//			BlocRattrapage(true);
		} else {
			msgResult += "Vous avez raté votre bac, dommage...";
			color = "#474B4F";
//			BlocRattrapage(false);
		}
	} else {
		color = "hsl(85, 0%, 50%)";
		msgResult = "Veuillez entrer toutes vos moyennes et notes";
		document.querySelector("#resultPoints").innerText = "_";
		document.querySelector("#resultMoy").innerText = "_";
	}
	resultBox.innerHTML = "<h2>" + msgResult + "</h2>";
	resultBox.style.backgroundColor = color;

// Normalement, les fonctions ne doivent pas dépasser une quinzaine de lignes, mais bon ... *hum* 80 *hum* ...
}


function isAValidMark(value) {
	let isValid = true;
	let count = 0;
	for (let i = 0; i < value.length && isValid; i++) {
		isValid = isValid && ((!(isNaN(value[i]))) || value[i] == "." || value[i] == ",");
		if (value[i] == "." || value[i] == ",") {
			count ++;
		}
	}
	isValid = isValid && (parseFloat(value) <= 20) && (count <= 1);
	return isValid;
}


function getMark(id) {
	let value = document.querySelector("#" + id).value;
	if (isAValidMark(value)) {
		value = Math.ceil(parseFloat(value.split(",").join(".")));
		document.querySelector("#" + id).className = "right";
	} else {
		if (value.length == 0) {
			document.querySelector("#" + id).className = "";
		} else {
			document.querySelector("#" + id).className = "wrong";
		}
		value = NaN;
	}
	
	updateMoyenne(id, value);
}


let matieres = [
	{
		name: "Histoire-Geographie",
		coef: 3,
		year: "Première",
		mark: NaN
	},
	{
		name: "LVA",
		coef: 3,
		year: "Première",
		mark: NaN
	},
	{
		name: "LVB",
		coef: 3,
		year: "Première",
		mark: NaN
	},
	{
		name: "EPS",
		coef: 3,
		year: "Première",
		mark: NaN
	},
	{
		name: "Enseignement scientifique",
		coef: 3,
		year: "Première",
		mark: NaN
	},
	{
		name: "EMC",
		coef: 1,
		year: "Première",
		mark: NaN
	},
	{
		name: "Specialite abandonnee",
		coef: 8,
		year: "Première",
		mark: NaN
	},
	{
		name: "Oral de français",
		coef: 5,
		year: "Première",
		mark: NaN
	},
	{
		name: "Epreuve ecrite de français",
		coef: 5,
		year: "Première",
		mark: NaN
	},
	{
		name: "Histoire-Geographie",
		coef: 3,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "LVA",
		coef: 3,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "LVB",
		coef: 3,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "EPS",
		coef: 3,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Enseignement scientifique",
		coef: 3,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "EMC",
		coef: 1,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Philosophie",
		coef: 8,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Grand oral",
		coef: 10,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Specialite 1",
		coef: 16,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Specialité 2",
		coef: 16,
		year: "Terminale",
		mark: NaN
	}
];

let options = [
	{
		name: "Latin",
		coef: 2,
		year: "Première",
		mark: NaN
	},
	{
		name: "Grec",
		coef: 2,
		year: "Première",
		mark: NaN
	},
	{
		name: "Premiere option",
		coef: 2,
		year: "Première",
		mark: NaN
	},
	
	{
		name: "Latin",
		coef: 2,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Grec",
		coef: 2,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Premiere option",
		coef: 2,
		year: "Terminale",
		mark: NaN
	},
	{
		name: "Seconde option",
		coef: 2,
		year: "Terminale",
		mark: NaN
	},
];

let table = [];

for (var i = 0; i < matieres.length; i++) {
	create_bloc(i);
}

for (var i = 0; i < options.length; i++) {
	create_bloc_option(i);
}

document.querySelector("table").innerHTML += '<tr><td colspan="3" rowspan="2"><p><strong>Totaux :</strong></p></td>' + 
'<td colspan="2"><p id="resultPoints">_</p></td></tr> <tr><td colspan="2"><p id="resultMoy">_</p></td></tr>';
