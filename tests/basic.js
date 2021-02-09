/*
 * example usage: `node tests/basic.js <create/delete> <username>`
 *
 */

const axios = require('axios')
let args = process.argv.slice(3);

const method = process.argv[2]
if (method !== 'create' || method !== 'delete') {
  console.error('invalid method')
  process.exit()
}

for (i in args) {
  let username = args[i]
  console.log('handling user', username)
  const r = axios.post('http://localhost:3000/exec', {
    method: method,
    user: username
  })
}
