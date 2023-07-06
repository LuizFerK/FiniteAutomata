import parseNdfaToDfa from "../src/ndfa_to_dfa"

test('should add none terminal states on the default ndfa', () => {
  const ndfa = {
    "fa": {
      "0": {"a": [13], "e": [3, 13], "i": [13], "n": [], "o": [13], "s": [1, 8], "t": [], "u": [13]},
      "1": {"a": [], "e": [2], "i": [], "n": [], "o": [], "t": [], "u": []},
      "2": {"a": [], "final": true, "i": [], "n": [], "o": [], "t": [], "u": []},
      "3": {"a": [], "i": [], "n": [4], "o": [], "t": [], "u": []},
      "4": {"a": [], "i": [], "o": [], "t": [5], "u": []},
      "5": {"a": [6], "i": [], "o": [], "u": []},
      "6": {"i": [], "o": [7], "u": []},
      "7": {"final": true, "i": [], "u": []},
      "8": {"e": [9], "i": [], "u": []},
      "9": {"i": [], "n": [10], "u": []},
      "10": {"a": [11], "i": [], "u": []},
      "11": {"i": [], "o": [12], "u": []},
      "12": {"final": true, "i": [], "u": []},
      "13": {"a": [13], "e": [13], "final": true, "i": [13], "o": [13], "u": [13]}
    },
    "available": 14,
    "tokens": ["s", "e", "n", "t", "a", "o", "i", "u"],
    "nTStates": { S: 0, A: 13 }
  }

  const dfa = parseNdfaToDfa(ndfa)

  const expectedResult = "asdasd"

  expect(dfa).toStrictEqual(expectedResult);
})

test('should add all terminal states when needed', () => {
  const ndfa = {
    "fa": {
      "0": {"a": [1, 3], "b": [2, 3]},
      "1": {"a": [6, 7]},
      "2": {"b": [6, 8]},
      "3": {"a": [1, 3], "b": [2, 3]},
      "6": {"a": [6, 9], "b": [6, 10]},
      "7": {"final": true},
      "8": {"final": true},
      "9": {"final": true},
      "10": {"final": true}
    },
    "available": 10,
    "nTStates": {"S": 0, "A": 1, "B": 2, "C": 3, "F": 6, "G": 7, "H": 8, "I": 9, "J": 10},
    "tokens": ["a", "b"]
  }

  const dfa = parseNdfaToDfa(ndfa)

  const expectedResult = {
    "S": {"a": "[AC]", "b": "[BC]"},
    "[ACFGI]": {"a": "[ACFGI]", "b": "[JBCF]", "final": true},
    "[ACFG]": {"a": "[ACFGI]", "b": "[JBCF]", "final": true},
    "[ACFI]": {"a": "[ACFGI]", "b": "[JBCF]", "final": true},
    "[AC]": {"a": "[ACFG]", "b": "[BC]"},
    "[BCFH]": {"a": "[ACFI]", "b": "[JBCFH]", "final": true},
    "[BC]": {"a": "[AC]", "b": "[BCFH]"},
    "[JBCFH]": {"a": "[ACFI]", "b": "[JBCFH]", "final": true},
    "[JBCF]": {"a": "[ACFI]", "b": "[JBCFH]", "final": true}
  }

  expect(dfa).toStrictEqual(expectedResult);
})