import Model, { attr, hasMany } from '@ember-data/model'

export default class GameModel extends Model {
  @attr('string') user
  @hasMany('game-step', { async: true, inverse: 'game' }) steps

  // It seems non-trivial to successfully delete some of a hasMany relation, so make it a method
  async saveNextStep(nextStep) {
    const steps = await this.steps
    const removed = steps.splice(
      nextStep.step - 1,
      steps.length - nextStep.step + 1,
      nextStep
    )
    await steps.save()
    removed.forEach((removedStep) => {
      // This seems overkill, but testing confirms that it's necessary
      removedStep.destroyRecord()
    })
    return this.save()
  }
}
