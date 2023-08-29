import { app } from 'mu'
import { getPage } from './services/dbpedia.js'
import { toErrors, toJsonApi } from './services/jsonApi.js'
import { openDataResponse } from './cannedResponse.js'

function cannedResponse(id) {
  return openDataResponse(id)
}

app.get('/:id', function getPageEndpoint(req, res) {
  const { id } = req.params
  if (!id) {
    return res.status(400)
      .json(toErrors('Bad Request, need to provide page id'))
  }
  if (process.env.OFFLINE) {
    return res.json(cannedResponse(id))
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
