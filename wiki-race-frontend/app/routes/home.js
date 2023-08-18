import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class HomeRoute extends Route {
  @service store

  async model() {
    return this.store.query('game', { filter: { user: 'Tester' } })
  }
}
