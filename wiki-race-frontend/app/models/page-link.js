import Model, { attr, belongsTo } from '@ember-data/model'

export default class PageLinkModel extends Model {
  @attr('string') target
  @attr('string') label
  @belongsTo('page', { async: false, inverse: 'links' }) source
}
