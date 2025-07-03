function calculateWeights(formula) {
  const map = new Map();
  
  map.set("C", 12);
  map.set("O", 8);
  map.set("H", 1);
  
  // H(CH4)2
  
  const stack = [];
  let sum = 0;
  
  for(let i = 0; i < formula.length; i++) {
  	const char = formula[i];
    
    if(["C", "H", "O"].includes(char)) stack.push(map.get(char));
    else if(char === "(") stack.push("(");
    else if(!isNaN(parseInt(char))) {
       const last = stack.pop();
       stack.push(last * parseInt(char));
    }
    else if(char === ")") {
     let last = stack.pop();
      while(last !== "(") {
      	sum += last;
        last = stack.pop()
      }
      stack.push(sum)
    }
  }

  return stack.reduce((total, curr) => total + curr, 0)
}

calculateWeights("H(CH4)2")