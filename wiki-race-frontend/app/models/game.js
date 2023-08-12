import Model, { attr } from '@ember-data/model'

export default class GameModel extends Model {
  @attr('string') user
  @attr('number', { defaultValue: 1 }) step
  @attr('string') page
}
