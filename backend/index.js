const dotenv = require('dotenv'),
  { Client } = require('pg')

const express = require('express'),
  path = require('path')
  dotenv.config()
  const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()

app.get('/api', async(_request, response) => {
  const { rows } = await client.query(
    'SELECT * FROM superheroes'
  )

  response.send(rows)
})

app.post('/api', async(request, response) => {
  try {
    let name = request.body.name
    let power = request.body.power

    await client.query(
      'INSERT INTO superheroes (name, power) VALUES ($1, $2)', [name, power]
    )

    const { rows } = await client.query('SELECT * FROM superheroes')
    response.status(201).send(rows)
  } catch (error) {
    console.error(error)
    response.status(500).send('An error occurred while processing your request.')
  }
})

app.delete('/api', async(request, response) => {
  try {
    const ids = request.body.ids;

    const query = `DELETE FROM superheroes WHERE id = ANY($1::int[])`;
    await client.query(query, [ids]);

    const { rows } = await client.query('SELECT * FROM superheroes')
    response.status(200).send(rows)
  } catch (error) {
    console.error(error)
    response.status(500).send('An error occurred while processing your request.')
  }
})


app.use(express.static(path.join(path.resolve(), 'public')))

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/')
})
