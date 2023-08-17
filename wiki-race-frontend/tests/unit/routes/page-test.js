import { module, test } from 'qunit'
import { setupTest } from 'wiki-race-frontend/tests/helpers'

module('Unit | Route | page', function (hooks) {
  setupTest(hooks)

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:page')
    assert.ok(route)
  })
})
