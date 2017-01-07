/* ##################### FAQ ####################### */

/*Questions */

var faq = {
    "que preguntas puedo hacer": "puedes saber que preguntas hacer diciendo: que preguntas puedo hacer",
    "como reiniciar la aplicación": "para reiniciar la aplicación, puedes hacerlo diciendo: refresca",
    "como pausar el reconocimiento de voz": "para pausar el reconocimiento, pulsa la tecla erre",
    "como reanudar el reconocimiento de voz": "para reanudar el reconociemento puedes pulsar la tecla erre s" +
    "i lo has pausado prèviamente",
    'como parar la respuesta': 'puedes parar la respuesta pulsando la tecla: a',
    'como puedo preguntar': 'para preguntar pulsa la tecla enter, después el sistema te permitirà hacer una pregunta'

}
/*Commands for questions*/
function addFAQCommands() {
    var FAQcommands = {
        'que preguntas puedo hacer' : whatQuestionsMethod,
        'cómo reiniciar la aplicación': howResetMethod,
        'como cancelar la respuesta': howToStop,
        'como puedo preguntar': howToQuery
    };
    annyang.addCommands(FAQcommands);
}

var howToQuery = function () {
    speechSynth(faq[3]);
}
var howToStop = function () {
    speechSynth(faq[2]);
}
var comWhatQuestions = {
    'que preguntas puedo hacer' : whatQuestionsMethod
}
var whatQuestionsMethod = function () {
    speechSynth(faq[0]);
};
var comHowReset = {
    'cómo reiniciar la aplicación': howResetMethod
};
var howResetMethod = function () {
    speechSynth(faq[1]);
};

/*Disponible questions commands*/

var comDisponibleQuestions = {
    'que preguntas puedo hacer': disponibleQuestionsMethod
};

var disponibleQuestionsMethod = function () {
    speechSynth("Las preguntas disponibles són:");
    var keys = Object.keys(questionDescription);
    for(var i = 0; i < keys.length; ++i){
        speechSynth('Formulación de la pregunta:');
        speechSynth(keys[i]);
        speechSynth('Utilidad:');
        speechSynth(questionDescription[ keys[i] ]);
    }
}

var questionDescription = {
    'decir: Saluda': "El sistema te saludarà",
    'decir la frase: gastado en: segudio de la  categoría deseada: después decir la palabra:  fecha : acto seguido decir la fecha deseada'
        : "sirve para saber tu balance en una categoría determinada" +
    "durante una fecha en concreto.",
    'decir: movimientos de, seguido de la categoría deseada *category, después decir la palabra: fecha i después la fecha deseada':
    'esta pregunta te permite saber los movimientos realizados en una categoría concreta durante la fecha indicada',
    'decir: gastado en, después indicar la categoría deseada':
    'Preguntando esto puedes saber el balance de las transacciones realizadas en una categoría en particular',
    'decir: movimientos de, seguido de la categoría deseada':
    'Te permite saber los movimientos realizados en la categoría indicada',
    'decir: balance en la fecha, después decir la fecha deseada':
    'este pregunta te permite saber el balance: gastos versus ingresos en la categoría indicada',
    'cuál es la ciudad con más movimientos': 'ésta pregunta te permite saber la ciudad donde has realizado más movimientos'
}

var arrayForDiff = [
    'Saluda',
    'gastado en *category en la fecha *period',
    'movimientos de *category fecha *period',
    'gastado en *category',
    'movimientos de *category',
    'balance en la fecha fecha *period',
'cuál es la ciudad con más movimientos']
/*#######################################################*/

/* ##################### Annyang variales ####################### */

var pager = 0;
var numTrans = 0;
function moreTransactions() {
    var url = Routing.generate('transaction_default_get_user_transactions', {"num" : parseInt(numTrans),"pager": parseInt(pager)});
    console.log(url);
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var $headerRow = $("#result table tbody tr:first-child");
            var $result = $('#result table tbody tr');
            var j = 0;
            $result.each(function() {
                if (j != 0){
                     speechSynth("Movimiento número: " + (j) );
                    for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                             var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( decodeDate(date) );
                        } else {
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            speechSynth($(this).find('td:nth-child(' + i + ')').text());
                        }
                        
                    }
                    var money = parseFloat( $(this).find('td:nth-child(' + 3 + ')').text() );
                    if (parseFloat( money ) >= 0){
                        speechSynth("Ingreso de: " + Math.abs(money) + "euros");
                    } else if(money == 0) { speechSynth("No has gastado nada en: " + category); } 
                    
                    else {
                        speechSynth("Gasto de: " + Math.abs(money) + "euros" );
                    }
                }
                j++;
            });
            speechSynth("Quieres más Transacciones?");
        }
    });
    //addCommand(moreOrNot);

}

/*#######################################################*/

