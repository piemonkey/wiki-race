import Controller from '@ember/controller'
import { action } from '@ember/object'

export default class PlayPageController extends Controller {
  @action
  next(page) {
    // It seems weird that this is needed. send() didn't work and seems to be outdated
    this.nextStep(page)
  }
}
