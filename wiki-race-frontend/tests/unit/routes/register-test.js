import { module, test } from 'qunit'
import { setupTest } from 'wiki-race-frontend/tests/helpers'

module('Unit | Route | register', function (hooks) {
  setupTest(hooks)

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:register')
    assert.ok(route)
  })
})