/* ######## Command Function and Methods ########*/


var com1 = {
    'Saluda': greet
};

var greet = function () {
    var index = Math.floor((Math.random() * greetings.length));
    speechSynth(greetings[index]);
};


 /*Functions and commands for question 3*/

 /*Functions and commands for question 3*/
var com3 = {
    'gastado en *category en la fecha *period': catSpend
};

var catSpend = function (category,period) {

    var dataParsed = chrono.parse(period);
    if(dataParsed.length > 0){
         /*Pass parameters to back-end*/
        var dates = parseDate(dataParsed[0]);
        console.log(dates);
        var url = Routing.generate('transaction_default_spent_category_date', 
            {"category" : category.toUpperCase().replace(' ','-'),"day": parseInt(dates[0][0]), "month": parseInt(dates[0][1]), "year": parseInt(dates[0][2]) });
        
        $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var text = $("#text").text();
            var spent = parseFloat($("#spent").text());
            if (parseFloat( spent ) >= 0){
                        speechSynth("Ingreso de: " + Math.abs(spent) + "euros");
            }
            else if(spent == 0) { speechSynth("No has gastado nada en: " + category); }       
            else { speechSynth("Gasto de: " + Math.abs(spent) + "euros" ); }
        }

        });
    }
    else speechSynth('Periodo de tiempo incorrecto');
};

var com3transactions = {
    'transacciones de *category fecha *period' : catTransactions
}

var catTransactions = function(category,period){
    var dataParsed = chrono.parse(period);
    if(dataParsed.length > 0){
        var dates = parseDate(dataParsed[0]);
         var url = Routing.generate('transaction_default_get_user_transactions_category_date', 
            {"category" : category.toUpperCase().replace(' ','-'),"day": parseInt(dates[0][0]),
            "month": parseInt(dates[0][1]), "year": parseInt(dates[0][2]) });
         $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var $headerRow = $("#result table tbody tr:first-child");
            var $result = $('#result table tbody tr');
            var j = 0;
            $result.each(function() {
                if (j != 0){
                     speechSynth("Movimiento número: " + (j) );
                    for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( decodeDate(date) );
                        } else {
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            speechSynth($(this).find('td:nth-child(' + i + ')').text());
                        }
                        
                    }
                    var money = parseFloat( $(this).find('td:nth-child(' + 3 + ')').text() );
                    if (parseFloat( money ) >= 0){
                        speechSynth("Ingreso de: " + Math.abs(money) + "euros");
                    } else if(money == 0) { speechSynth("No has gastado nada en: " + category); } 
                    
                    else {
                        speechSynth("Gasto de: " + Math.abs(money) + "euros" );
                    }
                }
                j++;
            });
        }
    });
    } 
    else speechSynth('Periodo de tiempo incorrecto');
}

/*Functions and commands for question 4*/

var com4 = {
    'gastado en *category' : spentCat
};

var spentCat = function (category) {
     var url = Routing.generate('transaction_default_spent_incategory', {"category" : category.toUpperCase().replace(' ','-')});
     $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var money = parseFloat( $("#spent").text()  );
             if (parseFloat( money ) > 0){
                speechSynth("Ingreso de: " + Math.abs(money) + "euros");
             } 
             else if(money == 0) { speechSynth("No has gastado nada en: " + category); }
             else {
                speechSynth("Gasto de: " + Math.abs(money) + "euros" );
             }

        }
    });
};

var com4transactions = {
    'movimientos de *category': transactionsCat
}

var transactionsCat = function(category) {
     var url = Routing.generate('transaction_default_get_user_transactions_category', {"category" : category.toUpperCase().replace(' ','-')});
      console.log(url);
       $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var $headerRow = $("#result table tbody tr:first-child");
            var $result = $('#result table tbody tr');
            var j = 0;
            $result.each(function() {
                if (j != 0){
                     speechSynth("Movimiento número: " + (j) );
                    for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( decodeDate(date) );
                        } else {
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            speechSynth($(this).find('td:nth-child(' + i + ')').text());
                        }
                        
                    }
                    var money = parseFloat( $(this).find('td:nth-child(' + 3 + ')').text() );
                    if (parseFloat( money ) >= 0){
                        speechSynth("Ingreso de: " + Math.abs(money) + "euros");
                    } else if(money == 0) { speechSynth("No has gastado nada en: " + category); } 
                    
                    else {
                        speechSynth("Gasto de: " + Math.abs(money) + "euros" );
                    }
                }
                j++;
            });
        }
    });
}


var comSpentDate = {
    'balance en la fecha *period': spentDateMethod
}

