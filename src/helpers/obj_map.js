function objMap(obj, callback) {
  return Object.fromEntries(Object.entries(obj).map(callback))
}

function objFilteredMap(obj, filter, map) {
  return Object.fromEntries(Object.entries(obj).filter(filter).map(map))
}

module.exports = { objMap, objFilteredMap }