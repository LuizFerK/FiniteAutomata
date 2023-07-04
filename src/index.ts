import fs from "fs/promises"
import generateNdfa from "./generate_ndfa"
import addTerminalStates from "./terminal_states"
// import parseNdfaToDfa from "./ndfa_to_dfa"
import addErrorState from "./error_state"
import printAf from "./print_af"

export interface FaRow {
  [k: string]: number[] | boolean | undefined
  final?: boolean
  error?: boolean
}

export interface FaTable {
  [k: string]: FaRow
}

interface NTStates {
  [k: string]: number
}

export interface Fa {
  fa: FaTable
  tokens: string[]
  available: number
  nTStates: NTStates
}

async function main() {
  const input = await fs.readFile('assets/input.txt', { encoding: 'utf8' })
  const ndfa = generateNdfa(input)
  addTerminalStates(ndfa)
  // const dfa = parseNdfaToDfa(ndfa)
  addErrorState(ndfa)
  printAf(ndfa)
}

main()