
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.daten == "qisdaten"){
    nameStudiengang = request.studiengang;
    aktSemester = request.aktuellesSemester;
    fach = request.fach;
    note = request.note;
    ects= request.ects;
    getWerte(fach, note, ects);
  }
  else{
    sendResponse({});    // Stop
  }
});

function getWerte(fachArray, noteArray, ectsArray){
	var prod = 0;
	var sumEcts = 0;
	for (var i = 0; i < ectsArray.length; i++) {
		prod = prod + (ectsArray[i] * noteArray[i]);
		sumEcts = sumEcts + ectsArray[i];
	}
	getDurchschnitt(prod, sumEcts);
	};


function getDurchschnitt(prod, sumEcts){
	var durchschnittUngerundet = (prod / sumEcts);	
	durchschnitt = Math.round(durchschnittUngerundet * 100) / 100;
	aktEcts = sumEcts;
};


