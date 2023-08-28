import Model, { attr, belongsTo } from '@ember-data/model'

export default class GameStepModel extends Model {
  @attr('string') page
  @attr('number') step
  @belongsTo('game', { async: true, inverse: 'steps' }) game
}
