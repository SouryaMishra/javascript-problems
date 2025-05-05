/**
 * Read FAQs section on the left for more information on how to use the editor
 * 
 * In this question, the candidate needs to implement a function customIsArray that mimics the behaviour of Array.isArray method.

More about Array.isArray

The Array.isArray() static method determines whether the passed value is an Array.
**/
// DO CHANGE FUNCTION NAME
function customIsArray(value) {
  if (value == null) return false;
  return value === Array.prototype || Object.getPrototypeOf(value) === Array.prototype
  // write your code below
}