import Component from '@glimmer/component'
import { action } from '@ember/object'
import { service } from '@ember/service'

export default class WikiPageComponent extends Component {
  @service store
  @service router
  @service wikiRace

  get hasWon() {
    console.log('links', this.args.page.links, this.args.page)
    return this.args.game.status === 'Won'
  }

  @action
  next(page) {
    const { game } = this.args
    const nextStep = this.store.createRecord('game-step', {
      page,
      step: this.args.stepNum + 1,
    })
    this.wikiRace.takeNextStep(game, nextStep)
    this.router.transitionTo('play.page', game.id, nextStep.step)
    window.scrollTo(0, 0)
  }
}