var spentDateMethod = function(period){
     
    var dataParsed = chrono.parse(period);
    if(dataParsed.length > 0){
        
        var dates = parseDate(dataParsed[0]);
        var url = Routing.generate('transaction_default_spent_ondate',
                  {"day" : dates[0][0], "month": dates[0][1], "year": dates[0][2]});
        $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var text = $("#text").text();
            var spent = parseFloat($("#spent").text());
            if (parseFloat( spent ) >= 0){
                        speechSynth("Ingreso de: " + Math.abs(spent) + "euros");
            }
            else if(spent == 0) { speechSynth("No has gastado nada en: " + category); }       
            else { speechSynth("Gasto de: " + Math.abs(spent) + "euros" ); }
        }

        });
    } else { speechSynth("Periodo de tiempo incorrecto!"); }
}

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
    'últimas :num transacciones'  : myTransactions
};


var myTransactions = function(num) {
    if(isNaN(num)){
        if(num == "dos") num = 2;
        else if(num == "tres") num = 3;
    }
    var url = Routing.generate('transaction_default_get_user_transactions', {"num" : parseInt(num),"pager": parseInt(pager)});
    console.log(url);
    numTrans = parseInt(num);
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var $headerRow = $("#result table tbody tr:first-child");
            var $result = $('#result table tbody tr');
            var j = 0;
            $result.each(function() {
                if (j != 0){
                     speechSynth("Movimiento número: " + (j) );
                   for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( decodeDate(date) );
                        } else {
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            speechSynth($(this).find('td:nth-child(' + i + ')').text());
                        }
                        
                    }
                    //speechSynth($headerRow.find('th:nth-child(' + 3 + ')').text());
                    var money = parseFloat( $(this).find('td:nth-child(' + 3 + ')').text() );
                    if (parseFloat( money ) >= 0){
                        speechSynth("Ingreso de: " + Math.abs(money) + "euros");
                    } else {
                        speechSynth("Gasto de: " + Math.abs(money) + "euros" );
                    }


                }
                j++;
            });
            speechSynth("¿Quieres mas Transacciones?");
            var moreTrans = function () {
                ++pager;
                moreTransactions();
            }
            var noMoreTrans = function () {
                pager = 0;
                annyang.removeCommands(['sí','claro','no']);
                speechSynth('Espero que te haya servido la respuesta!');
            }
            annyang.addCommands(
                {'sí': moreTrans,
                    'claro': moreTrans,
                    'no': noMoreTrans
                }
            );
        }
    });
   
}

var com10unique = {
    'última transacción': myTransaction
};

var myTransaction = function() {
     var url = Routing.generate('transaction_default_get_user_transactions', {"num" : parseInt(1),"pager": parseInt(pager)});
    console.log(url);
    numTrans = parseInt(1);
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var $headerRow = $("#result table tbody tr:first-child");
            var $result = $('#result table tbody tr');
            var j = 0;
            $result.each(function() {
                if (j != 0){
                   for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( decodeDate(date) );
                        } else {
                            speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            speechSynth($(this).find('td:nth-child(' + i + ')').text());
                        }
                        
                    }

                    //speechSynth($headerRow.find('th:nth-child(' + 3 + ')').text());
                    var money = parseFloat( $(this).find('td:nth-child(' + 3 + ')').text() );
                    if (parseFloat( money ) >= 0){
                        speechSynth("Ingreso de: " + Math.abs(money) + "euros");
                    } else {
                        speechSynth("Gasto de: " + Math.abs(money) + "euros" );
                    }

                }
                j++;

            });
            speechSynth("¿Quieres mas Transacciones?");
            annyang.addCommands(moreOrNot);
            //console.log('hola');
        }
    });
}
var moreOrNot = {
    ':res por favor': moreOrNotMethod
}

var moreOrNotMethod = function(res){
    if (res == 'sí') {
        ++pager;
        moreTransactions();

    } else if (res == 'no') {
        pager = 0;
        numTrans = 0;
        annyang.removeCommands(moreOrNot);
    }
}



/*Description of commands*/
var comDesc = {
    0: 'Debes decir: hola',
    2: 'Debes decir: gastado en, seguido de la categoría deseada y el periodo de tiempo deseado.',
    3: 'Debes decir: categoria mas dinero en, seguido del més del periodo de tiempo deseado',
    4: 'Debes decir: mejor, seguido de la categoría deseada y periodo de tiempodeseado.',
    5: 'Debes decir: compara gastos, seguio de la categoría deseada, seguido del periodo de tiempo',
    6: 'Debes decir: ciudad mas veces, seguido del periodo de tiempo',
    7: 'Debes decir: refresca',
    8: 'Debes decir: comando, seguido del número de comando deseado',
    9: 'Debes decir: mis transacciones',
    10: 'Debes decir: última transacción'
};


var mostVisitedCity = function () {
    var url = Routing.generate('city_most_visited');
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var city = $("#city").text().toLowerCase();
            var times = $('#times').text();
            speechSynth("En " + city + " has realizado " +
                times + " movimientos");
        }
    });
}


