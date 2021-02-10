const express = require('express')
const app = express()
const md5 = require('md5')
app.use(express.json())
const { exec } = require("child_process");
app.use(express.static('users'))

app.post('/exec', async (req, res) => {
  if (req.body.method) {
    if (req.body.user_email) {
      let userHash = md5(req.body.user_email)
      if (req.body.method === 'create') {
        // do something on create
        const c = exec(`sudo ./wg.sh -a ${userHash}`)
        console.log('created user', userHash)
        res.status(200).send('ok:)')
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

app.listen(5000)




