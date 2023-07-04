import { Fa } from '.'

export default function addErrorState(ndfa: Fa) {
  ndfa.fa = { ...ndfa.fa, 8161: { error: true } }
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
