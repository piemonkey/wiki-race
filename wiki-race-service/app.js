import { app, query } from 'mu'
import { getPage } from './services/dbpedia.js'

// POST a new game
app.post('/', function postGame(req, res) {
  // TODO This isn't using jsonapi spec, need to parse that
  const { startPage = 'Open_data' } = req.body
  getPage(startPage)
    .then(({ status, result }) => {
      if (status === 'fail') {
	res.status(404).send()
      } else {
	res.json(result)
      }
    })
    .catch((err) => {
      console.log('Error running query', err)
      res.status(500)
	.json({ message: `Unknown error... ${err.message}` })
    })
});

app.put('/:gameId', function putGame(req, res) {
  const { gameId } = req.params
  const { nextPage } = req.body
  if (!gameId || !nextPage) {
    return res.status(400)
      .send({ message: `Bad Request, need valid gameId and nextPage, got ${gameId}, ${nextPage}` })
  }
  // TODO Store data about game to track progress

  getPage(nextPage)
    .then(({ status, result }) => {
      if (status === 'fail') {
	res.status(400).json({ message: 'Unable to find this next page' })
      }
      res.json({ status, result })
    })
    .catch((err) => {
      console.log('Error running query', err)
      res.status(500)
	.send({ message: `Unknown error... ${err.message}` })
    })
})
