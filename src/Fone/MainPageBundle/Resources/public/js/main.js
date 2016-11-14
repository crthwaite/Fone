
/* Command methods */

var say = function (text) {
    $('#result').text('Has dicho: ' + text);
    speechSynth('Has dicho: ' + text);
    console.log(text);
};

var wH = function () {
    $('#result').text("Has dicho hola!");
    speechSynth("Has dicho hola!");
};

var sOver = function (month) {
    $('#result').text("Tu mes es: " + month);
    speechSynth("Tu mes es: " + month);
    /*Falta afegir random perque l'exemple moli mes*/
};

var catSpend = function (category,year) {
    $('#result').text("Tu categoría es: " + category + " y el año que has dicho es: " + year);
    speechSynth("Tu categoría es: " + category + ",y el año que has dicho es: " + year);
};

var siteMonth = function (site,month) {
    $('#result').text("Tu sitio es: " + site + " y el año que has dicho es: " + month);
    speechSynth("Tu sitio es: " + site  + "y el mes del año que has dicho es: " + month);

};
var compareMonths = function (cat,month1,month2) {
  $("#result").text("Tu categoría es: " + cat + " y has pedido la comparación entre: " +
    month1 +" y " + month2);
    speechSynth("Tu categoría es: " + cat + " y has pedido la comparación entre: " +
    month1 +" y " + month2);
};
var city = function (time) {
    $('#result').text("Quieres saber en que ciudad has estado mas tiempo durante: " + time);
    speechSynth("Quieres saber en que ciudad has estado mas tiempo durante: " + time);
}

var refresh = function () {
    pressed = 0;
    location.reload();
}

var explainCommand = function (num) {
    if(num === 'Quattro') text = 4;
    var text = comDesc[num - 1];
    speechSynth(text);
}


/*Synth methods*/
function speechSynth(text) {

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    synth.speak(utterance);
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

function commandDifference(user,comm) {
    var iUser = user.split(' ');
    var iComm = comm.split(' ');
    var n = min(iUser.length, iComm.length);
    var ret = 0;
    for (i = 0; i < n; i++){
        ret += LevenshteinDistance(iUser[i],iComm[i]);
    }
    return ret;
}

/*Minimum diffence between user sentence and all the commands
* Returns the command with minimum difference if this difference is lower than
* a threshold, -1 othervise
* */

function minimumCommandDifference(user,commands,th) {
    var min = Number.MAX_VALUE;
    var imin = -1;
    for( i = 0; i < commands.length; i++){
        var distance = commandDifference(user,commands[i]);
        if (distance < min ){
            min = distance;
            imin = i;
        }
    }
    if (min <= th) return commands[imin];
    else return -1;
}
/*Commands variables*/
var commands = {
    /*Prova*/
    'dime *text': say,
    'hola': wH,
    /*Preguntes bancs*/
    'gastado en :category :year': catSpend,
    'categoría mas dinero :month' : sOver,
    'categoría más dinero :month' : sOver,
    'mejor :site de :month': siteMonth,
    'compara gastos :cat entre *month1 y *month2': compareMonths,
    'ciudad más veces *time': city,
    'Refresca': refresh,
    'comando :num' : explainCommand
};







/*Variables*/
var ready = 0;
var synth = window.speechSynthesis;

var comDesc = {
    0: 'Debes decir: hola',
    1: 'Debes decir: dime, seguido de cualquier frase',
    2: 'Debes decir: gastado en, seguido de la categoría deseada y el año deseado.',
    3: 'Debes decir: categoria mas dinero en, seguido del més del año deseado',
    4: 'Debes decir: mejor, seguido de la categoría deseada y més deseado.',
    5: 'Debes decir: compara gastos, seguio de la categoría deseada, después ,entre, seguido de los meses deseados',
    6: 'Debes decir: ciudad mas veces, seguido del año o més deseado',
    7: 'Debes decir: refresca',
    8: 'Debes decir: comando, seguido del número de comando deseado'
};


    /* Init methods */
function startAnnyang(){
    if (annyang) {
        annyang.addCommands(commands);
        annyang.setLanguage('es-ES');
        annyang.start();
        annyang.debug();
        speechSynth('Reconocimiento activado!');
    }
}

function addCommands() {
    $('#commands').append('<li>hola</li>');
    $('#commands').append('<li> dime *text </li>');
    $('#commands').append('<li> gastado en :categoria :year </li>');
    $('#commands').append('<li> categoría mas dinero :month </li>');
    $('#commands').append('<li> mejor :site de :month? </li>');
    $('#commands').append('<li> Compara gastos  :cat entre *month1 y *month2 </li>');
    $('#commands').append('<li> ciudad mas veces *time </li>');
    $('#commands').append('<li> Refresca </li>');
    $('#commands').append('<li> comando :num </li>');
    $("#commands > li").addClass("w3-hover-pale-green");
}

$(document).ready(function() {
    if (ready < 1) {
        speechSynth('Bienvenido a la demostración del reconocimiento de voz de FONÉ!');
        speechSynth('Pulsa enter o espacio para iniciar el reconocimiento.');
        var pressed = 0;
        $("body").keypress(function () {
            if (pressed == 0) {
                addCommands();
                startAnnyang();
                pressed = 1;
            }
        });
        ready = 1;
    }
});

