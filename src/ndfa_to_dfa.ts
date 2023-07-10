import { Fa, FaTable } from '.'

export default function parseNdfaToDfa(ndfa: Fa): Fa {
  const dfa = {} as FaTable
  let states = ["S"]

  for (let i = 0; i < states.length; i++) {
    const state = states[i]

    // if we need to get the states non-deterministic values and join them
    if (state[0] === "[") {
      const values = state.slice(1, -1).split("")
      
      // iterate over every non-deterministic state
      for (const v of values) {
        const tIdx = v.charCodeAt(0) - 64
        const ntIdx = ndfa.nTStates[v]

        // get the row index to the ndfa
        const idx = ndfa.fa[tIdx] || ndfa.fa[ntIdx]

        // if any non-deterministic state is final, then the new one is final too
        if (idx.final) {
          dfa[state] = { ...dfa[state], final: true }
        }

        // join every non-deterministic value for every token
        for (const tkn of ndfa.tokens) {
          const nDValues = (idx[tkn] || []) as number[]
          if (!nDValues) continue
          
          for (let j = 0; j < nDValues.length; j++) {
            const tokens = (dfa[state] || {})[tkn] || []

            if (typeof tokens !== "object") continue

            if (!tokens.includes(nDValues[j])) {
              dfa[state][tkn] = [...tokens, nDValues[j]]
            }
          }
        }
      }
    // just copy the non-deterministic state values to the new one
    } else {
      const tIdx = state.charCodeAt(0) - 64
      const ntIdx = ndfa.nTStates[state]

      dfa[state] = ndfa.fa[tIdx] || ndfa.fa[ntIdx]
    }

    // join the non-deterministic values and create a new state if needed
    for (const tkn of ndfa.tokens) {
      const values = dfa[state][tkn]
      if (!values || typeof values !== "object" || values.length === 0) continue

      const textValues =
        typeof values === "string"
          ? values
          : values.length > 1
            ? `[${(values).sort((a, b) => a - b).map(v => String.fromCharCode(v + 64)).join("")}]`
            : String.fromCharCode(values[0] + 64)

      dfa[state] = { ...dfa[state], [tkn]: textValues }
      if (!dfa.hasOwnProperty(textValues)) {
        dfa[textValues] = {}
        states.push(textValues)
      }
    }
  }

  return { fa:dfa, tokens: ndfa.tokens } as Fa
}
