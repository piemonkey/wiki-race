import Model, { attr, hasMany } from '@ember-data/model'

export default class PageModel extends Model {
  @attr('string') title
  @attr('string') uri
  @attr('string') abstract
  @hasMany('page-link', { async: false, inverse: null }) links
}
