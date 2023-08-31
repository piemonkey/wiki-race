import Controller from '@ember/controller'
import { action } from '@ember/object'
import { service } from '@ember/service'

export default class PlayPageController extends Controller {
  @service store
  @service router
  @service wikiRace

  @action
  next(page) {
    const { game } = this.model
    const nextStep = this.store.createRecord('game-step', {
      page,
      step: this.stepNum + 1,
    })
    this.wikiRace.takeNextStep(game, nextStep)
    this.router.transitionTo('play.page', game.id, nextStep.step)
    window.scrollTo(0, 0)
  }
}
