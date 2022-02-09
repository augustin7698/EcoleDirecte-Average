disable = false;

async function wait(Ms, FuncToExe) {
	await new Promise(resolve => setTimeout(resolve, Ms));
	if (FuncToExe == "" || FuncToExe == null || FuncToExe == undefined) {} else {
		eval(arguments[1] + '()');
	}
}


function column() {
	if (!document.getElementsByClassName("average")[0]) {
		lignes = ligne = document.getElementsByClassName("notes").length - 1;
		while (ligne != 0) {
			document.getElementsByClassName("notes")[ligne].parentElement.innerHTML = document.getElementsByClassName("notes")[ligne].parentElement.innerHTML + "<td class=\"average\"></td>";
			ligne--;
		}
		document.getElementsByClassName("notes")[0].parentElement.innerHTML = document.getElementsByClassName("notes")[0].parentElement.innerHTML + "<th>Moyenne</th>";
	}
	a = 0;
	while (document.getElementsByClassName("graph")[a] != undefined) {
		document.getElementsByClassName("graph")[a].style.display = "none"
		a++;
	}
}


function getMoyenne() {
	averageOfLine = nbNotes = 0;
	if (document.getElementsByClassName("note")[x]) {
		matière = document.getElementsByClassName("note")[x].parentElement.parentElement.firstElementChild.innerText;
		while (document.getElementsByClassName("note")[x] && matière == document.getElementsByClassName("note")[x].parentElement.parentElement.firstElementChild.innerText) {
			if (document.getElementsByClassName("note")[x].innerText.includes("(")) {} else {
				if (document.getElementsByClassName("note")[x].innerText.includes("/")) {
					note = eval(document.getElementsByClassName("note")[x].innerText.replace(",", ".")) * 20;
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
}

function GlobalMoyenne() {
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
	if (document.getElementById("averageToDisplay") == undefined) {
		github = "<a id=\"div\" target=\"_blank\" href=\"https://github.com/augustin7698\"><svg aria-hidden=\"true\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"32\" data-view-component=\"true\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"></path></svg></a>";
		if (average == "aucune note") {
			averageToDisplay = "<div id=\"averageToDisplay\">" + average + "</div>"
		} else {
			averageToDisplay = "<div id=\"averageToDisplay\">Moyenne générale: " + average + " /20</div>";
		}
		document.getElementById("encart-notes").getElementsByTagName("div")[0].innerHTML = github + averageToDisplay + document.getElementById("encart-notes").getElementsByTagName("div")[0].innerHTML;
	}
}

async function init() {
	while (document.getElementsByTagName("table")[0] == undefined) {
		await wait(100);
	}
	column();

	await wait(500);
	x = 0;

	while (lignes > 0) {
		getMoyenne();
		lignes--;
	}
	MatiereMoyenne();
	GlobalMoyenne();
	display()
}


if (window.location.origin == "https://www.ecoledirecte.com" && window.location.href.includes("Notes") && disable == false) {
	init()
}

window.addEventListener("click", function() {
	if (window.location.origin == "https://www.ecoledirecte.com" && window.location.href.includes("Notes") && disable == false) {
		init()
	}
})

chrome.runtime.onMessage.addListener(function(request) {
	if (request.greeting == "disable") {
		disable = true;
		if (document.getElementById("averageToDisplay")) {
			document.getElementById("averageToDisplay").style.display = "none";
		}
		if (document.getElementById("div")) {
			document.getElementById("div").style.display = "none";
		}
		a = 0;
		while (document.getElementsByClassName("average")[a]) {
			document.getElementsByClassName("average")[a].style.display = "none";
			a++;
		}
		a = 0;
		while (document.getElementsByTagName("th")[a].innerText != "MOYENNE") {
			a++;
		}
		document.getElementsByTagName("th")[a].style.display = "none";
	} else {
		disable = false;
		if (document.getElementById("averageToDisplay")) {
			document.getElementById("averageToDisplay").style.display = "block";
		}
		if (document.getElementById("div")) {
			document.getElementById("div").style.display = "block";
		}
		a = 0;
		while (document.getElementsByClassName("average")[a]) {
			document.getElementsByClassName("average")[a].style.display = "";
			a++;
		}
		a = 0;
		while (document.getElementsByTagName("th")[a]) {
			if (document.getElementsByTagName("th")[a].innerText != "MOYENNE") {
				document.getElementsByTagName("th")[a].style.display = "";
			}
			a++;
		}
		
		init()
	}
});