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
    "nTStates": { last: 0 }
  }

  parseNdfaToDfa(ndfa)

  const expectedResult = "asdasd"

  expect(ndfa).toStrictEqual(expectedResult);
})

test('should add all terminal states when needed', () => {
  const ndfa = {
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

  parseNdfaToDfa(ndfa)

  const expectedResult = "asdasd"

  expect(ndfa).toStrictEqual(expectedResult);
})