import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class PlayRoute extends Route {
  @service store

  async model() {
    const game = this.store.createRecord('game', { user: 'Test' })
    // await game.save()
    const page = await this.store.findRecord('page', 'Open_data')
    console.log('huh', page)
    return { game, page }
  }
}
