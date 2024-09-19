class InvalidDataInputError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class QuestionnaireTypeError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class DiagramTypeError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

export {
  InvalidDataInputError,
  QuestionnaireTypeError,
  DiagramTypeError
}