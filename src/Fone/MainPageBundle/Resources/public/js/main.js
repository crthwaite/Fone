/* ##################### FAQ ####################### */

/*Questions */

var faq = {
    "como saber que preguntas puedo hacer": "puedes saber que preguntas hacer diciendo: que preguntas puedo hacer",
    "como reiniciar la aplicación": "para reiniciar la aplicación, puedes hacerlo diciendo: refresca",
    'como cancelar la respuesta': 'puedes parar la respuesta pulsando la tecla: a',
    'como puedo preguntar': 'para preguntar pulsa la tecla enter, después el sistema te permitirà hacer una pregunta'

}
/*Commands for questions*/
function addFAQCommands() {
    var FAQcommands = {
        "cómo saber que preguntas puedo hacer" : whatQuestionsMethod,
        'cómo reiniciar la aplicación': howResetMethod,
        'cómo cancelar la respuesta': howToStop,
        'cómo puedo preguntar': howToQuery
    };
    annyang.addCommands(FAQcommands);
}

var howToQuery = function () {
    speechSynth(faq[ 'cómo puedo preguntar']);
}
var howToStop = function () {
    speechSynth(faq['cómo cancelar la respuesta']);
}
var comWhatQuestions = {
    'que preguntas puedo hacer' : whatQuestionsMethod
}
var whatQuestionsMethod = function () {
    speechSynth(faq[ "cómo saber que preguntas puedo hacer"]);
};
var comHowReset = {
    'cómo reiniciar la aplicación': howResetMethod
};
var howResetMethod = function () {
    speechSynth(faq["como reiniciar la aplicación"]);
};

/*Disponible questions commands*/

var comDisponibleQuestions = {
    'que preguntas puedo hacer': disponibleQuestionsMethod
};

var exampleCommands = [
    'gastado en ROPA el 1 de enero de 2015',
    'movimientos en ROPA el 1 de enero de 2015' ,
    'gastado en ROPA' ,
    'movimientos en ROPA',
    'gastado el 1 de enero de 2015',
    'último movimiento',
    'últimos 5 movimientos' ,
    'ciudad con más movimientos',
    'Ayuda',
    'refresca',
    'Saluda'
];

var disponibleQuestionsMethod = function () {
    speechSynth("Ejemplos de preguntas");
    for(var i = 0; i < exampleCommands.length; ++i){
        speechSynth(exampleCommands[i]);
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
    //console.log(url);
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var $headerRow = $("#result table tbody tr:first-child");
            var $result = $('#result table tbody tr');
            var j = 0;
            $result.each(function() {
                if (j != 0){
                     speechSynth("Movimiento número " + (numTrans + j) );
                    for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                           // speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                             var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( "realizado el: " + decodeDate(date) );
                        } else {
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
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
            numTrans += numTrans;
           askMoreQuestions();
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
        //console.log(dates);
        var url = Routing.generate('transaction_default_spent_category_date', 
            {"category" : category.toUpperCase().replace(' ','-'),"day": parseInt(dates[0][0]), "month": parseInt(dates[0][1]), "year": parseInt(dates[0][2]) });
        
        $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var text = $("#text").text();
            var spent = parseFloat($("#spent").text());
            if (parseFloat( spent ) > 0){
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
                     speechSynth("Movimiento " + (j) );
                    for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( "realizado el: " + decodeDate(date) );
                        } else {
                           // speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
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
      //console.log(url);
       $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var $headerRow = $("#result table tbody tr:first-child");
            var $result = $('#result table tbody tr');
            var j = 0;
            $result.each(function() {
                if (j != 0){
                     speechSynth("Movimiento " + (j) );
                    for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( "realizado el: " + decodeDate(date) );
                        } else {
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
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
         //console.log(dates[0]);
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
         //console.log(dates[0]);
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
      //console.log(dates[0]);
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
    //console.log(url);
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
                     speechSynth("Movimiento " + (j) );
                   for(var i = 1; i<= 2; ++i){
                        if(i == 2){
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( "realizado el: " + decodeDate(date) );
                        } else {
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
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
            askMoreQuestions();
        }
    });
   
}

var com10unique = {
    'última transacción': myTransaction
};

var myTransaction = function() {
     var url = Routing.generate('transaction_default_get_user_transactions', {"num" : parseInt(1),"pager": parseInt(pager)});
    //console.log(url);
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
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            var date = $(this).find('td:nth-child(' + i + ')').text();
                            speechSynth( "realizado el: " + decodeDate(date) );
                        } else {
                            //speechSynth($headerRow.find('th:nth-child(' + i + ')').text());
                            speechSynth($(this).find('td:nth-child(' + i + ')').text());
                        }
                        
                    }

                    //speechSynth($headerRow.find('th:nth-child(' + 3 + ')').text());
                    var money = parseFloat( $(this).find('td:nth-child(' + 3 + ')').text() );
                    if (parseFloat( money ) > 0){
                        speechSynth("Ingreso de: " + Math.abs(money) + "euros");
                    }
                    else {
                        speechSynth("Gasto de: " + Math.abs(money) + "euros" );
                    }

                }
                j++;

            });
           askMoreQuestions();
            //console.log('hola');
        }
    });
}
var moreOrNot = {
    ':res por favor': moreOrNotMethod
}