/* ######################################################################*/


/* ######## Synth methods ################################################*/

function speechSynth(text) {

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.onstart = function (event) {
        annyang.abort();
        annyangStopped = 1;
    }
    synth.speak(utterance);
}

function startSpeechSynth(text) {
    var synth2 = window.speechSynthesis;
    var utterance2 = new SpeechSynthesisUtterance(text);
    utterance2.lang = 'es-ES';
    synth2.speak(utterance2);
}
function speechCommand(text){
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    synth.speak(utterance);
    synth.speak('¿Algo mas?');
}
/* ######################################################################*/


/* ######## Algorithms and methods ########################################*/

/*  Date parser
* Returns an array of one or two dates meaning start time and end time
* If there is no second date we will assume that user wants from start date to now
*/

function decodeDate(date) {
    console.log(date);
    var dictMonth = {
        'Jan': 'enero',
        'Feb':'febrero',
        'Mar': 'marzo',
        'Apr': 'abril',
        'May': 'mayo',
        'Jun': 'junio',
        'Jul': 'julio',
        'Aug': 'agosto',
        'Sep': 'septiembre',
        'Oct': 'octubre',
        'Nov': 'noviembre',
        'Dec': 'diciembre'
    }
    var aux = date.split('-');
    var day = parseInt(aux[0]);
    var month =  dictMonth[ aux[1] ];
    var year = parseInt(aux[2]);
    return day + ' de ' + month + ' de ' + year;
}

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
    for( var i = 0; i < arrayForDiff.length; i++){
        var distance = LevenshteinDistance(user[0],arrayForDiff[i]);
       
        if (distance < min ){
            min = distance;
            imin = i;
        }
    }
    if (min <= th) return imin + 1;
    else return -1;
}


function timeConverter(date){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var spanishMonths = ['enero','febrero','marzo','abril','mayo','junio','julio',
  'agosto','septiembre','noviembre','diciembre'];
  var day = date.getDate();
  var time = day + 'de ' +' ' + spanishMonths[month] + ' ' + 'de ' + year;
  return time;
}

/* ######################################################################*/

/* ######## Init methods ################################################*/


/*Variables*/
var ready = 0;
var annyangStopped = 0;
var pressed = 0;
var synth = window.speechSynthesis;
var greetings = [
"Sea usted bienvenido!",
"Hola, bienvenido a Foné!",
"Muy buenas!"
];

/*Descripcion of the commands that sytem has to say to the user*/

function addAnnyangCommands(){
    var commands = {
        'refresca': refresh,
        'Saluda': greet,
        'gastado en *category en la fecha *period': catSpend,
        'transacciones de *category fecha *period' : catTransactions,
        'gastado en *category' : spentCat,
        'movimientos de *category': transactionsCat,
        'balance en la fecha *period': spentDateMethod,
        'última transacción': myTransaction,
        'últimas :num transacciones'  : myTransactions,
        'Cuál es la ciudad con más movimientos': mostVisitedCity
    };
    annyang.addCommands(commands);
    addFAQCommands();
}


/* Init methods */
function startAnnyang(){
    if (annyang) {
        annyang.addCallback('error',function (event) {
            console.log(event);
        });
        annyang.debug();
        annyang.setLanguage('es-ES');
        addAnnyangCommands();
        annyang.start({autoRestart: true, continuous: false});

        annyang.addCallback('resultNoMatch', function (userSaid, commandText, phrases) {
            var diff = minimumCommandDifference(userSaid, 6);
            if (diff === -1) speechSynth("No hemos encontrado ningún comando parecido a tu consulta." +
                "Puedes pulsar la tecla: cu para saber cómo formular las preguntas: o bien puedes pulsar la tecla hache para informarte" +
                "sobre como funciona la aplicación.");
            else speechSynth('Quizás te refieres al comando: ' + diff);

        });
    }
}


$(window).bind('beforeunload',function(){

     //save info somewhere
     synth.cancel();

});

$(document).ready(function() {
    var index = Math.floor((Math.random() * greetings.length));
    var welcome = greetings[index];
    startAnnyang();
    speechSynth(welcome);

    $("body").keypress(function (e) {
        var code = e.keyCode || e.which;
        console.log(e);
        if (code == 97) { //Enter keycode
            //Do something
            synth.cancel();
        }

        if (code == 113) {
            speechSynth("Las preguntas más frecuentes són: ");
            for (var i = 0; i < Object.keys(faq).length; ++i) {
                speechSynth(Object.keys(faq)[i]);
            }
        }

        if(code == 13){
            var audio = new Audio('/bundles/mainpage/audio/audio.mp3');
            audio.play();
            synth.cancel();
            annyang.resume();
        }
    });
});


/* ######################################################################*/
