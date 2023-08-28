import Model, { attr, hasMany } from '@ember-data/model'

export default class GameModel extends Model {
  @attr('string') user
  @hasMany('game-step', { async: true, inverse: 'game' }) steps
}
