import Application from 'wiki-race-frontend/app'
import config from 'wiki-race-frontend/config/environment'
import * as QUnit from 'qunit'
import { setApplication } from '@ember/test-helpers'
import { setup } from 'qunit-dom'
import { start } from 'ember-qunit'

setApplication(Application.create(config.APP))

setup(QUnit.assert)

start()
