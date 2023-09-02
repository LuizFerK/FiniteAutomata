import { Fa, FaRow, FaTable } from '.'

function valueToCharCode(values: number[]) {
  return values.map(value => {
    if (value === 0) return 'S'
    if (value < 19) return String.fromCharCode(value + 64)
    else return String.fromCharCode(value + 65)
  }).join(", ")
}

function keyToCharCode(key: string, value: FaRow) {
  if (key === "0") return 'S'
  if (value.hasOwnProperty("error")) return "•"
  const suffix = value.hasOwnProperty("final") ? "*" : ""

  if (Number(key) < 19)  return suffix + String.fromCharCode(Number(key) + 64)
  else return suffix + String.fromCharCode(Number(key) + 65)
}

function rowCellsValuesToCharCode(object: FaRow) {
  return Object.fromEntries(
    Object.entries(object)
      .filter(([k, v]) => !((k === "final" || k === "error") && v === true))
      .map(([k, v]) => [k, valueToCharCode(v as number[])])
  )
}

function stateKeysToCharCode(table: FaTable) {
  return Object.fromEntries(
    Object.entries(table)
      .map(([k, v]) => [
        keyToCharCode(k, v),
        rowCellsValuesToCharCode(v)
      ])
  )
}

export default function printNdfa(ndfa: Fa) {
  console.table(stateKeysToCharCode(ndfa.fa))
}
