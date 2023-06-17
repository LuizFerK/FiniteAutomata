import { Af, AfRow, AfTable } from '.'

function valueToCharCode(values: number[]) {
  return values.map(value => {
    if (value === 0) return 'S'
    if (value < 19) return String.fromCharCode(value + 64)
    else return String.fromCharCode(value + 65)
  }).join(", ")
}

function keyToCharCode(key: string, value: AfRow) {
  if (key === "0") return 'S'
  if (value.hasOwnProperty("error")) return "•"
  const suffix = value.hasOwnProperty("final") ? "*" : ""

  if (Number(key) < 19)  return suffix + String.fromCharCode(Number((key).toString().replace("*", "")) + 64)
  else return suffix + String.fromCharCode(Number((key).toString().replace("*", "")) + 65)
}

function rowCellsValuesToCharCode(object: AfRow) {
  return Object.fromEntries(
    Object.entries(object)
      .filter(([k, v]) => !((k === "final" || k === "error") && v === true))
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
