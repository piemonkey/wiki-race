import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class PlayRoute extends Route {
  @service store

  async model() {
    // FIXME don't always create a game! One step at a time...
    console.log('index route, creating game')
    const newGame = this.store.createRecord('game', {
      user: 'Tester',
      page: 'Open_data',
    })
    newGame.save().catch((err) => console.error('Error saving game', err))

    return { newGame }
  }
}
