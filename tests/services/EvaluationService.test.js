import { test, assert } from "vitest"
import { evaluate, tokenize } from "../../src/services/EvaluationService"



test(
  "Tokenizer work properly.",
  () => {
    console.log(tokenize("LOG(-1.2+.1)"))
    console.log(evaluate("LOG(1.71 + 1)"))
  }
)
