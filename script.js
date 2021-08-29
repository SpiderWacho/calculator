function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a , b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


function operate(a, sign, b) {
    if (sign === "+") {
        return add(a, b);
    }
    else if (sign === "-") {
        return substract(a, b);
    }
    if (sign === "*") {
        return multiply(a, b);
    }   
    if (sign === "/") {
        if (b === 0) {
            return "Can't divide by 0!"
        }
        return Math.round((divide(a, b) + Number.EPSILON) * 100) / 100;
    }
}

let firstNum = "";
let operator = "";
let secondNum = "";
let operation = false;
let display = document.querySelector("#result");
let calculation = document.querySelector("#calculation");
const btns = document.querySelectorAll("button");
btns.forEach(btn => btn.addEventListener("click", function writeDisplay(e){
    if (e.target.textContent == "Clear") {
        display.textContent = "";
        calculation.textContent = "";
        firstNum = "";
        operator = "";
        secondNum = "";
        operation = false;
    }
    if (e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "*" || e.target.textContent === "/") {
        if (operator === "") {
            calculation.textContent = firstNum + e.target.textContent;
            operator = e.target.textContent;
            operation = true;
        }
        else {
            if (secondNum == "") {
                const editedText = calculation.textContent.slice(0, -1)
                calculation.textContent = editedText;
                operator = e.target.textContent;
                calculation.textContent = firstNum + e.target.textContent;
            }
            else {
                firstNum = operate(parseInt(firstNum), operator, parseInt(secondNum));
                if (isNaN(firstNum)) {
                    display.textContent = "";
                    calculation.textContent = "";
                    firstNum = "";
                    operator = "";
                    secondNum = "";
                    operation = false;
                }
                else {
                display.textContent = firstNum;
                operator = e.target.textContent;
                calculation.textContent = firstNum + operator;
                secondNum = "";
                }
            }
        }
    }
    else if (e.target.textContent === "=") {
        if (secondNum != "") {
            display.textContent = operate(parseInt(firstNum), operator, parseInt(secondNum));
            calculation.textContent = "";
        }
    }
    else if (!isNaN(e.target.textContent)) {
        if (operation === true) {
            
            secondNum += e.target.textContent;
            display.textContent = secondNum;
        }
        else {
            firstNum += e.target.textContent;
            display.textContent += e.target.textContent;
        }
    }

    console.log(firstNum)
    console.log(operator)
    console.log(secondNum)
}));