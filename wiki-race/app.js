import { app, query } from 'mu'

const PREFIXES = `
  PREFIX dbr:<http://dbpedia.org/resource/>
  PREFIX dbo:<http://dbpedia.org/ontology/>
`
// POST a new game
app.post('/', function(req, res) {
  // TODO This isn't using jsonapi spec, need to parse that
  const { startPage = 'Open_data' } = req.body
  // TODO Figure out how to sanitise this user input
  // TODO What's a sensible limit? Stick with 100 for now
  const queryStart = `
    ${PREFIXES}
    SELECT ?label ?abstract ?target ?targetLabel
    WHERE {
      dbr:${startPage} rdfs:label ?label;
	dbo:abstract ?abstract;
	dbo:wikiPageWikiLink ?target.
      ?target rdfs:label ?targetLabel.
      FILTER (lang(?abstract) = "en" && lang(?label) = "en" && lang(?targetLabel) = "en")
    } LIMIT 100
  `
  query(queryStart)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log('Error running query', err)
      res.status(500)
	.send({ message: `Unknown error... ${err.message}` })
    })
});
