import lexicalAnalyzer from "../../src/lexical_analyzer"
import dfaGenerator from "../../src/dfa_generator"

test('should generate a symbol table based on input and a dfa', async () => {
  const codeInput = `sai ouia se ab ai
sai ai
`

  const languageInput = `se
sai
ab
<S> ::= a<A> | e<A> | i<A> | o<A> | u<A>
<A> ::= a<A> | e<A> | i<A> | o<A> | u<A> | ε`

  const dfa = dfaGenerator(languageInput)

  const symbolTable = lexicalAnalyzer(codeInput, dfa.fa)

  const expectedResult = [
    {"label": "sai", "row": 0, "state": "E"},
    {"label": "ouia", "row": 0, "state": "H"},
    {"label": "se", "row": 0, "state": "B"},
    {"label": "ab", "row": 0, "state": "G"},
    {"label": "ai", "row": 0, "state": "H"},
    {"label": "sai", "row": 1, "state": "E"},
    {"label": "ai", "row": 1, "state": "H"},
    {"label": "$", "row": -1, "state": "$"}
  ]

  expect(symbolTable).toStrictEqual(expectedResult);
})

test('should generate a symbol table with error state', async () => {
  const codeInput = `bai ouiax se ab ai
sai ai
`

  const languageInput = `se
sai
ab
<S> ::= a<A> | e<A> | i<A> | o<A> | u<A>
<A> ::= a<A> | e<A> | i<A> | o<A> | u<A> | ε`

  const dfa = dfaGenerator(languageInput)

  const symbolTable = lexicalAnalyzer(codeInput, dfa.fa)

  const expectedResult = [
    {"label": "bai", "row": 0, "state": "•"},
    {"label": "ouiax", "row": 0, "state": "•"},
    {"label": "se", "row": 0, "state": "B"},
    {"label": "ab", "row": 0, "state": "G"},
    {"label": "ai", "row": 0, "state": "H"},
    {"label": "sai", "row": 1, "state": "E"},
    {"label": "ai", "row": 1, "state": "H"},
    {"label": "$", "row": -1, "state": "$"}
  ]

  expect(symbolTable).toStrictEqual(expectedResult);
})