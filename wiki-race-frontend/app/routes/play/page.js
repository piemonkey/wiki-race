import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class PlayPageRoute extends Route {
  @service store

  setupController(playPageController, ...args) {
    // For some reason the rule picks this up even though it says it should be allowed here
    // eslint-disable-next-line ember/no-controller-access-in-routes
    const playController = this.controllerFor('play')
    playPageController.nextStep = playController.nextStep
    super.setupController(playPageController, ...args)
  }

  async model() {
    // TODO Change model and use this
    // const step = params.step ?? 0
    const game = await this.modelFor('play')
    if (game.page) {
      return this.store.findRecord('page', game.page, { include: 'links' })
    } else {
      return {}
    }
  }
}
