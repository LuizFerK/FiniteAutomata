import { Fa } from '.'

export default function addTerminalStates(ndfa: Fa) {
  ndfa.available = Object.values(ndfa.nTStates).sort().slice(-1)[0]
  let terminalStates = [] as number[]

  for (const state in ndfa.fa) {
    for (const tkn in ndfa.fa[state]) {
      const values = ndfa.fa[state][tkn]
      if (typeof values !== "object") continue
      
      ndfa.fa[state][tkn] = values.map(state => {
        if (state !== -1) return state

        ndfa.available++
        terminalStates = [...terminalStates, ndfa.available]
        return ndfa.available
      })
    }
  }

  for (const terminalState of terminalStates) {
    ndfa.fa[terminalState] = {final: true}
    ndfa.nTStates = { ...ndfa.nTStates, [String.fromCharCode(terminalState + 64)]: terminalState }
  }
}
