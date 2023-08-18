import Component from '@glimmer/component'
import { action } from '@ember/object'
import { service } from '@ember/service'

export default class NewGameComponent extends Component {
  @service store
  @service router

  @action
  async createGame() {
    const newGame = this.store.createRecord('game', {
      user: 'Tester',
      page: 'Open_data',
    })
    await newGame.save().catch((err) => console.error('Error saving game', err))
    this.router.transitionTo('play.page', newGame.id, 0)
  }
}
