import ApplicationSerializer from './application'

export default class GameSerializer extends ApplicationSerializer {
  normOne(data, sortedSteps) {
    const {
      relationships: {
        steps: { data: unsorted },
      },
    } = data

    if (!unsorted) return data

    const stepIds = unsorted.map(({ id }) => id)
    return sortedSteps.filter(({ id }) => stepIds.includes(id))
  }

  // Sorting by relations doesn't seem to work on mu-cl-resources, so we hack the normalisation to
  // do it instead. Only works if we're including the steps.
  normalizeResponse(store, modelClass, payload, ...rest) {
    const { data, included = [] } = payload

    // Sort the 'included' as it includes the step numbers.
    const sortedSteps = included
      .filter(({ type }) => type === 'game-steps')
      .sort(({ attributes: { step: a } }, { attributes: { step: b } }) => a - b)
      .map((step) => ({ id: step.id, type: step.type }))

    let sortedData = data
    if (data instanceof Array) {
      sortedData = data.map((datum) => this.normOne(datum, sortedSteps))
    } else {
      sortedData = this.normOne(data, sortedSteps)
    }

    return super.normalizeResponse(
      store,
      modelClass,
      { ...payload, sortedData, included },
      ...rest
    )
  }
}
