"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CalculationService = /** @class */ (function () {
    function CalculationService() {
    }
    /* Create random number */
    CalculationService.createRandomNumber = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    /* Calculation of the number */
    CalculationService.calculatedDivisibleNumber = function (number, selectedNumber) {
        var numbers = [selectedNumber, number];
        var sumValues = function (numberArry) {
            return numberArry.reduce(function (a, b) { return (a + b) / 3; });
        };
        var summedNumbers = sumValues(numbers);
        var calculatedNumber = summedNumbers;
        console.log("divido", calculatedNumber);
        if (CalculationService.isDivisible(calculatedNumber)) {
            console.log("calculated", calculatedNumber);
            return calculatedNumber;
        }
        return number;
    };
    /* Check if the number is 0 on mod 3 */
    CalculationService.divisibilityRule = function (currentNumber) {
        var divis = currentNumber % 3;
        console.log("Divis", divis);
        return divis;
    };
    CalculationService.isDivisible = function (currentNumber) {
        if (CalculationService.divisibilityRule(currentNumber) == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return CalculationService;
}());
exports.default = CalculationService;
