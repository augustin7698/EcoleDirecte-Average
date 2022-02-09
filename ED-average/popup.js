async function wait(Ms, FuncToExe, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
	await new Promise(resolve => setTimeout(resolve, Ms));
	if (FuncToExe != "" && FuncToExe != null && FuncToExe != undefined) {
		eval(arguments[1] + '(' + arg1 + ',' + arg2 + ',' + arg3 + ',' + arg4 + ',' + arg5 + ',' + arg6 + ',' + arg7 + ',' + arg8 + ',' + arg9 + ',' + arg10 + ')');
	}
}

async function init() {
	await wait(1000);

	if (document.getElementsByTagName("button")[0]) {
		document.getElementsByTagName("button")[0].addEventListener("click", function() {
			if (document.getElementsByTagName("button")[0].innerText == "désactiver EcoleDirecte Average") {
				document.getElementsByTagName("button")[0].innerText = "activer EcoleDirecte Average";
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {greeting: "disable"});
				});
			} else {
				document.getElementsByTagName("button")[0].innerText = "désactiver EcoleDirecte Average";
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {greeting: "able"});
				});
			}
		});
	}
}

init()