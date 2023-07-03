import { Af } from '.'

export default function addTerminalStates(afnd: Af): Af {
  afnd.available = Object.values(afnd.nTStates).sort().slice(-1)[0]
  let addTerminalRowFlag: number[] = []

  afnd.af = Object.fromEntries(
    Object.entries(afnd.af).map(([k, v]) => {
      const values = Object.fromEntries(Object.entries(v).map(([ck, cv]) => {
        if (typeof cv !== "object") return [ck, cv]

        const terminals = cv.map(state => {
          if (state !== -1) return state

          afnd.available++
          addTerminalRowFlag = [...addTerminalRowFlag, afnd.available]
          return afnd.available
        })
  
        return [ck, terminals]
      }))
      
      return [k, values]
    }).concat(addTerminalRowFlag.map(state => [state, {final: true}]))
  )  
  
  return afnd
}
