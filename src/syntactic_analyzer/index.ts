import { SymbolTable } from "../lexical_analyzer";

interface Lrt {
  [state: string]: {
    [token: string]: string | number | undefined
  } | undefined
}

export default function syntacticAnalyzer(lrtInput: string, stb: SymbolTable) {
  const lrt: Lrt = JSON.parse(lrtInput)
  console.log(lrt)

  return "false"
}
