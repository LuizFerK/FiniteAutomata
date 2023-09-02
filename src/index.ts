import dfaGenerator from "./dfa_generator"
import lexicalAnalyzer from "./lexical_analyzer"

async function main() {
  const dfa = await dfaGenerator()
  const symbolTable = await lexicalAnalyzer(dfa)
  console.log(symbolTable)
}

main()