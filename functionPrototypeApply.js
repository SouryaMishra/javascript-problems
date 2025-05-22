Function.prototype.myapply = function (thisArg, args) {
  // undefined and null should be replaced with global object
  thisArg = thisArg ?? globalThis;
  // Primitive values should be transformed to object
  thisArg = Object(thisArg);
  // Create a unique temporary key with Symbol(). Symbols are always unique and can be keys of an object
  const tempKey = Symbol("temp-key");
  thisArg[tempKey] = this;
  const result = thisArg[tempKey](...args);
  // Delete the temporary key
  delete thisArg[tempKey];
  return result;
};

const john = {
  firstName: "John",
  lastName: "Doe",
};

const peter = {
  firstName: "Peter",
  lastName: "Parker",
};

function getFullName(prefix, suffix) {
  return prefix + " " + this.firstName + " " + this.lastName + " " + suffix;
}

console.log(getFullName.myapply(john, ["Mr.", "Jr."]));
console.log(getFullName.myapply(peter, ["Mr.", "II"]));
