import EmberRouter from '@ember/routing/router'
import config from 'wiki-race-frontend/config/environment'

export default class Router extends EmberRouter {
  location = config.locationType
  rootURL = config.rootURL
}

Router.map(function () {
  this.route('play', { path: '/play/:game_id' }, function () {
    this.route('page', { path: '/:step' })
  })
})
