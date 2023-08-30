import { module, test } from 'qunit'

import { setupTest } from 'wiki-race-frontend/tests/helpers'

module('Unit | Serializer | game', function (hooks) {
  setupTest(hooks)

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store')
    let serializer = store.serializerFor('game')

    assert.ok(serializer)
  })

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store')
    let record = store.createRecord('game', {})

    let serializedRecord = record.serialize()

    assert.ok(serializedRecord)
  })
})
