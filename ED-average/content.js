function column() {
	// ajouter la colonne moyenne
	if (!document.getElementsByClassName("average")[0]) {
		for (var i = document.getElementsByClassName("notes").length - 1; i > 0; i--) {
			document.getElementsByClassName("notes")[i].parentElement.innerHTML = document.getElementsByClassName("notes")[i].parentElement.innerHTML + "<td class=\"average\"></td>";
		}
		document.getElementsByClassName("notes")[0].parentElement.innerHTML = document.getElementsByClassName("notes")[0].parentElement.innerHTML + "<th>Moyennes</th>";
	}

	// supprimer la colonne graph
	for (var i = document.getElementsByClassName("graph").length -1; i >= 0; i--) {
		document.getElementsByClassName("graph")[i].style.display = "none";
	}
}

function getMoyenne() {
	notes = {}
	for (x = 1; x < document.getElementsByClassName("discipline").length; x++) { // pour toutes les matières
		// créer le tableau
		if (notes[document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] == undefined) { // vérifier 
			if (document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Oral" || document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Ecrit") { // créer un nouveau dossier pour une sous matière
				notes[document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = [];
			} else { // créer un nouveau dossier pour la matière
				notes[document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = [];
			}
		}
		
		// obtenir les notes
		len = document.getElementsByClassName("discipline")[x].parentElement.children[1].children.length; // nombre de note
		effectif = total = 0;
		for (i = 0; i < len; i++) { // pour chaque note
			numerateur = document.getElementsByClassName("discipline")[x].parentElement.children[(1)].children[i].children[(0)].innerText.split("/")[0].replaceAll(",", ".");
			denominateur = (document.getElementsByClassName("discipline")[x].parentElement.children[(1)].children[i].children[(0)].innerText.split("/")[1] || "20").replaceAll(",", ".");
			result = Number(numerateur) / Number(denominateur); // obtenir une note

			if (String(result) != "NaN") { // ajouter la note au fichier
				total += result;
				effectif++;
			}
		}
		// créer les moyennes
		average = total / effectif;
		if (String(average) != "NaN") {
			if (document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Oral" || document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Ecrit") { // vérifier l'emplacement de la note
				notes[document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = average;
				document.getElementsByClassName("discipline")[x].parentElement.children[3].innerHTML = average * 20;
			} else { // créer un nouveau dossier pour la matière
				notes[document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = average;
				document.getElementsByClassName("discipline")[x].parentElement.children[3].innerHTML = average * 20;
			}
		}
	}


	total = effectif = 0;
	for (i = 0; i < Object.values(notes).length; i++) {
		if (Object.values(notes)[i] * 2 != Object.values(notes)[i]) {
			total += Object.values(notes)[i];
			effectif++;
		} else if (Object.values(Object.values(notes)[i])[0] != undefined) {
			total += ((Object.values(Object.values(notes)[i])[0] || 0) + (Object.values(Object.values(notes)[i])[1] || 0)) / Object.values(Object.values(notes)[i]).length
			effectif++;
		}
	}
	average = (total / effectif) *20;

	display(average);
}

function display(average) {
	// obtenir le contenue HTML de la page
	if (String(average) == "NaN") {
		averageToDisplay = "<div id=\"averageToDisplay\">aucune note</div>"
	} else {
		averageToDisplay = "<div id=\"averageToDisplay\">Moyenne générale: " + average + " /20</div>";
	}
	
	document.getElementsByTagName("head")[0].innerHTML += "<script async defer src='https://buttons.github.io/buttons.js'></script>";
	document.getElementById("encart-notes").getElementsByTagName("div")[0].innerHTML = "<a href='https://github.com/augustin7698/EcoleDirecte-Average' data-color-scheme='no-preference: light; light: light; dark: dark_dimmed;' data-size='large' aria-label='Star augustin7698/EcoleDirecte-Average on GitHub'>Star</a>" + averageToDisplay;
}

async function init() {
	// fonction initial
	while (document.getElementsByTagName("table")[0] == undefined) { // attendre de chargment du tableau
		await new Promise(resolve => setTimeout(resolve, 100));
	}
	await new Promise(resolve => setTimeout(resolve, 1500));
	column();
	getMoyenne();	
}



async function detection() {
	if (window.location.origin == "https://www.ecoledirecte.com") {
		while (window.location.origin == "https://www.ecoledirecte.com" && !window.location.href.includes("Notes")) {
			await new Promise(resolve => setTimeout(resolve, 250));
		}
		if (window.location.origin == "https://www.ecoledirecte.com" && window.location.href.includes("Notes")) {
			init();
		}
	}
}
detection();
