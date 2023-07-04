import { Fa } from '.'

interface Dfa {
  [state: string]: {
    [token: string]: string | number[]
  }
}

export default function parseNdfaToDfa(ndfa: Fa) {
  const dfa = {"S": ndfa.fa[0]} as Dfa
  let states = ["S"]

  console.log(ndfa)

  for (let i = 0; i < states.length; i++) {
    const state = states[i]
    const getChildValues = state[0] === "["

    if (getChildValues) {
      const values = state.slice(1, -1).split("")
      
      for (const v of values) {
        const vidx = ndfa.nTStates[v]

        if (ndfa.fa[vidx].final) {
          dfa[state] = { ...dfa[state], final: true }
        }

        for (const tkn of ndfa.tokens) {
          const sla = (ndfa.fa[vidx][tkn] || []) as number[]
          if (!sla) continue
          
          for (let j = 0; j < sla.length; j++) {
            if (!((dfa[state] || {})[tkn] || []).includes(sla[j])) {
              dfa[state][tkn] = [...((dfa[state] || {})[tkn] || []), sla[j]]
            }
          }

          
        }
      }
    }

    for (const tkn of ndfa.tokens) {
      const values = dfa[state][tkn]
      if (!values) continue
      
      const textValues =
        typeof values === "string"
          ? values
          : values.length > 1
            ? `[${(values).sort().map(v => String.fromCharCode(v + 64)).join("")}]`
            : String.fromCharCode(values[0] + 64)

      dfa[state] = { ...dfa[state], [tkn]: textValues }
      if (!dfa.hasOwnProperty(textValues)) {
        dfa[textValues] = {}
        states.push(textValues)
      }
    }
  }

  console.table(dfa)
  return dfa
}
