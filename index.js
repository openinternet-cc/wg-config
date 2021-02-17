require('dotenv').config()
const envalid = require('envalid')
const { str, port, cleanEnv } = envalid
const env = cleanEnv(process.env, {
  LISTEN_PORT: port()
})
const express = require('express')
const md5 = require('md5')
const { exec } = require("child_process");
const fs = require('fs')
const app = express()
app.use(express.static('users'))
app.use(express.json())
app.post('/exec', async (req, res) => {
  if (req.body.method) {
    if (req.body.user_email) {
      let userHash = md5(req.body.user_email)
      if (req.body.method === 'create') {
        if (!fs.existsSync(`./users/${userHash}`)) {
          // do something on create
          const c = exec(`sudo ./wg.sh -a ${userHash}`)
          console.log('created user', userHash)
          res.status(200).send('ok:)')
        } else {
          console.log('user already exist for', req.body.user_email)
        }
      } else if (req.body.method === 'delete'){
        //do something on delete
        const c = exec(`sudo ./wg.sh -d ${userHash}`)
        console.log('deleted user', userHash)
        res.status(200).send('ok:)')
      } else {
        res.status(666).send({error: 'invalid method'})
      }
    } else {
      res.status(666).send({error: 'must provide a user'})
    }
  } else {
    res.status(666).send({error: 'no method provided'})
  }
});
app.listen(env.LISTEN_PORT, ()=> console.log('app running on port', env.LISTEN_PORT))




