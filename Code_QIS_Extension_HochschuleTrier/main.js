//Infos bestimmen
	var nameStudiengang = jQuery.trim($($('font.posheader > span.nobr')[1]).text());
	var fachSemester = jQuery.trim($($('font.posheader > span.nobr')[3]).text());
		

// Indexpositionen aus TableHeader auslesen
	var head = $('th.Konto');
	var maxColumns = head.length;
	var indexNote = 0;
	var indexEcts = 0;
	var indexFach = 0;
	var	noteArray = [];
	var fachArray = [];
	var ectsArray = [];
	var isNote = false;
	var isFach = false;
	var aktPos = 0;
		head.each(function(i, v) {
			var tmp = $.trim(this.innerText);
			if (tmp == 'Note') {
				indexNote = i;
			}else if (tmp == 'ECTS-Punkte') {
				indexEcts = i;
			}else if (tmp == 'Prüfungstext') {
				indexFach = i;
			}
		});
		
		$('tr').each(function(i, v){
			
			//Richtige Zeilen prüfen
			if($(this).children().length == maxColumns ){

				var row = $(this);

			//Noten parsen und speichern
				parseNote(row);

			//Fächer parsen und speichern	
				if (isNote) {
					parseFach(row);
				};
			//Ects parsen und speichern
				if ((isFach)&&(isNote)) {
					parseEcts(row);
				};
			}
		});

		//Prüft ob Note gegeben und speichert sie dann
		function parseNote(row){
			var aktRow = row;
			var tmpN = $(aktRow).children()[indexNote];
			var tmpTrimN = ($.trim(tmpN.innerText)).replace('*',"");
			var nReplaced = tmpTrimN.replace(',', ".");
			var nParsed = parseFloat(nReplaced);

			if(nParsed <= 4.0 && nParsed >= 1.0){
				noteArray.push(nParsed);
				isNote = true;
			}else{
				isNote = false;
			}
		}
		
		//Wenn Note gegeben, dann Fach parsen und speichern
		function parseFach(row){
			var aktRow = row;
			var tmpF = $(aktRow).children()[indexFach];
			var tmpTrimF = ($.trim(tmpF.innerText));
			var pos = jQuery.inArray(tmpTrimF, fachArray);
		
			if((pos === -1) && (tmpTrimF != "")){
				fachArray.push(tmpTrimF);
				aktPos++;
				isFach = true;
			}else if(pos != -1){
				if(noteArray[pos] < noteArray[aktPos]){
					noteArray.pop();
					isFach = false;
				}else{
					noteArray.splice(pos, 1);
					fachArray.splice(pos,1);
					ectsArray.splice(pos,1);
					fachArray.push(tmpTrimF);
					isFach = true;
				}
			}else{
				isFach = false;
			}
		
		}

		function parseEcts(row){
			var aktRow = row;
			var tmpE = $(aktRow).children()[indexEcts];
			var tmpTrimE = ($.trim(tmpE.innerText));
			var parsedE = parseFloat(tmpTrimE);
			ectsArray.push(parsedE);
		}



		//Message Passing an die background.js
		chrome.extension.sendRequest({
 			 "daten": "qisdaten",
 			 "studiengang": nameStudiengang, 
 			 "aktuellesSemester": fachSemester, 
 			 "fach": fachArray,
 			 "note": noteArray,
 			 "ects": ectsArray
		});



