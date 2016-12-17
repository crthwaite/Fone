
/* ######## Command Function and Methods ########*/


var com1 = {
    'hola': wH
};

var wH = function () {
    $('#result').text("Bienvenido!");
    speechSynth("Bienvenido!");
};


/*Functions and commands for question 2*/

var com2 = {
    'dime *text': say
};

var say = function (text) {
    $('#result').text('Has dicho: ' + text);
    speechSynth('Has dicho: ' + text);
    console.log(text);
};

 /*Functions and commands for question 3*/

 /*Functions and commands for question 3*/
var com3 = {
    'gastado en *category periodo *period': catSpend
};

var catSpend = function (category,period) {

    var dataParsed = chrono.parse(period);
    if(dataParsed.length > 0){
         /*Pass parameters to back-end*/
        var dates = parseDate(dataParsed[0]);
        console.log(dates[0]);
        $('#result').text("Tu categoría es: " + category + " y el periodo dicho es: " + period);
        speechSynth("Tu categoría es: " + category + ",y el periodo dicho es: " + period);
    } else speechSynth('Periodo de tiempo incorrecto');


};


/*Functions and commands for question 4*/

var com4 = {
    'categoría más dinero periodo *period' : sOver
};

var sOver = function (period) {

    var dataParsed = chrono.parse(period);
    console.log(dataParsed);
    if(dataParsed.length > 0){
        /*Pass parameters to back-end*/
        var dates = parseDate(dataParsed[0]);
         console.log(dates[0]);
        $('#result').text("Tu periodo es: " + period);
        speechSynth("Tu periodo es: " + period);
    } else speechSynth('Periodo de tiempo incorrecto');

};


/*Functions and commands for question 5*/

var com5 = {
    'mejor *site periodo *period': siteMonth
};

var siteMonth = function (site,period) {


     var dataParsed = chrono.parse(period);
    if(dataParsed.length > 0){
        /*Pass parameters to back-end*/
        var dates = parseDate(dataParsed[0]);
         console.log(dates[0]);
        $('#result').text("Tu sitio es: " + site + " y periodo dicho es: " + period);
        speechSynth("Tu sitio es: " + site  + "y el periodo dicho es: " + period);
    } else speechSynth('Periodo de tiempo incorrecto');

};


/*Functions and commands for question 6*/

var com6 = {
    'compara gastos *cat periodo *period': compareCat
};

var compareCat = function (cat,period) {

   var dataParsed = chrono.parse(period);
    if(dataParsed.length > 0){
        /*Pass parameters to back-end*/
        var dates = parseDate(dataParsed[0]);
         console.log(dates[0]);
         $("#result").text("Tu categoría es: " + cat + " y has pedido la comparación entre: " +
         period);
    } else speechSynth('Periodo de tiempo incorrecto');

};


/*Functions and commands for question 7*/

var com7 = {
    'ciudad más veces *period': city
};

var city = function (period) {

    var dataParsed = chrono.parse(period);
    if(dataParsed.length > 0){
      var dates = parseDate(dataParsed[0]);
      console.log(dates[0]);
       $('#result').text("Quieres saber en que ciudad has estado mas tiempo durante: " + period);
       speechSynth("Quieres saber en que ciudad has estado mas tiempo durante: " + period);
    } else speechSynth('Periodo de tiempo incorrecto');

}

/*Functions and commands for question 8*/

var com8 = {
     'Refresca': refresh
};

var refresh = function () {
    pressed = 0;
    location.reload();
}

/*Functions and commands for question 9*/

var com9 = {
     'comando :num' : explainCommand
};

var explainCommand = function (num) {
    if(num === 'Quattro') text = 4;
    var text = comDesc[num - 1];
    speechSynth(text);
}

/* Functions and commands for question 10*/
var com10 = {
    'mis transacciones' : myTransactions
};

var myTransactions = function() {
    var url = Routing.generate('transaction_default_get_user_transactions');
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
        }
    });
}


/*Description of commands*/
var comDesc = {
    0: 'Debes decir: hola',
    1: 'Debes decir: dime, seguido de cualquier frase',
    2: 'Debes decir: gastado en, seguido de la categoría deseada y el periodo de tiempo deseado.',
    3: 'Debes decir: categoria mas dinero en, seguido del més del periodo de tiempo deseado',
    4: 'Debes decir: mejor, seguido de la categoría deseada y periodo de tiempodeseado.',
    5: 'Debes decir: compara gastos, seguio de la categoría deseada, seguido del periodo de tiempo',
    6: 'Debes decir: ciudad mas veces, seguido del periodo de tiempo',
    7: 'Debes decir: refresca',
    8: 'Debes decir: comando, seguido del número de comando deseado',
    9: 'Debes decir: mis transacciones',
};

/*Array that contains all the commands to compare with user phrase*/
var comForDif = [
    /*Prova*/
    'dime *text',
    'hola',
    /*Preguntes bancs*/
    'gastado en *category periodo *period',
    'categoría mas dinero periodo *period',
    'mejor *site periodo *period',
    'compara gastos *cat periodo *period',
    'ciudad más veces *period',
    'Refresca',
    'comando :num',
    'mis transacciones'
];

