import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class HomeRoute extends Route {
  @service store

  async model() {
    const games = await this.store.query('game', { include: 'steps' })
    const unfinished = Promise.all(
      games
        .filter((game) => game.status === 'Ongoing')
        .map((game) => game.steps.then((steps) => ({ game, steps })))
    )
    const finished = Promise.all(
      games
        .filter((game) => game.status === 'Won')
        .map((game) => game.steps.then((steps) => ({ game, steps })))
    )
    return Promise.all([unfinished, finished]).then(([unfin, fin]) => ({
      unfinished: unfin,
      finished: fin,
    }))
  }
}
