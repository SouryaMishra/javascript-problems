
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function subtract(num1, num2) {
  // your code here
  const array1 = num1.split("").reverse();
  const array2 = num2.split("").reverse();
  let result = [];
  let carry = 0;

  for(let i = 0; i < array1.length; i++) {
    let n1 = parseInt(array1[i]) + carry;
    let n2 = parseInt(array2[i] || 0);
    const subtraction = n1 < n2 ? n1 + 10 - n2 : n1 - n2;
    carry = n1 < n2 ? -1 : 0
    result.unshift(subtraction);
  }
  
  // Remove all leading 0's from result
  while(result[0] === 0 && result.length > 1){
    result.shift(); 
  }
  
  return result.join("");
}

console.log(subtract('12345678912345678', '9876501263826299'))
