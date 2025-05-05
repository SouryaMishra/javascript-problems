/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// DO NOT CHANGE FUNCTION NAME

function deepEqual(value, other) {
  'use strict';
  // write your solution below
  if(value === undefined && other === undefined) return true;
  if(other === null && value === null) return true;

  if(value === undefined && other !== undefined) return false;
  if(other === undefined && value !== undefined) return false;
  if(other === null && value !== null) return false;
  if(value === null && other !== null) return false;

  if(typeof value === "object" && typeof other === "object") {
    const primitiveTypes = ["string", "number", "boolean", "bigint"];
    for(const key in value) {
      // Skip prototype chain
      if (value.hasOwnProperty(key)) {
        const firstValue = value[key];
        const secondValue = other[key];
        if(primitiveTypes.includes(typeof firstValue) && primitiveTypes.includes(typeof secondValue)) return firstValue === secondValue;
        if(typeof firstValue === "object" && typeof secondValue !== "object") return false;
        if(Array.isArray(firstValue) && !Array.isArray(firstValue)) return false;
        if(Array.isArray(secondValue) && !Array.isArray(firstValue)) return false;
        return (deepEqual(firstValue, secondValue));
      }
    }
  }
  return false;
}
