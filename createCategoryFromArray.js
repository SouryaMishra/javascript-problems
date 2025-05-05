/**
 * Read FAQs section on the left for more information on how to use the editor
 * 
 * Arguments
1. collection (Array):
An array of objects, where each object contains the following keys:
type (string): The category of the object.
value (string): The specific value associated with the type.

Returns
Array:
A single-element array containing an object. This object should have keys corresponding to unique type values, with each key's value being an array of objects that belong to that type.
**/
// DO NOT CHANGE FUNCTION NAME
function groupByType(collection) {
  // write your solution here
  let categoryObject = {};
  for(const element of collection) {
    const {type: category} = element;
    categoryObject[category] = category in categoryObject ? [...categoryObject[category], element] : [element];
  }
  return [categoryObject];
}

console.log([
  { type: "fruits", value: "orange" },
  { type: "fruits", value: "apple" },
  { type: "vegetables", value: "cucumber" }
])

/* Expected output
[
  {
    "fruits": [
      { type: "fruits", value: "orange" },
      { type: "fruits", value: "apple" }
    ],
    "vegetables": [
      { type: "vegetables", value: "cucumber" }
    ]
  }
]
*/
