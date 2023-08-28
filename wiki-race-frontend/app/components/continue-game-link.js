import Component from '@glimmer/component'

export default class ContinueGameLinkComponent extends Component {
  get currentStep() {
    const steps = this.args.steps
    return steps[steps.length - 1]
  }
}
