


export function evaluate(expr) {
  return parseExpression(tokenize(expr))
}



/**
 * Token parser
 */

const peek = (tokens) => tokens[0] || null
const consume = (tokens) => tokens.shift()

function parseExpression(tokens) {
  let result = parseTerm(tokens);
  while (peek(tokens) && (peek(tokens).value === '+' || peek(tokens).value === '-')) {
    const operator = consume(tokens).value;
    const right = parseTerm(tokens);
    result = (operator === '+') ? result + right : result - right;
  }
  return result;
}

function parseTerm(tokens) {
  let result = parseFactor(tokens);
  while (peek(tokens) && (peek(tokens).value === '*' || peek(tokens).value === '/')) {
    const operator = consume(tokens).value;
    const right = parseFactor(tokens);
    result = (operator === '*') ? result * right : result / right;
  }
  return result;
}

function parseFactor(tokens) {
  const token = peek(tokens)
  if (!token) {
    throw new Error(`Unexpected token: ${token ? token.value : 'EOF'}`);
  }

  if (token.type === TOKEN.FUNCTION) {
    const func = SUPPORTED_FUNCTIONS[consume(tokens).value]
    return func(parseFactor(tokens))
  }

  if (token.value === '(') {
    consume(tokens)     // Consume '('
    const result = parseExpression(tokens);
    if (peek(tokens).value === ')') {
      consume(tokens)   // Consume ')'
    } else {
      throw new Error("Mismatched parentheses")
    }
    return result
  }
  if (token.type === TOKEN.NUMBER) {
    return parseFloat(consume(tokens).value)
  }
  if (token.value === "+" || token.value === "-") {
    return 0
  }
}



/**
 * Tokenizer
 */

const TOKEN = Object.freeze({
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
  PAREN: "PAREN",
  FUNCTION: "FUNCTION",
  VARIABLE: "VARIABLE"
})

const SUPPORTED_FUNCTIONS = {
  SCORE: (dataEntity) => 0,
  LOG: Math.log
}

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

      if (word in SUPPORTED_FUNCTIONS) {
        tokens.push(token(TOKEN.FUNCTION, word))
      } else {
        tokens.push(token(TOKEN.VARIABLE, word))
      }
      continue
    }

    throw new Error(`Unrecognized character ${char}.`)

  }

  return tokens

}