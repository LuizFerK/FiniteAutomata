const { objMap, objFilteredMap } = require('./helpers/obj_map')

function valueToCharCode(values) {
  return values.map(value => {
    if (value === 0) return 'S'
    if (value === 18) return 'A'
    return String.fromCharCode(value + 64)
  }).join(", ")
}

function keyToCharCode(key, value) {
  if (key === "0") return 'S'
  const suffix = value.hasOwnProperty("final") ? "*" : ""
  if (key === "18")  return suffix + "A"
  return suffix + String.fromCharCode(Number((key).toString().replace("*", "")) + 64)
}

function objectValuesToCharCode(object) {
  return objFilteredMap(
    object,
    ([k, v]) => !(k === "final" && v === true),
    ([k, v]) => [k, valueToCharCode(v)]
  )
}

function objectKeysToCharCode(object) {
  return objMap(object, ([k, v]) => [keyToCharCode(k, v), objectValuesToCharCode(v)])
}

function printAf(afnd) {
  console.table(objectKeysToCharCode(afnd.af))
}

module.exports = printAf