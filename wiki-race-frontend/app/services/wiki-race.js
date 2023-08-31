import Service from '@ember/service'

const TARGET = 'Adolf_Hitler'

export default class WikiRaceService extends Service {
  async takeNextStep(game, nextStep) {
    const steps = await game.steps
    const removed = steps.splice(
      nextStep.step - 1,
      steps.length - nextStep.step + 1,
      nextStep
    )
    await steps.save()
    for (let removedStep of removed) {
      // This seems overkill, but testing confirms that it's necessary
      await removedStep.destroyRecord()
    }

    if (nextStep.page === TARGET) {
      game.status = 'Won'
    }
    game.lastPlayed = new Date()

    return game.save()
  }
}
