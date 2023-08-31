import { SparqlClient, SPARQL } from 'sparql-client-2'

const PREFIXES = {
  dbr: 'http://dbpedia.org/resource/',
  dbo: 'http://dbpedia.org/ontology/',
  skos: 'http://www.w3.org/2004/02/skos/core#',
}
const HITLER = 'http://dbpedia.org/resource/Adolf_Hitler'

const dbClient = new SparqlClient('https://dbpedia.org/sparql')
  .register(PREFIXES)

async function dbQuery(query) {
  const raw = await dbClient.query(query).executeRaw()
  return JSON.parse(raw.body)
}

const dumbCache = new Map()

export async function getPage(pageName) {
  const cached = dumbCache.get(pageName)
  if (cached) {
    return { status: 'normal', result: cached }
  }
  // TODO Figure out how to sanitise this user input
  // TODO Requests seem to time out at higher than limit 200. Need to add pagination.
  const result = await dbQuery(SPARQL`
    SELECT ?label ?abstract ?target ?targetLabel
    WHERE {
      ${{ dbr: pageName }} rdfs:label ?label;
	dbo:abstract ?abstract;
	dbo:wikiPageWikiLink ?linkedTarget.
      FILTER (lang(?abstract) = "en" && lang(?label) = "en")
      OPTIONAL {
        ?linkedTarget dbo:wikiPageRedirects ?realTarget.
      }
      BIND(IF(BOUND(?realTarget), ?realTarget, ?linkedTarget) as ?target)
      MINUS {
	?target a skos:Concept.
      }
      ?target rdfs:label ?targetLabel.

      FILTER (lang(?targetLabel) = "en")
    }
    ORDER BY ?targetLabel
    LIMIT 200
  `)

  if (result.results.bindings.length === 0) {
    return { status: 'fail' }
  } else {
    dumbCache.set(pageName, result)
  }

  const hitlerLink = result.results.bindings.find(({ target }) =>
    target.type === 'uri' && target.value === HITLER)
  if (hitlerLink) {
    console.log('YAY! Hitler!')
    return { status: 'win', result }
  }
  return { status: 'normal', result }
}

