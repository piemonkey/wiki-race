import { SparqlClient, SPARQL } from 'sparql-client-2'

const PREFIXES = {
  dbr: 'http://dbpedia.org/resource/',
  dbo: 'http://dbpedia.org/ontology/',
}
const HITLER = 'http://dbpedia.org/resource/Adolf_Hitler'

const dbClient = new SparqlClient('https://dbpedia.org/sparql')
  .register(PREFIXES)

async function dbQuery(query) {
  const raw = await dbClient.query(query).executeRaw()
  return JSON.parse(raw.body)
}

export async function getPage(pageName) {
  // TODO Figure out how to sanitise this user input
  // TODO Requests seem to time out at higher than limit 200. Need to add pagination.
  // TODO handle redirects for pages
  const result = await dbQuery(SPARQL`
    SELECT ?label ?abstract ?target ?targetLabel
    WHERE {
      ${{ dbr: pageName }} rdfs:label ?label;
	dbo:abstract ?abstract;
	dbo:wikiPageWikiLink ?target.
      ?target rdfs:label ?targetLabel.
      FILTER (lang(?abstract) = "en" && lang(?label) = "en" && lang(?targetLabel) = "en")
    }
    ORDER BY ?targetLabel
    LIMIT 200
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

