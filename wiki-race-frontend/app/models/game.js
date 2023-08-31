import Model, { attr, hasMany } from '@ember-data/model'

export default class GameModel extends Model {
  @attr('string') status
  @attr('date') lastPlayed
  @hasMany('game-step', { async: true, inverse: 'game' }) steps
}
