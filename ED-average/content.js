// obtenir les cookies
cookies = document.cookie.split(";");
disable = x = 0;

for (i = cookies.length; i--; i>=0) {
    cookies[i] = cookies[i].split("=");
}

while (cookies[x]) {
	if (cookies[x][0] == "disable") {
		disable = cookies[x][1];
		break;
	}
	x++;
}

if (disable == 0) {
	document.cookie = "disable=false";
	disable = "false";
}

// fonction d'attente
async function wait(Ms, FuncToExe) {
	await new Promise(resolve => setTimeout(resolve, Ms));
	if (FuncToExe == "" || FuncToExe == null || FuncToExe == undefined) {} else {
		eval(arguments[1] + '()');
	}
}

function column() {
	// ajouter la colonne moyenne
	if (!document.getElementsByClassName("average")[0]) {
		for (var i = document.getElementsByClassName("notes").length - 1; i > 0; i--) {
			document.getElementsByClassName("notes")[i].parentElement.innerHTML = document.getElementsByClassName("notes")[i].parentElement.innerHTML + "<td class=\"average\"></td>";
		}
		document.getElementsByClassName("notes")[0].parentElement.innerHTML = document.getElementsByClassName("notes")[0].parentElement.innerHTML + "<th>Moyenne</th>";
	}

	// afficher les graph ou la moyenne en fonction du cookie
	if (disable == "true") {
		document.getElementsByTagName("th")[3].style.display = "none";
		for (var i = document.getElementsByClassName("average").length -1; i >= 0; i--) {
			document.getElementsByClassName("average")[i].style.display = "none";
		}
	} else {
		document.getElementsByTagName("th")[3].style.display = "block";
		for (var i = document.getElementsByClassName("graph").length -1; i >= 0; i--) {
			document.getElementsByClassName("graph")[i].style.display = "none";
		}
	}
}

function getMoyenne() {
	averageOfLine = nbNotes = 0;

	// selectionner une note
	if (document.getElementsByClassName("note")[x]) {

		// obtenir la matière
		matière = document.getElementsByClassName("note")[x].parentElement.parentElement.firstElementChild.innerText;

		// obtenir la moyenne par matière
		while (document.getElementsByClassName("note")[x] && matière == document.getElementsByClassName("note")[x].parentElement.parentElement.firstElementChild.innerText) {
			if (document.getElementsByClassName("note")[x].innerText.includes("(")) {} else {
				if (document.getElementsByClassName("note")[x].innerText.includes("/")) {
					note = document.getElementsByClassName("note")[x].innerText.replace(",", ".").replace(" ", "").split("/");
					note = String((Number(note[0]) / Number(note[1])) * 20);
				} else {
					note = document.getElementsByClassName("note")[x].innerText.replace(",", ".");
				}
				averageOfLine = Number(note) + averageOfLine;
				nbNotes++;
			}
			x++;
		}
		x--;
		document.getElementsByClassName("note")[x].parentElement.parentElement.lastElementChild.innerText = Math.round(averageOfLine / nbNotes * 100) / 100;
		x++;
	}
}

function MatiereMoyenne() {
	x = nbSousMatiere = sousmatiereAVG = nbSousMatiere = division = 0;
	while (document.getElementsByClassName("discipline")[x]) {
		if (document.getElementsByClassName("discipline")[x].classList.contains("sousmatiere")) {
			sousmatiereAVG = sousmatiereAVG + Number(document.getElementsByClassName("discipline")[x].parentElement.lastElementChild.innerText);
			if (document.getElementsByClassName("discipline")[x].parentElement.lastElementChild.innerText != "") {
				division++;
			}
			nbSousMatiere++;
			if (nbSousMatiere >= 2) {
				if (division != 0) {
					document.getElementsByClassName("discipline")[x - 2].parentElement.lastElementChild.innerText = Math.round(sousmatiereAVG / division * 100) / 100;
					nbSousMatiere = sousmatiereAVG = division = 0;
				}
			}
		}
		x++;
	}

	y = average = divisions = 0;
	while (document.getElementsByClassName("average")[y]) {
		if (document.getElementsByClassName("average")[y].innerText != "" && document.getElementsByClassName("average")[y].parentElement.firstElementChild.classList[1] != 'sousmatiere') {
			average = average + Number(document.getElementsByClassName("average")[y].innerText);
			divisions++;
		}
		y++;
	}
	average = average / divisions;
	if (String(average) == "NaN") {
		average = "aucune note";
	} else {
		average = Math.round(average * 1000) / 1000
	}
}

