import { app } from 'mu'
import { getPage } from './services/dbpedia.js'
import { openDataResponse } from './cannedResponse.js'

function cannedResponse() {
  return openDataResponse
}

function toErrors(detail) {
  return { errors: [{ detail }] }
}
function getLinkId(link) {
  return link.replace('http://dbpedia.org/resource/', '')
}

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
      relationships: {
        links: {
          data: bindings.map((link) => ({
            id: getLinkId(link.target.value),
            type: 'page-link',
          })),
        },
      },
    },
    included: bindings.map((link) => ({
      id: getLinkId(link.target.value),
      type: 'page-link',
      attributes: {
        label: link.targetLabel.value,
        target: getLinkId(link.target.value),
      },
    })),
  }
}

app.get('/:id', function getPageEndpoint(req, res) {
  const { id } = req.params
  if (!id) {
    return res.status(400)
      .json(toErrors('Bad Request, need to provide page id'))
  }
  if (process.env.OFFLINE) {
    return res.json(cannedResponse())
  }
  getPage(id)
    .then(({ status, result }) => {
      if (status === 'fail') {
        console.warn('Not found!', status, result)
        return res.status(404).json(toErrors('Not Found'))
      }
      res.json(toJsonApi(id, { status, result }))
    })
    .catch((err) => {
      console.error('Error running query', err)
      res.status(500)
        .json(toErrors(`Unknown error... ${err.message}`))
    })
})
