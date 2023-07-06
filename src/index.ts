import fs from "fs/promises"
import generateNdfa from "./generate_ndfa"
import addTerminalStates from "./terminal_states"
import parseNdfaToDfa from "./ndfa_to_dfa"
import addErrorState from "./error_state"
import printAf from "./print_af"

export interface FaRow {
  [k: string]: number[] | string | boolean | undefined
  final?: boolean
  error?: boolean
}

export interface FaTable {
  [k: string]: FaRow
}

export interface NTStates {
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
  const fa = generateNdfa(input)
  addTerminalStates(fa)
  printAf(fa)
  const dfa = parseNdfaToDfa(fa)
  // addErrorState(ndfa)
}

main()