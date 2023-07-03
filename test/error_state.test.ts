import addErrorState from "../src/error_state"

test('should add error state on the default afnd', () => {
  const afnd = {
    "af": {
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

  const result = addErrorState(afnd)

  const expectedResult = {
    "af": {
      "0": {"a": [13], "e": [3, 13], "i": [13], "n": [8161], "o": [13], "s": [1, 8], "t": [8161], "u": [13]},
      "1": {"a": [8161], "e": [2], "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "2": {"a": [8161], "e": [8161], "final": true, "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "3": {"a": [8161], "e": [8161], "i": [8161], "n": [4], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "4": {"a": [8161], "e": [8161], "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [5], "u": [8161]},
      "5": {"a": [6], "e": [8161], "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "6": {"a": [8161], "e": [8161], "i": [8161], "n": [8161], "o": [7], "s": [8161], "t": [8161], "u": [8161]},
      "7": {"a": [8161], "e": [8161], "final": true, "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "8": {"a": [8161], "e": [9], "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "9": {"a": [8161], "e": [8161], "i": [8161], "n": [10], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "10": {"a": [11], "e": [8161], "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "11": {"a": [8161], "e": [8161], "i": [8161], "n": [8161], "o": [12], "s": [8161], "t": [8161], "u": [8161]},
      "12": {"a": [8161], "e": [8161], "final": true, "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]},
      "13": {"a": [13], "e": [13], "final": true, "i": [13], "n": [8161], "o": [13], "s": [8161], "t": [8161], "u": [13]},
      // Error state
      "8161": {"a": [8161], "e": [8161], "error": true, "i": [8161], "n": [8161], "o": [8161], "s": [8161], "t": [8161], "u": [8161]}
    },
    "available": 14,
    "tokens": ["s", "e", "n", "t", "a", "o", "i", "u"],
    "nTStates": { last: 0 }
  }

  expect(result).toStrictEqual(expectedResult);
});