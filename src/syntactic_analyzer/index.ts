import { SymbolTable } from "../lexical_analyzer";

const FAILED = "Failed!"
const SUCCEED = "Succeed!"

interface Lrt {
  [state: string]: {
    [token: string]: string | number | undefined
  }
}

export default function syntacticAnalyzer(lrtInput: string, stb: SymbolTable) {
  const lrt: Lrt = JSON.parse(lrtInput)
  console.log(lrt)
  let rowIdx = 0
  let stack = ["0"]
  const glcReductionState = ["S'", "S", "S", "S", "A", "A"]
  const glcReductionSize = [0, 4, 8, 0, 2, 0]

  while (true) {
    const literal = stb[rowIdx].state
    const action = lrt[stack[stack.length - 1]][literal]
    console.log(stb[rowIdx], stack)

    if (!action) return FAILED
    if (typeof action === "number") return FAILED
    if (action === "acc") return SUCCEED

    const actionType = action[0]
    const nextState = action.slice(1)

    console.log(actionType, nextState)

    if (actionType === "s") {
      stack = [...stack, literal, nextState]
      rowIdx = rowIdx + 1
    } else {
      const reductionSize = glcReductionSize[Number(nextState)] * 2
      console.log(Number(nextState))
      console.log(reductionSize)
      console.log(stack.slice(0, stack.length - reductionSize))
      const reductionState = glcReductionState[Number(nextState)]
      stack = stack.slice(0, stack.length - reductionSize)
      const lastStackEl = stack[stack.length - 1]
      const jump = lrt[lastStackEl][reductionState] as number
      stack = [...stack, reductionState, String(jump)]
    }
  }
}
