/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function multiply(a, b) {
  if (a === "0" || b === "0") return "0";

  let isNegative = false;
  let numA = a;
  let numB = b;

  if (a[0] === "-" || b[0] === "-") isNegative = true;
  if (a[0] === "-" && b[0] === "-") isNegative = false;

  if (a[0] === "-") numA = numA.slice(1);
  if (b[0] === "-") numB = numB.slice(1);

  let result = new Array(numA.length + numB.length).fill(0);

  for (let i = numA.length - 1; i >= 0; i--) {
    for (let j = numB.length - 1; j >= 0; j--) {
      const m = i + j + 1;
      const s = Number(numA[i]) * Number(numB[j]) + result[m];
      result[m] = s % 10;
      result[m - 1] += Math.floor(s / 10);
    }
  }

  while (result[0] === 0) {
    result.shift();
  }

  return isNegative ? "-" + result.join("") : result.join("");
}