var yearMostSpent = function () {
    var url = Routing.generate("transaction_default_spent_year");
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var year = $("#year").text().toLowerCase();
            var yearSpent = $('#yearSpent').text();
            speechSynth("El año que has gastado más dinero és: " + year
            + " con un gasto total de: " + Math.abs(parseFloat(yearSpent)) + "euros");
        }
    });
}

var monthMostSpent = function () {
    var url = Routing.generate("transaction_default_spent_month");
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var dictMonth = {
                'january': 'enero',
                'february':'febrero',
                'march': 'marzo',
                'april': 'abril',
                'may': 'mayo',
                'juny': 'junio',
                'july': 'julio',
                'august': 'agosto',
                'september': 'septiembre',
                'october': 'octubre',
                'november': 'noviembre',
                'december': 'diciembre'
            }
            var month = dictMonth[$("#month").text().toLowerCase()];
            var monthSpent = $('#monthSpent').text();
            speechSynth("El mes del año que gastas más dinero és: " + month
                + " con un gasto total de: " + Math.abs(parseFloat(monthSpent)) + "euros");
        }
    });
}

var weekDayMostSpent = function () {
    var url = Routing.generate("transaction_default_spent_week_day");
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var day = dictDay( $("#day").text() );
            var daySpent = $('#daySpent').text();
            speechSynth("El dia de la semana que  gastas más dinero és: " + day
                + " con un gasto total de: " + Math.abs(parseFloat(daySpent)) + "euros");
        }
    });
}

var accountMoney = function () {
    var url = Routing.generate("user_default_amount");
    $.ajax({
        url: url,
        success: function(result) {
            $('#result').html(result);
            var money = Math.abs(parseInt($("#money").text() ));
            var aux = parseFloat($("#money").text() ) - money;
            speechSynth("Actualmente tienes: " + money + " euros en tu cuenta.");
        }
    });
}

function dictDay(day) {
    if(day == "Monday") { return "lunes"; }
    else if(day == "Tuesday") { return "martes"; }
    else if(day == "Wednesday") {return "miércoles"; }
    else if(day == "Thursday") { return "jueves"; }
    else if(day == "Friday") { return "viernes"; }
    else if(day == "Saturday") { return "sábado"; }
    else if(day == "Sunday") { return "domingo";}

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


function askMoreQuestions() {
    speechSynth("¿Quieres mas Transacciones?",true);
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
        {   'sí': moreTrans,
            'claro': moreTrans,
            'no': noMoreTrans
        }
    );
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

function speechSynth(text, resum ) {
    resum = resum || false;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.1;
    utterance.onstart = function (event) {
        annyang.abort();
        annyangStopped = 1;
    }
    if(resum){
        utterance.onend = function (event) {
            annyang.resume();
            var audio = new Audio('/bundles/mainpage/audio/audio.mp3');
            audio.play();
            annyangStopped = 0;
        }
    }
    synth.speak(utterance);
}

/* ######################################################################*/


/* ######## Algorithms and methods ########################################*/

/*  Date parser
* Returns an array of one or two dates meaning start time and end time
* If there is no second date we will assume that user wants from start date to now
*/

function decodeDate(date) {
    //console.log(date);
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
    for( var i = 0; i < exampleCommands.length; i++){
        var distance = LevenshteinDistance(user[0],exampleCommands[i]);
       
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
        'gastado en *category el *period': catSpend,
        'movimientos en *category el *period' : catTransactions,
        'gastado en *category' : spentCat,
        'movimientos en *category': transactionsCat,
        'gastado el *period': spentDateMethod,
        'último movimiento': myTransaction,
        'últimos :num movimientos'  : myTransactions,
        'ciudad con más movimientos': mostVisitedCity,
        'año con más gastos': yearMostSpent,
        'mes en el que gasto más': monthMostSpent,
        'dia de la semana que gasto más': weekDayMostSpent,
        'dinero en la cuenta': accountMoney,
        'saldo en la cuenta': accountMoney,
        'Ayuda': help
    };
    annyang.addCommands(commands);
    addFAQCommands();
}

var help = function () {
    speechSynth('Pulsa enter antes de preguntar:');
    speechSynth('Pulsa ce para silenciar la aplicación:');
    speechSynth('Pulsa cu para consultar las preguntas disponibles:');
    speechSynth('Pulsa ache para obtener ayuda.')
};

/* Init methods */
function startAnnyang(){
    if (annyang) {
        annyang.addCallback('error',function (event) {
            //console.log(event);
        });
        //annyang.debug();
        annyang.setLanguage('es-ES');
        addAnnyangCommands();
        annyang.start({autoRestart: true, continuous: false});

        annyang.addCallback('resultNoMatch', function (userSaid, commandText, phrases){
            var th = userSaid[0].length * 0.2;
            var diff = minimumCommandDifference(userSaid, th);
            if (diff === -1) {
                speechSynth("No he reconocido tu pregunta.");
                speechSynth("Pulsa cu para consultar las preguntas disponibles");
            }
            else speechSynth('Una pregunta parecida sería: ' + exampleCommands[diff]);

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
    var username = $("#username").val();
    speechSynth("Bienvenido. " + username + ".");
    speechSynth("Para preguntar: pulsa enter. y ache para consultar la ayuda.");
    $("body").keypress(function (e) {
        var code = e.keyCode || e.which;
        //console.log(e);
        if (code == 99) { //Enter keycode
            //Do something
            synth.cancel();
        }

        if (code == 113) {
            disponibleQuestionsMethod();
        }

        if(code == 104){
            help();
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
