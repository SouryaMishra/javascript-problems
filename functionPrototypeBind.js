Function.prototype.mybind = function (thisArg, ...args) {
  // undefined and null should be replaced with global object
  thisArg = thisArg ?? globalThis;
  // Primitive values should be transformed to object
  thisArg = Object(thisArg);
  return (...newArgs) => {
    // args will come before newArgs
    return this.call(thisArg, ...args, ...newArgs);
  };
};

const john = {
  firstName: "John",
  lastName: "Doe",
};

const peter = {
  firstName: "Peter",
  lastName: "Parker",
};

function getFullName(prefix, ...rest) {
  return prefix + " " + this.firstName + " " + this.lastName + " " + rest.join("");
}

console.log(getFullName.mybind(john, "Mr.")("Jr."));
console.log(getFullName.mybind(peter, "Mr.")("II"));
