document.addEventListener('keydown', function(event) {
    let key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate()
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        removeLastCharacter();
    }
});

const removeLastCharacter = () => {
    let currentValue = display.value;
    display.value = currentValue.slice(0, -1);
};

let calculatedWithEqual = false;
const display = document.getElementById("display");

const appendToDisplay = (input) => {
    if (calculatedWithEqual) {
        display.value = input;
        calculatedWithEqual = false;
    } else if (display.value === "0" || display.value === "Error") {
        display.value = input;
    } else {
        display.value += input;
    }
};

const clearDisplay = () => {
    display.value = "0";
    calculatedWithEqual = false;
}

const toRadians = (degrees) => degrees * (Math.PI / 180);

const calculate = () => {
    try {
        let expression = display.value; 
        let result = expression; 

        result = result.replace(/sin\(([^)]+)\)/g, (match, degrees) => {
            return Math.sin(toRadians(parseFloat(degrees))).toFixed(1);
        });
        result = result.replace(/cos\(([^)]+)\)/g, (match, degrees) => {
            return Math.cos(toRadians(parseFloat(degrees))).toFixed(1);
        });
        result = result.replace(/tan\(([^)]+)\)/g, (match, degrees) => {
            return Math.tan(toRadians(parseFloat(degrees))).toFixed(1);
        });

        result = result.replace(/log\(([^)]+)\)/g, (match, num) => {
            return Math.log10(parseFloat(num)).toFixed(2);
        });
        result = result.replace(/ln\(([^)]+)\)/g, (match, num) => {
            return Math.log(parseFloat(num)).toFixed(2);
        });

        result = result.replace(/sqrt\(([^)]+)\)/g, (match, num) => {
            return Math.sqrt(parseFloat(num)).toFixed(2);
        });

        display.value = eval(expression); 
        calculatedWithEqual = true;
    } catch (error) {
        display.value = "Error";
    }
};
