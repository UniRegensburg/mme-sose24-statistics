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
 * @param {number[][]} valueMatrix An matrix of result values.
 */
function generateDataEntity(type, valueMatrix) {
  const userInfos = []
  const results = []

  valueMatrix.forEach((arr) => {
    let result = {}
    arr.forEach((value, index) => {
      result[`Q${index + 1}`] = value
    })

    userInfos.push({})
    results.push(result)
  })

  return new DataEntity(
    type,
    userInfos,
    results
  )
}

export {
    arraysEqual,
    generateDataEntity
}