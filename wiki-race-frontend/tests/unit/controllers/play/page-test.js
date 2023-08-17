import { module, test } from 'qunit'
import { setupTest } from 'wiki-race-frontend/tests/helpers'

module('Unit | Controller | play/page', function (hooks) {
  setupTest(hooks)

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:play/page')
    assert.ok(controller)
  })
})
