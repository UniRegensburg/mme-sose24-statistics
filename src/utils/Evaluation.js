import { inplaceOperation } from "./MathUtils";
import FUNCTIONS from "../constants/SupportedFunctions";



export function evaluate(expr, dataEntity) {
  return parseExpression(tokenize(expr), dataEntity)
}



/***************************
 * Token parser
 ***************************/

const peek = (tokens) => tokens[0] || null
const consume = (tokens) => tokens.shift()

function parseExpression(tokens, dataEntity) {
  let result = parseTerm(tokens, dataEntity);
  while (peek(tokens) && (peek(tokens).value === '+' || peek(tokens).value === '-')) {
    const operator = consume(tokens).value;
    const right = parseTerm(tokens, dataEntity);
    inplaceOperation(result, right, operator)
  }
  return result;
}

function parseTerm(tokens, dataEntity) {
  let result = parseFactor(tokens, dataEntity);
  while (peek(tokens) && (peek(tokens).value === '*' || peek(tokens).value === '/')) {
    const operator = consume(tokens).value;
    const right = parseFactor(tokens, dataEntity);
    inplaceOperation(result, right, operator)
  }
  return result;
}

function parseFactor(tokens, dataEntity) {
  const token = peek(tokens)
  if (!token) {
    throw new Error("Unexpected token.");
  }

  if (token.type === TOKEN.FUNCTION) {
    consume(tokens) // Consume function
    if (token.value === "SCORE") { return FUNCTIONS.SCORE.func(dataEntity) }

    const func = FUNCTIONS[token.value].func
    const result = parseFactor(tokens, dataEntity)
    func(result)
    return result
  }

  if (token.value === '(') {
    consume(tokens)     // Consume '('
    const result = parseExpression(tokens, dataEntity);
    if (peek(tokens).value === ')') {
      consume(tokens)   // Consume ')'
    } else {
      throw new Error("Mismatched parentheses.")
    }
    return result
  }
  if (token.type === TOKEN.NUMBER) {
    consume(tokens)   // Consume number
    const num = parseFloat(token.value)
    return new Array(dataEntity.size).fill(num)
  }
  if (token.type === TOKEN.VARIABLE) {
    consume(tokens)   // Consume variable
    return dataEntity.col(token.value)
  }
  if (token.value === "+" || token.value === "-") {
    // Leave + and - for later evaluation. Initialize an array of 0s
    return new Array(dataEntity.size).fill(0)
  }
    
  throw new Error(`Unexpected token: "${token.value}".`);
}



/***************************
 * Tokenizer
 ***************************/

const TOKEN = Object.freeze({
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
  PAREN: "PAREN",
  FUNCTION: "FUNCTION",
  DATA_FUNC: "DATA_FUNC",
  VARIABLE: "VARIABLE"
})




function token(type, value) { return { type: type, value: value } }

export function tokenize(expr) {
  const tokens = []
  let i = 0

  while (i < expr.length) {
    const char = expr[i]

    // Skip whitespace
    if (/\s/.test(char)) {
      i++
      continue
    }

    // Handle numbers
    if (/\d/.test(char) || (char === '.' && /\d/.test(expr[i + 1]))) {
      let num = char
      i++
      while (i < expr.length && /[\d\.]/.test(expr[i])) {
        num += expr[i]
        i++
      }

      if (tokens.length >= 1) {
        const prevToken = tokens[tokens.length - 1]
        if (prevToken.type === TOKEN.FUNCTION || prevToken.type === TOKEN.VARIABLE) {
          tokens[tokens.length - 1].value += num
          continue
        }
      }

      tokens.push(token(TOKEN.NUMBER, num))
      continue
    }

    // Handle operators
    if (/[+\-*/]/.test(char)) {
      tokens.push(token(TOKEN.OPERATOR, char))
      i++
      continue
    }

    // Handle parentheses
    if (char === "(" || char === ")") {
      tokens.push(token(TOKEN.PAREN, char))
      i++
      continue
    }

    // Handle functions and variables
    if (/[a-zA-Z]/.test(char)) {
      let word = ""
      while (i < expr.length && /[a-zA-Z]/.test(expr[i])) {
        word += expr[i]
        i++
      }

      if (word in FUNCTIONS) {
        tokens.push(token(TOKEN.FUNCTION, word))
      } else {
        tokens.push(token(TOKEN.VARIABLE, word))
      }
      continue
    }

    throw new Error(`Unrecognized character "${char}".`)

  }

  return tokens

}