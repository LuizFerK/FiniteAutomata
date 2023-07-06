import { Fa, FaRow, FaTable } from '.'

function formatState(key: string, values: FaRow) {
  if (values.error) return "•"
  return values.final ? `*${key}` : key
}

function parseErrorState(value: number[] | string | boolean | undefined) {
  if (!value || typeof value === "object") return "•"
  return value
}

function formatRow(values: FaRow) {
  return Object.fromEntries(
    Object.entries(values)
      .filter(([k, v]) => !((k === "final" || k === "error") && v === true))
      .map(([k, v]) => [k, parseErrorState(v)])
  )
}

function stateKeysToCharCode(table: FaTable) {
  return Object.fromEntries(
    Object.entries(table)
      .map(([k, v]) => [
        formatState(k, v),
        formatRow(v)
      ])
  )
}

export default function printDfa(dfa: Fa) {
  console.table(stateKeysToCharCode(dfa.fa))
}
