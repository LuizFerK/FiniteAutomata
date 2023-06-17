import { Af, AfRow, AfTable } from '.'

function valueToCharCode(values: number[]) {
  return values.map(value => {
    if (value === 0) return 'S'
    if (value === 18) return 'A'
    return String.fromCharCode(value + 64)
  }).join(", ")
}

function keyToCharCode(key: string, value: AfRow) {
  if (key === "0") return 'S'
  const suffix = value.hasOwnProperty("final") ? "*" : ""
  if (key === "18")  return suffix + "A"
  return suffix + String.fromCharCode(Number((key).toString().replace("*", "")) + 64)
}

function rowCellsValuesToCharCode(object: AfRow) {
  return Object.fromEntries(
    Object.entries(object)
      .filter(([k, v]) => !(k === "final" && v === true))
      .map(([k, v]) => [k, valueToCharCode(v as number[])])
  )
}

function stateKeysToCharCode(table: AfTable) {
  return Object.fromEntries(
    Object.entries(table)
      .map(([k, v]) => [
        keyToCharCode(k, v),
        rowCellsValuesToCharCode(v)
      ])
  )
}

export default function printAf(afnd: Af) {
  console.table(stateKeysToCharCode(afnd.af))
}
