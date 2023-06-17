import { Af } from '.'

function parseTRow(row: string, afnd: Af) {
  return [...row.split(""), ""].reduce((acc, tkn, idx) => {
    // end of sentence
    if (tkn === "") {
      acc.af[acc.available] = { final: true }
      acc.available++
      return acc
    }

    // add the token (column) to the afnd if it doesn't exists yet
    if (!acc.tokens.includes(tkn)) {
      acc.af = {...acc.af, [idx]: {...acc.af[idx]}}
      acc.af = Object.fromEntries(Object.entries(acc.af).map(([k, v]) => ([k, {...v, [tkn]: []}])))
      acc.tokens = [...acc.tokens, tkn]
    }

    // add the state (row) to the afnd
    if (idx === 0) {
      acc.af[0] = { ...acc.af[0], [tkn]: [...(acc.af[0][tkn] as number[]), acc.available] }
    } else {
      acc.af[acc.available] = { ...acc.af[acc.available], [tkn]: [acc.available + 1] }
      acc.available++
    }

    return acc
  }, afnd)
}

function parseNTRow(row: string, afnd: Af) {
  const state = row.slice(1, 2) === "S" ? 0 : afnd.available
  const isFinal = row.slice(-1) === "ε"
  const values = isFinal ? row.slice(8, -4) : row.slice(8)

  const updatedAfnd = values.split(" | ").reduce((acc, nt) => {
    const tkn = nt.slice(0, 1)
    const ntState = (nt.charCodeAt(2) - 65) + afnd.available

    // add the token (column) to the afnd if it doesn't exists yet
    if (!acc.tokens.includes(tkn)) {
      acc.af = {...acc.af, [state]: {...acc.af[state]}}
      acc.af = Object.fromEntries(Object.entries(acc.af).map(([k, v]) => ([k, {...v, [tkn]: []}])))
      acc.tokens = [...acc.tokens, tkn]
    }

    acc.af[state] = { ...acc.af[state], [tkn]: [...((acc.af[state] || {})[tkn]) as number[] || [], ntState] }

    return acc
  }, afnd)

  if (isFinal) updatedAfnd.af[state] = { ...updatedAfnd.af[state], final: true }
  if (state !== 0) updatedAfnd.available++
  return updatedAfnd
}

export default function generateAfnd(input: string): Af {
  return input.split("\n").reduce((afnd, row) => {
    return row[0] === "<"
      ? parseNTRow(row, afnd)
      : parseTRow(row, afnd)
  }, { af: {}, tokens: [], available: 1 } as Af)
}
