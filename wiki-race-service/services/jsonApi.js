export function toErrors(detail) {
  return { errors: [{ detail }] }
}
function getLinkId(link) {
  return link.replace('http://dbpedia.org/resource/', '')
}

export function toJsonApi(id, { result }) {
  const { results: { bindings } } = result
  // TODO either handle potential errors or see if there's a good lib
  
  const relationshipData = [], included = []
  bindings.forEach((link) => {
    const id = getLinkId(link.target.value)
    relationshipData.push({
      id,
      type: 'page-link',
    })
    included.push({
      id,
      type: 'page-link',
      attributes: {
        label: link.targetLabel.value,
        target: id,
      },
    })
  })

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
          data: relationshipData,
        },
      },
    },
    included,
  }
}

