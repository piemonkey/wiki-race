import { app, query } from 'mu'

const PREFIXES = `
  PREFIX dbr:<http://dbpedia.org/resource/>
  PREFIX dbo:<http://dbpedia.org/ontology/>
`
const HITLER = 'http://dbpedia.org/resource/Adolf_Hitler'

async function getPage(pageName) {
  // TODO Figure out how to sanitise this user input
  // TODO What's a sensible limit? Stick with 100 for now
  const result = await query(`
    ${PREFIXES}
    SELECT ?label ?abstract ?target ?targetLabel
    WHERE {
      dbr:${pageName} rdfs:label ?label;
	dbo:abstract ?abstract;
	dbo:wikiPageWikiLink ?target.
      ?target rdfs:label ?targetLabel.
      FILTER (lang(?abstract) = "en" && lang(?label) = "en" && lang(?targetLabel) = "en")
    } LIMIT 100
  `)

  if (result.results.bindings.length === 0) {
    return { status: 'fail' }
  }
  const hitlerLink = result.results.bindings.find(({ target }) =>
    target.type === 'uri' && target.value === HITLER)
  if (hitlerLink) {
    console.log('YAY! Hitler!')
    return { status: 'win', result }
  }
  return { status: 'normal', result }
}

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
