import { module, test } from 'qunit'

import { setupTest } from 'wiki-race-frontend/tests/helpers'

module('Unit | Adapter | page', function (hooks) {
  setupTest(hooks)

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:page')
    assert.ok(adapter)
  })
})
