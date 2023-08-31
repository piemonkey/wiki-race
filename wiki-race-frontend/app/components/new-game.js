import Component from '@glimmer/component'
import { action } from '@ember/object'
import { service } from '@ember/service'

const FIRST_STEP = 1

export default class NewGameComponent extends Component {
  @service store
  @service router

  @action
  async createGame() {
    const newGame = this.store.createRecord('game', {
      status: 'Ongoing',
      lastPlayed: new Date(),
      steps: [],
    })
    await newGame.save()
    const startStep = this.store.createRecord('game-step', {
      page: 'Open_data',
      step: FIRST_STEP,
      game: newGame,
    })
    await startStep.save()
    this.router.transitionTo('play.page', newGame.id, FIRST_STEP)
  }
}
