import { app } from 'mu'
import { getPage } from './services/dbpedia.js'

function toJsonApi(id, { result }) {
  const { results: { bindings } } = result
  // TODO either handle potential errors or see if there's a good lib
  return {
    data: {
      id,
      type: 'page',
      attributes: {
	uri: id,
	title: bindings[0].label.value,
	abstract: bindings[0].abstract.value,
      },
      relationships: {},
    },
  }
}

app.get('/:id', function getPageEndpoint(req, res) {
  const { id } = req.params
  if (!id) {
    return res.status(400)
      .json({ message: 'Bad Request, need to provide page id' })
  }
  getPage(id)
    .then(({ status, result }) => {
      if (status === 'fail') {
	return res.status(404).json({ message: 'Not Found' })
      }
      res.json(toJsonApi(id, { status, result }))
    })
    .catch((err) => {
      console.log('Error running query', err)
      res.status(500)
	.json({ message: `Unknown error... ${err.message}` })
    })
})
