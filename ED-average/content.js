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
			if (document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Ecrit") { // tableau dans une matièere écrite
				notes[document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = [];
			} else if (document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Oral") { // tableau dans une matièere orale
				if (document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML == "Ecrit") {
					notes[document.getElementsByClassName("discipline")[x - 2].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = [];
				} else {
					notes[document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = [];
				}
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
			if (document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Ecrit") { // vérifier l'emplacement de la note

				notes[document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = average;
				sousmatiere = true;
			} else if (document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML == "Oral") {

				if (document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML == "Ecrit") {
					notes[document.getElementsByClassName("discipline")[x - 2].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = average;

				} else {
					notes[document.getElementsByClassName("discipline")[x - 1].firstChild.firstChild.innerHTML][document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = average;

				}
				sousmatiere = true;
			} else { // créer un nouveau dossier pour la matière
				notes[document.getElementsByClassName("discipline")[x].firstChild.firstChild.innerHTML] = average;
				sousmatiere = false;
			}

			// afficher les moyennes
			if (sousmatiere) {
				document.getElementsByClassName("discipline")[x].parentElement.children[3].innerHTML = "( " + average * 20 + " /20 )";
			} else {
				document.getElementsByClassName("discipline")[x].parentElement.children[3].innerHTML = average * 20 + " /20";
			}
		}
	}

	// second layer pour les matières contenant des sous mtières
	for (x = 1; x < document.getElementsByClassName("discipline").length -1; x++) { // pour toutes les matières
		if (document.getElementsByClassName("discipline")[x].parentElement.children[3].innerHTML == "" && (document.getElementsByClassName("discipline")[x + 1].parentElement.children[0].children[0].innerText == 'Ecrit' || document.getElementsByClassName("discipline")[x + 1].parentElement.children[0].children[0].innerText == 'Oral')) { // vérifie si la 1e cases après appartient à cette matière

			if (document.getElementsByClassName("discipline")[x + 2].parentElement.children[0].children[0].innerText == 'Ecrit' || document.getElementsByClassName("discipline")[x + 2].parentElement.children[0].children[0].innerText == 'Oral') { // vérifie si la 2e cases après appartient à cette matière
				average = (Number(document.getElementsByClassName("discipline")[x + 1].parentElement.children[3].innerText.replace("( ", "").replace("/20 )", "")) + Number(document.getElementsByClassName("discipline")[x + 2].parentElement.children[3].innerText.replace("( ", "").replace("/20 )", ""))) / 2;

			} else {
				average = Number(document.getElementsByClassName("discipline")[x + 1].parentElement.children[(3)].innerText.replace("( ", "").replace("/20 )", ""));
				
			}
			// affiche la moyenne trouvé.
			document.getElementsByClassName("discipline")[x].parentElement.children[3].innerHTML = average + " /20";
		}
	}
		


	total = effectif = 0;
	for (i = 0; i < Object.values(notes).length; i++) {
		if (Object.values(notes)[i] * 2 != Object.values(notes)[i]) {
			total += Object.values(notes)[i];
			effectif++;
		} else if (Object.values(Object.values(notes)[i])[0] != undefined) {
			if (Object.values(Object.values(notes)[i])[0].length == 0 || Object.values(Object.values(notes)[i])[1].length == 0) {
				qutnt = 1;
			} else {
				qutnt = 2;
			}
			total += ((Object.values(Object.values(notes)[i])[0] || 0) + (Object.values(Object.values(notes)[i])[1] || 0)) / qutnt;
			effectif++;
		}
	}
	average = (total / effectif) * 20;

	display(average);
}

function display(average) {
	// obtenir le contenue HTML de la page
	if (String(average) == "NaN") {
		averageToDisplay = "<div id=\"averageToDisplay\">aucune note</div>"
	} else {
		averageToDisplay = "<div id=\"averageToDisplay\">Moyenne générale: " + average + " /20</div>";
	}
	
	document.getElementById("encart-notes").getElementsByTagName("div")[0].innerHTML = "<a id=\"div\" target=\"_blank\" href=\"https://github.com/augustin7698\"><svg aria-hidden=\"true\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"32\" data-view-component=\"true\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"></path></svg></a>" + averageToDisplay;

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

addEventListener('click', (event) => {
	detection();
});
