import DataEntity from "../src/entities/DataEntity"

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

/**
 * A helper function for generating DataEntity.
 * @param {object} type Type of questionnaire.
 * @param {number[][]} valueMatrix An matrix of questionnaire result values.
 */
function generateDataEntity(type, valueMatrix) {
  const data = []

  valueMatrix.forEach((arr) => {
    let row = {}
    arr.forEach((value, index) => {
      row[`Q${index + 1}`] = value
    })

    data.push(row)
  })

  return new DataEntity(
    type,
    data
  )
}

export {
    arraysEqual,
    generateDataEntity
}