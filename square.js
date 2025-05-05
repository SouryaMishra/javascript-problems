function square() {
  // write your solution below
  // Assuming that all elements in the array are valid numbers
  let result = [];
  for (const value of this) {
    if (Number.isNaN(value) || value === Infinity) result.push(value)
    else {
      const squaredValue = value * value;
      result.push(Number.isInteger(squaredValue) ? squaredValue : Number(squaredValue.toFixed(2)));
    }
  }
  return result;
};

Array.prototype.square = square;
console.log([0.1, -0.5, 1.1].square())
console.log([1.5, 2.5, -3.5].square())