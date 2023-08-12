import Model, { attr } from '@ember-data/model'

export default class PageModel extends Model {
  @attr('string') title
  @attr('string') uri
  @attr('string') abstract
}
