import { Fa, FaTable } from '.'

export default function parseNdfaToDfa(ndfa: Fa): Fa {
  const dfa = {"S": ndfa.fa[0]} as FaTable
  let states = ["S"]

  for (let i = 0; i < states.length; i++) {
    const state = states[i]

    if (state[0] === "[") {
      const values = state.slice(1, -1).split("")
      
      for (const v of values) {
        const idx = v.charCodeAt(0) - 64
        const ntIdx = ndfa.nTStates[v]

        const NAOSEI = ndfa.fa[idx] || ndfa.fa[ntIdx]

        if (NAOSEI.final) {
          dfa[state] = { ...dfa[state], final: true }
        }

        for (const tkn of ndfa.tokens) {
          const sla = (NAOSEI[tkn] || []) as number[]
          if (!sla) continue
          
          for (let j = 0; j < sla.length; j++) {
            const test = (dfa[state] || {})[tkn] || []

            if (typeof test !== "object") continue

            if (!test.includes(sla[j])) {
              dfa[state][tkn] = [...test, sla[j]]
            }
          }

          
        }
      }
    } else {
      const idx = state.charCodeAt(0) - 64
      const ntIdx = ndfa.nTStates[state]

      dfa[state] = ndfa.fa[idx] || ndfa.fa[ntIdx]
    }

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
