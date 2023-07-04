// import { Af, AfTable } from '.'

// export default function parseNdfaToDfa(ndfa: Af): Af {
//   const dfa = {"S": {}}
//   console.log(ndfa.af)

//   for (const token in ndfa.af[0]) {
//     const newState = ndfa.af[0][token] as number[]
//     const stateName = `[${newState.map(v => String.fromCharCode(v + 64)).join("")}]`

//     if (stateName === "[]") continue

//     dfa["S"][token] = stateName
//     dfa[stateName] = {}
//   }

//   for (const state in dfa) {
//     const states = state.slice(1, -1).split("")
//     if (states.length === 0) continue

//     for (const stateName of states) {
//       const idx = stateName.charCodeAt(0) - 64
//       console.log(ndfa.af[idx])
//     }
//   }

//   console.log(dfa)
  
//   return ndfa
// }
