import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class PlayRoute extends Route {
  @service store

  async model(params) {
    const pageId = params.page_id || 'Open_data'
    const page = await this.store.findRecord('page', pageId, {
      include: 'links',
    })
    return { page }
  }
}
