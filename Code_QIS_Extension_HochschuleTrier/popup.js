$(document).ready(function(){

    var bg =  chrome.extension.getBackgroundPage();
    var aktStudiengang = bg.nameStudiengang;
    var aktSemester = bg.aktSemester;
    var aktuelleEcts = bg.aktEcts;
    $('.personalInfos').append('<h6>'+aktStudiengang+'</h6>');
    $('.personalInfos').append('<h6>'+aktSemester+'</h6>');
    $('.personalInfos').append('<h6>'+aktuelleEcts+' von 180 Ects erreicht</h6>');

	$('#getDurchschnittButton').click(function(){
        var bg =  chrome.extension.getBackgroundPage();
		var durchschnitt = bg.durchschnitt;
        document.getElementById('inputdurchschnitt').value = durchschnitt;
    
		

		var bg =  chrome.extension.getBackgroundPage();
		var note = bg.note;
		var notenSort = note.sort();
		

		var counterArray = [];
		var counter = 0;
		var j = 0;



        $.jqplot.config.enablePlugins = true;

        var ticks = ['1.0', '1.3', '1.7', '2.0', '2.3', '2.7', '3.0', '3.3', '3.7', '4.0'];
        var abgleich = ['1', '1.3', '1.7', '2', '2.3', '2.7', '3', '3.3', '3.7', '4']
        for (var i = 0; i <= notenSort.length; i++) {
        	if (notenSort[i] == abgleich[j]) {
        		counter++;
        	}else{
        		counterArray[j] = counter;
        		counter = 0;
                //den abgleich eine Position weiter setzen und dann nochmal mit gleichen i prüfen, darum i--
        		j++;
        		i--;
        	}
        };
       	console.log(notenSort);
        drawChart(counterArray, ticks);
         


	});



	function drawChart(counterArray, ticks){
		     plot1 = $.jqplot('chart_div', [counterArray], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
            seriesColors: [ "#ff8822", "#ccc", "#444"],
            highlighter: { show: false }
        });
     
        $('#chart_div').bind('jqplotDataClick');
	}
});

	     
