import { FaTable } from "../dfa_generator";

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

  if (!state) {
    state = "•"
  }

  return { label: string, row: idx, state: state }
}


export default function lexicalAnalyzer(input: string, dfa: FaTable) {
  const rows = input.trim().split("\n").map(row => row.split(" "))

  const symbolTable =
    rows.flatMap((row, idx) =>
      row.map(string => parseString(string, idx, dfa))
    ).concat([{label: "$", state: "$", row: -1}])

  return symbolTable
}
