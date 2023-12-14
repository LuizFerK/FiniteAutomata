import fs from "fs/promises"
import dfaGenerator from "./dfa_generator"
import lexicalAnalyzer from "./lexical_analyzer"
import syntacticAnalyzer from "./syntactic_analyzer"

async function main() {
  const input = await fs.readFile('assets/input.txt', { encoding: 'utf8' })
  const codeInput = await fs.readFile('assets/code.quati', { encoding: 'utf8' })
  const lrtInput = await fs.readFile('assets/lrt.json', { encoding: 'utf8' })

  const dfa = dfaGenerator(input)
  const symbolTable = lexicalAnalyzer(codeInput, dfa.fa)

  console.log(symbolTable)
  const acceptance = syntacticAnalyzer(lrtInput, symbolTable)
  
  console.log(acceptance)
}

main()