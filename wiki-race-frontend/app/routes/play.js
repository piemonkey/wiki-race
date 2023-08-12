import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class PlayRoute extends Route {
  @service store

  async model() {
    const pageId = 'Open_data'
    const game = this.store.createRecord('game', { user: 'Test', page: pageId })
    await game.save()
    const page = await this.store.findRecord('page', pageId)
    return { game, page }
  }
}
