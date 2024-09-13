/**
 * Calculate average of an array.
 * @param {number[]} arr 
 * @returns 
 */
function average(arr) {
  return arr.reduce((a, b) => a + b) / arr.length
}


export {
  average
}