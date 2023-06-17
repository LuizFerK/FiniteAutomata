const fs = require('fs/promises')

function parseTRow(row, afnd) {
  return [...row.split(""), ""].reduce((acc, tkn, idx) => {
    // final da sentença
    if (tkn === "") {
      acc.af[acc.available] = { final: true }
      acc.available++
      return acc
    }

    // o token ainda não existe no afnd
    if (!acc.tokens.includes(tkn)) {
      acc.af = {...acc.af, [idx]: {...acc.af[idx]}}
      acc.af = Object.fromEntries(Object.entries(acc.af).map(([k, v]) => ([k, {...v, [tkn]: []}])))
      acc.tokens = [...acc.tokens, tkn]
    }

    // adiciona o estado no afnd
    if (idx === 0) {
      acc.af[0] = { ...acc.af[0], [tkn]: [...acc.af[0][tkn], acc.available] }
    } else {
      acc.af[acc.available] = { ...acc.af[acc.available], [tkn]: [acc.available + 1] }
      acc.available++
    }
    return acc
  }, afnd)
}

function parseNTRow(row, afnd) {
  // console.log(row)
  return afnd
}

function generateAfnd(input) {
  return input.split("\n").reduce((afnd, row) => {
    return row[0] === "<"
      ? parseNTRow(row, afnd)
      : parseTRow(row, afnd)
  }, { af: {}, tokens: [], available: 1 })
}

function valueToCharCode(values) {
  return values.map(value => {
    if (value === 0) return 'S'
    if (value === 18) return 'A'
    return String.fromCharCode(value + 64)
  }).join(", ")
}

function keyToCharCode(key, value) {
  if (key === "0") return 'S'
  
  const suffix = value.hasOwnProperty("final") ? "*" : ""

  if (key === "18") {
    return suffix + "A"
  }

  return suffix + String.fromCharCode(Number((key).toString().replace("*", "")) + 64)
}

function objectValuesToCharCode(object) {
  return Object.fromEntries(Object.entries(object).filter(([k, v]) => !(k === "final" && v === true)).map(([k, v]) => [k, valueToCharCode(v)]))
}

function objectKeysToCharCode(object) {
  return Object.fromEntries(Object.entries(object).map(([k, v]) => [keyToCharCode(k, v), objectValuesToCharCode(v)]))
}

function printAfnd(afnd) {
  console.table(objectKeysToCharCode(afnd.af))
}

async function main() {
  const input = await fs.readFile('assets/input.txt', { encoding: 'utf8' })
  const afnd = generateAfnd(input)
  printAfnd(afnd)
}

main()