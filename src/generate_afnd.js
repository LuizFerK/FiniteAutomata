const { objMap } = require('./helpers/obj_map')

function parseTRow(row, afnd) {
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
      acc.af = objMap(acc.af, ([k, v]) => ([k, {...v, [tkn]: []}]))
      acc.tokens = [...acc.tokens, tkn]
    }

    // add the state (row) to the afnd
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

module.exports = generateAfnd