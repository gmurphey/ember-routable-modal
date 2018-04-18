import { click, currentURL, currentRouteName, find, findAll, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import config from 'ember-routable-modal/configuration';

module('Acceptance | modals with async models and loading substates', function(
  hooks
) {
  setupApplicationTest(hooks);

  function joinClasses(classes) {
    return `.${classes.join('.')}`;
  }

  test('transitioning to /async-model-with-loading-substate-one', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    try {
      await visit('/async-model-with-loading-substate-one');
    } catch (e) {
      // Caught TransitionAborted
    }
    assert.equal(currentURL(), '/async-model-with-loading-substate-one');
    assert.equal(currentRouteName(), 'index.async-modal-with-loading-substate-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
    assert.equal(find('#modal-model').textContent, 'done');

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.equal(currentRouteName(), 'index.index');
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
  });

  test('booting up from /async-model-with-loading-substate-one', async function(assert) {
    await visit('/async-model-with-loading-substate-one');

    assert.equal(currentURL(), '/async-model-with-loading-substate-one');
    assert.equal(currentRouteName(), 'index.async-model-with-loading-substate-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
    assert.equal(find('#modal-model').textContent, 'done');

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.equal(currentRouteName(), 'index.index');
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
  });
});
