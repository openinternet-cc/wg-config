/*
 * example usage: `node tests/basic.js <create/delete> <username>`
 *
 */

const axios = require('axios')

const method = process.argv[2]
console.log('method',method)
if (method !== 'create' && method !== 'delete') {
  console.error('invalid method')
  process.exit()
}

let args = process.argv.slice(3);

for (i in args) {
  let user_email = args[i]
  console.log('handling user', user_email)
  const r = axios.post('http://localhost:5000/exec', {
    method: method,
    user_email: user_email
  })
}
