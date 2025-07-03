// We'd like you to write a calculator to perform basic arithmetic, but using an alternative syntax for writing the expressions.

// In this alternative notation, the operators precede the operands. For example while in traditional notation we might write
// , instead we would write

// .

// The main advantage of this format is that it does not require parentheses for any ambiguous expression.

// Traditional notation 	Alternative notation
// 3 + 4 	                 + 3 4
// 3 - (4 * 5) 	             - 3 * 4 5
// (3 + 4) * 5 	             * + 3 4 5
// (3 - 4) / (5 + 2) 	     / - 3 4 + 5 2

const calculate = function (expression) {
  const arr = expression.split(" ");
  const stack = [];
  const operators = ["+", "-", "*", "/"];

  for (let i = arr.length - 1; i >= 0; i--) {
    const char = arr[i];
    if (operators.includes(char)) {
      const num1 = parseInt(stack.pop());
      const num2 = parseInt(stack.pop());

      let result;

      switch (char) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
        default:
          break;
      }

      stack.push(result);
    } else stack.push(char);
  }

  return stack.pop();
};
