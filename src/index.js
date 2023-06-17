const fs = require('fs/promises')
const generateAfnd = require('./generate_afnd')
const printAf = require('./print_af')

async function main() {
  const input = await fs.readFile('assets/input.txt', { encoding: 'utf8' })
  const afnd = generateAfnd(input)
  printAf(afnd)
}

main()