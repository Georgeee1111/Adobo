const display = document.getElementById("display");

const appendToDisplay = (input) => display.value += input;

const clearDisplay = () => display.value = "";

const calculate = () => {
    try {
        const result = evaluateExpression(display.value);
        display.value = result;
    } catch (error) {
        display.value = "Error: " + error.message;
    }
}

const evaluateExpression = (expression) => {
    const validExpressionRegex = /^[\d\s()+\-*/.]+$/;

    if (!validExpressionRegex.test(expression)) {
        throw new Error("Invalid expression");
    }

    const safeEval = new Function('return ' + expression);
    const result = safeEval();

    if (!isFinite(result)) {
        throw new Error("Result is not a finite number");
    }

    return result;
}
