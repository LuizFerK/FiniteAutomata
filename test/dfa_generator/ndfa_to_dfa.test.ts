import parseNdfaToDfa from "../../src/dfa_generator/ndfa_to_dfa"

test('should parse the default ndfa to an dfa', () => {
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

  const expectedResult = {
    "S": {"a": "M", "e": "[CM]", "i": "M", "n": [], "o": "M", "s": "[AH]", "t": [], "u": "M"},
    "[AH]": {"e": "[BI]"},
    "[CM]": {"a": "M", "e": "M", "final": true, "i": "M", "n": "D", "o": "M", "u": "M"},
    "M": {"a": "M", "e": "M", "final": true, "i": "M", "o": "M", "u": "M"},
    "[BI]": {"final": true, "n": "J"},
    "D": {"a": [], "i": [], "o": [], "t": "E", "u": []},
    "J": {"a": "K", "i": [], "u": []},
    "E": {"a": "F", "i": [], "o": [], "u": []},
    "K": {"i": [], "o": "L", "u": []},
    "F": {"i": [], "o": "G", "u": []},
    "L": {"final": true, "i": [], "u": []},
    "G": {"final": true, "i": [], "u": []}
  }

  expect(dfa.fa).toStrictEqual(expectedResult);
})

test('should parse an ndfa to an dfa', () => {
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
    "[AC]": {"a": "[ACFG]", "b": "[BC]"},
    "[BC]": {"a": "[AC]", "b": "[BCFH]"},
    "[ACFG]": {"a": "[ACFGI]", "b": "[BCFJ]", "final": true},
    "[BCFH]": {"a": "[ACFI]", "b": "[BCFHJ]", "final": true},
    "[ACFGI]": {"a": "[ACFGI]", "b": "[BCFJ]", "final": true},
    "[BCFJ]": {"a": "[ACFI]", "b": "[BCFHJ]", "final": true},
    "[ACFI]": {"a": "[ACFGI]", "b": "[BCFJ]", "final": true},
    "[BCFHJ]": {"a": "[ACFI]", "b": "[BCFHJ]", "final": true}
  }

  expect(dfa.fa).toStrictEqual(expectedResult);
})