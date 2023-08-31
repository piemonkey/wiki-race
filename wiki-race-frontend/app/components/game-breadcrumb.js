import Component from '@glimmer/component'

export default class GameBreadcrumbComponent extends Component {
  get steps() {
    return [...this.args.steps].sort((a, b) => a.step - b.step)
  }
}
