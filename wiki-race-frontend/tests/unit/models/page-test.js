import { module, test } from 'qunit'

import { setupTest } from 'wiki-race-frontend/tests/helpers'

module('Unit | Model | page', function (hooks) {
  setupTest(hooks)

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store')
    let model = store.createRecord('page', {})
    assert.ok(model)
  })
})
