import { FaTable } from "../dfa_generator";

export interface SymbolTableRow {
  label: string
  state: string
  row: number
}

export type SymbolTable = SymbolTableRow[]

function getStateCode(state: string | number[]) {
  if (typeof state === "string") return state

  return String.fromCharCode(state[0] + 65)
}

function parseString(string: string, idx: number, dfa: FaTable) {
  const chars = string.split("")
  let state = "S"

  for (const char of chars) {
    if (typeof state === "object") {
      state = "•"
      break
    }

    state = dfa[state][char] as string
  }

  if (!state || !dfa[getStateCode(state)].final) {
    state = "•"
  }

  return { label: string, row: idx, state: state }
}

export default function lexicalAnalyzer(input: string, dfa: FaTable) {
  const rows = input.trim().split("\n").map(row => row.split(" ").filter(row => row !== ''))

  const symbolTable: SymbolTable =
    rows.flatMap((row, idx) =>
      row.map(string => parseString(string, idx, dfa))
    ).concat([{label: "$", state: "$", row: -1}])

  return symbolTable
}
