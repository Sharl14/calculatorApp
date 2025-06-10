// Calculator logic for calculator.html
let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// This function is called when a number button is clicked
function appendToDisplay(num) {
  const inputBox = document.getElementById("inputBox");
  if (waitingForSecondOperand) {
    currentInput = num;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === "0" ? num : currentInput + num;
  }
  inputBox.value = currentInput;
}

// This function is called when an operator button is clicked
function setOperation(op) {
  if (operator && waitingForSecondOperand) {
    operator = op;
    return;
  }
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    const result = performCalculation(
      operator,
      firstOperand,
      parseFloat(currentInput)
    );
    currentInput = String(result);
    firstOperand = result;
    document.getElementById("inputBox").value = currentInput;
  }
  operator = op;
  waitingForSecondOperand = true;
}

// This function performs the actual calculation based on the operator
function performCalculation(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return b;
  }
}

// This function calculates the result when the equals button is clicked
function calculateResult() {
  if (operator && !waitingForSecondOperand) {
    const result = performCalculation(
      operator,
      firstOperand,
      parseFloat(currentInput)
    );
    document.getElementById("inputBox").value = result;
    currentInput = String(result);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
  }
}

// This function clears the display and resets the calculator state
function clearDisplay() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  document.getElementById("inputBox").value = currentInput;
}
