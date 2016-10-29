var startAnnyang = 0;



function speechSynth(text) {
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
}

var say = function (text) {
    $('#sText').text('Has dicho: ' + text);
    speechSynth('Has dicho: ' + text);
    console.log(text);
};

var wH = function () {
    $('#sText').text("Has dicho hola!");
};

var sOver = function (month) {
    $('#sText').text("Tu mes es: " + month);
    speechSynth("Tu mes es: " + month);
    /*Falta afegir random perque l'exemple moli mes*/
};

var catSpend = function (category,year) {
    $('#sText').text("Tu categoría es: " + category + " y el año que has dicho es: " + year);
    speechSynth("Tu categoría es: " + category + ",y el año que has dicho es: " + year);
};

var siteMonth = function (site,month) {
    $('#sText').text("Tu sitio es: " + site + " y el año que has dicho es: " + month);
    speechSynth("Tu sitio es: " + site  + "y el mes del año que has dicho es: " + month);
    /*Falta afegir random perque l'exemple moli mes*/
};
var commands = {
    /*Prova*/
    'dime *text': say,
    'hola': wH,

    /*Preguntes bancs*/
    '(En cual) categoria me he gastado mas dinero en (el mes de) :month' : sOver,
    'Cuanto dinero me gasté en :categoria (el año) :year': catSpend,
    'Cual es el mejor :site donde he estado en :month?': siteMonth
};

function start() {
    if(startAnnyang === 0){
        if (annyang) {
            // Let's define a comman
            annyang.addCommands(commands);
            annyang.setLanguage('es-ES');
            annyang.start();
            startAnnyang = 1;
        }
    } else {
        startAnnyang = 0;
        annyang.abort();
    }

}