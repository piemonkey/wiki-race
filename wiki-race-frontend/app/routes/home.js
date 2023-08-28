import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class HomeRoute extends Route {
  @service store

  async model() {
    const games = await this.store.query('game', { include: 'steps' })
    return Promise.all(
      games.map((game) => game.steps.then((steps) => ({ game, steps })))
    )
  }
}
