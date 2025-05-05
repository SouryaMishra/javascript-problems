/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  let array1 = num1.split("").reverse();
  let array2 = num2.split("").reverse();
  const maxLength = Math.max(array1.length, array2.length)
  const result = []
  
  let carry = 0;

  for(let i = 0 ; i < maxLength ; i++) {
    const sum = parseInt(array1[i] || 0) + parseInt(array2[i] || 0) + carry;
    carry = Math.floor(sum / 10);
    result.unshift(i === maxLength - 1 ? sum : sum % 10);
  }

  return result.join("");
}

console.log(add("999999999999999999999", "1"));