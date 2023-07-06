import { Fa, FaTable } from '.'

export default function parseNdfaToDfa(ndfa: Fa) {
  const dfa = {"S": ndfa.fa[0]} as FaTable
  let states = ["S"]

  for (let i = 0; i < states.length; i++) {
    const state = states[i]
    const getChildValues = state[0] === "["

    if (getChildValues) {
      const values = state.slice(1, -1).split("")
      
      for (const v of values) {
        const vidx = ndfa.nTStates[v]

        console.log("VVVVVV")
        console.log(v)
        console.log(ndfa.nTStates)
        console.log(vidx)
        console.log(ndfa.fa[vidx])
        console.log("^^^^^^")

        if (ndfa.fa[vidx].final) {
          dfa[state] = { ...dfa[state], final: true }
        }

        for (const tkn of ndfa.tokens) {
          const sla = (ndfa.fa[vidx][tkn] || []) as number[]
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
    }

    for (const tkn of ndfa.tokens) {
      const values = dfa[state][tkn]
      if (!values || typeof values !== "object") continue
      
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
