const express = require('express')
const app = express()
const PORT = 4000

//middleware
app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())
app.use(mw)

function mw(req, res, next) {
  console.log('HIT THE MIDDLEWARE')
  const {id} = req.query
  if(id != 8) {
    return res.sendStatus(403)
  }
  next()
}

//TEMP DATABASE
const db = []


//SCHEDULER
function cron(ms, fn) {
  async function cb() {
    clearTimeout(timeout)
    await fn()
    timeout = setTimeout(cb, ms)
  }
  let timeout = setTimeout(cb, ms)
  return () => { }
}

function consoleDB() {
  console.log('DB= ', db)
}

cron(1000, consoleDB)

http://172.0.0.1/path/to/somthing

// GET POST PATCH PUT DELETE

// If you are serving HTML files you a GET request will not work

app.delete('/', mw, (req, res) => {
  console.log('You have reached the home route: Deklete')
  res.sendStatus(200)
})

app.post('/api/info', (req, res) => {
  const { information } = req.body
  console.log('THE POSTED MESSAGE WAS: ', information)
  db.push(information)
  console.log('DB: ', db)
  res.status(201).json({"yourMessage": information})
})

app.put('/api', (req, res) => {
  const { word, banana } = req.query
  console.log(word, banana)
  res.sendStatus(200)
})

app.delete('/delete/james/cool', (req, res) => {
  res.send('Did not make it')
})

app.delete('/delete/', (req, res) => {
  const { id } = req.params 
  console.log('What do you want to delete?', id)
  res.sendStatus(200)
})


app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))