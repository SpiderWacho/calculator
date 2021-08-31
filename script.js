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
let writeSecond = false;
let result = false;

const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", function deleteNumber() {
    if (display.textContent.slice(-1) === ".") {
    };
    if (operation === true && writeSecond === true) {
        display.textContent = display.textContent.slice(0, -1);
        secondNum =  display.textContent;
    }
    else {
        if (display.textContent.slice(-1) === ".") {
        };
        display.textContent = display.textContent.slice(0, -1);
        firstNum =  display.textContent;
        
    }
})

const btns = document.querySelectorAll("button");
btns.forEach(btn => btn.addEventListener("click", writeDisplay));

function writeDisplay(e){
    if (display.textContent ==  "Can't divide by 0!")
    {
        display.textContent = "";
        calculation.textContent = "";
        firstNum = "";
        operator = "";
        secondNum = "";
        operation = false;
    }
    if (e.target.textContent == "Clear") {
        display.textContent = "";
        calculation.textContent = "";
        firstNum = "";
        operator = "";
        secondNum = "";
        operation = false;
    }
    if (e.target.textContent === ".") {
        if (!display.textContent.includes(".")) {
            if (operation === true) {
                secondNum += e.target.textContent;
                display.textContent = secondNum;
            }
            else {
                display.textContent += e.target.textContent;
                firstNum = display.textContent;
            }
        }
    }
    if (e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "*" || e.target.textContent === "/") {
        if (firstNum !== "") {
            if (operator === "") {
                calculation.textContent = firstNum + e.target.textContent;
                operator = e.target.textContent;
                operation = true;
                display.textContent = "";
    
            }
            else {
                if (secondNum == "") {
                    calculation.textContent = calculation.textContent.slice(0, -1);
                    operator = e.target.textContent;
                    calculation.textContent = firstNum + e.target.textContent;                    
                }
                else {
                    display.textContent = operate(parseFloat(firstNum), operator, parseFloat(secondNum));
                    result = true;
        
                    operator = e.target.textContent;
                    calculation.textContent = firstNum + operator;
                    firstNum = display.textContent;
                    secondNum = "";
                    calculation.textContent = firstNum + operator;                    
                }
            }
        }
    }
    else if (e.target.textContent === "=") {
        if (secondNum != "") {
            display.textContent = operate(parseFloat(firstNum), operator, parseFloat(secondNum));
            result = true;

            operator = "";
            firstNum = display.textContent;
            calculation.textContent = "";
            secondNum = "";
            operation = false;
        }
    }
    else if (!isNaN(e.target.textContent)) {
        if (operation === true) {
            if (result == false) {
                writeSecond = true;            
                secondNum += e.target.textContent;
                display.textContent = secondNum;
            }
            else {
                secondNum = "";
                result = false;
                secondNum += e.target.textContent;
                display.textContent = secondNum;
            }
        }
        else {   
            display.textContent += e.target.textContent;
            firstNum = display.textContent;
        }
    }

    if (e.target.textContent === "Delete") {
        if (!writeSecond) {
        firstNum = display.textContent;
        }
        else {
            secondNum = display.textContent;
        }
    }
};

