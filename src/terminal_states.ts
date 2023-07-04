import { Fa } from '.'

interface TerminalState {
  idx: number
  state: number
}

export default function addTerminalStates(ndfa: Fa) {
  ndfa.available = Object.values(ndfa.nTStates).sort().slice(-1)[0]
  let terminalStates = [] as TerminalState[]
  let idx = 0

  for (const state in ndfa.fa) {
    for (const tkn in ndfa.fa[state]) {
      const values = ndfa.fa[state][tkn]
      if (typeof values !== "object") continue
      
      ndfa.fa[state][tkn] = values.map(state => {
        if (state !== -1) return state

        ndfa.available++
        terminalStates = [...terminalStates, { state: ndfa.available, idx: idx }]
        return ndfa.available
      })

      idx++
    }
  }

  for (const terminalState of terminalStates) {
    ndfa.fa[terminalState.state] = {final: true}
  }
}
