import { Fa } from '.'

function parseTRow(row: string, ndfa: Fa) {
  let idx = -1
  
  // for each token on input row
  for (const tkn of [...row.split(""), ""]) {
    idx++
    
    // end of sentence
    if (tkn === "") {
      ndfa.fa[ndfa.available] = { final: true }
      ndfa.available++
      continue
    }

    // add the token (column) to the ndfa if it doesn't exists yet
    if (!ndfa.tokens.includes(tkn)) {
      ndfa.fa[0] = { ...ndfa.fa[0], [tkn]: [] }
      ndfa.tokens.push(tkn)
    }

    // add the state (row) to the ndfa
    if (idx === 0) {
      ndfa.fa[0] = { ...ndfa.fa[0], [tkn]: [...(((ndfa.fa[0] || {})[tkn] || []) as number[]), ndfa.available] }
    } else {
      ndfa.fa[ndfa.available] = { ...ndfa.fa[ndfa.available], [tkn]: [ndfa.available + 1] }
      ndfa.available++
    }
  }
}

function parseNTRow(row: string, ndfa: Fa) {
  const stateLetter = row.slice(1, 2)
  const state = stateLetter === "S" ? 0 : ndfa.nTStates[stateLetter]

  const isFinal = row.slice(-1) === "ε"
  const values = isFinal ? row.slice(8, -4) : row.slice(8)

  for (const nt of values.split(" | ")) {
    const tkn = nt.slice(0, 1)
    const ntStateLetter = nt.slice(2, 3)

    // map the state letter to state index
    if (ntStateLetter && !ndfa.nTStates.hasOwnProperty(ntStateLetter)) {
      ndfa.nTStates[ntStateLetter] = (nt.charCodeAt(2) - 65) + ndfa.available
    }

    // add the token (column) to the ndfa if it doesn't exists yet
    if (!ndfa.tokens.includes(tkn)) ndfa.tokens.push(tkn)

    ndfa.fa[state] = { ...ndfa.fa[state], [tkn]: [...((ndfa.fa[state] || {})[tkn]) as number[] || [], ndfa.nTStates[ntStateLetter] || -1] }
  }

  if (isFinal) ndfa.fa[state] = { ...ndfa.fa[state], final: true }
}

export default function generateNdfa(input: string): Fa {
  const ndfa: Fa = {
    fa: {},
    tokens: [],
    available: 1,
    nTStates: {}
  }

  // for each input row, parse it based on type
  for (const row of input.split("\n")) {
    row[0] === "<"
      ? parseNTRow(row, ndfa)
      : parseTRow(row, ndfa)
  }

  return ndfa
}
