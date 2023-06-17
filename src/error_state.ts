import { Af } from '.'

export default function addErrorState(afnd: Af): Af {
  afnd.af = { ...afnd.af, 8161: { error: true } }
  afnd.af = Object.fromEntries(
    Object.entries(afnd.af).map(([k, v]) => {
      const values = afnd.tokens.reduce((acc, tkn) => {
        if (!acc.hasOwnProperty(tkn)) return { ...acc, [tkn]: [8161] }
        if ((acc[tkn] as number[]).length === 0) return { ...acc, [tkn]: [8161] }
        
        return acc
      }, v)

      return [k, values]
    })
  )  
  
  return afnd
}
