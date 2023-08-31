import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class PlayPageRoute extends Route {
  @service store

  async model(params) {
    const stepNum = parseInt(params.step ?? 1, 10)
    const { game, steps: stepsProm } = await this.modelFor('play')
    if (game.status !== 'Ongoing') {
      return { game, stepNum }
    }

    const stepsModel = await stepsProm
    const stepsArray = [...stepsModel]
    const pageId = stepsArray.find((step) => step.step === stepNum)?.page
    if (pageId) {
      const page = await this.store.findRecord('page', pageId, {
        include: 'links',
      })
      return { page, game, stepNum }
    } else {
      // TODO handle this better
      console.error(
        'no page id for this step number',
        stepsArray.map((step) => [step.step, step.page]),
        stepNum
      )
      return {}
    }
  }
}
