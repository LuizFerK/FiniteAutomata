import fs from "fs/promises"
import { Fa } from "../dfa_generator";

function parseString(string: string, idx: number, dfa: Fa) {
  const chars = string.split("")
  let state = "S"

  for (const char of chars) {
    if (typeof state === "object") {
      state = "•"
      break
    }

    state = dfa.fa[state][char] as string
  }

  if (!state) {
    state = "•"
  }

  return { label: string, row: idx, state: state }
}

export default async function lexicalAnalyzer(dfa: Fa) {
  const input = await fs.readFile('assets/code.quati', { encoding: 'utf8' })
  const rows = input.trim().split("\n").map(row => row.split(" "))

  const symbolTable =
    rows.flatMap((row, idx) =>
      row.map(string => parseString(string, idx, dfa))
    ).concat([{label: "$", state: "$", row: -1}])
  
  return symbolTable
}
