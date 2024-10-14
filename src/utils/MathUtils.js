/**
 * Calculate average of an array.
 * @param {number[]} arr 
 * @returns 
 */
function average(arr) {
  return arr.reduce((a, b) => a + b) / arr.length
}

/**
 * Given a list of objects, calculate average for all keys.
 * @param {Object[]} objs 
 */
function groupAverage(objs) {
  const result = {}
  const keys = Object.keys(objs[0])
  keys.forEach(key => {
    result[key] = 0
    for (let obj of objs) {
      result[key] += obj[key]
    }
    result[key] /= objs.length
  })
  return result
}


function count(arr) {
  return arr.reduce((count, item) => {
    count[item] = (count[item] || 0) + 1
    return count;
  }, {})
}

function standardDeviation(arr) {
  const mean = average(arr)
  return Math.sqrt(average(arr.map(x => (x - mean) ** 2 )))
}

function inplaceStandardize(arr) {
  const mean = average(arr)
  const sd = Math.sqrt(average(arr.map(x => (x - mean) ** 2 )))
  inplaceOperation(arr, mean, "-")
  inplaceOperation(arr, sd, "/")
}


/**
 * @param {number[]} arr1 
 * @param {number[] | number} arr2
 * @param {string} operator
 * @returns 
 */
function inplaceOperation(arr1, arr2, operator) {

  let operation = (a, b) => {
    if (operator === "+") { return a + b }
    if (operator === "-") { return a - b }
    if (operator === "*") { return a * b }
    if (operator === "/") { return a / b }
  }


  if (typeof arr2 === "number") {
    for (let i = 0; i < arr1.length; i++) {
      arr1[i] = operation(arr1[i], arr2)
    } 
    return
  }

  if (arr1.length !== arr2.length) {
    throw new Error("Function `addTo` only adds two arrays of the same length.")
  }
  for (let i = 0; i < arr1.length; i++) {
    arr1[i] = operation(arr1[i], arr2[i])
  } 
}


function apply(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i])
  } 
}


export {
  average,
  groupAverage,
  count,
  standardDeviation,
  inplaceStandardize,
  inplaceOperation,
  apply
}