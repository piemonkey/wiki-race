import Controller from '@ember/controller'
import { action } from '@ember/object'
import { service } from '@ember/service'

export default class PlayController extends Controller {
  @service store
  @service router

  @action
  nextStep(page) {
    const game = this.model
    game.page = page
    game.step += 1
    this.router.transitionTo('play.page', game, game.step)
    window.scrollTo(0, 0)
    game.save()
    return false
  }
}
