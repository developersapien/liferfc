class CalculationService {
  /* Create random number */
  static createRandomNumber = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /* Calculation of the number */
  static calculatedDivisibleNumber = (
    number: number,
    selectedNumber: number
  ) => {
    const numbers = [selectedNumber, number];
    const sumValues = (numberArry): number => {
      return numberArry.reduce((a: number, b: number) => (a + b) / 3);
    };
    const summedNumbers = sumValues(numbers);
    const calculatedNumber = summedNumbers;
    console.log("divido", calculatedNumber);
    if (CalculationService.isDivisible(calculatedNumber)) {
      console.log("calculated", calculatedNumber);
      return calculatedNumber;
    }
    return number;
  };

  /* Check if the number is 0 on mod 3 */
  static divisibilityRule = (currentNumber: number): number => {
    const divis = currentNumber % 3;
    console.log("Divis", divis);
    return divis;
  };

  static isDivisible = (currentNumber: number): boolean => {
    if (CalculationService.divisibilityRule(currentNumber) == 0) {
      return true;
    } else {
      return false;
    }
  };
}

export default CalculationService;
