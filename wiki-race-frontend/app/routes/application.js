import Route from '@ember/routing/route'
// For now use the old version of ember-simple-auth required by ember-mu-login to avoid falling down
// the rabbit hole of updating that lib.
// eslint-disable-next-line ember/no-mixins
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

export default class ApplicationRoute extends Route.extend(
  ApplicationRouteMixin
) {}
