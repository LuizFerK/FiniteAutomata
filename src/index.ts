import fs from "fs/promises"
import generateAfnd from "./generate_afnd"
import addTerminalStates from "./terminal_states"
import addErrorState from "./error_state"
import printAf from "./print_af"

export interface AfRow {
  [k: string]: number[] | boolean | undefined
  final?: boolean
  error?: boolean
}

export interface AfTable {
  [k: string]: AfRow 
}

interface NTStates {
  [k: string]: number
}

export interface Af {
  af: AfTable
  tokens: string[]
  available: number
  nTStates: NTStates
}

async function main() {
  const input = await fs.readFile('assets/input.txt', { encoding: 'utf8' })
  const afndBase = generateAfnd(input)
  const afnd = addTerminalStates(afndBase)
  const afFinal = addErrorState(afnd)
  printAf(afFinal)
}

main()