/* ######################################################################*/


/* ######## Synth methods ################################################*/

function speechSynth(text) {

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    synth.speak(utterance);
}
/* ######################################################################*/


/* ######## Algorithms and methods ########################################*/

/*  Date parser
* Returns an array of one or two dates meaning start time and end time
* If there is no second date we will assume that user wants from start date to now
*/

function parseDate(period){
    retDates = [];
    startDate = period.start.date();
    var date = [];
    var day = startDate.getDate();
    var month = startDate.getMonth() + 1;
    var year = startDate.getFullYear();
    date.push(day);
    date.push(month);
    date.push(year);
    retDates.push(date);
    if (period.end != null){
        var endDate = period.end.date();
        var date = [];
        var day = endDate.getDate();
        var month = endDate.getMonth();
        var year = endDate.getFullYear();
        date.push(day);
        date.push(month);
        date.push(year);
        retDates.push(date);
    }
    return retDates;
}
/*Returns a date with the following format:
    day/month/year*/
function dateToVec(date){

    return date;
}
/*Levenshtein algorithm*/

function LevenshteinDistance(s,t) {
    var vecs = s.split('');
    var vect = t.split('');
    //Degenerate cases
    if (s === t) return 0;
    if (s.length == 0) return t.length;
    if(t.length == 0) return s.length;

    //Vectors of integer distances
    var v0 = new Array(t.length + 1);
    var v1 = new Array(t.length + 1);

    //Initialize v0
    for(i = 0; i < t.length + 1; i++){
        v0[i] = i;
    }

    for(i = 0; i < s.length; i++){

        // first element of v1 is A[i+1][0]
        v1[0] = i+1;

        //Compute recurrence
        for(j = 0; j < t.length; j++){
            var cost = (vecs[i] == vect[j]) ? 0 : 1;
            v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
        }

        //copy v1(current row) to v0 (previous row) for next iteration

        for(j = 0; j < v0.length; j++){
            v0[j] = v1[j];
        }
    }
    return v1[t.length];
}


/*Difference between user sentence and command using Levenshtein distance*/

/*Minimum diffence between user sentence and all the commands
* Returns the command with minimum difference if this difference is lower than
* a threshold, -1 othervise
* */

function minimumCommandDifference(user,th) {
    var min = Number.MAX_VALUE;
    var imin = -1;
    for( var i = 0; i < comForDif.length; i++){
        var distance = LevenshteinDistance(user[0],comForDif[i]);
        console.log(distance);
        if (distance < min ){
            min = distance;
            imin = i;
        }
    }
    if (min <= th) return imin + 1;
    else return -1;
}


/* ######################################################################*/


/* ######## Init methods ################################################*/


/*Variables*/
var ready = 0;
var synth = window.speechSynthesis;

/*Descripcion of the commands that sytem has to say to the user*/

function addAnnyangCommands(){
    annyang.addCommands(com1);
    annyang.addCommands(com2);
    annyang.addCommands(com3);
    annyang.addCommands(com4);
    annyang.addCommands(com5);
    annyang.addCommands(com6);
    annyang.addCommands(com7);
    annyang.addCommands(com8);
    annyang.addCommands(com9);
    annyang.addCommands(com10);
}

/* Init methods */
function startAnnyang(){
    if (annyang) {
        addAnnyangCommands();
        annyang.setLanguage('es-ES');
        annyang.start();
        annyang.debug();
        speechSynth('Reconocimiento activado!');
        annyang.addCallback('resultNoMatch', function(userSaid, commandText, phrases) {
            var diff = minimumCommandDifference(userSaid,30);
            if(diff === -1)  speechSynth('No hemos encontrado ningún comando parecido a tu pregunta: puedes usar el comando 9 para comprender los comandos!');
            else speechSynth('Quizàs te refieres al comando: ' + diff);

        });
    }
}

function addCommandsDescription() {
    $('#commands').append('<li>hola</li>');
    $('#commands').append('<li> dime [frase] </li>');
    $('#commands').append('<li> gastado en [categoria] periodo [periodo deseado] </li>');
    $('#commands').append('<li> categoría mas dinero periodo [periodo deseado] </li>');
    $('#commands').append('<li> mejor [sitio] periodo [periodo deseado] </li>');
    $('#commands').append('<li> Compara gastos  [categoria] periodo [periodo deseado] </li>');
    $('#commands').append('<li> ciudad mas veces [periodo deseado] </li>');
    $('#commands').append('<li> Refresca </li>');
    $('#commands').append('<li> comando [numero] </li>');
    $("#commands > li").addClass("w3-hover-pale-green");
}

$(document).ready(function() {
    if (ready < 1) {
        speechSynth('Bienvenido!');
        speechSynth('Pulsa enter o espacio para iniciar la aplicación.');
        var pressed = 0;
        $("body").keypress(function () {
            synth.cancel();
            if (pressed == 0) {
                addCommandsDescription();
                startAnnyang();
                pressed = 1;
            }
        });
        ready = 1;
    }
});


/* ######################################################################*/
