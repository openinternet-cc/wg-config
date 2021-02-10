const express = require('express')
const app = express()
app.use(express.json())
const { exec } = require("child_process");
app.use(express.static('users'))

app.post('/exec', async (req, res) => {
  if (req.body.method) {
    if (req.body.user) {
      let username = req.body.user
      if (req.body.method === 'create') {
        // do something on create
        const c = exec(`sudo ./wg.sh -a ${username}`)
        console.log('created user', username)
        res.status(200).send('ok:)')
      } else if (req.body.method === 'delete'){
        //do something on delete
        const c = exec(`sudo ./wg.sh -d ${username}`)
        console.log('deleted user', username)
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




