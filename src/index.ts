import fs from "fs/promises"
import generateAfnd from "./generate_afnd"
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

export interface Af {
  af: AfTable
  tokens: string[]
  available: number
}

async function main() {
  const input = await fs.readFile('assets/input.txt', { encoding: 'utf8' })
  const afnd = generateAfnd(input)
  const afFinal = addErrorState(afnd)
  printAf(afFinal)
}

main()