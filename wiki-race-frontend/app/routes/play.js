import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class PlayRoute extends Route {
  @service store

  async model(params) {
    const gameId = params.game_id
    const game = await this.store.findRecord('game', gameId, {
      include: 'steps',
    })
    return {
      game,
      steps: await game.steps,
    }
  }
}
