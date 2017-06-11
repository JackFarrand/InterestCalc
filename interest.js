
//Mobile Javascript Interest Payment Calculator
var loan;
var term;
var rate;
var type;
var output;
var calculatedPayment;

function alertClick(sender) {

    //for debug use only
    alert("Suitable for use with Chrome, Safari, Firefox & IE9+");

}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function getMonthlyPayment(apr, loanSize, term, isInterestOnly) {
    var payment;
    var monthly_interest = apr / 1200;

    if (!isInterestOnly) {
        payment = loanSize * ((monthly_interest * Math.pow((monthly_interest + 1.0), term)) / (Math.pow((monthly_interest + 1.0), term) - 1));

    }
    else {
        payment = loanSize * monthly_interest;
    }

    return payment;
}
//loansize is number of whole currency, APR is the annual percentage rate, term is term in months, is interest only should be a boolean indicating if the loan is to be repaid or if the payments made should just be to cover the interest.


function updatePaymentSchedule() {
    //******************************************************//
    var table = document.getElementById('scheduleTable');


    if (table.hasChildNodes()) {
        while (table.childNodes.length > 2 && table.lastChild !== 0) {
            table.removeChild(table.lastChild);
            //removes every value that isn't the top two rows, i.e. the headers.
        }
    }

    for (var i = 0; i <= (term.value); i++) {
        var rowElement = document.createElement("tr");
        if (i % 2 === 0) rowElement.className = "evenRow";
        else rowElement.className = "oddRow";

        table.appendChild(rowElement);

        var cellElement1 = document.createElement("td");
        var cellElement2 = document.createElement("td");
        var cellElement3 = document.createElement("td");
        var cellElement4 = document.createElement("td");

        
        var monthlyInterest = rate.value / 1200;

        //B_n = A(1+i)^n − (P/i)[(1+i)^n − 1]
        var currentBalance = (loan.value * Math.pow(1 + monthlyInterest, i)) - ((calculatedPayment / monthlyInterest) * (Math.pow((1 + monthlyInterest), i) - 1));

        cellElement1.innerHTML = "" + (i); //month number
        cellElement2.innerHTML = addCommas("£" + (currentBalance * monthlyInterest).toFixed(2));
        cellElement3.innerHTML = addCommas("£" + currentBalance.toFixed(2));
        cellElement4.innerHTML = addCommas("£" + (calculatedPayment * i).toFixed(2));



        rowElement.appendChild(cellElement1);
        rowElement.appendChild(cellElement2);
        rowElement.appendChild(cellElement3);
        rowElement.appendChild(cellElement4);

    }
}



function calculate() {

    calculatedPayment = getMonthlyPayment(rate.value, loan.value, term.value, (type.value === "Interest-Only")).toFixed(2);

    output.innerHTML = addCommas("Monthly Payment:  <br /> £" + calculatedPayment);

    updatePaymentSchedule();

    localStorage.loan = loan.value;
    localStorage.term = term.value;
    localStorage.rate = rate.value;
    localStorage.type = type.value;
}



window.onload = function() {
    loan = document.getElementById("loanAmnt");
    term = document.getElementById("term");
    rate = document.getElementById("rate");
    type = document.getElementById("type");

    loan.value = localStorage.loan || 100000;
    term.value = localStorage.term || 120;
    rate.value = localStorage.rate || 3.99;
    type.value = localStorage.type || "Repayment";

    output = document.getElementById("output");

    /* alert("loan: "+ loan.value + " Term: " + term.value + " Rate: " + rate.value + " type: " + type.value);*/

    calculate();

};

function showHideTable() {
    var table = document.getElementById("scheduleTable");
    var tableContainer = document.getElementById("tableContainer");
    var text = document.getElementById("buttonText");
    var img1 = document.getElementById("tableButtonImg1");
    var img2 = document.getElementById("tableButtonImg2");

    if (table.className === "hidden") {
        table.className = "shown";
        tableContainer.className = "tableGradient";
        text.innerHTML = 'Hide Payment Schedule';
        img1.className = "up";
        img2.className = "up";
    }
    else {
        table.className = "hidden";
        tableContainer.className = "hidden";
        text.innerHTML = 'Show Payment Schedule';
        img1.className = "down";
        img2.className = "down";
    }



}