function display() {
	// obtenir le contenue HTML de la page
	github = "<a id=\"div\" target=\"_blank\" href=\"https://github.com/augustin7698\"><svg aria-hidden=\"true\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"32\" data-view-component=\"true\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"></path></svg></a>";
	desactivate = ""+
	"if (document.getElementById('encart-notes').firstElementChild.getElementsByTagName('a')[0].style.display == 'none') {"+
	"	document.getElementById('encart-notes').firstElementChild.getElementsByTagName('a')[0].style.display = document.getElementById('encart-notes').firstElementChild.getElementsByTagName('div')[0].style.display = 'block';"+
	
	"	document.getElementsByTagName('th')[3].style.display = '';"+
	"	document.getElementsByTagName('th')[2].style.display = 'none';"+
	"	for (i = document.getElementsByClassName('average').length; i--; i >= 0) {"+
	"		document.getElementsByClassName('average')[i].style.display = '';"+
	"		document.getElementsByClassName('graph')[i].style.display = 'none';"+
	"	}"+
	"	for (var i = document.getElementsByClassName('average').length -1; i >= 0; i--) {"+
	"		document.getElementsByClassName('average')[i].style.display = '';"+
	"	}"+
	"	for (var i = document.getElementsByClassName('graph').length -1; i >= 0; i--) {"+
	"		document.getElementsByClassName('graph')[i].style.display = 'none';"+
	"	}"+
	"	document.cookie = 'disable=false';"+
	"} else {"+
	"	document.getElementById('encart-notes').firstElementChild.getElementsByTagName('a')[0].style.display = document.getElementById('encart-notes').firstElementChild.getElementsByTagName('div')[0].style.display = 'none';"+
	
	"	document.getElementsByTagName('th')[3].style.display = 'none';"+
	"	document.getElementsByTagName('th')[2].style.display = '';"+

	"	for (var i = document.getElementsByClassName('average').length -1; i >= 0; i--) {"+
	"		document.getElementsByClassName('average')[i].style.display = 'none';"+
	"	}"+
	"	for (var i = document.getElementsByClassName('graph').length -1; i >= 0; i--) {"+
	"		document.getElementsByClassName('graph')[i].style.display = '';"+
	"	}"+
	"	document.cookie = 'disable=true';"+
	"}";
	desactivate = "<button id='desactivation' onclick=\"" + desactivate + "\">Activer / Désactiver</button>";

	if (average == "aucune note") {
		averageToDisplay = "<div id=\"averageToDisplay\">aucune note</div>"
	} else {
		averageToDisplay = "<div id=\"averageToDisplay\">Moyenne générale: " + average + " /20</div>";
	}

	// masquer les elements selon le cookie
	document.getElementById("encart-notes").getElementsByTagName("div")[0].innerHTML = github + averageToDisplay + desactivate;
	if (disable == "true") {
		document.getElementById('encart-notes').firstElementChild.getElementsByTagName('a')[0].style.display = document.getElementById('encart-notes').firstElementChild.getElementsByTagName('div')[0].style.display = 'none';
	}
}

async function init() {
	// fonction initial
	while (document.getElementsByTagName("table")[0] == undefined) {
		await wait(100);
	}
	column();

	for (var i = document.getElementsByClassName('notes').length - 1; i >= 0; i--) {
		getMoyenne();
	}
	MatiereMoyenne();
	display();
}

if (window.location.origin == "https://www.ecoledirecte.com" && window.location.href.includes("Notes")) {
	init();
}
