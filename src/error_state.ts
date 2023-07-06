import { Fa } from '.'

export default function addErrorState(ndfa: Fa, type: "ndfa" | "dfa") {
  const errorState = type === "ndfa" ? 8161 : "•"
  ndfa.fa = { ...ndfa.fa, [errorState]: { error: true } }
  ndfa.fa = Object.fromEntries(
    Object.entries(ndfa.fa).map(([k, v]) => {
      const values = ndfa.tokens.reduce((acc, tkn) => {
        if (!acc.hasOwnProperty(tkn)) return { ...acc, [tkn]: [8161] }
        if ((acc[tkn] as number[]).length === 0) return { ...acc, [tkn]: [8161] }
        
        return acc
      }, v)

      return [k, values]
    })
  )  
}
