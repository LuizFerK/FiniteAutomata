import generateNdfa from "../../src/dfa_generator/generate_ndfa"

test('should generate a valid ndfa for the default example', () => {
  const input = `se
entao
senao
<S> ::= a<A> | e<A> | i<A> | o<A> | u<A>
<A> ::= a<A> | e<A> | i<A> | o<A> | u<A> | ε`

  const result = generateNdfa(input)

  const expectedResult = {
    "fa": {
      "0": {"s": [1, 8], "e": [3, 13], "n": [], "t": [], "a": [13], "o": [13], "i": [13], "u": [13]},
      "1": {"e": [2]},
      "2": {"final": true},
      "3": {"n": [4]},
      "4": {"t": [5]},
      "5": {"a": [6]},
      "6": {"o": [7]},
      "7": {"final": true},
      "8": {"e": [9]},
      "9": {"n": [10]},
      "10": {"a": [11]},
      "11": {"o": [12]},
      "12": {"final": true},
      "13": {"a": [13], "e": [13], "final": true, "i": [13], "o": [13], "u": [13]}
    },
    "available": 13,
    "tokens": ["s", "e", "n", "t", "a", "o", "i", "u"],
    "nTStates": { S: 0, A: 13 }
  }

  expect(result).toStrictEqual(expectedResult);
})

test('should generate a valid ndfa for a only non-terminal input', () => {
  const input = `<S> ::= a<A> | a<C> | b<B> | b<C>
<A> ::= a<F> | a
<B> ::= b<F> | b
<C> ::= a<A> | a<C> | b<B> | b<C>
<F> ::= a<F> | b<F> | a | b`

  const result = generateNdfa(input)

  const expectedResult = {
    "fa": {
      "0": {"a": [1, 3], "b": [2, 3]},
      "1": {"a": [6, -1]},
      "2": {"b": [6, -1]},
      "3": {"a": [1, 3], "b": [2, 3]},
      "6": {"a": [6, -1], "b": [6, -1]}
    },
    "available": 1,
    "nTStates": {
      "S": 0,
      "A": 1,
      "B": 2,
      "C": 3,
      "F": 6
    },
    "tokens": ["a", "b"]
  }

  expect(result).toStrictEqual(expectedResult);
})