class InvalidDataInputError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class UndefinedEvaluationError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

export {
  InvalidDataInputError,
  UndefinedEvaluationError
}