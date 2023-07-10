import { Fa } from '.'

export default function addErrorState(fa: Fa, type: "ndfa" | "dfa") {
  const errorState = type === "ndfa" ? 8161 : "•"
  fa.fa = { ...fa.fa, [errorState]: { error: true, final: true } }
  fa.fa = Object.fromEntries(
    Object.entries(fa.fa).map(([k, v]) => {
      const values = fa.tokens.reduce((acc, tkn) => {
        if (!acc.hasOwnProperty(tkn)) return { ...acc, [tkn]: [8161] }
        if ((acc[tkn] as number[]).length === 0) return { ...acc, [tkn]: [8161] }
        
        return acc
      }, v)

      return [k, values]
    })
  )
}
